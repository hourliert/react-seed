export const EXAMPLE1 = `import React from 'react';
import TableWrapper from 'components/TableWrapper';
import StatusIndicator from 'components/StatusIndicator';

export default class SimpleExample extends Component {

  render() {
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
      <TableWrapper
        data={data}
        tableMeta={tableMeta}
        onCellClick={(datum) => { console.log(datum); }}
      />
    );
  }
}
`;

export const EXAMPLE2 = `{
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
},`;

export const EXAMPLE3 = `<TableWrapper
    data={data}
    tableMeta={tableMeta}
    onCellClick={(datum) => { console.log(datum); }}
  />`;

export const EXAMPLE4 = `autocomplete: {
    type: 'static',
    dataSource: status,
    maxSearchResults: 5,
  }`;

  export const EXAMPLE5 = `
import React from 'react';
import TableWrapper from 'components/TableWrapper';
import StatusIndicator from 'components/StatusIndicator';

import styles fron './styles';

export default class SimpleExample extends Component {
  static propTypes: {
    user: PropTypes.object,
    fetchCurrentUser: PropTypes.func,
  }

  state = {
    tabDialogIsOpen: false,
    greetingStatus: '',
  }

  openTabDialog() {
    this.setState({ tabDialogIsOpen: true });
  }

  closeTabDialog() {
    this.setState({ tabDialogIsOpen: false, greetingStatus: '' });
  }

  refresh() {
    const { fetchCurrentUser } = this.props;
    fetchCurrentUser();
    this.setState({ greetingStatus: 'Greetings have been updated' });
  }

  render() {
    const { user, fetchCurrentUser } = this.props;
    const { greetingStatus } = this.state;

    return(
      <div>
        <div style={styles.greetings}>greetingStatus</div>

        Welcome ! You are <b>{user.firstName} {user.lastName}</b> and
        your email address is <b>{user.email}</b>

        <FlatButton
          label="Edit my info"
          backgroundColor="#2196f3"
          hoverColor="#1976d2"
          style={styles.flatButton}
          onClick={this.openTabDialog}
        />

        <TabDialog
          open = {tabDialogIsOpen}
          close = {::this.closeTabDialog}
          closeLabel={'Cancel'}
          refresh={::this.refresh}
          action={() => { console.log('action') }}
          actionLabel={'save'}
          title={'Edit my info'}
        >
          <ExamplePersonalInfo
            label={'Personal Info'}
            user={user}
            updateUser={updateUser}
          />
          <ExamplePersonalEmail label={'Email'}
            label={'Email'}
            user={user}
            updateUser={updateUser}
          />
        </TabDialog>
      </div>
    );
  }
  `;
