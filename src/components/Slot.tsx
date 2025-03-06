import React from "react"

export default function Slot({children}: {children?: React.ReactNode}) {
    return (
        <div className="slot" 
        style={{
            backgroundColor: '#fdfdfd',
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