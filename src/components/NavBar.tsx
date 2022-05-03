import React, { MouseEventHandler, useRef } from "react";
import Parameters from "../parameters";

export const NavBar = () => {
    const downloadLinkRef = useRef<HTMLAnchorElement>(null)
    const exportProgram: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        const file = new Blob([ 'jj90099093dasdfswe323425gtwdr453' ], {
            type: "application/octet-stream",
        })
        const reader = new FileReader();
        reader.onload = () => {
            downloadLinkRef.current!.href = reader.result as string;
            downloadLinkRef.current!.click();
        }
        reader.readAsDataURL(file);
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
               download={Parameters.defaultExportFileName}
               target="_self" hidden />
        </nav>);
}