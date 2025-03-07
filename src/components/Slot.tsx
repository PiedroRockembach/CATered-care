import React from "react"
import slotPng from '../assets/slot.png'
export default function Slot({children}: {children?: React.ReactNode}) {
    return (
        <div className="slot" style={{backgroundImage: `url(${slotPng})`}}
        >
            {children}
        </div>
    )
}