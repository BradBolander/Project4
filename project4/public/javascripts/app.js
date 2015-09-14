var ang = angular.module('Galaxies', ['ngRoute']);

$('#create-form').hide();
$('.galaxy-list').hide();
$('#toggle-create').on('click', function() {
  $('#create-form').toggle(200);
});

$('#toggle-list').on('click', function() {
  $('.galaxy-list').toggle(200);
});

ang.controller('ListingController', ['$scope', '$http', function($scope, $http) {

  $scope.plusLike = function(index) {
    $scope.galaxies[index].likes += 1;

  };
  $scope.minusLike = function(index) {
    $scope.galaxies[index].likes -=1;
  };

  $scope.delete = function(index) {
    $http.delete('/api/galaxies/' + $scope.galaxies[index]._id);
  };

  function init() {
    $http.get('/api/galaxies').success(function(data){
    $scope.galaxies = data;
    console.log(newGalaxy);
    console.log(data);
  });
  }
  init();
}]);

ang.controller('CreateController', ['$scope', '$http', function($scope, $http) {


  var model = {
    name: '',
    description: '',
    radius: 500,
    particles: 800000,
    height: 50,
    color: 0xe8a930
  };
  $scope.newGalaxy = model;

  $scope.$watch("newGalaxy", function(data) {
    console.log('working?', data);
      if (canUpdate == true || count == 0) {
        newGalaxy.testFunction(data);
      };
    }, true);

  $scope.create = function() {

    console.log($scope.newGalaxy);
    $http.post('/api/galaxies', $scope.newGalaxy).success(function(data){
      console.log('succeeded');
    }).error(function() {
      console.log('failed');
    });
  };

  function init() {
    console.log(newGalaxy);

    console.log(data);
  init();
  };
}]);
