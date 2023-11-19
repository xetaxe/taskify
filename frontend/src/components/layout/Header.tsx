import { logout } from "../../api/registerApi";

type HeaderProps = {
  isLoggedIn: boolean,
  showLogin: () => void,
  setIsLoggedIn: (value: React.SetStateAction<boolean>) => void
}

export const Header = ({isLoggedIn, showLogin, setIsLoggedIn}: HeaderProps) => {

  const handleLogout = () => {
    logout()
    .then(data => {
      if (data['message']) {
        // Check for the presence of the session cookie
        console.log(document.cookie)
        const cookieExists = document.cookie.split(';').some((cookie) => {
          return cookie.trim().startsWith('session=');
        });

        setIsLoggedIn(cookieExists);
      }
    })
    .catch((err) => console.log(err))
  };

  return (
    <header className="header">
      <nav className="header_nav">
        <a href="/" className="header_link">
          <span>
            <img className="header_logo" src="/icons/task.svg" alt="Taskify logo" />
          </span>
          <span className="header_title">
            taskify
          </span>
        </a>
        { isLoggedIn ? 
            <img className="header_logout" src="/icons/logout.svg" alt="Taskify logout" onClick={handleLogout} />
          : 
          <span className="header_login" onClick={showLogin}>
            Login
          </span>
        }

      </nav>
    </header>
  );
};