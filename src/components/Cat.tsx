import { ConnectDropTarget, useDrop } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";

import catIdle from '../assets/cat_idle.gif';
import catOpenMouth from '../assets/cat_open_mouth.gif';
import catEating from '../assets/cat_eating.gif';
import eatingSound from '../assets/pou-eating.mp3';

import { useEffect, useMemo, useState } from "react";
interface DropMonitor{
    isOver: () => boolean;
    canDrop: ()=> boolean ;
}
type dropProps = [
    {isOver: boolean, 
    canDrop: boolean},
    drop: ConnectDropTarget
];
interface States {
    [key: string]: () => void;
}

const stateOptions = {
    idle: 'idle',
    open: 'open',
    eating: 'eating',
    brushing: 'brushing',
    medicating: 'medicating'
}
interface Images {
    [key: string]: string;
}
const images: Images = {
    idle: catIdle,
    open: catOpenMouth,
    eating: catEating,
}
export default function Cat() {
    const [state, setState] = useState(stateOptions.idle);
    const [busy, setBusy] = useState(false);
    const[{ isOver, canDrop }, drop]: dropProps = useDrop(() => (
        {
            accept: ItemTypes.ITEM,
            drop: (item:{name:string, type:string}) => {
                if(!item) return;
                console.log(item);
                
                const states: States = {
                    comida: ()=> ToEat(),
                    escova: ()=> console.log('Escovando'),
                    remedio: ()=> console.log('Dando remédio')
                };
                const action = states[item.name];
                action();
                
            },
            collect: (monitor: DropMonitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }
    ),[]);

    const ToEat = ()=> {
        console.log("comendo")
        setBusy(true);
        const audio = new Audio(eatingSound)
        audio.setAttribute('volume', '0.2');
        audio.play();
        setState(stateOptions.eating);
        setTimeout(()=> {
            setBusy(false);
        }, 2000);
       
    }
   useMemo(()=> {
        if(isOver){
            if(canDrop && !busy){
                setState(stateOptions.open);
            }
        }
   },[isOver]);
    return (
        <div ref={drop as any} className="cat" style={{
            width: "50vh",
            height: "50vh",

            alignSelf: 'stretch',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4rem',
        }}>
            <img src={images[state]} alt="" />
        </div>
    );
}