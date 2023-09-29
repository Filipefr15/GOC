import { React, useEffect, useState } from 'react'
import { Sidebar } from '../components/Sidebar';
import '../styles/perfil.css'


import { useNavigate } from "react-router-dom";

import { CgProfile } from 'react-icons/cg'
//import style from "../Operacao/styles.module.css";



import { getOneUsuarios, authToken, updateUser } from "../services/usuarios-service"
import { Button, Modal, Form } from 'react-bootstrap';
import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';


export function Perfil() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);

    async function updateUsuarios(data) {
        await updateUser({ name: data.name, email: data.email, password: data.password, cpf: data.cpf, rg: data.rg, estado: data.estado, municipio: data.municipio, bairro: data.bairro, cep: data.cep, dataNasc: data.dataNasc });
        console.log(data);
        findUsuario();
        setIsUpdated(false);
    }

    useEffect(() => {
        findUsuario();
    }, []);

    async function findUsuario() {
        try {
            const id = await authToken();
            console.log(id);
            const result = await getOneUsuarios(id.data);
            console.log(result);
            setUsuario(result.data);
            
        } catch (error) {
            console.error(error);
        }
    }


    function formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
    }

    return (
        <main className='vh-100 main-container d-flex'>
            <Modal show={isUpdated} onHide={() => setIsUpdated(false)}>
                <Modal.Header>
                    <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSubmit(updateUsuarios)} validated={!!errors}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Alterações de Perfil</Form.Label>
                            <div>Nome</div>
                            <Form.Control

                                className="mb-3"
                                type="text"
                                defaultValue={usuario.name}
                                name="name"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message:
                                            "Nome é necessário",
                                    },
                                })}

                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email.message}
                                </span>
                            )}
                            {/* <Form.Control
                                className="mb-3"
                                type="password"
                                defaultValue={usuario.password}
                                name="password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message:
                                            "Senha é necessário",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Ao minimo 3 digitos'
                                    }
                                })}

                            /> */}
                            <div>Email</div>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                defaultValue={usuario.email}
                                name="email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message:
                                            "Email é necessário",
                                    },
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'Email inválido!'
                                    }
                                })}

                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email.message}
                                </span>
                            )}
                            <div>CPF</div>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                defaultValue={usuario.cpf}
                                name="cpf"
                                {...register("cpf", {
                                    required: {
                                        value: true,
                                        message:
                                            "cpf é necessário",
                                    },
                                })}

                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email.message}
                                </span>
                            )}
                            <div>RG</div>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                defaultValue={usuario.rg}
                                name="rg"
                                {...register("rg", {
                                    required: {
                                        value: true,
                                        message:
                                            "rg é necessário",
                                    },
                                })}

                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email.message}
                                </span>
                            )}
                            <div>Estado</div>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                defaultValue={usuario.estado}
                                name="estado"
                                {...register("estado", {
                                    required: {
                                        value: true,
                                        message:
                                            "Estado é necessário",
                                    },
                                })}

                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email.message}
                                </span>
                            )}
                            <div>Município</div>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                defaultValue={usuario.municipio}
                                name="municipio"
                                {...register("municipio", {
                                    required: {
                                        value: true,
                                        message:
                                            "Município é necessário",
                                    },
                                })}

                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email.message}
                                </span>
                            )}
                            <div>Bairro</div>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                defaultValue={usuario.bairro}
                                name="bairro"
                                {...register("bairro", {
                                    required: {
                                        value: true,
                                        message:
                                            "Bairro é necessário",
                                    },
                                })}

                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email.message}
                                </span>
                            )}
                            <div>CEP</div>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                defaultValue={usuario.cep}
                                name="cep"
                                {...register("cep", {
                                    required: {
                                        value: true,
                                        message:
                                            "CEP é necessário",
                                    },
                                })}

                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email.message}
                                </span>
                            )}
                            {/* <Form.Control
                                className="mb-3"
                                type="Date"
                                defaultValue={usuario.dataNasc}
                                name="dataNasc"
                                {...register("dataNasc", {
                                    required: {
                                        value: true,
                                        message:
                                            "Data de Nascimento é necessária",
                                    },
                                })}

                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email.message}
                                </span>
                            )} */}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Editar
                        </Button>
                        <Button variant="secondary" onClick={() => setIsUpdated(false)}>
                            Fechar
                        </Button>

                    </Modal.Footer>

                </Form>
            </Modal>
            <div className=''>
                <Sidebar />
            </div>
            <div className='w-75 p-4'>


                <body className='perfil-body'>
                    <div class="profile-container">
                        <div className='main-title'>
                            <h1 >
                                <CgProfile className='icon-profile-large m-2 text-dark' />
                                PERFIL
                            </h1>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">Nome:</span>
                            <span class="profile-data">{usuario.name}</span>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">Senha:</span>
                            <span class="profile-data">**********</span>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">Email:</span>
                            <span class="profile-data">{usuario.email}</span>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">CPF:</span>
                            <span class="profile-data">{usuario.cpf}</span>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">RG:</span>
                            <span class="profile-data">{usuario.rg}</span>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">Estado:</span>
                            <span class="profile-data">{usuario.estado}</span>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">Município:</span>
                            <span class="profile-data">{usuario.municipio}</span>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">Bairro:</span>
                            <span class="profile-data">{usuario.bairro}</span>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">CEP:</span>
                            <span class="profile-data">{usuario.cep}</span>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">Data de Nascimento:</span>
                            <span class="profile-data">{formatarData(usuario.dataNasc)}</span>
                        </div>
                        <hr></hr>
                        <div className="w-100 d-flex justify-content-end">
                        <Button variant="primary" onClick={() => setIsUpdated(true)}>
                            Editar
                        </Button>
                            {/* <button onClick={() => setIsUpdated(true)}>
                                Editar
                            </button> */}
                        </div>
                    </div>
                </body>



                {/* --select bo."tipoOcorrencia" , count(1) total from "boletimOcorrencia" bo group by bo."tipoOcorrencia" */}


                <div className='charts'>


                </div>
            </div>



        </main>
    )
}

