import React,{ Component }from 'react';
//import InputBase from '@material-ui/core/InputBase';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

class ProductSearch extends Component {
  // const top100Films = [
  //   { title: 'The Shawshank Redemption', year: 1994 },
  // ]
   
  state = {
    productDetails : [
      { product : "Kaju" ,barcode: "0999900000000" },
      { product : "Lays" ,barcode: "0111111111111" },
      { product : "Kurkure" ,barcode: "1234567890125" },
      { product : "Ice-Cream" ,barcode: "1234567890126" },
      { product : "Peanut" ,barcode: "1234567890127" },
    ],
    labelWithIcon : <span className="fas fa-mdi mdi-barcode" />
    
  }
  render (){
    return (
      <div >
        <div className="card-body text-field-container input_container"  >   

             <SearchIcon
              fontSize="inherit"
              style={{ fontSize: "30px" }}
              
            /> 
          
            <Autocomplete
              id="productSarchCombo"
              options={this.state.productDetails}
              getOptionLabel={(option) => option.product || option.barcode }
              // style={{ width: 300 }}
              renderInput={(params) => 
              <TextField {...params} label="Search" variant="outlined"  />
            }
              size= "small"
              className="text-field search"
              
              //icon={(params)=><SearchIcon {...params} />}
              
              // defaultValue={{ label: this.state.labelWithIcon, value: 'some-value' }} 
            />
        </div>
      </div>
     
    )
  }
           
}

export default ProductSearch;


