import { Language, languagesMap } from "../model";

export const getLanguageName = (language: Language) => {
  if (languagesMap[language]?.label) {
    return languagesMap[language].label;
  }
  return "N/A lang";
};
