import { ConnectDropTarget, useDrop } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";

import catIdle from '../assets/cat_idle.gif';
import catOpenMouth from '../assets/cat_open_mouth.gif';
import catEating from '../assets/cat_eating.gif';
import catLookingUp from '../assets/cat_looking_up.gif';
import catBrushing from '../assets/cat_brushing.gif';
import catMeowing from '../assets/cat_meow.gif';

import eatingSound from '../assets/pou-eating.mp3';
import brushSound from '../assets/brushsound.mp3';
import mew from '../assets/meow.mp3';
import {  useMemo, useState } from "react";
interface DropMonitor{
    isOver: () => boolean;
    canDrop: ()=> boolean ;
    getItem: ()=> any;
}
type dropProps = [
    {isOver: boolean, 
    canDrop: boolean, item: any},
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
    medicating: 'medicating',
    lookingUp: 'lookingUp',
    meowing: 'meowing'
}
interface Images {
    [key: string]: string;
}
const images: Images = {
    idle: catIdle,
    open: catOpenMouth,
    eating: catEating,
    brushing: catBrushing,
    lookingUp: catLookingUp,
    meowing: catMeowing
}
export default function Cat() {
    const [state, setState] = useState(stateOptions.idle);
    const [busy, setBusy] = useState(false);
    const[{ isOver, canDrop, item }, drop]: dropProps = useDrop(() => (
        {
            accept: ItemTypes.ITEM,
            drop: (item:{name:string, type:string}) => {
                if(!item) return;
                console.log(item);
                
                const states: States = {
                    comida: ()=> ToEat(),
                    escova: ()=> ToBrush(),
                    remedio: ()=> console.log('Dando remédio')
                };
                const action = states[item.name];
                action();
                
            },
            collect: (monitor: DropMonitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
                item: monitor.getItem(),
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

    const ToBrush = () => {
        console.log("escovando")
        setBusy(true);
        const audio = new Audio(brushSound)
        audio.setAttribute('volume', '1.5');
        audio.play();
        setState(stateOptions.brushing);
        setTimeout(()=> {
            setBusy(false);
        }, 3000);

    }
    const ToMeow = ()=>{
        if(busy) return;
        setBusy(true);
        const audio = new Audio(mew)
        audio.setAttribute('volume', '1');
        audio.play();
        setState(stateOptions.meowing);
        setTimeout(()=> {
            setBusy(false);
        }, 1000);
    }
    if(isOver){
        if(canDrop && !busy){
            if(state !== stateOptions.open && (item.name === 'comida'|| item.name == 'remedio') ){
                setState(stateOptions.open);
            }
            if(state !== stateOptions.lookingUp && item.name === 'escova'){
                setState(stateOptions.lookingUp);
            }
        }
    } else{
        if(state !== stateOptions.idle && !busy){
            setState(stateOptions.idle);
        }
    }
   useMemo(()=> {
        
   },[isOver]);
    return (
        <div ref={drop as any} className="cat" style={{
            width: "50vh",
            height: "50vh",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4rem',
        }}
        
        >
            <img src={images[state]} alt="" onClick={ToMeow}/>
        </div>
    );
}