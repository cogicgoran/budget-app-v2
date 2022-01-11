import React, { useState } from 'react';
import styles from './App.module.css';
import Header from './components/header/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

  return (
    <div className={styles["app-container"]}>
      <Router>
        <Header />
        <Routes>
          <Route path={PATHS.HOME} element={<HomePage/>} />
          <Route path={PATHS.VIEW_RECEIPTS}>
            <Route path="" element={<ViewReceipts receipts={receipts}/>} />
            <Route path=":ReceiptId" element={<ViewReceipt onAddReceipt={addReceiptHandler}/>} />
          </Route>
          <Route path={PATHS.NEW_RECEIPTS} element={<AddNewReceipt onAddReceipt={addReceiptHandler} />} />
          <Route path={PATHS.STATISTICS} element={<Statistics />} />
          <Route path={PATHS.PRODUCTS} element={<Products />} />
          <Route path={PATHS.CATEGORIES} element={<Categories />} />
          <Route path={PATHS.CURRENCIES} element={<Currencies />} />
          <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
          <Route path={PATHS.MARKETPLACES} element={<Marketplaces />} />
          <Route path='*' element={<Navigate replace to={PATHS.HOME} />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
