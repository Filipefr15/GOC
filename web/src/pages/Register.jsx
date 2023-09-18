import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { SelectInput } from "../components/Input estado";
import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { registerUser } from "../services/register-services";

export function Register() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const user = await registerUser(data);
            setResult(user);
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
            <Header title="Registre-se" />
            <Form
                noValidate
                validated={!!errors}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-light rounded p-5 shadow w-100 m-auto"
                style={{ height: '800px' }}
            >
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <Col md={6}>
                                <Input
                                    className="mb-4"
                                    label="Nome Completo"
                                    type="text"
                                    placeholder="Insira seu nome completo"
                                    error={errors.name}
                                    required={true}
                                    name="name"
                                    validations={register('name', {
                                        required: {
                                            value: true,
                                            message: 'Nome é obrigatório'
                                        }
                                    })}
                                />
                                <Input
                                    className="mb-4"
                                    label="CPF"
                                    type="text"
                                    placeholder="Insira apenas os números"
                                    error={errors.cpf}
                                    required={true}
                                    name="cpf"
                                    validations={register('cpf', {
                                        required: {
                                            value: true,
                                            message: 'CPF é obrigatório'
                                        }
                                        ,
                                        pattern: "[0-9]{11}",
                                        message: "CPF inválido!"
                                    })}
                                />
                                <Input
                                    className="mb-4"
                                    label="RG"
                                    type="text"
                                    placeholder="Insira apenas os números"
                                    error={errors.rg}
                                    required={true}
                                    name="rg"
                                    validations={register('rg', {
                                        required: {
                                            value: true,
                                            message: 'RG é obrigatório'
                                        }
                                        ,
                                        pattern: "[0-9]{7}",
                                        message: "RG inválido!"
                                    })}
                                />
                                <SelectInput
                                    className="mb-4"
                                    aria-label="Default select example"
                                    label="Estado"
                                    type="text"
                                    placeholder="Escolha seu Estado"
                                    error={errors.estado}
                                    required={true}
                                    name="estado"
                                    validations={register('estado', {
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
                                    placeholder="Insira seu município"
                                    error={errors.municipio}
                                    required={true}
                                    name="municipio"
                                    validations={register('municipio', {
                                        required: {
                                            value: true,
                                            message: 'Município é obrigatório'
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
                                    placeholder="Insira seu bairro"
                                    error={errors.bairro}
                                    required={true}
                                    name="bairro"
                                    validations={register('bairro', {
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



                            </Col>
                            <Col md={6}>


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
                </div>
                <div className="d-flex justify-content-between">
                    <Button type="submit" className="w-100 btn-lg">Criar</Button>
                    <Link to="/">Já tenho uma conta</Link>
                </div>

            </Form>
        </Container >
    );
}
