var express = require("express");
var router = express.Router();
var monk = require("monk");
const db = monk(process.env.MONGODB_URI || "localhost:27017/nodetest1");

const SpotifyWebApi = require("spotify-web-api-node");
scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-top-read",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative"
];

require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_API_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL
});

router.get("/login", (req, res) => {
  const html = spotifyApi.createAuthorizeURL(scopes);
  console.log(html);
  res.send(html + "&show_dialog=true");
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;
  console.log(code);
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    res.redirect("http://localhost:3000/home");
  } catch (err) {
    res.redirect("/#/error/invalid token");
  }
});

router.post("/playlist", async (req, res) => {
  console.log(req.body);
  const userId = await getUserId();
  const userEmail = await getUserEmail();
  const emptyPlaylist = await createEmptyPlaylist(
    userId,
    req.body.playlistName
  );
  await saveUserData(userEmail);
  const seeds = await getPlaylistSeed(userEmail);
  const recommendations = await getRecommendations(
    seeds.tracks.slice(0, 3),
    seeds.artists.slice(0, 2),
    req.body.numSongs
  );
  const tracks = recommendations.tracks.map(track => {
    return track.uri;
  });
  try {
    const createdList = await addToPlaylist(emptyPlaylist.id, tracks);
    console.log(createdList.body);
    res.status(200).send(createdList.body);
  } catch (err) {
    res.status(400).send(err);
  }
});

//create playlist from recommendations
router.post("/createUserList", async (req, res) => {
  console.log(req.body.params);
  const userId = await getUserId();
  const playlist = await createEmptyPlaylist(
    userId,
    req.body.params.playlistName
  );
  const favTracks = await getUserFavoriteTracks(
    req.body.params.numTracks,
    req.body.params.term
  );
  try {
    const createdList = await addToPlaylist(playlist.id, favTracks);
    createResponse = createdList.body;
    createResponse["playlistId"] = playlist.external_urls.spotify;
    res.status(200).send(createResponse);
  } catch (err) {
    res.status(400).send(err);
  }
});

//get & format seed data from database
const getPlaylistSeed = async userEmail => {
  var collection = db.get("music");
  const data = await collection.find({ userEmail }, "data");
  let mediumTracks = [];
  let mediumArtists = [];
  data.forEach(item => {
    mediumTracks.push(item.data.mediumTracks);
    mediumArtists.push(item.data.mediumArtists);
  });
  const flatTracks = mediumTracks.flat(1);
  const flatArtists = mediumArtists.flat(1);
  const tracksList = [];
  const artistsList = [];
  flatTracks.forEach(index => {
    tracksList.push(index.id);
  });
  flatArtists.forEach(index => {
    artistsList.push(index.id);
  });
  return {
    tracks: tracksList,
    artists: artistsList
  };
};

//stores listening data in database
const saveUserData = async userEmail => {
  var collection = db.get("music");
  const userData = await getListeningData(userEmail);

  const data = {
    $set: userData
  };

  collection.update({ userEmail: userEmail }, data, { upsert: true }, function(
    err,
    doc
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log("nailed it");
    }
  });
};

const createEmptyPlaylist = async (userId, playlistName) => {
  try {
    const result = await spotifyApi.createPlaylist(userId, playlistName, {
      public: false,
      collaborative: true
    });
    console.log(result);
    return result.body;
  } catch (err) {
    console.log(err);
  }
};

const getUserId = async () => {
  try {
    const result = await spotifyApi.getMe();
    return result.body.id;
  } catch (err) {
    console.log("getUserIdError: " + err);
  }
};

const getUserEmail = async () => {
  try {
    const result = await spotifyApi.getMe();
    return result.body.email;
  } catch (err) {
    console.log("getUserEmailError: " + err);
  }
};

const getListeningData = async userEmail => {
  const mediumTracks = await getUserFavoriteTracks(10, "short_term");
  const mediumArtists = await getUserFavoriteArtists(10, "short_term");
  //console.log(mediumTracks);
  const userData = {
    userEmail,
    data: {
      mediumTracks,
      mediumArtists
    }
  };
  return userData;
};

const getUserFavoriteTracks = async (numTracks, term) => {
  const result = await spotifyApi.getMyTopTracks({
    limit: numTracks,
    time_range: term
  });
  const tracks = result.body.items.map(track => {
    return {
      id: track.id,
      name: track.name
    };
  });
  //console.log(tracks);
  return tracks;
};

const getUserFavoriteArtists = async (numArtists, term) => {
  const result = await spotifyApi.getMyTopArtists({
    limit: numArtists,
    time_range: term
  });
  const artists = result.body.items.map(artist => {
    return {
      id: artist.id,
      name: artist.name,
      genres: artist.genres
    };
  });
  //console.log({ ...artists });
  return artists;
};

const getRecommendations = async (seedTracks, seedArtists, numSongs) => {
  console.log(seedTracks);
  console.log(seedArtists);
  try {
    const result = await spotifyApi.getRecommendations({
      seed_artists: seedArtists,
      seed_tracks: seedTracks,
      min_popularity: 50,
      limit: numSongs
    });
    return result.body;
  } catch (err) {
    console.log(err);
  }
};

const addToPlaylist = async (playlist, tracks) => {
  const result = await spotifyApi.addTracksToPlaylist(playlist, tracks);
  console.log(result);
  return result;
};

module.exports = router;
