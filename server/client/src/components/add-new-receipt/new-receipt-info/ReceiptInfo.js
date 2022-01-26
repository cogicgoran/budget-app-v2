import React, { useEffect, useMemo, useState } from 'react';
import styles from './ReceiptInfo.module.css';
import { PATHS } from 'App.constants';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHttp } from 'hooks/useHttp';


function ReceiptInfo(props) {
  const { t } = useTranslation();
  const textMarketplace = t('marketplace');
  const textDate = t('date');
  const textCurrency = t('currency');
  const textChoose = t('choose');
  const [currencyData, setCurrencyData] = useState(null);
  const [marketplaceData, setMarketplaceData] = useState(null);
  
  const {isLoading: currencyIsLoading, error: currencyError, fetchTask: fetchCurrencies} = useHttp();
  const {isLoading: marketplaceIsLoading, error: marketplaceError, fetchTask: fetchMarketplaces} = useHttp();
  
  const currencyRequestConfig = {
    url:"http://localhost:8000/api/currencies",
    method: "GET"
  }
  
  const marketplaceRequestConfig = {
    url:"http://localhost:8000/api/marketplaces",
    method: "GET"
  }
  
  useEffect(() => {
    fetchCurrencies(currencyRequestConfig, handleCurrencyDataResponse);
  }, []);
  
  useEffect(() => {
    fetchMarketplaces(marketplaceRequestConfig, handleMarketplaceDataResponse);
  }, []);
  
  const currencies = useMemo(() => currencyData && currencyData.length > 0 ? currencyData : null, [currencyData]);
  const marketplaces = useMemo(() => marketplaceData && marketplaceData.length > 0 ? marketplaceData : null, [marketplaceData]);
  
  const currencyDisplay = useMemo(() => {
    return currencies ? currencies.map(currency => <option value={currency.code}>{currency.code}</option>) : null
  },[currencies]);
  
  const marketplaceDisplay = useMemo(() => {
    return marketplaces ? marketplaces.map(marketplace => <option value={marketplace.id}>{marketplace.name} {marketplace.address}</option>) : null;
  }, [marketplaces]);

  function handleCurrencyDataResponse(response){
    setCurrencyData(response.data);
  }
  function handleMarketplaceDataResponse(response){
    setMarketplaceData(response.data);
  }

  function changeHandler(e) {
    props.onChangeValue(prevState => {
      return {
        ...prevState,
        [e.target.name]:e.target.value
      }
    });
  };

  return (
    <div className={styles['receipt-wrapper']}>
      <div className={styles['receipt-info-item']}>
        <label htmlFor='marketplace'>{textMarketplace}:</label>
        {marketplaceIsLoading && <p>Loading...</p> }
        {!marketplaceIsLoading && marketplaceError && <p>{marketplaceError.message}</p> }
        {!marketplaceIsLoading && !marketplaceError && marketplaces && <select name="marketplace" id="marketplace" value={props.value.marketplace} onChange={changeHandler}>
          <option hidden  value="">{textChoose}</option>
          {marketplaceDisplay}</select>
        }
        {!marketplaceIsLoading && !marketplaceError && !marketplaces && <span>There are no marketplaces found in the database. You can add one <Link to={PATHS.MARKETPLACES}><i>here</i></Link></span> 
        }
      </div>
      
      <div className={styles['receipt-info-item']}>
        <label htmlFor='date'>{textDate}:</label>
        <input type="datetime-local" name='date' id='date' value={props.value.date} onChange={changeHandler}/>
      </div>

      <div className={styles['receipt-info-item']}>
        <label htmlFor='currency'>{textCurrency}:</label>
        {currencyIsLoading && <p>Loading...</p> }
        {!currencyIsLoading && currencyError && <p>{currencyError.message}</p> }
        {!currencyIsLoading && !currencyError && currencies && <select name="currency" id="currency" value={props.value.currency} onChange={changeHandler}>
          <option hidden  value="">{textChoose}</option>
          {currencyDisplay}</select>
        }
        {!currencyIsLoading && !currencyError && !currencies && <span>There are no currencies found in the database. You can add one <Link to={PATHS.CURRENCIES}><i>here</i></Link></span>}
      </div>
    </div>
  );
};

export default ReceiptInfo;
