import React,{useState,useEffect,useRef} from 'react'
import axios from './api/axios';


const FORGOT_URL = "/user/forgot-password"
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
            const response = await axios.post(FORGOT_URL,
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
    <p  ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        {
             view == false ?
    <form className="forgotpage" onSubmit= {handleSubmit2}>
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
</form>
:
<h1>Check Your Mail</h1>
}
</>
  )
}

export default Forgotpassword