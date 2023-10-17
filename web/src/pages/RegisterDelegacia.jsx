import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import '../styles/global.css'

import { SelectInput } from "../components/Input estado";
import { Input } from "../components/Input";
import { Header } from '../components/Header';
import { Modal } from '../components/Modal';

import { registerDelegacia } from "../services/register-delegacia-services";
import { SelectInputMT } from "../components/InputEstadoMT";

export function RegisterDelegacia() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmitt = async (data) => {
        try {
            console.log(data)
            const delegacia = await registerDelegacia(data);
            setResult(delegacia.data);
            navigate('/crud/delegacia');
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
                className="bg-light rounded p-5 shadow w-50 m-auto mt-5 mb-auto"
            >
                <div className="container">
                    {/* <Header title="Registrar Nova Delegacia" /> */}
                    <div class="text-center">
                        <h2 >Dados da Delegacia</h2>
                        <h3 className="teste">Insira o nome do Delegado e da Delegacia abaixo</h3>
                    </div>

                    <hr  ></hr>

                    <Input
                        className="mb-4"
                        label="Delegado"
                        type="text"
                        placeholder="Insira o nome do Delegado"
                        error={errors.delegado}
                        required={true}
                        name="delegado"
                        validations={register('delegado', {
                            required: {
                                value: true,
                                message: 'Nome do Delegado é obrigatório'
                            }
                        })}
                    />
                    <Input
                        className="mb-4"
                        label="Nome da Delegacia"
                        type="text"
                        placeholder="Insira o nome da Delegacia"
                        error={errors.nomeDelegacia}
                        required={true}
                        name="nomeDelegacia"
                        validations={register('nomeDelegacia', {
                            required: {
                                value: true,
                                message: 'O nome da delegacia é obrigatório'
                            }
                        })}
                    />

                    <SelectInputMT
                        className="mb-4"
                        aria-label="Default select example"
                        label="Estado"
                        type="text"
                        placeholder="Escolha seu Estado"
                        error={errors.estadoDelegacia}
                        required={true}
                        name="estadoDelegacia"
                        validations={register('estadoDelegacia', {
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
                        placeholder="Insira o município da Delegacia"
                        error={errors.municipioDelegacia}
                        required={true}
                        name="municipioDelegacia"
                        validations={register('municipioDelegacia', {
                            required: {
                                value: true,
                                message: 'Município da Delegacia é obrigatório'
                            },
                            pattern: {
                                value: "[a-z]",
                                message: 'Município inválido'
                            }
                        })}
                    />
                    <Input
                        className="mb-4"
                        label="Bairro da Delegacia"
                        type="text"
                        placeholder="Insira o Bairro da Delegacia"
                        error={errors.bairroDelegacia}
                        required={true}
                        name="bairroDelegacia"
                        validations={register('bairroDelegacia', {
                            required: {
                                value: true,
                                message: 'Bairro é obrigatório'
                            },
                        })}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <Button type="submit" className="w-100 btn-lg">Criar</Button>
                </div>

                <Link to="/crud/delegacia">Retornar</Link>
            </Form>
        </Container >
    );
}
