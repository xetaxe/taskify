import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type LayoutProps = {
  isLoggedIn: boolean,
  showLogin: () => void,
  setIsLoggedIn: (value: React.SetStateAction<boolean>) => void
  children?: ReactNode
}

export const Layout = ({isLoggedIn, showLogin, setIsLoggedIn, children}: LayoutProps) => {
  return (
    <div className="layout">
      <Header isLoggedIn={isLoggedIn} showLogin={showLogin} setIsLoggedIn={setIsLoggedIn}/>
      <main>
        <div className="main_container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};