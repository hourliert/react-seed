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
import CircularProgress from 'material-ui/CircularProgress';

// custom elements
import SearchField from './coreComponents/SearchField';
import SearchDate from './coreComponents/SearchDate';
import SearchAutoComplete from './coreComponents/SearchAutoComplete';
import SearchSelectfield from './coreComponents/SearchSelectfield';

// helpers
import {
  sortUp,
  sortDown,
  filterData,
  getInitialStructuredData,
  getStructuredData,
  capitalize,
} from './helpers';

// styles
import styles from './styles';


@pureRender
export default class TableWrapper extends Component {
  static propTypes = {
    tableMeta: PropTypes.object,
    data: PropTypes.array,
    onCellClick: PropTypes.func,
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
      colWidth: 300,
      visibleEntries: 30,
      lastColKey: undefined,
    };
  }

  componentDidMount() {
    this.setDimension();
    this.calcColWidth();

    this.viewport.addEventListener('scroll', (e) => {
      const clientHeight = e.srcElement.clientHeight;
      const scrollHeight = e.srcElement.scrollHeight;
      const scrollTop = e.srcElement.scrollTop;
      const ratio = (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (ratio === 100) {
        this.displayMoreEntries(50);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.state.data = nextProps.data;
      this.state.structuredData = getStructuredData(nextProps.data, this.state.tableMeta);
      this.forceUpdate();
    }
  }

  setDimension() {
    this.state.height = ReactDOM.findDOMNode(this.refs.wrapper).clientHeight - 123;
    this.state.width = ReactDOM.findDOMNode(this.refs.wrapper).clientWidth;
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

  displayMoreEntries(nb) {
    this.state.visibleEntries += nb;
    this.forceUpdate();
  }

  calcColWidth() {
    const { tableMeta, width } = this.state;
    const newTableMeta = tableMeta;

    let colCount = newTableMeta.cols.length;
    let totWidth = width;

    for (const k in newTableMeta.cols) {
      if (newTableMeta.cols.hasOwnProperty(k)) {
        const col = newTableMeta.cols[k];
        if (col.style && col.style.width) {
          totWidth = totWidth - (col.style.width + 30);
          colCount -= 1;
        }
      }
    }
    this.state.colWidth = (totWidth / colCount);
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

  sortRequest(colKey, mode, type) {
    const { data, tableMeta } = this.props;
    const { structuredData } = this.state;
    if (mode === 'Up') {
      structuredData.sort((a, b) => sortUp(a, b, colKey, type));
      this.setSortStatesForCol(colKey, mode);
    }
    if (mode === 'Down') {
      structuredData.sort((a, b) => sortDown(a, b, colKey, type));
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
    const { fullHeight } = tableProperties;

    return (
      <Table
        onCellClick = {(row) => {
          const datum = this.state.structuredData[row]._datum;
          this.props.onCellClick(datum);
        }}
        style= {{ cursor: 'pointer ' }}
        fixedHeader={tableProperties.fixedHeader}
        selectable={tableProperties.selectable}
        multiSelectable={tableProperties.multiSelectable}
        height={fullHeight ? String(height) : undefined}
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
        this.resetSearchStates();
        this.state.structuredData = getStructuredData(data, tableMeta);
        this.state.visibleEntries = 30;
        this.forceUpdate();
        break;
      case 'stripes':
        this.state.tableMeta.tableBodyProperties.stripedRows =
        !this.state.tableMeta.tableBodyProperties.stripedRows;
        this.forceUpdate();
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
          style={styles.fullWidth}
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
                <MenuItem value="stripes" primaryText="Striped Rows" />
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
        let search = (
          <div
            style={{
              width: col.style && col.style.width ? col.style.width : '100%',
              overflow: 'hidden',
            }}
          >
            {col.headerTitle}
          </div>
        );
        if (col.searchable === 'STRING') {
          search = (
              <SearchField
                colKey = {col.colKey}
                type = {col.type}
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
                type = {col.type}
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
                  type = {col.type}
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
                  type = {col.type}
                  sortState = {col.sortState}
                  searchState = {col.searchContent}
                  onFilter= {::this.sortRequest}
                  onSearch= {::this.searchRequest}
                  dataSource = {col.autocomplete.dataSource}
                  hintText={col.headerTitle}
                  width={this.state.width}
                />
            );
          }
        }

        tableHeaderColumns.push(
          <TableHeaderColumn
            key={`TableHeaderColumn_${col.colKey}`}
            tooltip={col.tooltip}
            style={
            col.style && col.style.width ?
            Object.assign(
              {},
              col.style,
              styles.tableRow)
            : Object.assign(
              {},
              {
                width: this.state.colWidth - 30,
              },
              col.style,
              styles.tableRow)
            }
          >
            {search}
          </TableHeaderColumn>
      );
      }
    }

    JSX.push(
      <TableRow
        key={'TableHeaderColumn_TableRow'}
        style={styles.fullWidth}
      >
        {tableHeaderColumns}
      </TableRow>
    );

    return (
        <TableHeader
          displaySelectAll={mutlipleProperties.showCheckboxes}
          adjustForCheckbox={mutlipleProperties.showCheckboxes}
          enableSelectAll={tableProperties.enableSelectAll}
          style={styles.tableHeader}
        >
          {JSX}
        </TableHeader>
    );
  }

  tableBody() {
    const { tableMeta, structuredData, visibleEntries } = this.state;
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
                  style={Object.assign({}, col.style, styles.tableRow)}
                  key={`${col.colKey}_${datum.id}`}
                >
                  <WarpperComponent
                    key={`${col.colKey}_${datum.id}`}
                    datum={datum._datum}
                    value={datum[col.colKey]}
                  />
                </TableRowColumn>
              );
            } else {
              tableRowColumns.push(
                <TableRowColumn
                  style={Object.assign({}, col.style, styles.tableRow)}
                  key={`${col.colKey}_${datum.id}`}
                >
                  {tableBodyProperties.capitalize ?
                    capitalize(String(datum[col.colKey]))
                  : datum[col.colKey] }
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

    const slicedJSX = JSX.slice(0, visibleEntries);

    return (
        <TableBody
          ref={(ref) => {
            if (!this.viewport) {
              this.viewport = ReactDOM.findDOMNode(ref).parentNode.parentNode;
            }
          } }
          displayRowCheckbox={mutlipleProperties.showCheckboxes}
          deselectOnClickaway={tableBodyProperties.deselectOnClickaway}
          showRowHover={tableBodyProperties.showRowHover}
          stripedRows={tableBodyProperties.stripedRows}
        >
          {slicedJSX}
          {slicedJSX.length < JSX.length ?
            <div
              style={{ textAlign: 'center', width: '110vh', padding: 20, paddingBottom: 30 }}
            >
              <CircularProgress />
            </div> : null
          }
        </TableBody>
    );
  }

  render() {
    const { fullHeight } = this.props.tableMeta.tableProperties;
    const JSX = (
      <div
        ref="wrapper"
        style={fullHeight ? {
          height: 'calc(100vh - 168px)',
          overflow: 'hidden',
        } : undefined }
      >
        { this.table() }
        <WindowResizeListener onResize={() => {
          this.setDimension();
          this.calcColWidth();
        }}
        />
      </div>
    );

    return (JSX);
  }
}
