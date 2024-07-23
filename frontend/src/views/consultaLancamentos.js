import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import SelectMenu from "../components/selectMenu";

class consultaLancamentos extends React.Component{

    render(){

        const lista = [
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12}
        ]

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

                            <FormGroup htmlFor="inputMes" label="Mês: *">
                                <SelectMenu className="form-control" lista={lista} />
                            </FormGroup>

                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(consultaLancamentos)