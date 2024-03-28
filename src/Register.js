// Register.js

import { useRef, useState, useEffect,useHistory } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate ,Link} from 'react-router-dom';

import axios from './api/axios';

const USER_REGEX = /^\d{10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate(); 

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(mobile);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ mobile, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setMobile('');
            setPwd('');
            setMatchPwd('');
            
     navigate('/OtpVerification'); // Navigate to OTP verification page
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Mobile Number Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
   
   
    const togglePasswordVisibility = () => {
        setShowPwd(!showPwd);
      };

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link to="/OtpVerification">Register</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1> App.ai</h1>
                    <h6>Please Register to Continue</h6>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            <FontAwesomeIcon icon={faCheck} className={validMobile ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMobile || !mobile ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="mobile"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                            placeholder={`\uf095 Enter mobile Number`} 
                          //  placeholder="Enter mobile number"
                            style={{ fontFamily: 'Arial, "Font Awesome 5 Free"' }}
                           required
                            aria-invalid={validMobile ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setMobileFocus(true)}
                            onBlur={() => setMobileFocus(false)}
                        />
                        <p id="uidnote" className={mobileFocus && mobile && !validMobile ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            10 characters.<br />
                        </p>


                        <label htmlFor="password">
                           
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                           type={showPwd ? 'text' : 'password'}
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
                       
                        <span onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={showPwd ? faEyeSlash : faEye} />
      </span>
      
                        <i className="fa fa-eye password-icon" /> 
                        
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            placeholder={`\uf023 Confirm password`} 
                            style={{ fontFamily: 'Arial, "Font Awesome 5 Free"' }}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <Link to="/OtpVerification">
                <button disabled={!validMobile || !validPwd || !validMatch}>Register</button>
            </Link>
                        <div>
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
                    </form>
                    <h6>
                        Already have an account?
                        <span className="line">
                            
                            <a href="/Login">Login</a>
                        </span>
                    </h6>
                </section>
            )}
        </>
    )
}

export default Register;
