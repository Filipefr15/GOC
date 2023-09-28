import { React, useState } from 'react'
import { BsFillBellFill }
    from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';
import { Sidebar } from '../components/Sidebar';
import { FaPeopleRobbery } from 'react-icons/fa6'
import { GiRobber } from 'react-icons/gi'
import { FaSadCry } from 'react-icons/fa'


export function TelaInicial() {


    const data = [
        {
            name: 'Roubos',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Injúrias',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Furtos',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Alerts',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

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
                    <h3>DASHBOARD</h3>
                </div>
                {/* --select bo."tipoOcorrencia" , count(1) total from "boletimOcorrencia" bo group by bo."tipoOcorrencia" */}
                <div className='main-cards'>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>ROUBOS</h3>

                            <FaPeopleRobbery className='card_icon' />
                        </div>
                        <h1>300</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>INJÚRIAS</h3>
                            <FaSadCry className='card_icon' />
                        </div>
                        <h1>12</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>FURTOS</h3>
                            <GiRobber className='card_icon' />
                        </div>
                        <h1>3544</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>ALERTS</h3>
                            <BsFillBellFill className='card_icon' />
                        </div>
                        <h1>42</h1>
                    </div>
                </div>

                <div className='charts'>
                    <ResponsiveContainer width="100%" height="100%">
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
                    </ResponsiveContainer>

                </div>
            </div>

        </main>
    )
}

