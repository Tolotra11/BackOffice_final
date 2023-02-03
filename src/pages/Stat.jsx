import { useEffect,useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend ,BarChart,Bar,CartesianGrid,XAxis,YAxis} from "recharts";
import Navbarre from '../components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Stat = () => {
    var tok = localStorage.getItem("token");
    if(tok == null){
        tok = "";
    }
    const [loading , setLoading] = useState(false);
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
           return (
           <div
              className="custom-tooltip"
              style={{
                 backgroundColor: "#ffff",
                 padding: "5px",
                 border: "1px solid #cccc"
              }}
           >
              <label>{`${payload[0].name} : ${payload[0].value}`}</label>
           </div>
        );
     }
     return null;
  };
    var COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
    const [data1,setData1] = useState([]);
    const [data2,setData2] = useState([]);
    useEffect(() => { 
        setLoading(true);
        fetch(`https://wsfinal-production.up.railway.app/statistiques`,{
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
          setData1(res.data[0].object);
          setData2(res.data[1].object);
          setLoading(false);
       });
   },[tok]);
   if (loading){
    return <div><Navbarre/>
    <p>loading...</p></div>;
}
      console.log(data1);
      console.log(data2);
      return(
        <div>
            <Navbarre/>
          
            <Container style={{marginTop:"75px"}}>
                <Row>
                <Col  md={4}>
                <h3 >Nombre d'enchere par categorie</h3>
            <PieChart width={430} height={300} >
                <Pie
                    data={data1}
                    color="#000000"
                    dataKey="nombre"
                    nameKey="nomCat"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                >
                    {data1.map((entry, index) => (
                        <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                </PieChart>
                </Col>
                    <Col md={2}>
                 
                </Col>
                    <Col>
                    <h3 >Les categories les plus rentable en ariary</h3>
                    <BarChart width={430} height={300} data={data2}>
                            <Bar dataKey="somme" fill="green" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="nomCat" />
                            <YAxis />
                     </BarChart>
                    </Col> 
                </Row>
            </Container>
        </div>
       
      )
      
};
export default Stat;