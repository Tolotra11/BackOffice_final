import { useEffect, useState } from "react";
import Navbarre from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
const Parametre = () => {
    const navigate = useNavigate();
    var tok = localStorage.getItem("token");
    if(tok == null){
        tok = "";
    }
    const [commission,setCommission] = useState('');
    const [dureeMin,setDureeMin] = useState('');
    const [dureeMax,setDureeMax] = useState('');
    const [error,setError] = useState('');
    const [loading , setLoading] = useState(false);
    useEffect(() => { 
        setLoading(true);
         fetch(`https://wsfinal-production.up.railway.app/parametres`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              }
        })
        .then(response => response.json())
        .then(res => {
            setCommission(res.data.commission);
            setDureeMin(res.data.dureeEnchereMin);
            setDureeMax(res.data.dureeEnchereMax);
            setLoading(false);
        });
    },[tok]);
    if (loading){
        return <div><Navbarre/>
        <p>loading...</p></div>;
    }
    const parametrage = async() => {
        setError('');
        await fetch(`https://wsfinal-production.up.railway.app/parametres`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              },
            body:JSON.stringify({commission:`${commission}`,dureeEnchereMin:`${dureeMin}`,dureeEnchereMax:`${dureeMax}`})
        })
        .then(response => response.json())
        .then(res =>{
            if(res.success == null){
                setError(res.error.message);
            }
            else{
                setLoading(true);
         fetch(`https://wsfinal-production.up.railway.app/parametres`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              }
        })
        .then(response => response.json())
        .then(res => {
            setCommission(res.data.commission);
            setDureeMin(res.data.dureeEnchereMin);
            setDureeMax(res.data.dureeEnchereMax);
            setLoading(false);
        });
            }
        })
    };
    return (
        <div >
            <Navbarre/>
            <Container style={{marginTop:"75px"}}>
                <Row>
                    <Col md={5}></Col>
                    <Col md={5}>
                        <p><b>Commission:</b></p><input type='text' value={commission} onChange = {(e) => setCommission(e.target.value)}/>
                        <p><b>duree d'enchere maximum:</b></p><input type='number' value={dureeMin} onChange = {(e) => setDureeMin(e.target.value)}/>
                        <p><b>duree d'enchere minimum:</b></p><p><input type='number' value={dureeMax} onChange = {(e) => setDureeMax(e.target.value)}/></p>      
                        <p ><button  className="btn btn-success" onClick={() => parametrage()} >Mise à jour</button></p>
                        <p className="text-center text-danger">{error}</p>
                    </Col>
                    <Col></Col> 
                </Row>
            </Container>

           
        </div>
    );
};
export default Parametre;