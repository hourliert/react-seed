import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import Search from 'material-ui/svg-icons/action/search';

// styles
import styles from './styles';


@pureRender
export default class TableHeaderSearch extends Component {
  static propTypes = {
    col: PropTypes.object,
  };

  render() {
    const { col } = this.props;

    if (col.searchable && !col.autocomplete && (col.type !== 'DATE')) {
      return (
        <div>
          <div>
            <Search
              style={styles.search}
            />
          </div>
          <TextField
            style={styles.text}
            underlineShow={false}
            hintText={col.headerTitle}
          />
        </div>
      );
    }

    return (
      <div className="flex layout vertical">
        Yay!
      </div>
    );
  }
}
