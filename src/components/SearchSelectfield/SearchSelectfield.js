import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Close from 'material-ui/svg-icons/navigation/cancel';

// custom components
import FilterArrow from 'components/FilterArrow';

// styles
import styles from './styles';


@pureRender
export default class SearchSelectfield extends Component {
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

  getSelectField() {
    const { muiTheme: { rawTheme: { palette } } } = this.context;
    const { dataSource, hintText } = this.props;
    const JSX = [];

    const text = {
      fontSize: 13,
      color: palette.primary1Color,
    };

    for (const k in dataSource) {
      if (dataSource.hasOwnProperty(k)) {
        const datum = dataSource[k];
        JSX.push(
          <MenuItem
            key={datum}
            value={datum}
            primaryText={datum}
          />
        );
      }
    }

    return (
      <SelectField
        hintText={hintText}
        underlineShow={false}
        value={this.state.content}
        onChange={(event, index, value) => this.setState({ content: value })}
        style={styles.selectField}
        labelStyle={text}
        hintStyle={styles.text}
        iconStyle={{ display: 'none' }}
      >
        {JSX}
      </SelectField>
    );
  }

  render() {
    const { muiTheme: { rawTheme: { palette } } } = this.context;
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
        {this.getSelectField()}
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
