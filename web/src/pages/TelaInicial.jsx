import { React, useEffect, useState } from 'react'
import { BsFillBellFill }
    from 'react-icons/bs'
import { Sidebar } from '../components/Sidebar';
import { FaPeopleRobbery } from 'react-icons/fa6'
import { GiRobber } from 'react-icons/gi'
import { FaSadCry } from 'react-icons/fa'
import { countFurtos, countRoubos, countInjurias, countBoletinsUrgentes } from '../services/boletim-ocorrencia-service'
import { Graphic } from "../components/Graphic";
import { Col } from "react-bootstrap";
import { Graphic2 } from '../components/Graphic2';



export function TelaInicial() {


    const [numFurtos, setNumFurtos] = useState(0);
    const [numRoubos, setNumRoubos] = useState(0);
    const [numInjurias, setNumInjurias] = useState(0);
    const [numUrgencias, setNumUrgencias] = useState(0);

    useEffect(() => {
        contadorFurtos();
        contadorRoubos();
        contadorInjurias();
        contadorUrgencias();
    }, []);

    async function contadorFurtos() {
        try {
            const result = await countFurtos();
            setNumFurtos(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function contadorRoubos() {
        try {
            const result = await countRoubos();
            setNumRoubos(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function contadorInjurias() {
        try {
            const result = await countInjurias();
            setNumInjurias(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function contadorUrgencias() {
        try {
            const result = await countBoletinsUrgentes();
            setNumUrgencias(result.data);
        } catch (error) {
            console.error(error);
        }
    }


    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <main className='vh-100 main-container d-flex'>
            <div className=''>
                <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            </div>
            <div className='w-75 p-4'>
                <div className='main-title'>
                    <h3>DASHBOARDS</h3>
                </div>
                {/* --select bo."tipoOcorrencia" , count(1) total from "boletimOcorrencia" bo group by bo."tipoOcorrencia" */}
                <div className='main-cards'>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>ROUBOS</h3>

                            <FaPeopleRobbery className='card_icon' />
                        </div>
                        <h1>{numRoubos}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>INJÚRIAS</h3>
                            <FaSadCry className='card_icon' />
                        </div>
                        <h1>{numInjurias}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>FURTOS</h3>
                            <GiRobber className='card_icon' />
                        </div>
                        <h1>{numFurtos}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>URGENTES</h3>
                            <BsFillBellFill className='card_icon' />
                        </div>
                        <h1>{numUrgencias}</h1>
                    </div>
                </div>


                <div className="row">
                    <Col sm={6}>
                        <Graphic />
                    </Col>
                    <Col sm={6}>
                        <Graphic2 />
                    </Col>
                </div>
                {/* <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer> */}


            </div>

        </main>
    )
}

