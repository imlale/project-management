import { googleLogout } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { setUserProfile } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const useLogout = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const logOut =() =>{
        googleLogout()
        dispatch(setUserProfile({}))
        navigate("/login")
        sessionStorage.clear()
     
    }
    return logOut
    
}

export default useLogout

