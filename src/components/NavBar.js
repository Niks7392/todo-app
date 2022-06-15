import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {

    // navbar logic because bootstarp gives hamburger click error in react :(
    const [navOpen, setnavOpen] = useState(false)
    const toggleBar = ()=>{
        const navItems = document.getElementById('navItems')
        if(!navOpen){
            navItems.classList.add('navCollapse')
            setnavOpen(true)
        }else{
            navItems.classList.remove('navCollapse')
            setnavOpen(false)
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">ToDo ~Niks7392</NavLink>
                <button onClick={toggleBar} className="navbar-toggler" type='button'>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navItems">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{margin: 'auto'}}>
                        <li className="nav-item mx-3 ">
                            <NavLink className="nav-link " aria-current="page" to="/">Tasks &nbsp;{taskLogo}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create-new-task">Create Task &nbsp;{newTaskLogo}</NavLink>
                        </li>
                    </ul>
                    <li className="nav-items" style={{ listStyle: 'none' }}>
                        <NavLink className="nav-link" to='/user-profile'>Your Account {userLogo}</NavLink>
                    </li>
                </div>
            </div>
        </nav>
    )
}


const userLogo = <i className="fa-solid fa-user"></i>;
const taskLogo = <i className="fa-solid fa-list-check"></i>;
const newTaskLogo = <i className="fa-solid fa-pen-to-square"></i>;
