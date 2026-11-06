param(
    [Parameter(Mandatory=$true)][string]$InputPath,
    [Parameter(Mandatory=$true)][string]$OutputPath,
    [int]$Threshold = 40
)

$csharp = @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using System.Collections.Generic;

public class ImageProcessor {
    public static void RemoveBackground(string inputPath, string outputPath, int threshold) {
        using (var src = new Bitmap(inputPath)) {
            int w = src.Width;
            int h = src.Height;
            var rect = new Rectangle(0, 0, w, h);
            var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
            using (var g = Graphics.FromImage(bmp)) {
                g.DrawImage(src, 0, 0, w, h);
            }

            var bmpData = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int byteCount = Math.Abs(bmpData.Stride) * h;
            byte[] pixels = new byte[byteCount];
            Marshal.Copy(bmpData.Scan0, pixels, 0, byteCount);

            // Sample corner colors for background reference
            int bgR = (pixels[2] + pixels[(w - 1) * 4 + 2]) / 2;
            int bgG = (pixels[1] + pixels[(w - 1) * 4 + 1]) / 2;
            int bgB = (pixels[0] + pixels[(w - 1) * 4 + 0]) / 2;

            bool[] visited = new bool[w * h];
            var queue = new Queue<int>();

            // Seed from all edges
            for (int x = 0; x < w; x++) {
                queue.Enqueue(x); // top edge y=0
                visited[x] = true;
                int bottomIdx = (h - 1) * w + x;
                queue.Enqueue(bottomIdx); // bottom edge
                visited[bottomIdx] = true;
            }
            for (int y = 1; y < h - 1; y++) {
                int leftIdx = y * w;
                queue.Enqueue(leftIdx);
                visited[leftIdx] = true;
                int rightIdx = y * w + (w - 1);
                queue.Enqueue(rightIdx);
                visited[rightIdx] = true;
            }

            int[] dx = { 0, 0, 1, -1 };
            int[] dy = { 1, -1, 0, 0 };

            while (queue.Count > 0) {
                int curr = queue.Dequeue();
                int cx = curr % w;
                int cy = curr / w;
                int off = cy * bmpData.Stride + cx * 4;

                byte b = pixels[off];
                byte g_val = pixels[off + 1];
                byte r = pixels[off + 2];

                int dr = r - bgR;
                int dg = g_val - bgG;
                int db = b - bgB;
                double dist = Math.Sqrt(dr * dr + dg * dg + db * db);
                int lightness = (r + g_val + b) / 3;

                // Neutral studio background check
                bool isBg = (dist < threshold) || (lightness > 220 && Math.Abs(r - g_val) < 15 && Math.Abs(g_val - b) < 15);

                if (isBg) {
                    pixels[off + 3] = 0; // Make transparent

                    for (int i = 0; i < 4; i++) {
                        int nx = cx + dx[i];
                        int ny = cy + dy[i];
                        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                            int nIdx = ny * w + nx;
                            if (!visited[nIdx]) {
                                visited[nIdx] = true;
                                queue.Enqueue(nIdx);
                            }
                        }
                    }
                }
            }

            Marshal.Copy(pixels, 0, bmpData.Scan0, byteCount);
            bmp.UnlockBits(bmpData);
            bmp.Save(outputPath, ImageFormat.Png);
            bmp.Dispose();
        }
    }
}
'@

if (-not ([System.Management.Automation.PSTypeName]'ImageProcessor').Type) {
    Add-Type -TypeDefinition $csharp -ReferencedAssemblies System.Drawing
}

[ImageProcessor]::RemoveBackground($InputPath, $OutputPath, $Threshold)
Write-Host "Transformed $InputPath -> $OutputPath"
