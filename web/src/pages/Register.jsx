import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

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
            navigate('/foods');
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
                        <div class="col-md-6">
                            <Col>
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
                                <div className="d-flex justify-content-between">
                                    <Button type="submit">Criar</Button>
                                    <Link to="/">Já tenho uma conta</Link>
                                </div>
                            </Col>
                        </div>
                    </div>
                </div>


            </Form>
        </Container>
    );
}
