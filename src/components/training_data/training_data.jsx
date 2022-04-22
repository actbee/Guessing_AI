import "./training_data.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Input = styled('input')({
    display: 'none',
  });
  
var yes_images = [];
var no_images = [];

export default function Data(){
    const importAll = (r) => {
        return r.keys().map(r);
    }
        yes_images = importAll(require.context('../../../public/training_data/yes/', false, /\.(png|jpe?g|svg)$/));
        no_images = importAll(require.context('../../../public/training_data/no/', false, /\.(png|jpe?g|svg)$/));
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
           <div className="images_container">
            <div className = "left">
                <CheckIcon sx = {{color: "green", fontSize: 50}}/>
                <div className = "left_body" >
                    {
                        yes_images.map((image, index) => <img width = {150} height = {150} key = {index} src = {image} alt="info"></img>)
                    }
                    </div>
                <div className = "add_yes" >
                <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                     <AddCircleIcon sx = {{fontSize: 50}} />
                </IconButton>
                </label>
                </div>
            </div> 
            <div className = "right">
                <ClearIcon sx = {{color: "red", fontSize: 50}}/>
                <div className = "right_body" >
                    {
                        no_images.map((image, index) => <img width = {150} height = {150} key = {index} src = {image} alt="info"></img>)
                    }
                    </div>
                <div className = "add_no" >
                <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                     <AddCircleIcon sx = {{fontSize: 50}} />
                </IconButton>
                </label>
                </div>
                </div>  
            </div>            
       </div>
     )
 }