import React from "react";

function FormGroup(props){
    return(
        <div className="form-group">
            <label for="exampleInputPassword1">{this.props.label}</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
    )
}