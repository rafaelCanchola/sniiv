import React from 'react';
import './App.css';
import {Route} from 'react-router';
import Layout from "./components/Main/Layout";
import Home from "./components/Home";
import {BrowserRouter} from "react-router-dom";
function App() {
  return (
      <Home/>
  );
}

export default App;
