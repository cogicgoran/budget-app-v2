import React from 'react';

import DashboardCategories from 'components/dashboard/DashboardCategories';
import DashboardCurrentMonth from 'components/dashboard/DashboardCurrentMonth';
import DashboardRecentReceipts from 'components/dashboard/DashboardRecentReceipts';

import styles from './Dashboard.module.css';

function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <DashboardRecentReceipts/>
            <DashboardCurrentMonth/>
            <DashboardCategories/>
        </div>
    );
};

export default Dashboard;
