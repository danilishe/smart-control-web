import React from "react";
import { Effect } from "../model/Effect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import { effectAdd, effectRemove } from "../reducer/programReducer";
import { ProgramItemCard } from "./ProgramItemCard";
import { AnimatePresence, motion } from "framer-motion";

export const ProgramList = () => {
    const dispatch = useDispatch();
    const effectsList = useSelector((state: RootState) => state.programReducer.effects);
    return (
        <div className="collection">
            <AnimatePresence>
                {effectsList.map((effect: Effect, index) => {
                    return (
                        <motion.div key={effect.id} className="collection-item m-2"
                                    initial={{ scale: 0.7, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.7, opacity: 0 }}
                        >
                            <ProgramItemCard
                                effect={effect}
                                index={index}
                                onClose={() => dispatch(effectRemove(effect))}
                                onCopy={() => dispatch(effectAdd(effect))} />
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}