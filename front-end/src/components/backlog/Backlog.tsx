import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Backlog = () => {
    const {teamID} = useParams()

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${teamID}`, {
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('auth')}`
            }
        });
        if(response){
            setTasks(response.data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [teamID]);

  const statuses = [
    { id: 1, name: 'todo', color: '#FF5733' },
    { id: 2, name: 'In Progress', color: '#FFC300' },
    { id: 3, name: 'Completed', color: '#28A745' },
    { id: 4, name: 'Approved', color: '#007BFF' }
  ];

  return (
    <div className="task-status-container">
      {statuses.map(status => (
        <div
          key={status.id}
          className="task-status-column"
          style={{ backgroundColor: status.color }}
        >
          <h3>{status.name}</h3>
          <div className="task-cards">
            {tasks
              .filter((task:{status:string, taskNumber:string,description:string}) => task.status === status.name)
              .map((task:{status:string, taskNumber:string,description:string}, index)=> (
                <div key={index} className="task-card">
                  <h4>{task.taskNumber}</h4>
                  <p>{task.description}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Backlog;
