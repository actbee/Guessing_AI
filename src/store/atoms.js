import {atom} from "recoil";


export const displayedImages = atom({
    key: "displayedImages",
    default: [],
})

export const isLoading = atom({
    key: "isLoading",
    default: false,
})