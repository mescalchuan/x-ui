import React from 'react'
export default function ({externalClass, children}) {
    return (
        <div className = {externalClass} >{children}</div>
    )
}