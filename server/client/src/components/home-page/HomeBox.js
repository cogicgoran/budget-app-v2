import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeBox.module.css';

function HomeBox({pathTo, children}) {
  return (
    <Link to={pathTo}>
      <div className={styles["home__box"]}>
        {children}
      </div>
    </Link>
  );
};

export default HomeBox;
