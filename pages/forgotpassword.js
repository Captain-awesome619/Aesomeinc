import React,{useState,useEffect,useRef} from 'react'
import axios2 from './api/axios2';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader"
const FORGOT_URL = "https://api-ecommerce-app-a3hc.onrender.com/user/forgot-password"
const Forgotpassword = () => {

    const userRef = useRef();
    const errRef = useRef();
    useEffect(() => {
        userRef.current.focus();
    }, [])
    const [errMsg, setErrMsg] = useState('');
    const [user, setUser] = useState('');
    const [view, setview] = useState(false);
    const [load, setload] = useState(false);
const handleSubmit2 = async (e) =>{
    setload(true)
        e.preventDefault();
        try {
            const response = await axios.post(FORGOT_URL,
                JSON.stringify({ email:user }),
                {
                    headers: { 'Content-Type': 'application/json' },
                },
                );
                setview(true)
                setload(false)
        }


        catch (err) {
            if (err) {
console.log(err)
console.log("error")
if (!err?.response) {
    setErrMsg('No Server Response');
} else if (err.response?.status === 404) {
    setErrMsg('This User Does Not Exist');
}
            }
        }
        setload(false)
    }
  return (
    <>
    <div className={load === true ? "headcov1" : "headcov2"}>
  <div className={load === true ? "covload1" : "covload2"}>
 <ClipLoader
        color="blue"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        className='clip'
      />
      </div>
        {
             view == false ?
    <form className="forgotpage1" onSubmit= {handleSubmit2}>

        <p  ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className="forgotpage">
        <input
        className ="inputtt"
        ref={userRef}
        type="email"
        id="email"
label="email"
placeholder= "enter your mail"
onChange={(e) => setUser(e.target.value)}
value={user}
required
       />
        <button className="button1">submit</button>
        </div>
</form>
:
<h1>your password reset link has been sent,please check Your Mail inbox or your JUNK folder </h1>
}
</div>
</>
  )
}

export default Forgotpassword