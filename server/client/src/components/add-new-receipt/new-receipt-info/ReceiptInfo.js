import React, { useEffect, useState } from 'react';
import styles from './ReceiptInfo.module.css';
import { PATHS } from 'App.constants';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ReceiptInfo(props) {
  const { t } = useTranslation();
  const [currencies, setCurrencies] = useState([]);
  const [marketplaces, setMarketplaces] = useState([]);

  const textMarketplace = t('marketplace');
  const textDate = t('date');
  const textCurrency = t('currency');
  const textChoose = t('choose');

  function changeHandler(e) {
    props.onChangeValue(prevState => {
      return {
        ...prevState,
        [e.target.name]:e.target.value
      }
    });
  };

  var currencyDisplay;
  if (currencies.length > 0) {
    currencyDisplay = currencies.map(currency => {
      return <option value={currency.code}>{currency.code}</option>
    });
  };

  var marketplaceDisplay;
  if (marketplaces.length > 0) {
    marketplaceDisplay = marketplaces.map(marketplace => {
      return <option value={marketplace.id}>{marketplace.name} {marketplace.address}</option>
    });
  };

  useEffect(() => {
    async function fetchCurrencies() {
      const response = await fetch("http://localhost:8000/api/currencies",{
        method:"GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      const response1 = await fetch("http://localhost:8000/api/marketplaces",{
        method:"GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data1 = await response1.json();

      setCurrencies(data);
      setMarketplaces(data1);
    }
    fetchCurrencies();
  }, []);

  return (
    <div className={styles['receipt-wrapper']}>
      <div className={styles['receipt-info-item']}>
        <label htmlFor='marketplace'>{textMarketplace}:</label>
        
        {marketplaces.length > 0 && <select name="marketplace" id="marketplace" value={props.value.marketplace} onChange={changeHandler}>
          <option hidden  value="">{textChoose}</option>
          {marketplaceDisplay}</select>}
        {marketplaces.length === 0 && <span>There are no marketplaces found in the database. You can add one <Link to={PATHS.MARKETPLACES}><i>here</i></Link></span> }
      </div>
      
      <div className={styles['receipt-info-item']}>
        <label htmlFor='date'>{textDate}:</label>
        <input type="datetime-local" name='date' id='date' value={props.value.date} onChange={changeHandler}/>
      </div>

      <div className={styles['receipt-info-item']}>
        <label htmlFor='currency'>{textCurrency}:</label>
        {currencies.length > 0 && <select name="currency" id="currency" value={props.value.currency} onChange={changeHandler}>
          <option hidden  value="">{textChoose}</option>
          {currencyDisplay}</select>}
        {currencies.length === 0 && <span>There are no currencies found in the database. You can add one <Link to={PATHS.CURRENCIES}><i>here</i></Link></span>  }
      </div>
    </div>
  );
};

export default ReceiptInfo;
