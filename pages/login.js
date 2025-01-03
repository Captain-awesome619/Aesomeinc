import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from './api/axios';
import Home from './landing';
import {useRouter} from "next/router"
import Link from 'next/link';
import ClipLoader from "react-spinners/ClipLoader"
import { useString } from '../context/namecontext';

const LOGIN_URL = '/user/login';

const Login = () => {

    const [forgot, setforgot] = useState(false);
const { updateString} = useString()
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [load, setload] = useState(false);
    const [username, setusername] = useState('');


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    const route = useRouter()


    useEffect(() => {
        if (username) {
          console.log("Updated details", username);
          updateString(username)
        }
      }, [username]);

    const handleSubmit = async (e) => {
        setload(true)
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email:user, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },

                }
            );
            console.log(response?.data);
            console.log(response.data.username)
            const name = response.data.username
            console.log(name)
            setusername(name)
            console.log(username)
           
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            console.log(accessToken)
            setAuth({user ,pwd,accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
            setload(false)
           
            route.push("/landing")
            console.log(success)
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Wrong Credentials');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
        setload(false)
    }

   

    return (
        <>
         <div  className={load === true ? "headcov1" : "headcov2"}>
          <div className={load === true ? "covload1" : "covload2"}>
 `<ClipLoader
        color="blue"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        className='clip'
      />`
      </div>
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

                         <Link  href="/"><button className="button1">Sign Up</button></Link>
                        </span>
</div>
                        <span className="line2">
                            <button className="button1" onClick={() => route.push("/forgotpassword")}>Forgot Password</button>
                        </span>
                    </p>
                </section>
                </div>
                </div>
        </>
    )
}

export default Login
