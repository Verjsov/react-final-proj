import React from 'react';
import PropTypes from 'prop-types';

export function NumberInput({ id, value, onChange }) {
    const handleChange = (id,e) => {
        let v = e.target.value;
        v = v.replace(/\D/g,'');
        onChange(id,v);
    };

    return (
        <input style={{width: '95%'}} type="text" value={value} onChange={(e)=>handleChange(id,e)} />
    );
}

NumberInput.propTypes = {
    id: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
};