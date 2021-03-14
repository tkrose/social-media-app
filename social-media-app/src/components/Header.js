import React from 'react';
import publicUrl from 'utils/publicUrl';
import css from 'Header.module.css';

function Header() {
    return (
        <nav className={css.header}>
            <div>
                <button>
                    <img src={publicUrl('/assets/camera.svg')} alt="Camera"/>
                </button>
            </div>
            <img src={publicUrl('/assets/logo.png')} alt="Logo"/>
            <div>
                <button>
                    <img src={publicUrl('/assets/message.svg')} alt="Messages"/>
                </button>
            </div>
        </nav>
    );
}

export default Header;