import React from 'react';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/bills">Bills</Link>
        </div>
    );
};

export default Home;