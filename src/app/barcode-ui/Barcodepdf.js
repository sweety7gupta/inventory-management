import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

class Barcodepdf extends Component{
    //const [numPages, setNumPages] = {useState(null)};
    // const [pageNumber, setPageNumber] = useState(1);

    state = {
        numPages: null,
        setNumPages: null,
        pageNumber:"1",
        setPageNumber:"1",
        file: this.props.barcode

    }
    onDocumentLoadSuccess = (numPages) => {
        this.state.setNumPages(numPages);
    }

    render (){
        return (
            <div>
            <Document
                file={this.state.file}//"somefile.pdf"
                onLoadSuccess={this.onDocumentLoadSuccess}
            >
                <Page pageNumber={this.state.pageNumber} />
            </Document>
            <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
            </div>
        )
    }
}

export default Barcodepdf;