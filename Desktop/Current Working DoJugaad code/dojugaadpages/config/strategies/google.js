/**
 * Created by aashish on 18/8/15.
 */
var passport = require('passport'),
    config = require('../config'),
    GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

var mongo = require('../mongo');
var db = mongo();

module.exports = function() {


    passport.use('google',new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL,
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, done) {

            var email=null;
            var avatar = null;

            if(profile.emails[0].value!=undefined||profile.emails[0].value!=null){
                email = profile.emails[0].value;
            }

            var photourl = profile.photos[0].value;

            //If photourl is not defined
            if(photourl != null){
                avatar = photourl;
            }
            else{

             if(profile.gender=='male'){
                   avatar = 'images/avatars/male/m1.png';
                 }
               else if(profile.gender =='female') {
                   avatar = 'images/avatars/female/f3.png';
                }
                else{
                  avatar = 'images/avatars/default/default.png';
                }
            }

            db.userData.findOne({emailid:email},function (err, user) {

                if(err)
                    return done(err);

                if (!user) {
                    var User = {
                        "profileid" : profile.id,
                        "name": profile.name.givenName,
                        "fullname":profile.name.givenName+' '+profile.name.familyName,
                        "emailid" : email,
                        "password": '',
                        "gender":profile.gender,
                        "facebookConected" : false,
                        "googleConnected" : true,
                        "avatar":avatar,
                        "timestamp": ''+  new Date(new Date().getTime()).toDateString() 
                    };

                    db.userData.insert(User,function(err, value){
                        if(err){
                            console.log("Some error occured while insertion\n");
                        }
                    });
                    return done(null,User);
                }
                else{
                   return done(null,user);
                }
           });
        }));
};


