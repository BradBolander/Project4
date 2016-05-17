//Set up Three.js
// New Three renderer
// var renderer = new THREE.WebGLRenderer();
// Create new Three scene
$('#colorChange').on('click', function() {
  changeColor();
});

$('#positionChange').on('click', function() {
  changePosition();
});
var scene = new THREE.Scene();
// scene.fog = new THREE.Fog( 0xeca1ff, .005, 1500 );
// Create new Three perspective camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 50000);
var cameraMode = 2;
var cameraSpeed = 200;
var mouseX = 0;
var mouseY = 0;
var mtx = 0;
var mty = 0;
container = document.getElementById( "galaxy" );
document.body.appendChild( container );
document.addEventListener( 'mousemove', onMouseMove, false );

var renderer = new THREE.WebGLRenderer( { alpha: true });
renderer.setSize( 500, 500 );
container.appendChild( renderer.domElement );
renderer.setClearColor( 0x000000, .8 );

// var text2 = document.createElement('div');
// text2.style.position = 'absolute';
// //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
// text2.style.width = 100;
// text2.style.height = 100;
// text2.innerHTML = "hi there!";
// text2.style.top = window.innerHeight/2;
// text2.style.left = window.innerWidth/2;
// document.body.appendChild(text2);
// The function that creates a new galaxy
var canUpdate = false;
var count = 0;
var count2 = 0;
function newGalaxy() {

  // this.testFunction = function(galaxy) {
  //
  //   console.log('UPDATESSS');
  //   console.log(galaxy);
  //   cameraMode = galaxy.mode;
  //   cameraSpeed = galaxy.speed;
  //   renderer.setClearColor( galaxy.bgcolor, galaxy.bgtrans );
  //     if (galaxy) {
  //       removeSceneChildren();
  //       console.log(this);
  //       var newgalaxy = this.create(galaxy.radius, galaxy.height, galaxy.particles, colorConversion(galaxy.color), galaxy.size, galaxy.bgcolor, galaxy.bgtrans);
  //       var newgalaxy2 = this.create(galaxy.radius2, galaxy.height2, galaxy.particles2, colorConversion(galaxy.color2), galaxy.size2, galaxy.bgcolor, galaxy.bgtrans);
  //       var newgalaxy3 = this.create(galaxy.radius3, galaxy.height3, galaxy.particles3, colorConversion(galaxy.color3), galaxy.size3, galaxy.bgcolor, galaxy.bgtrans);
  //       scene.add(newgalaxy, newgalaxy2, newgalaxy3);
  //       canUpdate = false;
  //     };
  //
  //   };

  this.create = function(radius, height, starCount, color, size, bgcolor, bgtrans) {
    // Creates new Three geometry
    console.log(color);
    var geometry = new THREE.Geometry();
    sprite = THREE.ImageUtils.loadTexture( "images/disc.png" );

    // Creates new material AKA the squares/stars
    var material = new THREE.PointCloudMaterial({
      color: color,
      size: size,
      map: sprite,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: true
    });

     var max = 500;
     var min = -500;
    //Loop that creates stars and detemines their positions
    for (var i = 0; i < starCount; i++) {
      var x = Math.random() * Math.PI * 2;
      var y = -Math.PI / 2 + Math.random() * Math.PI;

      var randRadius = Math.random() * radius;

      var coords = new THREE.Vector3();
      // coords.x = Math.random() * Math.cos(Math.PI) * -500;
      // coords.y = Math.random() * Math.cos(Math.PI) * -500;
      // coords.z = Math.random() * Math.cos(Math.PI) * -500;
      coords.x = Math.cos(x) * Math.cos(y) * randRadius;
     coords.y = Math.sin(y) * Math.random() * height;
     coords.z = Math.sin(x) * Math.cos(y) * randRadius;





      //Assign coordinates to geometry
      geometry.vertices.push(coords);
      count2++;
      if (count2 > 2) {
        count2 = 0;
      }
    }

    //Creates new star with given geometry and material
    var star = new THREE.PointCloud(geometry, material);
    return star;
  }
};

function newPlanet(x,y,z,radius, color) {

  var geometry = new THREE.SphereGeometry(radius, 32, 32);
  var material = new THREE.MeshLambertMaterial( {

    color: color,

    });
    for (var i = 0; i < 10; i++) {
      var randRadius = Math.random() * 50;

      var coords = new THREE.Vector3();
      coords.x = x;
      coords.y = y;
      coords.z = z;

      //Assign coordinates to geometry
      geometry.vertices.push(coords);
    }
    var sphere = new THREE.Mesh( geometry, material );
    return sphere;

}

// Create new instance of newGalaxy
var newGalaxy = new newGalaxy();

//scene.add(galaxy,galaxy2,galaxy3,galaxy4,galaxy5,galaxy6,galaxy7,galaxy8,galaxy9,galaxy10,galaxy11,galaxy12,galaxy13,galaxy14,galaxy15,galaxy16,galaxy17,galaxy18,galaxy19,galaxy20,galaxy21,galaxy22,galaxy23,galaxy24,galaxy25,galaxy26,galaxy27,galaxy28,galaxy29,galaxy30,galaxy31,galaxy32);
// var newPlanet = new newPlanet();
// var planet = newPlanet.create(0,0,0,100, 0xffffff);
addGalaxies();
function addGalaxies()
{
  for (var i = 1; i < 33; i++){
    var galxy = newGalaxy.create(i , 3, 4000, 0x00c4db, .1, 0xffffff, 1);
    scene.add(galxy);
  }
}

var removeSceneChildren = function() {
  for (var i = 0; i < scene.children.length; i++) {
    console.log(scene.children[i]);
    scene.remove(scene.children[i]);
  }
}

function changeColor(data, index) {

  //for (var i = 0; i < scene.children.length; i++) {
    // console.log(scene.children[i]);

    scene.children[index].material.color.r = normalize(0,1,0,250, data);
    // scene.children[index].material.color.g = normalize(0,1,0,250, data);
    scene.children[index].material.color.g = normalize(0,1,0,250, data);
    scene.children[index].material.color.b = normalize(0,1,0,250, data);
    // console.log(scene.children[i])
  //}
}

function changePosition() {

    for (var i = 0; i < scene.children.length; i++) {
      for (var x = 0; x < scene.children[i].geometry.vertices.length; x++) {
        scene.children[i].geometry.vertices[x].x = randomPosition();
        scene.children[i].geometry.vertices[x].y = randomPosition();
        scene.children[i].geometry.vertices[x].z = randomPosition();
        console.log(scene.children[i].geometry.vertices[x].x);
        console.log('test');

      }
      console.log(scene.children[i]);
      scene.children[i].geometry.verticesNeedUpdate = true;
    }
}

function audioPosition(data) {
  for (var i = 0; i < scene.children.length; i++) {
    for (var x = 0; x < scene.children[i].geometry.vertices.length; x++) {
      console.log(scene.children[i].geometry.vertices[x].x = data *.05) ;
      // scene.children[i].geometry.vertices[x].y = data * .01;
      // scene.children[i].geometry.vertices[x].z = data * .01;

    }

    scene.children[i].geometry.verticesNeedUpdate = true;
  }
}

function normalize(froms, to, min, max, toNormalize){
  var value = (toNormalize - min) * (to - froms) / (max - min);
  return value;
}

// This loop updates as soon as a tick occurs
var tickNum = 0;

function update() {
  tickNum++;

  timer();
  //Set camera Y coordinate
  camera.position.y = 2;
  //For a camera that rotates in and out
  // camera.position.x = Math.cos(tickNum / 500) * 50;
  // camera.rotation.x = 90 * Math.PI / 180




  //Camera Mode 1
  if (cameraMode == 1){
  camera.position.y = Math.cos( tickNum / cameraSpeed ) * 10;
  };

  //Camera Mode 2
  if (cameraMode == 2){
  camera.position.x = Math.cos( tickNum / cameraSpeed ) * 10;
  camera.position.z = Math.sin( tickNum / cameraSpeed ) * 10;
  };

  //Camera Mode 3
  if (cameraMode == 3){
  camera.position.x = Math.cos( tickNum / cameraSpeed ) * 10;
  camera.position.z = Math.sin( tickNum / cameraSpeed ) * 10;
  camera.position.y = Math.tan( tickNum / cameraSpeed ) * 10;
  };


  // Logic for defining where the camera points
  // sin and cos functions allow camera to oscillate back and forth
  // camera.lookAt({x:Math.sin(tickNum / 500) * 500, y: 10, z: Math.cos(tickNum / 500) * 500});
  // camera.lookAt({x: (-mouseX - camera.position.x), y: (-mouseY - camera.position.y), z: scene.position.z});
  camera.lookAt(scene.position);
  //Constant rendering of the scene
  renderer.render(scene, camera);
  requestAnimationFrame(update);

  onResize();
}
update();

//Logic for resizing window
// Also seems to add a lot of clarity to the image
function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function timer() {
  count++;

  if (count == 15) {
    canUpdate = true;
    count = 1;
  };
};


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '0x';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function onMouseMove(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
}

// function doKeyDown(e) {
//
//   // W
//   if ( e.keyCode == 87 ) {
//     camera.position.x -= 1;
//     console.log(' W is working');
//   }
//
//   // S
//   if ( e.keyCode == 83 ) {
//     camera.position.x += 1;
//     console.log(' S is working');
//   }
//
//   // A
//   if ( e.keyCode == 65 ) {
//     camera.position.z += 1;
//     console.log(' A is working');
//   }
//
//   // D
//   if ( e.keyCode == 68 ) {
//     camera.position.z -= 1;
//     console.log(' D is working');
//   }
//
// }

function colorConversion(hexColor) {
  if (typeof hexColor === 'string' || hexColor instanceof String) {
    console.log('COLOR CONVERTING');
    var intColor = parseInt(hexColor.replace('#', '0x'));
    return intColor;
  } else {
    return 0xffffff;
  }

};

function randomRGBComponent() {
	return Math.round(Math.random() * 1);
}

function randomPosition() {
  return Math.floor(Math.random() * 25) - 10;
}

var actx = new (window.AudioContext || window.webkitAudioContext)();
  var source = actx.createBufferSource();
  var analyser = actx.createAnalyser();
  var playing = false;
  audio();
  function audio() {

  analyser.fftSize = 32;
  actx.smoothingConstant = 1;
  source.connect(analyser);
  analyser.connect(actx.destination);
  var req = new XMLHttpRequest();
 req.open('GET', 'https://dl.dropboxusercontent.com/u/87705298/Skull%20Fire.mp3', true);
 req.responseType = 'arraybuffer';

 req.onload = function() {
   actx.decodeAudioData(req.response, function(buffer) {
     source.buffer = buffer;
      source.start(0);
      playing = true;
    });
  };
   req.send();

   function update() {
    if (playing) {
      var aData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(aData);
      for(var i = 0; i < analyser.fftSize; i++) {

          changeColor(aData[i],i);

        }
      }
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
