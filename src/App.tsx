import React from 'react';
import './App.css';
import { ControlPanel } from './components/ControlPanel';
import { EffectsCatalogue } from "./components/EffectsCatalogue";
import { NavBar } from "./components/NavBar";
import { ProgramList } from "./components/ProgramList";


function App() {
    return <>
        <NavBar />
        <div className="container">

            <div className="row  mt-3">
                <div className="col-3">
                    <EffectsCatalogue />
                </div>
                <div className="col g-2">
                    {/* <PreviewArea /> */}
                    <ControlPanel />
                    <ProgramList />
                </div>
            </div>
        </div>
    </>
}

export default App;
