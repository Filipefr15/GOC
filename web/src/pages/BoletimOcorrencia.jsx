import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import '../styles/global.css' 

import { SelectInput } from "../components/Input estado";
import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { registerBoletimOcorrencia } from "../services/boletim-ocorrencia-service";
import { SelectOcorrenciaInput } from "../components/input tipo ocorrencia";

export function RegisterBoletimOcorrencia() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmitt = async (data) => {
        try {
            const boletimOcorrencia = await registerBoletimOcorrencia(data);
            setResult(boletimOcorrencia.data);
            navigate('/telainicial');
        } catch (error) {

            setResult({
                title: 'Houve um erro no cadastro!',
                message: error.response.data.error
            });
        }
    }


    return (
        <Container>
            <Modal
                show={result}
                title={result?.title}
                message={result?.message}
                handleClose={() => setResult(null)}
            />
           
            <Form
                noValidate
                validated={!!errors}
                onSubmit={handleSubmit(onSubmitt)}
                className="bg-light rounded p-5 shadow w-100 m-auto mt-3 mb-3"
            >
                <div className="container">
                 <Header title="Registrar Boletim de Ocorrência"/>
                    <div className="row">
                        <Col sm={6}>
                            <h2>Dados da Ocorrência</h2>
                            <h3>Quanto ocorreu o fato? Qual o tipo de ocorrência?</h3>
                            <hr  ></hr>
                            <Input
                                className="mb-4"
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





                        </Col>
                        <Col sm={6}>

                            <Input
                                className="mb-4"
                                label="CEP"
                                type="integer"
                                placeholder="Insira seu cep"
                                error={errors.cep}
                                required={true}
                                name="cep"
                                validations={register('cep', {
                                    required: {
                                        value: true,
                                        message: 'CEP é obrigatório'
                                    },
                                    pattern: {
                                        value: /^\d{8}$/,
                                        message: 'CEP inválido!'
                                    }
                                })}
                            />
                            <Input
                                className="mb-4"
                                label="E-mail"
                                type="text"
                                placeholder="Insira seu e-mail"
                                error={errors.email}
                                required={true}
                                name="email"
                                validations={register('email', {
                                    required: {
                                        value: true,
                                        message: 'E-mail é obrigatório'
                                    },
                                    pattern: {
                                        value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                                        message: 'E-mail inválido!'
                                    }
                                })}
                            />

                            <Input
                                className="mb-4"
                                label="Senha"
                                type="password"
                                placeholder="Insira sua senha"
                                error={errors.password}
                                required={true}
                                name="password"
                                validations={register('password', {
                                    required: {
                                        value: true,
                                        message: 'Senha é obrigatório'
                                    }
                                })}
                            />
                            <Input
                                className="mb-4"
                                label="Data de Nascimento"
                                type="date"
                                placeholder="Insira sua data de nascimento."
                                error={errors.dataNasc}
                                required={true}
                                name="dataNasc"
                                validations={register('dataNasc', {
                                    required: {
                                        value: true,
                                        message: 'Data de nascimento é obrigatória'
                                    }
                                })}
                            />

                        </Col>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <Button type="submit" className="w-100 btn-lg">Criar</Button>
                </div>
                <Link to="/">Já tenho uma conta</Link>

            </Form>
        </Container >
    );
}
