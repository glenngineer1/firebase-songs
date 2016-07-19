"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./firebaseConfig");
    // fb = require("./fb-getter"),
    // fbData = fb();

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function getSongs() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "https://music-history-977ba.firebaseio.com/.json"
    }).done(function(songData) {
      resolve(songData);
    });
  });
}

function addSong(songFormObj) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "https://music-history-977ba.firebaseio.com/songs.json",
      method: "POST",
      data: JSON.stringify(songFormObj),
      dataType: "json"
    }).done(function(songId) {
      resolve(songId);
    });
  });
}

function deleteSong(songId) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `https://music-history-977ba.firebaseio.com/songs/${songId}.json`,
      method: "DELETE"
    }).done(function() {
      resolve();
    });
  });
}

function getSong(songId) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `https://music-history-977ba.firebaseio.com/songs/${songId}.json`
    }).done(function(songData) {
      resolve(songData);
    });
  });
}

function editSong(songFormObj, songId) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: `https://music-history-977ba.firebaseio.com/songs/${songId}.json`,
      method: "PUT",
      data: JSON.stringify(songFormObj),
    }).done(function(data) {
      resolve(data);
    });
  });
}

module.exports = {
  getSongs,
  addSong,
  getSong,
  deleteSong,
  editSong
};

// ****************************************
// DB interaction using Firebase SDK
// ****************************************

// function getSongs(callback, userId) {
//   console.log("userId", userId);
//   let songs = firebase.database().ref('songs');
//   songs.orderByChild("uid").equalTo(userId).on('value', function(songData) {
//     console.log("sumthin happened");
//     callback(songData.val());
//   });
// }

// function addSong(newSong) {
//   console.log("new song", newSong);
//   return firebase.database().ref('songs').push(newSong);
// }

// function deleteSong(songId) {
//   return firebase.database().ref(`songs/${songId}`).remove();
// }

// function getSong(songId) {
//   console.log("song id from DB interacation", songId);
//   let song = firebase.database().ref(`songs/${songId}`);
//   return song;
// }

// function editSong(songFormObj, songId) {
//   return firebase.database().ref(`songs/${songId}`).update(songFormObj);
// }

// module.exports = {
//   getSongs,
//   addSong,
//   getSong,
//   deleteSong,
//   editSong
// };
