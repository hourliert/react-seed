import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import AutoComplete from 'material-ui/AutoComplete';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from 'components/FilterArrow';

// styles
import styles from './styles';


@pureRender
export default class SearchAutoComplete extends Component {
  static propTypes = {
    hintText: PropTypes.string,
    filterState: PropTypes.string,
    dataSource: PropTypes.array,
    colKey: PropTypes.string,
    onFilter: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: React.PropTypes.object,
  };

  state = {
    content: '',
  }

  render() {
    const { muiTheme: { rawTheme: { palette } } } = this.context;
    const { hintText, dataSource } = this.props;
    const { content } = this.state;

    return (
      <div
        style={{
          width: '100%',
          height: 48,
        }}
      >
        <div>
          <FilterArrow
            filterState={this.props.filterState}
            onFilter={this.props.onFilter}
            colKey={this.props.colKey}
          />
        </div>
        <AutoComplete
          inputStyle=
          {{
            color: (content !== '') ? palette.primary1Color : undefined,
          }}
          searchText={content}
          onNewRequest={
            (string) => this.setState({ content: string })
          }
          textFieldStyle={styles.textFieldStyle}
          underlineShow={false}
          hintText={hintText}
          style={styles.text}
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={dataSource}
        />
      { content !== '' ?
        <div
          onClick={() => this.setState({ content: '' })}
        >
          <Close
            color={ (content !== '') ? palette.primary1Color : undefined }
            style={styles.close}
          />
      </div> : null
      }
      </div>
    );
  }
}
