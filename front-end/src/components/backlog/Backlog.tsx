import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Backlog = () => {
    const navigate = useNavigate();
    const { teamID } = useParams();

    const [tasks, setTasks] = useState([{ _id: "", status: "", description: "", taskNumber: "" }]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tasks/${teamID}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth')}`,
                    },
                });
                if (response) {
                    setTasks(response.data);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [teamID]);

    const onDragEnd = async (result: { destination: any; source: any; draggableId: any; }) => {
            const { destination, source, draggableId } = result;
            const sourceId=draggableId.split(" ")[1]
            const sourceStatus=source.droppableId.split(" ")[0]
            console.log("Drag result:", result);
            if (!destination) return;
            debugger
            if (destination.droppableId === sourceStatus && destination.index === source.index) return;

            const updatedTasks = [...tasks];
            const movedTask = updatedTasks.find(task => task.status === sourceStatus);
            const newStatus = destination.droppableId;

            if (movedTask) {
                movedTask.status = newStatus;
                setTasks(updatedTasks);

                try {
                    await axios.put(`http://localhost:5000/api/tasks/${sourceId}`, {
                        status: movedTask.status,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('auth')}`,
                        },
                    });
                } catch (error) {
                    console.error("Error updating task status:", error);
                }
            }
        };

        const statuses = [
            { id: 1, name: 'todo', color: '#FF5733' },
            { id: 2, name: 'In Progress', color: '#FFC300' },
            { id: 3, name: 'Completed', color: '#28A745' },
            { id: 4, name: 'Approved', color: '#007BFF' }
        ];

        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="task-status-container">
                    {statuses.map(status => (
                        <Droppable key={status.id} droppableId={status.name}>
                            {(provided) => (
                                <div
                                    className="task-status-column"
                                    style={{ backgroundColor: status.color }}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h3>{status.name}</h3>
                                    <div className="task-cards">
                                        {tasks
                                            .filter(task => task.status === status.name)
                                            .map((task, index) => (
                                                <Draggable  key={task._id} draggableId={task.status+" "+task._id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            className="task-card"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <h4>{task.taskNumber}</h4>
                                                            <p>{task.description}</p>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>

                                    {status.name === 'todo' && (
                                        <button className="add-task-button" onClick={() => navigate(`/tasks/${teamID}`)}>+</button>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        );
    };

    export default Backlog;
