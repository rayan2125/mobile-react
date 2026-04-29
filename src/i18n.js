import i18n from "i18n-js";
import * as Localization from "react-native-localize";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";

i18n.translations = { en, hi, mr };

i18n.fallbacks = true;

// default device language
const locales = Localization.getLocales();
i18n.locale = locales[0].languageCode || "en";

export default i18n;