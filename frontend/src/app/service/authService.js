import LocalStoreService from "./localstorageService";

export const USUARIO_LOGADO = '_usuario_logado';

export default class AuthService {
    static isUsuarioAutenticado(){
        const usuario = LocalStoreService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        LocalStoreService.removerItem(USUARIO_LOGADO)
    }
}