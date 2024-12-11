"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "../styles/globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "@/services/i18n";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />

          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
