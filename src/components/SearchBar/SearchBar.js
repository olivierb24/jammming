import React from 'react';
import '../../css/SearchBar.css';

export class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }


    search(){
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event) {
        this.setState({
            term: event.target.value
        });
    }

    handleEnter(e) {
            if (e.keyCode == 13) {
                this.props.onSearch(this.state.term);
            }
        }
    
    render() {
        return(
            <div className="SearchBar">
            <input  onChange={this.handleTermChange} onKeyUp={this.handleEnter} placeholder="Enter A Song, Album, or Artist" autoFocus/>
            <button onClick={this.search} className="SearchButton">SEARCH</button>
            </div>
            )
        }
    }