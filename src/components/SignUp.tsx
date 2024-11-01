import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Email from "./Email";
import Password from "./Password";
import { displayToast } from "../utils/utils";
import { emailRegex, passwordRegex } from "../utils/constants";


const SignUp:FC = () => {

    const [loginText, setLoginText] = useState(""); 
    const [password, setPassword] = useState("");     
    const [password2, setPassword2] = useState(""); 
    
    const handleOnClick = () => {

        if(loginText === '' || password === '' || password2 == ''){
            displayToast('All fields are required, Please try again!', true)
            return
        }


        if(!emailRegex.test(loginText)){
            displayToast('Invalid Email Id, Please try again!', true)
            return
        }

    
        if(password !== password2){
            displayToast('Passwords do not match, Please try again!', true)
            return
        }


        if(!passwordRegex.test(password)){
            displayToast('Your password is weak. It must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long. Please try again!', true)
            return
        }

    }


    return <div className='flex-grow flex items-center  justify-center mt-20'>
    <div className="relative flex flex-col m-6 space-y-10 border  border-slate-400 rounded-2xl md:flex-row md:space-y-0 md:m-0">
        
        <div className="px-8 py-4 md:p-16">

            <div className="text-center md:text-left font-mono mb-10 text-4xl font-bold">
                    Sign Up
            </div>  


            <Email loginText={loginText} setLoginText={setLoginText}/>

            <Password password={password} setPassword={setPassword} labelText={"Password"}/>

            <Password password={password2} setPassword={setPassword2} labelText={"Confirm Password"}/>


            <div className="md:mx-[4.25rem] md:px-4">
                <button className="w-full flex justify-center items-center p-4 md:p-5 mt-6 space-x-6 font-sans font-bold text-white rounded-md px-8 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg hover:-translate-y-0.5 duration-150" onClick={handleOnClick}>
                            <span>Sign Up</span>
                </button>
            </div>
     

            <div className="text-gray-500 cursor-default text-center mt-4 md:text-left md:mt-12">Already have an account? <span className="text-cyan-700 cursor-pointer"><Link to="/login">Log in</Link></span></div>

        </div>
        
    </div>
    <ToastContainer/>

</div>

}

export default SignUp;