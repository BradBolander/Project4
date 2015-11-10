var ang = angular.module('Galaxies', ['ngRoute']);

$('#create-form').hide();
$('.galaxy-list').hide();
$('#toggle-create').on('click', function() {
  $('.galaxy-list').hide();
  $('#create-form').toggle(200);
});

$('#x').on('click', function() {
  $('header').toggle(200);
  $('#icons').toggle(200);
  $('.galaxy-list').hide();
  $('#create-form').hide();
});

$('#toggle-list').on('click', function() {
  $('#create-form').hide();
  $('.galaxy-list').show();
  $('.list-wrapper').show();

});


$('.tab-2').hide();
$('.tab-3').hide();
$('#tab-1').on('click', function() {
  $('.tab-0').fadeOut(600);
  $('#create-title').html("Cloud 1");
  $('.tab-1').fadeIn(600);
  $('.tab-2').fadeOut(600);
  $('.tab-3').fadeOut(600);
  $('.tab-0').fadeIn(600);
});
$('#tab-2').on('click', function() {
  $('.tab-0').fadeOut(600);
  $('#create-title').html("Cloud 2");
  $('.tab-1').fadeOut(600);
  $('.tab-2').fadeIn(600);
  $('.tab-3').fadeOut(600);
  $('.tab-0').fadeIn(600);
});
$('#tab-3').on('click', function() {
  $('.tab-0').fadeOut(600);
  $('#create-title').html("Cloud 3");
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
    $('.galaxy-list').hide();
    $('.galaxy-list').show();

  };
  $scope.render = function(index) {
    newGalaxy.testFunction($scope.galaxies[index]);

    $scope.newGalaxy = $scope.galaxies[index];
  };

  var model = {
    name: '',
    description: '',
    radius: 4,
    radius2: 4,
    radius3: 5,
    particles: 80000,
    particles2: 80000,
    particles3: 80000,
    height: 4,
    height2: 3,
    height3: 4,
    color: "#fa3ce2",
    color2: "#d2a213",
    color3: "#00c4db",
    size: 0.05,
    size2: 0.05,
    size3: 0.05,
    likes: 0,
    mode: 2,
    speed: 400,
    bgcolor: 0x000000,
    bgtrans: .8
  };

  $scope.newGalaxy = model;

  $scope.$watch("newGalaxy", function(data) {
    //console.log('working?', data);
    if (canUpdate == true || count == 0) {
      newGalaxy.testFunction(data);
    };
  }, true);

  $scope.create = function() {
    $scope.newGalaxy._id = null;
    console.log($scope.newGalaxy);

    $http.post('/api/galaxies/', $scope.newGalaxy).success(function(data) {
      console.log('succeeded');
      getGalaxies();
    }).error(function() {
      console.log('failed');
    });

  };

  function getGalaxies() {
    $http.get('/api/galaxies/').success(function(data) {
      $scope.galaxies = data;
    });
  };

  function init() {
    getGalaxies();
    console.log(newGalaxy);
  };

  init();
}]);
