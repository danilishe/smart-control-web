import React, { useRef } from "react";
import Parameters from "../parameters";


export const ControlPanel = () => {
    const downloadLinkRef = useRef<HTMLAnchorElement>(null)
    const exportProgram = () => {
        const file = new Blob(['jj90099093dasdfswe323425gtwdr453'], {
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
        <div className="container">
            <button className="m-2 btn btn-outline-secondary">Настройки</button>
            <button className="m-2 btn btn-outline-secondary">Сохранить</button>
            <button onClick={exportProgram} className="m-2 btn btn-outline-primary">Экспорт</button>
            <a ref={downloadLinkRef} href="" type="application/octet-stream" download={Parameters.defaultExportFileName} target="_self" hidden />
        </div>
    );
}

