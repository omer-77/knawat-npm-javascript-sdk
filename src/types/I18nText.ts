export type Lang = 'en' | 'ar' | 'tr';
export type I18nText = {
  [name in Lang]?: string;
};
