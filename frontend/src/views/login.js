import React from "react";
import Card from '../components/card'

class Login extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                        <div className="bs-docs-section">
                            <Card title="login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <div className="form-group">
                                                    <label for="exampleInputEmail1">Email: *</label>
                                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite o Email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label for="exampleInputPassword1">Senha: *</label>
                                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;