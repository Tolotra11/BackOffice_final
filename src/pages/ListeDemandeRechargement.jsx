import { useEffect, useState } from "react";
import Navbarre from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const ListDemandeRechargement = () =>{
    const [group, setGroup] = useState([]);
    var tok = localStorage.getItem("token");
    if(tok == null){
        tok = "";
    }
    const [loading , setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(`https://wsfinal-production.up.railway.app/demandeCredits`,{
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              }
        })
        .then(data => data.json())
        .then(
            res =>{
                setGroup(res.data);
                setLoading(false);
            }
        )
    },[tok]);
    if (loading){
        return <div><Navbarre/>
        <p>loading...</p></div>;
    }
    const accept = async (id) => {
        await fetch(`https://wsfinal-production.up.railway.app/validationCredits/${id}`,{
            method : 'PUT',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              }
        })
        .then(data => data.json())
        .then(
            res =>{
                setLoading(true);
        fetch(`https://wsfinal-production.up.railway.app/demandeCredits`,{
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              }
        })
        .then(data => data.json())
        .then(
            res =>{
                setGroup(res.data);
                setLoading(false);
            }
        )
            }
        )
    }
    const refuse = async (id) => {
        await fetch(`https://wsfinal-production.up.railway.app/refuserCredits/${id}`,{
            method : 'PUT',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              }
        })
        .then(data => data.json())
        .then(
            res =>{
                setLoading(true);
        fetch(`https://wsfinal-production.up.railway.app/demandeCredits`,{
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              }
        })
        .then(data => data.json())
        .then(
            res =>{
                setGroup(res.data);
                setLoading(false);
            }
        )
            }
        )
    }
    const groupList = group.map(g =>{
        return <div>
        <p>{g.nom} {g.prenom}</p>
        <p>{g.dateDemande}
        </p>
        <b>{g.valeur} Ariary</b>
        <br/>
        <button className="btn btn-success" style={{marginRight:"5px"}} onClick={() => accept(g.id)}>Accepter</button>
        <button className="btn btn-danger" onClick={() => refuse(g.id)}>Refuser</button>
        <hr/>
        </div>
        
    });
    return (
        <div >
            <Navbarre/>
            <Container style={{marginTop:"75px"}}>
                <Row>
                    <Col md={5}></Col>
                    <Col md={5}>
                        {groupList}
                        </Col>
                    <Col></Col> 
                </Row>
            </Container>
        </div>
       
    );
};
export default ListDemandeRechargement;
