import {useState, useRef, Filereader} from "react";
import "./main.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';



const Input = styled('input')({
    display: 'none',
  });

export default function Main(){

    const [prediction, setOn] = useState(false);
    const [result, setOn2] = useState(true);
    const [upclicked, setOn3] = useState(false);
    const [downclicked, setOn4] = useState(false);
    const [displayedImages, setDisplayedImages] = useState([]);
  


    const uploadDocuments = async (files) => {

    const filePromises = files.map((file) => {
      // Return a promise per file
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            // Resolve the promise with the response value
            resolve(reader.result);
          } catch (err) {
            reject(err);
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    // Wait for all promises to be resolved
    await Promise.all(filePromises).then((values) => {
        setDisplayedImages(values);
    })

  };

    const updateImages = (newImages) => {        
        const images = uploadDocuments(Object.values(newImages.target.files));
        console.log(images);
    };

    const predict_click = () => {
       setOn(true);
       setOn3(false);
       setOn4(false);
       if(Math.random()>0.5){
           result_change(true);
       }
       else{
        result_change(false);
       }
    };
    const result_change = (prob) =>{
        setOn2(prob)
    }
    const up_click = () => {
        setOn3(upclicked => !upclicked)
        if(downclicked){
            setOn4(false);
        }
    }
    const down_click = () => {
        setOn4(down_clicked => !downclicked)
        if(upclicked){
            setOn3(false);
        }
    }


     return(
        <div className = "main">

        <div className = "menu" id = "menu">
            <Stack spacing={40} direction = "row">
               <Button size="large" variant="contained"  onClick = {predict_click}>Predict</Button> 
               <Button size="large" variant="contained">
                   <Link to="/data" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                   Data
                   </Link>
                   </Button> 
               </Stack>   
            </div>

          <div className = "container">
            <div className = "Image">

          <div className = "Image_body">
              {
            displayedImages.map(
                (image, index) => 
                <img width={400} alt={'user inputted'} src={image} height={400} key={index} />)
            }
            </div>

           
        <Stack direction="row" alignItems="center" spacing={2}>

        <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" single type="file"  onChange={updateImages} />
        <Button variant="outlined" component="span" > Upload </Button>
        </label>

       
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera size="large"/>
        </IconButton>

        </Stack>
  
        </div> 

       {    prediction &&
 
           <div className = "result_container">
               <div className = "result">
               {
                 result? <CheckIcon sx = {{color: "green", fontSize: 150}}/>
                 :   <ClearIcon sx = {{color: "red", fontSize: 150}}/> 
               }
               </div>
               <div className = "judge">
               <Stack direction="row" alignItems="center" spacing={15}>

               <IconButton color="primary" aria-label="agree" component="span">
                   {
                       upclicked? <ThumbUpAltIcon  onClick = {up_click} sx = {{color: "orange", fontSize: 50}}/>
                       : <ThumbUpOffAltIcon onClick = {up_click} sx = {{color: "orange", fontSize: 50}}/>
                    } 
               </IconButton>

               <IconButton color="primary" aria-label="disagree" component="span">
                   {
                       downclicked? <ThumbDownAltIcon onClick = {down_click} sx = {{color: "orange", fontSize: 50}}/> 
                       : <ThumbDownOffAltIcon onClick = {down_click} sx = {{color: "orange", fontSize: 50}}/>
                   }
               </IconButton>

                   </Stack>
                   </div>
               </div>
       }
       </div>
        </div>   
    )
}