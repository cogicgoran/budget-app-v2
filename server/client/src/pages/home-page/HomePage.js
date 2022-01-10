import React from 'react';
import { PATHS } from 'App.constants';
import HomeBox from 'components/home-page/HomeBox';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles["home-wrapper"]}>
      <HomeBox pathTo={PATHS.DASHBOARD}>Dashboard</HomeBox>
      <HomeBox pathTo={PATHS.VIEW_RECEIPTS}>View Receipts</HomeBox>
      <HomeBox pathTo={PATHS.NEW_RECEIPTS}>Add New Receipt</HomeBox>
      <HomeBox pathTo={PATHS.CATEGORIES}>Categories</HomeBox>
      <HomeBox pathTo={PATHS.STATISTICS}>Statistics</HomeBox>
      <HomeBox pathTo={PATHS.PRODUCTS}>View Products</HomeBox>
      <HomeBox pathTo={PATHS.CURRENCIES}>Currencies</HomeBox>
    </div>
  );
};

export default HomePage;


