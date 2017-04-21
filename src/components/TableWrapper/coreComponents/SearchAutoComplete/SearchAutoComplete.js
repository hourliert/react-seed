import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import AutoComplete from 'material-ui/AutoComplete';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from '../FilterArrow';

// styles
import styles from './styles';


@pureRender
export default class SearchAutoComplete extends Component {
  static propTypes = {
    hintText: PropTypes.string,
    sortState: PropTypes.string,
    colKey: PropTypes.string,
    onFilter: PropTypes.func,
    type: PropTypes.string,
    searchState: PropTypes.string,
    onSearch: PropTypes.func,
    dataSource: PropTypes.array,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: React.PropTypes.object,
  };

  state = {
    lastSearchContent: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchState === undefined) {
      this.state.lastSearchContent = '';
    }
  }

  search(searchContent) {
    const { lastSearchContent } = this.state;
    const { colKey, onSearch } = this.props;
    const charIsAdded = searchContent.length > lastSearchContent.length;
    onSearch(colKey, searchContent, charIsAdded);
    this.state.lastSearchContent = searchContent;
  }

  clear() {
    const { colKey, onSearch } = this.props;
    this.setState({ content: '' });
    onSearch(colKey, undefined);
  }

  render() {
    const { muiTheme: { rawTheme: { palette } } } = this.context;
    const { hintText, searchState, dataSource } = this.props;

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
        <AutoComplete
          inputStyle=
          {{
            color: (searchState !== '') ? palette.primary1Color : undefined,
          }}
          searchText={ searchState || '' }
          onNewRequest={
            (string) => this.search(string)
          }
          textFieldStyle={styles.textFieldStyle}
          underlineShow={false}
          hintText={hintText}
          style={styles.text}
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={dataSource}
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
