import React from "react";

export class Effect {
    constructor(id: String, label: String) {
        this.label = label;
        this.id = id;
    }

    public id: String;
    public label: String;
}

export const EffectsList: React.FC<{ effectsList: Effect[] }> = ({effectsList}) => {
    let effectItems = effectsList.map((i: Effect) => (
        <li className="collection-item">{i.label}</li>
    ));
    return (
        <ul className="collection">{effectItems}</ul>
    )
}