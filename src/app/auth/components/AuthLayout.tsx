"use client";

import { ReactNode } from "react";
import {
  Paper,
  Text,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const layoutWrapper = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
  };

  const content = {
    width: "100%",
    maxWidth: "400px",
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    backgroundColor: theme.white,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.lg,
    },
  };

  return (
    <div style={layoutWrapper}>
      <Paper style={content} withBorder>
        <Text size="xl" mb="lg">
          {title}
        </Text>
        {children}
      </Paper>
    </div>
  );
}
