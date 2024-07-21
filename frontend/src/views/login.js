import React from "react";
import Card from '../components/card';
import FormGroup from '../components/form-group';

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        console.log('Email: ' + this.state.email);
        console.log('Senha: ' + this.state.senha);
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
                                            <button className="btn btn-lg btn-danger" type="button">Cadastrar</button> {/* Corrigido */}
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

export default Login;
