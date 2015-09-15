var ang = angular.module('Galaxies', ['ngRoute']);

$('#create-form').hide();
$('.galaxy-list').hide();
$('#toggle-create').on('click', function() {
  $('#create-form').toggle(200);
});

$('#toggle-list').on('click', function() {
  $('.galaxy-list').toggle(200);
});

$('.tab-2').hide();
$('.tab-3').hide();
$('#tab-1').on('click', function() {
  $('.tab-1').show();
  $('.tab-2').hide();
  $('.tab-3').hide();
});
$('#tab-2').on('click', function() {
  $('.tab-1').hide();
  $('.tab-2').show();
  $('.tab-3').hide();
});
$('#tab-3').on('click', function() {
  $('.tab-1').hide();
  $('.tab-2').hide();
  $('.tab-3').show();
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
    radius2: 200,
    radius3: 100,
    particles: 80000,
    particles2: 80000,
    particles3: 80000,
    height: 50,
    height2: 50,
    height3: 50,
    color: 0xfa4252,
    color2: 0xd2a213,
    color3: 0x4ad65c,
    size: .05,
    size2: .05,
    size3: .05,
    likes: 0,
    mode: 3,
    speed: 400
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
