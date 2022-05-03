import {atom} from "recoil";

var bayes = require('bayes')

export const displayedImages_yes = atom({
    key: "displayedImages_yes",
    default: [],
})

export const displayedImages_no = atom({
    key: "displayedImages_no",
    default: [],
})

export const classifier = atom({
    key: "classifier",
    default : bayes()
})
