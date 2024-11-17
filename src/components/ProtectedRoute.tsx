import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { EntryState } from "../store/features/entrySlice";


interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute:FC<ProtectedRouteProps> = ({ children}) => {

    const authenticated = useSelector((state) => (state as unknown as { entry: EntryState }).entry.isAuthenticated);

    console.log("Authenticated in :- ")
    console.log(authenticated)

    return authenticated ? <>{children}</>: <Navigate to="/" />

}

export default ProtectedRoute;