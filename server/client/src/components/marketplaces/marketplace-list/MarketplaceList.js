import React, { useEffect, useMemo, useState } from 'react';
import MarketplaceItem from './marketplace-item/MarketplaceItem';
import styles from './MarketplaceList.module.css';
import { useHttp } from 'hooks/useHttp';

function MarketplaceList(props) {
  const [marketplaces, setMarketplaces] = useState(null);
  const {isLoading, error, fetchTask} = useHttp();

  const marketplaceRequestConfig = {
    url:"http://localhost:8000/api/marketplaces",
    method:"GET"
  };

  useEffect(() => {
    fetchTask(marketplaceRequestConfig, handleMarketplaceResponse);
  }, []);

  function handleMarketplaceResponse(response){
    setMarketplaces(response.data);
  };

  const display = useMemo(() => {
    return marketplaces && marketplaces.length > 0 
    ? <table className={styles['marketplace-list__table']}>
      <thead><th>id</th><th>Name</th><th>Address</th><th></th></thead>
      <tbody>
      {marketplaces.map(marketplace =>  <MarketplaceItem key={marketplace.id} marketplace={marketplace}/>)}
      </tbody></table> 
    : <div>No Marketplaces found. You can add one <button onClick={props.onNoMarketplaces}    ><i>here</i></button></div>;
  }, [marketplaces, props.onNoMarketplaces]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <div>{error.message}</div> }
      {!isLoading && !error && display}
    </div>
  );
};

export default MarketplaceList;
