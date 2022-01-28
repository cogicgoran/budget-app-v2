import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { PATHS } from 'App.constants';
import { useAuth } from 'context/AuthContext';
import UserLoggedDisplay from './UserLoggedDisplay';

function Header() {
    const { currentUser } = useAuth();

    return (
        <Link to={PATHS.HOME}>
            <header className={styles.header}>
                <h1 className={styles['header__title']}>AragoK Budget App</h1>
                {currentUser && <UserLoggedDisplay />}
            </header>
        </Link>
    )
};

export default React.memo(Header);