import React, { useEffect, useRef, useState } from "react";
import './dropdown.css'


export default function Dropdown({ items, onselect }) {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [])


    const handleSelect = (item) => {
        onselect(item);
        setOpen(false)
    }

    const handleToggle = () => setOpen(!open);
    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-button" onClick={handleToggle}>Select an option</button>
            <ul className={`dropdown-menu ${open ? "show" : ""}`}>
                {items.map((val, i) => <li key={i} onClick={handleSelect(val)}>{val}</li>)}
            </ul>
        </div>
    )
}