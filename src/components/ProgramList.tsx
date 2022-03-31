import React from "react";
import {Effect} from "../model/Effect";
import { useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";

export const ProgramList = () => {

    const effectsList = useSelector((state : RootState) =>state.programReducer.effects);
    return (
        <ul className="collection">{
            effectsList
                .map((i: Effect) => (
                    <li className="collection-item">{i.label}</li>
                ))
        }</ul>
    )
}