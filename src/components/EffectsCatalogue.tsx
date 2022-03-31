import React from "react";
import { Effect } from "../model/Effect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import { effectAdd } from "./actions";

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
        <div className="card text-dark bg-light mb-3" onClick={() => dispatch(effectAdd(effect))}>
            <div className="card-header">{effect.label}</div>
            <div className="card-body">
                <h5 className="card-title">{effect.description}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content. </p>
            </div>
            {/*<button type="button" className="btn-close" aria-label="Close"/>*/}
        </div>
    )
}