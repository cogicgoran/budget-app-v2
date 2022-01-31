import React, { useState, createContext, useContext, useEffect, useMemo, useCallback } from 'react';

const NotificationContext = createContext();

export function useNotification(){
  return useContext(NotificationContext);
}

export default function NotificationProvider(props) {
  const [list, setList] = useState([]);

  const createNotification = useCallback(function createNotificationCallback(newNotification){
    setList(prevList => {
      return [...prevList, newNotification];
    });
  },[])

  const value = useMemo(() => {
    return {list, setList, createNotification};
  },[list, setList, createNotification]);

  useEffect(() => {
    console.log("is executing");
    if ( list.length > 0 ) {
      var timerID = setTimeout(() => {
        list.splice(0,1);
      setList([...list]);
      },2500)
    }

    return () => {clearTimeout(timerID)};
  }, [list])

  return (
    <NotificationContext.Provider value={value}>
      {props.children}
    </NotificationContext.Provider>
  )
};
