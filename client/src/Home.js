import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import './Styles.css';


function Home() {
    const [empname, setEmpname] = useState('')
    const [empnum, setEmpnum] = useState('')
    const [empid, setEmpid] = useState('')
    const [empsalary, setEmpsalary] = useState('')


    const navigate=useNavigate();
    const handleSubmit = (event) =>{
        console.log(empname , empnum , empid , empsalary);
        event.preventDefault();
        axios.post(process.env.REACT_APP_BACKEND_URL,{empid , empname , empnum , empsalary})
        .then(res =>{
            navigate('/');
        }).catch(err => console.log(err));
    }

    const [data,setData]=useState([]);
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL)
        .then(res => setData(res.data))
        .catch(err => console.log(err));   
    })
    const handleDelete=(empnum)=>{
        axios.delete(process.env.REACT_APP_BACKEND_URL + empnum)
        .then(res => navigate('/'))
        .catch(err => console.log(err));
    }
  return (
    <div>
        <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <h1>Employee Details</h1>
                        <div className='inputs'>
                            {/* <div className='name'>EmpName</div> */}
                            <div classname='inputs'>
                                <input type='text' placeholder='Enter Name:' onChange={e => setEmpname(e.target.value)}/>
                            </div>
                        </div>
                        <div className='inputs'>
                            {/* <div className='name'>Register Number</div> */}
                            <div classname='inputs'>
                                <input type='text' placeholder='Enter RegisteredNumber:' onChange={e => setEmpnum(e.target.value)}/>
                            </div>
                        </div>
                        <div className='inputs'>
                            {/* <div className='name'>Salary</div> */}
                            <div classname='inputs'>
                                <input type='text' placeholder='Enter Salary:' onChange={e => setEmpsalary(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
        <div className='container'>
            <div className='main'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Emp ID</th>
                            <div></div>
                            <th>Employee Name</th>
                            <div></div>
                            <th>Employee Number</th>
                            <div></div>
                            <th>Employee Salary</th>
                            <div></div>
                            <th>Delete</th>
                            <th>Edit</th>
                                
                        </tr>
                    </thead>
                    <tbody>
                        {data.map( (d ,i) => (
                            <tr>
                                <td>{d.empid}</td>
                                <div></div>
                                <td>{d.empname}</td>
                                <div></div>
                                <td>{d.empnum}</td>
                                <div></div>
                                <td>{d.empsalary}</td>
                                <div></div>
                                <td>
                                    <button className='btn-del' onClick={e=>handleDelete(d.empnum)}>Delete</button>
                                </td>
                                <td>
                                   <Input empdt = {d} />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div> 
    </div>
  )
}
export default Home



