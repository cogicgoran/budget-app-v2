import React, { useEffect, useState } from 'react';

import PageTitle from 'components/helper/PageTitle';
import ViewReceipt from 'components/view-receipts/ViewReceipt';
import MainCard from 'components/UI/MainCard';

import styles from './ViewReceipts.module.css';

function ViewReceipts() {
  const [receipts, setReceipts] = useState([]);

  useEffect(async function fetchReceipts(){
    const response = await fetch("http://localhost:8000/api/receipts",{
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    setReceipts(data.results.map(result => {
      return {
        id: result.id,
        shop_name: result.shop_name,
        shop_address: result.shop_address,
        receipt_date: result.receipt_date,
        articles: JSON.parse(result.articles)
      }
    }));

  },[]);
  
  return (
    <div>
      <PageTitle title="Receipts" />
      <MainCard>
        <table className={styles['view-receipts-table']}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Shop Name</th>
                <th>Shop Address</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                receipts.map(receipt => {
                  return <ViewReceipt key={receipt.id} id={receipt.id} name={receipt.shop_name} address={receipt.shop_address} date={receipt.receipt_date}/>
                })
              }
            </tbody>
          </table>
      </MainCard>
    </div>
  );
};

export default ViewReceipts;
