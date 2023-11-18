import { useState } from 'react';

type LoginModalProps = {
  closeModal: () => void,
  onLogin: () => void
}

export const LoginModal = ({ closeModal, onLogin }: LoginModalProps) => {

  const [showSignUp, setShowSignUp] = useState(false)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      // Simulating a successful login
      onLogin(); // Pass username to parent component
      closeModal(); // Close the modal
    } else {
      console.log("nope")
    }
  };

  const handleSignup = () => {
    if (username && password) {
      // Simulating a successful login
      // onLogin(); // Pass username to parent component
      closeModal(); // Close the modal
    } else {
      console.log("nope")
    }
  };

  const resetAllData = () => {
    setUsername("")
    setEmail("")
    setPassword("")
    setRepeatPassword("")
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
                  onChange={(e) => setUsername(e.target.value)}
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
                <button onClick={handleLogin}>Sign up</button>
                <div className="loginmodal_signup_text">
                  Go back to log in 
                  <span className="loginmodal_signup_link" onClick={() => {setShowSignUp(false); resetAllData()}}>
                    here
                  </span>
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
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
