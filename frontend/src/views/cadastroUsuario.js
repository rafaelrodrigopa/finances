import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
    }

    cadastrar = () => {
        console.log(this.state)
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

                            <button className="btn btn-lg btn-danger" type="button">Cancelar</button>
                            <button onClick={this.cadastrar} className="btn btn-lg btn-success" type="button">Salvar</button>
                            
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default CadastroUsuario;