import { useState } from "react";
import Navbarre from "../components/Navbar";
const CatForm = () => {
    const [nomCat, setNomCat] = useState('');
    var tok = localStorage.getItem("token");
    const [error,setError] = useState("");
    const [succes,setSucces] = useState("");
    var json;
    if(tok == null){
        tok = "";
    }
    const insert = async() =>{
        setError("");
        setSucces("");
        await fetch(`https://wsfinal-production.up.railway.app/categories`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              },
            body: JSON.stringify({nomCat: `${nomCat}`})
        })
        .then(response => response.json())
        .then(res => {
            json = res.success;
            if(json == null){
                setError(res.error);
            }
            else{
                setSucces(json.message);
            }
        });
    };
    return (
        <div>
            <Navbarre/>
       
               
            <p><input type="text" value={nomCat} onChange={(e) => setNomCat(e.target.value)}/></p> 
            <button onClick={insert}>Confirmer</button>
            {error}   
            {succes}
       
        </div>
        
    );
};
export default CatForm;