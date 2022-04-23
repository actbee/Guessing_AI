import * as React from 'react';

import "./training_data.css";
import { Button } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import "./training_data.css";

const UploadTrainingData = ({isPositive}) => {
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
        setDisplayedImages(values);
        
        // Note: If you want to have the images be appended, use something like the following:
        // setDisplayedImages([...displayedImages, ...values])
        
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
    
    
    <Button>
        <ClearIcon sx = {{color: "red", fontSize: 50}} onClick={() => setDisplayedImages([])}/>
    </Button>
                <div className = "right_body" >
                    {
                        isLoading ? <center><CircularProgress /></center> : 
                            displayedImages.map(
                                (image, index) => 
                                <img width={150} alt={'user inputted'} src={image} height={150} key={index} />)
                    }
                    </div>
                {/* TODO: we could make this button more friendly looking, 
                the commented out button below is pretty solid if you wanna go with that. */}
                <input
                accept="image/*"
                multiple
                type="file"
                onChange={updateImages} />
                <div className = "add_no" >
               
                {/* <IconButton color="primary" aria-label="upload picture" component="span">
                     <AddCircleIcon sx = {{fontSize: 50}} />
                </IconButton> */} 
                </div>
                </>)
}

export default UploadTrainingData;
