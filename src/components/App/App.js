import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [{
        name: 'Jon',
        artist: 'Bella',
        album: 'six',
        id: '101010'
      }, {
        name: 'Jon',
        artist: 'Wick',
        album: 'My new life',
        id: '13255'
      }, {
        name: 'Alex',
        artist: 'Fibonaci',
        album: 'six',
        id: '88992'
      }],
      
      
      playlistName: '',
      
      playlistTracks: [{
        name: 'Jon',
        artist: 'Bella',
        album: 'six',
        id: '101010'
      }, {
        name: 'Jon',
        artist: 'Wick',
        album: 'My new life',
        id: '13255'
      }]
    };
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  
  updatePlaylistName(newName){
    this.setState({
      playlistName: newName
    });
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      console.log('First log')
      console.log(this.state.playlistTracks);
      let newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      
      this.setState({
        playlistTracks: newPlaylist
      });
      console.log('after pushing')
      console.log(this.state.playlistTracks);
    }
  }
  
  removeTrack(track) {
    const newTracks = this.state.playlistTracks.filter( currentTrack => currentTrack.id !== track.id);
    this.setState({
      playlistTracks: newTracks
    });
  }
  
  savePlaylist(){
    const trackURIs = this.playlistTracks.map( track =>{
      return track.uri;
    })
  }
  
  search(searchTerm){
    Spotify.search(searchTerm).then( searchResult => {
      this.setState({
        searchResults: searchResult
      });
    });
  }
  
  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults= {this.state.searchResults} />
      <Playlist onNameChange={this.updatePlaylistName} 
      onRemove={this.removeTrack} 
      playlistName={this.state.playlistName} 
      playlistTracks={this.state.playlistTracks}
      onSave={this.savePlaylist}/>
      </div>
      </div>
      </div>
      );
    }
  }
  
  export default App;
  