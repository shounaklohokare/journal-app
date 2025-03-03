import { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { setAuthenticated, setUsername } from "../store/features/entrySlice";
import { useAppDispatch } from "../store/store";
import { authenticateUser } from "../utils/auth";
import { emailRegex } from "../utils/constants";
import { displayToast } from "../utils/utils";
import Input from "./Input";
import Password from "./Password";


const Login:FC = () => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [loginText, setLoginText] = useState(""); 
    const [password, setPassword] = useState("");    

    const handleOnClick = async() => {

        if(!emailRegex.test(loginText)){
            displayToast('Invalid Input Id, Please try again!', true)
            return
        }

        if(password=== ""){
            displayToast('Password cannot be empty!', true)
            return
        }

        const res = await authenticateUser(loginText, password)
        
        console.log(res)

        if(res === 401){
            displayToast('Incorrect username or password!', true)
            return
        }

        if(res === 500){
            displayToast('Unexpected error occured!', true)
            return
        }

        dispatch(setAuthenticated(true))
        dispatch(setUsername(loginText))

        navigate("/home")
    
    }

    return <div className='flex-grow flex items-center  justify-center mt-20 bg-gradient-to-tr from-[#F0E3D0] to-[#F3C278]'>

                <div className="relative flex flex-col m-6 space-y-10 md:flex-row md:space-y-0 md:m-0">
                    
                    <div className="px-8 py-4 md:p-16 rounded-[2.15rem] bg-white/30">
                        
                        <div className="text-center text-amber-900 md:text-left font-mono mb-10 text-4xl font-bold">
                                Log In
                        </div>  
                        <Input text={loginText} setText={setLoginText}/>
                       <Password password={password}  setPassword={setPassword} labelText={"Password"}/>
                        <div className="login-box">
                                <div className="font-thin ml-[1px] text-amber-800 cursor-pointer">Forgot Password</div>
                                <button className="login-button  bg-amber-600" onClick={handleOnClick}>Log In</button>
                        </div>
                        <div className="text-amber-800 cursor-default text-center mt-6 md:text-left md:mt-12">Don't have an account? <span className="text-amber-900 hover:text-amber-600 cursor-pointer"><Link to="/signup">Sign up</Link></span></div>
                    </div>
                </div>
                <ToastContainer/>
            </div>

}

export default Login;