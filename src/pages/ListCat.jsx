import React, { useEffect, useState } from 'react';
import Navbarre from '../components/Navbar';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from "react-router-dom";
const ListCat = () =>{
   const navigate = useNavigate();
    const [nomCat, setNomCat] = useState('');
    var tok = localStorage.getItem("token");
    var json;
    if(tok == null){
        tok = "";
    }
    const insert = async() =>{
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
                
            }
            else{
                setLoading(true);
                fetch(`https://wsfinal-production.up.railway.app/categories`,{
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
                            setList(res.data);
                            setLoading(false);
                        }
                    )
            }
        });
    };
    const [list, setList] = useState([]);
    const [loading , setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(`https://wsfinal-production.up.railway.app/categories`,{
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
                setList(res.data);
                setLoading(false);
            }
        )
    },[tok]);

    if (loading){
        return <div><Navbarre/>
        <p>loading...</p></div>;
    }
    const groupList = list.map(group => {
        return <tr>
                <td>{group.id}</td>
                <td>{group.nomCat}</td>
                <td><Nav.Link as={Link} to={"/modifCat/"+group.id}><button className='btn btn-success'>Modifier</button></Nav.Link></td>
            </tr>
    }
    );
    return (
        <div>
            <Navbarre/>
            <Container>
            <Row>
                    <Table striped style={{marginTop:"70px"}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Categorie</th>   
                        <th></th>   
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                        </td>
                        <td><input type="text" value={nomCat} onChange={(e) => setNomCat(e.target.value)}/></td>
                        <td><button className='btn btn-primary' onClick={insert}>Ajouter</button></td>
                    </tr> 
                    {groupList}
                   
                    </tbody>
                </Table>
                </Row>
            </Container>
            
            
        </div>
        
    );

};
export default ListCat;
