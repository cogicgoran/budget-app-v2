import React, { useState } from 'react';

const DEFAULT_MARKETPLACE = {name:"", address:""};

function Marketplaces() {
  const [shop, setShop] = useState(DEFAULT_MARKETPLACE);

  function changeHandler(e) {
    setShop(prevState => {
      return {
        ...prevState,
        [e.target.name]:e.target.value
      }
    });
  };

  async function submitHandler() {
    if (shop.name && shop.name.length > 0 && shop.address && shop.address.length > 0) {
      const shopData = {name:shop.name, address:shop.address};
      const response = await fetch("http://localhost:8000/api/marketplaces",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shopData)
      });
      console.log(response);
    };
  };

  return (
    <div>
      <h3>ADD NEW MARKETPLACE</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="shop_name">Shop name:</label>
          <input type="text" id='shop_name' name='name' placeholder='Name...' value={shop.name} onChange={changeHandler}/>
        </div>
        <div>
          <label htmlFor="shop_address">Shop address:</label>
          <input type="text" id='shop_address' name='address' placeholder='Address...' value={shop.address} onChange={changeHandler}/>
        </div>
        <div>
          <button type='submit'>CONFIRM</button>
        </div>
      </form>
    </div>
  );
};

export default Marketplaces;
