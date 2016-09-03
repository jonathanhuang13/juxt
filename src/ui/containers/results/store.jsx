import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import groceryIcon from '../../assets/images/grocery_shop_icon.png';

export default class Store extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  renderImage() {
    return <div className='image-container'>
      <img src={groceryIcon} className='image'/>
    </div>
  }

  renderStoreInfo() {
    const { store, index } = this.props;
    const name             = store.get('name');
    const street           = store.get('address1');
    const city             = store.get('city');
    const state            = store.get('state');

    const entry   = (index + 1) + '. ' + name;
    const address = street + ' ' + city + ', ' + state;

    return <div className='store-info'>
      <h3 className='name'>{entry}</h3>
      <div className='address'>{address}</div>
    </div>
  }

  renderItemInfo() {
    const { store } = this.props;
    const price    = store.get('price');
    const amount   = store.get('amount');
    const units    = store.get('units');

    return <div className='item-info'>
      <h3 className='price'>{price}</h3>
      <div className='amount'>{amount} {units}</div>
    </div>
  }

  render() {
    return <div className='entry-container'>
      <div className='entry'>
        { this.renderImage() }
        { this.renderStoreInfo() }
        { this.renderItemInfo() }
      </div>
    </div>
  }
}
