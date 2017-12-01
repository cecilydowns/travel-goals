import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const Home = (props) => {

    if(props.loggedIn){
        return(
            <Redirect to="/trips" />
        )
    }

    return (
        <div className="home-background">
            <div className="home">
                <h2>Where would you like to go?</h2>
                <p>TripGoals is a convenient app for tracking where we want
                to go and what we'd like to do there. To get started, login
                or register for a new account.</p>
                <Link to='/login' className='home-button'>Login</Link>
                <Link to='/signup' className='home-button'>Sign Up</Link>
            </div>
        </div>
    )
}

export default Home