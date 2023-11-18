import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({children}: {children?: ReactNode}) => {
  return (
    <div className="layout">
      <Header />
      <main>
        <div className="main_container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};