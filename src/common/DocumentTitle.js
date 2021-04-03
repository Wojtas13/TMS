import React from 'react';

export class DocumentTitle extends React.Component {
  componentDidMount() {
    document.title = this.props.title;
  }

  render() {
    return this.props.children;
  }
}
