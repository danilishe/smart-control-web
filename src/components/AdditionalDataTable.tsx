import { AdditionalProperties } from "../model/Effect";
import React from "react";

interface AdditionalDataTableProps {
    data?: AdditionalProperties;
}

export function AdditionalDataTable({ data }: AdditionalDataTableProps) {
    if (data === undefined || Object.keys(data).length === 0) return <></>
    else return (
        <table className={"table"}>
            <thead>
            <tr>
                {Object.keys(data).map((h, i) => <th scope="col" key={i}>{h}</th>)}
            </tr>
            </thead>
            <tbody>
            <tr>
                {Object.values(data).map((v, i) => <td key={i}>{v}</td>)}
            </tr>
            </tbody>
        </table>
    );
}
