import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';

// custom components
import TableWrapper from 'components/TableWrapper';

// data
import data from './data.json';

@pureRender
export default class TableActiveLoad extends Component {
  static propTypes = {

  };

  render() {
    const colors = [
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Black',
      'White',
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
      },
      mutlipleProperties: {
        showCheckboxes: false,
      },
      cols: [
        {
          headerTitle: 'Controlled',
          filterable: true,
          filterState: undefined,
          searchable: 'AUTOCOMPLETE',
          dataPath: 'id',
          colKey: 'id',
          autocomplete: {
            type: 'suggest',
            dataSource: colors,
            maxSearchResults: 5,
          },
        },
        {
          headerTitle: 'String',
          searchable: 'STRING',
          tooltip: 'Load reference',
          filterable: true,
          filterState: undefined,
          dataPath: 'refNumber',
          colKey: 'refNumber',
        },
        {
          headerTitle: 'Date',
          tooltip: 'Date',
          searchable: 'DATE',
          filterable: true,
          filterState: undefined,
          dataPath: 'stops[0].date',
          colKey: 'date',
        },
        {
          headerTitle: 'Select',
          tooltip: 'Load Status',
          searchable: 'AUTOCOMPLETE',
          filterable: true,
          filterState: undefined,
          dataPath: 'status',
          colKey: 'status',
          autocomplete: {
            type: 'static',
            dataSource: colors,
          },
        },
        {
          headerTitle: 'City',
          tooltip: 'Last location',
          searchable: 'STRING',
          filterable: true,
          filterState: undefined,
          dataPath: 'lastLocation.city',
          colKey: 'city',
        },
      ],
    };

    return (
      <TableWrapper
        data={data}
        tableMeta={tableMeta}
      >
        Yay
      </TableWrapper>
    );
  }

}
