import { React, useEffect, useState } from 'react'
import { Sidebar } from '../components/Sidebar';
import '../styles/perfil.css'

import { useNavigate } from "react-router-dom";

import { CgProfile } from 'react-icons/cg'
//import style from "../Operacao/styles.module.css";

import { getOneUsuarios, authToken } from "../services/usuarios-service"


export function Perfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);

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
            <div className=''>
                <Sidebar />
            </div>
            <div className='w-75 p-4'>


                <body>
                    <div class="profile-container">
                        <div className='main-title'>
                            <h3>PERFIL</h3>
                        </div>
                        <hr></hr>
                        <div class="profile-item">
                            <span class="profile-label">Nome:</span>
                            <span class="profile-data">{usuario.name}</span>
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
                    </div>
                </body>



                {/* --select bo."tipoOcorrencia" , count(1) total from "boletimOcorrencia" bo group by bo."tipoOcorrencia" */}


                <div className='charts'>


                </div>
            </div>



        </main>
    )
}

