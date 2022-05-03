import * as ml5 from "ml5";
import { classifier } from "../../store";
import {useRecoilState, useRecoilValue} from "recoil";

const processing_classifier = ml5.imageClassifier("MobileNet");

var bayes = require('bayes');
var current_classifier = bayes();
// Takes in objects detected in images as one string, and user label
export function TrainNaiveBayes(imagearray, userLabel) {
	//const [current_classifier, setclassifier] = useRecoilState(classifier);
	var imageLabels = [];
	for (var i =0; i<imagearray.length; i++){
		processing_classifier.predict(imagearray[i], 
			function (err, results) {
				  imageLabels.append(results[0].label);
				});
	}

    current_classifier.learn(imageLabels, userLabel);
	// setclassifier(current_classifier);
}

// Takes in objects in image, outputs user label
export function PredictLabel(image) {
	//const current_classifier = useRecoilValue(classifier)
	var imageLabel;
	processing_classifier.predict(image, function (err, results) {
		imageLabel = results[0].label;
	  });
    return current_classifier.categorize(imageLabel)
}