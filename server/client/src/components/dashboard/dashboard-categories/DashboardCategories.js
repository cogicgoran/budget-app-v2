import React from 'react';
import styles from './DashboardCategories.module.css';
import { useTranslation } from 'react-i18next';

function DashboardCategories() {
    const { t } = useTranslation();
    const textCategories = t('categories');
    
    return (
        <div className={styles['dashboard-categories']}>
            <h2>{textCategories}</h2>
            <div></div>
        </div>
    );
};

export default DashboardCategories;
