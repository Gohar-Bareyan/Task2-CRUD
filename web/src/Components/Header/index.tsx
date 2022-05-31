import styles from "./index.module.scss"
import * as React from 'react';
import { useState, useEffect } from "react";
import { Switch } from '@mui/material';

interface Props {
    title: string
}

export default function (props: Props) {
    const [checked, setChecked] = useState(JSON.parse(localStorage.getItem('isDarkMode') || ''));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        
        localStorage.setItem("isDarkMode", JSON.stringify(!checked))
    };

    useEffect(() => {
        if (checked) {
            document.body.style.backgroundColor = " #0e151b"
        } else {
            document.body.style.backgroundColor = "white"
        }

        const data = localStorage.getItem('isDarkMode');
        if ( data !== null ) setChecked(JSON.parse(data));
      }, [checked]);


    return (
        <div className={styles.header}>
            <h1>{props.title}</h1>

            <Switch className={styles.switch}
                checked={checked}
                color={"success"}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </div>
    )
}

