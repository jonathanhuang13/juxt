import React from 'react';
import { Link } from 'react-router';

export default class LinkComponent extends React.Component {
  render() {
    return <Link {...this.props} className='link'>
      { this.props.children }
    </Link>
  }
}
