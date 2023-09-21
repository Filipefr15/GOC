import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css"
import logoMT from "../img/logoGov.png"

import { Input } from "../components/Input";
import { Modal } from '../components/Modal';

import { loginUser } from '../services/usuarios-service';

export function Login() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        try {
            const user = await loginUser(data);
            setResult(user);
            navigate('/telaInicial');
        } catch (error) {
            if (error.response) {
                setResult({
                    title: 'Houve um erro no login!',
                    message: error.response.data.error
                });
            } else {
                setResult({
                    title: 'Houve um erro no login!',
                    message: 'Erro desconhecido!'
                });
            }
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
            <div className="d-flex justify-content-center align-items-center vh-100">

                <Form
                    noValidate
                    validated={!!errors}
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-light rounded-xl p-5 shadow w-40 h-70 m-auto widthFixoCard"
                >

                    <Col>
                        <img src={logoMT} alt="" />
                        <h1 className="letraCardLogin">Gestão de Ocorrências Criminais</h1>

                        <Input
                            className="mb-3"
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
                        <div className="d-flex justify-content-between mb-4">

                            <Link to="/register">Criar conta</Link>
                            <Link to="/register">Esqueci a senha</Link>
                        </div>

                        <Button type="submit" className="w-100 btn-lg">Login</Button>

                    </Col>
                </Form>
            </div>
        </Container>
    );
}
