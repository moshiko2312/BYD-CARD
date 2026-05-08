/* BYD 3D Card for Home Assistant
 * Custom Lovelace card with profile-based BYD entity mapping.
 */

const CARD_TYPE = "byd-3d-card";
const CARD_NAME = "BYD 3D Card";
const CARD_VERSION = "1.0.12";
const DEFAULT_ASSET_BASE_PATH = (() => {
  try {
    const base = new URL(".", import.meta.url).pathname;
    return base.replace(/\/$/, "") || "/local/byd-card";
  } catch (_err) {
    return "/local/byd-card";
  }
})();
const DEFAULT_IMAGE_BASE_PATH = DEFAULT_ASSET_BASE_PATH;
const DEFAULT_I18N_BASE_PATH = DEFAULT_ASSET_BASE_PATH;
const LEGACY_IMAGE_BASE_PATHS = new Set(["/local/byd-card/pic", `${DEFAULT_ASSET_BASE_PATH}/pic`]);
const LEGACY_I18N_BASE_PATHS = new Set(["/local/byd-card/i18n", `${DEFAULT_ASSET_BASE_PATH}/i18n`]);

const PROFILE_IMAGES = {
  atto3:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520">
  <defs>
    <linearGradient id="bg" x1="0" x2="1">
      <stop offset="0%" stop-color="#26384a"/>
      <stop offset="100%" stop-color="#0f141d"/>
    </linearGradient>
    <linearGradient id="car" x1="0" x2="1">
      <stop offset="0%" stop-color="#f7fbff"/>
      <stop offset="60%" stop-color="#cfd9e5"/>
      <stop offset="100%" stop-color="#9caab8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="520" fill="url(#bg)"/>
  <ellipse cx="600" cy="425" rx="430" ry="50" fill="rgba(0,0,0,0.38)"/>
  <path d="M170 323c21-57 78-108 146-130l160-50c42-14 86-16 130-7l219 41c58 11 110 42 148 88l63 75-18 35H128l42-52z" fill="url(#car)"/>
  <path d="M298 262l155-71c30-13 63-15 95-9l194 31c35 6 68 23 94 48l49 46H283l15-45z" fill="#1d2a37"/>
  <path d="M382 275h453c14 0 25 11 25 24v7H358v-6c0-14 11-25 24-25z" fill="#2a3a4d"/>
  <circle cx="360" cy="379" r="74" fill="#111822"/>
  <circle cx="360" cy="379" r="41" fill="#8ea0b3"/>
  <circle cx="849" cy="379" r="74" fill="#111822"/>
  <circle cx="849" cy="379" r="41" fill="#8ea0b3"/>
  <rect x="253" y="331" width="104" height="20" rx="10" fill="#d7e8f8"/>
  <rect x="858" y="331" width="90" height="20" rx="10" fill="#d7e8f8"/>
  <text x="74" y="92" fill="#ecf5ff" font-size="48" font-family="ui-sans-serif,Arial" font-weight="700">BYD ATTO 3</text>
</svg>
`),
  seal:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520">
  <defs>
    <linearGradient id="bg2" x1="0" x2="1">
      <stop offset="0%" stop-color="#1f2a3a"/>
      <stop offset="100%" stop-color="#0f1118"/>
    </linearGradient>
    <linearGradient id="car2" x1="0" x2="1">
      <stop offset="0%" stop-color="#72dbff"/>
      <stop offset="100%" stop-color="#2398d0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="520" fill="url(#bg2)"/>
  <ellipse cx="600" cy="426" rx="420" ry="46" fill="rgba(0,0,0,0.35)"/>
  <path d="M160 338c34-61 103-108 179-123l149-28c44-8 88-6 131 8l165 52c50 16 96 45 132 86l43 48-14 17H143l17-60z" fill="url(#car2)"/>
  <path d="M315 279l138-51c38-14 80-15 118-3l182 55c29 9 56 24 77 45H287z" fill="#0d2130"/>
  <circle cx="350" cy="381" r="70" fill="#101720"/>
  <circle cx="350" cy="381" r="38" fill="#95a2b1"/>
  <circle cx="848" cy="381" r="70" fill="#101720"/>
  <circle cx="848" cy="381" r="38" fill="#95a2b1"/>
  <text x="74" y="92" fill="#e7f8ff" font-size="48" font-family="ui-sans-serif,Arial" font-weight="700">BYD SEAL</text>
</svg>
`),
  dolphin:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520">
  <defs>
    <linearGradient id="bg3" x1="0" x2="1">
      <stop offset="0%" stop-color="#283b47"/>
      <stop offset="100%" stop-color="#0e151f"/>
    </linearGradient>
    <linearGradient id="car3" x1="0" x2="1">
      <stop offset="0%" stop-color="#f8fafd"/>
      <stop offset="100%" stop-color="#c3d3de"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="520" fill="url(#bg3)"/>
  <ellipse cx="600" cy="430" rx="402" ry="44" fill="rgba(0,0,0,0.35)"/>
  <path d="M185 333c26-56 84-103 151-122l159-41c42-10 86-9 127 4l164 49c53 16 101 47 136 89l42 50H170l15-29z" fill="url(#car3)"/>
  <path d="M332 273l128-44c36-12 75-12 111 1l184 64c23 8 44 20 61 36H299z" fill="#1e2f3f"/>
  <circle cx="355" cy="384" r="67" fill="#111a25"/>
  <circle cx="355" cy="384" r="36" fill="#9dabba"/>
  <circle cx="846" cy="384" r="67" fill="#111a25"/>
  <circle cx="846" cy="384" r="36" fill="#9dabba"/>
  <text x="74" y="92" fill="#f2fbff" font-size="48" font-family="ui-sans-serif,Arial" font-weight="700">BYD DOLPHIN</text>
</svg>
`),
  sealion7:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520">
  <defs>
    <linearGradient id="bg4" x1="0" x2="1">
      <stop offset="0%" stop-color="#313540"/>
      <stop offset="100%" stop-color="#0d1016"/>
    </linearGradient>
    <linearGradient id="car4" x1="0" x2="1">
      <stop offset="0%" stop-color="#d5dae2"/>
      <stop offset="100%" stop-color="#a8b5c4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="520" fill="url(#bg4)"/>
  <ellipse cx="600" cy="430" rx="444" ry="49" fill="rgba(0,0,0,0.42)"/>
  <path d="M155 341c24-66 89-116 170-132l182-34c43-8 86-6 128 6l187 55c55 16 103 49 137 94l31 43H139l16-32z" fill="url(#car4)"/>
  <path d="M327 275l133-45c44-15 93-14 136 4l180 72c19 8 36 19 49 33H290z" fill="#253140"/>
  <circle cx="345" cy="386" r="72" fill="#131c26"/>
  <circle cx="345" cy="386" r="39" fill="#8f9eae"/>
  <circle cx="860" cy="386" r="72" fill="#131c26"/>
  <circle cx="860" cy="386" r="39" fill="#8f9eae"/>
  <text x="74" y="92" fill="#ecf4ff" font-size="48" font-family="ui-sans-serif,Arial" font-weight="700">BYD SEALION 7</text>
</svg>
`),
};

const VEHICLE_PROFILES = {
  atto3: {
    label: "BYD ATTO 3",
    image: PROFILE_IMAGES.atto3,
    icon: "mdi:car-electric",
  },
  seal: {
    label: "BYD SEAL",
    image: PROFILE_IMAGES.seal,
    icon: "mdi:car-sports",
  },
  dolphin: {
    label: "BYD DOLPHIN",
    image: PROFILE_IMAGES.dolphin,
    icon: "mdi:car-electric-outline",
  },
  sealion7: {
    label: "BYD SEALION 7",
    image: PROFILE_IMAGES.sealion7,
    icon: "mdi:car-estate",
  },
};

const PROFILE_DEFAULTS = {
  atto3: { title: "BYD ATTO 3", entity_prefix: "byd_atto_3" },
  seal: { title: "BYD SEAL", entity_prefix: "byd_seal" },
  dolphin: { title: "BYD DOLPHIN", entity_prefix: "byd_dolphin" },
  sealion7: { title: "BYD SEALION 7", entity_prefix: "byd_sealion_7" },
};

const ENTITY_HINTS = {
  battery: { domains: ["sensor"], suffixes: ["battery_level", "elec_percent"] },
  range: { domains: ["sensor"], suffixes: ["range", "endurance_mileage", "endurance_mileage_v2"] },
  charging: { domains: ["binary_sensor"], suffixes: ["charging", "is_charging"] },
  battery_power: { domains: ["sensor"], suffixes: ["battery_power"] },
  climate: { domains: ["climate", "switch"], suffixes: ["climate", "a_c_on", "car_on"] },
  ac_switch: { domains: ["switch"], suffixes: ["a_c_on", "climate", "car_on"] },
  battery_heat: { domains: ["switch"], suffixes: ["battery_heat"] },
  cabin_temp: { domains: ["sensor"], suffixes: ["cabin_temperature", "temp_in_car"] },
  exterior_temp: { domains: ["sensor"], suffixes: ["exterior_temperature", "temp_out_car"] },
  doors: { domains: ["binary_sensor"], suffixes: ["doors", "is_any_door_open"] },
  windows: { domains: ["binary_sensor"], suffixes: ["windows", "is_any_window_open"] },
  speed: { domains: ["sensor"], suffixes: ["speed"] },
  odometer: { domains: ["sensor"], suffixes: ["odometer", "total_mileage", "total_mileage_v2"] },
  lock: { domains: ["lock"], suffixes: ["lock"] },
  online: { domains: ["binary_sensor", "sensor"], suffixes: ["online", "is_online"] },
  tire_fl: { domains: ["sensor"], suffixes: ["front_left_tire_pressure", "left_front_tire_pressure"] },
  tire_fr: { domains: ["sensor"], suffixes: ["front_right_tire_pressure", "right_front_tire_pressure"] },
  tire_rl: { domains: ["sensor"], suffixes: ["rear_left_tire_pressure", "left_rear_tire_pressure"] },
  tire_rr: { domains: ["sensor"], suffixes: ["rear_right_tire_pressure", "right_rear_tire_pressure"] },
  location: { domains: ["device_tracker"], suffixes: ["location"] },
  flash_lights: { domains: ["button"], suffixes: ["flash_lights"] },
  find_car: { domains: ["button"], suffixes: ["find_car"] },
  close_windows: { domains: ["button"], suffixes: ["close_windows"] },
  driver_seat_heat: { domains: ["select"], suffixes: ["driver_seat_heat", "driver_seat_heating", "driver_seat_ventilation"] },
  driver_seat_ventilation: { domains: ["select"], suffixes: ["driver_seat_ventilation"] },
  passenger_seat_heat: {
    domains: ["select"],
    suffixes: ["passenger_seat_heat", "passenger_seat_heating", "passenger_seat_ventilation"],
  },
  passenger_seat_ventilation: { domains: ["select"], suffixes: ["passenger_seat_ventilation"] },
  rear_left_seat_heat: { domains: ["select"], suffixes: ["rear_left_seat_heat", "rear_left_seat_heating"] },
  rear_right_seat_heat: { domains: ["select"], suffixes: ["rear_right_seat_heat", "rear_right_seat_heating"] },
  tirepressure_system: { domains: ["binary_sensor"], suffixes: ["tirepressure_system"] },
  rapid_tire_leak: { domains: ["binary_sensor"], suffixes: ["rapid_tire_leak"] },
  left_front_tire_status: { domains: ["binary_sensor"], suffixes: ["left_front_tire_status"] },
  right_front_tire_status: { domains: ["binary_sensor"], suffixes: ["right_front_tire_status"] },
  left_rear_tire_status: { domains: ["binary_sensor"], suffixes: ["left_rear_tire_status"] },
  right_rear_tire_status: { domains: ["binary_sensor"], suffixes: ["right_rear_tire_status"] },
  abs_warning: { domains: ["binary_sensor"], suffixes: ["abs_warning"] },
  braking_system: { domains: ["binary_sensor"], suffixes: ["braking_system"] },
  steering_system: { domains: ["binary_sensor"], suffixes: ["steering_system"] },
  charging_system: { domains: ["binary_sensor"], suffixes: ["charging_system"] },
  srs: { domains: ["binary_sensor"], suffixes: ["srs"] },
  svs: { domains: ["binary_sensor"], suffixes: ["svs"] },
};

const DEFAULT_CONFIG = {
  type: `custom:${CARD_TYPE}`,
  vehicle_profile: "atto3",
  title: "BYD",
  title_font_size: 46,
  entity_prefix: "",
  image_url: "",
  image_base_path: DEFAULT_IMAGE_BASE_PATH,
  i18n_base_path: DEFAULT_I18N_BASE_PATH,
  show_tires: true,
  show_actions: true,
  show_climate: true,
  show_seat_cooling: false,
  seat_passenger_mode: "heat",
  show_vehicle: true,
  show_location: true,
  require_unlock_pin: false,
  unlock_pin_code: "",
  show_external_entities: true,
  tire_pressure_unit: "psi",
  refresh_interval_seconds: 25,
  language: "he",
  category_order: ["summary", "climate", "vehicle", "tires", "location", "actions"],
  custom_entities: [],
  custom_entity_names: {},
  custom_entity_icons: {},
  entities: {},
};

const CATEGORY_DEFS = [
  { key: "summary", labelKey: "category_summary", icon: "mdi:car-electric" },
  { key: "climate", labelKey: "category_climate", icon: "mdi:air-conditioner" },
  { key: "vehicle", labelKey: "category_vehicle", icon: "mdi:car-info" },
  { key: "tires", labelKey: "category_tires", icon: "mdi:car-tire-alert" },
  { key: "location", labelKey: "category_location", icon: "mdi:map-marker-radius" },
  { key: "actions", labelKey: "category_actions", icon: "mdi:gesture-tap-button" },
];

const MDI_ICON_SUGGESTIONS = [
  "mdi:script-text-outline",
  "mdi:gate-open",
  "mdi:gate",
  "mdi:garage-open",
  "mdi:garage",
  "mdi:lightbulb",
  "mdi:lightbulb-outline",
  "mdi:toggle-switch-outline",
  "mdi:power",
  "mdi:power-plug",
  "mdi:flash",
  "mdi:flash-outline",
  "mdi:window-open-variant",
  "mdi:window-closed-variant",
  "mdi:blinds-open",
  "mdi:blinds",
  "mdi:door-open",
  "mdi:door-closed",
  "mdi:lock-open-variant-outline",
  "mdi:lock",
  "mdi:security",
  "mdi:cctv",
  "mdi:camera",
  "mdi:air-conditioner",
  "mdi:fan",
  "mdi:weather-night",
  "mdi:white-balance-sunny",
  "mdi:weather-partly-cloudy",
  "mdi:home",
  "mdi:home-outline",
  "mdi:home-automation",
  "mdi:robot",
  "mdi:calendar-check",
  "mdi:bell",
  "mdi:bell-ring",
  "mdi:alarm-light",
  "mdi:playlist-play",
  "mdi:play",
  "mdi:pause",
  "mdi:stop",
  "mdi:cast",
  "mdi:television",
  "mdi:speaker",
  "mdi:music",
  "mdi:car",
  "mdi:car-electric",
  "mdi:map-marker",
  "mdi:map-search",
  "mdi:water",
  "mdi:water-pump",
  "mdi:shower",
  "mdi:sprinkler",
  "mdi:leaf",
  "mdi:flower",
  "mdi:tree",
];
const MDI_ICON_META_URLS = [
  "https://cdn.jsdelivr.net/npm/@mdi/svg@latest/meta.json",
  "https://raw.githubusercontent.com/Templarian/MaterialDesign-SVG/master/meta.json",
];

const TRANSLATION_CACHE = new Map();
const FALLBACK_I18N = {
  yes: "כן",
  no: "לא",
  not_available: "לא זמין",
  locked: "נעול",
  unlocked: "פתוח",
  battery: "סוללה",
  battery_status: "סטטוס סוללה",
  charging: "בטעינה",
  not_charging: "לא בטעינה",
  charging_active: "הרכב בטעינה",
  charging_inactive: "לא בטעינה",
  power: "הספק",
  range_km: "ק״מ",
  speed_kmh: "קמ״ש",
  odometer_km: "ק״מ",
  interior_temp: "טמפ׳ פנים",
  exterior_temp: "טמפ׳ חוץ",
  speed: "מהירות",
  odometer: "קילומטראז׳",
  doors: "דלתות",
  windows: "חלונות",
  lock: "נעילה",
  online: "אונליין",
  category_summary: "סיכום",
  category_climate: "אקלים",
  category_vehicle: "רכב",
  category_tires: "צמיגים",
  category_actions: "פעולות מהירות",
  unlock: "פתיחה",
  category_location: "מיקום",
  ac: "מזגן",
  battery_heat: "חימום סוללה",
  flash_lights: "הבהוב אורות",
  find_car: "מצא רכב",
  close_windows: "סגור חלונות",
  open_map: "פתח מפה",
  close: "סגור",
  map_dialog_title: "מיקום רכב",
  map_unavailable: "אין נתוני מיקום זמינים",
  open_in_external_map: "פתח במפה חיצונית",
  settings_tire_pressure_unit: "יחידת לחץ צמיגים",
  tire_unit_psi: "PSI",
  tire_unit_kpa: "kPa",
  seat_heating: "חימום מושבים",
  seat_climate: "מצב מושבים",
  seat_driver: "נהג",
  seat_passenger: "נוסע",
  seat_rear_left: "אחורי שמאל",
  seat_rear_right: "אחורי ימין",
  level_off: "כבוי",
  level_low: "נמוך",
  level_medium: "בינוני",
  level_high: "גבוה",
  level_cool: "קירור",
  level_cooling: "קירור",
  level_heat: "חימום",
  level_heating: "חימום",
  level_ventilation: "אוורור",
  front_left: "קדמי שמאל",
  front_right: "קדמי ימין",
  rear_left: "אחורי שמאל",
  rear_right: "אחורי ימין",
  latitude: "קו רוחב",
  longitude: "קו אורך",
  gps_speed: "מהירות GPS",
  settings_title: "BYD 3D Card",
  settings_hint: "בחר פרופיל רכב, שפה וקטגוריות תצוגה.",
  settings_card_title: "כותרת",
  settings_title_font_size: "גודל כותרת (פיקסלים)",
  settings_title_font_size_hint: "שליטה בגודל הטקסט של כותרת הרכב בראש הכרטיס",
  settings_prefix: "קידומת ישות",
  settings_prefix_help: "לדוגמה: byd_atto_3 עבור sensor.byd_atto_3_battery_level",
  settings_image_url: "תמונת רכב (אופציונלי)",
  settings_image_base_path: "נתיב בסיס לתמונות פרופיל",
  settings_i18n_base_path: "נתיב בסיס לקבצי שפה",
  settings_refresh_interval: "רענון סטייט (שניות)",
  settings_refresh_interval_hint: "כמה מהר לעדכן חיווי מהשרת (מומלץ 20-30)",
  settings_language: "שפה",
  settings_categories: "קטגוריות",
  settings_category_order: "סדר קטגוריות",
  settings_category_order_hint: "גרור ושחרר כדי לשנות את הסדר בכפתורי הקטגוריות",
  settings_show_tires: "הצג צמיגים",
  settings_show_actions: "הצג פעולות מהירות",
  settings_show_climate: "הצג אקלים",
  settings_show_seat_cooling: "הצג קירור מושבים",
  settings_seat_mode: "מצב מושב נוסע",
  seat_mode_heat: "חימום",
  seat_mode_cool: "קירור",
  seat_mode_both: "שניהם",
  settings_show_vehicle: "הצג רכב",
  settings_show_location: "הצג מיקום",
  settings_require_unlock_pin: "דרוש קוד PIN לפני פתיחה",
  settings_unlock_pin_code: "קוד PIN לפתיחת רכב",
  settings_unlock_pin_hint: "הזן 4-8 ספרות. הקוד נשמר בהגדרות הכרטיס.",
  settings_external_actions: "פעולות חיצוניות",
  settings_show_external_entities: "הפעל פעולות חיצוניות",
  settings_external_config_open: "פתח הגדרות",
  settings_external_config_close: "סגור הגדרות",
  settings_external_customize_open: "ערוך שמות ואייקונים",
  settings_external_customize_close: "הסתר עריכת שמות ואייקונים",
  settings_external_selected_count: "יישויות שנבחרו",
  settings_external_entities: "ישויות להפעלה",
  settings_external_entities_hint: "בחירה מרובה (מכל דומיין). לחיצה על האייקון בתמונה תפתח פופ-אפ פעולות.",
  settings_external_entities_search_placeholder: "חפש ישויות בשם או ב-ID",
  settings_external_entities_available: "ישויות זמינות",
  settings_external_entities_selected: "ישויות נבחרות",
  settings_external_icons: "אייקונים מותאמים",
  settings_external_icons_hint: "לכל ישות אפשר להגדיר אייקון Material Design, לדוגמה: mdi:gate-open",
  settings_external_icon_placeholder: "mdi:script-text-outline",
  settings_external_name_placeholder: "שם תצוגה ליישות",
  settings_external_name_label: "שם",
  settings_external_icon_label: "אייקון",
  external_actions_title: "פעולות מהבית",
  external_actions_subtitle: "בחר פעולה להפעלה מהירה",
  external_actions_empty: "לא נבחרו ישויות",
  open_external_actions: "פתח פעולות חיצוניות",
  add_external_entity: "הוסף יישות",
  state_on: "דולק",
  state_off: "כבוי",
  state_open: "פתוח",
  state_closed: "סגור",
  state_opening: "נפתח",
  state_closing: "נסגר",
  state_running: "פועל",
  state_idle: "מוכן",
  state_unavailable: "לא זמין",
  state_playing: "מנגן",
  state_paused: "מושהה",
  state_locked: "נעול",
  state_unlocked: "פתוח",
  climate_controls: "שליטת מזגן",
  turn_on: "הדלק",
  turn_off: "כבה",
  target_temp: "טמפ׳ יעד",
  max_cool: "מקסימום קירור",
  max_heat: "מקסימום חימום",
  comfort_21: "נוחות 21°",
  alert_header: "התראת רכב",
  confirm_unlock: "האם אתה בטוח שברצונך לפתוח את הרכב?",
  unlock_pin_placeholder: "הזן PIN",
  unlock_pin_clear: "ניקוי",
  unlock_pin_enter: "Enter",
  unlock_pin_required: "נא להזין קוד PIN.",
  unlock_pin_incorrect: "קוד PIN שגוי.",
  unlock_pin_not_configured: "לא הוגדר קוד PIN תקין בהגדרות הכרטיס.",
  executed: "בוצע",
  alert_more: "תקלות נוספות",
  alert_tire_pressure_low: "לחץ אוויר נמוך",
  alert_tire_pressure_critical: "לחץ אוויר קריטי",
  alert_system_fault: "תקלה במערכת",
  alert_header_single: "התראה ברכב",
  alert_tpms: "TPMS",
  alert_abs: "ABS",
  alert_brake: "בלם",
  alert_steering: "הגה",
  alert_charging: "טעינה",
  alert_srs: "SRS",
  alert_svs: "SVS",
  settings_vehicle_profile: "פרופיל רכב",
  aria_vehicle_categories: "קטגוריות רכב",
};

const ALERT_I18N = {
  he: {
    alert_header: "התראת רכב",
    alert_header_single: "התראה ברכב",
    alert_tire_pressure_low: "לחץ אוויר נמוך",
    alert_tire_pressure_critical: "לחץ אוויר קריטי",
    alert_system_fault: "תקלה במערכת",
    front_left: "קדמי שמאל",
    front_right: "קדמי ימין",
    rear_left: "אחורי שמאל",
    rear_right: "אחורי ימין",
    rapid_tire_leak: "דליפת אוויר מהירה",
    alert_tpms: "TPMS",
    alert_abs: "ABS",
    alert_brake: "בלם",
    alert_steering: "הגה",
    alert_charging: "טעינה",
    alert_srs: "SRS",
    alert_svs: "SVS",
  },
  en: {
    alert_header: "Vehicle alert",
    alert_header_single: "Alert in vehicle",
    alert_tire_pressure_low: "Low tire pressure",
    alert_tire_pressure_critical: "Critical tire pressure",
    alert_system_fault: "System fault",
    front_left: "Front left",
    front_right: "Front right",
    rear_left: "Rear left",
    rear_right: "Rear right",
    rapid_tire_leak: "Rapid tire leak",
    alert_tpms: "TPMS",
    alert_abs: "ABS",
    alert_brake: "Brake",
    alert_steering: "Steering",
    alert_charging: "Charging",
    alert_srs: "SRS",
    alert_svs: "SVS",
  },
  ru: {
    alert_header: "Предупреждение авто",
    alert_header_single: "Предупреждение в авто",
    alert_tire_pressure_low: "Низкое давление в шине",
    alert_tire_pressure_critical: "Критическое давление в шине",
    alert_system_fault: "Системная ошибка",
    front_left: "Передняя левая",
    front_right: "Передняя правая",
    rear_left: "Задняя левая",
    rear_right: "Задняя правая",
    rapid_tire_leak: "Быстрая утечка в шине",
    alert_tpms: "TPMS",
    alert_abs: "ABS",
    alert_brake: "Тормоза",
    alert_steering: "Рулевое",
    alert_charging: "Зарядка",
    alert_srs: "SRS",
    alert_svs: "SVS",
  },
  fr: {
    alert_header: "Alerte véhicule",
    alert_header_single: "Alerte dans le véhicule",
    alert_tire_pressure_low: "Pression pneu faible",
    alert_tire_pressure_critical: "Pression pneu critique",
    alert_system_fault: "Défaut système",
    front_left: "Avant gauche",
    front_right: "Avant droite",
    rear_left: "Arrière gauche",
    rear_right: "Arrière droite",
    rapid_tire_leak: "Fuite rapide du pneu",
    alert_tpms: "TPMS",
    alert_abs: "ABS",
    alert_brake: "Freinage",
    alert_steering: "Direction",
    alert_charging: "Charge",
    alert_srs: "SRS",
    alert_svs: "SVS",
  },
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toNumber(value) {
  if (value === null || value === undefined || value === "unknown" || value === "unavailable") {
    return null;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeSeatPassengerMode(value, fallbackShowCooling = false) {
  const raw = String(value || "").trim().toLowerCase();
  if (raw === "cool" || raw === "cooling") return "cool";
  if (raw === "heat" || raw === "heating") return "heat";
  if (raw === "both") return "both";
  return fallbackShowCooling ? "cool" : "heat";
}

function normalizeTirePressureUnit(value) {
  const raw = String(value || "").trim().toLowerCase();
  return raw === "kpa" ? "kpa" : "psi";
}

function normalizeExternalEntitiesEnabled(value) {
  return value !== false;
}

function normalizeUnlockPinEnabled(value) {
  return value === true;
}

function normalizeUnlockPinCode(value) {
  return String(value || "")
    .replace(/\D+/g, "")
    .slice(0, 8);
}

function normalizeImageBasePath(value) {
  const cleaned = String(value || "").trim().replace(/\/$/, "");
  if (!cleaned) return DEFAULT_IMAGE_BASE_PATH;
  if (LEGACY_IMAGE_BASE_PATHS.has(cleaned)) return DEFAULT_IMAGE_BASE_PATH;
  return cleaned;
}

function normalizeI18nBasePath(value) {
  const cleaned = String(value || "").trim().replace(/\/$/, "");
  if (!cleaned) return DEFAULT_I18N_BASE_PATH;
  if (LEGACY_I18N_BASE_PATHS.has(cleaned)) return DEFAULT_I18N_BASE_PATH;
  return cleaned;
}

function normalizeCustomEntities(value) {
  if (!Array.isArray(value)) return [];
  const out = [];
  const seen = new Set();
  for (const item of value) {
    const eid = String(item || "").trim();
    if (!eid || !eid.includes(".")) continue;
    if (seen.has(eid)) continue;
    seen.add(eid);
    out.push(eid);
  }
  return out;
}

function normalizeCustomEntityIcons(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const out = {};
  for (const [entityId, iconRaw] of Object.entries(value)) {
    const eid = String(entityId || "").trim();
    const icon = String(iconRaw || "").trim();
    if (!eid || !eid.includes(".") || !icon) continue;
    out[eid] = icon;
  }
  return out;
}

function normalizeCustomEntityNames(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const out = {};
  for (const [entityId, nameRaw] of Object.entries(value)) {
    const eid = String(entityId || "").trim();
    const name = String(nameRaw || "").trim();
    if (!eid || !eid.includes(".") || !name) continue;
    out[eid] = name;
  }
  return out;
}

function pruneCustomEntityIcons(iconMap, selectedEntities) {
  const normalizedMap = normalizeCustomEntityIcons(iconMap);
  const allowed = new Set(normalizeCustomEntities(selectedEntities));
  const out = {};
  for (const [entityId, icon] of Object.entries(normalizedMap)) {
    if (allowed.has(entityId)) out[entityId] = icon;
  }
  return out;
}

function pruneCustomEntityNames(nameMap, selectedEntities) {
  const normalizedMap = normalizeCustomEntityNames(nameMap);
  const allowed = new Set(normalizeCustomEntities(selectedEntities));
  const out = {};
  for (const [entityId, name] of Object.entries(normalizedMap)) {
    if (allowed.has(entityId)) out[entityId] = name;
  }
  return out;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fireConfigChanged(element, config) {
  const event = new Event("config-changed", { bubbles: true, composed: true });
  event.detail = { config };
  element.dispatchEvent(event);
}

class Byd3DCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement("byd-3d-card-editor");
  }

  static getStubConfig() {
    return {
      vehicle_profile: "atto3",
      title: "BYD ATTO 3",
      entity_prefix: "byd_atto_3",
    };
  }

  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config, entities: { ...(config.entities || {}) } };
    this._config.seat_passenger_mode = normalizeSeatPassengerMode(
      config?.seat_passenger_mode,
      Boolean(config?.show_seat_cooling)
    );
    this._config.show_seat_cooling = this._config.seat_passenger_mode === "cool";
    this._config.show_external_entities = normalizeExternalEntitiesEnabled(this._config.show_external_entities);
    this._config.require_unlock_pin = normalizeUnlockPinEnabled(this._config.require_unlock_pin);
    this._config.unlock_pin_code = normalizeUnlockPinCode(this._config.unlock_pin_code);
    this._config.category_order = this._normalizeCategoryOrder(this._config.category_order);
    this._config.tire_pressure_unit = normalizeTirePressureUnit(this._config.tire_pressure_unit);
    this._config.image_base_path = normalizeImageBasePath(this._config.image_base_path);
    this._config.i18n_base_path = normalizeI18nBasePath(this._config.i18n_base_path);
    this._config.custom_entities = normalizeCustomEntities(this._config.custom_entities);
    this._config.custom_entity_names = pruneCustomEntityNames(
      this._config.custom_entity_names,
      this._config.custom_entities
    );
    this._config.custom_entity_icons = pruneCustomEntityIcons(
      this._config.custom_entity_icons,
      this._config.custom_entities
    );
    this._config.refresh_interval_seconds = this._normalizeRefreshInterval(this._config.refresh_interval_seconds);
    this._config.title_font_size = this._normalizeTitleFontSize(this._config.title_font_size);
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this._lastRenderSnapshot = "";
    this._restartAutoRefreshLoop();
    const storedCategory = this._loadStoredCategory();
    this._activeCategory = storedCategory || this._activeCategory || "summary";
    if (!this._seatUiOverrides) {
      this._seatUiOverrides = {};
    }
    this._confirmation = null;
    this._locationMapDialog = null;
    this._customEntitiesDialogOpen = false;
    this._buttonFeedbacks = new Map();
    if (!this._config.show_external_entities) {
      this._customEntitiesDialogOpen = false;
    }
    this._translations = FALLBACK_I18N;
    this._loadTranslations();
    this._render();
  }

  _normalizeCategoryOrder(order) {
    const base = CATEGORY_DEFS.map((c) => c.key);
    if (!Array.isArray(order) || order.length === 0) return [...base];
    const cleaned = order.filter((k) => base.includes(k));
    for (const k of base) {
      if (!cleaned.includes(k)) cleaned.push(k);
    }
    return cleaned;
  }

  _storageCategoryKey() {
    const prefix = this._config?.entity_prefix || "auto";
    const profile = this._config?.vehicle_profile || "default";
    const title = this._config?.title || "byd";
    const path = window?.location?.pathname || "";
    return `byd3d:last-category:${path}:${profile}:${prefix}:${title}`;
  }

  _loadStoredCategory() {
    try {
      const key = this._storageCategoryKey();
      const stored = window.localStorage.getItem(key);
      if (!stored) return null;
      const valid = CATEGORY_DEFS.some((cat) => cat.key === stored);
      return valid ? stored : null;
    } catch (_err) {
      return null;
    }
  }

  _persistActiveCategory(key) {
    try {
      if (!key) return;
      const valid = CATEGORY_DEFS.some((cat) => cat.key === key);
      if (!valid) return;
      window.localStorage.setItem(this._storageCategoryKey(), key);
    } catch (_err) {
      // no-op: storage might be blocked by browser policy
    }
  }

  _getRefreshEntityIds() {
    if (!this._config) return [];
    const logicalKeys = [
      "battery",
      "range",
      "charging",
      "battery_power",
      "climate",
      "ac_switch",
      "battery_heat",
      "driver_seat_heat",
      "driver_seat_ventilation",
      "passenger_seat_heat",
      "passenger_seat_ventilation",
      "rear_left_seat_heat",
      "rear_right_seat_heat",
      "doors",
      "windows",
      "lock",
      "online",
      "tire_fl",
      "tire_fr",
      "tire_rl",
      "tire_rr",
      "location",
    ];
    const ids = logicalKeys
      .map((key) => this._resolveEntity(key))
      .filter(Boolean);
    const customIds = this._customEntities().filter((entityId) => Boolean(this._hass?.states?.[entityId]));
    return [...new Set([...ids, ...customIds])];
  }

  _refreshStateEntities(force = false) {
    if (!this._hass || !this._config) return;
    const now = Date.now();
    if (!force && this._lastRefreshRequestTs && now - this._lastRefreshRequestTs < 7000) {
      return;
    }
    const entityIds = this._getRefreshEntityIds();
    if (!entityIds.length) return;
    this._lastRefreshRequestTs = now;
    this._hass.callService("homeassistant", "update_entity", {
      entity_id: entityIds,
    });
  }

  _normalizeRefreshInterval(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 25;
    return clamp(Math.round(n), 8, 120);
  }

  _normalizeTitleFontSize(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 46;
    return clamp(Math.round(n), 24, 72);
  }

  _getAutoRefreshIntervalMs() {
    const seconds = this._normalizeRefreshInterval(this._config?.refresh_interval_seconds);
    return seconds * 1000;
  }

  _schedulePostActionRefresh() {
    if (this._postActionTimers?.length) {
      this._postActionTimers.forEach((timer) => window.clearTimeout(timer));
    }
    this._postActionTimers = [1200, 4200, 9000].map((delay) =>
      window.setTimeout(() => this._refreshStateEntities(true), delay)
    );
  }

  _startAutoRefreshLoop() {
    if (this._autoRefreshStarted) return;
    this._autoRefreshStarted = true;
    this._onVisibilityRefresh = () => {
      if (document.visibilityState === "visible") this._refreshStateEntities(true);
    };
    document.addEventListener("visibilitychange", this._onVisibilityRefresh);
    this._autoRefreshTimer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        this._refreshStateEntities(false);
      }
    }, this._getAutoRefreshIntervalMs());
    this._refreshStateEntities(true);
  }

  _stopAutoRefreshLoop() {
    this._autoRefreshStarted = false;
    if (this._autoRefreshTimer) {
      window.clearInterval(this._autoRefreshTimer);
      this._autoRefreshTimer = null;
    }
    if (this._onVisibilityRefresh) {
      document.removeEventListener("visibilitychange", this._onVisibilityRefresh);
      this._onVisibilityRefresh = null;
    }
    if (this._postActionTimers?.length) {
      this._postActionTimers.forEach((timer) => window.clearTimeout(timer));
      this._postActionTimers = [];
    }
  }

  _restartAutoRefreshLoop() {
    if (!this._autoRefreshStarted) return;
    this._stopAutoRefreshLoop();
    this._startAutoRefreshLoop();
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    const nextSnapshot = this._buildRenderSnapshot();
    if (nextSnapshot === this._lastRenderSnapshot) return;
    this._lastRenderSnapshot = nextSnapshot;
    this._render();
  }

  connectedCallback() {
    this._startAutoRefreshLoop();
  }

  disconnectedCallback() {
    this._stopAutoRefreshLoop();
  }

  getCardSize() {
    return 8;
  }

  getGridOptions() {
    return { rows: 8, columns: 12, min_rows: 6 };
  }

  _snapshotStateValue(logicalKey) {
    const eid = this._resolveEntity(logicalKey);
    if (!eid || !this._hass?.states?.[eid]) return `${logicalKey}:na`;
    const state = this._hass.states[eid];
    const attrs = state.attributes || {};

    if (logicalKey === "climate") {
      return `${logicalKey}:${state.state}|${attrs.temperature ?? ""}|${attrs.min_temp ?? ""}|${attrs.max_temp ?? ""}|${attrs.preset_mode ?? ""}|${attrs.hvac_mode ?? ""}`;
    }
    if (logicalKey === "location") {
      return `${logicalKey}:${state.state}|${attrs.latitude ?? ""}|${attrs.longitude ?? ""}|${attrs.gps_speed ?? ""}`;
    }
    if (logicalKey === "battery_power") {
      return `${logicalKey}:${state.state}|${attrs.unit_of_measurement ?? ""}`;
    }
    return `${logicalKey}:${state.state}`;
  }

  _buildRenderSnapshot() {
    if (!this._hass || !this._config) return "no-data";
    const keys = [
      "battery",
      "range",
      "charging",
      "battery_power",
      "cabin_temp",
      "exterior_temp",
      "speed",
      "odometer",
      "doors",
      "windows",
      "lock",
      "online",
      "climate",
      "ac_switch",
      "battery_heat",
      "driver_seat_heat",
      "driver_seat_ventilation",
      "passenger_seat_heat",
      "passenger_seat_ventilation",
      "rear_left_seat_heat",
      "rear_right_seat_heat",
      "tire_fl",
      "tire_fr",
      "tire_rl",
      "tire_rr",
      "location",
      "tirepressure_system",
      "rapid_tire_leak",
      "left_front_tire_status",
      "right_front_tire_status",
      "left_rear_tire_status",
      "right_rear_tire_status",
      "abs_warning",
      "braking_system",
      "steering_system",
      "charging_system",
      "srs",
      "svs",
    ];

    const values = keys.map((key) => this._snapshotStateValue(key));
    for (const entityId of this._customEntities()) {
      const st = this._hass?.states?.[entityId];
      if (!st) {
        values.push(`custom:${entityId}:na`);
        continue;
      }
      values.push(`custom:${entityId}:${st.state}|${st.attributes?.icon ?? ""}|${st.attributes?.unit_of_measurement ?? ""}`);
    }
    values.push(`lang:${this._language()}`);
    values.push(`cat:${this._activeCategory || "summary"}`);
    return values.join("||");
  }

  _resolvePrefix() {
    if (this._config.entity_prefix) return this._config.entity_prefix;
    if (!this._hass || !this._hass.states || typeof this._hass.states !== "object") return "";
    const states = Object.keys(this._hass.states);
    const probe = states.find((eid) => /^sensor\..+_(battery_level|elec_percent)$/.test(eid));
    if (!probe) return "";
    const [domain, objectId] = probe.split(".");
    if (domain !== "sensor" || !objectId) return "";
    return objectId.replace(/_(battery_level|elec_percent)$/, "");
  }

  _seatPassengerMode() {
    return normalizeSeatPassengerMode(this._config?.seat_passenger_mode, Boolean(this._config?.show_seat_cooling));
  }

  _isSeatCoolingEnabled() {
    return this._seatPassengerMode() === "cool" || this._seatPassengerMode() === "both";
  }

  _resolveEntity(logicalKey) {
    const override = this._config.entities?.[logicalKey];
    if (override) return override;
    if (!this._hass || !this._hass.states || typeof this._hass.states !== "object") return null;

    const hint = ENTITY_HINTS[logicalKey];
    if (!hint) return null;
    const suffixes = this._preferredSuffixesForLogicalKey(logicalKey, hint.suffixes);
    const prefix = this._resolvePrefix();
    const all = this._hass.states;

    if (prefix) {
      for (const domain of hint.domains) {
        for (const suffix of suffixes) {
          const candidate = `${domain}.${prefix}_${suffix}`;
          if (all[candidate]) return candidate;
        }
      }
    }

    // Soft fallback for users with renamed object ids.
    const ids = Object.keys(all);
    for (const domain of hint.domains) {
      const pool = ids.filter((id) => id.startsWith(`${domain}.`));
      for (const suffix of suffixes) {
        const found = pool.find((id) => id.endsWith(`_${suffix}`));
        if (found) return found;
      }
    }
    return null;
  }

  _preferredSuffixesForLogicalKey(logicalKey, suffixes) {
    const ordered = Array.isArray(suffixes) ? [...suffixes] : [];
    const coolingMap = {
      driver_seat_heat: "driver_seat_ventilation",
      passenger_seat_heat: "passenger_seat_ventilation",
    };
    const coolingSuffix = coolingMap[logicalKey];
    if (!coolingSuffix || !ordered.includes(coolingSuffix)) return ordered;
    const withoutCooling = ordered.filter((suffix) => suffix !== coolingSuffix);
    const mode = this._seatPassengerMode();
    if (mode === "both") {
      return ordered; // include both
    }
    if (mode === "cool") {
      return [coolingSuffix, ...withoutCooling];
    }
    return [...withoutCooling, coolingSuffix];
  }

  _profileImage(profileKey) {
    const basePath = (this._config.image_base_path || DEFAULT_IMAGE_BASE_PATH).replace(/\/$/, "");
    const localMap = {
      atto3: `${basePath}/bydatoo3.png`,
      seal: `${basePath}/seal.png`,
      dolphin: `${basePath}/byd_dolphin.png`,
      sealion7: `${basePath}/sealion.png`,
    };
    return localMap[profileKey] || null;
  }

  _language() {
    return this._config?.language || "he";
  }

  _t(key) {
    return this._translations?.[key] || FALLBACK_I18N[key] || key;
  }

  _ta(key) {
    const lang = this._language();
    return ALERT_I18N[lang]?.[key] || this._translations?.[key] || FALLBACK_I18N[key] || key;
  }

  _boolLabel(state) {
    if (state === "on") return this._t("yes");
    if (state === "off") return this._t("no");
    if (state === "locked") return this._t("locked");
    if (state === "unlocked") return this._t("unlocked");
    return this._t("not_available");
  }

  _openClosedLabel(state) {
    if (state === "on" || state === "unlocked") return this._t("unlocked");
    if (state === "off" || state === "locked") return this._t("locked");
    return this._t("not_available");
  }

  _tirePressureUnit() {
    return normalizeTirePressureUnit(this._config?.tire_pressure_unit);
  }

  _tirePressureUnitLabel(unit) {
    if (unit === "kpa") return this._t("tire_unit_kpa");
    return this._t("tire_unit_psi");
  }

  _normalizePressureSensorUnit(rawUnit) {
    const unit = String(rawUnit || "").trim().toLowerCase().replace(/\s+/g, "");
    if (!unit) return null;
    if (unit === "kpa" || unit === "kilopascal" || unit === "kilopascals") return "kpa";
    if (unit === "psi") return "psi";
    if (unit === "bar") return "bar";
    return null;
  }

  _convertPressureUnit(value, fromUnit, toUnit) {
    if (!Number.isFinite(value)) return null;
    if (fromUnit === toUnit) return value;

    let kpa = value;
    if (fromUnit === "psi") kpa = value * 6.89476;
    if (fromUnit === "bar") kpa = value * 100;

    if (toUnit === "kpa") return kpa;
    if (toUnit === "psi") return kpa * 0.145038;
    if (toUnit === "bar") return kpa / 100;
    return value;
  }

  _tirePressureDisplayValue(logicalKey, unit) {
    const state = this._state(logicalKey);
    const value = toNumber(state?.state);
    if (value === null) return null;
    const sourceUnit = this._normalizePressureSensorUnit(state?.attributes?.unit_of_measurement) || "kpa";
    const converted = this._convertPressureUnit(value, sourceUnit, unit);
    return Number.isFinite(converted) ? converted : null;
  }

  _tirePressureThresholds(unit) {
    if (unit === "kpa") {
      return {
        critical: 28 * 6.89476,
        low: 30 * 6.89476,
      };
    }
    return { critical: 28, low: 30 };
  }

  _formatTirePressure(value, unit) {
    if (!Number.isFinite(value)) return "-";
    return unit === "kpa" ? value.toFixed(0) : value.toFixed(1);
  }

  _isTruthyState(raw) {
    const value = String(raw || "").trim().toLowerCase();
    if (!value) return false;
    const falseLike = new Set([
      "off",
      "false",
      "0",
      "none",
      "idle",
      "inactive",
      "unknown",
      "unavailable",
      "no_data",
      "none_selected",
      "none_selected_",
      "כבוי",
      "לא פעיל",
    ]);
    if (falseLike.has(value)) return false;
    return true;
  }

  _isClimateActive(raw) {
    const value = String(raw || "").trim().toLowerCase();
    if (!value) return false;
    const activeValues = new Set([
      "on",
      "auto",
      "cool",
      "heat",
      "heat_cool",
      "dry",
      "fan_only",
      "heating",
      "cooling",
      "preheating",
      "ventilation",
    ]);
    if (activeValues.has(value)) return true;
    return this._isTruthyState(value);
  }

  _isSeatHeatActive(raw) {
    const value = String(raw || "").trim().toLowerCase();
    if (!value) return false;
    const inactive = new Set(["off", "0", "none", "no_data", "unknown", "unavailable", "כבוי"]);
    if (inactive.has(value)) return false;
    const active = new Set([
      "on",
      "1",
      "2",
      "3",
      "low",
      "medium",
      "mid",
      "middle",
      "high",
      "cool",
      "cooling",
      "vent",
      "ventilation",
      "fan",
      "נמוך",
      "בינוני",
      "גבוה",
      "קירור",
      "אוורור",
      "חזק",
    ]);
    if (active.has(value)) return true;
    return this._isTruthyState(value);
  }

  _seatControlOptions(seatState) {
    const rawOptions = Array.isArray(seatState?.attributes?.options) ? seatState.attributes.options : [];
    const normalized = [];
    for (const option of rawOptions) {
      const value = String(option || "").trim();
      if (!value) continue;
      const lower = value.toLowerCase();
      if (normalized.some((entry) => entry.toLowerCase() === lower)) continue;
      normalized.push(value);
    }
    const showSeatCooling = this._isSeatCoolingEnabled();
    const filtered = normalized.filter((option) => showSeatCooling || !this._isSeatCoolingOption(option));
    if (filtered.length) return filtered;
    if (normalized.length) return [];
    return ["off", "low", "high"];
  }

  _isSeatCoolingOption(option) {
    const normalized = String(option || "").trim().toLowerCase();
    if (!normalized) return false;
    return ["cool", "cooling", "max_cool", "cold", "vent", "ventilation", "fan", "קירור", "אוורור"].includes(normalized);
  }

  _seatOptionLabel(option) {
    const normalized = String(option || "").trim().toLowerCase();
    const translated = this._t(`level_${normalized}`);
    if (translated && translated !== `level_${normalized}`) return translated;
    return String(option || "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  _seatOptionTone(option) {
    const normalized = String(option || "").trim().toLowerCase();
    if (!normalized) return "";
    if (["off", "0", "none", "none_selected", "כבוי"].includes(normalized)) return "off";
    if (["low", "1"].includes(normalized)) return "low";
    if (["medium", "mid", "middle", "2"].includes(normalized)) return "medium";
    if (
      ["high", "3", "heat", "heating", "max_heat", "warm", "hot", "חימום", "גבוה", "חזק"].includes(normalized)
    ) {
      return "high";
    }
    if (
      ["cool", "cooling", "max_cool", "cold", "vent", "ventilation", "fan", "קירור", "אוורור"].includes(normalized)
    ) {
      return "cool";
    }
    return normalized.replace(/[^a-z0-9_-]/g, "-");
  }

  async _loadTranslations() {
    const lang = this._language();
    const cacheKey = `${lang}:${this._config.i18n_base_path || ""}`;
    if (TRANSLATION_CACHE.has(cacheKey)) {
      this._translations = TRANSLATION_CACHE.get(cacheKey);
      this._render();
      return;
    }
    const base = (this._config.i18n_base_path || DEFAULT_I18N_BASE_PATH).replace(/\/$/, "");
    try {
      const response = await fetch(`${base}/${lang}.json`, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      this._translations = { ...FALLBACK_I18N, ...json };
      TRANSLATION_CACHE.set(cacheKey, this._translations);
      this._render();
    } catch (_err) {
      this._translations = FALLBACK_I18N;
      this._render();
    }
  }

  _state(logicalKey) {
    const eid = this._resolveEntity(logicalKey);
    if (!eid || !this._hass?.states[eid]) return null;
    return this._hass.states[eid];
  }

  _isUnlockPinRequired() {
    return normalizeUnlockPinEnabled(this._config?.require_unlock_pin);
  }

  _configuredUnlockPin() {
    return normalizeUnlockPinCode(this._config?.unlock_pin_code);
  }

  _validateUnlockPin(inputValue) {
    if (!this._isUnlockPinRequired()) return { ok: true, error: "" };
    const expectedPin = this._configuredUnlockPin();
    if (expectedPin.length < 4) return { ok: false, error: this._t("unlock_pin_not_configured") };
    const providedPin = normalizeUnlockPinCode(inputValue);
    if (!providedPin) return { ok: false, error: this._t("unlock_pin_required") };
    if (providedPin !== expectedPin) return { ok: false, error: this._t("unlock_pin_incorrect") };
    return { ok: true, error: "" };
  }

  _setConfirmationPinValue(value, error = "") {
    if (!this._confirmation) return;
    this._confirmation = {
      ...this._confirmation,
      pinValue: normalizeUnlockPinCode(value),
      pinError: error || "",
    };
    this._render();
  }

  _applyConfirmationPinKey(key) {
    if (!this._confirmation) return;
    const current = normalizeUnlockPinCode(this._confirmation.pinValue);
    if (key === "clear") {
      this._setConfirmationPinValue("", "");
      return;
    }
    if (key === "backspace") {
      this._setConfirmationPinValue(current.slice(0, -1), "");
      return;
    }
    if (!/^\d$/.test(String(key))) return;
    this._setConfirmationPinValue(`${current}${key}`, "");
  }

  _submitConfirmationUnlock() {
    if (!this._confirmation) return;
    if (this._confirmation.type !== "unlock" && this._confirmation.type !== "unlock_entity") return;
    const pinValue = this._confirmation.pinValue || "";
    const pinValidation = this._validateUnlockPin(pinValue);
    if (!pinValidation.ok) {
      this._setConfirmationPinValue(pinValue, pinValidation.error);
      return;
    }
    if (this._confirmation.type === "unlock") {
      this._callLock(this._confirmation.key, true);
    } else if (this._confirmation.type === "unlock_entity" && this._confirmation.entityId && this._hass) {
      this._hass.callService("lock", "unlock", { entity_id: this._confirmation.entityId });
      this._schedulePostActionRefresh();
    }
    this._hideConfirmation();
  }

  _callToggle(logicalKey) {
    const eid = this._resolveEntity(logicalKey);
    if (!eid || !this._hass) return;
    const [domain] = eid.split(".");
    if (!domain) return;

    if (domain === "lock") {
      const state = this._state(logicalKey)?.state;
      const isLocked = state === "locked" || state === "off";
      if (isLocked) {
        this._showConfirmation("unlock", { key: logicalKey });
        return;
      }
      this._callLock(logicalKey, false);
      return;
    }

    this._hass.callService(domain, "toggle", { entity_id: eid });
    this._schedulePostActionRefresh();
  }

  _callLock(logicalKey, unlock) {
    const eid = this._resolveEntity(logicalKey);
    if (!eid || !this._hass) return;
    const service = unlock ? "unlock" : "lock";
    this._hass.callService("lock", service, { entity_id: eid });
    this._schedulePostActionRefresh();
  }

  _showConfirmation(type, payload = {}) {
    this._confirmation = { type, pinValue: "", pinError: "", ...payload };
    this._render();
  }

  _hideConfirmation() {
    this._confirmation = null;
    this._render();
  }

  _callClimatePower(on) {
    const eid = this._resolveEntity("climate");
    if (!eid || !this._hass) return;
    const [domain] = eid.split(".");
    if (domain === "climate") {
      this._hass.callService("climate", "set_hvac_mode", {
        entity_id: eid,
        hvac_mode: on ? "heat_cool" : "off",
      });
      this._schedulePostActionRefresh();
      return;
    }
    this._hass.callService(domain, "toggle", { entity_id: eid });
    this._schedulePostActionRefresh();
  }

  _callClimateSetTemp(temp) {
    const eid = this._resolveEntity("climate");
    if (!eid || !this._hass) return;
    const [domain] = eid.split(".");
    if (domain !== "climate") return;
    this._hass.callService("climate", "set_temperature", {
      entity_id: eid,
      temperature: temp,
    });
    this._schedulePostActionRefresh();
  }

  _callClimatePreset(presetMode) {
    const eid = this._resolveEntity("climate");
    if (!eid || !this._hass) return;
    const [domain] = eid.split(".");
    if (domain !== "climate") return;
    this._hass.callService("climate", "set_preset_mode", {
      entity_id: eid,
      preset_mode: presetMode,
    });
    this._schedulePostActionRefresh();
  }

  _callButton(logicalKey) {
    const eid = this._resolveEntity(logicalKey);
    if (!eid || !this._hass) return;
    this._hass.callService("button", "press", { entity_id: eid });
    this._schedulePostActionRefresh();
  }

  _customEntities() {
    if (!normalizeExternalEntitiesEnabled(this._config?.show_external_entities)) return [];
    return normalizeCustomEntities(this._config?.custom_entities);
  }

  _customEntityLabel(entityId) {
    const customName = String(this._config?.custom_entity_names?.[entityId] || "").trim();
    if (customName) return customName;
    const stateObj = this._hass?.states?.[entityId];
    const named = stateObj?.attributes?.friendly_name;
    if (named) return String(named);
    const objectId = entityId.includes(".") ? entityId.split(".")[1] : entityId;
    return String(objectId)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  _customEntityIcon(entityId) {
    const customIcon = String(this._config?.custom_entity_icons?.[entityId] || "").trim();
    if (customIcon) return customIcon;
    const stateObj = this._hass?.states?.[entityId];
    const icon = stateObj?.attributes?.icon;
    if (icon) return icon;
    const domain = String(entityId || "").split(".")[0] || "";
    const map = {
      script: "mdi:script-text-outline",
      scene: "mdi:palette-outline",
      light: "mdi:lightbulb",
      switch: "mdi:toggle-switch-outline",
      button: "mdi:gesture-tap-button",
      cover: "mdi:garage-variant",
      lock: "mdi:lock",
      fan: "mdi:fan",
      climate: "mdi:air-conditioner",
      media_player: "mdi:cast",
      input_boolean: "mdi:toggle-switch",
      automation: "mdi:robot",
    };
    return map[domain] || "mdi:flash";
  }

  _customEntityStateText(rawState) {
    const state = String(rawState || "").trim().toLowerCase();
    const known = {
      on: this._t("state_on"),
      off: this._t("state_off"),
      open: this._t("state_open"),
      closed: this._t("state_closed"),
      opening: this._t("state_opening"),
      closing: this._t("state_closing"),
      unavailable: this._t("state_unavailable"),
      unknown: this._t("state_unavailable"),
      playing: this._t("state_playing"),
      paused: this._t("state_paused"),
      locked: this._t("state_locked"),
      unlocked: this._t("state_unlocked"),
    };
    if (known[state]) return known[state];
    if (!state) return this._t("state_unavailable");
    return state
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  _customEntityStatus(entityId) {
    const stateObj = this._hass?.states?.[entityId];
    if (!stateObj) {
      return { tone: "unavailable", label: this._t("state_unavailable"), active: false };
    }

    const [domain] = String(entityId || "").split(".");
    const state = String(stateObj.state || "").trim().toLowerCase();
    const unit = stateObj.attributes?.unit_of_measurement;

    if (!state || state === "unknown" || state === "unavailable") {
      return { tone: "unavailable", label: this._t("state_unavailable"), active: false };
    }

    if (domain === "lock") {
      if (state === "locked") return { tone: "active", label: this._t("state_locked"), active: true };
      if (state === "unlocked") return { tone: "warn", label: this._t("state_unlocked"), active: true };
      return { tone: "info", label: this._customEntityStateText(state), active: false };
    }

    if (domain === "cover") {
      if (state === "open") return { tone: "warn", label: this._t("state_open"), active: true };
      if (state === "closed") return { tone: "inactive", label: this._t("state_closed"), active: false };
      if (state === "opening") return { tone: "info", label: this._t("state_opening"), active: true };
      if (state === "closing") return { tone: "info", label: this._t("state_closing"), active: true };
      return { tone: "info", label: this._customEntityStateText(state), active: false };
    }

    if (domain === "media_player") {
      if (state === "playing") return { tone: "active", label: this._t("state_playing"), active: true };
      if (state === "paused") return { tone: "info", label: this._t("state_paused"), active: false };
      if (state === "off" || state === "idle") return { tone: "inactive", label: this._customEntityStateText(state), active: false };
      return { tone: "info", label: this._customEntityStateText(state), active: false };
    }

    if (domain === "climate") {
      if (state === "off") return { tone: "inactive", label: this._t("state_off"), active: false };
      return { tone: "active", label: this._customEntityStateText(state), active: true };
    }

    if (domain === "script" || domain === "automation") {
      if (state === "on") return { tone: "active", label: this._t("state_running"), active: true };
      if (state === "off") return { tone: "inactive", label: this._t("state_idle"), active: false };
      return { tone: "info", label: this._customEntityStateText(state), active: false };
    }

    if (domain === "scene" || domain === "button") {
      return { tone: "info", label: this._t("state_idle"), active: false };
    }

    if (state === "on") return { tone: "active", label: this._t("state_on"), active: true };
    if (state === "off") return { tone: "inactive", label: this._t("state_off"), active: false };
    if (state === "home") return { tone: "active", label: this._customEntityStateText(state), active: true };
    if (state === "not_home") return { tone: "inactive", label: this._customEntityStateText(state), active: false };

    const numeric = Number(stateObj.state);
    if (Number.isFinite(numeric)) {
      const formatted = unit ? `${numeric} ${unit}` : `${numeric}`;
      return { tone: "info", label: formatted, active: numeric > 0 };
    }

    return { tone: "info", label: this._customEntityStateText(stateObj.state), active: false };
  }

  _callCustomEntity(entityId) {
    if (!this._hass || !entityId) return;
    const [domain] = String(entityId).split(".");
    if (!domain) return;
    if (domain === "button") {
      this._hass.callService("button", "press", { entity_id: entityId });
      this._schedulePostActionRefresh();
      return;
    }
    if (domain === "scene" || domain === "script" || domain === "automation") {
      this._hass.callService(domain, "turn_on", { entity_id: entityId });
      this._schedulePostActionRefresh();
      return;
    }
    if (domain === "lock") {
      const state = this._hass.states?.[entityId]?.state;
      const isLocked = state === "locked" || state === "off";
      if (isLocked) {
        this._showConfirmation("unlock_entity", { entityId });
        return;
      }
      this._hass.callService("lock", "lock", { entity_id: entityId });
      this._schedulePostActionRefresh();
      return;
    }
    if (domain === "cover") {
      this._hass.callService("cover", "toggle", { entity_id: entityId });
      this._schedulePostActionRefresh();
      return;
    }
    this._hass.callService("homeassistant", "toggle", { entity_id: entityId });
    this._schedulePostActionRefresh();
  }

  _showCustomEntitiesDialog() {
    if (!this._customEntities().length) return;
    this._customEntitiesDialogOpen = true;
    this._render();
  }

  _hideCustomEntitiesDialog() {
    if (!this._customEntitiesDialogOpen) return;
    this._customEntitiesDialogOpen = false;
    this._render();
  }

  _openMoreInfo(logicalKey) {
    const eid = this._resolveEntity(logicalKey);
    if (!eid) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: eid },
        bubbles: true,
        composed: true,
      })
    );
  }

  _parseCoordinateValue(value) {
    if (value === null || value === undefined) return null;
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    const raw = String(value).trim();
    if (!raw) return null;
    const normalized = raw.replace(",", ".");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  _getLocationCoordinates() {
    const locationState = this._state("location");
    if (!locationState) return null;

    const attrs = locationState.attributes || {};
    let lat = this._parseCoordinateValue(attrs.latitude);
    let lon = this._parseCoordinateValue(attrs.longitude);

    if (lat === null || lon === null) {
      const raw = String(locationState.state || "").trim();
      const match = raw.match(/(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)/);
      if (match) {
        lat = this._parseCoordinateValue(match[1]);
        lon = this._parseCoordinateValue(match[2]);
      }
    }

    if (lat === null || lon === null) return null;
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
    return { lat, lon };
  }

  _buildOsmEmbedUrl(lat, lon) {
    const delta = 0.008;
    const minLat = Math.max(-90, lat - delta);
    const maxLat = Math.min(90, lat + delta);
    const minLon = Math.max(-180, lon - delta);
    const maxLon = Math.min(180, lon + delta);
    const bbox = encodeURIComponent(`${minLon},${minLat},${maxLon},${maxLat}`);
    const marker = encodeURIComponent(`${lat},${lon}`);
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;
  }

  _buildExternalMapUrl(lat, lon) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lon}`)}`;
  }

  _showLocationMapDialog() {
    const coords = this._getLocationCoordinates();
    this._confirmation = null;
    if (!coords) {
      this._locationMapDialog = {
        hasCoordinates: false,
        embedUrl: "",
        externalUrl: "",
      };
      this._render();
      return;
    }
    this._locationMapDialog = {
      hasCoordinates: true,
      embedUrl: this._buildOsmEmbedUrl(coords.lat, coords.lon),
      externalUrl: this._buildExternalMapUrl(coords.lat, coords.lon),
      lat: coords.lat,
      lon: coords.lon,
    };
    this._render();
  }

  _hideLocationMapDialog() {
    if (!this._locationMapDialog) return;
    this._locationMapDialog = null;
    this._render();
  }

  _callSelectOption(logicalKey, option) {
    const eid = this._resolveEntity(logicalKey);
    if (!eid || !this._hass) return;
    this._hass.callService("select", "select_option", {
      entity_id: eid,
      option,
    });
    this._schedulePostActionRefresh();
  }

  _handleServiceIndicatorAction(indicatorId) {
    if (!indicatorId) return;
    if (indicatorId === "climate") {
      const climateEid = this._resolveEntity("climate");
      const climateDomain = climateEid?.split(".")[0] || "";
      if (climateDomain === "climate") {
        this._callClimatePower(false);
      } else if (this._resolveEntity("ac_switch")) {
        const acOn = this._isClimateActive(this._state("ac_switch")?.state);
        if (acOn) this._callToggle("ac_switch");
      } else if (climateEid) {
        this._callClimatePower(false);
      }
      return;
    }

    if (indicatorId === "battery_heat") {
      if (this._state("battery_heat")?.state === "on") this._callToggle("battery_heat");
      return;
    }

    if (indicatorId === "seat_heat") {
      const seatKeys = ["driver_seat_heat", "passenger_seat_heat", "rear_left_seat_heat", "rear_right_seat_heat"];
      for (const key of seatKeys) {
        if (this._resolveEntity(key)) {
          this._callSelectOption(key, "off");
          this._seatUiOverrides[key] = { option: "off", ts: Date.now() };
        }
      }
      this._render();
      return;
    }

    if (indicatorId === "windows_open") {
      if (this._resolveEntity("close_windows")) this._callButton("close_windows");
      return;
    }

    if (indicatorId === "lock_open") {
      const lockState = this._state("lock")?.state;
      if (lockState === "unlocked" || lockState === "on") this._callToggle("lock");
    }
  }

  _getButtonText(key, defaultText) {
    if (!this._buttonFeedbacks) return defaultText;
    const feedback = this._buttonFeedbacks.get(key);
    if (feedback && Date.now() < feedback.until) {
      return feedback.text;
    }
    return defaultText;
  }

  _metric(label, value) {
    return `<div class="metric"><label>${label}</label><strong>${value}</strong></div>`;
  }

  _category(title, content, options = {}) {
    if (!content || content.trim() === "") return "";
    const titleClass = options.titleClass || "";
    const icon = options.icon
      ? `<span class="category-title-row"><ha-icon class="category-title-icon" icon="${options.icon}"></ha-icon><span class="category-title-text">${title}</span><span class="category-title-spacer"></span></span>`
      : title;
    return `
      <section class="category">
        <h3 class="${titleClass}">${icon}</h3>
        ${content}
      </section>
    `;
  }

  _renderSeatHeatControl(logicalKey, label) {
    const seatState = this._state(logicalKey);
    if (!seatState) return "";
    const override = this._seatUiOverrides?.[logicalKey];
    const overrideIsFresh = override && Date.now() - override.ts < 12000;
    const current = String(
      (overrideIsFresh ? override.option : seatState.state) || "off"
    ).toLowerCase();
    const options = this._seatControlOptions(seatState);
    if (!options.length) return "";
    const isCooling = logicalKey === "passenger_seat_ventilation" || this._resolveEntity(logicalKey)?.includes("ventilation");
    return `
      <div class="seat-control ${isCooling ? "seat-cooling" : ""}">
        <div class="seat-title">${label}</div>
        <div class="seat-levels">
          ${options
            .map((opt) => {
              const normalized = String(opt || "").trim().toLowerCase();
              const active = current === normalized ? "active" : "";
              const tone = this._seatOptionTone(opt);
              return `<button class="seat-level ${active} level-${tone}" data-seat="${logicalKey}" data-option="${opt}">${this._seatOptionLabel(opt)}</button>`;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  _flashButtonFeedback(btn) {
    if (!btn) return;
    btn.classList.remove("btn-feedback");
    // Force restart animation when repeatedly clicking the same button.
    // eslint-disable-next-line no-unused-expressions
    btn.offsetWidth;
    btn.classList.add("btn-feedback");
    window.setTimeout(() => btn.classList.remove("btn-feedback"), 520);
  }

  _renderActionButton(key, title, icon, handler, active = false, extraClass = "") {
    const eid = this._resolveEntity(key);
    if (!eid) return "";
    const feedbackClass = this._buttonFeedbacks?.has(key) ? "btn-feedback" : "";
    return `
      <button class="action-btn ${active ? "active" : ""} ${extraClass} ${feedbackClass}" data-action="${handler}" data-key="${key}">
        <ha-icon icon="${icon}"></ha-icon>
        <span>${title}</span>
      </button>
    `;
  }

  _render() {
    if (!this.shadowRoot) return;
    if (!this._config) return;

    // Clean up expired button feedbacks
    if (this._buttonFeedbacks) {
      const now = Date.now();
      for (const [key, feedback] of this._buttonFeedbacks) {
        if (now >= feedback.until) {
          this._buttonFeedbacks.delete(key);
        }
      }
    }

    const profile = VEHICLE_PROFILES[this._config.vehicle_profile] || VEHICLE_PROFILES.atto3;
    const title = this._config.title || profile.label;
    const titleFontSize = this._normalizeTitleFontSize(this._config.title_font_size);
    const imageUrl = this._config.image_url || this._profileImage(this._config.vehicle_profile) || profile.image;

    const batteryState = this._state("battery");
    const rangeState = this._state("range");
    const chargingState = this._state("charging");
    const batteryPowerState = this._state("battery_power");
    const cabinTempState = this._state("cabin_temp");
    const exteriorTempState = this._state("exterior_temp");
    const speedState = this._state("speed");
    const odoState = this._state("odometer");
    const doorsState = this._state("doors");
    const windowsState = this._state("windows");
    const lockState = this._state("lock");
    const onlineState = this._state("online");
    const climateState = this._state("climate");
    const batteryHeatState = this._state("battery_heat");
    const locationState = this._state("location");
    const tirepressureSystemState = this._state("tirepressure_system");
    const rapidTireLeakState = this._state("rapid_tire_leak");
    const lfTireStatusState = this._state("left_front_tire_status");
    const rfTireStatusState = this._state("right_front_tire_status");
    const lrTireStatusState = this._state("left_rear_tire_status");
    const rrTireStatusState = this._state("right_rear_tire_status");
    const absWarningState = this._state("abs_warning");
    const brakingSystemState = this._state("braking_system");
    const steeringSystemState = this._state("steering_system");
    const chargingSystemState = this._state("charging_system");
    const srsState = this._state("srs");
    const svsState = this._state("svs");
    const seatHeatSection = [
      this._renderSeatHeatControl("driver_seat_heat", this._t("seat_driver")),
      (() => {
        const passengerHeat = this._renderSeatHeatControl("passenger_seat_heat", this._t("seat_passenger"));
        if (this._seatPassengerMode() === "both") {
          const passengerCool = this._renderSeatHeatControl(
            "passenger_seat_ventilation",
            this._t("seat_passenger") + " (" + this._t("seat_mode_cool") + ")"
          );
          return passengerHeat + passengerCool;
        }
        return passengerHeat;
      })(),
      (() => {
        if (this._seatPassengerMode() !== "both") return "";
        const driverCool = this._renderSeatHeatControl(
          "driver_seat_ventilation",
          this._t("seat_driver") + " (" + this._t("seat_mode_cool") + ")"
        );
        return driverCool;
      })(),
      this._renderSeatHeatControl("rear_left_seat_heat", this._t("seat_rear_left")),
      this._renderSeatHeatControl("rear_right_seat_heat", this._t("seat_rear_right")),
    ]
      .filter(Boolean)
      .join("");

    const acSwitchState = this._state("ac_switch");
    const hasAcSwitchEntity = Boolean(this._resolveEntity("ac_switch"));
    const climateIndicatorIsOn = hasAcSwitchEntity ? this._isClimateActive(acSwitchState?.state) : false;
    const climateIsOn = this._isClimateActive(climateState?.state) || this._isClimateActive(acSwitchState?.state);
    const climateTempRaw = toNumber(climateState?.attributes?.temperature);
    const climateMin = toNumber(climateState?.attributes?.min_temp) ?? 15;
    const climateMax = toNumber(climateState?.attributes?.max_temp) ?? 31;
    const climateTemp = climateTempRaw ?? 21;
    const presetMode = String(climateState?.attributes?.preset_mode || "").toLowerCase();
    const hvacAction = String(climateState?.attributes?.hvac_action || "").toLowerCase();
    const hvacMode = String(climateState?.attributes?.hvac_mode || climateState?.state || "").toLowerCase();
    const climateVisualMode = (() => {
      const coolHints = ["cool", "cooling", "max_cool"];
      const heatHints = ["heat", "heating", "max_heat"];
      if (coolHints.some((hint) => hvacAction.includes(hint))) return "cool";
      if (heatHints.some((hint) => hvacAction.includes(hint))) return "heat";
      if (coolHints.some((hint) => presetMode.includes(hint))) return "cool";
      if (heatHints.some((hint) => presetMode.includes(hint))) return "heat";
      if (coolHints.some((hint) => hvacMode.includes(hint))) return "cool";
      if (heatHints.some((hint) => hvacMode.includes(hint))) return "heat";
      return "cool";
    })();
    const seatKeys = ["driver_seat_heat", "passenger_seat_heat", "rear_left_seat_heat", "rear_right_seat_heat"];
    const seatHeatStates = seatKeys
      .map((key) => {
        const override = this._seatUiOverrides?.[key];
        const overrideIsFresh = override && Date.now() - override.ts < 12000;
        return overrideIsFresh ? override.option : this._state(key)?.state;
      })
      .filter((v) => v !== undefined && v !== null && String(v).trim() !== "");
    const seatHeatActive = seatHeatStates.some((v) => this._isSeatHeatActive(v));
    const seatHasCooling = this._isSeatCoolingEnabled() && seatHeatStates.some((v) => this._isSeatCoolingOption(v));

    const battery = clamp(toNumber(batteryState?.state) ?? 0, 0, 100);
    const range = toNumber(rangeState?.state);
    const isCharging = chargingState?.state === "on";
    const lowBattery = battery < 20;
    const powerRaw = batteryPowerState?.state;
    const powerNumeric = toNumber(powerRaw);
    const powerUnit = batteryPowerState?.attributes?.unit_of_measurement || "W";
    let powerDisplay = "-";
    if (powerNumeric !== null) {
      powerDisplay = `${powerNumeric.toFixed(1)} ${powerUnit}`;
    } else if (
      powerRaw !== undefined &&
      powerRaw !== null &&
      powerRaw !== "unknown" &&
      powerRaw !== "unavailable"
    ) {
      powerDisplay = `${powerRaw} ${powerUnit}`;
    }
    const chargingHeadLabel = isCharging
      ? `<span class="charging-label"><span class="charging-icon">⚡</span><span class="charging-text">${this._t("charging_active")}</span></span>`
      : this._t("battery_status");
    const powerMarkup = `<span class="power-pair"><span class="power-value">${powerDisplay}</span></span>`;
    const idleInBarMarkup = "";

    const tireKeys = [
      ["tire_fl", this._t("front_left")],
      ["tire_fr", this._t("front_right")],
      ["tire_rl", this._t("rear_left")],
      ["tire_rr", this._t("rear_right")],
    ];
    const tirePressureUnit = this._tirePressureUnit();
    const tirePressureUnitLabel = this._tirePressureUnitLabel(tirePressureUnit);
    const tirePressureThresholds = this._tirePressureThresholds(tirePressureUnit);

    const tireCards = tireKeys
      .map(([key, label]) => {
        const pressure = this._tirePressureDisplayValue(key, tirePressureUnit);
        const color =
          pressure === null
            ? "#8aa0b5"
            : pressure < tirePressureThresholds.critical
              ? "#ff5a4d"
              : pressure < tirePressureThresholds.low
                ? "#ffb252"
                : "#7ce89e";
        return `
          <div class="tire-card ${pressure !== null && pressure < tirePressureThresholds.critical ? "warn" : ""}">
            <div class="tire-title">${label}</div>
            <div class="tire-value" style="color:${color}">${this._formatTirePressure(pressure, tirePressureUnit)} ${tirePressureUnitLabel}</div>
          </div>
        `;
      })
      .join("");

    const alerts = [];
    const addAlert = (message) => {
      if (message && !alerts.includes(message)) alerts.push(message);
    };
    const tireWarn = (label, pressure) => {
      if (pressure === null) return;
      if (pressure < tirePressureThresholds.critical) addAlert(`${this._ta("alert_tire_pressure_critical")} - ${label}`);
      else if (pressure < tirePressureThresholds.low) addAlert(`${this._ta("alert_tire_pressure_low")} - ${label}`);
    };

    const flPressure = this._tirePressureDisplayValue("tire_fl", tirePressureUnit);
    const frPressure = this._tirePressureDisplayValue("tire_fr", tirePressureUnit);
    const rlPressure = this._tirePressureDisplayValue("tire_rl", tirePressureUnit);
    const rrPressure = this._tirePressureDisplayValue("tire_rr", tirePressureUnit);

    tireWarn(this._ta("front_left"), flPressure);
    tireWarn(this._ta("front_right"), frPressure);
    tireWarn(this._ta("rear_left"), rlPressure);
    tireWarn(this._ta("rear_right"), rrPressure);

    const boolFaultState = (s) => s?.state === "on";
    if (boolFaultState(rapidTireLeakState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("rapid_tire_leak")}`);
    if (boolFaultState(tirepressureSystemState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("alert_tpms")}`);
    if (boolFaultState(lfTireStatusState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("front_left")}`);
    if (boolFaultState(rfTireStatusState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("front_right")}`);
    if (boolFaultState(lrTireStatusState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("rear_left")}`);
    if (boolFaultState(rrTireStatusState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("rear_right")}`);
    if (boolFaultState(absWarningState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("alert_abs")}`);
    if (boolFaultState(brakingSystemState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("alert_brake")}`);
    if (boolFaultState(steeringSystemState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("alert_steering")}`);
    if (boolFaultState(chargingSystemState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("alert_charging")}`);
    if (boolFaultState(srsState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("alert_srs")}`);
    if (boolFaultState(svsState)) addAlert(`${this._ta("alert_system_fault")} - ${this._ta("alert_svs")}`);

    const alertJoined = alerts.map((msg) => `⚠ ${msg}`).join("   •   ");
    const alertRibbon = alerts.length
      ? `
        <div class="alert-ribbon ${alerts.length > 1 ? "scrolling" : "single"}">
          <div class="alert-ribbon-inner">
            ${
              alerts.length > 1
                ? `
            <div class="alert-ribbon-head">
              <span class="alert-ribbon-sign">⚠</span>
              <span>${this._ta("alert_header")}</span>
            </div>
            <div class="alert-ribbon-body">
                <div class="alert-marquee">
                  <div class="alert-marquee-track">
                    <span class="alert-marquee-line">${alertJoined}</span>
                    <span class="alert-marquee-line" aria-hidden="true">${alertJoined}</span>
                  </div>
                </div>
              `
                : `
            <div class="alert-ribbon-body">
              <div class="alert-single">⚠ ${alerts[0]}</div>
            </div>
            <div class="alert-ribbon-head">
              <span>${this._ta("alert_header_single")}</span>
              <span class="alert-ribbon-sign">⚠</span>
            </div>
              `
            }
            </div>
          </div>
        </div>
      `
      : "";

    const serviceIndicators = [];
    const pushIndicator = (id, icon, label, tone = "info", actionable = false) => {
      if (serviceIndicators.some((i) => i.id === id)) return;
      serviceIndicators.push({ id, icon, label, tone, actionable });
    };
    const canControlClimate = Boolean(this._resolveEntity("climate") || this._resolveEntity("ac_switch"));
    const canToggleBatteryHeat = Boolean(this._resolveEntity("battery_heat"));
    const canControlSeatHeat = ["driver_seat_heat", "passenger_seat_heat", "rear_left_seat_heat", "rear_right_seat_heat"].some((key) =>
      Boolean(this._resolveEntity(key))
    );
    const canCloseWindows = Boolean(this._resolveEntity("close_windows"));
    const canToggleLock = Boolean(this._resolveEntity("lock"));
    if (climateIndicatorIsOn) {
      const climateTone = climateVisualMode === "heat" ? "heat" : "cold";
      pushIndicator("climate", "mdi:air-conditioner", this._t("ac"), climateTone, canControlClimate);
    }
    if (batteryHeatState?.state === "on") {
      pushIndicator("battery_heat", "mdi:heat-wave", this._t("battery_heat"), "hot", canToggleBatteryHeat);
    }
    if (seatHeatActive) {
      const seatTone = seatHasCooling ? "cold" : "hot";
      const seatIcon = seatHasCooling ? "mdi:snowflake" : "mdi:car-seat-heater";
      const seatLabel = seatHasCooling ? this._t("seat_climate") : this._t("seat_heating");
      pushIndicator("seat_heat", seatIcon, seatLabel, seatTone, canControlSeatHeat);
    }
    if (doorsState?.state === "on") {
      pushIndicator("doors_open", "mdi:car-door", this._t("doors"), "warn");
    }
    if (windowsState?.state === "on") {
      pushIndicator("windows_open", "mdi:window-open", this._t("windows"), "warn", canCloseWindows);
    }
    if (lockState?.state === "unlocked") {
      pushIndicator("lock_open", "mdi:lock-open-variant-outline", this._t("lock"), "warn", canToggleLock);
    }
    if (chargingState?.state === "on") {
      pushIndicator("charging", "mdi:ev-station", this._t("charging"), "cold");
    }
    const visibleServiceIndicators = serviceIndicators.slice(0, 3);
    const customEntities = this._customEntities();
    const heroBatteryOverlay = `
      <div class="hero-battery-badge ${lowBattery ? "low" : ""}">
        <span class="hero-battery-label">${this._t("battery_status")}</span>
        <span class="hero-battery-value">${battery.toFixed(0)}%</span>
      </div>
    `;
    const heroLockBadge = lockState
      ? `
        <div class="hero-lock-badge actionable ${lockState.state === "unlocked" || lockState.state === "on" ? "warn" : "ok"}" title="${this._boolLabel(lockState.state)}" data-key="lock">
          <ha-icon icon="${lockState.state === "unlocked" || lockState.state === "on" ? "mdi:lock-open-variant-outline" : "mdi:lock"}"></ha-icon>
        </div>
      `
      : "";
    const heroCustomBadge = customEntities.length
      ? `
        <div class="hero-custom-badge actionable" title="${this._t("open_external_actions")}" data-hero-custom-actions>
          <ha-icon icon="mdi:script-text-outline"></ha-icon>
        </div>
      `
      : "";
    const serviceOverlay = visibleServiceIndicators.length
      ? `
        <div class="hero-services-grid">
          ${visibleServiceIndicators
            .map(
              (item) => `
                <div
                  class="hero-service-item tone-${item.tone} ${item.actionable ? "actionable" : "readonly"}"
                  title="${item.label}"
                  data-indicator="${item.id}"
                >
                  <ha-icon icon="${item.icon}"></ha-icon>
                </div>
              `
            )
            .join("")}
        </div>
      `
      : "";

    const summaryMetrics = `
      <div class="metrics-grid">
        ${this._metric(this._t("interior_temp"), `${cabinTempState?.state ?? "-"}°C`)}
        ${this._metric(this._t("exterior_temp"), `${exteriorTempState?.state ?? "-"}°C`)}
        ${this._metric(this._t("speed"), `${speedState?.state ?? "-"} ${this._t("speed_kmh")}`)}
        ${this._metric(this._t("odometer"), `${odoState?.state ?? "-"} ${this._t("odometer_km")}`)}
      </div>
    `;

    const summaryCategory = this._category(
      this._t("category_summary"),
      `
      <div class="panel">
        <div class="battery-head">
          <span class="battery-head-power">${powerMarkup}</span>
          <span class="battery-head-range">${range === null ? "-" : range.toFixed(0)} ${this._t("range_km")}</span>
          <span class="battery-head-status">${chargingHeadLabel}</span>
        </div>
        <div class="battery-row">
          <div class="battery-shell ${isCharging ? "is-charging" : ""}">
            <div class="battery-fill ${isCharging ? "charging" : ""}" style="width:${battery}%"></div>
            <div class="battery-gloss"></div>
            ${idleInBarMarkup}
          </div>
          <div class="battery-percent">${battery.toFixed(0)}%</div>
        </div>
        ${isCharging ? `<div class="battery-sub"><span class="charge-state">${this._t("charging")}</span></div>` : ""}
      </div>
      ${summaryMetrics}
      `,
      { titleClass: "category-title-main", icon: "mdi:car-electric" }
    );

    const climateCategory = this._config.show_climate
      ? this._category(
          this._t("category_climate"),
          `
            <div class="metrics-grid climate-metrics">
              ${this._metric(this._t("ac"), this._boolLabel(climateState?.state))}
              ${this._metric(this._t("battery_heat"), this._boolLabel(batteryHeatState?.state))}
              ${this._metric(this._t("interior_temp"), `${cabinTempState?.state ?? "-"}°C`)}
              ${this._metric(this._t("exterior_temp"), `${exteriorTempState?.state ?? "-"}°C`)}
            </div>
            <div class="climate-controls">
              <div class="climate-row climate-row-3">
                <button class="climate-btn ${climateIsOn ? "on" : ""}" data-climate-action="power">
                  ${climateIsOn ? this._t("turn_off") : this._t("turn_on")}
                </button>
                <button class="climate-btn" data-climate-action="temp_down">-</button>
                <button class="climate-btn" data-climate-action="temp_up">+</button>
              </div>
              <div class="climate-row climate-row-3">
                <button class="climate-btn ${presetMode === "max_cool" ? "active-cool" : ""}" data-climate-action="preset_cool">${this._t("max_cool")}</button>
                <button class="climate-btn ${presetMode === "max_heat" ? "active-heat" : ""}" data-climate-action="preset_heat">${this._t("max_heat")}</button>
                <button class="climate-btn" data-climate-action="comfort_21">${this._t("comfort_21")}</button>
              </div>
              <div class="climate-row climate-row-2">
                <div class="target-box">
                  <span>${this._t("target_temp")}</span>
                  <strong>${climateTemp.toFixed(0)}°C</strong>
                </div>
                <button class="climate-btn climate-btn-temp" disabled>
                  ${climateTemp.toFixed(0)}°C
                </button>
              </div>
            </div>
            ${
              seatHeatSection
                ? `
            <div class="seat-wrap">
              <div class="seat-header"><ha-icon icon="mdi:car-seat-heater"></ha-icon><span>${this._isSeatCoolingEnabled() ? this._t("seat_climate") : this._t("seat_heating")}</span></div>
              <div class="seat-grid">${seatHeatSection}</div>
            </div>
            `
                : ""
            }
          `
        , { icon: "mdi:air-conditioner" })
      : "";

    const vehicleCategory = this._config.show_vehicle
      ? this._category(
          this._t("category_vehicle"),
          `
              <div class="metrics-grid vehicle-metrics">
              ${this._metric(this._t("doors"), this._openClosedLabel(doorsState?.state))}
              ${this._metric(this._t("windows"), this._openClosedLabel(windowsState?.state))}
              ${this._metric(this._t("lock"), this._boolLabel(lockState?.state))}
              ${this._metric(this._t("online"), this._boolLabel(onlineState?.state))}
              ${this._metric(this._t("speed"), `${speedState?.state ?? "-"} ${this._t("speed_kmh")}`)}
              ${this._metric(this._t("odometer"), `${odoState?.state ?? "-"} ${this._t("odometer_km")}`)}
            </div>
          `
        , { icon: "mdi:car-info" })
      : "";

    const tiresCategory =
      this._config.show_tires && tireCards
        ? this._category(this._t("category_tires"), `<div class="tires">${tireCards}</div>`, { icon: "mdi:car-tire-alert" })
        : "";

    const lockActive = lockState?.state === "locked" || lockState?.state === "off";
    const unlockActive = lockState?.state === "unlocked" || lockState?.state === "on";
    const climateOnActive = climateIsOn;
    const climateOffActive = !climateIsOn;
    const climateModeClass = climateVisualMode === "heat" ? "climate-mode-heat" : "climate-mode-cool";
    const actionsCategory = this._config.show_actions
      ? this._category(
          this._t("category_actions"),
          `
            <div class="actions">
              ${this._renderActionButton("lock", this._getButtonText("lock", this._t("lock")), "mdi:lock", "lock", lockActive)}
              ${this._renderActionButton("lock", this._getButtonText("unlock", this._t("unlock")), "mdi:lock-open-variant-outline", "unlock", unlockActive)}
              ${this._renderActionButton("climate", this._getButtonText("climate_on", this._t("ac")), "mdi:air-conditioner", "climate_on", climateOnActive, `climate-on ${climateModeClass}`)}
              ${this._renderActionButton("climate", this._getButtonText("climate_off", this._t("turn_off")), "mdi:air-conditioner", "climate_off", climateOffActive, "climate-off")}
              ${this._renderActionButton("battery_heat", this._getButtonText("battery_heat", this._t("battery_heat")), "mdi:heat-wave", "toggle")}
              ${this._renderActionButton("flash_lights", this._getButtonText("flash_lights", this._t("flash_lights")), "mdi:car-light-high", "press")}
              ${this._renderActionButton("find_car", this._getButtonText("find_car", this._t("find_car")), "mdi:car-search", "press")}
              ${this._renderActionButton("close_windows", this._getButtonText("close_windows", this._t("close_windows")), "mdi:window-closed-variant", "press")}
            </div>
          `
        , { icon: "mdi:gesture-tap-button" })
      : "";

    const locationCategory =
      this._config.show_location && locationState
        ? this._category(
            this._t("category_location"),
            `
              <div class="metrics-grid">
                ${this._metric(this._t("latitude"), locationState.attributes?.latitude ?? "-")}
                ${this._metric(this._t("longitude"), locationState.attributes?.longitude ?? "-")}
                ${this._metric(this._t("gps_speed"), locationState.attributes?.gps_speed ?? "-")}
                ${this._metric(this._t("online"), this._boolLabel(onlineState?.state))}
              </div>
              <div class="location-actions">
                <button class="action-btn location-map-btn" data-action="location_map" data-key="location">
                  <ha-icon icon="mdi:map-search"></ha-icon>
                  <span>${this._t("open_map")}</span>
                </button>
              </div>
            `
          , { icon: "mdi:map-marker-radius" })
        : "";

    const categoryTabsRaw = [
      { key: "summary", label: this._t("category_summary"), icon: "mdi:car-electric", content: summaryCategory, enabled: true },
      { key: "climate", label: this._t("category_climate"), icon: "mdi:air-conditioner", content: climateCategory, enabled: this._config.show_climate },
      { key: "vehicle", label: this._t("category_vehicle"), icon: "mdi:car-info", content: vehicleCategory, enabled: this._config.show_vehicle },
      { key: "tires", label: this._t("category_tires"), icon: "mdi:car-tire-alert", content: tiresCategory, enabled: this._config.show_tires },
      { key: "location", label: this._t("category_location"), icon: "mdi:map-marker-radius", content: locationCategory, enabled: this._config.show_location },
      { key: "actions", label: this._t("category_actions"), icon: "mdi:gesture-tap-button", content: actionsCategory, enabled: this._config.show_actions },
    ];
    const order = this._normalizeCategoryOrder(this._config.category_order);
    const categoryMap = new Map(categoryTabsRaw.map((t) => [t.key, t]));
    const categoryTabs = order.map((k) => categoryMap.get(k)).filter(Boolean);
    const visibleTabs = categoryTabs.filter((tab) => tab.enabled && tab.content);
    if (!visibleTabs.some((tab) => tab.key === this._activeCategory)) {
      this._activeCategory = visibleTabs[0]?.key || "summary";
    }
    const activeTab = visibleTabs.find((tab) => tab.key === this._activeCategory) || visibleTabs[0];
    this._persistActiveCategory(activeTab?.key);
    const activeContent = activeTab?.content || "";
    const pinRequired =
      (this._confirmation?.type === "unlock" || this._confirmation?.type === "unlock_entity") &&
      this._isUnlockPinRequired();
    const unlockPinRawValue = normalizeUnlockPinCode(this._confirmation?.pinValue || "");
    const unlockPinMaskedValue = escapeHtml(unlockPinRawValue.replace(/\d/g, "•"));
    const unlockPinError = this._confirmation?.pinError || "";
    const confirmationOverlay = this._confirmation
      ? `
        <div class="dialog-backdrop" data-dialog-backdrop>
          <div class="dialog-card">
            <div class="dialog-title">${this._t("unlock")}</div>
            <div class="dialog-text">${this._t("confirm_unlock")}</div>
            ${
              pinRequired
                ? `
              <div class="dialog-pin-wrap">
                <div class="dialog-pin-display ${unlockPinRawValue ? "has-value" : ""}">
                  ${unlockPinMaskedValue || this._t("unlock_pin_placeholder")}
                </div>
                <div class="dialog-pin-keypad">
                  <button class="dialog-pin-key" data-pin-key="1">1</button>
                  <button class="dialog-pin-key" data-pin-key="2">2</button>
                  <button class="dialog-pin-key" data-pin-key="3">3</button>
                  <button class="dialog-pin-key" data-pin-key="4">4</button>
                  <button class="dialog-pin-key" data-pin-key="5">5</button>
                  <button class="dialog-pin-key" data-pin-key="6">6</button>
                  <button class="dialog-pin-key" data-pin-key="7">7</button>
                  <button class="dialog-pin-key" data-pin-key="8">8</button>
                  <button class="dialog-pin-key" data-pin-key="9">9</button>
                  <button class="dialog-pin-key action" data-pin-key="clear">${this._t("unlock_pin_clear")}</button>
                  <button class="dialog-pin-key" data-pin-key="0">0</button>
                  <button class="dialog-pin-key action enter" data-pin-key="enter">${this._t("unlock_pin_enter")}</button>
                </div>
                <div class="dialog-pin-hint">${this._t("settings_unlock_pin_hint")}</div>
                ${unlockPinError ? `<div class="dialog-pin-error">${escapeHtml(unlockPinError)}</div>` : ""}
              </div>
            `
                : ""
            }
            <div class="dialog-actions">
              <button class="dialog-btn cancel" data-dialog-action="cancel">${this._t("no")}</button>
              <button class="dialog-btn confirm" data-dialog-action="confirm">${this._t("unlock")}</button>
            </div>
          </div>
        </div>
      `
      : "";
    const locationMapOverlay = this._locationMapDialog
      ? `
        <div class="dialog-backdrop map-dialog-backdrop" data-map-dialog-backdrop>
          <div class="map-dialog-card" role="dialog" aria-modal="true">
            <div class="map-dialog-header">
              <div class="map-dialog-title">${this._t("map_dialog_title")}</div>
              <button class="map-dialog-close-icon" data-map-dialog-action="close" aria-label="${this._t("close")}">
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
            ${
              this._locationMapDialog.hasCoordinates
                ? `
              <iframe
                class="location-map-frame"
                src="${this._locationMapDialog.embedUrl}"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen
              ></iframe>
            `
                : `<div class="map-dialog-empty">${this._t("map_unavailable")}</div>`
            }
            <div class="map-dialog-actions">
              ${
                this._locationMapDialog.externalUrl
                  ? `<a class="map-dialog-link" href="${this._locationMapDialog.externalUrl}" target="_blank" rel="noopener noreferrer">${this._t("open_in_external_map")}</a>`
                  : ""
              }
              <button class="dialog-btn cancel" data-map-dialog-action="close">${this._t("close")}</button>
            </div>
          </div>
        </div>
      `
      : "";
    const customEntitiesOverlay = this._customEntitiesDialogOpen
      ? `
        <div class="dialog-backdrop custom-actions-backdrop" data-custom-dialog-backdrop>
          <div class="custom-actions-dialog-card" role="dialog" aria-modal="true">
            <div class="custom-actions-dialog-header">
              <div class="custom-actions-dialog-title">${this._t("external_actions_title")}</div>
              <button class="custom-actions-close-icon" data-custom-dialog-action="close" aria-label="${this._t("close")}">
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
            <div class="custom-actions-dialog-subtitle">${this._t("external_actions_subtitle")}</div>
            <div class="custom-actions-grid">
              ${
                customEntities.length
                  ? customEntities
                      .map((entityId) => {
                        const label = escapeHtml(this._customEntityLabel(entityId));
                        const icon = this._customEntityIcon(entityId);
                        const status = this._customEntityStatus(entityId);
                        const escapedEntityId = escapeHtml(entityId);
                        return `
                          <button class="custom-entity-btn tone-${status.tone} ${status.active ? "is-active" : ""}" data-custom-entity="${escapedEntityId}" title="${label}">
                            <ha-icon icon="${icon}"></ha-icon>
                            <span class="custom-entity-name">${label}</span>
                            <span class="custom-entity-state">${escapeHtml(status.label)}</span>
                          </button>
                        `;
                      })
                      .join("")
                  : `<div class="custom-actions-empty">${this._t("external_actions_empty")}</div>`
              }
            </div>
          </div>
        </div>
      `
      : "";

    this.shadowRoot.innerHTML = `
      <ha-card>
        <div class="wrap ${lowBattery ? "low" : ""}" style="--byd-hero-title-size:${titleFontSize}px;">
          <div class="hero-title">${title}</div>
          <div class="hero">
            <img class="car-image" src="${imageUrl}" data-fallback="${profile.image}" alt="${profile.label}" />
            <div class="hero-overlay">
              ${heroBatteryOverlay}
              ${serviceOverlay}
              ${heroCustomBadge}
              ${heroLockBadge}
            </div>
          </div>

          ${alertRibbon}
          ${confirmationOverlay}
          ${locationMapOverlay}
          ${customEntitiesOverlay}

          <div class="category-tabs" role="radiogroup" aria-label="${this._t("aria_vehicle_categories")}">
            ${visibleTabs
              .map((tab) => {
                const active = tab.key === this._activeCategory ? "active" : "";
                return `
                  <button class="cat-tab ${active}" data-category="${tab.key}" aria-checked="${tab.key === this._activeCategory ? "true" : "false"}" role="radio">
                    <ha-icon icon="${tab.icon}"></ha-icon>
                    <span>${tab.label}</span>
                  </button>
                `;
              })
              .join("")}
          </div>

          <div class="active-category-content">
            ${activeContent}
          </div>
        </div>
      </ha-card>
      <style>
        :host { display: block; }
        ha-card {
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid rgba(150, 178, 210, .34);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.24),
            0 0 0 1px rgba(120,170,220,.12),
            0 28px 70px rgba(0,0,0,.62);
          background: transparent;
        }
        .wrap {
          position: relative;
          background:
            radial-gradient(circle at 14% 4%, rgba(58,93,134,.7) 0%, rgba(26,38,55,.95) 44%, rgba(10,14,22,1) 100%);
          padding: 14px;
          color: #fff;
          font-family: "Segoe UI", "SF Pro Text", "Arial", sans-serif;
        }
        .wrap.low {
          background: radial-gradient(circle at 18% 8%, #5e2830 0%, #1a1218 58%, #0a080d 100%);
        }
        .hero-title {
          margin: 2px 4px 10px;
          font-size: var(--byd-hero-title-size, clamp(30px, 5.4vw, 60px));
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: .2px;
          color: #f3f8ff;
          text-shadow: 0 8px 22px rgba(0,0,0,.34);
          text-align: center;
        }
        .hero {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 195px;
          background: #0b1119;
          border: 1px solid rgba(255,255,255,.12);
        }
        .car-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          filter: saturate(1.08) contrast(1.03);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          display: block;
          padding: 14px;
          background: linear-gradient(180deg, rgba(5,7,10,.12), rgba(5,7,10,.72));
        }
        .hero-services-grid {
          position: absolute;
          top: 12px;
          left: 12px;
          display: grid;
          grid-template-columns: repeat(3, 34px);
          gap: 7px;
          max-width: 130px;
        }
        .hero-service-item {
          width: 34px;
          height: 34px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(186, 219, 246, .26);
          background: linear-gradient(180deg, rgba(20,32,48,.76), rgba(12,18,26,.88));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
        }
        .hero-battery-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          min-width: 80px;
          max-width: 88px;
          padding: 5px 7px;
          border-radius: 10px;
          border: 1px solid rgba(126,198,241,.42);
          background: linear-gradient(180deg, rgba(13,24,36,.72), rgba(10,17,26,.86));
          box-shadow: 0 0 14px rgba(76,179,236,.16), inset 0 1px 0 rgba(255,255,255,.15);
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .hero-battery-badge.low {
          border-color: rgba(255,126,126,.58);
          box-shadow: 0 0 12px rgba(255,95,95,.18), inset 0 1px 0 rgba(255,255,255,.15);
        }
        .hero-battery-label {
          display: block;
          font-size: 9px;
          font-weight: 800;
          color: rgba(222,241,255,.82);
          line-height: 1.1;
        }
        .hero-battery-value {
          display: block;
          margin-top: 1px;
          font-size: 18px;
          font-weight: 900;
          line-height: 1;
          color: #f4fbff;
          text-shadow: 0 0 8px rgba(121,219,255,.36);
        }
        .hero-lock-badge {
          position: absolute;
          right: 12px;
          bottom: 12px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(5,9,14,.88);
          box-shadow: 0 0 18px rgba(0,0,0,.35);
        }
        .hero-lock-badge.ok {
          border-color: rgba(107, 230, 156, .5);
        }
        .hero-lock-badge.warn {
          border-color: rgba(255, 146, 100, .6);
        }
        .hero-lock-badge.actionable {
          cursor: pointer;
        }
        .hero-lock-badge.actionable:active {
          transform: scale(.96);
        }
        .hero-lock-badge ha-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          --mdc-icon-size: 20px;
          line-height: 0;
          margin: 0;
          transform: none;
          color: #fff;
        }
        .hero-custom-badge {
          position: absolute;
          left: 12px;
          bottom: 12px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(126,198,241,.48);
          background: rgba(5,9,14,.88);
          box-shadow: 0 0 18px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.1);
        }
        .hero-custom-badge.actionable {
          cursor: pointer;
        }
        .hero-custom-badge.actionable:active {
          transform: scale(.96);
        }
        .hero-custom-badge ha-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          --mdc-icon-size: 20px;
          color: #d9ecff;
        }
        .hero-service-item ha-icon {
          width: 20px;
          height: 20px;
          color: #d8ecff;
        }
        .hero-service-item.actionable {
          cursor: pointer;
        }
        .hero-service-item.readonly {
          opacity: .74;
        }
        .hero-service-item.actionable:active {
          transform: scale(.96);
        }
        .dialog-backdrop {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(2, 6, 16, .78);
          backdrop-filter: blur(8px);
        }
        .dialog-card {
          width: min(100%, 380px);
          border-radius: 24px;
          padding: 22px 20px;
          background: linear-gradient(180deg, rgba(8, 13, 22, .96), rgba(5, 9, 15, .98));
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 24px 80px rgba(0,0,0,.4);
        }
        .dialog-title {
          margin: 0 0 12px;
          font-size: 18px;
          line-height: 1.2;
          font-weight: 800;
          color: #f8fbff;
          text-align: center;
        }
        .dialog-text {
          margin: 0 0 18px;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(235,245,255,.86);
          text-align: center;
        }
        .dialog-pin-wrap {
          display: grid;
          gap: 6px;
          margin: 0 0 14px;
        }
        .dialog-pin-display {
          border: 1px solid rgba(157,190,220,.3);
          background: linear-gradient(180deg, rgba(17,23,33,.86), rgba(13,18,27,.9));
          border-radius: 12px;
          min-height: 42px;
          padding: 8px 12px;
          color: #e8f2fb;
          font-size: 16px;
          letter-spacing: .2em;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dialog-pin-display.has-value {
          color: #f2f9ff;
        }
        .dialog-pin-keypad {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin-top: 4px;
        }
        .dialog-pin-key {
          appearance: none;
          border: 1px solid rgba(157,190,220,.24);
          background: linear-gradient(180deg, rgba(20,29,40,.9), rgba(12,18,28,.94));
          border-radius: 12px;
          min-height: 40px;
          color: #e8f2fb;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: transform .14s ease, filter .14s ease, border-color .2s ease;
        }
        .dialog-pin-key:hover {
          transform: translateY(-1px);
          filter: brightness(1.06);
        }
        .dialog-pin-key.action {
          font-size: 12px;
          font-weight: 700;
        }
        .dialog-pin-key.enter {
          border-color: rgba(76,160,255,.42);
          background: linear-gradient(180deg, #5cb0ff, #1e5fbf);
          color: #fff;
        }
        .dialog-pin-hint {
          font-size: 11px;
          color: rgba(207,225,242,.72);
          text-align: center;
        }
        .dialog-pin-error {
          font-size: 12px;
          color: #ff9f9f;
          text-align: center;
          font-weight: 700;
        }
        .dialog-actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .dialog-btn {
          appearance: none;
          border: 0;
          border-radius: 14px;
          padding: 11px 14px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: transform .16s ease, filter .16s ease;
        }
        .dialog-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }
        .dialog-btn.cancel {
          background: rgba(255,255,255,.08);
          color: #e8f1ff;
        }
        .dialog-btn.confirm {
          background: linear-gradient(180deg, #5cb0ff, #1e5fbf);
          color: #fff;
        }
        .map-dialog-backdrop {
          z-index: 30;
        }
        .map-dialog-card {
          width: min(100%, 760px);
          border-radius: 24px;
          padding: 14px;
          background: linear-gradient(180deg, rgba(8, 13, 22, .98), rgba(5, 9, 15, .99));
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: 0 24px 80px rgba(0,0,0,.45);
          display: grid;
          gap: 10px;
        }
        .map-dialog-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .map-dialog-title {
          font-size: 18px;
          font-weight: 900;
          color: #f4faff;
        }
        .map-dialog-close-icon {
          appearance: none;
          border: 1px solid rgba(255,255,255,.2);
          background: rgba(255,255,255,.08);
          color: #f0f8ff;
          border-radius: 12px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform .15s ease, filter .15s ease;
        }
        .map-dialog-close-icon:hover {
          transform: translateY(-1px);
          filter: brightness(1.06);
        }
        .map-dialog-close-icon ha-icon {
          width: 20px;
          height: 20px;
        }
        .location-map-frame {
          width: 100%;
          height: min(58vh, 460px);
          border: 0;
          border-radius: 16px;
          background: #0d1723;
        }
        .map-dialog-empty {
          min-height: 190px;
          border-radius: 16px;
          border: 1px dashed rgba(255,255,255,.2);
          background: rgba(255,255,255,.03);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: rgba(230,242,255,.84);
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
        }
        .map-dialog-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }
        .map-dialog-link {
          color: #92d9ff;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
        }
        .map-dialog-link:hover {
          text-decoration: underline;
        }
        .custom-actions-backdrop {
          z-index: 31;
        }
        .custom-actions-dialog-card {
          width: min(100%, 760px);
          border-radius: 24px;
          padding: 14px;
          background: linear-gradient(180deg, rgba(8, 13, 22, .98), rgba(5, 9, 15, .99));
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: 0 24px 80px rgba(0,0,0,.45);
          display: grid;
          gap: 10px;
        }
        .custom-actions-dialog-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .custom-actions-dialog-title {
          font-size: 18px;
          font-weight: 900;
          color: #f4faff;
        }
        .custom-actions-dialog-subtitle {
          font-size: 13px;
          color: rgba(220,236,252,.86);
        }
        .custom-actions-close-icon {
          appearance: none;
          border: 1px solid rgba(255,255,255,.2);
          background: rgba(255,255,255,.08);
          color: #f0f8ff;
          border-radius: 12px;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform .15s ease, filter .15s ease;
        }
        .custom-actions-close-icon:hover {
          transform: translateY(-1px);
          filter: brightness(1.06);
        }
        .custom-actions-close-icon ha-icon {
          width: 20px;
          height: 20px;
        }
        .custom-actions-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }
        .custom-entity-btn {
          appearance: none;
          border: 1px solid rgba(255,255,255,.12);
          background: linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.03));
          color: #fff;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 800;
          min-height: 64px;
          padding: 10px 8px;
          display: grid;
          grid-template-columns: 20px minmax(0, 1fr);
          grid-template-rows: auto auto;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16);
          text-align: left;
          transition: transform .15s ease, border-color .15s ease, background .15s ease, box-shadow .15s ease;
        }
        .custom-entity-btn:hover {
          border-color: rgba(126,198,241,.62);
          box-shadow: 0 0 14px rgba(76,179,236,.18), inset 0 1px 0 rgba(255,255,255,.14);
        }
        .custom-entity-btn:active {
          transform: translateY(1px);
        }
        .custom-entity-btn ha-icon {
          width: 18px;
          height: 18px;
          color: #c9e7ff;
          grid-row: 1 / span 2;
          transition: color .18s ease, filter .18s ease;
        }
        .custom-entity-btn.is-active ha-icon {
          color: #8ff0be;
          filter: drop-shadow(0 0 8px rgba(120, 236, 170, .42));
        }
        .custom-entity-btn.tone-warn.is-active ha-icon {
          color: #ffc48f;
          filter: drop-shadow(0 0 8px rgba(255, 174, 103, .38));
        }
        .custom-entity-btn.tone-unavailable ha-icon {
          color: #ffb4b4;
          filter: saturate(.8);
        }
        .custom-entity-name {
          min-width: 0;
          white-space: normal;
          word-break: break-word;
          overflow-wrap: anywhere;
          line-height: 1.22;
        }
        .custom-entity-state {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 11px;
          font-weight: 700;
          color: rgba(206,226,245,.88);
        }
        .custom-entity-btn.tone-active {
          border-color: rgba(122, 232, 162, .62);
          box-shadow: 0 0 12px rgba(122,232,162,.2), inset 0 1px 0 rgba(255,255,255,.14);
        }
        .custom-entity-btn.tone-active .custom-entity-state {
          color: #93efbf;
        }
        .custom-entity-btn.tone-inactive .custom-entity-state {
          color: rgba(206,226,245,.75);
        }
        .custom-entity-btn.tone-warn {
          border-color: rgba(255, 170, 110, .62);
          box-shadow: 0 0 12px rgba(255,170,110,.2), inset 0 1px 0 rgba(255,255,255,.14);
        }
        .custom-entity-btn.tone-warn .custom-entity-state {
          color: #ffd2a8;
        }
        .custom-entity-btn.tone-unavailable {
          border-color: rgba(255, 109, 109, .46);
          filter: saturate(.84);
        }
        .custom-entity-btn.tone-unavailable .custom-entity-state {
          color: #ffb2b2;
        }
        .custom-entity-btn.tone-info .custom-entity-state {
          color: #9bd6ff;
        }
        .custom-actions-empty {
          grid-column: 1 / -1;
          border-radius: 12px;
          border: 1px dashed rgba(255,255,255,.22);
          background: rgba(255,255,255,.04);
          color: rgba(225,240,255,.88);
          padding: 14px;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
        }
        .hero-service-item.tone-cold {
          border-color: rgba(93,201,255,.52);
          box-shadow: 0 0 12px rgba(93,201,255,.24), inset 0 1px 0 rgba(255,255,255,.14);
        }
        .hero-service-item.tone-heat {
          border-color: rgba(255,102,102,.78);
          box-shadow: 0 0 14px rgba(255,96,96,.34), inset 0 1px 0 rgba(255,255,255,.14);
          background: linear-gradient(180deg, rgba(64,24,24,.82), rgba(26,10,10,.88));
        }
        .hero-service-item.tone-heat ha-icon {
          color: #ffb8b8;
          filter: drop-shadow(0 0 6px rgba(255,92,92,.45));
        }
        .hero-service-item.tone-hot {
          border-color: rgba(255,149,114,.54);
          box-shadow: 0 0 12px rgba(255,149,114,.25), inset 0 1px 0 rgba(255,255,255,.14);
        }
        .hero-service-item.tone-warn {
          border-color: rgba(255,119,109,.6);
          box-shadow: 0 0 12px rgba(255,119,109,.24), inset 0 1px 0 rgba(255,255,255,.14);
        }
        .alert-ribbon {
          margin-top: 10px;
          border-radius: 14px;
          border: 1px solid rgba(255,128,116,.54);
          background: linear-gradient(180deg, rgba(124,25,25,.30), rgba(65,13,13,.38));
          box-shadow: 0 0 18px rgba(255,97,87,.20), inset 0 1px 0 rgba(255,255,255,.14);
          overflow: hidden;
        }
        .alert-ribbon-inner {
          padding: 6px 10px;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          align-items: center;
          gap: 8px;
        }
        .alert-ribbon-head {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #ffe2de;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: .5px;
          margin-bottom: 0;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .alert-ribbon-body {
          min-width: 0;
        }
        .alert-ribbon.single .alert-ribbon-inner {
          grid-template-columns: minmax(0, 1fr) auto;
        }
        .alert-ribbon.single .alert-ribbon-body {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .alert-ribbon.single .alert-ribbon-head {
          justify-self: start;
        }
        .alert-ribbon-sign {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          font-size: 13px;
          line-height: 1;
          color: #ffc1bb;
          transform: translateY(-0.5px);
        }
        .alert-single {
          color: #fff4f2;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.2;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          width: 100%;
        }
        .alert-marquee {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          border-radius: 8px;
          background: rgba(0,0,0,.16);
          border: 1px solid rgba(255,154,144,.24);
        }
        .alert-marquee-track {
          display: inline-flex;
          align-items: center;
          min-width: max-content;
          gap: 24px;
          padding: 4px 0;
          animation: alert-scroll 18s linear infinite;
          will-change: transform;
        }
        .alert-marquee-line {
          color: #fff4f2;
          font-size: 13px;
          font-weight: 800;
          padding-inline: 8px;
          line-height: 1.2;
        }
        .panel {
          border-radius: 20px;
          padding: 8px 10px 7px;
          background:
            radial-gradient(circle at 85% 20%, rgba(93, 210, 255, .18), transparent 36%),
            radial-gradient(circle at 16% 60%, rgba(53, 137, 255, .14), transparent 35%),
            linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.03));
          border: 1px solid rgba(160, 188, 214, .26);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.16),
            inset 0 -20px 28px rgba(0,0,0,.42);
        }
        .category {
          margin-top: 12px;
          border-radius: 18px;
          padding: 10px;
          border: 1px solid rgba(160, 188, 214, .22);
          background:
            radial-gradient(circle at 24% 10%, rgba(58,120,188,.2), transparent 33%),
            linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
        }
        .category-tabs {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }
        .cat-tab {
          appearance: none;
          border: 1px solid rgba(157,190,220,.20);
          background: linear-gradient(180deg, rgba(24,35,49,.86), rgba(15,22,31,.9));
          border-radius: 12px;
          min-height: 44px;
          color: rgba(228,240,252,.92);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: clamp(15px, 1.25vw, 18px);
          font-weight: 900;
          cursor: pointer;
          transition: transform .12s ease, border-color .2s ease, box-shadow .2s ease, background .2s ease;
          text-align: center;
        }
        .cat-tab:hover { transform: translateY(-1px); }
        .cat-tab ha-icon {
          width: 16px;
          height: 16px;
          color: rgba(173,221,255,.92);
        }
        .cat-tab span {
          text-align: center;
          display: inline-block;
          width: 100%;
        }
        .cat-tab.active {
          border-color: rgba(84,194,255,.75);
          background: linear-gradient(180deg, rgba(0,184,255,.20), rgba(0,184,255,.06));
          box-shadow: 0 0 0 1px rgba(84,194,255,.35) inset, 0 10px 24px rgba(20,130,210,.2);
          color: #f4fbff;
        }
        .btn-feedback {
          animation: btn-pulse .45s ease;
        }
        .action-btn.btn-feedback {
          border-color: rgba(255, 175, 43, .95);
          background: linear-gradient(180deg, rgba(255, 166, 0, .95), rgba(204, 96, 0, .92));
          box-shadow: 0 0 18px rgba(255, 166, 0, .35), inset 0 1px 0 rgba(255,255,255,.16);
          color: #fff;
        }
        .action-btn.btn-feedback ha-icon {
          color: #fff;
        }
        .active-category-content {
          margin-top: 2px;
        }
        .category h3 {
          margin: 2px 2px 10px;
          font-size: 22px;
          text-transform: none;
          letter-spacing: .4px;
          color: rgba(255,255,255,.8);
          text-align: center;
          font-weight: 900;
        }
        .category-title-row {
          display: grid;
          grid-template-columns: 36px 1fr 36px;
          align-items: start;
          width: 100%;
          gap: 8px;
        }
        .category-title-icon {
          width: 36px;
          height: 36px;
          color: rgba(180, 227, 255, .92);
          filter: drop-shadow(0 0 7px rgba(99, 199, 255, .35));
          justify-self: start;
          align-self: start;
          margin-top: -2px;
        }
        .category-title-text {
          justify-self: center;
          text-align: center;
          line-height: 1.12;
        }
        .category-title-spacer {
          width: 36px;
          height: 36px;
        }
        .category h3.category-title-main {
          text-transform: none;
          letter-spacing: .2px;
          font-size: 32px;
          font-weight: 900;
          color: #f2f8ff;
          text-shadow: 0 2px 12px rgba(0,0,0,.35);
          text-align: center;
        }
        .battery-head {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .battery-head-status {
          font-size: 17px;
          color: rgba(237,247,255,.97);
          font-weight: 900;
          letter-spacing: .2px;
          text-align: end;
          justify-self: end;
        }
        .battery-head-range {
          font-size: 15px;
          font-weight: 800;
          color: rgba(224,245,255,.94);
          text-align: center;
          justify-self: center;
          line-height: 1.05;
          white-space: nowrap;
        }
        .battery-head-power {
          font-size: 18px;
          color: rgba(216,244,255,.98);
          font-weight: 900;
          text-align: left;
          text-shadow: 0 0 16px rgba(104,216,255,.45);
          line-height: 1;
          justify-self: start;
        }
        .battery-head-power .power-pair {
          display: inline-flex;
          align-items: baseline;
          gap: 4px;
          direction: ltr;
        }
        .battery-head-power .power-value {
          font-size: 1em;
          font-weight: 900;
          color: inherit;
        }
        .charging-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #ecf9ff;
        }
        .charging-icon {
          font-size: 20px;
          line-height: 1;
          text-shadow: 0 0 14px rgba(108, 219, 255, .75);
        }
        .charging-text {
          font-size: 15px;
          font-weight: 900;
          letter-spacing: .3px;
        }
        .battery-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 0;
        }
        .battery-shell {
          position: relative;
          flex: 1;
          height: 28px;
          border-radius: 999px;
          overflow: hidden;
          background: linear-gradient(180deg, #0a0f17, #1a2430);
          border: 1px solid rgba(188,214,236,.24);
          box-shadow:
            inset 0 4px 8px rgba(255,255,255,.14),
            inset 0 -12px 16px rgba(0,0,0,.72),
            0 0 0 1px rgba(54,118,170,.18);
        }
        .battery-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #6dd9ff 0%, #63d7d3 48%, #78f3b8 100%);
          box-shadow:
            inset 0 2px 8px rgba(255,255,255,.46),
            0 0 24px rgba(121,239,193,.4),
            0 0 22px rgba(105,204,255,.35);
          transition: none;
          position: relative;
          overflow: hidden;
        }
        .battery-fill.charging {
          transition: width .45s ease;
        }
        .battery-fill.charging::before {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(90deg, transparent 0px, transparent 12px, rgba(255,255,255,.35) 13px, rgba(255,255,255,.35) 20px, transparent 32px);
          animation: electric-current 0.7s linear infinite;
        }
        .battery-fill.charging::after {
          content: "";
          position: absolute;
          top: 0;
          left: -40%;
          width: 40%;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.8), rgba(0,229,255,.9), transparent);
          filter: blur(1px);
          animation: charge-wave 1.2s ease-in-out infinite;
        }
        .battery-gloss {
          position: absolute;
          top: 3px;
          left: 4px;
          right: 4px;
          height: 45%;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,.42), rgba(255,255,255,0));
        }
        .battery-inline-state {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 6;
          font-size: 14px;
          font-weight: 900;
          color: rgba(241,249,255,.96);
          padding: 2px 10px;
          border-radius: 999px;
          background: rgba(8,14,20,.46);
          border: 1px solid rgba(176,212,238,.35);
          text-shadow: 0 1px 8px rgba(0,0,0,.65);
          pointer-events: none;
          white-space: nowrap;
        }
        .battery-shell.is-charging .battery-inline-state {
          display: none !important;
        }
        .battery-percent {
          min-width: 84px;
          text-align: right;
          font-size: 46px;
          font-weight: 900;
          line-height: 1;
          color: #f8feff;
          text-shadow:
            0 0 18px rgba(120,220,255,.75),
            0 0 34px rgba(81,187,255,.5);
          margin-top: 0;
        }
        .battery-sub {
          margin-top: 4px;
          color: rgba(226,239,252,.92);
          font-size: 14px;
          font-weight: 700;
          text-align: right;
        }
        .battery-sub .charge-state {
          font-size: 15px;
          font-weight: 900;
          color: #f2fbff;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .vehicle-metrics {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .metric {
          border-radius: 14px;
          padding: 8px 9px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.10);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .metric label {
          font-size: clamp(14px, 1.2vw, 18px);
          color: rgba(255,255,255,.70);
          display: block;
          width: 100%;
          text-align: center;
          font-weight: 700;
          line-height: 1.05;
        }
        .metric strong {
          font-size: clamp(19px, 1.7vw, 26px);
          margin-top: 3px;
          display: block;
          width: 100%;
          text-align: center;
          color: #fff;
          line-height: 1.02;
          font-weight: 900;
        }
        .climate-metrics {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 7px;
        }
        .climate-metrics .metric {
          padding: 7px 8px;
          min-height: 72px;
        }
        .climate-metrics .metric label {
          font-size: clamp(13px, 1.1vw, 17px);
        }
        .climate-metrics .metric strong {
          font-size: clamp(18px, 1.6vw, 24px);
          margin-top: 2px;
        }
        .actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .action-btn {
          appearance: none;
          border: 1px solid rgba(255,255,255,.12);
          background: linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.03));
          color: #fff;
          border-radius: 14px;
          font-size: clamp(16px, 1.3vw, 19px);
          font-weight: 800;
          padding: 11px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          cursor: pointer;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16);
          text-align: center;
          transition: transform .15s ease, border-color .15s ease, background .15s ease, box-shadow .15s ease;
        }
        .action-btn.active {
          border-color: rgba(126,198,241,.92);
          background: linear-gradient(180deg, rgba(35,112,175,.96), rgba(18,61,99,.95));
          box-shadow: 0 0 18px rgba(76,179,236,.2), inset 0 1px 0 rgba(255,255,255,.12);
        }
        .action-btn.climate-on.active {
          border-color: rgba(126,198,241,.92);
          background: linear-gradient(180deg, rgba(35,112,175,.96), rgba(18,61,99,.95));
          box-shadow: 0 0 18px rgba(76,179,236,.2), inset 0 1px 0 rgba(255,255,255,.12);
        }
        .action-btn.climate-on.climate-mode-heat.active {
          border-color: rgba(255,126,126,.92);
          background: linear-gradient(180deg, rgba(255,95,95,.96), rgba(180,50,50,.95));
          box-shadow: 0 0 18px rgba(255,95,95,.2), inset 0 1px 0 rgba(255,255,255,.12);
        }
        .action-btn.climate-on.climate-mode-cool.active {
          border-color: rgba(126,198,241,.92);
          background: linear-gradient(180deg, rgba(35,112,175,.96), rgba(18,61,99,.95));
          box-shadow: 0 0 18px rgba(76,179,236,.2), inset 0 1px 0 rgba(255,255,255,.12);
        }
        .action-btn.climate-off.active {
          border-color: rgba(126,198,241,.92);
          background: linear-gradient(180deg, rgba(35,112,175,.96), rgba(18,61,99,.95));
          box-shadow: 0 0 18px rgba(76,179,236,.2), inset 0 1px 0 rgba(255,255,255,.12);
        }
        .action-btn:active { transform: translateY(1px); }
        .action-btn ha-icon { width: 19px; height: 19px; }
        .action-btn span {
          text-align: center;
          width: 100%;
          display: inline-block;
        }
        .location-actions {
          margin-top: 10px;
          display: grid;
          grid-template-columns: 1fr;
        }
        .location-map-btn {
          min-height: 44px;
          border-color: rgba(98, 192, 255, .44);
          background: linear-gradient(180deg, rgba(35,112,175,.28), rgba(18,61,99,.2));
          box-shadow: 0 0 14px rgba(76,179,236,.16), inset 0 1px 0 rgba(255,255,255,.12);
        }
        .seat-wrap {
          margin-top: 10px;
          border-radius: 14px;
          padding: 10px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.09);
        }
        .seat-header {
          font-size: 17px;
          color: rgba(244,251,255,.95);
          margin-bottom: 10px;
          letter-spacing: .4px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          text-align: center;
          font-weight: 900;
          text-shadow: 0 0 10px rgba(106,197,255,.3);
          min-height: 24px;
        }
        .seat-header span {
          direction: rtl;
          display: inline-block;
          width: 100%;
          text-align: center;
        }
        .seat-header ha-icon {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: rgba(255, 169, 128, .95);
          filter: drop-shadow(0 0 7px rgba(255, 121, 88, .42));
        }
        .seat-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .seat-control {
          border-radius: 12px;
          padding: 8px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08);
        }
        .seat-title {
          font-size: clamp(15px, 1.25vw, 18px);
          color: rgba(255,255,255,.78);
          margin-bottom: 7px;
          text-align: center;
          font-weight: 800;
        }
        .seat-levels {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
        }
        .seat-level {
          appearance: none;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 9px;
          min-height: 30px;
          background: rgba(255,255,255,.03);
          color: rgba(255,255,255,.85);
          font-size: clamp(14px, 1.15vw, 16px);
          font-weight: 800;
          cursor: pointer;
          text-align: center;
        }
        .seat-level.active {
          border-color: rgba(156,197,230,.72);
          background: linear-gradient(180deg, rgba(133,161,191,.45), rgba(112,139,167,.36));
          color: #f2f8ff;
          box-shadow: 0 0 16px rgba(143,186,225,.26), inset 0 1px 0 rgba(255,255,255,.2);
        }
        .seat-level.active.level-off {
          border-color: rgba(156,197,230,.72);
          background: linear-gradient(180deg, rgba(133,161,191,.45), rgba(112,139,167,.36));
          color: #f2f8ff;
          box-shadow: 0 0 16px rgba(143,186,225,.26), inset 0 1px 0 rgba(255,255,255,.2);
        }
        .seat-level.active.level-low {
          border-color: rgba(255,179,71,.6);
          background: rgba(255,179,71,.26);
          color: #ffd18f;
          box-shadow: 0 0 14px rgba(255,179,71,.28);
        }
        .seat-level.active.level-high {
          border-color: rgba(255,96,88,.7);
          background: rgba(255,96,88,.28);
          color: #ffb2ad;
          box-shadow: 0 0 16px rgba(255,96,88,.32);
        }
        .seat-level.active.level-medium {
          border-color: rgba(255,160,104,.65);
          background: rgba(255,160,104,.24);
          color: #ffd8b5;
          box-shadow: 0 0 15px rgba(255,160,104,.3);
        }
        .seat-level.active.level-cool {
          border-color: rgba(115,186,255,.72);
          background: rgba(86,165,244,.24);
          color: #cae8ff;
          box-shadow: 0 0 16px rgba(86,165,244,.32);
        }
        .seat-control.seat-cooling .seat-level.active.level-high {
          border-color: rgba(115,186,255,.72);
          background: rgba(86,165,244,.24);
          color: #cae8ff;
          box-shadow: 0 0 16px rgba(86,165,244,.32);
        }
        .seat-control.seat-cooling .seat-level.active.level-medium {
          border-color: rgba(115,186,255,.65);
          background: rgba(86,165,244,.24);
          color: #ffd8b5;
          box-shadow: 0 0 15px rgba(115,186,255,.3);
        }
        .seat-control.seat-cooling .seat-level.active.level-low {
          border-color: rgba(115,186,255,.6);
          background: rgba(86,165,244,.2);
          color: #cae8ff;
          box-shadow: 0 0 14px rgba(86,165,244,.28);
        }
        .climate-controls {
          margin-top: 10px;
          border-radius: 14px;
          padding: 8px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.09);
        }
        .climate-row {
          display: grid;
          gap: 6px;
          margin-top: 6px;
        }
        .climate-row:first-child {
          margin-top: 0;
        }
        .climate-row-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .climate-row-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .climate-btn {
          appearance: none;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 9px;
          min-height: 30px;
          background: rgba(255,255,255,.04);
          color: rgba(255,255,255,.9);
          font-size: clamp(14px, 1.15vw, 16px);
          font-weight: 800;
          cursor: pointer;
          padding: 0 6px;
          text-align: center;
        }
        .climate-btn-temp {
          cursor: default;
          pointer-events: none;
          border-color: rgba(133,186,224,.28);
          background: linear-gradient(180deg, rgba(26,40,58,.55), rgba(17,27,39,.62));
          color: rgba(227,243,255,.95);
        }
        .climate-btn.on {
          background: rgba(0,217,255,.2);
          border-color: rgba(0,217,255,.55);
          box-shadow: 0 0 15px rgba(0,217,255,.3);
        }
        .climate-btn.active-cool {
          background: rgba(77,175,255,.24);
          border-color: rgba(77,175,255,.64);
          color: #b8e3ff;
        }
        .climate-btn.active-heat {
          background: rgba(255,129,77,.24);
          border-color: rgba(255,129,77,.64);
          color: #ffd0b8;
        }
        .target-box {
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 9px;
          min-height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          background: rgba(255,255,255,.03);
        }
        .target-box span {
          font-size: clamp(13px, 1.1vw, 15px);
          color: rgba(255,255,255,.68);
          font-weight: 700;
        }
        .target-box strong {
          font-size: clamp(17px, 1.5vw, 21px);
          color: #fff;
          font-weight: 900;
        }
        .tires {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        .tire-card {
          border-radius: 14px;
          padding: 10px 11px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.10);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .tire-card.warn { animation: blink 1s infinite; }
        .tire-title { font-size: clamp(15px, 1.25vw, 18px); color: rgba(255,255,255,.78); text-align: center; width: 100%; font-weight: 800; line-height: 1.06; }
        .tire-value { margin-top: 4px; font-size: clamp(20px, 1.8vw, 26px); font-weight: 900; text-align: center; width: 100%; line-height: 1.02; }
        @keyframes electric-current { 0% { transform: translateX(-36px); } 100% { transform: translateX(36px); } }
        @keyframes charge-wave { 0% { left: -40%; opacity: .2; } 35% { opacity: 1; } 100% { left: 100%; opacity: .3; } }
        @keyframes blink { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.18); } }
        @keyframes alert-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes btn-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 rgba(116,217,255,0); }
          40% { transform: scale(1.03); box-shadow: 0 0 18px rgba(116,217,255,.34); }
          100% { transform: scale(1); box-shadow: 0 0 0 rgba(116,217,255,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .alert-marquee-track { animation: none; }
          .btn-feedback { animation: none; }
        }
        @media (max-width: 540px) {
          .hero-title {
            margin: 0 2px 8px;
            font-size: calc(var(--byd-hero-title-size, 44px) * 0.82);
          }
          .car-image { height: 190px; }
          .hero { min-height: 165px; }
          .hero-services-grid {
            grid-template-columns: repeat(3, 30px);
            gap: 6px;
            max-width: 114px;
            top: 10px;
            left: 10px;
          }
          .hero-battery-badge {
            top: 10px;
            right: 10px;
            min-width: 74px;
            max-width: 80px;
            padding: 4px 6px;
            border-radius: 8px;
          }
          .hero-battery-label { font-size: 9px; }
          .hero-battery-value { font-size: 16px; margin-top: 1px; }
          .hero-service-item {
            width: 30px;
            height: 30px;
            border-radius: 9px;
          }
          .hero-service-item ha-icon {
            width: 17px;
            height: 17px;
          }
          .hero-custom-badge,
          .hero-lock-badge {
            width: 36px;
            height: 36px;
          }
          .hero-custom-badge ha-icon,
          .hero-lock-badge ha-icon {
            --mdc-icon-size: 18px;
            width: 18px;
            height: 18px;
          }
          .alert-ribbon-inner { padding: 5px 8px; gap: 6px; grid-template-columns: auto minmax(0, 1fr); }
          .alert-single { font-size: 12px; }
          .alert-marquee-line { font-size: 12px; }
          .category h3 { font-size: 19px; }
          .category h3.category-title-main { font-size: 26px; }
          .category-title-row { grid-template-columns: 30px 1fr 30px; }
          .category-title-icon { width: 30px; height: 30px; }
          .category-title-spacer { width: 30px; height: 30px; }
          .category-tabs { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .cat-tab { min-height: 40px; font-size: 13px; gap: 5px; }
          .cat-tab ha-icon { width: 14px; height: 14px; }
          .metric label { font-size: 13px; }
          .metric strong { font-size: 18px; }
          .action-btn { font-size: 14px; }
          .action-btn ha-icon { width: 17px; height: 17px; }
          .custom-actions-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
          .custom-entity-btn { min-height: 50px; font-size: 13px; }
          .custom-actions-dialog-subtitle { font-size: 12px; }
          .seat-level { min-height: 30px; font-size: 13px; }
          .climate-btn { min-height: 30px; font-size: 13px; }
          .target-box { min-height: 30px; }
          .target-box span { font-size: 12px; }
          .target-box strong { font-size: 16px; }
          .tire-title { font-size: 13px; }
          .tire-value { font-size: 20px; }
          .battery-head-status { font-size: 14px; }
          .battery-head-power { font-size: 14px; }
          .battery-head-range { font-size: 13px; }
          .battery-percent { font-size: 34px; min-width: 64px; }
          .battery-sub { font-size: 13px; }
          .charging-text { font-size: 15px; }
          .battery-sub .charge-state { font-size: 14px; }
          .battery-inline-state { font-size: 12px; padding: 1px 8px; }
          .seat-grid { grid-template-columns: 1fr; }
          .vehicle-metrics { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .climate-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .climate-metrics .metric { min-height: 64px; }
          .climate-row-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .climate-row-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .map-dialog-card {
            padding: 10px;
            border-radius: 18px;
          }
          .map-dialog-title {
            font-size: 16px;
          }
          .location-map-frame {
            height: min(52vh, 340px);
            border-radius: 12px;
          }
        }
      </style>
    `;

    this.shadowRoot.querySelectorAll(".action-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._flashButtonFeedback(btn);
        const key = btn.getAttribute("data-key");
        const action = btn.getAttribute("data-action");
        if (!key || !action) return;
        if (action === "toggle") this._callToggle(key);
        if (action === "lock") this._callLock(key, false);
        if (action === "unlock") this._showConfirmation("unlock", { key });
        if (action === "climate_on") this._callClimatePower(true);
        if (action === "climate_off") this._callClimatePower(false);
        if (action === "location_map") this._showLocationMapDialog();
        if (action === "press") {
          this._callButton(key);
          if (this._buttonFeedbacks) {
            this._buttonFeedbacks.set(key, { text: this._t("executed"), until: Date.now() + 2000 });
          }
          this._render();
        }
      });
    });

    this.shadowRoot.querySelectorAll(".seat-level").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._flashButtonFeedback(btn);
        const key = btn.getAttribute("data-seat");
        const option = btn.getAttribute("data-option");
        if (!key || !option) return;
        this._seatUiOverrides[key] = { option, ts: Date.now() };
        this._render();
        this._callSelectOption(key, option);
      });
    });

    this.shadowRoot.querySelectorAll(".climate-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._flashButtonFeedback(btn);
        const action = btn.getAttribute("data-climate-action");
        if (!action) return;
        if (action === "power") {
          this._callClimatePower(!climateIsOn);
          return;
        }
        if (action === "temp_down") {
          const next = clamp(climateTemp - 1, climateMin, climateMax);
          this._callClimateSetTemp(next);
          return;
        }
        if (action === "temp_up") {
          const next = clamp(climateTemp + 1, climateMin, climateMax);
          this._callClimateSetTemp(next);
          return;
        }
        if (action === "preset_cool") {
          this._callClimatePreset("max_cool");
          return;
        }
        if (action === "preset_heat") {
          this._callClimatePreset("max_heat");
          return;
        }
        if (action === "comfort_21") {
          const next = clamp(21, climateMin, climateMax);
          this._callClimateSetTemp(next);
        }
      });
    });

    this.shadowRoot.querySelectorAll(".cat-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._flashButtonFeedback(btn);
        const key = btn.getAttribute("data-category");
        if (!key || key === this._activeCategory) return;
        this._activeCategory = key;
        this._persistActiveCategory(key);
        this._render();
      });
    });

    this.shadowRoot.querySelectorAll(".hero-service-item.actionable").forEach((item) => {
      item.addEventListener("click", () => {
        this._flashButtonFeedback(item);
        const indicatorId = item.getAttribute("data-indicator");
        this._handleServiceIndicatorAction(indicatorId);
      });
    });

    this.shadowRoot.querySelectorAll(".hero-lock-badge").forEach((badge) => {
      badge.addEventListener("click", () => {
        this._flashButtonFeedback(badge);
        const lockState = this._state("lock")?.state;
        if (!lockState) return;

        const isCurrentlyLocked = lockState === "locked" || lockState === "off";
        if (isCurrentlyLocked) {
          this._showConfirmation("unlock", { key: "lock" });
          return;
        }

        this._callLock("lock", false);
      });
    });

    this.shadowRoot.querySelectorAll("[data-hero-custom-actions]").forEach((badge) => {
      badge.addEventListener("click", () => {
        this._flashButtonFeedback(badge);
        this._showCustomEntitiesDialog();
      });
    });

    this.shadowRoot.querySelectorAll("[data-dialog-backdrop]").forEach((backdrop) => {
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) this._hideConfirmation();
      });
    });

    this.shadowRoot.querySelectorAll("[data-map-dialog-backdrop]").forEach((backdrop) => {
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) this._hideLocationMapDialog();
      });
    });

    this.shadowRoot.querySelectorAll("[data-custom-dialog-backdrop]").forEach((backdrop) => {
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) this._hideCustomEntitiesDialog();
      });
    });

    this.shadowRoot.querySelectorAll(".dialog-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-dialog-action");
        if (action === "cancel") {
          this._hideConfirmation();
          return;
        }
        if (action === "confirm") {
          this._submitConfirmationUnlock();
        }
      });
    });

    this.shadowRoot.querySelectorAll("[data-pin-key]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-pin-key");
        if (!key) return;
        if (key === "enter") {
          this._submitConfirmationUnlock();
          return;
        }
        this._applyConfirmationPinKey(key);
      });
    });

    this.shadowRoot.querySelectorAll("[data-map-dialog-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-map-dialog-action");
        if (action === "close") {
          this._hideLocationMapDialog();
        }
      });
    });

    this.shadowRoot.querySelectorAll("[data-custom-dialog-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-custom-dialog-action");
        if (action === "close") {
          this._hideCustomEntitiesDialog();
        }
      });
    });

    this.shadowRoot.querySelectorAll("[data-custom-entity]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._flashButtonFeedback(btn);
        const entityId = btn.getAttribute("data-custom-entity");
        if (!entityId) return;
        this._callCustomEntity(entityId);
        if (this._buttonFeedbacks) {
          this._buttonFeedbacks.set(`custom:${entityId}`, { text: this._t("executed"), until: Date.now() + 1500 });
        }
      });
    });

    const heroImage = this.shadowRoot.querySelector(".car-image");
    if (heroImage) {
      heroImage.addEventListener("error", () => {
        const fallback = heroImage.getAttribute("data-fallback");
        if (fallback && heroImage.getAttribute("src") !== fallback) {
          heroImage.setAttribute("src", fallback);
        }
      });
    }
  }
}

class Byd3DCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...DEFAULT_CONFIG, ...config, entities: { ...(config.entities || {}) } };
    this._config.seat_passenger_mode = normalizeSeatPassengerMode(
      config?.seat_passenger_mode,
      Boolean(config?.show_seat_cooling)
    );
    this._config.show_seat_cooling = this._config.seat_passenger_mode === "cool";
    this._config.show_external_entities = normalizeExternalEntitiesEnabled(this._config.show_external_entities);
    this._config.require_unlock_pin = normalizeUnlockPinEnabled(this._config.require_unlock_pin);
    this._config.unlock_pin_code = normalizeUnlockPinCode(this._config.unlock_pin_code);
    this._config.category_order = this._normalizeCategoryOrder(this._config.category_order);
    this._config.tire_pressure_unit = normalizeTirePressureUnit(this._config.tire_pressure_unit);
    this._config.image_base_path = normalizeImageBasePath(this._config.image_base_path);
    this._config.i18n_base_path = normalizeI18nBasePath(this._config.i18n_base_path);
    this._config.custom_entities = normalizeCustomEntities(this._config.custom_entities);
    this._config.custom_entity_names = pruneCustomEntityNames(
      this._config.custom_entity_names,
      this._config.custom_entities
    );
    this._config.custom_entity_icons = pruneCustomEntityIcons(
      this._config.custom_entity_icons,
      this._config.custom_entities
    );
    this._config.refresh_interval_seconds = this._normalizeRefreshInterval(this._config.refresh_interval_seconds);
    this._config.title_font_size = this._normalizeTitleFontSize(this._config.title_font_size);
    this._render();
  }

  set hass(hass) {
    const hadHass = Boolean(this._hass);
    this._hass = hass;
    this._ensureMdiIconCatalogLoaded();
    if (this.isConnected) {
      this._populatePrefixCandidates();
      if (!hadHass) this._render();
    }
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this._render();
    this._populatePrefixCandidates();
    this._ensureMdiIconCatalogLoaded();
  }

  _language() {
    return this._config?.language || "he";
  }

  _t(key) {
    const lang = this._language();
    const base = this._config?.i18n_base_path || DEFAULT_I18N_BASE_PATH;
    const cached = TRANSLATION_CACHE.get(`${lang}:${base}`);
    return cached?.[key] || FALLBACK_I18N[key] || key;
  }

  _normalizeCategoryOrder(order) {
    const base = CATEGORY_DEFS.map((c) => c.key);
    if (!Array.isArray(order) || order.length === 0) return [...base];
    const cleaned = order.filter((k) => base.includes(k));
    for (const key of base) {
      if (!cleaned.includes(key)) cleaned.push(key);
    }
    return cleaned;
  }

  _normalizeRefreshInterval(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 25;
    return clamp(Math.round(n), 8, 120);
  }

  _normalizeTitleFontSize(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return 46;
    return clamp(Math.round(n), 24, 72);
  }

  _categoryLabel(key) {
    const def = CATEGORY_DEFS.find((item) => item.key === key);
    if (!def) return key;
    return this._t(def.labelKey);
  }

  _renderCategoryOrderOptions() {
    const order = this._normalizeCategoryOrder(this._config.category_order);
    return order
      .map((key) => {
        const def = CATEGORY_DEFS.find((item) => item.key === key);
        if (!def) return "";
        return `
          <div class="category-order-item" draggable="true" data-key="${key}">
            <div class="category-order-main">
              <ha-icon icon="${def.icon}"></ha-icon>
              <span>${this._categoryLabel(key)}</span>
            </div>
            <ha-icon class="drag-handle" icon="mdi:drag"></ha-icon>
          </div>
        `;
      })
      .join("");
  }

  _bindCategoryOrderDnD() {
    if (!this.shadowRoot) return;
    const items = [...this.shadowRoot.querySelectorAll(".category-order-item")];
    if (!items.length) return;

    let draggingKey = "";

    const clearDragStates = () => {
      items.forEach((item) => item.classList.remove("drag-over", "dragging"));
    };

    items.forEach((item) => {
      item.addEventListener("dragstart", (event) => {
        const key = item.getAttribute("data-key");
        if (!key) return;
        draggingKey = key;
        item.classList.add("dragging");
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", key);
        }
      });

      item.addEventListener("dragend", () => {
        draggingKey = "";
        clearDragStates();
      });

      item.addEventListener("dragover", (event) => {
        event.preventDefault();
        const targetKey = item.getAttribute("data-key");
        if (!targetKey || !draggingKey || targetKey === draggingKey) return;
        item.classList.add("drag-over");
        if (event.dataTransfer) {
          event.dataTransfer.dropEffect = "move";
        }
      });

      item.addEventListener("dragleave", () => {
        item.classList.remove("drag-over");
      });

      item.addEventListener("drop", (event) => {
        event.preventDefault();
        const targetKey = item.getAttribute("data-key");
        const sourceKey = draggingKey || event.dataTransfer?.getData("text/plain");
        if (!sourceKey || !targetKey || sourceKey === targetKey) {
          clearDragStates();
          return;
        }

        const nextOrder = this._normalizeCategoryOrder(this._config.category_order);
        const sourceIndex = nextOrder.indexOf(sourceKey);
        const targetIndex = nextOrder.indexOf(targetKey);
        if (sourceIndex < 0 || targetIndex < 0) {
          clearDragStates();
          return;
        }

        const targetRect = item.getBoundingClientRect();
        const beforeTarget = event.clientY < targetRect.top + targetRect.height / 2;

        nextOrder.splice(sourceIndex, 1);
        let insertAt = nextOrder.indexOf(targetKey);
        if (!beforeTarget) insertAt += 1;
        nextOrder.splice(insertAt, 0, sourceKey);

        clearDragStates();
        this._emitChange({ category_order: nextOrder });
        this._render();
      });
    });
  }

  _renderProfileOptions() {
    return Object.entries(VEHICLE_PROFILES)
      .map(([key, profile]) => {
        const active = this._config.vehicle_profile === key ? "active" : "";
        const basePath = (this._config.image_base_path || DEFAULT_IMAGE_BASE_PATH).replace(/\/$/, "");
        const localImages = {
          atto3: `${basePath}/bydatoo3.png`,
          seal: `${basePath}/seal.png`,
          dolphin: `${basePath}/byd_dolphin.png`,
          sealion7: `${basePath}/sealion.png`,
        };
        const localImage = localImages[key] || profile.image;
        return `
          <button class="profile ${active}" data-profile="${key}" title="${profile.label}">
            <img src="${localImage}" data-fallback="${profile.image}" alt="${profile.label}" />
            <span>${profile.label}</span>
          </button>
        `;
      })
      .join("");
  }

  _renderLanguageOptions() {
    const langs = [
      { key: "he", label: "עברית", flag: "🇮🇱" },
      { key: "en", label: "English", flag: "🇺🇸" },
      { key: "ru", label: "Русский", flag: "🇷🇺" },
      { key: "fr", label: "Français", flag: "🇫🇷" },
    ];
    return langs
      .map((lang) => {
        const active = this._config.language === lang.key ? "active" : "";
        return `
          <button class="lang-btn ${active}" data-lang="${lang.key}" title="${lang.label}">
            <span class="flag">${lang.flag}</span>
            <span class="lang-label">${lang.label}</span>
          </button>
        `;
      })
      .join("");
  }

  _renderSeatModeOptions() {
    const mode = normalizeSeatPassengerMode(this._config?.seat_passenger_mode, Boolean(this._config?.show_seat_cooling));
    const options = [
      { key: "heat", icon: "mdi:car-seat-heater", label: this._t("seat_mode_heat") },
      { key: "cool", icon: "mdi:snowflake", label: this._t("seat_mode_cool") },
      { key: "both", icon: "mdi:car-seat", label: this._t("seat_mode_both") },
    ];
    return options
      .map((opt) => {
        const active = mode === opt.key ? "active" : "";
        return `
          <button class="seat-mode-btn ${active}" data-seat-mode="${opt.key}" title="${opt.label}">
            <ha-icon icon="${opt.icon}"></ha-icon>
            <span>${opt.label}</span>
          </button>
        `;
      })
      .join("");
  }

  _allEntityIds() {
    if (!this._hass?.states) return [];
    return Object.keys(this._hass.states).sort((a, b) => {
      const aName = this._hass.states[a]?.attributes?.friendly_name || a;
      const bName = this._hass.states[b]?.attributes?.friendly_name || b;
      return String(aName).localeCompare(String(bName));
    });
  }

  _renderExternalEntitiesOptions() {
    const selected = new Set(normalizeCustomEntities(this._config?.custom_entities));
    return this._allEntityIds()
      .map((entityId) => {
        const st = this._hass.states[entityId];
        const name = st?.attributes?.friendly_name || entityId;
        const selectedAttr = selected.has(entityId) ? "selected" : "";
        return `<option value="${escapeHtml(entityId)}" ${selectedAttr}>${escapeHtml(name)} (${escapeHtml(entityId)})</option>`;
      })
      .join("");
  }

  _selectedExternalEntitiesFromEditor() {
    return normalizeCustomEntities(this._config?.custom_entities);
  }

  _customEntityIconsFromEditor() {
    const selected = new Set(this._selectedCustomEntities());
    const inputs = [...(this.shadowRoot?.querySelectorAll("[data-custom-icon-input]") || [])];
    if (!inputs.length) {
      return pruneCustomEntityIcons(this._config?.custom_entity_icons, this._config?.custom_entities);
    }
    const out = {};
    inputs.forEach((input) => {
      const entityId = String(input.getAttribute("data-custom-icon-input") || "").trim();
      if (!entityId || !selected.has(entityId)) return;
      const icon = this._normalizeIconInputValue(input.value);
      if (!icon) return;
      out[entityId] = icon;
    });
    return out;
  }

  _customEntityNamesFromEditor() {
    const selected = new Set(this._selectedCustomEntities());
    const inputs = [...(this.shadowRoot?.querySelectorAll("[data-custom-name-input]") || [])];
    if (!inputs.length) {
      return pruneCustomEntityNames(this._config?.custom_entity_names, this._config?.custom_entities);
    }
    const out = {};
    inputs.forEach((input) => {
      const entityId = String(input.getAttribute("data-custom-name-input") || "").trim();
      if (!entityId || !selected.has(entityId)) return;
      const name = String(input.value || "").trim();
      if (!name) return;
      out[entityId] = name;
    });
    return out;
  }

  _normalizeIconInputValue(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";
    if (raw.startsWith("mdi:")) return raw;
    if (raw.startsWith("mdi-")) return `mdi:${raw.slice(4)}`;
    return `mdi:${raw}`;
  }

  async _ensureMdiIconCatalogLoaded() {
    if (Array.isArray(Byd3DCardEditor._mdiCatalog) && Byd3DCardEditor._mdiCatalog.length) {
      return Byd3DCardEditor._mdiCatalog;
    }
    if (Byd3DCardEditor._mdiCatalogPromise) {
      return Byd3DCardEditor._mdiCatalogPromise;
    }

    Byd3DCardEditor._mdiCatalogPromise = (async () => {
      for (const url of MDI_ICON_META_URLS) {
        try {
          const response = await fetch(url, { cache: "force-cache" });
          if (!response.ok) continue;
          const payload = await response.json();
          if (!Array.isArray(payload)) continue;
          const icons = payload
            .map((item) => String(item?.name || "").trim())
            .filter(Boolean)
            .map((name) => `mdi:${name}`);
          if (!icons.length) continue;
          Byd3DCardEditor._mdiCatalog = icons;
          return icons;
        } catch (_err) {
          continue;
        }
      }
      Byd3DCardEditor._mdiCatalog = [];
      return [];
    })();

    const icons = await Byd3DCardEditor._mdiCatalogPromise;
    Byd3DCardEditor._mdiCatalogPromise = null;
    if (icons.length && this.isConnected) this._render();
    return icons;
  }

  _iconSuggestionValues() {
    const dynamic = this._allEntityIds()
      .map((entityId) => String(this._hass?.states?.[entityId]?.attributes?.icon || "").trim())
      .filter((icon) => icon.startsWith("mdi:"));
    const custom = Object.values(normalizeCustomEntityIcons(this._config?.custom_entity_icons));
    const fullCatalog = Array.isArray(Byd3DCardEditor._mdiCatalog) ? Byd3DCardEditor._mdiCatalog : [];
    return [...new Set([...fullCatalog, ...MDI_ICON_SUGGESTIONS, ...dynamic, ...custom])];
  }

  _renderIconSuggestions() {
    return this._iconSuggestionValues().map((icon) => `<option value="${escapeHtml(icon)}"></option>`).join("");
  }

  _renderIconDropdownOptions(entityId, query) {
    const term = String(query || "")
      .trim()
      .toLowerCase()
      .replace(/^mdi:/, "")
      .replace(/^mdi-/, "");
    const options = this._iconSuggestionValues()
      .filter((icon) => {
        const lower = icon.toLowerCase();
        const bare = lower.replace(/^mdi:/, "");
        return !term || bare.startsWith(term) || lower.includes(term) || bare.includes(term);
      })
      .slice(0, 140);
    if (!options.length) {
      return `<div class="icon-dropdown-empty">${this._t("external_actions_empty")}</div>`;
    }
    return options
      .map(
        (icon) => `
          <button
            type="button"
            class="icon-dropdown-option"
            data-icon-select="${escapeHtml(entityId)}"
            data-icon-value="${escapeHtml(icon)}"
          >
            <ha-icon icon="${escapeHtml(icon)}"></ha-icon>
            <span>${escapeHtml(icon)}</span>
          </button>
        `
      )
      .join("");
  }

  _selectedCustomEntities() {
    return normalizeCustomEntities(this._config?.custom_entities);
  }

  _editorEntityIcon(entityId) {
    const customIcon = String(this._config?.custom_entity_icons?.[entityId] || "").trim();
    if (customIcon) return this._normalizeIconInputValue(customIcon);
    const stateObj = this._hass?.states?.[entityId];
    const icon = String(stateObj?.attributes?.icon || "").trim();
    if (icon) return icon;
    const domain = String(entityId || "").split(".")[0] || "";
    const map = {
      script: "mdi:script-text-outline",
      scene: "mdi:palette-outline",
      light: "mdi:lightbulb",
      switch: "mdi:toggle-switch-outline",
      button: "mdi:gesture-tap-button",
      cover: "mdi:garage-variant",
      lock: "mdi:lock",
      fan: "mdi:fan",
      climate: "mdi:air-conditioner",
      media_player: "mdi:cast",
      input_boolean: "mdi:toggle-switch",
      automation: "mdi:robot",
    };
    return map[domain] || "mdi:flash";
  }

  _renderExternalEntitiesSearchResults() {
    const selected = new Set(this._selectedCustomEntities());
    const search = String(this._customEntitiesSearch || "").trim().toLowerCase();

    const results = this._allEntityIds().filter((entityId) => {
      if (selected.has(entityId)) return false;
      const name = String(this._hass?.states?.[entityId]?.attributes?.friendly_name || entityId);
      return (
        !search ||
        name.toLowerCase().includes(search) ||
        entityId.toLowerCase().includes(search)
      );
    });

    if (!results.length) {
      return `<li class="entity-empty">${this._t("external_actions_empty")}</li>`;
    }

    return results.slice(0, 40).map((entityId) => {
      const st = this._hass?.states?.[entityId];
      const name = st?.attributes?.friendly_name || entityId;
      const icon = this._editorEntityIcon(entityId);
      return `
        <li class="entity-item compact" data-entity-id="${escapeHtml(entityId)}">
          <div class="entity-left">
            <ha-icon class="entity-item-icon" icon="${escapeHtml(icon)}"></ha-icon>
            <div class="entity-details">
              <span class="entity-name">${escapeHtml(name)}</span>
              <span class="entity-id">${escapeHtml(entityId)}</span>
            </div>
          </div>
          <button type="button" class="entity-add-btn compact" data-add-custom-entity="${escapeHtml(entityId)}">+</button>
        </li>
      `;
    }).join("");
  }

  _renderExternalEntitiesSelected() {
    const selected = this._selectedCustomEntities();
    if (!selected.length) {
      return `<li class="entity-empty">${this._t("external_actions_empty")}</li>`;
    }

    return selected.map((entityId) => {
      const st = this._hass?.states?.[entityId];
      const name = st?.attributes?.friendly_name || entityId;
      const customName = String(this._config?.custom_entity_names?.[entityId] || "").trim();
      const icon = this._editorEntityIcon(entityId);
      const label = customName || name;
      return `
        <li class="entity-item selected compact" data-selected-entity="${escapeHtml(entityId)}">
          <div class="entity-left">
            <ha-icon class="entity-item-icon" icon="${escapeHtml(icon)}"></ha-icon>
            <div class="entity-details">
              <span class="entity-name">${escapeHtml(label)}</span>
              <span class="entity-id">${escapeHtml(entityId)}</span>
            </div>
          </div>
          <button type="button" class="entity-remove-btn compact" data-remove-custom-entity="${escapeHtml(entityId)}">&times;</button>
        </li>
      `;
    }).join("");
  }

  _setCustomEntities(entities) {
    this._config.custom_entities = normalizeCustomEntities(entities);
    this._config.custom_entity_names = pruneCustomEntityNames(
      this._config.custom_entity_names,
      this._config.custom_entities
    );
    this._config.custom_entity_icons = pruneCustomEntityIcons(
      this._config.custom_entity_icons,
      this._config.custom_entities
    );
    this._emitChange({
      custom_entities: this._config.custom_entities,
      custom_entity_names: this._config.custom_entity_names,
      custom_entity_icons: this._config.custom_entity_icons,
    });
  }

  _addCustomEntity(entityId) {
    const entities = this._selectedCustomEntities();
    if (!entityId || entities.includes(entityId)) return;
    entities.push(entityId);
    this._setCustomEntities(entities);
    this._render();
  }

  _removeCustomEntity(entityId) {
    const entities = this._selectedCustomEntities().filter((id) => id !== entityId);
    this._setCustomEntities(entities);
    this._render();
  }

  _refreshExternalEntitiesResultsInPlace() {
    if (!this.shadowRoot) return;
    const list = this.shadowRoot.querySelector(".entity-results");
    if (!list) return;
    const prevScroll = list.scrollTop;
    list.innerHTML = this._renderExternalEntitiesSearchResults();
    list.scrollTop = prevScroll;
    this.shadowRoot.querySelectorAll("[data-add-custom-entity]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const entityId = btn.getAttribute("data-add-custom-entity");
        if (!entityId) return;
        this._addCustomEntity(entityId);
      });
    });
  }

  _setCustomEntityIcon(entityId, iconValue) {
    const entity = String(entityId || "").trim();
    if (!entity) return;
    const current = normalizeCustomEntityIcons(this._config.custom_entity_icons);
    const icon = this._normalizeIconInputValue(iconValue);
    if (icon) current[entity] = icon;
    else delete current[entity];
    const next = pruneCustomEntityIcons(current, this._config.custom_entities);
    this._config.custom_entity_icons = next;
    this._emitChange({ custom_entity_icons: next });
  }

  _setCustomEntityName(entityId, nameValue) {
    const entity = String(entityId || "").trim();
    if (!entity) return;
    const current = normalizeCustomEntityNames(this._config.custom_entity_names);
    const name = String(nameValue || "").trim();
    if (name) current[entity] = name;
    else delete current[entity];
    const next = pruneCustomEntityNames(current, this._config.custom_entities);
    this._config.custom_entity_names = next;
    this._emitChange({ custom_entity_names: next });
  }

  _renderExternalEntityIconRows() {
    const selected = this._selectedCustomEntities();
    if (!selected.length) return "";
    return selected
      .map((entityId) => {
        const stateObj = this._hass?.states?.[entityId];
        const defaultLabel = stateObj?.attributes?.friendly_name || entityId;
        const customName = String(this._config?.custom_entity_names?.[entityId] || "").trim();
        const customIcon = String(this._config?.custom_entity_icons?.[entityId] || "").trim();
        const previewIcon = this._normalizeIconInputValue(customIcon) || this._editorEntityIcon(entityId);
        return `
          <div class="entity-icon-row">
            <span class="entity-icon-label">${escapeHtml(defaultLabel)}</span>
            <div class="entity-icon-inputs compact">
              <input
                type="text"
                class="entity-name-input-compact"
                data-custom-name-input="${escapeHtml(entityId)}"
                value="${escapeHtml(customName)}"
                placeholder="${this._t("settings_external_name_placeholder")}"
              />
              <div class="entity-icon-edit-row">
                <ha-icon icon="${escapeHtml(previewIcon)}" data-custom-icon-preview="${escapeHtml(entityId)}"></ha-icon>
                <div class="icon-combobox" data-icon-combobox="${escapeHtml(entityId)}">
                  <div class="icon-combobox-input">
                    <input
                      type="text"
                      data-custom-icon-input="${escapeHtml(entityId)}"
                      value="${escapeHtml(customIcon)}"
                      placeholder="${this._t("settings_external_icon_placeholder")}"
                      autocomplete="off"
                    />
                    <button type="button" class="icon-dropdown-toggle" data-icon-dropdown-toggle="${escapeHtml(entityId)}">
                      <ha-icon icon="mdi:chevron-down"></ha-icon>
                    </button>
                  </div>
                  <div class="icon-dropdown" data-icon-dropdown="${escapeHtml(entityId)}">
                    ${this._renderIconDropdownOptions(entityId, customIcon)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  _emitChange(partial) {
    this._config = { ...this._config, ...partial };
    this._config.custom_entities = normalizeCustomEntities(this._config.custom_entities);
    this._config.custom_entity_names = pruneCustomEntityNames(
      this._config.custom_entity_names,
      this._config.custom_entities
    );
    this._config.custom_entity_icons = pruneCustomEntityIcons(
      this._config.custom_entity_icons,
      this._config.custom_entities
    );
    fireConfigChanged(this, this._config);
  }

  _populatePrefixCandidates() {
    if (!this._hass || !this.shadowRoot) return;
    if (!this._hass.states || typeof this._hass.states !== "object") return;
    const list = this.shadowRoot.getElementById("prefix_suggestions");
    if (!list) return;
    const prefixes = new Set();
    for (const eid of Object.keys(this._hass.states)) {
      const match = eid.match(/^sensor\.([a-z0-9_]+)_(battery_level|elec_percent)$/);
      if (match) prefixes.add(match[1]);
    }
    list.innerHTML = "";
    [...prefixes].sort().forEach((prefix) => {
      const option = document.createElement("option");
      option.value = prefix;
      list.appendChild(option);
    });
  }

  _render() {
    if (!this.shadowRoot) return;
    if (!this._config) {
      this._config = { ...DEFAULT_CONFIG, entities: {} };
    }
    if (typeof this._externalSectionExpanded !== "boolean") this._externalSectionExpanded = false;
    const externalEnabled = normalizeExternalEntitiesEnabled(this._config.show_external_entities);
    const selectedExternalCount = this._selectedCustomEntities().length;

    this.shadowRoot.innerHTML = `
      <div class="editor-shell">
        <div class="editor-glow"></div>
        <div class="editor">
          <div class="head">
            <h3>${this._t("settings_title")}</h3>
            <p>${this._t("settings_hint")}</p>
          </div>

          <section class="group">
            <div class="group-title">${this._t("settings_vehicle_profile")}</div>
            <div class="profiles">${this._renderProfileOptions()}</div>
          </section>

          <section class="group">
            <div class="field">
              <label>${this._t("settings_card_title")}</label>
              <input id="title" type="text" value="${this._config.title || ""}" placeholder="BYD ATTO 3" />
            </div>
            <div class="field">
              <label>${this._t("settings_title_font_size")}</label>
              <input
                id="title_font_size"
                type="number"
                min="24"
                max="72"
                step="1"
                value="${this._normalizeTitleFontSize(this._config.title_font_size)}"
              />
              <small>${this._t("settings_title_font_size_hint")}</small>
            </div>
            <div class="field">
              <label>${this._t("settings_prefix")}</label>
              <input id="prefix" type="text" list="prefix_suggestions" value="${this._config.entity_prefix || ""}" placeholder="byd_atto_3" />
              <datalist id="prefix_suggestions"></datalist>
              <small>${this._t("settings_prefix_help")}</small>
            </div>
          </section>

          <section class="group">
            <div class="group-title">${this._t("settings_language")}</div>
            <div class="lang-grid">${this._renderLanguageOptions()}</div>
          </section>

          <section class="group">
            <div class="field">
              <label>${this._t("settings_image_url")}</label>
              <input id="image_url" type="text" value="${this._config.image_url || ""}" placeholder="/local/bydatoo3.png" />
            </div>
            <div class="field">
              <label>${this._t("settings_image_base_path")}</label>
              <input id="image_base_path" type="text" value="${this._config.image_base_path || ""}" placeholder="${DEFAULT_IMAGE_BASE_PATH}" />
            </div>
            <div class="field">
              <label>${this._t("settings_i18n_base_path")}</label>
              <input id="i18n_base_path" type="text" value="${this._config.i18n_base_path || ""}" placeholder="${DEFAULT_I18N_BASE_PATH}" />
            </div>
            <div class="field">
              <label>${this._t("settings_refresh_interval")}</label>
              <input
                id="refresh_interval_seconds"
                type="number"
                min="8"
                max="120"
                step="1"
                value="${this._normalizeRefreshInterval(this._config.refresh_interval_seconds)}"
              />
              <small>${this._t("settings_refresh_interval_hint")}</small>
            </div>
            <div class="field">
              <label>${this._t("settings_tire_pressure_unit")}</label>
              <select id="tire_pressure_unit">
                <option value="psi" ${normalizeTirePressureUnit(this._config.tire_pressure_unit) === "psi" ? "selected" : ""}>${this._t("tire_unit_psi")}</option>
                <option value="kpa" ${normalizeTirePressureUnit(this._config.tire_pressure_unit) === "kpa" ? "selected" : ""}>${this._t("tire_unit_kpa")}</option>
              </select>
            </div>
          </section>

          <section class="group">
            <div class="group-title">${this._t("settings_external_actions")}</div>
            <div class="external-top-row">
              <label class="toggle-chip compact"><input id="show_external_entities" type="checkbox" ${externalEnabled ? "checked" : ""}/> <span>${this._t("settings_show_external_entities")}</span></label>
              <details id="external_config_details" class="external-config-details" ${this._externalSectionExpanded ? "open" : ""}>
                <summary class="external-collapse-btn" data-external-summary>
                  <span data-external-toggle-label>${this._externalSectionExpanded ? this._t("settings_external_config_close") : this._t("settings_external_config_open")}</span>
                </summary>
              </details>
            </div>
            <div class="external-summary">${this._t("settings_external_selected_count")}: ${selectedExternalCount}</div>
            ${
              this._externalSectionExpanded
                ? `
              <div class="field">
                <label>${this._t("settings_external_entities")}</label>
                ${
                  externalEnabled
                    ? ""
                    : `<small>${this._t("settings_show_external_entities")} (${this._t("state_off")})</small>`
                }
                <input
                  id="custom_entities_search"
                  type="search"
                  value="${escapeHtml(this._customEntitiesSearch || "")}" 
                  placeholder="${this._t("settings_external_entities_search_placeholder")}" 
                />
                <small>${this._t("settings_external_entities_hint")}</small>
                <div class="external-entities-body compact">
                  <div class="external-entities-pane">
                    <div class="external-entities-pane-title">${this._t("settings_external_entities_available")}</div>
                    <ul class="entity-results">
                      ${this._renderExternalEntitiesSearchResults()}
                    </ul>
                  </div>
                  <div class="external-entities-pane">
                    <div class="external-entities-pane-title">${this._t("settings_external_entities_selected")}</div>
                    <ul class="entity-selected">
                      ${this._renderExternalEntitiesSelected()}
                    </ul>
                  </div>
                </div>
                <div class="entity-icons-config compact">
                  <div class="entity-icons-title">${this._t("settings_external_icons")}</div>
                  <small>${this._t("settings_external_icons_hint")}</small>
                  <div class="entity-icons-grid">
                    ${this._renderExternalEntityIconRows()}
                  </div>
                </div>
              </div>
            `
                : ""
            }
          </section>

          <section class="group">
            <div class="group-title">${this._t("settings_categories")}</div>
            <div class="toggles">
              <label class="toggle-chip"><input id="show_climate" type="checkbox" ${this._config.show_climate ? "checked" : ""}/> <span>${this._t("settings_show_climate")}</span></label>
              <div class="seat-mode-picker">
                <div class="seat-mode-label">${this._t("settings_seat_mode")}</div>
                <div class="seat-mode-grid">${this._renderSeatModeOptions()}</div>
              </div>
              <label class="toggle-chip"><input id="show_vehicle" type="checkbox" ${this._config.show_vehicle ? "checked" : ""}/> <span>${this._t("settings_show_vehicle")}</span></label>
              <label class="toggle-chip"><input id="show_tires" type="checkbox" ${this._config.show_tires ? "checked" : ""}/> <span>${this._t("settings_show_tires")}</span></label>
              <label class="toggle-chip"><input id="show_actions" type="checkbox" ${this._config.show_actions ? "checked" : ""}/> <span>${this._t("settings_show_actions")}</span></label>
              <label class="toggle-chip"><input id="show_location" type="checkbox" ${this._config.show_location ? "checked" : ""}/> <span>${this._t("settings_show_location")}</span></label>
              <label class="toggle-chip"><input id="require_unlock_pin" type="checkbox" ${normalizeUnlockPinEnabled(this._config.require_unlock_pin) ? "checked" : ""}/> <span>${this._t("settings_require_unlock_pin")}</span></label>
              <div class="field">
                <label>${this._t("settings_unlock_pin_code")}</label>
                <input
                  id="unlock_pin_code"
                  type="password"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  maxlength="8"
                  value="${escapeHtml(normalizeUnlockPinCode(this._config.unlock_pin_code))}"
                  placeholder="1234"
                />
                <small>${this._t("settings_unlock_pin_hint")}</small>
              </div>
            </div>
          </section>

          <section class="group">
            <div class="group-title">${this._t("settings_category_order")}</div>
            <div class="order-hint">${this._t("settings_category_order_hint")}</div>
            <div class="category-order-list">
              ${this._renderCategoryOrderOptions()}
            </div>
          </section>
        </div>
      </div>
      <style>
        .editor-shell {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(130, 163, 196, .22);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 16px 46px rgba(0,0,0,.35);
          background: radial-gradient(circle at 20% 0%, rgba(65,97,130,.35), rgba(13,18,25,.92) 62%, rgba(8,12,18,.96));
        }
        .editor-glow {
          position: absolute;
          inset: -20% -10% auto auto;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0,188,255,.17), transparent 68%);
          pointer-events: none;
        }
        .editor {
          position: relative;
          z-index: 1;
          font-family: "Segoe UI", "Arial", sans-serif;
          display: grid;
          gap: 12px;
          padding: 14px;
          color: #eaf2fa;
        }
        .head {
          border-radius: 16px;
          padding: 12px 13px;
          background: linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.03));
          border: 1px solid rgba(255,255,255,.11);
        }
        h3 {
          margin: 0;
          font-size: 19px;
          font-weight: 800;
          letter-spacing: .2px;
        }
        p {
          margin: 6px 0 0;
          color: rgba(231,241,250,.73);
          font-size: 13px;
        }
        .group {
          border-radius: 16px;
          padding: 12px;
          background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
          border: 1px solid rgba(255,255,255,.11);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.1);
          display: grid;
          gap: 10px;
        }
        .group-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: rgba(207,225,242,.74);
          font-weight: 800;
        }
        .field {
          display: grid;
          gap: 7px;
        }
        label {
          font-size: 13px;
          font-weight: 700;
          color: #f4f8fc;
        }
        input[type="text"],
        input[type="number"],
        input[type="search"],
        select {
          border: 1px solid rgba(157,190,220,.18);
          background: linear-gradient(180deg, rgba(17,23,33,.72), rgba(13,18,27,.82));
          border-radius: 14px;
          min-height: 46px;
          padding: 0 14px;
          color: #e8f2fb;
          font-size: 16px;
          transition: border-color .2s ease, box-shadow .2s ease, transform .1s ease;
        }
        input[type="text"]:focus,
        input[type="number"]:focus,
        input[type="search"]:focus,
        select:focus {
          outline: none;
          border-color: rgba(0,184,255,.75);
          box-shadow: 0 0 0 2px rgba(0,184,255,.22), 0 10px 24px rgba(0,184,255,.12);
        }
        .external-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }
        .external-summary {
          font-size: 12px;
          color: rgba(207,225,242,.8);
          font-weight: 700;
        }
        .external-config-details {
          margin: 0;
        }
        .external-config-details summary {
          list-style: none;
        }
        .external-config-details summary::-webkit-details-marker {
          display: none;
        }
        .external-collapse-btn {
          border: 1px solid rgba(120, 196, 255, .35);
          background: linear-gradient(180deg, rgba(0,184,255,.2), rgba(0,184,255,.07));
          color: #dff2ff;
          border-radius: 11px;
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          user-select: none;
          display: inline-flex;
          align-items: center;
          transition: transform .15s ease, filter .15s ease, box-shadow .2s ease;
        }
        .external-collapse-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
          box-shadow: 0 8px 16px rgba(0, 184, 255, .18);
        }
        .toggle-chip.compact {
          padding: 8px 10px;
          min-height: 38px;
        }
        .toggle-chip.compact span {
          font-size: 12px;
        }
        .external-entities-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 10px;
        }
        .external-entities-body.compact {
          gap: 8px;
        }
        .external-entities-pane {
          display: grid;
          gap: 8px;
          min-height: 100px;
        }
        .external-entities-pane-title {
          font-size: 12px;
          font-weight: 700;
          color: rgba(207,225,242,.8);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .entity-results,
        .entity-selected {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 8px;
          max-height: 210px;
          overflow: auto;
        }
        .entity-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          align-items: center;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(157,190,220,.18);
          background: linear-gradient(180deg, rgba(20,29,40,.86), rgba(15,21,30,.9));
        }
        .entity-item.compact {
          padding: 8px 9px;
          gap: 8px;
        }
        .entity-item.selected {
          border-color: rgba(139,226,121,.35);
        }
        .entity-left {
          display: grid;
          grid-template-columns: 20px minmax(0, 1fr);
          gap: 8px;
          align-items: start;
          min-width: 0;
        }
        .entity-item-icon {
          width: 18px;
          height: 18px;
          --mdc-icon-size: 18px;
          color: #bde2ff;
          margin-top: 1px;
        }
        .entity-details {
          display: grid;
          gap: 3px;
          min-width: 0;
        }
        .entity-name {
          font-size: 12px;
          font-weight: 700;
          color: #f3fbff;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .entity-id {
          font-size: 11px;
          color: rgba(207,225,242,.68);
          word-break: break-all;
          line-height: 1.15;
        }
        .entity-add-btn,
        .entity-remove-btn {
          min-width: 80px;
          border: none;
          border-radius: 10px;
          background: rgba(0,184,255,.16);
          color: #d7f1ff;
          padding: 8px 10px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          transition: transform .15s ease, box-shadow .2s ease, background .2s ease;
        }
        .entity-add-btn.compact,
        .entity-remove-btn.compact {
          min-width: 30px;
          width: 30px;
          height: 30px;
          padding: 0;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          line-height: 1;
        }
        .entity-remove-btn {
          background: rgba(255,90,90,.18);
        }
        .entity-add-btn:hover,
        .entity-remove-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 3px 12px rgba(0,0,0,.2);
        }
        .entity-empty {
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,.04);
          color: rgba(225,240,255,.82);
          font-size: 13px;
          text-align: center;
        }
        .entity-icons-config {
          margin-top: 10px;
          display: grid;
          gap: 8px;
        }
        .entity-icons-config.compact {
          margin-top: 6px;
          gap: 6px;
        }
        .entity-icons-title {
          font-size: 12px;
          font-weight: 700;
          color: rgba(207,225,242,.8);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .entity-icons-grid {
          display: grid;
          gap: 6px;
        }
        .entity-icon-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 340px);
          gap: 7px;
          align-items: center;
          padding: 7px 9px;
          border-radius: 10px;
          border: 1px solid rgba(157,190,220,.18);
          background: linear-gradient(180deg, rgba(20,29,40,.86), rgba(15,21,30,.9));
        }
        .entity-icon-label {
          font-size: 13px;
          font-weight: 700;
          color: #f3fbff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .entity-icon-inputs {
          display: grid;
          gap: 5px;
        }
        .entity-icon-inputs.compact {
          grid-template-columns: minmax(0, 1fr);
          align-items: center;
        }
        .entity-name-input-compact,
        .icon-combobox-input input[type="text"] {
          min-height: 34px;
          font-size: 12px;
          padding: 0 9px;
        }
        .entity-inline-label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(207,225,242,.8);
          margin: 0;
        }
        .entity-icon-edit-row {
          display: grid;
          grid-template-columns: 24px minmax(0, 1fr);
          align-items: center;
          gap: 6px;
        }
        .entity-icon-edit-row ha-icon {
          width: 18px;
          height: 18px;
          --mdc-icon-size: 18px;
          color: #bde2ff;
          justify-self: center;
        }
        .icon-combobox {
          position: relative;
        }
        .icon-combobox-input {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 30px;
          gap: 6px;
          align-items: center;
        }
        .icon-dropdown-toggle {
          width: 30px;
          height: 30px;
          border: 1px solid rgba(157,190,220,.22);
          border-radius: 8px;
          background: linear-gradient(180deg, rgba(20,29,40,.9), rgba(12,18,28,.94));
          color: #cbe6ff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
        }
        .icon-dropdown-toggle ha-icon {
          --mdc-icon-size: 16px;
        }
        .icon-dropdown {
          position: absolute;
          top: calc(100% + 5px);
          left: 0;
          right: 0;
          z-index: 6;
          display: none;
          gap: 4px;
          max-height: 170px;
          overflow: auto;
          padding: 6px;
          border-radius: 10px;
          border: 1px solid rgba(157,190,220,.24);
          background: linear-gradient(180deg, rgba(13,19,30,.98), rgba(10,15,24,.98));
          box-shadow: 0 14px 26px rgba(0,0,0,.42);
        }
        .icon-combobox.open .icon-dropdown {
          display: grid;
        }
        .icon-dropdown-option {
          border: 1px solid rgba(157,190,220,.18);
          border-radius: 8px;
          background: rgba(255,255,255,.03);
          color: #e8f2fb;
          min-height: 30px;
          padding: 4px 7px;
          display: grid;
          grid-template-columns: 16px minmax(0, 1fr);
          gap: 7px;
          align-items: center;
          text-align: left;
          cursor: pointer;
        }
        .icon-dropdown-option ha-icon {
          --mdc-icon-size: 16px;
          color: #bde2ff;
        }
        .icon-dropdown-option span {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .icon-dropdown-empty {
          font-size: 12px;
          color: rgba(207,225,242,.8);
          text-align: center;
          padding: 8px 6px;
        }
        small {
          color: rgba(207,225,242,.7);
          font-size: 11px;
        }
        .profiles {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 9px;
        }
        .profile {
          border: 1px solid rgba(157,190,220,.18);
          background: linear-gradient(180deg, rgba(20,29,40,.86), rgba(15,21,30,.9));
          border-radius: 14px;
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          text-align: left;
          color: #eff7ff;
          transition: transform .15s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .profile:hover { transform: translateY(-1px); }
        .profile img {
          width: 100%;
          height: 98px;
          object-fit: cover;
          display: block;
          opacity: .95;
        }
        .profile span {
          display: block;
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 700;
        }
        .profile.active {
          border-color: #23bcff;
          box-shadow: 0 0 0 1px rgba(35,188,255,.65) inset, 0 12px 26px rgba(35,188,255,.16);
        }
        .lang-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .lang-btn {
          border: 1px solid rgba(157,190,220,.18);
          background: linear-gradient(180deg, rgba(20,29,40,.86), rgba(15,21,30,.9));
          border-radius: 14px;
          min-height: 46px;
          color: #e8f3fc;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px 12px;
          cursor: pointer;
          transition: transform .15s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .lang-btn:hover { transform: translateY(-1px); }
        .lang-btn .flag {
          font-size: 19px;
          line-height: 1;
        }
        .lang-btn .lang-label {
          font-size: 13px;
          font-weight: 700;
        }
        .lang-btn.active {
          border-color: #23bcff;
          box-shadow: 0 0 0 1px rgba(35,188,255,.65) inset, 0 12px 24px rgba(35,188,255,.14);
          background: linear-gradient(180deg, rgba(0,184,255,.19), rgba(0,184,255,.04));
        }
        .toggles {
          display: grid;
          gap: 8px;
        }
        .order-hint {
          font-size: 12px;
          color: rgba(207,225,242,.72);
        }
        .category-order-list {
          display: grid;
          gap: 8px;
        }
        .category-order-item {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(157,190,220,.22);
          background:
            radial-gradient(circle at 18% 0%, rgba(102,180,255,.16), transparent 44%),
            linear-gradient(180deg, rgba(31,46,66,.86), rgba(12,18,28,.9));
          cursor: grab;
          user-select: none;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.15),
            inset 0 -10px 16px rgba(0,0,0,.42),
            0 8px 18px rgba(0,0,0,.25);
          transition: border-color .2s ease, background .2s ease, transform .14s ease, box-shadow .2s ease, filter .2s ease;
        }
        .category-order-item::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,0) 42%);
          opacity: .5;
        }
        .category-order-item::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: radial-gradient(circle at 88% 100%, rgba(0,170,255,.2), transparent 38%);
          opacity: .42;
        }
        .category-order-item:hover {
          border-color: rgba(100,201,255,.62);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.2),
            inset 0 -12px 18px rgba(0,0,0,.5),
            0 12px 24px rgba(22,112,176,.24);
          filter: saturate(1.06);
        }
        .category-order-item.drag-over {
          border-color: rgba(35,188,255,.86);
          box-shadow:
            0 0 0 1px rgba(35,188,255,.42) inset,
            0 10px 22px rgba(35,188,255,.22),
            inset 0 1px 0 rgba(255,255,255,.2);
        }
        .category-order-item.dragging {
          opacity: .8;
          transform: scale(.987);
          cursor: grabbing;
        }
        .category-order-main {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          font-weight: 800;
          color: #eaf4ff;
        }
        .category-order-main ha-icon {
          --mdc-icon-size: 18px;
          color: #96cfff;
        }
        .drag-handle {
          --mdc-icon-size: 18px;
          color: rgba(203,223,242,.76);
          pointer-events: none;
        }
        .seat-mode-picker {
          border: 1px solid rgba(157,190,220,.22);
          border-radius: 12px;
          padding: 10px 11px;
          background:
            radial-gradient(circle at 22% 0%, rgba(99,170,255,.16), transparent 42%),
            linear-gradient(180deg, rgba(31,46,66,.86), rgba(12,18,28,.9));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.15),
            inset 0 -10px 16px rgba(0,0,0,.42),
            0 8px 18px rgba(0,0,0,.24);
        }
        .seat-mode-label {
          font-size: 12px;
          font-weight: 800;
          color: rgba(226,239,252,.85);
          margin-bottom: 8px;
        }
        .seat-mode-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }
        .seat-mode-btn {
          border: 1px solid rgba(157,190,220,.2);
          background: linear-gradient(180deg, rgba(20,29,40,.86), rgba(15,21,30,.9));
          border-radius: 12px;
          min-height: 44px;
          color: #e8f3fc;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: transform .15s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .seat-mode-btn:hover { transform: translateY(-1px); }
        .seat-mode-btn ha-icon { --mdc-icon-size: 18px; }
        .seat-mode-btn span { font-size: 13px; font-weight: 700; }
        .seat-mode-btn.active {
          border-color: #23bcff;
          box-shadow: 0 0 0 1px rgba(35,188,255,.65) inset, 0 12px 24px rgba(35,188,255,.14);
          background: linear-gradient(180deg, rgba(0,184,255,.19), rgba(0,184,255,.04));
        }
        .toggle-chip {
          position: relative;
          overflow: hidden;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 11px;
          border-radius: 12px;
          border: 1px solid rgba(157,190,220,.22);
          background:
            radial-gradient(circle at 22% 0%, rgba(99,170,255,.16), transparent 42%),
            linear-gradient(180deg, rgba(31,46,66,.86), rgba(12,18,28,.9));
          cursor: pointer;
          font-weight: 700;
          color: #e8f2fb;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.15),
            inset 0 -10px 16px rgba(0,0,0,.42),
            0 8px 18px rgba(0,0,0,.24);
          transition: border-color .2s ease, background .2s ease, box-shadow .2s ease, transform .14s ease, filter .2s ease;
        }
        .toggle-chip::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,0) 42%);
          opacity: .48;
        }
        .toggle-chip:hover {
          border-color: rgba(100,201,255,.62);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.2),
            inset 0 -12px 18px rgba(0,0,0,.5),
            0 12px 24px rgba(22,112,176,.24);
          transform: translateY(-1px);
          filter: saturate(1.05);
        }
        .toggle-chip input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #2abfff;
          cursor: pointer;
          filter: drop-shadow(0 0 8px rgba(63,189,255,.35));
          z-index: 1;
        }
        .toggle-chip input[type="checkbox"] + span {
          z-index: 1;
          letter-spacing: .1px;
          text-shadow: 0 1px 8px rgba(0,0,0,.34);
        }
        .toggle-chip input[type="checkbox"]:checked + span {
          color: #f3fbff;
          text-shadow: 0 0 12px rgba(97,210,255,.45);
        }
        @media (max-width: 540px) {
          .editor {
            padding: 11px;
            gap: 10px;
          }
          .external-entities-body {
            grid-template-columns: 1fr;
          }
          .entity-icon-row {
            grid-template-columns: 1fr;
          }
          .entity-icon-edit-row {
            grid-template-columns: 30px minmax(0, 1fr);
          }
          .profiles,
          .lang-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    `;

    const onChange = () =>
      this._emitChange({
        seat_passenger_mode: normalizeSeatPassengerMode(
          this._config?.seat_passenger_mode,
          Boolean(this._config?.show_seat_cooling)
        ),
        refresh_interval_seconds: this._normalizeRefreshInterval(
          this.shadowRoot.getElementById("refresh_interval_seconds").value
        ),
        title: this.shadowRoot.getElementById("title").value.trim(),
        title_font_size: this._normalizeTitleFontSize(this.shadowRoot.getElementById("title_font_size").value),
        entity_prefix: this.shadowRoot.getElementById("prefix").value.trim(),
        language: this._config.language || "he",
        image_url: this.shadowRoot.getElementById("image_url").value.trim(),
        image_base_path: this.shadowRoot.getElementById("image_base_path").value.trim() || DEFAULT_IMAGE_BASE_PATH,
        i18n_base_path: this.shadowRoot.getElementById("i18n_base_path").value.trim() || DEFAULT_I18N_BASE_PATH,
        custom_entities: this._selectedExternalEntitiesFromEditor(),
        custom_entity_names: this._customEntityNamesFromEditor(),
        custom_entity_icons: this._customEntityIconsFromEditor(),
        tire_pressure_unit: normalizeTirePressureUnit(this.shadowRoot.getElementById("tire_pressure_unit").value),
        show_climate: this.shadowRoot.getElementById("show_climate").checked,
        show_seat_cooling:
          normalizeSeatPassengerMode(this._config?.seat_passenger_mode, Boolean(this._config?.show_seat_cooling)) ===
          "cool",
        show_vehicle: this.shadowRoot.getElementById("show_vehicle").checked,
        show_tires: this.shadowRoot.getElementById("show_tires").checked,
        show_actions: this.shadowRoot.getElementById("show_actions").checked,
        show_location: this.shadowRoot.getElementById("show_location").checked,
        require_unlock_pin: normalizeUnlockPinEnabled(this.shadowRoot.getElementById("require_unlock_pin")?.checked),
        unlock_pin_code: normalizeUnlockPinCode(this.shadowRoot.getElementById("unlock_pin_code")?.value),
        show_external_entities: normalizeExternalEntitiesEnabled(
          this.shadowRoot.getElementById("show_external_entities")?.checked
        ),
      });

    const externalDetails = this.shadowRoot.getElementById("external_config_details");
    if (externalDetails) {
      externalDetails.addEventListener("toggle", () => {
        const expanded = Boolean(externalDetails.open);
        if (expanded === this._externalSectionExpanded) return;
        this._externalSectionExpanded = expanded;
        this._render();
      });
    }

    const bindChange = (id) => {
      this.shadowRoot.getElementById(id)?.addEventListener("change", onChange);
    };

    bindChange("title");
    bindChange("title_font_size");
    bindChange("prefix");
    bindChange("image_url");
    bindChange("image_base_path");
    bindChange("i18n_base_path");
    bindChange("refresh_interval_seconds");
    bindChange("tire_pressure_unit");

    const entitiesSearch = this.shadowRoot.getElementById("custom_entities_search");
    if (entitiesSearch) {
      entitiesSearch.addEventListener("input", () => {
        this._customEntitiesSearch = entitiesSearch.value;
        this._refreshExternalEntitiesResultsInPlace();
      });
    }

    bindChange("show_external_entities");
    bindChange("show_climate");
    bindChange("show_vehicle");
    bindChange("show_tires");
    bindChange("show_actions");
    bindChange("show_location");
    bindChange("require_unlock_pin");
    bindChange("unlock_pin_code");

    this.shadowRoot.querySelectorAll("[data-add-custom-entity]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const entityId = btn.getAttribute("data-add-custom-entity");
        if (!entityId) return;
        this._addCustomEntity(entityId);
      });
    });

    this.shadowRoot.querySelectorAll("[data-remove-custom-entity]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const entityId = btn.getAttribute("data-remove-custom-entity");
        if (!entityId) return;
        this._removeCustomEntity(entityId);
      });
    });

    const findByDataAttr = (attr, value) =>
      [...this.shadowRoot.querySelectorAll(`[${attr}]`)].find((node) => node.getAttribute(attr) === value);
    const findAllByDataAttr = (attr, value) =>
      [...this.shadowRoot.querySelectorAll(`[${attr}]`)].filter((node) => node.getAttribute(attr) === value);
    const closeAllIconComboboxes = (exceptEntityId = "") => {
      this.shadowRoot.querySelectorAll("[data-icon-combobox]").forEach((node) => {
        const entityId = node.getAttribute("data-icon-combobox");
        if (exceptEntityId && entityId === exceptEntityId) return;
        node.classList.remove("open");
      });
    };
    const refreshIconDropdown = (entityId, queryValue) => {
      const dropdown = findByDataAttr("data-icon-dropdown", entityId);
      if (!dropdown) return;
      dropdown.innerHTML = this._renderIconDropdownOptions(entityId, queryValue);
      findAllByDataAttr("data-icon-select", entityId).forEach((btn) => {
        btn.addEventListener("mousedown", (ev) => ev.preventDefault());
        btn.addEventListener("click", () => {
          const iconValue = btn.getAttribute("data-icon-value") || "";
          const input = findByDataAttr("data-custom-icon-input", entityId);
          if (!input) return;
          input.value = iconValue;
          this._setCustomEntityIcon(entityId, iconValue);
          const preview = findByDataAttr("data-custom-icon-preview", entityId);
          if (preview) preview.setAttribute("icon", iconValue);
          const combobox = findByDataAttr("data-icon-combobox", entityId);
          combobox?.classList.remove("open");
        });
      });
    };

    this.shadowRoot.querySelectorAll("[data-custom-icon-input]").forEach((input) => {
      input.addEventListener("input", () => {
        const entityId = input.getAttribute("data-custom-icon-input");
        if (!entityId) return;
        const preview = findByDataAttr("data-custom-icon-preview", entityId);
        if (preview) {
          const icon = this._normalizeIconInputValue(input.value) || this._editorEntityIcon(entityId);
          preview.setAttribute("icon", icon);
        }
        closeAllIconComboboxes(entityId);
        const combobox = findByDataAttr("data-icon-combobox", entityId);
        if (combobox) combobox.classList.add("open");
        refreshIconDropdown(entityId, input.value);
      });
      input.addEventListener("focus", () => {
        const entityId = input.getAttribute("data-custom-icon-input");
        if (!entityId) return;
        closeAllIconComboboxes(entityId);
        const combobox = findByDataAttr("data-icon-combobox", entityId);
        if (combobox) combobox.classList.add("open");
        refreshIconDropdown(entityId, input.value);
      });
      input.addEventListener("blur", () => {
        const entityId = input.getAttribute("data-custom-icon-input");
        if (!entityId) return;
        setTimeout(() => {
          const combobox = findByDataAttr("data-icon-combobox", entityId);
          combobox?.classList.remove("open");
        }, 120);
      });
      input.addEventListener("change", () => {
        const entityId = input.getAttribute("data-custom-icon-input");
        if (!entityId) return;
        this._setCustomEntityIcon(entityId, input.value);
      });
    });

    this.shadowRoot.querySelectorAll("[data-icon-dropdown-toggle]").forEach((btn) => {
      btn.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const entityId = btn.getAttribute("data-icon-dropdown-toggle");
        if (!entityId) return;
        const combobox = findByDataAttr("data-icon-combobox", entityId);
        if (!combobox) return;
        const willOpen = !combobox.classList.contains("open");
        closeAllIconComboboxes(entityId);
        if (!willOpen) {
          combobox.classList.remove("open");
          return;
        }
        combobox.classList.add("open");
        const input = findByDataAttr("data-custom-icon-input", entityId);
        refreshIconDropdown(entityId, input?.value || "");
      });
    });

    this.shadowRoot.querySelectorAll("[data-custom-name-input]").forEach((input) => {
      input.addEventListener("change", () => {
        const entityId = input.getAttribute("data-custom-name-input");
        if (!entityId) return;
        this._setCustomEntityName(entityId, input.value);
      });
    });

    this.shadowRoot.querySelectorAll(".profile").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.getAttribute("data-profile");
        if (!key) return;
        const defaults = PROFILE_DEFAULTS[key] || {};
        this._emitChange({
          vehicle_profile: key,
          title: defaults.title || this._config.title,
          entity_prefix: defaults.entity_prefix || this._config.entity_prefix,
        });
        this._render();
      });
    });

    this.shadowRoot.querySelectorAll(".lang-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const key = button.getAttribute("data-lang");
        if (!key) return;
        this._emitChange({ language: key });
        this._render();
      });
    });

    this.shadowRoot.querySelectorAll(".seat-mode-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.getAttribute("data-seat-mode");
        if (mode !== "heat" && mode !== "cool" && mode !== "both") return;
        this._emitChange({
          seat_passenger_mode: mode,
          show_seat_cooling: mode === "cool" || mode === "both",
        });
        this._render();
      });
    });

    this.shadowRoot.querySelectorAll(".profile img").forEach((img) => {
      img.addEventListener("error", () => {
        const fallback = img.getAttribute("data-fallback");
        if (fallback && img.getAttribute("src") !== fallback) {
          img.setAttribute("src", fallback);
        }
      });
    });

    this._bindCategoryOrderDnD();
  }
}

function fireLovelaceRebuild() {
  const dispatch = (target) => {
    if (!target || typeof target.dispatchEvent !== "function") return;
    target.dispatchEvent(new Event("ll-rebuild", { bubbles: true, composed: true }));
  };

  dispatch(document);
  dispatch(document.querySelector("home-assistant"));
}

function registerBydCard() {
  if (!customElements.get(CARD_TYPE)) {
    customElements.define(CARD_TYPE, Byd3DCard);
  }
  if (!customElements.get("byd-3d-card-editor")) {
    customElements.define("byd-3d-card-editor", Byd3DCardEditor);
  }

  window.customCards = window.customCards || [];
  if (!window.customCards.find((card) => card.type === CARD_TYPE)) {
    window.customCards.push({
      type: CARD_TYPE,
      name: CARD_NAME,
      preview: false,
      description: "Dynamic 3D BYD dashboard card with vehicle profiles.",
      documentationURL: "https://github.com/jkaberg/hass-byd-vehicle",
    });
  }

  // Lovelace edit-mode can occasionally miss the initial rebuild event for
  // freshly loaded custom cards. Triggering rebuild retries helps new-card flow.
  fireLovelaceRebuild();
  window.setTimeout(() => fireLovelaceRebuild(), 600);
  window.setTimeout(() => fireLovelaceRebuild(), 1800);
}

registerBydCard();
console.info(`%c ${CARD_NAME} %c ${CARD_VERSION} `, "color:#00e5ff;font-weight:700;", "color:#9fb9c8;");
