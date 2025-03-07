import React from "react"
import slotPng from '../assets/slot.png'
export default function Slot({children}: {children?: React.ReactNode}) {
    return (
        <div className="slot" 
    
        style={{
            backgroundImage: 'url(' + slotPng + ')',
            height: '100px',
            width: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            {children}
        </div>
    )
}