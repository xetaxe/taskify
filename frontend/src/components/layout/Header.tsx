export const Header = () => {
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
        <span className="header_login">
          Login
        </span>
      </nav>
    </header>
  );
};