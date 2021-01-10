import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './components/Home';


export default function App() {
    return  <Home />
}

const wrapper = document.getElementById('react');
wrapper ? ReactDOM.render(<App />, wrapper) : null;
