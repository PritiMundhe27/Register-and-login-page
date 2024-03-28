
import { useRef, useState, useEffect} from "react";

import { useNavigate } from 'react-router-dom';
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^\d{10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Login = () => {
    const userRef = useRef();
  const [mobile, setMobile] = useState('');
  const [validMobile, setValidMobile] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);

  const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

  const navigate=useNavigate();
  useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    setValidMobile(USER_REGEX.test(mobile));
}, [mobile])

useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
}, [pwd, matchPwd])

useEffect(() => {
    setErrMsg('');
}, [mobile, pwd, matchPwd])

  const handleLogin = () => {
    // Handle login logic here
    console.log('Logging in with mobile:', mobile, 'and password:', pwd);
    const v1 = USER_REGEX.test(mobile);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
    }
    
  };
  return (
    <div>
      <h2>Please Login to Continue</h2>
      <form onSubmit={handleLogin}>
        <div>    
        <input
                type="text"
                id="mobile"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                placeholder={`\uf095 Enter mobile Number`}          
                style={{ fontFamily: 'Arial, "Font Awesome 5 Free"' }}
                required
                aria-invalid={validMobile ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setMobileFocus(true)}
                onBlur={() => setMobileFocus(false)}
         />           
        </div>
        <div>     
        <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                placeholder={`\uf023 Enter password`} 
                style={{ fontFamily: 'Arial, "Font Awesome 5 Free"' }}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
         />                             
        </div>
        <button type="submit">Login</button>
        <button type="submit">Forgot password</button>
      </form>
      <div>
      <button type="submit" onClick={()=>{navigate('/')}}>Register</button>
      </div>
      <h5>------Register with------</h5>
      <div>
        <a href="https://myaccount.google.com/" className="social-icon">
          <FontAwesomeIcon icon={faGoogle} />
        </a>
        &nbsp;
        <a href="https://www.facebook.com/" className="social-icon">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
              &nbsp;
        <a href="https://twitter.com" className="social-icon">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </div> 
  );
};
export default Login;
