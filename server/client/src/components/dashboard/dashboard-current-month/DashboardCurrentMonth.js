import React, { useEffect, useState } from 'react'
import styles from './DashboardCurrentMonth.module.css';
import { handleIncomingArticles } from './DashboardCurrentMonth.functions';
import CategoryReceipt from './category-receipt/CategoryReceipt';

function DashboardCurrentMonth() {
    const [total, setTotal] = useState(0);
    const [categories, setCategories] = useState([]);

    var display;

    if ( categories.length > 0) {
        display = categories.map(category => {
            console.log(category);
            return <CategoryReceipt key={category.category_name} {...category}/>;
        });
    } else {
        display = "No cats";
    }

    useEffect(() => {
        // setIsLoading(true);
        // setIsDataSet(false);
        async function fetchReceipts(){
            const response = await fetch("http://localhost:8000/api/receipts-current-month",{
              method:"GET",
              headers: {
                'Content-Type': 'application/json'
              }
            });
            
            const data = await response.json();
            const [categories, total] = handleIncomingArticles(data);
            console.log(total, categories);
            setTotal(total);
            setCategories(categories);
            // setReceipts(handleIncomingArticles(data));
            // setIsDataSet(true);
            // setIsLoading(false);
          };
          fetchReceipts();
    }, []);

    return (
        <div className={styles['dashboard-current-month']}>
            <div className={styles['dashboard-current-month__header']}><span>CURRENT <br /> MONTH</span></div>
            <div className={styles['dashboard-current-month__total']}><span>{total} <br /> RSD</span></div>
            <div className={styles['dashboard-current-month__categories']}>{display}</div>
        </div>
    )
}

export default DashboardCurrentMonth
