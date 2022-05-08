import React from 'react';
import './App.css';
import { EffectsCatalogue } from "./components/EffectsCatalogue";
import { NavBar } from "./components/NavBar";
import { ProgramList } from "./components/ProgramList";


function App() {
    return <>
        <NavBar />
        <div className="container">
            <div className="row g-2 mt-3">
                <div className="col col-md-3">
                    <EffectsCatalogue />
                </div>
                <div className="col">
                    {/* <PreviewArea /> */}
                    <ProgramList />
                </div>
            </div>
        </div>
    </>
}

export default App;
