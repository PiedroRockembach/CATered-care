import { ConnectDropTarget, useDrop } from "react-dnd";
import { ItemTypes } from "../types/ItemTypes";

interface DropMonitor{
    isOver: () => boolean;
    canDrop: ()=> boolean ;
}
type dropProps = [
    {isOver: boolean, 
    canDrop: boolean},
    drop: ConnectDropTarget
];
export default function Cat() {
    const[{ isOver, canDrop }, drop]: dropProps = useDrop(() => (
        {
            accept: ItemTypes.ITEM,
            drop: (item:any) => console.log(item),
            collect: (monitor: DropMonitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }
    ),[]);
    if (isOver || canDrop) console.log('Over');
    return (
        <div ref={drop as any} className="cat" style={{
            backgroundColor: '#fdfdfd',
            height: '50vh',
            width: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '4rem',
        }}>
            &#128568;
        </div>
    );
}