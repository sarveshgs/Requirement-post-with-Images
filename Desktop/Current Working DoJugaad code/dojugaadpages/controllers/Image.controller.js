

exports.uploadImage = function(req,res){
  var readfile;
  var multiparty = require('multiparty');
  var form = new multiparty.Form();
                   form.parse(req, function(err, fields, files) {
                    console.log('path' + files.file[0].path);
                    var file = files.file[0];
                    var path = file.path;
                    var mongo = require('mongodb');
                    var Grid = require('gridfs-stream');
                    var fs = require('fs');
                    var MongoClient = mongo.MongoClient,
                    		server = mongo.Server;
                    var mongoclient = new MongoClient(new server('localhost', 27017));
                    mongoclient.connect('mongodb://localhost:27017/dojugaad', function(err, db) {
                        console.log(file);
                        db.open(function(err) {
                            if (err) return handleError(err);
                            var gfs = Grid(db, mongo);
                            readfile = file.originalFilename;
                            // streaming to gridfs 
                            console.log(file.originalFilename);
                            var writestream = gfs.createWriteStream({
                                filename: file.originalFilename

                            });
                            fs.createReadStream(path).pipe(writestream);
                            result = {
                        		isDMLSuccessful: true,
                        		data: file.originalFilename,
                        		message: 'Image inserted successfully'
                    		}
                            res.send(result);
                        });
                    });
                });
			}

exports.downloadImage = function(req,res){
   
        var mongo = require('mongodb');
        var Grid = require('gridfs-stream');
        var fs = require('fs');
        var MongoClient = mongo.MongoClient,
        server = mongo.Server;
        var mongoclient = new MongoClient(new server('localhost', 27017));
        mongoclient.connect('mongodb://localhost:27017/mydb', function(err, db) {
            db.open(function(err) {
                if (err) return handleError(err);
                var gfs = Grid(db, mongo);
                  //read from mongodb
                var readstream = gfs.createReadStream({
                    filename: req.body.filename
                });
                readstream.pipe(res);
            });
        });
}