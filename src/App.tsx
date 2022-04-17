import React, { useRef } from 'react';
import './App.css';
import { NavBar } from "./components/NavBar";
import { PreviewArea } from "./components/PreviewArea";
import { ProgramList } from "./components/ProgramList";
import { EffectsCatalogue } from "./components/EffectsCatalogue";
import Parameters from "./parameters";


function App() {

    const downloadLinkRef = useRef<HTMLAnchorElement>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    const exportProgram = () => {
        const file = new Blob([ 'jj9009909вапывапыв90апыва9п9ывафы0l' ], {
            type: "application/octet-stream",
        })
        const reader = new FileReader();
        reader.onload = () => {
            downloadLinkRef.current!.href = reader.result as string;
            downloadLinkRef.current!.click();
        }
        reader.readAsDataURL(file);
    }

    return <>
        <NavBar />
        <div className="container">

            <div className="row mt-3">
                <div className="col-3">
                    <EffectsCatalogue />
                </div>
                <div className="col g-2">
                    <PreviewArea />
                    <div className="container">
                        <button className="m-2 btn btn-outline-secondary">Настройки</button>
                        <button className="m-2 btn btn-outline-secondary">Сохранить</button>
                        <button onClick={exportProgram} className="m-2 btn btn-outline-primary">Экспорт</button>
                        <a ref={downloadLinkRef} href="" type="application/octet-stream"
                           download={Parameters.defaultExportFileName} target="_self" hidden />
                        <input ref={fileRef} type="file" className="file" />
                    </div>
                    <ProgramList />
                </div>
            </div>
        </div>
    </>
}

export default App;
