import React from 'react';
import styles from './DashboardCategories.module.css';
import { useTranslation } from 'react-i18next';
import DashboardLatestCategory from './dashboard-latest-category/DashboardLatestCategory';


function DashboardCategories() {
    const { t } = useTranslation();
    const textCategories = t('categories');
    
    return (
        <div className={styles['dashboard-categories-wrapper']}>
            <h2>{textCategories}</h2>
            <div className={styles['dashboard-categories']}>
                <DashboardLatestCategory category="food" />
                <DashboardLatestCategory category="gas" />
                <DashboardLatestCategory category="groceries" />
            </div>
        </div>
    );
};

export default DashboardCategories;
