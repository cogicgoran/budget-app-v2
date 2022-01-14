import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import styles from './MarketplaceItem.module.css';

function MarketplaceItem(props) {
  return (
    <tr>
      <td>
        {props.marketplace.id}
      </td>
      <td>
        {props.marketplace.name}
      </td>
      <td>
        {props.marketplace.address}
      </td>
      <td>
        <FontAwesomeIcon className={styles['marketplace-list__item-icon']} icon={faTrashAlt}/>
      </td>
    </tr>
  );
};

export default MarketplaceItem;
