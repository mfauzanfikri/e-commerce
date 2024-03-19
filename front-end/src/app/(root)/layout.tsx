import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";
import Wrapper from "./wrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
}
