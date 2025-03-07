import { ItemTypes } from "../types/ItemTypes";
import Cat from "./Cat";
import DraggableItem from "./DraggableItem";
import Slot from "./Slot";

import carrot from '../assets/carrot.png';
import brush from '../assets/brush.png';
export default function Panel() {
    return (
        <section className="panel">
          <div className="game-scene">
            <Cat/>
          </div>
          <div className="itens-menu">
            <Slot>
              <DraggableItem name="comida" content={<img src={carrot}/>} type={ItemTypes.ITEM} img={carrot}/>
            </Slot>
            <Slot>
              <DraggableItem name="escova" content={<img src={brush}/>} type={ItemTypes.ITEM} img={brush}/>
            </Slot>
            <Slot>

            </Slot>
          </div>
        </section>
    );
}
