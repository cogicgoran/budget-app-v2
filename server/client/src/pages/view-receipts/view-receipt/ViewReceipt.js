import React, { useState, useEffect } from 'react';
import PageTitle from 'components/helper/PageTitle';
import { useParams } from 'react-router-dom';
import AddNewReceipt from 'pages/add-new-receipt/AddNewReceipt';

function ViewReceipt(props) {
  const [receipt, setReceipt] = useState({});
  const [isReceiptSet, setIsReceiptSet] = useState(false);
  const { ReceiptId } = useParams();

  if (isReceiptSet) {
    const date = new Date(receipt.receipt_date);
    var infoObject = {
      id: receipt.id,
      name:receipt.shop_name,
      address:receipt.shop_address,
      'date-day':date.getDate(),
      'date-month':date.getMonth() + 1,
      'date-year':date.getFullYear(),
      'date-hour':date.getHours(),
      'date-minute':date.getMinutes(),
    };
    var articles = JSON.parse(receipt.articles);
  }

  useEffect(async function() {
    const response = await fetch(`http://localhost:8000/receipts/${ReceiptId}`,{
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();

    if (data?.result) {
      setReceipt(data.result);
      setIsReceiptSet(true);
    }
  },[]);

  return (
    <div>
      <PageTitle title={"Receipt ID:" + ReceiptId} />
      {isReceiptSet ? <AddNewReceipt onAddReceipt={props.onAddReceipt} isUpdating={true} info={infoObject} articles={articles}/> : "not set"}
    </div>
  );
};

export default ViewReceipt;
