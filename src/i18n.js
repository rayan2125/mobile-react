import * as Localization from "react-native-localize";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";
import { I18n } from "i18n-js";

const i18n = new I18n();

// FIX: store method se translations set karo
i18n.store(en);
i18n.store(hi);
i18n.store(mr);

// Fallback enable karo — agar key missing ho toh en use kare
i18n.enableFallback = true;
i18n.defaultLocale = "en";

// Device language set karo
const locales = Localization.getLocales();
i18n.locale = locales[0]?.languageCode || "en";

export default i18n;