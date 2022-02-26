import React from 'react';
import './App.css';
import {NavBar} from "./components/NavBar";
import {PreviewArea} from "./components/PreviewArea";
import {EffectsList, Effect} from "./components/EffectsList";
import {EffectsCatalogue} from "./components/EffectsCatalogue";
import {EffectSettings} from "./components/EffectSettings";

function App() {
    let effectsList : Effect[]  = [
        new Effect("sdfs", "label 1"),
        new Effect("sdfhk", "label 8"),
        new Effect("hlj", "label 21"),
        new Effect("sdflkjs", "label 1"),
        new Effect("sdfhls", "label 2"),
        new Effect("sdljkhfs", "label 1"),
        new Effect("kjlh", "label 2"),
    ];
    return <>
        <NavBar/>
        <div className="container">
            <PreviewArea/>
            <EffectsList effectsList={effectsList}/>
            <EffectsCatalogue/>
            <EffectSettings/>
        </div>
    </>
}

export default App;
