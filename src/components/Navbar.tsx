import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { setAuthenticated, setUsername } from "../store/features/entrySlice";
import { useAppDispatch } from "../store/store";

const Navbar:FC = () => {

    const location = useLocation();

    if(location.pathname === "/"){
        return <></>
    }

    return (location.pathname === "/login"  || location.pathname === "/signup" ) ? <UnauthenticatedNavbar/> : <AuthenticatedNavbar/>

}

const AuthenticatedNavbar:FC = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    
    const handleLogOut = () => {
        dispatch(setAuthenticated(false))
        dispatch(setUsername(""))
        navigate("/")
    }


    return <div className="flex justify-between flex-shrink-0 items-center absolute top-0 w-full h-24 font-mono bg-[#2a2a2a] text-[#f3c278]">
                <h1 className="text-4xl mx-72  md:tracking-wider text-nowrap  cursor-pointer" onClick={() => { navigate("/home") }}>MindMemo</h1>
                <div className="flex ml-96  space-x-2 cursor-pointer">
                    <span className="pt-[0.08rem]"><IoCreateOutline size={30} /> </span>
                    <span className="text-2xl" onClick={() => { navigate("/new_entry") }}>New Entry</span>
                </div>
                <div className="flex mt-[0.175rem] flex-col items-center pt-3 mx-12 space-y-1 cursor-pointer" onClick={handleLogOut}>
                <CiLogout size={30}/>
                <span className="text-sm">Logout</span>
                </div>
            </div>

}

const UnauthenticatedNavbar:FC = () => {

    const navigate = useNavigate();

    return <div className="flex justify-center flex-shrink-0 items-center absolute top-0 w-full h-24 font-mono bg-[#2a2a2a] text-[#f3c278]" onClick={() => navigate("/")}>
    <h1 className="text-[2.6rem] mx-72  md:tracking-wider text-nowrap  cursor-pointer">MindMemo</h1>
</div>

}

export default Navbar;