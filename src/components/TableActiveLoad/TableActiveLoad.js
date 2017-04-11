import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// custom components
import TableWrapper from 'components/TableWrapper';
import Tag from 'components/Tag';

// data
import data from './data.json';

@pureRender
export default class TableActiveLoad extends Component {
  static propTypes = {

  };

  render() {
    const loads = [
      '719184',
      '719390',
      '719506',
      '719507',
      '719606',
      '719626',
      '719635',
      '719636',
    ];

    const status = [
      'En Route',
      'Pick Up',
      'Processing',
      'Delivered',
      'Ready',
    ];

    const tableMeta = {
      superHeader: 'Active Shipments',
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
        tableRowStyle: {
          borderLeft: 'solid 3px #4CAF50',
        },
      },
      mutlipleProperties: {
        showCheckboxes: false,
      },
      cols: [
        {
          headerTitle: 'Controlled',
          filterable: true,
          sortState: undefined,
          searchable: 'AUTOCOMPLETE',
          dataPath: 'id',
          colKey: 'id',
          autocomplete: {
            type: 'suggest',
            dataSource: loads,
            maxSearchResults: 5,
          },
          component: Tag,
        },
        {
          headerTitle: 'String',
          searchable: 'STRING',
          tooltip: 'Load reference',
          filterable: true,
          sortState: undefined,
          dataPath: 'refNumber',
          colKey: 'refNumber',
        },
        {
          headerTitle: 'Date',
          tooltip: 'Date',
          searchable: 'DATE',
          filterable: true,
          sortState: undefined,
          dataPath: 'stops[0].date',
          colKey: 'date',
        },
        {
          headerTitle: 'Select',
          tooltip: 'Load Status',
          searchable: 'AUTOCOMPLETE',
          filterable: true,
          sortState: undefined,
          dataPath: 'status',
          colKey: 'status',
          autocomplete: {
            type: 'static',
            dataSource: status,
          },
        },
        {
          headerTitle: 'City',
          tooltip: 'Last location',
          searchable: 'STRING',
          filterable: true,
          sortState: undefined,
          dataPath: 'lastLocation.city',
          colKey: 'city',
        },
      ],
    };

    return (
      <TableWrapper
        data={data}
        tableMeta={tableMeta}
      />
    );
  }

}
