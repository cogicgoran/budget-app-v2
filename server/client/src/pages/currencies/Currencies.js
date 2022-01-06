import React, { useEffect, useState } from 'react';
import PageTitle from 'components/helper/PageTitle';
import MainCard from 'components/UI/MainCard';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'App.constants';

const ERROR_DEFAULT = {isError: false, message: ""}

function Currencies() {
  const [currencyList, setCurrencyList] = useState([]);
  const [currencyValue, setCurrencyValue] = useState("");
  const [error, setError] = useState(ERROR_DEFAULT);
  const navigate = useNavigate();

  function changeHandler(e) {
    setCurrencyValue(e.target.value);
  };

  useEffect(() => {
    async function fetchData () {
      const response = await fetch('http://localhost:8000/api/currencies',{
        method:'GET',
        headers: {
          'Content-Type': "application/json",
        }
      });
      const data = await response.json();
      console.log(data);
      setCurrencyList(data);
    };

    fetchData();
  },[]);
  
  async function submitHandler(e) {
    e.preventDefault();
    const value = currencyValue.trim();
    if ( value.length === 3 && ( /^[A-Z]+[A-Z]$/.test(value) || /^[a-z]+[a-z]$/.test(value) )) {
      var jsonBody = JSON.stringify({ currency : value});

      const response = await fetch('http://localhost:8000/api/currencies',{
        method:'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: jsonBody
      });

      if (response.status === 200) {
        navigate(PATHS.HOME);
      }
      console.log(response);
      const data = await response.json();
      console.log(data);
    } else {
      setError({isError: true, message:<p>Currency must be 3 characters long<br/>Either all capital or no capital letter allowed(A-Z)</p>})
    }
  }

  return (
    <div>
      <PageTitle title="Currencies"/>
      <MainCard>
        <div >
          {currencyList.length !== 0 
          ? currencyList.map(currency => {
            return <span>{currency.code}</span>
          }) 
          : <span>No currencies found!</span> }
        </div>
        {error.isError && error.message }
        <form onSubmit={submitHandler}>
          <label htmlFor="currency">Currency code:</label>
          <input required type="text" id='currency' name='currency' placeholder='eg. EUR / eur' value={currencyValue} onChange={changeHandler}/>
          <button type='submit'>Add Currency</button>
        </form>
      </MainCard>
    </div>
  );
};

export default Currencies;
