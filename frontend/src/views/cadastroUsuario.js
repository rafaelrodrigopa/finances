import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import {withRouter} from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService";
import { mostrarErro, mostrarSucesso } from "../components/toastr";



class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }


    cadastrar = () => {
       
        const { nome, email, senha, senhaRepeticao } = this.state;
        const usuario = { nome, email, senha, senhaRepeticao }

        try {
            this.service.validar(usuario);
        } catch (erro) {
            const msgs = erro.mensagens;
            msgs.forEach(msg => mostrarErro(msg));
            return false;
        }

        this.service.salvar(usuario)
            .then(response => {
                mostrarSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
                this.props.history.push('/login')
            })
            .catch(error => {
                mostrarErro(error.response.data)
            })

    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return(

            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">

                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input
                                    type="text"
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({
                                        nome: e.target.value
                                    })} />
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                <input
                                    type="email"
                                    id="emailHelp"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({
                                        email: e.target.value
                                    })} />
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="inputSenha">
                                <input
                                    type="password"
                                    id="inputSenha"
                                    className="form-control"
                                    name="senha"
                                    onChange={e => this.setState({
                                        senha: e.target.value
                                    })} />
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="inputRepitaSenha">
                                <input
                                    type="password"
                                    id="inputRepitaSenha"
                                    className="form-control"
                                    name="senha"
                                    onChange={e => this.setState({
                                        senhaRepeticao: e.target.value
                                    })} />
                            </FormGroup>

                            <button onClick={this.cancelar} className="btn btn-lg btn-danger" type="button">Cancelar</button>
                            <button onClick={this.cadastrar} className="btn btn-lg btn-success" type="button">Salvar</button>
                            
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(CadastroUsuario);