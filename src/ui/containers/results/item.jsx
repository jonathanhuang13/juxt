import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Store from './store';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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

  renderStore(store, i) {
    const params = { 
      index: i, store
    };

    return <Store key={i} {...params} />
  }

  render() {
    const { item } = this.props;

    return <div className='item-result'>
      { this.renderItemTitle() }
      <div className='store-results'>
        { item.get('stores').map(this.renderStore.bind(this)) }
      </div>
    </div>;
  }
}
