"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <NextThemesProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
