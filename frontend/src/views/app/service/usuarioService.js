import ApiService from "../apiservice";

class UsuarioService extends ApiService{
    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar',credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.getObterSaldo(`/${id}/saldo`)
    }
}
export default UsuarioService;