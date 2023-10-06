import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { MostrarDelegaciaInput } from "../components/MostrarDelegaciaInput";
import { Header } from "../components/Header";
import { Input } from '../components/Input';


import { deleteDelegacia, getDelegacia, updateDelegacia } from "../services/register-delegacia-services";

import { Sidebar } from "../components/Sidebar";

export function MostrarDelegacia() {
    const [delegacia, setDelegacia] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        findDelegacia();
        // eslint-disable-next-line
    }, []);

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
            await deleteDelegacia(id);
            await findDelegacia();
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

    return (
        <main className='min-vh-100 main-container d-flex'>
            <div className=''>
                <Sidebar />
            </div>
            <Container fluid>
                <Header title="Delegacias" />
                <Row className="w-50 m-auto mb-5 mt-5 ">
                    <Col md='9'>
                        <Button onClick={() => navigate('/register/delegacia')}>Criar Nova Delegacia</Button>
                    </Col>
                    <Col>
                        <Button variant="outline-secondary" onClick={() => {
                            navigate('/telainicial');
                        }}>Tela Inicial</Button>
                    </Col>
                </Row>
                <Col className="w-50 m-auto">
                    {delegacia && delegacia.length > 0
                        ? delegacia.map((delegacia, index) => (
                            <MostrarDelegaciaInput
                                key={index}
                                delegacia={delegacia}
                                deleteDelegacia={async () => await deleteDelegacia2(delegacia.id)}
                                updateDelegacia={updateDelegacia2}
                            />
                        ))
                        : <p className="text-center">Não existe nenhuma delegacia cadastrada!</p>}
                </Col>
            </Container>
        </main>
    );
}
