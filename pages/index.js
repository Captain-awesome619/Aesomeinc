import React from 'react'
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';

const USER_NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const MAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/user/signup';
const Register = () => {
  const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [user2, setUser2] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus2, setUserFocus2] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
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
        setValidMail(MAIL_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidName(USER_NAME_REGEX.test(user2));
    }, [user2])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd,user2])

    const handleSubmit = async (e) => {
      e.preventDefault();
      const v1 = MAIL_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      const v3 = USER_NAME_REGEX.test(user2);
      if (!v1 || !v2 || !v3) {
          setErrMsg("Invalid Entry")
return;
      }
      try {
        const response = await axios.post(REGISTER_URL,
            JSON.stringify({ fullname : user2, email: user, password:pwd }),
            {
                headers: { 'Content-Type': 'application/json' },

            }
        );
        console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response))
        setSuccess(true);
        //clear state and controlled inputs
        //need value attrib on inputs for this
        setUser('');
        setPwd('');
        setMatchPwd('');
        setUser2('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('E-mail already EXISTS!');
        } else {
            setErrMsg('Registration Failed')
        }
        errRef.current.focus();
    }
    }

  return(
    <>
    {success ? (
        <section>
            <h1>Success!</h1>
            <p>
                <a href="/login">Sign In</a>
            </p>
        </section>
    ) : (
      <div className="control">
        <section className="sectionnn">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form className="formmm" onSubmit={handleSubmit} >

            <label htmlFor="username">
                    Username:
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user2 ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="name"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser2(e.target.value)}
                    value={user2}
                    required
                    className="inputtt"
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus2(true)}
                    onBlur={() => setUserFocus2(false)}
                />
                <p id="uidnote" className={userFocus2 && user2 && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                <label htmlFor="username">
                    Mail:
                    <FontAwesomeIcon icon={faCheck} className={validMail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMail || !user ? "hide" : "invalid"} />
                </label>
                <input
                    type="email"
                    id="mail"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    className="inputtt"
                    aria-invalid={validMail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validMail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must contain  valid mail<br />
                </p>
                <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    className="inputtt"
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>


                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    className="inputtt"
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>

                <button disabled={!validMail || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>
            <p>
                Already registered?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="/login">Sign In</a>
                </span>
            </p>
        </section>
</div>
    )}
</>
)};





export default Register;