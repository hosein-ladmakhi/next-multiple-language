export const getTranslation = (locale: string) => {
  return import(`@/langs/${locale}.json`).then((module) => module.default);
};
