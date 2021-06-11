require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');

// require spotify-web-api-node package here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

// Our routes go here:

app.get("/",  (req,res) => {
    res.render("homepage")
})

app.get("/artist-search", (req, res) => {
    const { artist } = req.query
    spotifyApi
    .searchArtists(artist) /*'HERE GOES THE QUERY ARTIST'*/
    .then(data => {
    //   console.log('The received data from the API: ', data.body.artists.items.images);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      res.render("artist-search-results", { artists:  data.body.artists.items})

    })
    .catch(err => console.log('The error while searching artists occurred: ', err));

})


app.get('/albums/:artistId', (req, res) => {
    let  artistid = req.params.artistId
    spotifyApi
    .getArtistAlbums(artistid) /*'HERE GOES THE Params for ARTIST' id albums*/
    .then(data => {
    //   console.log('The received data from the API: ', data.body.items);
      res.render("albums", { albums:  data.body.items})

    })
    .catch(err => console.log('The error while searching artists occurred: ', err));

})


app.get('/album/:albumId', (req, res) => {
    let albumid = req.params.albumId
    spotifyApi.getAlbumTracks(albumid)
  .then(data => {
    // console.log('The received data from the API: ', data.body);
    console.log('Tracks', data.body.items)
    res.render('tracks', { tracks: data.body.items })

  })
  .catch(err => console.log('The error while searching tracks occurred: ', err))
})


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
