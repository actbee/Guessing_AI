import "./training_data.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FileUploadComponent from '../image-upload/image-uploader';
import UploadTrainingData from './upload-training-data';

const Input = styled('input')({
    display: 'none',
  });
  
var yes_images = [];
var no_images = [];

export default function Data() {
    return(
       <div className = 'data'>
           <div className = "menu" id = "menu">
           <Stack spacing={50} direction = "row">
               <Button size="large" variant="contained">
               <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                   Back
                   </Link>
                   </Button>     
               </Stack>   
            </div>
            {/* TODO: these True false headers I added should look nicer, some design spice needed here.just placeholders. */}
            <center>
            <h1> True / False </h1> 
            </center>
           <div className="images_container">
           
            <div className = "left">
                <UploadTrainingData isPositive={false} onDataChange={(images) => {}} />
            </div>
        <div className = "right">
            <UploadTrainingData isPositive={false} onDataChange={(images) => {}} />
        </div>            
       </div>
    </div>
     )
 }