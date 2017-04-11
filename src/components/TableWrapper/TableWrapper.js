import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ReactDOM from 'react-dom';
import { WindowResizeListener } from 'react-window-resize-listener';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// custom elements
import SearchField from 'components/SearchField';
import SearchDate from 'components/SearchDate';
import SearchAutoComplete from 'components/SearchAutoComplete';
import SearchSelectfield from 'components/SearchSelectfield';

// helpers
import {
  sortUp,
  sortDown,
  filterData,
  getInitialStructuredData,
  getStructuredData,
} from 'helpers/table';

// styles
import styles from './styles';


@pureRender
export default class TableWrapper extends Component {
  static propTypes = {
    tableMeta: PropTypes.object,
    data: PropTypes.array,
  };

  constructor(...args) {
    super(...args);
    const { tableMeta, data } = this.props;

    this.state = {
      initialTableMeta: tableMeta,
      tableMeta,
      data,
      structuredData: getInitialStructuredData(data, tableMeta),
      height: 1200,
      lastColKey: undefined,
    };
  }

  componentDidMount() {
    this.setHeight();
  }

  setHeight() {
    this.setState({
      height: ReactDOM.findDOMNode(this.refs.wrapper).clientHeight - 115,
    });
  }

  setSortStatesForCol(colKey, mode) {
    const { tableMeta } = this.state;
    const newTableMeta = tableMeta;


    for (const k in newTableMeta.cols) {
      if (newTableMeta.cols.hasOwnProperty(k)) {
        if (newTableMeta.cols[k].colKey === colKey) {
          newTableMeta.cols[k].sortState = mode;
        } else {
          newTableMeta.cols[k].sortState = undefined;
        }
      }
    }

    this.state.tableMeta = newTableMeta;
    this.forceUpdate();
  }

  setSearchStateForCol(colKey, searchContent) {
    const { tableMeta } = this.state;
    const newTableMeta = tableMeta;

    for (const k in newTableMeta.cols) {
      if (newTableMeta.cols.hasOwnProperty(k)) {
        if (newTableMeta.cols[k].colKey === colKey) {
          newTableMeta.cols[k].searchContent = searchContent;
        }
      }
    }
    this.state.tableMeta = newTableMeta;
    this.forceUpdate();
  }

  resetSearchStates() {
    const { tableMeta } = this.state;
    const newTableMeta = tableMeta;

    for (const k in newTableMeta.cols) {
      if (newTableMeta.cols.hasOwnProperty(k)) {
        newTableMeta.cols[k].searchContent = undefined;
      }
    }
    this.state.tableMeta = newTableMeta;
    this.forceUpdate();
  }

  sortRequest(colKey, mode) {
    const { data, tableMeta } = this.props;
    const { structuredData } = this.state;
    if (mode === 'Up') {
      structuredData.sort((a, b) => sortUp(a, b, colKey));
      this.setSortStatesForCol(colKey, mode);
    }
    if (mode === 'Down') {
      structuredData.sort((a, b) => sortDown(a, b, colKey));
      this.setSortStatesForCol(colKey, mode);
    }

    if (mode === undefined) {
      this.state.structuredData = getInitialStructuredData(data, tableMeta);
      this.setSortStatesForCol(colKey, undefined);
    }
  }

  searchRequest(colKey, searchContent, charIsAdded) {
    const { data, tableMeta } = this.props;
    const { structuredData } = this.state;

    this.setSearchStateForCol(colKey, searchContent);

    if (searchContent === undefined) {
      this.state.structuredData = getStructuredData(data, tableMeta);
    } else {
      if (charIsAdded) {
        this.state.structuredData = structuredData.filter(
          (a) => filterData(a, colKey, searchContent.toLowerCase())
        );
      } else {
        this.state.structuredData = getStructuredData(data, tableMeta).filter(
          (a) => filterData(a, colKey, searchContent.toLowerCase())
        );
      }
    }
    this.forceUpdate();
  }

  table() {
    const { tableMeta } = this.state;
    const { height } = this.state;
    const { tableProperties } = tableMeta;

    return (
      <Table
        fixedHeader={tableProperties.fixedHeader}
        selectable={tableProperties.selectable}
        multiSelectable={tableProperties.multiSelectable}
        height={String(height)}
      >
        {this.tableHeader()}
        {this.tableBody()}
      </Table>
    );
  }

  handleIconMenu(e, v) {
    const { data, tableMeta } = this.props;
    switch (v) {
      case 'clear':
        this.state.structuredData = getStructuredData(data, tableMeta);
        this.resetSearchStates();
        break;
      default:

    }
  }

  tableHeader() {
    const { tableMeta } = this.state;
    const { cols, tableProperties, mutlipleProperties } = tableMeta;
    const JSX = [];

    if (tableMeta.superHeader) {
      JSX.push(
        <TableRow
          key={'TableHeaderColumn'}
        >
          <TableHeaderColumn
            colSpan={cols.length}
          >
            <div style={styles.tableMeta}>
              {tableMeta.superHeader}
            </div>
            <div style={styles.iconMenu}>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onChange={::this.handleIconMenu}
              >
                <MenuItem value="clear" primaryText="Clear filters" />
              </IconMenu>
            </div>
          </TableHeaderColumn>
        </TableRow>
      );
    }

    const tableHeaderColumns = [];

    for (const k in cols) {
      if (cols.hasOwnProperty(k)) {
        const col = cols[k];
        let search = undefined;
        if (col.searchable === 'STRING') {
          search = (
              <SearchField
                colKey = {col.colKey}
                sortState = {col.sortState}
                searchState = {col.searchContent}
                onFilter= {::this.sortRequest}
                onSearch= {::this.searchRequest}
                hintText={col.headerTitle}
              />
          );
        }

        if (col.searchable === 'DATE') {
          search = (
              <SearchDate
                colKey = {col.colKey}
                sortState = {col.sortState}
                searchState = {col.searchContent}
                onFilter= {::this.sortRequest}
                onSearch= {::this.searchRequest}
                hintText={col.headerTitle}
              />
          );
        }

        if (col.searchable === 'AUTOCOMPLETE') {
          if (col.autocomplete.type === 'suggest') {
            search = (
                <SearchAutoComplete
                  colKey = {col.colKey}
                  sortState = {col.sortState}
                  searchState = {col.searchContent}
                  onFilter= {::this.sortRequest}
                  onSearch= {::this.searchRequest}
                  dataSource = {col.autocomplete.dataSource}
                  hintText={col.headerTitle}
                />
            );
          }

          if (col.autocomplete.type === 'static') {
            search = (
                <SearchSelectfield
                  colKey = {col.colKey}
                  sortState = {col.sortState}
                  searchState = {col.searchContent}
                  onFilter= {::this.sortRequest}
                  onSearch= {::this.searchRequest}
                  dataSource = {col.autocomplete.dataSource}
                  hintText={col.headerTitle}
                />
            );
          }
        }

        tableHeaderColumns.push(
          <TableHeaderColumn
            key={`TableHeaderColumn_${col.colKey}`}
            tooltip={col.tooltip}
          >
            {search}
          </TableHeaderColumn>
      );
      }
    }

    JSX.push(
      <TableRow
        key={'TableHeaderColumn_TableRow'}
      >
        {tableHeaderColumns}
      </TableRow>
    );

    return (
      <TableHeader
        displaySelectAll={mutlipleProperties.showCheckboxes}
        adjustForCheckbox={mutlipleProperties.showCheckboxes}
        enableSelectAll={tableProperties.enableSelectAll}
      >
        {JSX}
      </TableHeader>);
  }

  tableBody() {
    const { tableMeta, structuredData } = this.state;
    const { mutlipleProperties, tableBodyProperties, cols } = tableMeta;

    const JSX = [];

    for (const j in structuredData) {
      if (structuredData.hasOwnProperty(j)) {
        const tableRowColumns = [];
        const datum = structuredData[j];

        for (const k in cols) {
          if (cols.hasOwnProperty(k)) {
            const col = cols[k];
            if (col.component) {
              const WarpperComponent = col.component;
              tableRowColumns.push(
                <TableRowColumn
                  style={styles.tableRow}
                  key={`${col.colKey}_${datum.id}`}
                >
                  <WarpperComponent datum={datum}/>
                </TableRowColumn>
              );
            } else {
              tableRowColumns.push(
                <TableRowColumn
                  style={styles.tableRow}
                  key={`${col.colKey}_${datum.id}`}
                >
                  { datum[col.colKey] }
                </TableRowColumn>
              );
            }
          }
        }

        JSX.push(
          <TableRow
            key={`${datum.id}`}
            style={styles.tableRow}
          >
            {tableRowColumns}
          </TableRow>
        );
      }
    }

    return (
      <TableBody
        displayRowCheckbox={mutlipleProperties.showCheckboxes}
        deselectOnClickaway={tableBodyProperties.deselectOnClickaway}
        showRowHover={tableBodyProperties.showRowHover}
        stripedRows={tableBodyProperties.stripedRows}
      >
        {JSX}
      </TableBody>
    );
  }

  render() {
    return (
      <div
        ref="wrapper"
        style={{
          height: 'calc(100vh - 162px)',
          overflow: 'hidden',
        }}
      >
        { this.table() }
        <WindowResizeListener onResize={::this.setHeight} />
      </div>
    );
  }
}
