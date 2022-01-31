import React from "react";
import styles from "./Toast.module.css";
import { useNotification } from "context/notification/NotificationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Toast(props) {
  const { position } = props;
  const { list, setList } = useNotification();
  const toastStyle = [styles.notification, styles.toast, styles[position]].join(" ");

  function deleteToast(id) {
    const index = list.findIndex(notification => notification.id === id);
    list.splice(index,1);
    setList([...list]);
  };

  return (
    <div className={styles["notification-container"]}>
      {list.map((toast) => (
        <div key={toast.id} className={toastStyle} style={{backgroundColor: toast.backgroundColor}}>
          <button onClick={() => {deleteToast(toast.id)}}>X</button>
          <div className={styles["notification-image"]}>
            <FontAwesomeIcon icon={toast.icon} />
          </div>
          <div>
            <p className={styles["notification-title"]}>{toast.title}</p>
            <p className={styles["notification-message"]}>{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Toast;

