import React from "react";
import currencyFormatter from "currency-formatter";

// eslint-disable-next-line
export default props => {

    //Previne que lint de erro caso seja passado um array vazio
    const lanc = props.lancamentos || [];

    // eslint-disable-next-line
    const rows = lanc.map( (lancamento) => {
        return(
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{ currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button 
                        type="button" title="efetivar"
                        disabled={lancamento.status !== 'PENDENTE'}
                        className="btn btn-success" 
                        onClick={e => props.alterarStatus(lancamento,'EFETIVADO')}>
                            <i className="pi pi-check"></i>
                    </button>
                    <button 
                        type="button" title="cancelar"
                        disabled={lancamento.status !== 'PENDENTE'}
                        className="btn btn-warning" 
                        onClick={e => props.alterarStatus(lancamento,'CANCELADO')}>
                            <i className="pi pi-times"></i>
                    </button>
                    <button 
                        type="button" title="editar"
                        className="btn btn-primary" 
                        onClick={e => props.editAction(lancamento.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button 
                        type="button" title="excluir"
                        className="btn btn-danger" 
                        onClick={ e => props.deleteAction(lancamento.id)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}