import React from 'react';

const clientID = '5bb0a2237e1e43c88d5b0bbeb013da73';
const redirectURI = 'http://localhost:3000/'
const accessToken = '';

class Spotify extends React.Component{
    
    getAccessToken(){
        if (accessToken) {
            return accessToken;
        } else {
            const address = windows.location.href;
            accessToken = address.match(/access_token=([^&]*)/);
            const expiresIn = address.match(/expires_in=([^&]*)/);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            const redirectURL = {`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`};
            window.location.href = redirectURL;
        }
    }

    search(term){
       return fetch(`https://api.spotify.com/v1/search?type=track&q=${this.props.term}`, {
           headers: {Authorization: `Bearer ${accessToken}`}
       })
    }
}
/*Need to wrap it in a promise statement */
export default Spotify;