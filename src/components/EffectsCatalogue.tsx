import React from "react";
import {Effect} from "../model/Effect";

export const EffectsCatalogue: React.FC<{effects : Effect[]}> = ({effects}) => (
           <ul className="collection">
                   {effects.map(effect => <li key={effect.id}>{effect.label} Длина: {effect.framesCount()} кадров</li>)}
           </ul>
)