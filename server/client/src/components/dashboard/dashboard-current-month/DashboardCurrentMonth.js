import React, { useEffect, useMemo, useState } from "react";
import styles from "./DashboardCurrentMonth.module.css";
import { handleIncomingArticles } from "./DashboardCurrentMonth.functions";
import CategoryReceipt from "./category-receipt/CategoryReceipt";
import { Trans } from "react-i18next";
import { useHttp } from "hooks/useHttp";


function DashboardCurrentMonth() {
  const [receipts, setReceipts] = useState(null);
  const {isLoading, error, fetchTask} = useHttp();
  
  const receiptsRequestConfig = {
    url:"http://localhost:8000/api/receipts/current-month",
    method: "GET"
  };
  
  useEffect(() => {
    fetchTask(receiptsRequestConfig, handleReceiptsResponse);
  }, []);

  var [categories, total] = useMemo(() => {
    return receipts ? handleIncomingArticles(receipts) : [null, null]
  }, [receipts]);
  
  const textCurrentMonth = (
    <Trans components={{ br: <br /> }}>currentMonth</Trans>
  );
    
  var display;
  
  if (categories && categories.length > 0) {
    display = categories.map((category) => {
      return <CategoryReceipt key={category.category_name} {...category} />;
    });
  } else {
    display = "No cats";
  }

  function handleReceiptsResponse(response) {
    setReceipts(response.data);
  };

  return (
    <div className={styles["dashboard-current-month"]}>
      <div className={styles["dashboard-current-month__header"]}>
        <span>{textCurrentMonth}</span>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !error && (
        <>
          <div className={styles["dashboard-current-month__total"]}>
            <span>
              {total} <br /> RSD
            </span>
          </div>
          <div className={styles["dashboard-current-month__categories"]}>
            {display}
          </div>
        </>
      )}
      {!isLoading && error && <div>{error.message}</div>}
    </div>
  );
}

export default DashboardCurrentMonth;
