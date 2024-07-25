import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStoreService from "../../app/service/localstorageService";
import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
        
        

class consultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
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
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamento) =>{
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    deletar = () => {
        
        this.service
            .deletar(this.state.lancamentoDeletar)
            .then( response => {
                //pega os lançamentos
                const lancamentos = this.state.lancamentos;

                //separa por index
                const index = lancamentos.indexOf(this.lancamentoDeletar)

                //faz a exclusão no array
                lancamentos.splice(index, 1)

                //inclui novamente
                this.setState(lancamentos)

                //Atualizar depois da deleção
                this.setState({lancamentos: lancamentos, showConfirmDialog: false})
                this.buscar()

                messages.mostrarSucesso('Lançamento deletado com sucesso')
            }).catch(error => {
                messages.mostrarErro('Erro ao deletar o lançamento')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento
                    this.setState({lancamento});
                }
                messages.mostrarSucesso('Status atualizado com sucesso');
            } )
    }

    render(){

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar}/>
                <Button label="Cancelar"  icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-secondary"/>
            </div>
        )

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

                            <button onClick={this.buscar} className="btn btn-lg btn-success" type="button"><i className="pi pi-search"></i></button>
                            <button onClick={this.preparaFormularioCadastro} className="btn btn-lg btn-danger" type="button"><i className="pi pi-plus"></i></button>

                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable 
                                lancamentos={this.state.lancamentos} 
                                deleteAction={this.abrirConfirmacao} 
                                editAction={this.editar}
                                alterarStatus={this.alterarStatus}
                                />
                        </div>
                    </div>
                </div>
                <div>
                <Dialog 
                    header="Confirmação!"
                    footer={confirmDialogFooter}
                    visible={this.state.showConfirmDialog} 
                    style={{ width: '50vw' }} 
                    onHide={() => this.setState({showConfirmDialog: false})}>
                    <p className="m-0">
                        Confirma a exclusão deste lançamento?
                    </p>
                </Dialog>
                </div>      
            </Card>
        )
    }
}
export default withRouter(consultaLancamentos)
