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
                <h1 className="text-2xl md:text-4xl md:mx-[11.75rem] mx-5 md:tracking-wider text-nowrap  cursor-pointer" onClick={() => { navigate("/home") }}>MindMemo</h1>
                <div className="flex items-center md:mx-12 mx-4 md:space-x-16 space-x-5 text-nowrap">
                    <div className="flex md:text-3xl text-xl space-x-2 cursor-pointer">
                        <span className="md:pt-[0.08rem] pt-[0.195rem]"><IoCreateOutline /> </span>
                        <span className="text-lg md:text-2xl" onClick={() => { navigate("/new_entry") }}>New Entry</span>
                    </div>
                    <div className="flex mt-[0.2rem] flex-col items-center pt-3 space-y-1 cursor-pointer" onClick={handleLogOut}>
                    <CiLogout className="md:text-[1.65rem] text-[1.46rem]"/>
                    <span className="md:text-[1rem] text-[0.85rem]">Logout</span>
                    </div>
                </div>
            </div>

}

const UnauthenticatedNavbar:FC = () => {

    const navigate = useNavigate();

    return <div className="flex justify-center flex-shrink-0 items-center absolute top-0 w-full h-24 font-mono bg-[#2a2a2a] text-[#f3c278]" onClick={() => navigate("/")}>
    <h1 className="md:text-[2.5rem] text-[2.06rem] mx-72  md:tracking-wider text-nowrap  cursor-pointer">MindMemo</h1>
</div>

}

export default Navbar;