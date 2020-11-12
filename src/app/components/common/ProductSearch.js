import React,{ Component }from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

class ProductSearch extends Component {
  onProductSelect = (event, value) => {
    event.preventDefault();
    this.props.onProductSelect(value);
  }

  handleSearchTextChange = (event) => {
    console.log(event.target.value);
  };

  render () {
    return (
      <div>
        <div className="card-body text-field-container input_container">
            <Autocomplete
              id="productSarchCombo"
              options={this.props.products}
              getOptionLabel={(option) => option.productName + ' - ' + option.barcode }
              getOptionSelected={(option) => option.barcode }
              onChange={this.onProductSelect}
              renderInput={(params) => 
                <TextField 
                  {...params}
                  label="Search"
                  variant="outlined"
                  autoFocus
                  onChange={this.handleSearchTextChange}
                />
              }
              size= "small"
              className="text-field search"
              ListboxProps={{
                style: {
                  maxHeight: 600,
                  overflow: 'auto',
                }
              }}
            />
        </div>
      </div>
    )
  }
           
}

export default ProductSearch;
