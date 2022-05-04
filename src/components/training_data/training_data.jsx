import "./training_data.css";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadTrainingData from './upload-training-data';
import Stack from '@mui/material/Stack';
import {TrainNaiveBayes} from '../naiveBayes/naiveBayes'
import {useRecoilValue, useRecoilState } from 'recoil'
import { displayedImages_no, displayedImages_yes, classifier } from "../../store"


export default function Data() {

    const yes_images = useRecoilValue(displayedImages_yes);
    const no_images = useRecoilValue(displayedImages_no);
    const [_naiveBayesClassifier, setNaiveBayesClassifier] = useRecoilState(classifier);


    const train = () => {
        TrainNaiveBayes(yes_images, no_images, setNaiveBayesClassifier);
    }

    return(
       <div className = 'data'>
           <div className = "menu" id = "menu">
           <Stack spacing={20} direction = "row">
               <Button size="large" variant="contained">
               <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                   Back
                   </Link>
                   </Button>  
                <Button size="large" variant="contained" onClick = {train}>
                    Train
                </Button>
            </Stack>
            </div>

           <div className="images_container">
           
            <div className = "data_editor" id="editor1">
                <UploadTrainingData inputid = "1" isPositive={true} onDataChange={(images) => {}} />
            </div>
        <div className = "data_editor" id="editor2">
            <UploadTrainingData inputid = "2" isPositive={false} onDataChange={(images) => {}} />
        </div>            
       </div>
    </div>
     )
 }