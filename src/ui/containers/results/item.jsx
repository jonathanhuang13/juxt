import React from 'react';
import Store from './store';

export default class Item extends React.Component {
  renderStore(store, i) {
    const { item } = this.props;

    const props = { 
      itemTitle:     item.get('title'),
      itemBrand:     item.get('brand'),
      itemPrice:     store.get('price'),
      itemAmount:    store.get('amount'),
      itemUnit:      store.get('units'),
      storeName:     store.get('name'),
      storeAddress:  store.get('address')
    };

    return <Store key={i} {...props} />
  }

  render() {
    const { item } = this.props;

    return <div>
      <h1>{item.get('title')}</h1>
      { item.get('stores').map(this.renderStore.bind(this)) }
    </div>;
  }
}
