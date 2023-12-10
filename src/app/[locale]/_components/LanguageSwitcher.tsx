'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

export const LanguageSwitcher: FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslation(locale);
  console.log(t);
  const router = useRouter();
  const pathname = usePathname();
  const changeLanguage = (locale: string) => {
    const pathnames = pathname.split('/');
    pathnames[1] = locale;
    router.replace(pathnames.join('/'));
  };

  return (
    <div className="flex gap-5">
      <button onClick={() => changeLanguage('fa')}>{t?.btn?.change_fa}</button>
      <button onClick={() => changeLanguage('en')}>{t?.btn?.change_en}</button>
    </div>
  );
};
