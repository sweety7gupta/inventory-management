import React,{ Component }from 'react';
//import InputBase from '@material-ui/core/InputBase';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import './inventory.css';

class inventoryBarcodeSearch extends Component {
    state = {
        query: "",
        data: ["kallu","lallu","motu","gandu" ],
        filteredData: [],
      };

      handleInputChange = event => {
        const query = event.target.value;
    
        this.setState(prevState => {
          const filteredData = prevState.data.filter(element => {
            //return element.name.includes(query);
            return query;

          });
    
          return {
            query,
            filteredData
          };
        });
      };
    
      getData = () => {
        fetch(`http://localhost:3000/demo/purple-react-free/template/demo_1/preview/inventory-ui/inventoryEntry`)
          .then(response => response.json())
          .then(data => {
            const { query } = this.state;
            const filteredData = data.filter(element => {
              return element.name.toLowerCase().includes(query.toLowerCase());
            });
    
            this.setState({
              data,
              filteredData
            });
          });
      };
    
      componentWillMount() {
        this.getData();
      } 

    render(){
        return(
            <div>
                <div className="search">
                    <div className="searchIcon">
                        <SearchIcon />
                    </div>
                    <TextField
                   // <InputBase
                        placeholder="Search…"
                        // classes={{
                        //     root: classes.inputRoot,
                        //     input: classes.inputInput,
                        // }}
                        inputProps={{ 'aria-label': 'search' }}
                        value={this.state.query}
                        onChange={this.handleInputChange}
                        />
                        <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
                    </div>


            </div>
        )
    }        
}

export default inventoryBarcodeSearch;
