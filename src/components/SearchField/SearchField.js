import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import TextField from 'material-ui/TextField';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from 'components/FilterArrow';

// styles
import styles from './styles';


@pureRender
export default class SearchField extends Component {
  static propTypes = {
    hintText: PropTypes.string,
    sortState: PropTypes.string,
    colKey: PropTypes.string,
    onFilter: PropTypes.func,
    searchState: PropTypes.string,
    onSearch: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
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
    const { hintText, searchState } = this.props;

    return (
      <div
        style={{
          width: '100%',
          height: 48,
        }}
      >
        <div>
          <FilterArrow
            sortState={this.props.sortState}
            onFilter={this.props.onFilter}
            colKey={this.props.colKey}
          />
        </div>
        <TextField
          inputStyle=
          {{
            color: (searchState !== '') ? palette.primary1Color : undefined,
          }}
          value={ searchState || '' }
          onChange={
            (e) => this.search(e.target.value)
          }
          style={styles.text}
          underlineShow={false}
          hintText={hintText}
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
