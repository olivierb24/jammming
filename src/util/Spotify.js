import React from 'react';

const clientId = '5bb0a2237e1e43c88d5b0bbeb013da73';
const redirectUri = 'http://localhost:3000/'
let accessToken;

class Spotify extends React.Component{
    
    getAccessToken(){
        if (accessToken) {
            return accessToken;
        } 
        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);;
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        
        if (accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {        
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }        
    }
    
    
    async fetchingRequest(url, headers) {
        try{
            const response = await fetch(url, headers);
            if (response.ok){
                const jsonResponse = await response.json();
                return jsonResponse;
            }
            throw new Error('Request Failed');
        } catch(error){
            console.log(error.message);
        }
    }
    
    async savePlaylist(playlistName, trackArray ){
        if (!playlistName || !trackArray){
            return; 
        } 
        
        const accessToken = await this.getAccessToken();
        const headers = { Authorization:  `Bearer${accessToken}`};
        let userId;
        
        this.fetchingRequest('https://api.spotify.com/v1/me', headers)
        .then(response => {
            userId = response.id;
            return this.fetchingRequest(`https://api.spotify.com/v1/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name:playlistName})
        });
    })
    .then( secondResponse => {
        const playlistId = secondResponse.id;
        return this.fetchingRequest(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackArray})
        });
    })
}

async search(term){
    accessToken = await this.getAccessToken();
    try{
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {Authorization: `Bearer ${accessToken}`}
    });
    if (response.ok) {
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        } else{
            return jsonResponse.tracks.items.map( track => ({
                ID: track.id,
                Name: track.name,
                Artist: track.artists[0].name,
                Album: track.album,
                URI: track.uri
            }));
        };
    }
    throw new Error('Request Failed!');
} catch (error) {
    console.log(error);
}


}
}
/*Need to wrap it in a promise statement */
export default Spotify;