import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export class TrackList extends React.Component{
    
    render(){
        return(
            <div className="TrackList">
            {this.props.tracks.map( track => {
                return <Track onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} track={track} onAdd={this.props.onAdd} key={track.id}/>
            })}
            </div>
            )
        }
    }