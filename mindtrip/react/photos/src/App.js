import React from 'react';
import ReactDOM from 'react-dom';
import PhotosManager from './components/PhotosManager';


export default function App() {
    return  <PhotosManager />
}

const wrapper = document.getElementById('react');
wrapper ? ReactDOM.render(<App />, wrapper) : null;
