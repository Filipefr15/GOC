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
import { SelectInputBairro } from "../components/input bairro";
import { SelectInputMT } from "../components/InputEstadoMT";
import { SelectInputCidade } from "../components/InputMunicipiosMT";

export function RegisterBoletimOcorrencia() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const onSubmitt = async (data) => {
        try {
            console.log(data)
            const boletimOcorrencia = await registerBoletimOcorrencia(data);
            setResult(boletimOcorrencia.data);
            navigate('/crud/boletimOcorrencia');
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
                    <Header title="Registrar Boletim de Ocorrência" />
                    <div className="row">
                        <Col sm={6}>
                            <h2>Dados da Ocorrência</h2>
                            <h3 className="teste">Quanto ocorreu o fato? Qual o tipo de ocorrência?</h3>
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
                                })}
                            />
                            <h2>Local do fato</h2>
                            <h3 className="teste">Em que local ocorreu o fato?</h3>
                            <hr  ></hr>

                            <SelectInputMT
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
                                    }
                                })}
                                defaultValue="MT" // Defina o valor padrão como "MT"
                            >
                            </SelectInputMT>

                            <SelectInputCidade
                                className="mb-4"
                                aria-label="Default select example"
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
                                    }
                                })}
                            >
                            </SelectInputCidade>


                            <Input
                                className="mb-4"
                                label="Bairro"
                                type="text"
                                placeholder="Insira o Bairro da ocorrência."
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
                                type="textarea form-control"
                                placeholder="Insira os detalhes do local da ocorrência"
                                error={errors.detalhesLocalOcorrencia}
                                required={false}
                                name="detalhesLocalOcorrencia"
                                validations={register('detalhesLocalOcorrencia', {
                                })}
                            />

                            {/* <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    id="detalhesLocalOcorrencia"
                                    name="detalhesLocalOcorrencia"
                                    {...register('detalhesLocalOcorrencia', {
                                        // Coloque as regras de validação aqui, por exemplo:
                                        required: false, // Esta regra pode ser true ou false, dependendo da sua necessidade
                                    })}
                                ></textarea>
                                <label htmlFor="detalhesLocalOcorrencia">Comments</label>
                            </div> */}

                            {/* <div class="form-floating">
                                <textarea class="form-control" required={false} placeholder="Leave a comment here" id="detalhesLocalOcorrencia" name="detalhesLocalOcorrencia"
                                    type="text" validations={register('detalhesLocalOcorrencia')}></textarea>
                                <label for="floatingTextarea2">Comments</label>
                            </div> */}





                        </Col>
                        <Col sm={6}>
                            <h2>Narrativa</h2>
                            <h3 className="teste">Conte, de maneira fiel e objetiva, como aconteceu o fato</h3>
                            <hr  ></hr>

                            <Input
                                className="mb-2"
                                label="Descreva como ocorreu o fato"
                                type="textarea"
                                placeholder="Insira os detalhes de como ocorreu o fato"
                                error={errors.narrativaOcorrencia}
                                required={true}
                                name="narrativaOcorrencia"
                                validations={register('narrativaOcorrencia', {
                                })}
                            />
                            <br />
                            <br />
                            <br />
                            <br />
                            <h2 >Comunicante</h2>
                            <h3 className="teste">Informe os dados do comunicante</h3>
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
                                    pattern: {
                                        value: /^[0-9]{11}$/,
                                        message: "CPF inválido!"
                                    }
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
                                    //pattern: /(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)/,
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
                        </Col>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <Button type="submit" className="w-100 btn-lg">Criar</Button>
                </div>
                <Link to="/crud/boletimOcorrencia">Retornar</Link>

            </Form>
        </Container >
    );
}
