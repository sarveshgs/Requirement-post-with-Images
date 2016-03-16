var app = angular.module('postApp',['ui.select2','ngFileUpload']);
//client side controller to handle user problem submission
app.controller('problemController' ,['$scope', 'Upload', '$timeout','$http','$window', function($scope, Upload, $timeout,$http,$window){
	
	console.log('Running');
    $scope.imagefileslist = [];
	 //code to handle tags
	 $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['Technology', 'Music', 'Health', 'Laptop']  // Can be empty list.
    };
     $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file]; 
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
       
        if (files && files.length) {
             $scope.imagefileslist = $scope.imagefileslist.concat(files);
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                    url: '/upload',
                    data: {
                      username: $scope.username,
                      file: file  
                    }
                }).then(function (resp) {
                    $timeout(function() {
                        $scope.log = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + $scope.log;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                            evt.loaded / evt.total);
                    
                     evt.config.data.file.progress = progressPercentage;
                    $scope.log = 'progress: ' + progressPercentage + 
                        '% ' + evt.config.data.file.name + '\n' + 
                      $scope.log;
                });
              }
            }
        }
    };

//function called when user clicks on submit 
   $scope.savePost = function() {
          
        
		//client side variable to collect the data from the view page
		var Data = {
            'title': $scope.post.title,
            'description': $scope.post.description,
			'quantity': $scope.post.quantity,
			'tags':  $scope.post.tags,
			'email':'abc@gmail.com'
		};
		var data2 = $scope.post;
		console.log(Data);

       //http method description
        $http({
            method: 'post',
            url: '/problem',
            data: Data,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(function (data) {
			console.log('success  '+angular.toJson(data));
			alert(data.message);
        });


    };
	
	
}]);//code ends here

/* .directive('ngUpdateHidden',function() {
    return function(scope, el, attr) {
        var model = attr['ngModel'];
        scope.$watch(model, function(nv) {
            el.val(nv);
        });

    };
}); */