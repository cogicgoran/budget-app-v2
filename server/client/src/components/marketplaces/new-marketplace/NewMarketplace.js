import React, { useState } from 'react';
import styles from './NewMarketplace.module.css';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'App.constants';

const DEFAULT_MARKETPLACE = {name:"", address:""};

function NewMarketplace(props) {
  const [shop, setShop] = useState(DEFAULT_MARKETPLACE);
  const navigate = useNavigate();

  function changeHandler(e) {
    setShop(prevState => {
      return {
        ...prevState,
        [e.target.name]:e.target.value
      }
    });
  };

  async function submitHandler(event) {
    event.preventDefault();
    if (shop.name && shop.name.length > 0 && shop.address && shop.address.length > 0) {
      const shopData = {name:shop.name, address:shop.address};
      try{
        await fetch("http://localhost:8000/api/marketplaces",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(shopData)
        });
        navigate(PATHS.HOME);
      }catch(error) {
        alert(error.message)
      }
    };
  };

  return (
    <div className={styles['new-marketplace']}>
      <h3>NEW MARKETPLACE</h3>
      <form onSubmit={submitHandler}>
        <div className={styles['new-marketplace-input']}>
          <label htmlFor="shop_name">Shop name:</label>
          <input type="text" id='shop_name' name='name' placeholder='Name...' value={shop.name} onChange={changeHandler}/>
        </div>
        <div className={styles['new-marketplace-input']}>
          <label htmlFor="shop_address">Shop address:</label>
          <input type="text" id='shop_address' name='address' placeholder='Address...' value={shop.address} onChange={changeHandler}/>
        </div>
        <div className={styles['new-marketplace__controls']}>
          <button className={styles['new-marketplace__cancel-btn']} type='button' onClick={props.onCancel}>CANCEL</button>
          <button type='submit' className={styles['new-marketplace__confirm-btn']}>CONFIRM</button>
        </div>
      </form>
    </div>
  );
};

export default NewMarketplace;
