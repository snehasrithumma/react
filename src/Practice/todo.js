import React from "react";
import { useEffect, useState } from "react";

const STATUS = Object.freeze({
    COMPLETE: 'Complete',
    INPROGRESS: 'Inprogress',
    INCOMPLETE: 'Incomplte'
})
const initialState = { name: '', status: '' }
function AddTaskDialog({ open, onClose, onSubmit }) {
    const [task, setTask] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        alert(formData.get('taskname') + task.status)
        onSubmit(task)
    }

    const cancel = (e) => {
        onClose()
    }
    return (
        <div style={{ position: "fixed", inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
                padding: '15px', margin: '10px',
                height: '20vh',
                width: '20%', position: "absolute", border: '1px solid', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}>
                <div>Add Task</div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-items">
                            <label htmlFor="taskname">Name</label>
                            <input type='text' name='taskname' value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="taskstatus">Status</label>
                            <select name='taskstatus' value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
                                <option key='empty' value=''></option>
                                {Object.entries(STATUS).map(([key, value], index) => <option key={index} value={value}>{value}</option>)}
                            </select>
                        </div>
                        <div className="action-buttons">
                            <button type='button' onClick={cancel}>Cancel</button>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default function TODO() {
    const [tasks, setTasks] = useState([{ name: 'wash', status: 'Complete' }])
    const [open, setOpen] = useState(false)
    const openDialog = () => {
        setOpen(true)
    }
    const closeDialog = () => {
        setOpen(false)
    }
    const addTask = (task) => {
        setTasks([...tasks, task])
    }
    return (
        <>
            {open && <AddTaskDialog open={open} onClose={closeDialog} onSubmit={addTask}></AddTaskDialog>}
            <div>
                <div><button type="button" onClick={openDialog}>Add New</button></div>
                <div>
                    <h4>Items</h4>
                    <div>
                        {tasks && tasks.map((task, index) =>
                            <div key={index}>
                                <input name={`task-${index}`} type="checkbox" checked={task.status === STATUS.COMPLETE ? true : false} />
                                <label htmlFor={`task-${index}`}>{task.name + '' + task.status}</label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}