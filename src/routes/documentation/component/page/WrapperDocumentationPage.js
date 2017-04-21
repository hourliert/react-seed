import React, { PropTypes, Component } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


// custom components
import Paper from 'material-ui/Paper';
import Code from 'material-ui/svg-icons/action/code';
import TableWrapper from 'components/TableWrapper';
import StatusIndicator from 'components/StatusIndicator';
import TabDialog from 'components/TabDialog';

// Examples
import { EXAMPLE1, EXAMPLE2, EXAMPLE3, EXAMPLE4 } from './examples';

// styles
import styles from './styles';


@pureRender
export default class WrapperDocumentationPage extends Component {
  static propTypes = {
    // selector
    user: PropTypes.object,
    // userActions
    updateUser: PropTypes.func,
    fetchCurrentUser: PropTypes.func,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      stepIndex: 0,
    };
  }

  getSafeHtml(jsonObj) {
    return JSON.stringify(jsonObj, null, 2);
  }

  getStepContent(stepIndex) {
    const { user } = this.props;
    switch (stepIndex) {
      case 0:
        const data = [
          {
            id: '228572545',
            status: 'En Route',
            date: '2017-04-07',
            city: 'TRACY',
          },
          {
            id: '228572548',
            status: 'Processing',
            date: '2017-04-08',
            city: 'LOS ANGELES',
          },
        ];

        const status = [
          'En Route',
          'Pick Up',
          'Processing',
          'Delivered',
          'Ready',
        ];

        const tableMeta = {
          superHeader: 'Active Loads',
          tableProperties: {
            fullHeight: false,
            fixedHeader: true,
            selectable: false,
            multiSelectable: true,
            enableSelectAll: false,
          },
          tableBodyProperties: {
            deselectOnClickaway: true,
            stripedRows: false,
            showRowHover: false,
          },
          mutlipleProperties: {
            showCheckboxes: false,
          },
          cols: [
            {
              headerTitle: 'String',
              searchable: 'STRING',
              tooltip: 'Load reference',
              filterable: true,
              dataPath: ['id'],
              colKey: 'id',
            },
            {
              headerTitle: 'Date',
              tooltip: 'Date',
              searchable: 'DATE',
              filterable: true,
              dataPath: ['date'],
              colKey: 'date',
            },
            {
              headerTitle: 'Select',
              tooltip: 'Load Status',
              searchable: 'AUTOCOMPLETE',
              filterable: true,
              dataPath: ['status'],
              colKey: 'status',
              autocomplete: {
                type: 'static',
                dataSource: status,
              },
              component: StatusIndicator,
              style: {
                width: 180,
              },
            },
            {
              headerTitle: 'City',
              tooltip: 'Last location',
              searchable: 'STRING',
              filterable: true,
              sortState: undefined,
              dataPath: ['city'],
              colKey: 'city',
            },
          ],
        };

        return (
          <Paper zDepth={1} style={{ padding: 25 }}>
            <h2>TableWrapper</h2>
            <hr />
            <p>This TableWrapper offers an easy way to build complex tables with advanced
              search and filter features. It uses material-ui Table components. You should
              take a look to the <a href="http://www.material-ui.com/#/components/table">original components</a> to understand the main structure.</p>
            <br />
            <h3>Example</h3>
            <Paper>
              <div style={styles.exampleHeader}>
                Simple Example
                <IconButton
                  style={styles.left}
                  tooltip="Show Source Code"
                  onClick={() => { ::this.handleOnClick('example1'); }}
                >
                  <Code />
                </IconButton>
              </div>
              {
                this.state.example1 ?
                <div style={styles.code}>
                  <pre>
                    {EXAMPLE1}
                  </pre>
                </div>
                : null
              }
              <div style={styles.exampleContainer}>
                <TableWrapper
                  data={data}
                  tableMeta={tableMeta}
                  onCellClick={(datum) => { console.log(datum); }}
                />
              </div>
            </Paper><br /><br />
          <h3>TableWrapper Properties</h3>
            <p>The component expects 3 props like this example :</p>
              <div style={styles.code}>
                <pre>
                  {EXAMPLE3}
                </pre>
              </div>

              <Table>
                <TableHeader
                  selectable={false}
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  multiSelectable={false}
                >
                  <TableRow>
                    <TableHeaderColumn style={styles.tableHeader}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={styles.tableHeader}>Type</TableHeaderColumn>
                    <TableHeaderColumn style={styles.tableHeader}>Default</TableHeaderColumn>
                    <TableHeaderColumn style={styles.tableHeaderDesc}>Description</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                >
                  <TableRow>
                    <TableRowColumn style={styles.name}>data</TableRowColumn>
                    <TableRowColumn style={styles.type}>array</TableRowColumn>
                    <TableRowColumn />
                    <TableRowColumn style={styles.tableHeaderDesc}>The original data object.</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={styles.name}>tableMeta</TableRowColumn>
                    <TableRowColumn style={styles.type}>Object</TableRowColumn>
                    <TableRowColumn />
                    <TableRowColumn style={styles.tableHeaderDesc}>the table description. <br />
                      This object contains lots of configuration.<br />
                      The structure will be detailled later.</TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={styles.name}>onCellClick</TableRowColumn>
                    <TableRowColumn style={styles.type}>Function</TableRowColumn>
                    <TableRowColumn />
                    <TableRowColumn style={styles.tableHeaderDesc}>If the selectable option in the tableMeta is on,<br />
                       this function is called when a user click on a row.<br />
                    the concerned object is passed in parameter.</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table><br />
            <h3>tableMeta object</h3>
            <p>
              The tableMeta object contains a precise description of the Table to get the content and the look you want.
            The tableMeta object contains the following keys : </p>
            <h4>superHeader (String)</h4>
            <p>The table's Title</p>
            <h4>tableProperties (Object)</h4>
              <Table>
                <TableHeader
                  selectable={false}
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  multiSelectable={false}
                >
                  <TableRow>
                    <TableHeaderColumn style={styles.tableHeader}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={styles.tableHeader}>Type</TableHeaderColumn>
                    <TableHeaderColumn style={styles.tableHeader}>Default</TableHeaderColumn>
                    <TableHeaderColumn style={styles.tableHeaderDesc}>Description</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                >
                  <TableRow>
                    <TableRowColumn style={styles.name}>fixedHeader</TableRowColumn>
                    <TableRowColumn style={styles.type}>bool</TableRowColumn>
                    <TableRowColumn >true</TableRowColumn>
                    <TableRowColumn style={styles.tableHeaderDesc}>
                      If true, the header will appear fixed above the table. The default value is true.
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={styles.name}>selectable</TableRowColumn>
                    <TableRowColumn style={styles.type}>bool</TableRowColumn>
                    <TableRowColumn >true</TableRowColumn>
                    <TableRowColumn style={styles.tableHeaderDesc}>
                      If true, table rows can be selected. <br />If multiple row selection is desired, enable multiSelectable.
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={styles.name}>multiSelectable</TableRowColumn>
                    <TableRowColumn style={styles.type}>bool</TableRowColumn>
                    <TableRowColumn >false</TableRowColumn>
                    <TableRowColumn style={styles.tableHeaderDesc}>
                      If true, multiple table rows can be selected. <br />CTRL/CMD+Click and SHIFT+Click are valid actions.
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={styles.name}>enableSelectAll</TableRowColumn>
                    <TableRowColumn style={styles.type}>bool</TableRowColumn>
                    <TableRowColumn >true</TableRowColumn>
                    <TableRowColumn style={styles.tableHeaderDesc}>
                      If set to true, the select all button will be interactable. <br />If set to false, the button will not be interactable.
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
              <h4>tableBodyProperties (Object)</h4>
                <Table>
                  <TableHeader
                    selectable={false}
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    multiSelectable={false}
                  >
                    <TableRow>
                      <TableHeaderColumn style={styles.tableHeader}>Name</TableHeaderColumn>
                      <TableHeaderColumn style={styles.tableHeader}>Type</TableHeaderColumn>
                      <TableHeaderColumn style={styles.tableHeader}>Default</TableHeaderColumn>
                      <TableHeaderColumn style={styles.tableHeaderDesc}>Description</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                  >
                    <TableRow>
                      <TableRowColumn style={styles.name}>deselectOnClickaway</TableRowColumn>
                      <TableRowColumn style={styles.type}>bool</TableRowColumn>
                      <TableRowColumn >true</TableRowColumn>
                      <TableRowColumn style={styles.tableHeaderDesc}>
                        Controls whether or not to deselect all selected rows after clicking outside the table.
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn style={styles.name}>stripedRows</TableRowColumn>
                      <TableRowColumn style={styles.type}>bool</TableRowColumn>
                      <TableRowColumn >false</TableRowColumn>
                      <TableRowColumn style={styles.tableHeaderDesc}>
                        If true, every other table row starting with the first row will be striped
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn style={styles.name}>showRowHover</TableRowColumn>
                      <TableRowColumn style={styles.type}>bool</TableRowColumn>
                      <TableRowColumn >false</TableRowColumn>
                      <TableRowColumn style={styles.tableHeaderDesc}>
                        If true, table rows will be highlighted when the cursor is hovering over the row.
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn style={styles.name}>capitalize</TableRowColumn>
                      <TableRowColumn style={styles.type}>bool</TableRowColumn>
                      <TableRowColumn >false</TableRowColumn>
                      <TableRowColumn style={styles.tableHeaderDesc}>
                        Capitalize cells contents. (First char of each words are capitalized).
                      </TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
              <h4>mutlipleProperties (Object)</h4>
                <Table>
                  <TableHeader
                    selectable={false}
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    multiSelectable={false}
                  >
                    <TableRow>
                      <TableHeaderColumn style={styles.tableHeader}>Name</TableHeaderColumn>
                      <TableHeaderColumn style={styles.tableHeader}>Type</TableHeaderColumn>
                      <TableHeaderColumn style={styles.tableHeader}>Default</TableHeaderColumn>
                      <TableHeaderColumn style={styles.tableHeaderDesc}>Description</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                  >
                    <TableRow>
                      <TableRowColumn style={styles.name}>showCheckboxes</TableRowColumn>
                      <TableRowColumn style={styles.type}>bool</TableRowColumn>
                      <TableRowColumn >true</TableRowColumn>
                      <TableRowColumn style={styles.tableHeaderDesc}>
                        Display checkboxed on each cells.
                      </TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
                <h4>cols (Array of objects)</h4>
                <p>In this object, you can describe each columns. The description object has this shape :</p>
                  <Table>
                    <TableHeader
                      selectable={false}
                      displaySelectAll={false}
                      adjustForCheckbox={false}
                      multiSelectable={false}
                    >
                      <TableRow>
                        <TableHeaderColumn style={styles.tableHeader}>Name</TableHeaderColumn>
                        <TableHeaderColumn style={styles.tableHeader}>Type</TableHeaderColumn>
                        <TableHeaderColumn style={styles.tableHeader}>Default</TableHeaderColumn>
                        <TableHeaderColumn style={styles.tableHeaderDesc}>Description</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody
                      displayRowCheckbox={false}
                    >
                      <TableRow>
                        <TableRowColumn style={styles.name}>headerTitle</TableRowColumn>
                        <TableRowColumn style={styles.type}>string</TableRowColumn>
                        <TableRowColumn />
                        <TableRowColumn style={styles.tableHeaderDesc}>
                          Title of the column.
                        </TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn style={styles.name}>searchable</TableRowColumn>
                        <TableRowColumn style={styles.type}>string</TableRowColumn>
                        <TableRowColumn />
                        <TableRowColumn style={styles.tableHeaderDesc}>
                          Type of search field. Can be 'STRING', 'DATE', or 'AUTOCOMPLETE'
                        </TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn style={styles.name}>autocomplete</TableRowColumn>
                        <TableRowColumn style={styles.type}>object</TableRowColumn>
                        <TableRowColumn />
                        <TableRowColumn style={styles.tableHeaderDesc}>
                          if searchable is set to 'AUTOCOMPLETE', set the behavior of the completion :<br />
                        'static' (selectfield MUI component), or 'suggest' (AutoComplete MUI component).<br />
                        Example : <br /><br />
                        <div style={styles.code}>
                          <pre>
                            {EXAMPLE4}
                          </pre>
                        </div><br />
                      - dataSource is an Array of string containing pre-defined value.<br />
                    - maxSearchResults is the number of proposition you want to display.
                        </TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn style={styles.name}>filterable</TableRowColumn>
                        <TableRowColumn style={styles.type}>bool</TableRowColumn>
                        <TableRowColumn />
                        <TableRowColumn style={styles.tableHeaderDesc}>
                          Enable or not the filter feature for the column.
                        </TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn style={styles.name}>type</TableRowColumn>
                        <TableRowColumn style={styles.type}>string</TableRowColumn>
                        <TableRowColumn />
                        <TableRowColumn style={styles.tableHeaderDesc}>
                          If the filterable is true, specify the type of the columns' data.<br />
                          can be 'STRING' or 'NUMBER'.
                        </TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn style={styles.name}>dataPath</TableRowColumn>
                        <TableRowColumn style={styles.type}>array of string</TableRowColumn>
                        <TableRowColumn />
                        <TableRowColumn style={styles.tableHeaderDesc}>
                          Set the cell's content by defining the data paths in the data object.
                        </TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn style={styles.name}>colKey</TableRowColumn>
                        <TableRowColumn style={styles.type}>string</TableRowColumn>
                        <TableRowColumn />
                        <TableRowColumn style={styles.tableHeaderDesc}>
                          unique key for the col.
                        </TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn style={styles.name}>component</TableRowColumn>
                        <TableRowColumn style={styles.type}>component</TableRowColumn>
                        <TableRowColumn />
                        <TableRowColumn style={styles.tableHeaderDesc}>
                          You can wrapp a cell with a custom conponent. The cell content will be passed to<br /> it throught 'value' props.
                          The entire object is also injected via props 'datum'.
                        </TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn style={styles.name}>style</TableRowColumn>
                        <TableRowColumn style={styles.type}>object</TableRowColumn>
                        <TableRowColumn />
                        <TableRowColumn style={styles.tableHeaderDesc}>
                          Override column style.
                        </TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
          </Paper>
        );
      case 1:
        return (
          <Paper zDepth={1} style={{ padding: 25 }}>
            <h2>TabDialog</h2>
            <hr />
            <p>Creating multi-tab dialog window can be very challenging using basic MUI components.<br /><br />
              If each tabs have complex components that are able to edit the application's state, we really
              want these components to be informed about what's the user do with the modal's action buttons.
              With the TabDialog component, callbacks and modal lifecycle's functions are injected to each tab children.
              This will help you to perform rountine depending of what the user decided to do (cancel, create ... etc).<br /><br />
              You can also provide a refresh function to TabDialog that will be executed when all tab children callback are received.
              In this function, you can for example refresh an object from the API if some the ressource has been edited by a tab components.
              </p>
            <h3>Example</h3>
            <div style={styles.exampleHeader}>
              Simple Example
              <IconButton
                style={styles.left}
                tooltip="Show Source Code"
                onClick={() => { ::this.handleOnClick('example2'); }}
              >
                <Code />
              </IconButton>
            </div>
            {
              this.state.example2 ?
              <div style={styles.code}>
                <pre>
                  {EXAMPLE1}
                </pre>
              </div>
              : null
            }
            <div style={styles.exampleContainer}>
              <div style={{ width: '100%', textAlign: 'center' }}>
                You are <b>{user.firstName} {user.lastName}</b> and your email address is <b>{user.email}</b><br /><br />
                <FlatButton
                  label="Edit my info"
                  backgroundColor="#2196f3"
                  hoverColor="#1976d2"
                  style={{ color: 'white' }}
                  onClick={() => {
                    this.setState({ tabDialogIsOpen: true });
                  }}
                />
                <TabDialog
                  open = {this.state.tabDialogIsOpen}
                  close = {() => {this.setState({ tabDialogIsOpen: false });}}
                  closeLabel={'Cancel'}
                  refresh={() => { console.log('refresh'); }} //eslint-disable-line
                  action={() => { console.log('action') }} //eslint-disable-line
                  actionLabel={'save'}
                  title={'Edit my info'}
                >
                  <div label="Peronnal" style={{ height: 300 }}>Peronnal</div>
                  <div label="Email" style={{ height: 300 }}>Email</div>
                </TabDialog>
              </div>
            </div>
          </Paper>
        );
      case 2:
        return (
          <Paper zDepth={1} style={{ padding: 25 }}>
            <h2>Form</h2>
            <hr />
          </Paper>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleOnClick(value) {
    const state = this.state;
    if (state[value]) {
      state[value] = !state[value];
    } else {
      state[value] = true;
    }

    this.state = state;
    this.forceUpdate();
  }

  render() {
    const {
      stepIndex,
    } = this.state;

    return (
      <div className="flex layout vertical">
        <Toolbar style={{ background: 'white', borderBottom: '1px solid #aaaaaa', height: 48 }}>
          <ToolbarGroup firstChild style={{ marginLeft: '5px', overflow: 'scroll' }}>
            <div
              style={stepIndex === 0 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => { this.setState({ stepIndex: 0 }); }}
            >
              TableWrapper
            </div>
            <div
              style={stepIndex === 1 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => { this.setState({ stepIndex: 1 }); }}
            >
              TabDialog
            </div>
            <div
              style={stepIndex === 2 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => { this.setState({ stepIndex: 2 }); }}
            >
              Form
            </div>
          </ToolbarGroup>
        </Toolbar>
        <div style={styles.container}>
            {this.getStepContent(this.state.stepIndex)}
        </div>
      </div>
    );
  }
}
