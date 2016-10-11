/**
 * Created by Mikael Lindahl (s057wl) on 2016-10-06.
 */

'use strict';

const Util=require('util');
const ActiveDirectory =require('activedirectory');

let user='s057wl';
let pass='JBlenoir05';

if ( !module.parent ) {
    require( 'dotenv' ).load();
}

var config = { url:  process.env.USER,
    baseDN:  process.env.BASEDN,
    username: Util.format('%s@%s.com',user, domain),
    password: process.env.PASSWORD,
    logging:{
        name:'logger',
        level:'trace'
    }
};

console.log(config)

var ad = new ActiveDirectory(config);

// var username = 'john.smith@domain.com';
// var password = 'password';

ad.authenticate(user, pass, function(err, auth) {
    if (err) {
        console.error('ERROR: '+JSON.stringify(err));
        return;
    }

    if (auth) {
        console.log('Authenticated!');
    }
    else {
        console.log('Authentication failed!');
    }
});

// var LdapAuth = require('ldapauth-fork');
// var options = {
//     url: 'ldaps://ldap.greencargo.com:636',
//     // searchBase:'ad.greencargo.com'
//     searchBase: "DC=ad,DC=greencargo,DC=com",
//     searchFilter: Util.format("(sAMAccountName=%s)",user)
// };
// var auth = new LdapAuth(options);
//
// auth.authenticate(user, pass, function(err, user) {
//
//     if(err){
//         console.log('err', err)
//     }
//
//     console.log(user)
//
//     });
//
// auth.close(function(err) {
//     if (err) {
//         console.log('close',err)
//     }
// });

