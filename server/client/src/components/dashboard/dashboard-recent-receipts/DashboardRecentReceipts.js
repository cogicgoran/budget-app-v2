import React, { useState, useEffect } from 'react';
import styles from './DashboardRecentReceipts.module.css';
import { handleIncomingArticles } from './DashboardRecentReceipts.functions';
import { Link } from 'react-router-dom';
import { PATHS } from 'App.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import useFetch from 'hooks/useFetch';

import Receipt from './Receipt/Receipt';

function DashboardRecentReceipts() {
    const { t } = useTranslation();
    const [receipts, setReceipts] = useState([]);
    const [isDataSet, setIsDataSet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const textRecentReceipts = t('recentReceipts');
    const textSeeMore = t('seeMore');
    const textAddNew = t('addNew');
    const textNoReceipts = t('noReceipts');

    var dataResponse;
    if ( receipts.length > 0) {
        dataResponse = receipts.map(receipt => {
            return <Receipt key={receipt.receipt_id} {...receipt} />
        });
    } else {
        dataResponse  = <div className={styles['dashboard_no-recent_results']}><FontAwesomeIcon className={styles['dashboard_no-recent_results-icon']} icon={faFileLines} /><span>{textNoReceipts}</span> </div>;
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
            <h2>{textRecentReceipts}</h2>
            <div>
                {isLoading && !isDataSet && <p>Loading...</p> }
                {!isLoading && isDataSet && dataResponse}
                <div className={styles['dashboard-recent__controls']}>
                    <Link to={PATHS.VIEW_RECEIPTS}><button type='button'>{textSeeMore}</button></Link>
                    <Link to={PATHS.NEW_RECEIPTS}><button type='button'>{textAddNew}</button></Link>
                </div>
                
            </div>
        </div>
    );
};

export default DashboardRecentReceipts;
