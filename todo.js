// import { json } from 'express';
 import './App.css';
import React,{useEffect, useState} from "react";
//import{AiOutlineDelete} from 'react-icons/ai';
// import {BsCheckLg} from 'react-icons/bs';


function Task3(){
    const[isCompleteScreen,setIsCompleteScreen]=useState(false);
    const[taskName, settaskName]= useState("");
    const [taskDescription,settaskDescription] = useState("");
    const [data, setdata]= useState([]);
    
    // const handler=(e)=>{
    //     e.preventDefault(e);
    
    // }

    const ListOfItem=(e)=>{
        e.preventDefault();
        let listItem={
            task: taskName,
            description:taskDescription,
        }
        let updatedList =[...data];
        updatedList.push(listItem);
        setdata(updatedList);  
        settaskName('');
        settaskDescription('');
    // Storing an Task in localStorage 
        localStorage.setItem('taskList',JSON.stringify(updatedList))
    }

    useEffect(()=>{
    // Retriving Task data from LocalStorage
        let storedtask =JSON.parse(localStorage.getItem('data'));
        if (storedtask){
                setdata(storedtask);
        }
    },[])

    return(
        <div className="task-header">
            <h1> Task Tracker </h1>
                <form className="task-container">
                    <div className="task-input">     
                        <div className="task-input-item">
                                <label>Task Name</label>
                                <input type="text" 
                                placeholder="Enter Task Name" 
                                value={taskName} 
                                onChange={(e)=>settaskName(e.target.value)}/>
                        </div>
                        <div className="task-input-item">
                                <label>Task Description</label>
                                <input type="textarea" 
                                placeholder="Enter Task Description " 
                                value={taskDescription} 
                                onChange={(e)=>settaskDescription(e.target.value)}/>
                        </div>
                        <div>
                                <button type="submit" className="primary-btn" onClick={ListOfItem}>Add</button>
                        </div>
                    </div>
                                    
                        <div className="btn-area">
                                   <button className={`secondary-btn ${isCompleteScreen === false && 'active'}`} 
                                   onClick={() => setIsCompleteScreen(false)}>
                                    Pending Task</button>
                                   <button className={`secondary-btn ${isCompleteScreen === true && 'active'}`} 
                                   onClick={() => setIsCompleteScreen(true)}>Completed</button>
                        </div>
                        <div className="task-list">
        
                            {data.map((item,index)=>{
                                return(
                                    <div className="task-list-item" key={index}>
                                            <div>
                                            <h3>{item.task}</h3>
                                                <p>{item.description}</p>
                                            </div>
                                            <div>
                                                {/* <AiOutlineDelete className='icon'title='Delete'/> */}
                                                {/* <BsCheckLg className='check-icon' title='Completed'/> */}
                                            </div>
                                    </div>  
                                )
                            })}     
                        </div>
                 </form>
                 
        </div>
    )
}
export default Task3;