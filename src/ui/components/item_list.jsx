import React from 'react';
import Item from './item';

export default class ItemList extends React.Component {
  getList() {
    return this.props.itemList || [];
  }

  renderItem(item, i) {
    return <Item key={i} {...item} />
  }

  render() {
    return <div>
      { this.getList().map(this.renderItem) }
    </div>;
  }
}
