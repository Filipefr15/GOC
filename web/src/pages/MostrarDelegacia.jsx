import { Container, Col, Button, Row, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { MostrarDelegaciaInput } from "../components/MostrarDelegaciaInput";
import { Header } from "../components/Header";

import { getOneBoletimOcorrencia } from "../services/boletim-ocorrencia-service";
import { deleteDelegacia, getDelegacia, updateDelegacia } from "../services/register-delegacia-services";

import { Sidebar } from "../components/Sidebar";

export function MostrarDelegacia() {
    const [delegacia, setDelegacia] = useState([]);
    const [busca, setBusca] = useState();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findDelegacia();
    }, []);

    function handleBusca(data) {
        setBusca(data.target.value.toLowerCase())
    }



    async function findDelegacia() {
        try {
            const result = await getDelegacia();
            setDelegacia(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function deleteDelegacia2(id) {
        try {
            // Check if there are any police reports associated with this police station
            const boletinsAssociados = delegacia.filter((delegacia) => delegacia.id === id && delegacia.boletinsOcorrencia.length > 0);

            if (boletinsAssociados.length > 0) {
                alert("Não é possível apagar a delegacia enquanto existirem boletins de ocorrência associados a ela.");
            } else {
                await deleteDelegacia(id);
                await findDelegacia();
                alert('Delegacia apagada com sucesso!');
            }
        } catch (error) {
            console.error(error);
        }
    }



    async function updateDelegacia2(data) {
        try {
            console.log(data);
            await updateDelegacia({
                id: data.id,
                nomeDelegacia: data.nomeDelegacia,
                delegado: data.delegado,
                estadoDelegacia: data.estadoDelegacia,
                municipioDelegacia: data.municipioDelegacia,
                bairroDelegacia: data.bairroDelegacia
            });
            await findDelegacia();
            alert('Delegacia atualizada com sucesso!');

        } catch (error) {
            console.error(error);
        }
    }

    const itensPorPagina = 3;
    const [paginaAtual, setPaginaAtual] = useState(1);

    let totalPaginas;
    let boletinsExibidos;

    const indiceInicio = (paginaAtual - 1) * itensPorPagina;
    const indiceFim = paginaAtual * itensPorPagina;


    if (delegacia && delegacia.length > 0) {
        boletinsExibidos = delegacia?.slice(indiceInicio, indiceFim);
        totalPaginas = Math.ceil(delegacia.length / itensPorPagina);
    } else {
        boletinsExibidos = 0;
        totalPaginas = 0;
    }
    const handlePaginaClick = (novaPagina) => {
        setPaginaAtual(novaPagina);
    };
    const renderNumerosDePagina = () => {
        const numerosDePagina = [];
        for (let pagina = 1; pagina <= totalPaginas; pagina++) {
            numerosDePagina.push(
                <Pagination.Item
                    key={pagina}
                    active={pagina === paginaAtual}
                    onClick={() => handlePaginaClick(pagina)}
                >
                    {pagina}
                </Pagination.Item>
            );
        }
        return numerosDePagina;
    };


    return (
        <main className='min-vh-100 main-container d-flex'>
            <div className=''>
                <Sidebar />
            </div>
            <Container fluid>
                <Header title="Delegacias" />
                <Row className="w-50 m-auto mb-2 mt-5 ">
                    <Col md='5'>
                        <Button onClick={() => navigate('/register/delegacia')}>Criar Nova Delegacia</Button>
                    </Col>
                    <Col>
                        <input className="form-control m-auto mb-5 p-2" placeholder="Pesquisar" name="busca" onChange={handleBusca} type="text"></input>

                    </Col>

                </Row>
                <Col className="w-50 m-auto">
                    {delegacia && delegacia.length > 0 ? (
                        busca ? (
                            delegacia.filter((delg) => delg.nomeDelegacia.toLowerCase().includes(busca))
                                .map((delg) => (
                                    <MostrarDelegaciaInput
                                        key={delg.id}
                                        delegacia={delg}
                                        deleteDelegacia={async () => await deleteDelegacia2(delg.id)}
                                        updateDelegacia={updateDelegacia2}
                                    />
                                ))
                        ) : boletinsExibidos.map((delegacia, index) => (
                            <MostrarDelegaciaInput
                                key={index}
                                delegacia={delegacia}
                                deleteDelegacia={async () => await deleteDelegacia2(delegacia.id)}
                                updateDelegacia={updateDelegacia2}
                            />
                        ))
                    ) : <p className="text-center">Não existe nenhuma delegacia cadastrada!</p>}
                </Col>
                <Pagination className="justify-content-center mt-5">
                    <Pagination.Prev
                        onClick={() => handlePaginaClick(paginaAtual - 1)}
                        disabled={paginaAtual === 1}
                    />
                    {renderNumerosDePagina()}
                    <Pagination.Next
                        onClick={() => handlePaginaClick(paginaAtual + 1)}
                        disabled={paginaAtual === totalPaginas}
                    />
                </Pagination>
            </Container>
        </main>
    );
}
