import React, { useEffect, useState } from "react";
import axios from 'axios'
import styles from './styles/Pagination.module.css'

const Pagination = () =>{
//state
const[data,setData] = useState([]);
// const[loading,setLoading] = useState(true);
const[pgCount,setPgCount]=useState(1);

const itemsPerPage = 10;


useEffect(()=>{
    const fetchData = async() =>{
        try {
            const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            setData(response.data)
            console.log("response:",response)
        } catch (error) {
            alert("failed to fetch Data")
        }
    }

    fetchData();
},[])

const totalPages = Math.ceil(data.length / itemsPerPage);

const startIndex = (pgCount -1)* itemsPerPage;
const currentData = data.slice(
    startIndex,
    startIndex + itemsPerPage
)

// if(loading) {
//     return <p>Loading Data...</p>
// }

const handleNext = () =>{
    if(pgCount < totalPages){
        setPgCount((prev) => prev+1);
    }
}

const handlePrev = ()=>{
    if(pgCount > 1){
        setPgCount(prev => prev-1);
    }
}

    return(
        <>
        <h1>Employee Data Table</h1>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
            </thead>

            <tbody>
            {currentData.map((item) =>(
             <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
             </tr>   
            ))}
            </tbody>
            
        </table>
        <div className={styles.btn}>
        <button disabled={pgCount === 1} onClick={handlePrev}>Previous</button>
            <button>{pgCount}</button>
            <button disabled = {pgCount === totalPages} onClick={handleNext}>Next</button> 
            </div>
        </>
    )
}

export default Pagination;