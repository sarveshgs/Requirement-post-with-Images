var app = angular.module('postApp',['ui.select2','ngFileUpload']);

app.controller('problemController', ['$scope',
function($scope){
   
    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['Technology', 'Music', 'Health', 'Laptop']  // Can be empty list.
    };
    $scope.savePost = function(){
    	console.log($scope.tags);
    }


 
}
]);
