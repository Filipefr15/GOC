import { useEffect, useState } from "react";
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CgProfile } from 'react-icons/cg'
import "../styles/perfil.css";

import { getUsuarios, authToken, updateUser } from "../services/usuarios-service";

import { Sidebar } from "../components/Sidebar";

export function EditarPerfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        findUsuario();
    }, []);

    async function findUsuario() {
        try {
            const idUsuario = await authToken();
            const result = await getUsuarios(idUsuario.data);
            setUsuario(result.data);
        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function editUsuario(data) {
        try {
            console.log(data)
            await updateUser(data);
            navigate('/perfil')

        } catch (error) {
            console.error(error);
            navigate("/");
        }
    }

    async function voltar() {
        try {
            navigate('/perfil')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="main-container">
            <div className="d-flex w-100 vh-100">
                <div className=''>
                    <Sidebar />
                </div>
                <div className='w-75 p-4'>

                    <body className='perfil-body'>
                        <div className=''>
                            <h1 className="text-dark mb-3">Perfil</h1>
                            <CgProfile className='icon-profile-large m-2 text-dark' />
                            <Form
                                noValidate
                                onSubmit={handleSubmit(editUsuario)}
                            >
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-dark fw-bold">
                                        Nome
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={usuario.nome}
                                        name="nome"
                                        {...register("nome", {
                                            required: {
                                                value: true,
                                                message: "Nome é necessário",
                                            },
                                        })}
                                    />
                                    {errors.nome && (
                                        <span className="text-danger">
                                            {errors.nome.message}
                                        </span>
                                    )}
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-dark fw-bold">
                                        E-mail
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={usuario.email}
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
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-dark fw-bold">
                                        Nova senha
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder='Digite sua nova senha'
                                        name="senha"
                                        {...register("senha", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Senha é necessário",
                                            },
                                            minLength: {
                                                value: 4,
                                                message: 'Ao minimo 4 digitos'
                                            }
                                        })}

                                    />
                                    {errors.senha && (
                                        <span className="text-danger">
                                            {errors.senha.message}
                                        </span>
                                    )}
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-4">
                                    <Form.Label className="text-dark fw-bold">
                                        Nova senha
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder='Digite sua nova senha'
                                        name="password"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Senha é necessário",
                                            },
                                            minLength: {
                                                value: 4,
                                                message: 'Ao minimo 4 digitos'
                                            }
                                        })}

                                    />
                                    {errors.senha && (
                                        <span className="text-danger">
                                            {errors.senha.message}
                                        </span>
                                    )}
                                </Form.Group>
                                <hr className="mb-5" />
                                <div className="w-100 d-flex justify-content-between">
                                    <button className='' onClick={voltar}>
                                        Voltar
                                    </button>
                                    <button className='' type="submit">
                                        Confirmar
                                    </button>

                                </div>
                            </Form>
                        </div>
                    </body>
                </div>
            </div>
        </main>
    );
}