export default class LocalStoreService {
    static adicionarItem(chave, valor){
        localStorage.setItem(chave, JSON.stringify(valor))
    }

    static obterItem(chave){
        const item = localStorage.getItem(chave)
        return JSON.parse(item)
    }

    static removerItem(chave){
        localStorage.removeItem(chave)
    }
}