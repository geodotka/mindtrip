import React from 'react';
import ReactDOM from 'react-dom';
import PhotoManager from './components/PhotoManager';


export default function App() {
    return  <PhotoManager />
}

const wrapper = document.getElementById('react');
wrapper ? ReactDOM.render(<App />, wrapper) : null;
