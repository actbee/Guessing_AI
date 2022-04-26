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


const Input = styled('input')({
  display: 'none',
});

const UploadTrainingData = (props) => {
    // TODO: replace the line below with useRecoilState(...), see notes below for more info
    const [displayedImages, setDisplayedImages] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false)


const uploadDocuments = async (files) => {
    setIsLoading(true);
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
        //setDisplayedImages(values);
        
        // Note: If you want to have the images be appended, use something like the following:
        setDisplayedImages([...displayedImages, ...values])
        
        setIsLoading(false);
        // TODO: use recoil for keeping track of global state, 
        // INFO HERE -> https://recoiljs.org/docs/introduction/installation
        // e.g. 1) what images are in both "true" and "false" training sets.
        //      2) your trained naive bayes model, or the weights of the that model.

        // e.g. update recoil here by adding training data 
        // then retrain on all training data and update recoil atom for naive bayes weights.
    })

  };

    const updateImages = (newImages) => {        
        const images = uploadDocuments(Object.values(newImages.target.files));
        console.log(images);
    };

    return (
    <>
    


      {
        props.isPositive?
        <CheckIcon  sx = {{color: "green", fontSize: 50} }/> :
        <ClearIcon  sx = {{color: "red", fontSize: 50}} />
      }

       <IconButton aria-label="delete"  className = "delete_button" onClick={() => setDisplayedImages([])}>
          <DeleteIcon sx = {{fontSize: 40 }} />
       </IconButton>

                <div className = "data_body" >
                    {
                        isLoading ? <center><CircularProgress /></center> : 
                            displayedImages.map(
                                (image, index) => 
                                <img width={150} alt={'user inputted'} src={image} height={150} key={index} />)
                    }
                    </div>
                {/* TODO: we could make this button more friendly looking, 
                the commented out button below is pretty solid if you wanna go with that. */}
           

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
