import React from 'react';
import styles from './ReceiptInfo.module.css';

function ReceiptInfo(props) {
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
      <div>
        <div><label htmlFor="shop-name">Shop Name</label></div>
        <input type="text" name="name" id='shop-name' value={props.value.name} onChange={changeHandler}/>
      </div>

      <div>
        <div><label htmlFor="shop-address">Shop Address</label></div>
        <input type="text" name="address" id='shop-address' value={props.value.address} onChange={changeHandler}/>
      </div>
      
      <div>
        <div><label>Receipt Date</label></ div>
        <div className={styles['receipt-date-wrapper']}>
        <input required type="text" name="date-day" id='receipt-date-day' placeholder="DD" value={props.value['date-day']} onChange={changeHandler}/>
        <input required type="text" name="date-month" id='receipt-date-month'  placeholder="MM" value={props.value['date-month']} onChange={changeHandler}/>
        <input required type="text" name="date-year" id='receipt-date-year' placeholder="YYYY" value={props.value['date-year']} onChange={changeHandler}/>
        <input type="text" name="date-hour" id='receipt-date-hour' placeholder="hh(24)" value={props.value['date-hour']} onChange={changeHandler}/>
        <input type="text" name="date-minute" id='receipt-date-minute' placeholder="mm" value={props.value['date-minute']} onChange={changeHandler}/>
        </div>
      </div>

      
    </div>
  );
};

export default ReceiptInfo;
