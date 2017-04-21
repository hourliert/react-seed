import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import dateformat from 'dateformat';

// material-ui
import DatePicker from 'material-ui/DatePicker';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from '../FilterArrow';

// styles
import styles from './styles';


@pureRender
export default class SearchDate extends Component {
  static propTypes = {
    hintText: PropTypes.string,
    sortState: PropTypes.string,
    colKey: PropTypes.string,
    onFilter: PropTypes.func,
    type: PropTypes.string,
    searchState: PropTypes.string,
    onSearch: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: React.PropTypes.object,
  };

  search(searchContent) {
    const date = new Date(searchContent);
    const dateString = dateformat(date, 'yyyy-mm-dd');
    const { colKey, onSearch } = this.props;
    onSearch(colKey, dateString, false);
  }

  clear() {
    const { colKey, onSearch } = this.props;
    onSearch(colKey, undefined);
  }

  render() {
    const { muiTheme: { rawTheme: { palette } } } = this.context;
    const { hintText, searchState } = this.props;

    return (
      <div
        style={{
          width: '100%',
          height: 35,
          background: searchState ? '#e1f5fe' : '#ececec',
          borderRadius: 3,
        }}
      >
        <div>
          <FilterArrow
            sortState={this.props.sortState}
            onFilter={this.props.onFilter}
            colKey={this.props.colKey}
            type={this.props.type}
          />
        </div>
        <DatePicker
          inputStyle=
          {{
            color: (searchState !== '') ? palette.primary1Color : undefined,
          }}
          value={searchState ? new Date(searchState) : undefined}
          onChange={
            (e, date) => this.search(date)
          }
          textFieldStyle={styles.text}
          underlineShow={false}
          hintText={hintText}
          container="inline"
        />
      { (searchState !== '') && (searchState !== undefined) ?
        <div
          onClick={::this.clear}
        >
        <Close
          color={ (searchState !== '') && (searchState !== undefined) ?
            palette.primary1Color : undefined }
          style={styles.close}
        />
      </div> : null
      }
      </div>
    );
  }
}
