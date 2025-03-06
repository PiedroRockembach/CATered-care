import { ItemTypes } from "../types/ItemTypes";
import Cat from "./Cat";
import DraggableItem from "./DraggableItem";
import Slot from "./Slot";
export default function Panel() {
    return (
        <section className="panel">
          <div className="game-scene">
            <Cat/>
          </div>
          <div className="itens-menu">
            <Slot>
              <DraggableItem name="item1" content="Item 1" type={ItemTypes.ITEM}/>
            </Slot>
            <Slot>
              <DraggableItem name="item2" content="Item 2" type={ItemTypes.ITEM}/>
            </Slot>
            <Slot>

            </Slot>
          </div>
        </section>
    );
}
