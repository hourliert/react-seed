import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import Up from 'material-ui/svg-icons/navigation/arrow-drop-up';
import Down from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Filter from 'material-ui/svg-icons/content/filter-list';

// styles
import styles from './styles';

@pureRender
export default class FilterArrow extends Component {
  static propTypes = {
    filterState: PropTypes.string,
    colKey: PropTypes.string,
    onFilter: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: React.PropTypes.object,
  };

  render() {
    const { onFilter, colKey, filterState } = this.props;
    const { muiTheme: { rawTheme: { palette } } } = this.context;

    if (filterState === 'Down') {
      return (
        <Down
          style={styles.arrow}
          color={palette.primary1Color}
          onClick={() => {
            this.setState({ filter: 'Up' });
            onFilter(colKey, 'Up');
          }}
        />
      );
    }

    if (filterState === 'Up') {
      return (
        <Up
          style={styles.arrow}
          color={palette.primary1Color}
          onClick={() => {
            this.setState({ filter: undefined });
            onFilter(colKey, undefined);
          }}
        />
      );
    }

    return (
      <Filter
        style={styles.arrow}
        onClick={() => {
          this.setState({ filter: 'Down' });
          onFilter(colKey, 'Down');
        }}
      />
    );
  }
}
