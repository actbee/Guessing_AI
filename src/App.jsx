import './App.css';
import {useState} from "react"
import { Route, Routes } from "react-router-dom";
import Main from "./components/main/main"
import Error from "./components/error"
import Data from "./components/training_data/training_data"
import {RecoilRoot} from "recoil";


function App() {
  return (
    <div className="App">
      <RecoilRoot>
      <Routes>
        <Route path="/" element = {<Main />} exact/>
        <Route path="/data" element = {<Data />} exact/>
        <Route element={<Error />} />
      </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
