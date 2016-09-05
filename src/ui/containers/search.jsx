import React from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { withRouter } from 'react-router';
import { Button, Form, FormGroup } from 'react-bootstrap/lib';
import ItemInput from './search/item-input';
import StoreInput from './search/store-input';

import * as itemFormActions from '../actions/item-form';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

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

  handleShowItemForm() {
    this.props.dispatch(itemFormActions.handleShowForm());
  }

  handleCloseItemForm() {
    this.props.dispatch(itemFormActions.handleHideForm());
  }

  handleSubmitItemForm(info) {
    this.props.dispatch(itemFormActions.handleSubmit(info));
  }

  renderSubmit() {
    const button = {
      bsStyle:  'danger',
      bsSize:   'large',
      type:     'submit',
      onClick:  this.handleSubmit.bind(this)
    }

    return <Button {...button}>Search</Button>;
  }

  renderItemInput() {
    const { showItemForm, loading, addFailed, duplicates } = this.props;

    const params = {
      showItemForm, loading, addFailed, duplicates,
      onItemsUpdate:  this.handleItemsUpdate.bind(this),
      onCloseForm:    this.handleCloseItemForm.bind(this),
      onShowForm:     this.handleShowItemForm.bind(this),
      onSubmitForm:   this.handleSubmitItemForm.bind(this)
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
    return <div className='search-container'>
      <Form inline className='search'>
        <FormGroup className='inputs'>
          { this.renderItemInput() }
          { this.renderStoreInput() }
        </FormGroup>
        <FormGroup>{ this.renderSubmit() }</FormGroup>
      </Form>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    showItemForm:  state.getIn([ 'itemFormReducer', 'showItemForm' ]),
    loading:       state.getIn([ 'itemFormReducer', 'loading' ]),
    addFailed:     state.getIn([ 'itemFormReducer', 'addFailed' ]),
    duplicates:    state.getIn([ 'itemFormReducer', 'duplicates' ]),
  };
}

Search.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

export default connect(mapStateToProps)(withRouter(Search));
