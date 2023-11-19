import { useState } from 'react';
import { login, signup } from '../api/registerApi';

type LoginModalProps = {
  closeModal: () => void,
  setIsLoggedIn: (value: React.SetStateAction<boolean>) => void
}

export const LoginModal = ({ closeModal, setIsLoggedIn }: LoginModalProps) => {

  const [showSignUp, setShowSignUp] = useState(false)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const handleLogin = () => {
    if (username && password) {
      // Simulating a successful login
      login({username: username, password: password})
      .then(data => {
        if (data['message']) {
          // Check for the presence of the session cookie
          console.log(document.cookie)
          const cookieExists = document.cookie.split(';').some((cookie) => {
            return cookie.trim().startsWith('session=');
          });

          setIsLoggedIn(cookieExists);
          closeModal();
        }
      })
      .catch(() => setRegisterError("The user does not exist or the credentials are wrong"))
    } else {
      setRegisterError("Invalid credentials")
    }
  };

  const handleSignup = () => {
    if (username && email && password) {
      if ( password != repeatPassword ) {
        setRegisterError("The two passwords are different")
        return
      }
      // Simulating a successful login
      signup({username: username, email: email, password: password})
      .then(data => {
        if (!data.error) {
          setShowSignUp(false);
        }
      })
      .catch(() => setRegisterError("The user could not be created. Please try again later"))
    } else {
      setRegisterError("Invalid data")
    }
  };

  const resetAllData = () => {
    setUsername("")
    setEmail("")
    setPassword("")
    setRepeatPassword("")
    setRegisterError("")
  }

  return (
    <div className="loginmodal">
      <div className="loginmodal_wrapper">
        <div className="loginmodal_menu">
          <div>
            <span className="loginmodal_back" onClick={closeModal}>
              <img src="/icons/back.svg" alt="" />
            </span>
          </div>
          
          { showSignUp ?
            <>
              <div className="loginmodal_title">
                Sign Up
              </div>
              <div className="loginmodal_inputs">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <button onClick={handleSignup}>Sign up</button>
                <div className="loginmodal_signup_text">
                  Go back to log in 
                  <span className="loginmodal_signup_link" onClick={() => {setShowSignUp(false); resetAllData()}}>
                    here
                  </span>
                </div>
                <div>
                  {registerError}
                </div>
              </div>
            </>
            :
            <>
              <div className="loginmodal_title">
                Login
              </div>
              <div className="loginmodal_inputs">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <div className="loginmodal_signup_text">
                  Do not have an account yet? Sign up 
                  <span className="loginmodal_signup_link" onClick={() => { setShowSignUp(true); resetAllData()}}>
                    here!
                  </span>
                </div>
                <div>
                  {registerError}
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
