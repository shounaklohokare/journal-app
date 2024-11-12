import { useState, FC } from "react"

import { ToastContainer } from 'react-toastify';
import Input from "./Input";
import Password from "./Password";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex } from "../utils/constants";
import { displayToast } from "../utils/utils";
import { authenticateUser } from "../utils/auth";
import { setAuthenticated, setUsername } from "../store/features/entrySlice";
import { useAppDispatch } from "../store/store";


const MindMemo:FC = () => {

    const [isLandingPage, setIsLandingPage] = useState(true);

    return isLandingPage ? <LandingPage setIsLandingPage={setIsLandingPage} /> : <Login/>


}


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

    return <div className='flex-grow flex items-center  justify-center mt-20'>

                <div className="relative flex flex-col m-6 space-y-10 border border-slate-400 rounded-2xl md:flex-row md:space-y-0 md:m-0">
                    
                    <div className="px-8 py-4 md:p-16">
                        
                        <div className="text-center md:text-left font-mono mb-10 text-4xl font-bold">
                                Log In
                        </div>  
                        <Input text={loginText} setText={setLoginText}/>
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


interface LandingPageProps {
    setIsLandingPage : (arg0: boolean) => void
}


const LandingPage:FC<LandingPageProps> = ({setIsLandingPage}) => {

    const navigate = useNavigate()

    return (
      <div className="flex flex-col flex-grow items-center justify-center bg-gradient-to-br from-[#F0E3D0] to-[#F3C278]">
        <div className="max-w-md w-full ">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Welcome to MindMemo
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your personal journal for mindful reflection.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#729B79]"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#729B79]"
                onClick={() => setIsLandingPage(false)}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default MindMemo;