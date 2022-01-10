import React from 'react';
import { useState } from "react";
import UserComponent from './Signin';
import App from '../App';
import { Link } from "react-router-dom";

export default function Header(props) {

    const { countCartItems } = props.countCartItems;
    console.log(countCartItems)
    const [openSidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!openSidebar, console.log(openSidebar));

    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }
        window.addEventListener('resize', handleResize)
    })

    return (

        < header >
            <nav>
                <a href="/" className="logo">Coverflex Challenge</a>
                <div className="mobile-menu" onClick={showSidebar}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>

                {openSidebar || window.innerWidth >= 1000 ? (
                    <ul className="nav-list">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="signin">Sign in</Link>
                        </li>
                        <li>
                            <p className="">
                                <svg xmlns="http://www.w3.org/2000/svg" className="small-icon" fill="none" viewBox="0 0 24 24" stroke="#f8f4f2">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>{countCartItems}</p>
                        </li>
                    </ul>
                ) : (
                    ''
                )}
            </nav>
        </header >
    )
}