import { useLayoutEffect, useState } from 'react';

export const useTranslation = (locale: string) => {
  const [translation, setTranslation] = useState<any>({});
  useLayoutEffect(() => {
    import(`@/langs/${locale}.json`)
      .then((module) => module.default)
      .then((data) => setTranslation(data));
  }, [locale]);
  return translation;
};
