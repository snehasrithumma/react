import React, { useEffect, useState } from "react";
import { addItem, selectItems, updateItemStatus, removeItem } from './todoReducer';
import { useSelector, useDispatch } from 'react-redux';

const STATUS = Object.freeze({
    COMPLETED: 'Completed',
    NOTSTARTED: 'Not - Started'
});

function InputDialog({ open, onClose, onSubmit }) {
    const [name, setName] = useState('');
    const [status, setStatus] = useState(STATUS.NOTSTARTED);

    if (!open) return null;
    const handleSubmit = () => {
        if (name && status) {
            onSubmit({ name, status });
            setName('');
            setStatus(STATUS.NOTSTARTED)
        }
    }

    return (<div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }}>
        <div style={{
            backgroundColor: 'white', borderRadius: '8px', padding: '20px',
            position: 'relative', maxWidth: '500px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
            <h1>Item info</h1>
            <form onSubmit={handleSubmit}>
                <div><label htmlFor='Name'>Name </label><input type='text' value={name} onChange={(e) => setName(e.target.value)}></input></div>
                <div><label htmlFor='Status'>Status </label>
                    <select value={status} name='Status' onChange={(e) => setStatus(e.target.value)}>
                        {Object.entries(STATUS).map(([key, value], index) => (<option key={index} value={value}>{value}</option>))}
                    </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="cancel" onClick={onClose}>Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>)

}

export default function Redux() {
    const dispatch = useDispatch();
    const itemsList = useSelector(selectItems) //state => state.todo.items
    const [groupedItems, setGroupedItems] = useState(itemsList);

    const [open, setOpen] = useState(false);

    const updateStatus = (e, id) => {
        const status = e.target.checked ? STATUS.COMPLETED : STATUS.NOTSTARTED
        dispatch(updateItemStatus({ id, status }))
    }

    const addItems = (newItem) => {
        dispatch(addItem(newItem))
    }

    const delteItem = (id) => {
        dispatch(removeItem(id))

    }
    const add = () => {
        setOpen(true)
    }

    const close = () => {
        setOpen(false)
    }

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(itemsList))
        const groupItemsByStatus = () => {
            setGroupedItems(Object.groupBy(itemsList, (item) => item.status))
        }
        groupItemsByStatus()
    }, [itemsList])

    return <>
        <InputDialog open={open} onClose={close} onSubmit={addItems}></InputDialog>
        <div><h1>My List</h1><button onClick={add}>Add new item</button></div>
        {Object.entries(groupedItems).map(([key, value]) => (<div>

            <div>{key}</div>
            {
                value.length > 0 && value.map((item) => (<div key={item.id}>
                    <input type='checkbox' onChange={(e) => updateStatus(e, item.id)} checked={item.status === STATUS.COMPLETED}></input>
                    <span>{item.name}</span>
                    <button type='button' onClick={() => delteItem(item.id)}>Delete</button>
                </div>))
            }
        </div>
        ))}
    </>
}