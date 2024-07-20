import React from "react";

function FormGroup(props){

    const { htmlFor, label, children } = props;

    return(
        <div className="form-group">
            <label htmlFor={htmlFor}>{label}</label>
            {children}
        </div>
    )
}
export default FormGroup;