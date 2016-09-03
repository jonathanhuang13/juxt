import React from 'react';
import { Link } from 'react-router';

export class LinkComponent extends React.Component {
  render() {
    return <Link {...this.props} className='link'>
      { this.props.children }
    </Link>
  }
}

export class Button extends React.Component {
  render() {
    return <button type='button' {...this.props}>{ this.props.children }</button>
  }
}
