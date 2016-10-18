/**
 * Created by Mikael Lindahl (s057wl) on 2016-10-06.
 */

'use strict';

const ActiveDirectory = require( 'activedirectory' );
const Promise = require( 'bluebird' );

let _config;


/**
 * User authentication
 *
 * - `user` sAMAcountName
 * - `password` passsword for account
 *
 * @param {user|string}
 * @param {user|string}
 * @api public
 */
function authenticate( user, password ) {

    return new Promise( ( resolve, reject )=> {

        let username=user + '@'+_config.domain;

        let config = {
            url: _config.url,
            baseDN: _config.baseDN,
            username: username, //sAMAccountName@domain
            password: password
        };

        let ad = new ActiveDirectory( config );

        ad.authenticate( username, password, function ( err, auth ) {
            if ( err ) {
                return reject( err );
            }

            resolve( auth )

        });
    } )
}

/**
 * Find user information
 *
 * - `user` sAMAcountName
 * - `password` passsword for account
 *
 * @param {user|string}
 * @param {user|string}
 * @api public
 */
function findUser( user, password ) {

    return new Promise( ( resolve, reject )=> {

        let username=user + '@'+_config.domain;

        let config = {
            url: _config.url,
            baseDN: _config.baseDN,
            username: username, //sAMAccountName@domain
            password: password
        };

        let ad = new ActiveDirectory( config );

        ad.findUser( username, function ( err, user ) {

            if ( err ) {
                return reject( err );
            }

            resolve( user )

        } );
    } )
}

exports.register = function ( server, options, next ) {

    _config=options;

    server.method( [
        {
            name: 'ad.authenticate',
            method: authenticate,
            options: {}
        },
        {
            name: 'ad.findUser',
            method: findUser,
            options: {}
        }] );

    next();
};

exports.register.attributes = {
    name: 'hapi_activedirectory',
    version: '0.0.1'
};


// var username = 'CN=Mikael Lindahl,OU=Produktion,OU=Users,OU=Green Cargo,DC=ad,DC=greencargo,DC=com';
// var username = 'CN=Mikael Lindahl,OU=Produktion,OU=Users,OU=Green Cargo,DC=ad,DC=greencargo,DC=com';
// var username = 's057wl@ad.greencargo.com';
// var username = 's059jb@ad.greencargo.com';
//     var password = 'JBlenoir05';
// var password = '';

// var config = { url:   'ldap://ad.greencargo.com:389',
//     baseDN: 'DC=ad,DC=greencargo,DC=com',
//     // username: 'CN=Mikael Lindahl,OU=Produktion,OU=Users,OU=Green Cargo,DC=ad,DC=greencargo,DC=com',
//     username: 's057wl@ad.greencargo.com',
//     // username: 's057wl@ad.greencargo.com',
//     // username: 'bajs',
//     password: 'JBlenoir05' }
// var ad = new ActiveDirectory(config);
//
//
// var username = 'CN=Mikael Lindahl,OU=Produktion,OU=Users,OU=Green Cargo,DC=ad,DC=greencargo,DC=com';
// var username = 'CN=Mikael Lindahl,OU=Produktion,OU=Users,OU=Green Cargo,DC=ad,DC=greencargo,DC=com';
// var username = 's057wl@ad.greencargo.com';
// // var username = 's059jb@ad.greencargo.com';
// var password = 'JBlenoir05';
// // var password = '';
//
// ad.authenticate(username, password, function(err, auth) {
//     if (err) {
//         console.log('ERROR: '+JSON.stringify(err));
//         return;
//     }
//
//     if (auth) {
//         console.log('Authenticated!');
//     }
//     else {
//         console.log('Authentication failed!');
//     }
// });
//
//
// // Any of the following username types can be searched on
// var sAMAccountName = 's057wl';
// // var sAMAccountName = 's019zr';  // missa
// // var sAMAccountName = 's053ya';
// // var sAMAccountName = 's059jb'; // missa
// // var sAMAccountName = 's103cz';
// // var userPrincipalName = 'username@domain.com';
// // var dn = 'CN=Smith\\, John,OU=Users,DC=domain,DC=com';
//
// // Find user by a sAMAccountName
// var ad = new ActiveDirectory(config);
// ad.findUser(sAMAccountName, function(err, user) {
//     if (err) {
//         console.log('ERROR: ' +JSON.stringify(err));
//         return;
//     }
//
//     if (! user) {
//         console.log('User: ' + sAMAccountName + ' not found.');
//     }
//     else console.log(JSON.stringify(user));
//
//
//
//
// });

// var ad = new ActiveDirectory(config);





