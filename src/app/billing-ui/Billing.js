import React,{ Component , forwardRef} from "react";
// import DataGrid, { TextEditor } from 'react-data-grid';
// import 'react-data-grid/dist/react-data-grid.css';
import MaterialTable from 'material-table';
// import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };




const columns = [
    {field: "id", title: "ID"},
    {field: "title", title: "Title"},
     {field: "complete", title: "Complete" }
];

const rows = [
    {id: 0, title: "Task 1", complete: 20},
    {id: 1, title: "Task 2", complete: 40},
    {id: 2, title: "Task 3", complete: 60},
    {id: 3, title: "Task 4", complete: 80},
    {id: 4, title: "Task 5", complete: 90},
    {id: 5, title: "Task 6", complete: 100}
]

class Billing extends Component{

    state = { rows,columns };

    onGridRowsUpdated = (rows) => {
        // console.log(data);
        this.setState({ rows })
        // this.setState(state => {
        //   const rows = state.rows.slice();
        //   for (let i = fromRow; i <= toRow; i++) {
        //     rows[i] = { ...rows[i], ...updated };
        //   }
        //   return { rows };
        // });
      };

    render(){
        return (
            <div>
                {/* <DataGrid
                    columns={columns}
                    rows={this.state.rows}  
                    rowGetter={i => this.state.rows[i]}
                    rowsCount={3}
                    onRowsChange={this.onGridRowsUpdated}
                    enableCellSelect={true}
                /> */}
                <MaterialTable
             columns={this.state.columns}
             data={this.state.rows}
            
            cellEditable={{
                cellStyle: {},
                onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                    return new Promise((resolve, reject) => {
                        console.log('newValue: ' + newValue);
                        setTimeout(resolve, 4000);
                    });
                }
            
            }}
            
              title=" Title"
              icons={tableIcons}
                />
            </div>
        )
    }

}

export default Billing;