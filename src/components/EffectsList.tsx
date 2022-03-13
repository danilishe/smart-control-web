import React from "react";
import {Effect} from "../model/Effect";

interface EffectsListProps {
    effectsList: Effect[];
}

export const EffectsList: React.FC<EffectsListProps> = (props) => {
    return (
        <ul className="collection">{
            props.effectsList
                .map((i: Effect) => (
                    <li className="collection-item">{i.label}</li>
                ))
        }</ul>
    )
}