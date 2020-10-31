import React,{ Component }from 'react';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

class ProductSearch extends Component {
  state = {
    productDetails : [
      { product : "Kaju" ,barcode: "0999900000000" },
      { product : "Lays" ,barcode: "0111111111111" },
      { product : "Kurkure" ,barcode: "1234567890125" },
      { product : "Ice-Cream" ,barcode: "1234567890126" },
      { product : "Peanut" ,barcode: "1234567890127" },
    ],
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
              options={this.state.productDetails}
              getOptionLabel={(option) => option.product || option.barcode }
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


