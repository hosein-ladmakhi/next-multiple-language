import './global.css';

import { FC, PropsWithChildren } from 'react';
import { Figtree, Vazirmatn } from 'next/font/google';

const figtreeFont = Figtree({ subsets: ['latin'], variable: '--font-figtree' });
const vazirFont = Vazirmatn({ subsets: ['latin'], variable: '--font-vazir' });

interface RootLayoutProps extends PropsWithChildren {
  params: { locale: string };
}

const RootLayout: FC<RootLayoutProps> = ({ children, params }) => {
  return (
    <html
      lang={params.locale}
      className={`${figtreeFont.variable} ${vazirFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
