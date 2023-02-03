import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Deconnect = () => {
    const navigate = useNavigate();
    localStorage.removeItem("token");
    useEffect( () =>{
        navigate("/");
    });
   
};
export default Deconnect;