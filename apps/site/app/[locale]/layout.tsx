import PlatformAnalytics from '#platform/analytics';
import { availableLocales, defaultLocale } from '@node-core/website-i18n';
import classNames from 'classnames';
import { locale as getRootLocale } from 'next/root-params';
import { NextIntlClientProvider } from 'next-intl';

import BaseLayout from '#site/layouts/Base';
import { IBM_PLEX_MONO, OPEN_SANS } from '#site/next.fonts';
import { ThemeProvider } from '#site/providers/themeProvider';

import type { FC, PropsWithChildren } from 'react';

import '#site/styles/index.css';

const fontClasses = classNames(IBM_PLEX_MONO.variable, OPEN_SANS.variable);

const RootLayout: FC<PropsWithChildren> = async ({ children }) => {
  const locale = await getRootLocale();

  const { langDir, hrefLang } =
    availableLocales.find(l => l.code === locale) || defaultLocale;

  return (
    <html
      className={fontClasses}
      dir={langDir}
      lang={hrefLang}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <ThemeProvider>
            <BaseLayout>{children}</BaseLayout>
          </ThemeProvider>
        </NextIntlClientProvider>

        <a
          rel="me"
          aria-hidden="true"
          className="hidden"
          href="https://social.lfx.dev/@nodejs"
        />

        <PlatformAnalytics />
      </body>
    </html>
  );
};

export default RootLayout;
