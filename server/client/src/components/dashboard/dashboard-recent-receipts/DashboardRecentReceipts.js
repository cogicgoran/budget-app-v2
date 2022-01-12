import React, { useState, useEffect } from 'react';
import styles from './DashboardRecentReceipts.module.css';
import { handleIncomingArticles } from './DashboardRecentReceipts.functions';
import { Link } from 'react-router-dom';
import { PATHS } from 'App.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

import Receipt from './Receipt/Receipt';

function DashboardRecentReceipts() {
    const [receipts, setReceipts] = useState([]);
    const [isDataSet, setIsDataSet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    var dataResponse;
    if ( receipts.length > 0) {
        dataResponse = receipts.map(receipt => {
            return <Receipt key={receipt.receipt_id} {...receipt} />
        });
    } else {
        dataResponse  = <div className={styles['dashboard_no-recent_results']}><FontAwesomeIcon className={styles['dashboard_no-recent_results-icon']} icon={faFileLines} /><span>There are no receipts in the past 90 days</span> </div>;
    };

    useEffect(() => {
        setIsLoading(true);
        setIsDataSet(false);
        async function fetchReceipts(){
            const response = await fetch("http://localhost:8000/api/receipts-latest",{
              method:"GET",
              headers: {
                'Content-Type': 'application/json'
              }
            });
            
            const data = await response.json();
            setReceipts(handleIncomingArticles(data));
            setIsDataSet(true);
            setIsLoading(false);
          };
          fetchReceipts();
    }, [])

    return (
        <div className={styles['dashboard-recent']}>
            <h2>RECENT RECEIPTS</h2>
            <div>
                {isLoading && !isDataSet && <p>Loading...</p> }
                {!isLoading && isDataSet && dataResponse}
                <div className={styles['dashboard-recent__controls']}>
                    <Link to={PATHS.VIEW_RECEIPTS}><button type='button'>SEE MORE</button></Link>
                    <Link to={PATHS.NEW_RECEIPTS}><button type='button'>ADD NEW</button></Link>
                </div>
                
            </div>
        </div>
    );
};

export default DashboardRecentReceipts;
