import React, { useMemo } from "react";
import styles from "./DashboardCurrentMonth.module.css";
import { handleIncomingArticles } from "./DashboardCurrentMonth.functions";
import CategoryReceipt from "./category-receipt/CategoryReceipt";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import { useFetch } from "hooks/useFetch";

function DashboardCurrentMonth() {
  const { isLoading, data, error } = useFetch(
    "http://localhost:8000/api/receipts-current-month",
    "GET"
  );

  var [categories, total] = useMemo(() => {
    return data ? handleIncomingArticles(data) : [null, null]
  }, [data]);
  const { t } = useTranslation();

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
