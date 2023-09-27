import { Container, Col, Modal, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { BoletimOcorrenciaInput } from "../components/Food";
import { Header } from "../components/Header";
import { Input } from '../components/Input';


import { getBoletimOCorrencia, deleteBoletimOcorrencia, registerBoletimOcorrencia, updateBoletimOcorrencia, updateBoletimOcorrenciaTeste } from "../services/boletim-ocorrencia-service";
import { SelectOcorrenciaInput } from "../components/input tipo ocorrencia";
import { SelectInput } from "../components/Input estado";

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
            await updateBoletimOcorrencia({id: data.id,
                statusBoletim: data.statusBoletim
            });
            await findBoletimOcorrencia();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container fluid>
            <Header title="Boletins de Ocorrência" />
            <Row className="w-50 m-auto mb-5 mt-5 ">
                <Col md='9'>
                    <Button onClick={() => navigate('/register/boletimOcorrencia')}>Criar novo boletim de ocorrencia</Button>
                </Col>
                <Col>
                    <Button variant="outline-secondary" onClick={() => {
                        sessionStorage.removeItem('token');
                        navigate('/telainicial');
                    }}>Retornar</Button>
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
            <Modal show={isCreated} onHide={() => setIsCreated(false)}>
                <Modal.Header>
                    <Modal.Title>Cadastrar novo boletim de ocorrência</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(registerBoletimOcorrencia)} validated={!!errors}>
                    <Modal.Body>
                        <Input
                            className="mb-3"
                            label="Data"
                            type="date"
                            placeholder="Insira a data da ocorrência"
                            error={errors.data}
                            required={true}
                            name="data"
                            validations={register('data', {
                                required: {
                                    value: true,
                                    message: 'Data é obrigatória'
                                }
                            })}
                        />
                        <SelectOcorrenciaInput
                            className="mb-4"
                            label="Tipo de Ocorrência"
                            type="text"
                            placeholder="Qual foi a ocorrência?"
                            error={errors.tipoOcorrencia}
                            required={true}
                            name="tipoOcorrencia"
                            validations={register('tipoOcorrencia', {
                                required: {
                                    value: true,
                                    message: 'Tipo da ocorrência é obrigatório'
                                }
                                ,
                                pattern: "[0-9]{11}",
                                message: "CPF inválido!"
                            })}
                        />
                        <h2>Local do fato</h2>
                        <h3>Em que local ocorreu o fato?</h3>
                        <hr  ></hr>

                        <SelectInput
                            className="mb-4"
                            aria-label="Default select example"
                            label="Estado"
                            type="text"
                            placeholder="Escolha seu Estado"
                            error={errors.estadoOcorrencia}
                            required={true}
                            name="estadoOcorrencia"
                            validations={register('estadoOcorrencia', {
                                required: {
                                    value: true,
                                    message: 'Selecionar Estado é obrigatório'
                                },
                                pattern: {
                                    value: "[a-z]"
                                }
                            })}

                        />

                        <Input
                            className="mb-4"
                            label="Município"
                            type="text"
                            placeholder="Insira o município da ocorrência"
                            error={errors.municipioOcorrencia}
                            required={true}
                            name="municipioOcorrencia"
                            validations={register('municipioOcorrencia', {
                                required: {
                                    value: true,
                                    message: 'Município da ocorrência é obrigatório'
                                },
                                pattern: {
                                    value: "[a-z]",
                                    message: 'Município inválido'
                                }
                            })}
                        />
                        <Input
                            className="mb-4"
                            label="Bairro"
                            type="text"
                            placeholder="Insira o bairro da ocorrência"
                            error={errors.bairroOcorrencia}
                            required={true}
                            name="bairroOcorrencia"
                            validations={register('bairroOcorrencia', {
                                required: {
                                    value: true,
                                    message: 'Bairro é obrigatório'
                                },
                                pattern: {
                                    value: "[a-z]",
                                    message: 'Bairro inválido!'
                                }
                            })}

                        />
                        <Input
                            className="mb-4"
                            label="Detalhes do local da ocorrência"
                            type="textarea"
                            placeholder="Insira os detalhes do local da ocorrência"
                            error={errors.detalhesLocalOcorrencia}
                            required={false}
                            name="detalhesLocalOcorrencia"
                            validations={register('detalhesLocalOcorrencia', {
                            })}
                        />
                        <h2>Narrativa</h2>
                        <h3>Conte, de maneira fiel e objetiva, como aconteceu o fato</h3>
                        <hr  ></hr>

                        <Input
                            className="mb-4"
                            label="Descreva como ocorreu o fato"
                            type="textarea"
                            placeholder="Insira os detalhes de como ocorreu o fato"
                            error={errors.narrativaOcorrencia}
                            required={true}
                            name="narrativaOcorrencia"
                            validations={register('narrativaOcorrencia', {
                            })}
                        />
                        <h2>Comunicante</h2>
                        <h3>Informe os dados do comunicante</h3>
                        <hr  ></hr>
                        <Input
                            className="mb-4"
                            label="CPF do comunicante"
                            type="text"
                            placeholder="Insira seu CPF"
                            error={errors.cpfComunicante}
                            required={true}
                            name="cpfComunicante"
                            validations={register('cpfComunicante', {
                                required: {
                                    value: true,
                                    message: 'CPF é obrigatório'
                                },
                                pattern: "[0-9]{11}",
                                message: "CPF inválido!"

                            })}
                        />
                        <Input
                            className="mb-4"
                            label="RG do comunicante"
                            type="text"
                            placeholder="Insira apenas os números"
                            error={errors.rgComunicante}
                            required={true}
                            name="rgComunicante"
                            validations={register('rgComunicante', {
                                required: {
                                    value: true,
                                    message: 'RG é obrigatório'
                                }
                                ,
                                pattern: "[0-9]{7}",
                                message: "RG inválido!"
                            })}
                        />
                        <Input
                            className="mb-4"
                            label="Nome completo do comunicante"
                            type="text"
                            placeholder="Insira o nome completo do comunicante"
                            error={errors.nomeComunicante}
                            required={true}
                            name="nomeComunicante"
                            validations={register('nomeComunicante', {
                                required: {
                                    value: true,
                                    message: 'Nome é obrigatório'
                                }
                            })}
                        />
                        <Input
                            className="mb-4"
                            label="Nome completo da Mãe comunicante"
                            type="text"
                            placeholder="Insira o nome completo da Mãe do comunicante"
                            error={errors.nomeMaeComunicante}
                            required={true}
                            name="nomeMaeComunicante"
                            validations={register('nomeMaeComunicante', {
                                required: {
                                    value: true,
                                    message: 'Nome da Mãe do comunicante é obrigatório'
                                }
                            })}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Criar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsCreated(false)}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}
