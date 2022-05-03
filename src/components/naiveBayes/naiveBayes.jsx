import * as ml5 from "ml5";
import { classifier } from "../../store";
import {useRecoilState, useRecoilValue} from "recoil";
import { LocalDining } from "@mui/icons-material";

const processing_classifier = ml5.imageClassifier("MobileNet", modelLoaded);

const bayes = require('bayes');
const current_classifier = bayes();

function modelLoaded() {
	console.log('Model Loaded!');
  }
/*
function load_img(url){
	return new Promise((resolve, reject) => {
		const im = new Image()
        im.crossOrigin = 'anonymous'
        im.src = 'url'
        im.onload = () => {
          resolve(im)
        }
   })
}*/
function load_img(url){
	var img = new Image();
	img.onload = function(){
		document.getElementById('id1').setAttribute('src', this.src);
		document.getElementById('id1').setAttribute('width', this.width);
		document.getElementById('id1').setAttribute('height', this.height);
	};
	img.src = url;
	img.width = 500;
	img.height = 500;
	return img;
}
// Takes in objects detected in images as one string, and user label
export function TrainNaiveBayes(imagearray, userLabel) {
	//const [current_classifier, setclassifier] = useRecoilState(classifier);
	if(imagearray.length>0){
	var imageLabels = [];
	for (var i =0; i<imagearray.length; i++){
		// var img = new Image();
       // var imgpath = "../../public/training_data/yes/logo512.png";
	   console.log(imagearray[i]);
	   var img = load_img(imagearray[i]);
	//	var img = await load_img(imagearray[i]);
		processing_classifier.predict(img, 
			function (err, results) {
				if(err){
					console.log(err);
				}
				else{
				  imageLabels.push(String(results[0].className));
				  console.log("rr1", results[0]);
				}
			});
	}
    console.log("t1", imageLabels);
    current_classifier.learn(imageLabels, userLabel);
	// setclassifier(current_classifier);
   }
}

// Takes in objects in image, outputs user label
export function PredictLabel(image) {
	//const current_classifier = useRecoilValue(classifier)
	var imageLabel;
	//var img = await load_img(image[0]);
    var img = load_img(image[0]);
	processing_classifier.predict(img, 
		function (err, results) {
			if(err){
				console.log(err);
			}
			else{
			  imageLabel = String(results[0].className);
			  console.log("label",imageLabel);
			}
		});
    var predict;
	console.log("type of",typeof imageLabel);
    current_classifier.categorize("daisy").then(res =>{
		console.log("predict", res);
        predict = res;
		return predict;
	});
    
}