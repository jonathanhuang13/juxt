import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import produceImage from '../assets/images/produce.png';
import { Search } from './search';

import * as searchActions from '../actions/search';

export class Home extends React.Component {
  onSubmit(itemNames, storeNames) {
    const { dispatch, router } = this.props;

    dispatch(searchActions.handleSubmit(itemNames, storeNames));
    router.push('/results');
  }

  renderSearch() {
    const props = {
      inputs: [ 'items', 'stores' ],
      className: 'form-group',
      handleSubmit: this.onSubmit.bind(this),
    }
    return <Search {...props} />;
  }

  renderTitle() {
    return <div>
      <h1 className='title'>Cheaper groceries, tastier meals</h1>
      <br />
      <h3 className='subtitle'>Compare grocery prices across your favorite stores</h3>
      <br />
    </div>;
  }

  render() {
    const imageStyle = {
      backgroundImage: 'url(' + produceImage + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };

    return <div className='home' style={ imageStyle }>
      { this.renderTitle() }
      { this.renderSearch() }
    </div>
  }
}

Home.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    searchedItems: state.searchReducer.get('searchedItems'),
    searchedStores: state.searchReducer.get('searchedStores')
  };
}

export default connect(mapStateToProps)(withRouter(Home));
