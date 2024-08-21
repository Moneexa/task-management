import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { axiosHelperFunction } from '../../axiosCall/axiosHelper';
import { Result } from '../../axiosCall/axiosTypes';
type Task = {
    _id: "", status: "", description: "", taskNumber: ""
}
const Backlog = () => {
    const navigate = useNavigate();
    const { teamID } = useParams();

    const [tasks, setTasks] = useState<Result<Task[]>>({ "status": "init" });

    useEffect(() => {

        const fetchTasks = async () => {
            setTasks({ "status": "loading" })
            if (!teamID) {
                return ""
            }
            const result = await axiosHelperFunction<string, Task[]>({ "dataSource": "tasks", "fetchType": "get", "queryParam": teamID })
            if (typeof result !== "undefined") {
                setTasks(result)
            }
        };

        fetchTasks();
    }, [teamID]);

    const onDragEnd = async (result: { destination: any; source: any; draggableId: any; }) => {
        if (tasks.status !== "success") {
            return
        }
        const { destination, source, draggableId } = result;
        const sourceId = draggableId.split(" ")[1]
        const sourceStatus = source.droppableId.split(" ")[0]
        console.log("Drag result:", result);
        if (!destination) return;
        debugger
        if (destination.droppableId === sourceStatus && destination.index === source.index) return;

        const updatedTasks = (typeof tasks.data !== "string") && [...tasks.data];
        const movedTask = updatedTasks && updatedTasks.find(task => task.status === sourceStatus);
        const newStatus = destination.droppableId;

        if (movedTask) {
            movedTask.status = newStatus;
            setTasks({ data: updatedTasks, status: "success" });
            const response = await axiosHelperFunction({
                "dataSource": "tasks", "fetchType": "put", "payload": {
                    status: movedTask.status,
                }, "queryParam": sourceId
            })
            if (response.status == "success") {
                console.log("data sent", response.data)
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
                                    {
                                        tasks.status == "loading" && "loading....."
                                    }
                                    {
                                        tasks.status === "success" ?
                                            (typeof tasks.data !== "string") && tasks.data.filter(task => task.status === status.name)
                                                .map((task, index) => (
                                                    <Draggable key={task._id} draggableId={task.status + " " + task._id} index={index}>
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
                                                )) : ''
                                    }
                                    {
                                        tasks.status === "error" && tasks.errorMessage
                                    }
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
