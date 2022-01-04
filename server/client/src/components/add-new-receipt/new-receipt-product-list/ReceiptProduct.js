import React from 'react';

function ReceiptProduct(props) {
  function removeHandler() {
    props.onRemoveArticle(props.id);
  }

  function editHandler() {
    props.onEditInit({
      id: props.id,
      name: props.name,
      category: props.category,
      price: props.price
    });
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.category}</td>
      <td>{props.price}</td>
      <td onClick={editHandler}>{props.id == props.editIndex ? "S" : "E"}</td>
      <td onClick={removeHandler}>X</td>
    </tr>
  );
};

export default ReceiptProduct;
