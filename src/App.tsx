import React from 'react';
import './App.css';
import { NavBar } from "./components/NavBar";
import { PreviewArea } from "./components/PreviewArea";
import { ProgramList } from "./components/ProgramList";
import { EffectsCatalogue } from "./components/EffectsCatalogue";
import { EffectSettings } from "./components/EffectSettings";

function App() {
    return <>
        <NavBar/>
        <div className="container">

            <div className="row mt-3">
                <div className="col-3">
                    <EffectsCatalogue/>
                </div>
                <div className="col g-2">
                    <PreviewArea/>
                    <div className="container">
                        <button className="m-2 btn btn-outline-secondary">Настройки</button>
                        <button className="m-2 btn btn-outline-secondary">Сохранить</button>
                        <button className="m-2 btn btn-outline-primary">Экспорт</button>
                    </div>
                    <ProgramList/>
                </div>
                <div className="col-3">
                    <EffectSettings/>
                </div>
            </div>
        </div>
    </>
}

export default App;
