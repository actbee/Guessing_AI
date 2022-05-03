import * as ml5 from "ml5";
// npm install bayes
var bayes = require('bayes')
var classifier = bayes()
const processing_classifier = ml5.imageClassifier("MobileNet");
// Takes in objects detected in images as one string, and user label
export function trainNaiveBayes(imagearray, userLabel) {
	var imageLabels = [];
	for (var i =0; i<imagearray.length; i++){
		processing_classifier.predict(imagearray[i], 
			function (err, results) {
				  imageLabels.append(results[0].label);
				});
	}

    classifier.learn(imageLabels, userLabel)
}
// Takes in objects in image, outputs user label
export function predictLabel(imageLabels) {
    return classifier.categorize(imageLabels)
}