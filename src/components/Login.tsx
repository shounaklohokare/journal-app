import { useState, FC } from "react"

import { ToastContainer } from 'react-toastify';
import Email from "./Email";
import Password from "./Password";
import { Link } from "react-router-dom";
import { emailRegex } from "../utils/constants";
import { displayToast } from "../utils/utils";



const Login:FC = () => {

    const [loginText, setLoginText] = useState(""); 
    const [password, setPassword] = useState("");    

    const handleOnClick = () => {

        if(!emailRegex.test(loginText)){
            displayToast('Invalid Email Id, Please try again!', true)
            return
        }


        if(password=== ""){
            return
        }



    }

    return <div className='flex-grow flex items-center  justify-center mt-20'>

                <div className="relative flex flex-col m-6 space-y-10 border border-slate-400 rounded-2xl md:flex-row md:space-y-0 md:m-0">
                    
                    <div className="px-8 py-4 md:p-16">
                        
                        <div className="text-center md:text-left font-mono mb-10 text-4xl font-bold">
                                Log In
                        </div>  

                        <Email loginText={loginText} setLoginText={setLoginText}/>
    
                       <Password password={password}  setPassword={setPassword} labelText={"Password"}/>


                        <div className="login-box">
                                <div className="font-thin ml-[1px] text-cyan-700 cursor-pointer">Forgot Password</div>

                                <button className="login-button" onClick={handleOnClick}>
                                    <span>Log In</span>
                                    
                                </button>
                        </div>

                        <div className="text-gray-500 cursor-default text-center mt-6 md:text-left md:mt-12">Don't have an account? <span className="text-cyan-700 cursor-pointer"><Link to="/signup">Sign up</Link></span></div>

                    </div>
                    
                </div>
                <ToastContainer/>

            </div>

}

export default Login;