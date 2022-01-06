import React from 'react'
import styles from './DashboardCurrentMonth.module.css';

function DashboardCurrentMonth() {
    return (
        <div className={styles['dashboard-current-month']}>
            <div className={styles['dashboard-current-month__header']}><span>CURRENT <br /> MONTH</span></div>
            <div><span>0 <br /> RSD</span></div>
        </div>
    )
}

export default DashboardCurrentMonth
