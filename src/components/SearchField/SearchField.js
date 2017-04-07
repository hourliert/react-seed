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
    filterState: PropTypes.string,
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
    const { hintText } = this.props;
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
        <TextField
          inputStyle=
          {{
            color: (content !== '') ? palette.primary1Color : undefined,
          }}
          value={content}
          onChange={
            (e) => this.setState({ content: e.target.value })
          }
          style={styles.text}
          underlineShow={false}
          hintText={hintText}
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
