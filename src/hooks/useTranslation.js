
import { useState, useEffect } from "react";
import i18n from "../i18n";
import { langEmitter } from "../utils/lang";

const useTranslation = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const handler = () => forceUpdate(n => n + 1);
    langEmitter.on("langChanged", handler);
    return () => langEmitter.off("langChanged", handler);
  }, []);

  return { t: (key) => i18n.t(key), locale: i18n.locale };
};

export default useTranslation;