import React, { useState } from 'react';
import styles from './Marketplaces.module.css';

import MarketplaceList from 'components/marketplaces/marketplace-list/MarketplaceList';
import NewMarketplace from 'components/marketplaces/new-marketplace/NewMarketplace';
import Backdrop from 'components/UI/backdrop/Backdrop';
import ReactDOM from 'react-dom';

function Marketplaces() {
    const [ showModal, setShowModal] = useState(false);

    return (
    <div className={styles.marketplaces}>
      <MarketplaceList onNoMarketplaces={() => setShowModal(true)}/>
      <button className={styles['new-marketplace__show-btn']} onClick={() => {setShowModal(true)}}>+ ADD MARKETPLACE</button>
      {showModal && ReactDOM.createPortal( <Backdrop onCancel={() => setShowModal(false)}/>, document.getElementById('backdrop-root'))}
      {showModal && ReactDOM.createPortal( <NewMarketplace onCancel={() => setShowModal(false)}/>, document.getElementById('overlay-root'))}
    </div>
  );
};

export default Marketplaces;
