var ang = angular.module('Galaxies', ['ngRoute']);

$('#create-form').hide();
$('.galaxy-list').hide();
$('#toggle-create').on('click', function() {
  $('.galaxy-list').hide();
  $('#create-form').toggle(200);
});

$('#toggle-list').on('click', function() {
  $('#create-form').hide();
  $('.galaxy-list').toggle(200);
});


$('.tab-2').hide();
$('.tab-3').hide();
$('#tab-1').on('click', function() {
  $('.tab-0').fadeOut(600);
  $('#create-title').html("Galaxy One");
  $('.tab-1').fadeIn(600);
  $('.tab-2').fadeOut(600);
  $('.tab-3').fadeOut(600);
  $('.tab-0').fadeIn(600);
});
$('#tab-2').on('click', function() {
  $('.tab-0').fadeOut(600);
  $('#create-title').html("Galaxy Two");
  $('.tab-1').fadeOut(600);
  $('.tab-2').fadeIn(600);
  $('.tab-3').fadeOut(600);
  $('.tab-0').fadeIn(600);
});
$('#tab-3').on('click', function() {
  $('.tab-0').fadeOut(600);
  $('#create-title').html("Galaxy Three");
  $('.tab-1').fadeOut(600);
  $('.tab-2').fadeOut(600);
  $('.tab-3').fadeIn(600);
  $('.tab-0').fadeIn(600);
});


ang.controller('MainController', ['$scope', '$http', function($scope, $http) {

  $scope.plusLike = function(index) {
    $scope.galaxies[index].likes += 1;
  };
  $scope.minusLike = function(index) {
    $scope.galaxies[index].likes -= 1;
  };
  $scope.delete = function(index) {
    $http.delete('/api/galaxies/' + $scope.galaxies[index]._id);
    getGalaxies();

  };
  $scope.render = function(index) {
    console.log($scope.newGalaxy);
    newGalaxy.testFunction($scope.galaxies[index]);
    $scope.newGalaxy = $scope.galaxies[index];
  };

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
    color: '#fa4252',
    color2: '#d2a213',
    color3: '#4ad65c',
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
    $http.post('/api/galaxies', $scope.newGalaxy).success(function(data) {
      console.log('succeeded');
      getGalaxies();
    }).error(function() {
      console.log('failed');
    });

  };

  function getGalaxies() {
    $http.get('/api/galaxies').success(function(data) {
      $scope.galaxies = data;
    });
  };

  function init() {
    getGalaxies();
    console.log(newGalaxy);
  };

  init();
}]);
