import React, { useState } from "react";


export function useForm(intialvalues) {

    const [values, setValue] = useState(intialvalues);

    const onChange = (event) => {
        const { name, value } = event.target
        setValue((prevvalue) => ({
            ...prevvalue,
            [name]: value
        }))
    }

    const resetForm = () => {
        setValue(intialvalues)
    }

    return [values, onChange, resetForm]

}