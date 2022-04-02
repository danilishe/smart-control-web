import React from "react";
import { Effect } from "../model/Effect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import { effectAdd } from "../reducer/programReducer";

export const EffectsCatalogue = () => {
    const effectsList = useSelector((state: RootState) => state.effectsReducer.effects);
    return (
        <ul className="collection">
            {effectsList.map(effect => <EffectCatalogueItem key={effect.id} effect={effect}/>)}
        </ul>
    )
}

interface ItemProps {
    effect: Effect
}

const EffectCatalogueItem: React.FC<ItemProps> = ({ effect }) => {
    let dispatch = useDispatch();

    return (
        <div className="card text-dark bg-light mb-3" onClick={(e) => {
            e.preventDefault();
            dispatch(effectAdd(effect));
        }}>
            <div className="card-header">{effect.label}</div>
            <div className="card-body">
                <p className="card-text">{effect.description}</p>
            </div>
        </div>
    )
}