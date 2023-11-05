import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from './api/axios';
import Home from './landing';
import {useRouter} from "next/router"
const LOGIN_URL = '/user/login';

const Login = () => {

    const [forgot, setforgot] = useState(false);

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    const route = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email:user, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },

                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            console.log(accessToken)
            setAuth({user ,pwd,accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
            route.push("/landing")
            console.log(success)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
<div className="control">
   <section className="sectionnn">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit} className="formmm">
                        <label htmlFor="email">Mail</label>
                        <input
                            type="email"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            className="inputtt"
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className= "inputtt"
                        />
<div className="buttoncover">
                        <button className="button1" disabled={!user || !pwd} >Sign In</button>
</div>
                    </form>
                    <p className="forgot1">
<div className="needact">
                        Need an Account?<br />
                        <span className="line">

                            <button className="button1" href="/">Sign Up</button>
                        </span>
</div>
                        <span className="line2">
                            <button className="button1" onClick={() => route.push("/forgotpassword")}>Forgot Password</button>
                        </span>
                    </p>
                </section>
                </div>
        </>
    )
}

export default Login
