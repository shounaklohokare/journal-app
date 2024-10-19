import { FC } from "react"
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {

    const navigate = useNavigate()

    return <div className="flex justify-center flex-shrink-0 items-center absolute top-0 w-full h-24 bg-[#2a2a2a]">
        <h1 className="text-4xl font-mono md:tracking-wider text-nowrap text-[#f3c278] cursor-pointer" onClick={() => { navigate("/") }}>Journal App</h1>
    </div>

}

export default Navbar;