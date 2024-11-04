import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";

const Navbar:FC = () => {

    const location = useLocation();
    const navigate = useNavigate()


    return (location.pathname === "/" ? <div className="flex justify-center flex-shrink-0 items-center absolute top-0 w-full h-24 font-mono bg-[#2a2a2a] text-[#f3c278]">
    <h1 className="text-[2.6rem] mx-72  md:tracking-wider text-nowrap  cursor-pointer">MindMemo</h1>
</div> : (<div className="flex justify-between flex-shrink-0 items-center absolute top-0 w-full h-24 font-mono bg-[#2a2a2a] text-[#f3c278]">
        <h1 className="text-4xl mx-72  md:tracking-wider text-nowrap  cursor-pointer" onClick={() => { navigate("/home") }}>MindMemo</h1>
        <div className="flex mx-64 space-x-2 cursor-pointer">
            <span className="pt-[0.08rem]"><IoCreateOutline size={30} /> </span>
            <span className="text-2xl" onClick={() => { navigate("/new_entry") }}>New Entry</span>
        </div>
    </div>))

}

export default Navbar;