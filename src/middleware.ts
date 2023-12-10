import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

import en from '@/langs/en.json';
import fa from '@/langs/fa.json';
import { translationStore } from './store/translationStore';

export const LocaleLanguageFile: Record<string, any> = {
  en,
  'en-us': en,
  fa,
  'fa-ir': fa,
};

const supportedLocales = ['en', 'fa', 'fa-ir', 'en-us'];
export const defaultLocale = 'fa';

const getLocaleFromPathname = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const localeInPathname = supportedLocales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  return !!localeInPathname;
};

const getLocaleFromHeader = (request: NextRequest) => {
  const transformedHeader: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    transformedHeader[key] = value;
  });
  const headerLanguages = new Negotiator({
    headers: transformedHeader,
  }).languages();
  return match(headerLanguages, supportedLocales, defaultLocale);
};

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  if (getLocaleFromPathname(request)) return;
  const locale = getLocaleFromHeader(request);
  const prefixPathname = pathname.startsWith('/') ? '' : '/';
  const transformedURL = '/' + locale + prefixPathname + pathname;
  return NextResponse.redirect(new URL(transformedURL, request.url));
};

export default middleware;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
