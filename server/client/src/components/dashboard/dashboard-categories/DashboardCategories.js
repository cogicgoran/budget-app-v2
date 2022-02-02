import React from 'react';
import styles from './DashboardCategories.module.css';
import { useTranslation } from 'react-i18next';
import DashboardLatestCategory from './dashboard-latest-category/DashboardLatestCategory';
import { Link } from 'react-router-dom';
import { PATHS } from 'App.constants';


function DashboardCategories() {
    const { t } = useTranslation();
    const textCategories = t('categories');
    const textSeeMore = t('seeMore');
    
    return (
        <div className={styles['dashboard-categories-wrapper']}>
            <h2>{textCategories}</h2>
            <div className={styles['dashboard-categories']}>
                <DashboardLatestCategory category="food" />
                <DashboardLatestCategory category="gas" />
                <DashboardLatestCategory category="groceries" />
                <DashboardLatestCategory category="groceries" />
                <DashboardLatestCategory category="groceries" />
                <Link to={PATHS.CATEGORIES}><button>{textSeeMore}</button></Link>
            </div>
        </div>
    );
};

export default DashboardCategories;
