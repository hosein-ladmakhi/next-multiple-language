import { getTranslation } from '@/utils/getTranslation';
import { LanguageSwitcher } from './_components/LanguageSwitcher';

export default async function Home({ params }: { params: { locale: string } }) {
  const t = await getTranslation(params.locale);
  return (
    <>
      <p>{t.title}</p>
      <LanguageSwitcher locale={params.locale} />
    </>
  );
}
