import React from 'react';
import publicUrl from 'utils/publicUrl';
import css from 'Navbar.module.css';

function Navbar() {
    return (
        <nav className={css.navbar}>
            <div className={css.navItem}>
                <button>
                    <img src={publicUrl('/assets/home.svg')} alt="Home"/>
                </button>
            </div>
            <div className={css.navItem}>
                <button>
                    <img src={publicUrl('/assets/explore.svg')} alt="Explore"/>
                </button>
            </div>
						...
        </nav>
    );
}

export default Navbar;