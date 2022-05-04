import * as ml5 from "ml5";
import { classifier } from "../../store";
import {useRecoilState, useRecoilValue} from "recoil";
import { LocalDining } from "@mui/icons-material";

const processing_classifier = ml5.imageClassifier("MobileNet", modelLoaded);

const bayes = require('bayes');

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

const preProcessImages = async (images) => {
	const imageLabelPromises = images.map((image) => {
		return new Promise((resolve, reject) => {
			const loadedImage = load_img(image);
			return processing_classifier.predict(loadedImage, (error, results) => {
				if (error) {
					console.log("Encountered an error pre-processing image", error);
					resolve('');
				} else {
					resolve(results[0].className);
				}
			});
		});
	});
	return await Promise.all(imageLabelPromises).then((labels) => {
		if (labels.length === 0) {
			return '';
		}
		const joinedLabels = labels.join(', ');
		console.log("joined labels: ", joinedLabels);
		return joinedLabels;
	});
}

export async function TrainNaiveBayes(positiveImages, negativeImages, updateModel) {
	const positiveLabels = await preProcessImages(positiveImages);
	const negativeLabels = await preProcessImages(negativeImages);
	const naiveBayesModel = bayes(); // generate new NB model
	await naiveBayesModel.learn(positiveLabels, 'positive');
	await naiveBayesModel.learn(negativeLabels, 'negative');
	updateModel(naiveBayesModel);
}


// Takes in objects detected in images as one string, and user label
// export function TrainNaiveBayes2(imagearray, userLabel) {
// 	//const [current_classifier, setclassifier] = useRecoilState(classifier);
// 	if(imagearray.length>0){
// 	for (var i =0; i<imagearray.length; i++){
// 		// var img = new Image();
//        // var imgpath = "../../public/training_data/yes/logo512.png";
// 	   console.log(imagearray[i]);
// 	   var img = load_img(imagearray[i]);
// 	//	var img = await load_img(imagearray[i]);
// 		processing_classifier.predict(img, 
// 			function (err, results) {
// 				if(err){
// 					console.log(err);
// 				}
// 				else{
// 				  const imageLabel = results[0].className;
// 				  (async () => {
// 					  await current_classifier.learn(imageLabel, userLabel).then(value => {
// 					console.log("success");
// 					console.log(value);
					
// 				}, reason =>{
// 					console.log("failed");
// 					console.log(reason);
// 				});
// 			})();
// 				  console.log("type of", imageLabel);
// 				  console.log("training", imageLabel);
// 				}
// 			});
// 	}
/*
    current_classifier.learn(imageLabel, userLabel).then(()=>{
		console.log("success");
	});
*/
	// setclassifier(current_classifier);
//    }
// }

export const PredictLabel = (image, setResult, naiveBayesModel, setIsPredicting) => {
	setIsPredicting(true);
	const loadedImage = load_img(image[0]);
	debugger;
	processing_classifier.predict(loadedImage, (error, results) => {
		if (error) {
			debugger;
			setIsPredicting(false);
			console.log("Encountered an error pre-processing image", error);
			return;
		}
		const preProcessedTags = results[0].className;
		console.log('Predicting using tags: ', preProcessedTags);
		naiveBayesModel.categorize(preProcessedTags).then(res =>{
			setIsPredicting(false);
			console.log("predict", res);
			setResult(res === 'positive');
		}, reason =>{
			console.log("failed");
			setIsPredicting(false);
		});
	});
}

// Takes in objects in image, outputs user label
// export function PredictLabel(image, setres, ispredicting) {
// 	//const current_classifier = useRecoilValue(classifier)
// 	var imageLabel = "home";
// 	//var img = await load_img(image[0]);
//     var img = load_img(image[0]);
// 	processing_classifier.predict(img, 
// 		function (err, results) {
// 			if(err){
// 				console.log(err);
// 			}
// 			else{
// 			  console.log("PREDICT");
// 		      console.log(results);
// 			  imageLabel = results[0].className;
// 			  console.log("label",imageLabel);
// 			}
// 		});
// 	console.log("Image", imageLabel);
//     current_classifier.categorize(imageLabel).then(res =>{
// 		console.log("predict", res);
//         setres(res)
// 		ispredicting(false);
// 	}, reason =>{
// 		console.log("failed");
// 		ispredicting(false);
// 	});
    
// }