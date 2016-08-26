import React from 'react';
import { connect } from 'react-redux';
import Item from './results/item';

export class Results extends React.Component {
  getList() {
    return this.props.itemList || [];
  }

  renderItem(item, i) {
    return <Item key={i} {...item} />
  }

  render() {
    console.log(this.props);
    return <div>
      { this.getList().map(this.renderItem) }
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    itemList: state.results.get('itemList')
  };
}

export default connect(mapStateToProps)(Results);
