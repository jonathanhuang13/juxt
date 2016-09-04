import React from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import produceImage from '../assets/images/produce.png';
import Header from './header';
import Search from './search';

import * as searchActions from '../actions/search';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  onSubmit(itemNames, storeNames) {
    const { dispatch } = this.props;

    dispatch(searchActions.handleSubmit(itemNames, storeNames));
  }

  renderSearch() {
    const props = {
      handleSubmit: this.onSubmit.bind(this),
    }

    return <Search {...props} />;
  }

  renderTitle() {
    return <div className='text'>
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
      <div className='home-info'>
        { this.renderTitle() }
        { this.renderSearch() }
      </div>
    </div>
  }
}

export default connect()(Home);
