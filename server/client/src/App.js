import React, { useState } from 'react';
import styles from './App.module.css';
import Header from './components/header/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WithAuth from 'components/hoc/WithAuth';
import WithoutAuth from 'components/hoc/WithoutAuth';

import HomePage from 'pages/home-page/HomePage';
import { PATHS } from 'App.constants';
import AddNewReceipt from 'pages/add-new-receipt/AddNewReceipt';
import ViewReceipts from 'pages/view-receipts/ViewReceipts';
import ViewReceipt from 'pages/view-receipts/view-receipt/ViewReceipt';
import Statistics from 'pages/statistics/Statistics';
import Products from 'pages/products/Products';
import Categories from 'pages/categories/Categories';
import Currencies from 'pages/currencies/Currencies';
import Dashboard from 'pages/dashboard/Dashboard';
import Marketplaces from 'pages/marketplaces/Marketplaces';
import SignInSignUp from 'pages/sign-in-sign-up/SignInSignUp';
import AuthProvider from 'context/AuthContext';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getPreferedLanguage } from 'App.functions';

import translationsEn from './languages/en';
import translationsFr from './languages/fr';

const prefLanguage = getPreferedLanguage() || "en";
i18next
.use(initReactI18next)
.init(
  {
    resources: {
      en: { translation: translationsEn},
      fr: { translation: translationsFr}
    },
    lng:prefLanguage,
    fallbackLng:"en",
    interpolation: { escapeValue: false}
  });
  
  
  function App() {
  const [receipts, setReceipts] = useState([]);

  function addReceiptHandler(info, articles) {
    const newReceipt = {
      info,
      articles
    };

    setReceipts(prevState => {
      return [...prevState, newReceipt];
    });
  };

  function languageChangeHandler(event) {
    i18next.changeLanguage(event.target.value);
    document.cookie = `language=${event.target.value}; expires=Tue, 19 Jan 2038 03:14:07 UTC`;
  }

  return (
      <Router>
        <AuthProvider>
      <div className={styles["app-container"]}>
        <div className={styles["app-language"]}>
          <select name="language" id="" defaultValue={prefLanguage} onChange={languageChangeHandler}>
            <option value="en">ENG</option>
            <option value="fr">FRA</option>
          </select>
        </div>
        <Header />
        <Routes>
          <Route path={PATHS.HOME} element={<HomePage/>} />
          <Route path={PATHS.VIEW_RECEIPTS}>
            <Route path="" element={<WithAuth component={ViewReceipts} componentProps={{receipts}}/>} />
            <Route path=":ReceiptId" element={<WithAuth component={ViewReceipt} componentProps={{onAddReceipt:addReceiptHandler}}/>} />
          </Route>

          <Route path={PATHS.NEW_RECEIPTS} element={<WithAuth component={AddNewReceipt} componentProps={{onAddReceipt:addReceiptHandler}}/>} />
          {/* <Route path={PATHS.NEW_RECEIPTS} element={<AddNewReceipt onAddReceipt={addReceiptHandler} /> */}
          <Route path={PATHS.STATISTICS} element={<WithAuth component={Statistics}/>} />
          <Route path={PATHS.PRODUCTS} element={<WithAuth component={Products}/>} />
          <Route path={PATHS.CATEGORIES} element={<WithAuth component={Categories}/>} />
          <Route path={PATHS.CURRENCIES} element={<WithAuth component={Currencies}/>} />
          <Route path={PATHS.DASHBOARD} element={<WithAuth component={Dashboard}/>} />
          <Route path={PATHS.MARKETPLACES} element={<WithAuth component={Marketplaces}/>} />
          <Route path={PATHS.EDIT_RECEIPTS} element={<WithAuth component={ViewReceipt} componentProps={{onAddReceipt:addReceiptHandler}}/>} />
          <Route path={PATHS.SIGN_IN} element={<WithoutAuth component={SignInSignUp}/>} />
          {/* <Route path={PATHS.STATISTICS} element={<Statistics />} />
          <Route path={PATHS.PRODUCTS} element={<Products />} />
          <Route path={PATHS.CATEGORIES} element={<Categories />} />
          <Route path={PATHS.CURRENCIES} element={<Currencies />} />
          <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
          <Route path={PATHS.MARKETPLACES} element={<Marketplaces />} /> */}
          {/* <Route path={PATHS.EDIT_RECEIPTS + '/:ReceiptId'} element={<ViewReceipt onAddReceipt={addReceiptHandler}/>} /> */}
          <Route path='*' element={<Navigate replace to={PATHS.HOME} />}/>
        </Routes>
    </div>
    </AuthProvider>
      </Router>
  );
};

export default App;
