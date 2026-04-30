import * as Localization from "react-native-localize";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";
import bn from "./locales/bn.json"
import { I18n } from "i18n-js";

const i18n = new I18n();


i18n.store(en);
i18n.store(hi);
i18n.store(mr);
i18n.store(bn);


i18n.enableFallback = true;
i18n.defaultLocale = "en";

// Device language set karo
const locales = Localization.getLocales();
i18n.locale = locales[0]?.languageCode || "en";

export default i18n;