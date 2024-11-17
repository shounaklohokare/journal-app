import { FC, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Password from "./Password";
import { displayToast, generateUUID } from "../utils/utils";
import { emailRegex, passwordRegex } from "../utils/constants";
import { confirmSignUp, generateSecretHash, signUpUser } from "../utils/auth";
import Input from "./Input";

const SignUp:FC = () => {

    const [isSignedUp, setIsSignedUp] = useState(false);


    const uuid = useRef(generateUUID())
    const secretHash = useRef(generateSecretHash(uuid.current));


    return <div className='flex-grow flex items-center  justify-center mt-20 bg-gradient-to-tr from-[#F0E3D0] to-[#F3C278]'>
    <div className="relative flex flex-col m-6 space-y-10 bg-white/30 rounded-2xl md:flex-row md:space-y-0 md:m-0">
        
        <div className="px-8 py-4 md:p-16">
        {!isSignedUp ? <CreateAccount uuid={uuid.current} secretHash={secretHash.current} setIsSignedUp={setIsSignedUp} /> :
                     <VerifyEmail uuid={uuid.current} secretHash={secretHash.current}/>}
        </div>
    </div>
    <ToastContainer/>

</div>

}

interface CreateAccountProps {
    uuid: string 
    secretHash : string 
    setIsSignedUp : (arg0: boolean) => void
}

const CreateAccount:FC<CreateAccountProps> = ({ uuid, secretHash, setIsSignedUp  }) => {

    
    const [loginText, setLoginText] = useState(""); 
    const [password, setPassword] = useState("");     
    const [password2, setPassword2] = useState(""); 



    const handleOnSignUp =  () => {

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

        signUpUser(uuid, password, loginText,secretHash).then(() => {
            setIsSignedUp(true)
          })  .catch(() => {
            displayToast('Error occured during sign up!', true)
        });
       
    }



    return  (<div><div className="text-center md:text-left text-amber-900 font-mono mb-10 text-4xl font-bold">
    Sign Up
</div><Input text={loginText} setText={setLoginText} /><Password password={password} setPassword={setPassword} labelText={"Password"} /><Password password={password2} setPassword={setPassword2} labelText={"Confirm Password"} /><div className="md:mx-[4.25rem] md:px-4">
        <button className="w-full flex justify-center items-center p-4 md:p-5 mt-6 space-x-6 font-sans font-bold text-white rounded-md px-8 bg-amber-600 hover:bg-opacity-90 shadow-sm hover:shadow-lg hover:-translate-y-0.5 duration-150" onClick={handleOnSignUp}>
            Sign Up
        </button>
    </div><div className="text-amber-800 cursor-default text-center mt-4 md:text-left md:mt-12">Already have an account? <span className="cursor-pointer"><Link to="/login">Log in</Link></span></div></div>)

}


interface VerifyEmailProps {
    uuid : string 
    secretHash : string 
}

const VerifyEmail:FC<VerifyEmailProps> = ({uuid, secretHash}) => {

    const navigate = useNavigate();

    const [verificationCode, setVerificationCode] = useState("");

    const handleOnVerify = () => {

        console.log("verificationCode is", verificationCode)

        confirmSignUp(uuid, verificationCode,secretHash).then(() => {

            displayToast('User created successfully, redirecting to log in!')
            setTimeout(() => {
                navigate("/login")
            }, 3000);
          }).catch(() => {
            displayToast('Invalid Verfication code!', true) 
        });
  
    }


    return <div>
        <div className="text-center md:text-left font-mono text-4xl font-bold">Enter verification code</div>
                    <div className="text-center mt-1 md:text-left font-mono mb-10 text-sm text-wrap w-96">Please enter the verification code sent to your email by no-reply@verificationemail.com</div>

                    <Input text={verificationCode} setText={setVerificationCode} labelText="Verification Code" />
                    <button className="w-full  flex justify-center items-center p-4 md:p-5 mt-6 space-x-6 font-sans font-bold text-white rounded-md px-8 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg hover:-translate-y-0.5 duration-150" onClick={handleOnVerify}>
                    Submit
                    </button>
                    
        </div>

}



export default SignUp;