import React from 'react';
import Header from './Header';
import Home from './Home';
import Navbar from './Navbar';
import css from 'App.module.css';

function App() {
    return (
        <div className={css.container}>
            <Header/>
            <main className={css.content}>
                <Home/>
            </main>
            <Navbar/>
        </div>
    )
}

export default App;