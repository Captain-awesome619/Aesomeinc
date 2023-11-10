import React,{useState,useEffect,useRef} from 'react'
import axios2 from './api/axios2';


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

const handleSubmit2 = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios2.post(FORGOT_URL,
                JSON.stringify({ email:user }),
                {
                    headers: { 'Content-Type': 'application/json' },
                },
                );
                setview(true)
        }


        catch (err) {
            if (err) {
console.log(err)
console.log("error")
if (!err?.response) {
    setErrMsg('No Server Response');
} else if (err.response?.status === 404) {
    setErrMsg('User Does Not Exist');
}
            }
        }

    }
  return (
    <>

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
<h1>your password reset link has been sent,please check Your Mail inbox or your Spam folder </h1>
}
</>
  )
}

export default Forgotpassword