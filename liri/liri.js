
var keys = require("./keys");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');

function getMovie(movieName) {
    if (!movieName) {
        movieName = "Mr. Nobody";
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=b56682e4";
        var request = require("request");
        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("Title: " + JSON.parse(body).Title + "\n");
                console.log("Release Year: " + JSON.parse(body).Released + "\n");
                console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value + "\n");
                console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value + "\n");
                console.log("Language: " + JSON.parse(body).Language + "\n");
                console.log("Plot: " + JSON.parse(body).Plot + "\n");
                console.log("Actors: " + JSON.parse(body).Actors + "\n");
            }
        });

    } else if (movieName) {
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=b56682e4";

        var request = require("request");

        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // console.log(body);
                console.log("Title: " + JSON.parse(body).Title + "\n");
                console.log("Release Year: " + JSON.parse(body).Released + "\n");
                console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value + "\n");
                console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value + "\n");
                console.log("Country: " + JSON.parse(body).Country + "\n");
                console.log("Language: " + JSON.parse(body).Language + "\n");
                console.log("Plot: " + JSON.parse(body).Plot + "\n");
                console.log("Actors: " + JSON.parse(body).Actors + "\n");
            }
        });
    }
}

function getConcert(artist) {

    if (!artist) {
        artist = "rhyme asylum";
    
    console.log(artist);

    var query = "https://rest.bandsintown.com/artists/" + artist+ "/events?app_id=codingbootcamp";

    var request = require("request");

    request(query, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].venue.name + ", " + data[i].venue.city + ", " + moment(data[i].datetime).format("MM/DD/YYYY"));
            }
        }
    });
    } else if (artist) {
        console.log(artist);
        var query = "https://rest.bandsintown.com/artists/" + artist+ "/events?app_id=codingbootcamp";
        var request = require("request");
        request(query, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var data = JSON.parse(body);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].venue.name + ", " + data[i].venue.city + ", " + moment(data[i].datetime).format("MM/DD/YYYY"));
            }
        }
    });
    }
}
function getSong(songTitle) {
    if (!songTitle) {
        songTitle = "The Sign";
        spotify.search({
            type: 'track',
            query: songTitle
        }, 
        function (err, data) {
            if (err) {
                return console.log('woops! ' + err);
            }
            console.log("Artist(s): " + (data).tracks.items[0].album.artists[0].name);
            console.log("Song name: " + (data).tracks.items[0].name);
            console.log("Preview: " + (data).tracks.items[0].album.external_urls.spotify);
            console.log("Album: " + (data).tracks.items[0].album.name);
        });
    } else if (songTitle) {
        spotify.search({
            type: 'track',
            query: songTitle
        }, function (err, data) {
            if (err) {
                return console.log('woops! ' + err);
            }
            console.log("Artist(s): " + (data).tracks.items[0].album.artists[0].name);
            console.log("Song name: " + (data).tracks.items[0].name);
            console.log("Preview: " + (data).tracks.items[0].album.external_urls.spotify);
            console.log("Album: " + (data).tracks.items[0].album.name);
        });
    }
}
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error){
            return console.log(error);
        }
        var command = data.split(", ");
        console.log(command);
        getCommand(command[0], command[1]);
    });
}
function getCommand(one, two) {
    if (one === "movie-this") {
        getMovie(two);
    } else if (one === "concert-this") {
        getConcert(two);
    } else if (one === "spotify-this-song") {
        getSong(two);
    } else if (one === "do-what-it-says") {
        doWhatItSays();
    }
}
getCommand(process.argv[2], process.argv[3]);