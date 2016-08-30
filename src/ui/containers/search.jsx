import React from 'react';
import { withRouter } from 'react-router';
import { Button } from './common_components';
import ItemInput from './search/item_input';
import StoreInput from './search/store_input';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemNames: null, storeNames: null };
  }

  handleItemsUpdate(itemNames) {
    this.setState({ itemNames });
  }

  handleStoresUpdate(storeNames) {
    this.setState({ storeNames });
  }

  handleSubmit() {
    const { itemNames, storeNames } = this.state;
    const { handleSubmit, router }  = this.props;

    handleSubmit(itemNames, storeNames);
    router.push('/results');
  }

  renderSubmit() {
    return <Button className='btn btn-danger btn-lg' onClick={this.handleSubmit.bind(this)}>Search</Button>;
  }

  renderInputs() {
    return <div className='inputs'>
        { this.renderItemInput() }
        { this.renderStoreInput() }
    </div>;
  }

  renderItemInput() {
    const params = {
      onItemsUpdate: this.handleItemsUpdate.bind(this),
    }

    return <ItemInput {...params}/>;
  }

  renderStoreInput() {
    const params = {
      onStoresUpdate: this.handleStoresUpdate.bind(this),
    }

    return <StoreInput {...params}/>;
  }

  render() {
    return <div className={this.props.className}>
      { this.renderInputs() }
      { this.renderSubmit() }
    </div>;
  }
}

Search.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Search);
