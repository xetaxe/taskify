type HeaderProps = {
  isLoggedIn: boolean,
  showLogin: () => void
}

export const Header = ({isLoggedIn, showLogin}: HeaderProps) => {
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
            null
          : 
          <span className="header_login" onClick={showLogin}>
            Login
          </span>
        }

      </nav>
    </header>
  );
};