import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Store from './store';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  storesExist() {
    return this.props.item.get('stores').size > 0;
  }

  renderItemTitle() {
    const { item } = this.props;

    const title = item.get('title').toUpperCase();
    const brand = item.get('brand');

    return <div className='title-group'>
      <div className='title'>
        <h1 className='name'>{title}</h1>
        <h4 className='brand'>Brand: {brand}</h4>
      </div>
    </div>
  }

  renderStores() {
    const { item } = this.props;

    if (this.storesExist()) {
      return item.get('stores').map(this.renderStore.bind(this));
    } else {
      return this.renderEmptyList();
    }
  }

  renderStore(store, i) {
    const params = { 
      index: i, store
    };

    return <Store key={i} {...params} />
  }

  renderEmptyList() {
    return <div className='fail-alert'>
      <div className='alert alert-warning' role='alert'>
        No stores found for this item.
      </div>
    </div>
  }

  render() {
    return <div className='item-result'>
      { this.renderItemTitle() }
      <div className='store-results'>
        { this.renderStores() }
      </div>
    </div>;
  }
}
