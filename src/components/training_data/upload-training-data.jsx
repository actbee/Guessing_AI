import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UploadIcon from '@mui/icons-material/Upload';
import "./training_data.css";
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import "./training_data.css";
import { displayedImages_yes, displayedImages_no} from '../../store';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import { uploadDocuments } from '../image-upload/image-uploader';
import { classifier } from '../../store';


const UploadTrainingData = (props) => {
  // TODO: replace the line below with useRecoilState(...), see notes below for more info
 // const [displayedImages, setDisplayedImages] = React.useState([]);
 const [isLoading, setIsLoading] = React.useState(false)
 const [yes_images, setyesImages] = useRecoilState(displayedImages_yes);
 const [no_images, setnoImages] = useRecoilState(displayedImages_no);
 const shownImages = props.isPositive? yes_images: no_images;
 const setshownImages = props.isPositive? setyesImages: setnoImages;


const Input = styled('input')({
  display: 'none',
});

    const updateImages = (newImages) => {        
        const images = uploadDocuments(Object.values(newImages.target.files), setshownImages, "training", shownImages, setIsLoading);
        console.log(images);
    };

    return (
    <>
    
      {
        props.isPositive?
        <CheckIcon  sx = {{color: "green", fontSize: 50} }/> :
        <ClearIcon  sx = {{color: "red", fontSize: 50}} />
      }

       <IconButton aria-label="delete"  className = "delete_button" onClick={() => setshownImages([])}>
          <DeleteIcon sx = {{fontSize: 40 }} />
       </IconButton>

                <div className = "data_body" >
                    {
                        isLoading ? <center><CircularProgress /></center> : 
                            shownImages.map(
                                (image, index) => 
                                <img width={150} alt={'user inputted'} src={image} height={150} key={index} />)
                    }
                    </div>

                <div className = "add_button" >
                <Input id = {props.inputid} accept="image/*" multiple type="file" onChange={updateImages} />
                <label htmlFor={props.inputid}>  
                 <IconButton color="primary" aria-label="upload picture" component="span">
                     <UploadIcon sx = {{fontSize: 50}} />
                </IconButton> 
                </label>
                </div>
                </>)

}

export default UploadTrainingData;
