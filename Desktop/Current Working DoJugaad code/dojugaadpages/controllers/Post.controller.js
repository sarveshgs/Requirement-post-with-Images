

exports.addPost = function(req,res,db){
    var result = {
                    Operation: "insert post",
                }
	var Post = {
                "title": req.body.title,
                "description": req.body.description,
                "quantity": req.body.quantity,
                "tags": req.body.tags,
                "email": req.body.email
            };
    
    //inserting the Post data in postData Collection    
            db.postData.insert(Post, function(err, doc) {                
                if (!err) {
                    result = {
                        isDMLSuccessful: true,
                        data: doc,
                        message: 'Post inserted successfully'
                    }
                } else {
                    result = {
                        isDMLSuccessful: false,
                        message: 'Unexpected Error'
                    }
                }
                res.send(result);
            });
}