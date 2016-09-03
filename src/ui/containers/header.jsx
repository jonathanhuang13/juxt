import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { LinkComponent as Link } from '../utils/common-components';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return <div className='header'>
      <Link to='/'><h2 className='title'>JUXT</h2></Link>
    </div>;
  }
}
