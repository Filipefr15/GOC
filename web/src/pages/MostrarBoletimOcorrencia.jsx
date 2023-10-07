import { Container, Col, Modal, Form, Button, Row, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { BoletimOcorrenciaInput } from "../components/BoletimOcorrenciaInput";
import { Header } from "../components/Header";
import { Input } from '../components/Input';


import { getBoletimOCorrencia, deleteBoletimOcorrencia, registerBoletimOcorrencia, updateBoletimOcorrencia, updateBoletimOcorrenciaTeste } from "../services/boletim-ocorrencia-service";
import { SelectOcorrenciaInput } from "../components/input tipo ocorrencia";
import { SelectInput } from "../components/Input estado";
import { SelectInputBairro } from "../components/input bairro";
import { Sidebar } from "../components/Sidebar";


export function BoletimOcorrencia() {
    const [boletimOcorrencia, setBoletimOcorrencia] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const [busca, setBusca] = useState();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();



    function handleBusca(data) {
        setBusca(data.target.value.toLowerCase())
    }

    useEffect(() => {
        findBoletimOcorrencia();
        // eslint-disable-next-line
    }, []);

    async function findBoletimOcorrencia() {
        try {
            const result = await getBoletimOCorrencia();
            setBoletimOcorrencia(result.data);
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    }

    async function deleteBoletimOcorrencia2(id) {
        try {
            await deleteBoletimOcorrencia(id);
            await findBoletimOcorrencia();
        } catch (error) {
            console.error(error);
        }
    }

    async function registerBoletimOcorrencia(data) {
        try {
            await registerBoletimOcorrencia(data);
            setIsCreated(false);
            await findBoletimOcorrencia();
        } catch (error) {
            console.error(error);
        }
    }

    async function updateBoletimOcorrencia2(data) {
        try {
            console.log(data);
            await updateBoletimOcorrencia({
                id: data.id,
                statusBoletim: data.statusBoletim,
                idDelegacia: data.idDelegacia
            });
            await findBoletimOcorrencia();
            alert('Boletim editado com sucesso!');

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


    if (boletimOcorrencia && boletimOcorrencia.length > 0) {
        boletinsExibidos = boletimOcorrencia?.slice(indiceInicio, indiceFim);
        totalPaginas = Math.ceil(boletimOcorrencia.length / itensPorPagina);
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
                <Header title="Boletins de Ocorrência" />
                <Row className="w-50 m-auto mb-2 mt-5 ">
                    <Col md='5'>
                        <Button className="p-2" onClick={() => navigate('/register/boletimOcorrencia')}>Criar Novo Boletim de Ocorrência</Button>
                    </Col>
                    <Col>
                        <input className="form-control m-auto mb-5 p-2" placeholder="Pesquisar" name="busca" onChange={handleBusca} type="text"></input>

                    </Col>

                </Row>

                <Col className="w-50 m-auto">
                    {boletimOcorrencia && boletimOcorrencia.length > 0 ? (
                        busca ? (
                            boletimOcorrencia.filter((boletim) => boletim.nomeComunicante.toLowerCase().includes(busca))
                                .map((boletim) => (
                                    <BoletimOcorrenciaInput
                                        key={boletim.id}
                                        boletimOcorrencia={boletim}
                                        deleteBoletimOcorrencia={async () => await deleteBoletimOcorrencia2(boletim.id)}
                                        updateBoletimOcorrencia={updateBoletimOcorrencia2}
                                    />
                                ))
                        ) : boletinsExibidos.map((boletimOcorrencia, index) => (
                            <BoletimOcorrenciaInput
                                key={index}
                                boletimOcorrencia={boletimOcorrencia}
                                deleteBoletimOcorrencia={async () => await deleteBoletimOcorrencia2(boletimOcorrencia.id)}
                                updateBoletimOcorrencia={updateBoletimOcorrencia2}
                            />
                        ))
                    ) : <p className="text-center">Não existe nenhum boletim de ocorrência cadastrado!</p>
                    }
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
