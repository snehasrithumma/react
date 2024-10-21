import { createSlice } from "@reduxjs/toolkit";

const STATUS = Object.freeze({
    COMPLETED: 'Completed',
    NOTSTARTED: 'Not Started'
});

const initialList = [
    { id: 1, name: 'Buy Groceries', status: STATUS.COMPLETED },
    { id: 2, name: 'Do Laundry', status: STATUS.NOTSTARTED },
    { id: 3, name: 'Clean Kitchen', status: STATUS.NOTSTARTED }
];

export const todoReducer = createSlice({
    name: 'TODO',
    initialState: {
        items: JSON.parse(localStorage.getItem('items')) || initialList
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push({ id: state.items.length, ...action.payload });
        },
        updateItemStatus: (state, action) => {
            state.items.map((val) =>
                (val.id === action.payload.id) ? val.status = action.payload.status : val)
        },
        removeItem: (state, action) => {
            let index = state.items.findIndex((item) => item.id === action.id);
            state.items.splice(index, 1)
        }
    }
})

export const { addItem, updateItemStatus, removeItem } = todoReducer.actions;

export const selectItems = (state) => state.TODO.items;

export default todoReducer.reducer;
