import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';


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
      
      
      playlistName: 'My new jam',
      playlistTracks: [{
        name: 'Jon',
        artist: 'Bella',
        album: 'six',
        id: '101010'
      }, {
        name: 'Jon',
        artist: 'Wick',
        album: 'My new life',
        id: '101010'
      }]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  

  addTrack(track) {
    console.log('the following is the track object');
    console.log(track);
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.state.playlistTracks.push({
        name: track.name,
        artist: track.artist,
        album: track.album,
        id: track.id
      })
    }
  }

  removeTrack(track) {
    console.log(this.state.playlistTracks);
    const newTracks = this.state.playlistTracks.filter( currentTrack => currentTrack.id !== track.id);
    this.setState({
      playlistTracks: newTracks
    });
    console.log(this.state.playlistTracks);
    }
  
  
  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
      <SearchBar />
      <div className="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults= {this.state.searchResults} />
      <Playlist onRemove={this.removeTrack}playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
      </div>
      </div>
      </div>
      );
    }
  }
  
  export default App;
  