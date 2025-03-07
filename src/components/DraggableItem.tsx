import { ReactNode } from "react";
import { ConnectDragPreview, ConnectDragSource, DragPreviewImage, useDrag } from "react-dnd";
type dragProps = [
    props: {isDragging: boolean},
    drag: ConnectDragSource,
    prev?: ConnectDragPreview,
];
export type DraggableItemProps = {
    name: string;
    content: ReactNode;
    type: string;
    img?: string;
    };

export default function DraggableItem({name, content, type, img}: DraggableItemProps) {
    const [{ isDragging }, drag, prev]: dragProps = useDrag(() => ({
        type,
        item: { name, type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));
    return (
        <>
            {img && <DragPreviewImage connect={prev as any} src={img} />}
            <div ref={drag as any} id={name} className="draggable-item"
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                }}
            >
                {content}
            </div>
        </>
    );
}