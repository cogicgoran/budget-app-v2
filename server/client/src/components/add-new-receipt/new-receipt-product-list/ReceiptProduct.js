import React from 'react';

function ReceiptProduct(props) {
  function removeHandler() {
    props.onRemoveArticle(props.id);
  }

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.category}</td>
      <td>{props.price}</td>
      <td onClick={removeHandler}>X</td>
    </tr>
  );
};

export default ReceiptProduct;
