import React from 'react'
import {
    BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsArrowLeftSquareFill
}
    from 'react-icons/bs'

import { MdReport } from 'react-icons/md'
import { GrUserPolice } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { GiPoliceBadge } from 'react-icons/gi'




export function Sidebar({ openSidebarToggle, OpenSidebar }) {

    const navigate = useNavigate();
    const logout = () => {

        sessionStorage.removeItem('token');
        navigate('/');
    }
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <GrUserPolice className='icon_header' /> GOC
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>

                <a onClick={() => navigate('/perfil')}>
                    <li className='sidebar-list-item'>

                        <CgProfile className='icon' /> Perfil
                    </li>
                </a>

                <a onClick={() => navigate('/telainicial')}>
                    <li className='sidebar-list-item'>

                        <BsGrid1X2Fill className='icon' /> Dashboard

                    </li>
                </a>
                <a onClick={() => navigate('/crud/boletimOcorrencia')}>
                    <li className='sidebar-list-item'>

                        <MdReport className='icon' /> Boletim Ocorrência

                    </li>
                </a>
                <a onClick={() => navigate('/crud/delegacia')}>
                    <li className='sidebar-list-item'>

                        <GiPoliceBadge className='icon' /> Delegacias

                    </li>
                </a>
                <a onClick={logout}>
                    <li className='sidebar-list-item'>

                        <BsArrowLeftSquareFill className='icon' /> Logout

                    </li>
                </a>
                {/* <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillGrid3X3GapFill className='icon' /> Categories
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsPeopleFill className='icon' /> Customers
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsListCheck className='icon' /> Inventory
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsMenuButtonWideFill className='icon' /> Reports
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillGearFill className='icon' /> Setting
                    </a>
                </li> */}
            </ul>
        </aside>
    )
}
