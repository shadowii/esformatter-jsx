//jshint node:true, eqnull:true
/*global describe, it, before*/
'use strict';
var fs = require( 'fs' );
var path = require( 'path' );
var esformatter = require( 'esformatter' );
var plugin = require( '../' );
var readJSON = require( 'read-json-sync' );

var readFile = function ( folder, name ) {
  var filePath = path.join( './specs', folder, name );
  return fs.readFileSync( filePath ).toString();
};

var readJSONSync = function ( folder, name ) {
  name = path.basename( name, '.js' );
  var filePath = path.join( './specs', folder, name + '.json' );
  var json = { };
  try {
    json = readJSON( filePath );
  } catch (ex) {
    //console.error('error reading file ', name, ex.message);
  }
  return json;
};

describe( 'esformatter-jsx', function () {
  before( function () {
    esformatter.register( plugin );
  } );

  describe( 'format jsx blocks', function () {
    var files = fs.readdirSync( './specs/fixtures/' );

    //    files = files.filter( function ( file ) {
    //      return file.match( /lot-of-text/ );
    //    } );

    files.forEach( function ( file ) {
      it( 'should transform fixture ' + file + ' and be equal expected file', function () {
        var input = readFile( 'fixtures', file );
        var opts = readJSONSync( 'options', file );

        var actual = esformatter.format( input, opts );
        var expected = readFile( 'expected', file );
        //console.log( '\n\n', actual, '\n\n' );
        //fs.writeFileSync('./specs/expected/' + path.basename(file), actual);

        expect( actual ).to.equal( expected, 'file comparison failed: ' + file );

      } );
    } );
  } );

} );
