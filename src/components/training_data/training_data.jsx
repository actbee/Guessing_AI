import "./training_data.css";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import UploadTrainingData from './upload-training-data';

var yes_images = [];
var no_images = [];

export default function Data() {
    const importAll = (r) => {
        return r.keys().map(r);
    }
        yes_images = importAll(require.context('../../../public/training_data/yes/', false, /\.(png|jpe?g|svg)$/));
        no_images = importAll(require.context('../../../public/training_data/no/', false, /\.(png|jpe?g|svg)$/));
    return(
       <div className = 'data'>
           <div className = "menu" id = "menu">
               <Button size="large" variant="contained">
               <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                   Back
                   </Link>
                   </Button>              
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