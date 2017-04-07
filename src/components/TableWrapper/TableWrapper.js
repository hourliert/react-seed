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

// custom elements
import SearchField from 'components/SearchField';
import SearchDate from 'components/SearchDate';
import SearchAutoComplete from 'components/SearchAutoComplete';
import SearchSelectfield from 'components/SearchSelectfield';

// helpers
import {
  filterUp,
  filterDown,
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
      structuredData: getStructuredData(data, tableMeta),
      height: 1200,
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

  setFilterStatesForCol(colKey, mode) {
    const { tableMeta } = this.state;
    const newTableMeta = tableMeta;


    for (const k in newTableMeta.cols) {
      if (newTableMeta.cols.hasOwnProperty(k)) {
        if (newTableMeta.cols[k].colKey === colKey) {
          newTableMeta.cols[k].filterState = mode;
        } else {
          newTableMeta.cols[k].filterState = undefined;
        }
      }
    }

    this.state.tableMeta = newTableMeta;
    this.forceUpdate();
  }

  filterRequest(colKey, mode) {
    const { data, tableMeta } = this.props;
    const { structuredData } = this.state;
    if (mode === 'Up') {
      structuredData.sort((a, b) => filterUp(a, b, colKey));
      this.setFilterStatesForCol(colKey, mode);
    }
    if (mode === 'Down') {
      structuredData.sort((a, b) => filterDown(a, b, colKey));
      this.setFilterStatesForCol(colKey, mode);
    }

    if (mode === undefined) {
      this.state.structuredData = getStructuredData(data, tableMeta);
      this.setFilterStatesForCol(colKey, undefined);
    }
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
            style={{ textAlign: 'center' }}
          >
            {tableMeta.superHeader}
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
                filterState = {col.filterState}
                onFilter= {::this.filterRequest}
                hintText={col.headerTitle}
              />
          );
        }

        if (col.searchable === 'DATE') {
          search = (
              <SearchDate
                colKey = {col.colKey}
                filterState = {col.filterState}
                onFilter= {::this.filterRequest}
                hintText={col.headerTitle}
              />
          );
        }

        if (col.searchable === 'AUTOCOMPLETE') {
          if (col.autocomplete.type === 'suggest') {
            search = (
                <SearchAutoComplete
                  colKey = {col.colKey}
                  filterState = {col.filterState}
                  onFilter= {::this.filterRequest}
                  dataSource = {col.autocomplete.dataSource}
                  hintText={col.headerTitle}
                />
            );
          }

          if (col.autocomplete.type === 'static') {
            search = (
                <SearchSelectfield
                  colKey = {col.colKey}
                  filterState = {col.filterState}
                  onFilter= {::this.filterRequest}
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
