import React from "react";

export const PreviewArea: React.FC = () => (
    <div className="d-flex justify-content-center bg-dark" style={{minHeight: "400px"}}>
        <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>

)