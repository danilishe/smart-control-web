import React, { MouseEventHandler, useRef } from "react";
import { useSelector } from "react-redux";
import { exportAsB64 } from "../model/exporters";
import AppParams, { ProgramSettings } from "../defaultParams";
import { RootState } from "../reducer/rootReducer";

export const NavBar = () => {
    const program = useSelector((state: RootState) => state.programReducer.effects);
    const downloadLinkRef = useRef<HTMLAnchorElement>(null)
    const exportProgram: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        downloadLinkRef.current!.href = exportAsB64(ProgramSettings, program);
        downloadLinkRef.current!.click();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" target="_blank" href="https://is-led.ru">Smart Control Web</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-current="page" href="\">Настройки</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="\">Сохранить</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" onClick={exportProgram}>Экспорт</a>
                        </li>
                    </ul>
                </div>
            </div>
            <a ref={downloadLinkRef} href=""
                type="application/octet-stream"
                download={AppParams.defaultExportFileName}
                target="_self" hidden />
        </nav>);
}