import React, { Component, PropTypes } from 'react';

import pureRender from 'decorators/pureRender';
import AccessChecker from 'components/AccessChecker';
import LinkItem from 'components/LinkItem';

@pureRender
export default class LinksList extends Component {
  static propTypes = {
    links: PropTypes.array.isRequired,
    currentAccessLevel: PropTypes.object,
    onLinkTouch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    links: [],
  };

  render() {
    const { onLinkTouch, links, currentAccessLevel } = this.props;

    return (
      <div>
      {
        links.map(m => (
          <AccessChecker
            currentAccessLevel={currentAccessLevel}
            requiredAccessLevel={m.accessLevel}
            key={m.url}
          >
            <LinkItem
              item={m}
              onLinkTouch={onLinkTouch}
            />
          </AccessChecker>
        ))
      }
      </div>
    );
  }
}
