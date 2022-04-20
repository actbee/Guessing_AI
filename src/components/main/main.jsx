import {useState} from "react";
import "./main.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";


const Input = styled('input')({
    display: 'none',
  });
  


export default function Main(){
    return(
        <div className = "main">

        <div className = "menu" id = "menu">
            <Stack spacing={40} direction = "row">
               <Button size="large" variant="contained">Predict</Button> 
               <Button size="large" variant="contained">
                   <Link to="/data" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                   Data
                   </Link>
                   </Button> 
               </Stack>   
            </div>


            <div className = "Image">

        <Stack direction="row" alignItems="center" spacing={2}>

        <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="outlined" component="span"> Upload </Button>
        </label>

        <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton size="large" color="primary" aria-label="upload picture" component="span">
          <PhotoCamera size="large"/>
        </IconButton>
        </label>

        </Stack>

        </div> 

        </div>   
    )
}