import React, { useEffect, useState } from "react";
import PageTitle from "components/helper/PageTitle";
import MainCard from "components/UI/MainCard";
import { useNavigate } from "react-router-dom";
import { useHttp } from "hooks/useHttp";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PATHS } from "App.constants";

function Currencies() {
  const {
    isLoading: currencyIsLoading,
    error: currencyError,
    fetchTask: getCurrencies,
  } = useHttp();
  const {
    isLoading: currencyPostIsLoading,
    error: currencyPostError,
    fetchTask: postCurrencies,
  } = useHttp();
  const [isPostingCurrency, setIsPostingCurrency] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  const navigate = useNavigate();

  const getCurrencyRequestConfig = {
    url: "http://localhost:8000/api/currencies",
    method: "GET",
  };

  const validationSchema = Yup.object().shape({
    currency: Yup.string()
      .min(3, "Must be exactly 3 characters")
      .max(3, "Must be exactly 3 characters")
      .required("Required!"),
  });

  useEffect(() => {
    getCurrencies(getCurrencyRequestConfig, handleGetCurrenciesResponse);
  }, []);

  function handlePostCurrencyResponse() {
    navigate(PATHS.HOME);
  }

  function handleSubmit(values) {
    const postCurrencyRequestConfig = {
      url: "http://localhost:8000/api/currencies",
      method: "POST",
      data: { currency: values.currency },
    };
    setIsPostingCurrency(true);
    postCurrencies(postCurrencyRequestConfig, handlePostCurrencyResponse);
  }

  function handleGetCurrenciesResponse(response) {
    setCurrencies(response.data);
  }

  return (
    <div>
      <PageTitle title="Currencies" />
      <MainCard>
        <div>
          {currencyIsLoading && <div>Fetching currencies...</div>}
          {!currencyIsLoading && currencyError && (
            <div>{currencyError.message}</div>
          )}
          {!currencyIsLoading &&
            !currencyError &&
            currencies &&
            currencies.length > 0 &&
            currencies.map((currency) => {
              return <div>{currency.code}</div>;
            })}
          {!currencyIsLoading &&
            !currencyError &&
            currencies &&
            currencies.length === 0 && <div>No currencies found!</div>}
        </div>
        {isPostingCurrency && currencyPostIsLoading && <div>Loading...</div>}
        {isPostingCurrency && !currencyPostIsLoading && currencyPostError && (
          <div>{currencyPostError.message}</div>
        )}
        {isPostingCurrency && !currencyPostIsLoading && !currencyPostError && (
          <div>Successfully added currency</div>
        )}
        <Formik
          initialValues={{ currency: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label htmlFor="currency">Currency:</label>
              <Field
                id="currency"
                name="currency"
                placeholder="Currency..."
              ></Field>
            </div>
            <div>
              <button type="submit">Add Currency</button>
            </div>
          </Form>
        </Formik>
      </MainCard>
    </div>
  );
}

export default Currencies;
