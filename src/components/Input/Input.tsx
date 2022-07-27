import React, {useEffect} from "react";
import PropTypes from "prop-types";

const Input = ({ type, value, placeholder, label }: InputDoc) => {
    
    useEffect(() => {

    }, []);
    
    return (
        <div className="control">
            {label ? <label className="label">{label}</label> : null}
            <input className="input" placeholder={placeholder || "Text goes here"} type={type} value={value} />
        </div>
    )
};

export default Input;

Input.propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'email', 'tel']).isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string
}

interface InputDoc {
    type?: string,
    value?: string | number,
    placeholder?: string,
    label?: string
    style?: string,
    disabled?: boolean,
    onChange?: Function
}