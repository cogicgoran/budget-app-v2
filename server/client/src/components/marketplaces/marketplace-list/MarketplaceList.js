import React, { useEffect, useState} from 'react';
import MarketplaceItem from './marketplace-item/MarketplaceItem';
import styles from './MarketplaceList.module.css';

function MarketplaceList(props) {
  const [marketplaces, setMarketplaces] = useState([]);

  if (marketplaces.length > 0) {
    var display = <table className={styles['marketplace-list__table']}>
      <thead><th>id</th><th>Name</th><th>Address</th><th></th></thead>
      <tbody>
      {marketplaces.map(marketplace =>  <MarketplaceItem key={marketplace.id} marketplace={marketplace}/>)}
      </tbody></table>
  } else {
    var display = <div>No Marketplaces found. You can add one <button onClick={props.onNoMarketplaces}><i>here</i></button></div>
  }

  useEffect(() => {
    async function fetchCurrencies() {
      const response = await fetch("http://localhost:8000/api/marketplaces",{
        method:"GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      setMarketplaces(data);
    }
    fetchCurrencies();
  }, []);

  return (
    <div>
      {display}
    </div>
  );
};

export default MarketplaceList;
