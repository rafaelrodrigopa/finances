import React from "react";
import Card from "../../components/card";
import FormGroup from '../../components/form-group'
import { withRouter } from "react-router-dom";
import SelectMenu from "../../components/selectMenu";
import * as messages from '../../components/toastr'
import LancamentoService from "../../app/service/lancamentoService";
import LocalStoreService from "../../app/service/localstorageService";


class CadastroLancamentos extends React.Component{

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){
        this.buscarPorId();
    }

    buscarPorId = () => {

        const params = this.props.match.params

        //A variavel contém o valor do id do lançamento
        //if(parseInt(params.id)>0){

        this.setState.id = params.id

            if(params.id){
                this.service.obterPorId(params.id)
                    .then(response => {


                        //Não estava pegando o id, então tive que desestruturar antes de pedir os dados para o setState, 
                        //excluido o id que já tinha sito passado via parametro url
                        const { id, ...rest } = response.data;
                        this.setState({ ...rest });
                        this.setState({...rest.data, atualizando: true})

                    }).catch(erros => {
                        messages.mostrarErro(erros.response.data)
                    })
            }
        //}
    }

    atualizar = () => {
        
        this.service
            .atualizar(this.state)
            .then( response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mostrarSucesso('Lançamento atualizado com sucesso')
            })
            .catch(error => {
                messages.mostrarErro("Erro ao cadastrar")
            })

    }

    // eslint-disable-next-line
    subimit = () => {
        const usuarioLogado = LocalStoreService.obterItem('_usuario_logado')
        
        const { descricao,valor,mes,ano,tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };

        this.service
            .salvar(lancamento)
            .then( response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mostrarSucesso('Lançamento cadastrado com sucesso')
            })
            .catch(error => {
                messages.mostrarErro("Erro ao cadastrar")
            })

    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        
        this.setState({ [name] : value})
    }

    render(){

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        return(
            <Card title={ this.state.atualizando ? 'Atualização de lançamento' : 'Cadastro de lançamento' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input 
                                id="inputDescricao" 
                                type="text" 
                                className="form-control" 
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange}
                                />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" 
                            type="text" 
                            className="form-control" 
                            name="ano"
                            value={this.state.ano}
                            onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" 
                                        lista={meses} 
                                        className="form-control"
                                        name="mes"
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                                        />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input 
                                id="inputValor" 
                                type="text" 
                                className="form-control"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu 
                                id="inputTipo" 
                                lista={tipos} 
                                className="form-control"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange}
                                />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="status"
                                value={this.state.status}
                                disabled/>
                        </FormGroup>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            {
                                this.state.atualizando ?
                                (<button onClick={this.atualizar} className="btn btn-primary">Atualizar</button>):
                                (<button onClick={this.subimit} className="btn btn-success">Salvar</button>)
                            }
                            <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(CadastroLancamentos)