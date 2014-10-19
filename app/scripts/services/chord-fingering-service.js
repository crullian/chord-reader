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

function ChordFingeringService(dictionary) {
  this.dictionary = processDictionary(dictionary);
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

angular.module('chordReaderApp').service('chordFingeringService',
  ['dictionary', ChordFingeringService]);