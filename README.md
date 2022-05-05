# Getting Started with Create React App

## Opening the Terminal
Mac: type "terminal" into spotlight search (usually command-space) and open the first result. If this doesn't work, see [alternatives](https://setapp.com/how-to/how-to-open-terminal-on-mac?ci=16866791938&adgroupid=137159863164&adpos=&ck=terminal%20app%20mac&targetid=kwd-299340377240&match=p&gnetwork=g&creative=592503194158&placement=&placecat=&accname=setapp&gclid=Cj0KCQjwpcOTBhCZARIsAEAYLuVWE53tYVhornpYBBdP7A6NuYHll5noeB-lvCIfEtc-181YYm3M0NYaAtqjEALw_wcB)

Windows: type "terminal" into the Windows search bar and open the first result. Then, download and install [Git](https://git-scm.com/download/win)

## Clone the Repo
To download the program onto the desktop, run the following commands in the terminal (separately):
```
cd Desktop
git clone https://github.com/actbee/Guessing_AI.git
```

## Install Dependencies
Run the following commands. This installation may take a bit.
```
npm install
npm install ml5
npm install bayes
```

## Start the Local Server
```
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Using the Program
To upload training data, click on the DATA button and upload images to both sides (left for yes, right for no). Then, click TRAIN, and go BACK to test the program.

To predict whether an image is a "yes" or "no", upload the image in the front page (with the PREDICT button), then click PREDICT. The prediction should be displayed on the right.
