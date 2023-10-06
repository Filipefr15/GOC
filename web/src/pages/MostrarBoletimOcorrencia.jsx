import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
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
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

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

    return (
        <main className='min-vh-100 main-container d-flex'>
            <div className=''>
                <Sidebar />
            </div>
            <Container fluid>
                <Header title="Boletins de Ocorrência" />
                <Row className="w-50 m-auto mb-5 mt-5 ">
                    <Col md='9'>
                        <Button onClick={() => navigate('/register/boletimOcorrencia')}>Criar Novo Boletim de Ocorrência</Button>
                    </Col>
                    <Col>
                        <Button variant="outline-secondary" onClick={() => {
                            navigate('/telainicial');
                        }}>Tela Inicial</Button>
                    </Col>
                </Row>
                <Col className="w-50 m-auto">
                    {boletimOcorrencia && boletimOcorrencia.length > 0
                        ? boletimOcorrencia.map((boletimOcorrencia, index) => (
                            <BoletimOcorrenciaInput
                                key={index}
                                boletimOcorrencia={boletimOcorrencia}
                                deleteBoletimOcorrencia={async () => await deleteBoletimOcorrencia2(boletimOcorrencia.id)}
                                updateBoletimOcorrencia={updateBoletimOcorrencia2}
                            />
                        ))
                        : <p className="text-center">Não existe nenhum boletim de ocorrência cadastrado!</p>}
                </Col>
            </Container>
        </main>
    );
}
