import "./globals.css";
import { ReactNode } from "react";

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return children;
};
export default RootLayout;
