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
import {PredictLabel} from '../naiveBayes/naiveBayes'
import { uploadDocuments } from "../image-upload/image-uploader";
import {useRecoilValue, useRecoilState } from 'recoil'
import { displayedImages_no, displayedImages_yes, classifier } from "../../store"

const Input = styled('input')({
    display: 'none',
  });

export default function Main(){

    const [prediction, setprediction] = useState(false);
    const [result, setresult] = useState(true);
    const [reslabel, setreslabel] = useState('positive');
    const [upclicked, setup] = useState(false);
    const [downclicked, setdown] = useState(false);
    const [displayedImage, setDisplayedImage] = useState([]);
    const [predicting, ispredicting] = useState(false);
    const naiveBayesClassifier = useRecoilValue(classifier);



    const updateImages = (newImages) => {        
        const images = uploadDocuments(Object.values(newImages.target.files), setDisplayedImage, "prediction");
        console.log(images);
    };

    const predict_click = () => {

      if(displayedImage.length===1){     
        setprediction(true);
        setup(false);
        setdown(false);
        ispredicting(true);
        PredictLabel(displayedImage, setresult,naiveBayesClassifier, ispredicting);
      }
    };

    const up_click = () => {
        setup(upclicked => !upclicked)
        if(downclicked){
            setdown(false);
        }
    }
    const down_click = () => {
        setdown(down_clicked => !downclicked)
        if(upclicked){
            setup(false);
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
              displayedImage.length === 0 ? <></> :
                <img width={400} alt={'user inputted'} src={displayedImage} height={400}  />
            }
            </div>

           
        <Stack direction="row" alignItems="center" spacing={2}>

        <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" single type="file"  onChange={updateImages} />
        <Button variant="outlined" component="span" > Upload </Button>
        </label>

       
        <Input accept="image/*" id="icon-button-file" type="file" />
        {/* <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera size="large"/>
        </IconButton> */}

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

               {/* <IconButton color="primary" aria-label="agree" component="span">
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
               </IconButton> */}

                   </Stack>
                   </div>
               </div>
       }
       </div>
        </div>   
    )
}