import React from 'react';
import Store from './store';

export default class Item extends React.Component {
  getStores() {
    return this.props.stores || [];
  }

  renderStore(store, i) {
    const props = { 
      itemTitle:     this.props.title,
      itemBrand:     this.props.brand,
      itemPrice:     store.price,
      itemAmount:    store.amount,
      itemUnit:      store.units,
      storeName:     store.name,
      storeAddress:  store.address
    };

    return <Store key={i} {...props} />
  }

  render() {
    return <div>
      <h1>{this.props.title}</h1>
      { this.getStores().map(this.renderStore.bind(this)) }
    </div>;
  }
}
