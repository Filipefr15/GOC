import { React, useEffect, useState } from 'react'
import { Sidebar } from '../components/Sidebar';

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CgProfile } from 'react-icons/cg'
//import style from "../Operacao/styles.module.css";

import { getUsuarios, authToken, updateUser } from "../services/usuarios-service"


export function Perfil() {
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
            const id = await authToken();
            const result = await getUsuarios(id.data);
            setUsuario(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className='vh-100 main-container d-flex'>
            <div className=''>
                <Sidebar />
            </div>
            <div className='w-75 p-4'>
                <div className='main-title'>
                    <h3>PERFIL</h3>
                    {usuario.name}

                </div>
                {/* --select bo."tipoOcorrencia" , count(1) total from "boletimOcorrencia" bo group by bo."tipoOcorrencia" */}


                <div className='charts'>


                </div>
            </div>

        </main>
    )
}

