import React from 'react';
import './App.css';
import {NavBar} from "./components/NavBar";
import {PreviewArea} from "./components/PreviewArea";
import {EffectsList} from "./components/EffectsList";
import {EffectsCatalogue} from "./components/EffectsCatalogue";
import {EffectSettings} from "./components/EffectSettings";
import { fadeIn } from './model/Effect';

function App() {
    let effectsList = [
       fadeIn,
    ];
    return <>
        <NavBar/>
        <div className="container">
            <PreviewArea/>
            <EffectsList effectsList={effectsList}/>
            <EffectsCatalogue effects={effectsList}/>
            <EffectSettings/>
        </div>
    </>
}

export default App;
