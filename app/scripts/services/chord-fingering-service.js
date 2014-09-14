'use strict';

function normalize(chordName) {
  var chord = chordMagic.parse(chordName);
  // if chord is undefined, we couldn't parse it
  return chord && chordMagic.prettyPrint(chord);
}

function processDictionary(dictionary) {
  // normalize the chord names, just in case they're different
  // from the normalized form that ChordMagic gives us
  var outputDict = {};
  Object.keys(dictionary).forEach(function (chordName) {
    var fingerings = dictionary[chordName];
    var normalizedName = normalize(chordName);
    outputDict[normalizedName] = fingerings;
  });
  return outputDict;
}

function ChordFingeringService($http) {
  var self = this;

  function done() {
    self.ready = true;
    if (self.onReady) {
      self.onReady();
    }
  }

  // fetch the fingering dictionary JSON when this service starts up
  $http({
    url: 'data/fingering-dictionary.json',
    dataType: 'json'
  }).success(function (response) {
    // TODO: save to local storage or something so this app can work offline
    self.dictionary = processDictionary(response);
    done();
  }).error(function (error) {
    console.log(error);
    self.dictionary = {};
    done();
  });
}

ChordFingeringService.prototype.getFingerings = function getFingerings(chordName) {
  var self = this;

  var normalizedName = normalize(chordName);
  if (!normalizedName) {
    // couldn't parse it, return empty list
    return [];
  }

  // give 'em an empty list if the chord is valid but
  // we don't know how to finger it
  return self.dictionary[normalizedName] || [];
};

ChordFingeringService.prototype.on = function on(event, callback) {
  var self = this;
  // dead simple faux EventEmitter because I wanted it and didn't
  // know the Angular convention for this kind of stuff
  // we assume the event is 'ready'
  self.onReady = callback;
  if (self.ready) {
    callback();
  }
};

angular.module('chordReaderApp').service('chordFingeringService', ['$http', ChordFingeringService]);