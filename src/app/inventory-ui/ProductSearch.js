import React,{ Component }from 'react';
import { TextField } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as ApiHelper from '../ApiHelper';

class ProductSearch extends Component {
  state = {
    products : [],
    tags: [],
    labelWithIcon : <span className="fas fa-mdi mdi-barcode" />
    
  }

  onTagsChange = (event, value) => {
    if (value){
       this.props.onProductSelect(value.barcode);
    }
    else
    {
      this.props.onProductSelect();
    }
  }

  render (){
    return (
      <div >
        <div className="card-body text-field-container input_container"  >    
          {/* <div style={{ position: 'relative' }}> */}
            <Autocomplete
              id="productSarchCombo"
              options={this.state.products}
              getOptionLabel={(option) => option.productName || option.barcode }
              getOptionSelected={(option) => option.barcode }
              onChange={this.onTagsChange}
              renderInput={(params) => 
                <TextField 
                  {...params}
                  label="Search"
                  variant="outlined"
                 // InputProps={{ ...params.InputProps, type: 'search' }}
                  
                />
              }
              style={{  }}
              size= "small"
              className="text-field search"
            />

            {/* <SearchIcon
              fontSize="inherit"
              style={{ position: 'absolute', top: '10px', left: '330px' }}    
              //className="MuiButtonBase-root MuiIconButton-root MuiAutocomplete-popupIndicator"          
            /> */}
          {/* </div> */}
        </div>
      </div>     

    )
  }
           
}

export default ProductSearch;


