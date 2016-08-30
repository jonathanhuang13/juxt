import React from 'react';
import { withRouter } from 'react-router'; 
import { connect } from 'react-redux';
import Item from './results/item';
import { Search } from './search';

import * as searchActions from '../actions/search';
import * as resultsActions from '../actions/results';

export class Results extends React.Component {
  componentDidMount() {
    const { itemIds, storeIds, dispatch } = this.props;
    dispatch(resultsActions.fetch(itemIds, storeIds));
  }

  onSubmit(itemNames, storeNames) {
    const { dispatch, router } = this.props;

    dispatch(searchActions.handleSubmit(itemNames, storeNames));
    router.push('/results');
  }

  getList() {
    return this.props.itemList || [];
  }

  renderSearch() {
    const props = {
      inputs: [ 'items', 'stores' ],
      className: 'form-group',
      handleSubmit: this.onSubmit.bind(this),
    }
    return <Search {...props} />;
  }

  renderItem(item, i) {
    return <Item key={i} {...item} />
  }

  render() {
    return <div className='results'>
      { this.renderSearch() }
      { this.getList().map(this.renderItem) }
    </div>;
  }
}

Results.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    itemList: state.resultsReducer.get('itemList')
  };
}

export default connect(mapStateToProps)(withRouter(Results));
