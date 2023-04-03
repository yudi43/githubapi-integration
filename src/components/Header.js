import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from 'react-router-dom';
 

export default function Header(title = "DirectShifts Assignment") {

    var [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer);
        }
    })
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography   
                variant="h6"
                // noWrap
                component={Link}
                to="/"
                color="#fff"
                sx={{ flexGrow: 1 }}>
                    DirectShifts Assignment
                </Typography>
                <div>
                    <p>{date.toLocaleTimeString()}</p>
                </div>
            </Toolbar>
        </AppBar>
    );
}