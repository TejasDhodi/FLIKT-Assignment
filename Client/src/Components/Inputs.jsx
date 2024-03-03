import React from 'react'

const Inputs = ({ name, type, id, heading, handleInputs, value, errors }) => {
    return (
        <>
            <div className='inputs'>
                <label htmlFor={id}>{heading}</label>
                <input type="text" name={name} id={type} value={value} onChange={handleInputs} />
            </div>
        </>
    )
}

export default Inputs
