import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { PATHS } from 'App.constants';

function Header() {
    return (
        <Link to={PATHS.HOME}>
            <header className={styles.header}>
                <h1 className={styles['header__title']}>AragoK Budget App</h1>
            </header>
        </Link>
    )
};

export default React.memo(Header);