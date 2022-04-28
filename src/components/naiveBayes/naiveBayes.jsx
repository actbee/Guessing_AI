<script src="https://unpkg.com/ml5@0.4.3/dist/ml5.min.js"></script>
// npm install bayes
var bayes = require('bayes')
​
var classifier = bayes()
​
const processing_classifier = ml5.imageClassifier("MobileNet", modelLoaded);​


// Takes in objects detected in images as one string, and user label
function trainNaiveBayes(imagearray, userLabel) {
	var imageLabels = [];
	for (var i =0; i<imagearray.length; i++){
		processing_classifier.predict(imagearray[i], 
			function (err, results) {
				  imageLabels.append(results[0].label);
				});
	}

    classifier.learn(imageLabels, userLabel)
}
​
// Takes in objects in image, outputs user label
function predictLabel(imageLabels) {
    return classifier.categorize(imageLabels)
}
​