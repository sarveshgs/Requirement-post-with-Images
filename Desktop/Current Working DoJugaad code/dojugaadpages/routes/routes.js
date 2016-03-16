module.exports = function(app, db) {
var imageObject = require('./../controllers/Image.controller.js');
var postObject = require('./../controllers/Post.controller.js');

        //Server Side post request function 	
        app.post('/problem', function(req, res) {
//Getting the values into Post variable from the client side controller
            postObject.addPost(req,res,db);
            
        });
        //Server Side post request function 	
        app.post('/upload', function(req, res) {
            var readfile;            
            try {
              imageObject.uploadImage(req,res);    
                //write content to file system
            } catch (ex) {
                console.log(ex);
            }


        });

        app.get('/image', function(req, res) {
            imageObject.downloadImage(req,res);
        });
    } //code ends here