import { ReactNode } from "react";
import { ConnectDragPreview, ConnectDragSource, useDrag } from "react-dnd";
type dragProps = [
    props: {isDragging: boolean},
    drag: ConnectDragSource,
    prev?: ConnectDragPreview,
];
export type DraggableItemProps = {
    name: string;
    content: ReactNode;
    type: string;
    };

export default function DraggableItem({name, content, type}: DraggableItemProps) {
    const [{ isDragging }, drag]: dragProps = useDrag(() => ({
        type,
        item: { name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));
    return (
        <div ref={drag as any} id={name} className="draggable-item">
            {content}
        </div>
    );
}