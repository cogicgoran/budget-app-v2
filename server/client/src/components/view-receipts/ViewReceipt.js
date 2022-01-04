import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'App.constants';

function ViewReceipt(props) {
  const navigate = useNavigate();

  new Date('2021-02-06T22:15:00.000Z').toLocaleString("en-GB",{day:"numeric", month:"short", year: "numeric"});
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.address}</td>
      <td>{new Date(props.date).toLocaleDateString("en-GB",{day:"numeric", month:"short", year: "numeric", hour: "numeric", minute: "numeric"})}</td>
      <td onClick={()=> navigate(PATHS.VIEW_RECEIPTS + "/" + props.id)}>P</td>
      <td>X</td>
    </tr>
  );
};

export default ViewReceipt;
