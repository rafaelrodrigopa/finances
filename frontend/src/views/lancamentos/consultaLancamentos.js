import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStoreService from "../../app/service/localstorageService";
import * as messages from '../../components/toastr'

class consultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {

        if(!this.state.ano){
            messages.mostrarErro('O preenchimento do campo Ano é obritório.')
            return false;
        }

        const usuarioLogado = LocalStoreService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then( response => {
                this.setState({ lancamentos: response.data})
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log('Editando o lançamento', id)
    }

    deletar = (lancamento) => {
        
        this.service
            .deletar(lancamento)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento)
                lancamentos.splice(index, 1)
                this.setState(lancamentos)

                messages.mostrarSucesso('Lançamento deletado com sucesso')
            }).catch(error => {
                messages.mostrarErro('Erro ao deletar o lançamento')
            })
    }

    render(){

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        return(
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">

                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                    className="form-control" id="exampleInputEmail1"
                                    value={this.state.ano}
                                    onChange={e => {
                                        this.setState({ano: e.target.value})
                                    }}
                                    placeholder="Digite o ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: *">
                                <SelectMenu id="inputMes" 
                                            className="form-control" 
                                            value={this.state.mes}
                                            onChange={e => {
                                                this.setState({mes: e.target.value})
                                            }}
                                            lista={meses} />
                            </FormGroup>
                            
                            <FormGroup htmlFor="inputDescricao" label="Descricao: *">
                                <input type="text"
                                        id="inputDescricao" 
                                        className="form-control"
                                        value={this.state.descricao}
                                        onChange={e => {
                                            this.setState({descricao: e.target.value})
                                        }}
                                        placeholder="Digite a descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo de lançamento: *">
                                <SelectMenu id="inputTipo" 
                                            className="form-control" 
                                            value={this.state.status}
                                            onChange={e => {
                                                this.setState({status: e.target.value})
                                            }}
                                            lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar} className="btn btn-lg btn-success" type="button">Buscar</button>
                            <button className="btn btn-lg btn-danger" type="button">Cadastrar</button>

                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} deleteAction={this.deletar} editAction={this.editar} />
                        </div>
                    </div>
                </div>                

            </Card>
        )
    }
}
export default withRouter(consultaLancamentos)

