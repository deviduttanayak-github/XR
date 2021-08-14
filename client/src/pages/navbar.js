import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(props) {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Expense Tracker</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/payment">Payment</Link>
                    </li>
                    </ul>
                </div>
                <span className="navbar-text">
                {
                    props.user ? <span className="mx-4 badge bg-warning text-dark">Hello {props.user.name}</span> : 
                                <span className="mx-4 badge bg-warning text-dark">You haven't signed in</span>
                }
                </span>
            </nav>
        </div>
    )
}

export default Navbar
