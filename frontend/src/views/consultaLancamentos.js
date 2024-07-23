import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../components/card";
import FormGroup from "../components/form-group";

class consultaLancamentos extends React.Component{

    render(){
        return(
            <Card title="Consulta Lançamentos">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                    className="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o ano" />
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(consultaLancamentos)