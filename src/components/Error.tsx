import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";

const Error = () => {

    return <div className="text-2xl md:text-5xl font-mono flex min-h-screen items-center justify-center">
        <div className="absolute top-5 left-10"><Link to=""><CiHome size="36" /></Link></div>
        404 Error : Page Not Found
    </div>

}

export default Error;