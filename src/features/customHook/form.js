import React from 'react';
import { useForm } from './useForm';

export default function FormComponent() {

    const [formValues, handleChange, reset] = useForm({ name: '', email: '' })
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        reset()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}
