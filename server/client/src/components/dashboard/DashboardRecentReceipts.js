import React, { useState, useEffect } from 'react';
import styles from './DashboardRecentReceipts.module.css';

import Receipt from './Receipt/Receipt';

function DashboardRecentReceipts() {
    const [receipts, setReceipts] = useState([]);
    const [isDataSet, setIsDataSet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    var dataResponse;
    if ( receipts.length > 0) {
        dataResponse = receipts.map(receipt => {
            return <Receipt key={receipt.id} {...receipt} />
        });
    } else {
        dataResponse  = <p>There are no receipts in the past 90 days!</p>;
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
            console.log(response);
            const data = await response.json();
            setReceipts(data);
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
            </div>
        </div>
    );
};

export default DashboardRecentReceipts;
