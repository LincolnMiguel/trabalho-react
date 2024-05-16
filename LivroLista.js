import React, { useState, useEffect } from 'react';
import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';
import LivroDados from './LivroDados';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();


function LinhaLivro({ livro, excluir }) {
    console.log("Dados do livro na LinhaLivro:", livro);
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <>
            <tr>
                <td>{livro.titulo}</td>
                <td>{livro.resumo}</td>
                <td>{nomeEditora}</td>
                <td>
                    <ul>
                        {livro.autores.map((autor, index) => (
                            <li key={index}>{autor}</li>
                        ))}
                    </ul>
                </td>
                <td>{livro.codigo}</td>
            </tr>
            <tr>
                <td colSpan="5">
                    <button onClick={() => excluir(livro.codigo)} className='btn btn-danger' style={{ marginTop: '-50px' }}>Excluir</button>
                </td>
            </tr>
        </>
    );
}


export default function LivroLista() {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        console.log("Atualizando lista de livros...");
        setLivros(controleLivro.obterLivros());
    }, []);

    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setLivros(prevLivros => prevLivros.filter(livro => livro.codigo !== codigo));
    };

    return (
        <main>
            <h1>Catálogo de Livros</h1>
            {
                <table className='table'>
                    <thead>
                        <tr className='table table-dark'>
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th>Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro, index) => (
                            <LinhaLivro key={index} livro={livro} excluir={excluir} />
                        ))}
                    </tbody>
                </table>
            }
        </main >
    );
}
