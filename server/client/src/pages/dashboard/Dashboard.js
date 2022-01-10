import React from 'react';

import DashboardCategories from 'components/dashboard/dashboard-categories/DashboardCategories';
import DashboardCurrentMonth from 'components/dashboard/dashboard-current-month/DashboardCurrentMonth';
import DashboardRecentReceipts from 'components/dashboard/dashboard-recent-receipts/DashboardRecentReceipts';

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
