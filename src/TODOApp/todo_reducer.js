import React, { useEffect, useReducer, useState } from "react";

const STATUS = Object.freeze({
    COMPLETED: 'Completed',
    NOTSTARTED: 'Not - Started'
});

const initialList = [
    { id: 1, name: 'Buy Groceries', status: STATUS.COMPLETED },
    { id: 2, name: 'Do Laundry', status: STATUS.NOTSTARTED },
    { id: 3, name: 'Clean Kitchen', status: STATUS.NOTSTARTED }
];

const initialState = {
    items: initialList
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, { id: state.items.length + 1, ...action.payload }]
            };
        case 'UPDATE_STATUS':
            return {
                ...state,
                items: state.items.map((val) =>
                    action.payload.id === val.id ? { ...val, status: action.payload.status } : val
                )
            };
        case 'DELETE_ITEM':
            return {
                ...state,
                items: state.items.filter((val) => val.id !== action.payload.id)
            };
        default:
            return state;
    }
};

function InputDialog({ open, onClose, onSubmit }) {
    const [name, setName] = useState('');
    const [status, setStatus] = useState(STATUS.NOTSTARTED);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form default behavior (page reload)
        if (name && status) {
            onSubmit({ name, status });
            setName('');
            setStatus(STATUS.NOTSTARTED);
            onClose();
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                maxWidth: '500px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}>
                <h1>Item info</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='Name'>Name </label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor='Status'>Status </label>
                        <select value={status} name='Status' onChange={(e) => setStatus(e.target.value)}>
                            {Object.entries(STATUS).map(([key, value], index) => (
                                <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function TODOReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [groupedItems, setGroupedItems] = useState(state.items);
    const [open, setOpen] = useState(false);

    const updateStatus = (e, id) => {
        const status = e.target.checked ? STATUS.COMPLETED : STATUS.NOTSTARTED;
        dispatch({ type: 'UPDATE_STATUS', payload: { id, status } });
    };

    const addItems = (newItem) => {
        dispatch({ type: 'ADD_ITEM', payload: newItem });
    };

    const deleteItem = (id) => {
        dispatch({ type: 'DELETE_ITEM', payload: { id } });
    };

    const add = () => {
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
    };

    useEffect(() => {
        const groupItemsByStatus = () => {
            setGroupedItems(Object.groupBy(state.items, (item) => item.status))
        }
        groupItemsByStatus()
    }, [state.items])

    return (
        <>
            <InputDialog open={open} onClose={close} onSubmit={addItems}></InputDialog>
            <div>
                <h1>My List</h1>
                <button onClick={add}>Add new item</button>
            </div>
            {Object.entries(groupedItems).map(([key, value], index) => (
                <div key={index}>
                    <div>{key}</div>
                    {value.length > 0 && value.map((item) => (
                        <div key={item.id}>
                            <input
                                type='checkbox'
                                onChange={(e) => updateStatus(e, item.id)}
                                checked={item.status === STATUS.COMPLETED}
                            />
                            <span>{item.name}</span>
                            <button type='button' onClick={() => dispatch({ type: 'DELETE_ITEM', payload: { id: item.id } })}>Delete</button>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}