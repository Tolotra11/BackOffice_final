import { useEffect, useState } from "react";
import {  useParams } from 'react-router-dom';
import Navbarre from "../components/Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
const ModifCat =() => {
    const navigate = useNavigate();
    var tok = localStorage.getItem("token");
    if(tok == null){
        tok = "";
    }
    const [loading , setLoading] = useState(false);
    const [group, setGroup] = useState('');
    const [form ,setForm] = useState('');
    const [error ,setError] = useState('');
    let  {idCat}   = useParams();
    useEffect(() => {
        setLoading(true);
        fetch(`https://wsfinal-production.up.railway.app/categories/${idCat}`,{
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
           //console.log(res);
            setGroup(res.data);
            setForm(res.data.nomCat);
            setLoading(false);
        });

    },[idCat, tok]);
    if (loading){
        return <div><Navbarre/>
        <p>loading...</p></div>;
    }
    const modify = async(id) => {
        setError("");
        await fetch(`https://wsfinal-production.up.railway.app/categories/${id}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'token': `${tok}`
              },
            body:JSON.stringify({nomCat:`${form}`})
        })
        .then(response => response.json())
        .then(res => {
           //console.log(res);
            let val = res.success;
            if(val == null){
                setError(res.error.message);
            }
            else{
                navigate("/listeCategorie");
            }
        });
    };
    return (
        <div>
            <Navbarre/>
            <Container style={{marginTop:"75px"}}>
                <Row>
                    <Col md={5}></Col>
                    <Col md={5}>
                        <p><b>Nom de la categorie</b></p>
                        <p><input type='text' value={form} onChange={(e) => setForm(e.target.value)}/></p>
                        <br/>
<p><button className="btn btn-success" onClick={() => modify(group.id)}>Confirmer</button></p>
                        {error}
                        </Col>
                    <Col></Col> 
                </Row>
            </Container>

                </div>

    );
};
export default ModifCat;