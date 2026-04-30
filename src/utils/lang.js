// src/utils/lang.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../i18n";

export const setAppLanguage = async (langCode) => {
  i18n.locale = langCode;
  await AsyncStorage.setItem("appLang", langCode);
};

export const loadAppLanguage = async () => {
  const lang = await AsyncStorage.getItem("appLang");
  if (lang) {
    i18n.locale = lang;
  }
};