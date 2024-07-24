import React from "react";
import Card from '../components/card';
import FormGroup from '../components/form-group';
import {withRouter} from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService";
import LocalStoreService from "../app/service/localstorageService";
import { mostrarErro } from "../components/toastr";

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            LocalStoreService.adicionarItem('_usuario_logado', response.data)
            //localStorage.setItem('_usuario_logado',JSON.stringify(response.data))
            this.props.history.push('/home')
        } ).catch(erro => {
            mostrarErro(erro.response.data)
        })
    }

    prepareCadastrar = () => {
        this.props.history.push("/cadastro-usuarios")
    }

    render() {
        return (

            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>

                                            <FormGroup htmlFor="exampleInputEmail1" label="Email: *">
                                                <input
                                                    type="email"
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })} // Corrigido
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                            </FormGroup>

                                            <FormGroup htmlFor="exampleInputPassword1" label="Senha: *"> {/* Corrigido */}
                                                <input
                                                    type="password"
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })} // Corrigido
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Password" />
                                            </FormGroup>
                                            
                                            <button onClick={this.prepareCadastrar} className="btn btn-lg btn-danger" type="button">Cadastrar</button> {/* Corrigido */}
                                            <button onClick={this.entrar} className="btn btn-lg btn-success" type="button">Entrar</button> {/* Corrigido */}
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
