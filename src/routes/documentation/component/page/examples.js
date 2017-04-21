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
