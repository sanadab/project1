'use strict';

var EventEmitter = require( 'events' ).EventEmitter;

module.exports = function property( value )
{
	var emitter = new EventEmitter( );

	var prop = function( )
	{
		if ( arguments.length )
		{
			value = arguments[ 0 ];
			prop.notify( );
		}
		return value;
	};

	prop.toJSON = function( )
	{
		return value;
	};

	prop.notify = function( )
	{
		emitter.emit( 'data', value );
	};

	prop.valueOf = function( )
	{
		return ( 'object' === typeof value ) ? value.valueOf( ) : value;
	};

	prop.toString = function( )
	{
		return ( 'object' === typeof value ) ? value.toString( ) : "" + value;
	};

	prop.emitter = emitter;

	return prop;
};
