import React from 'react';

function Button (props) {
    return (
        <div className='saveButton' onClick={props.clickHandler}>{props.content}</div>
    );
}

export default Button;