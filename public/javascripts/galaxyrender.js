//Set up Three.js
// New Three renderer
// var renderer = new THREE.WebGLRenderer();
// Create new Three scene
var scene = new THREE.Scene();
// scene.fog = new THREE.Fog( 0xeca1ff, .005, 1500 );
// Create new Three perspective camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 50000);
var cameraMode = 2;
var cameraSpeed = 400;
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

  this.testFunction = function(galaxy) {

    console.log('UPDATESSS');
    console.log(galaxy);
    cameraMode = galaxy.mode;
    cameraSpeed = galaxy.speed;
    renderer.setClearColor( galaxy.bgcolor, galaxy.bgtrans );
      if (galaxy) {
        removeSceneChildren();
        console.log(this);
        var newgalaxy = this.create(galaxy.radius, galaxy.height, galaxy.particles, colorConversion(galaxy.color), galaxy.size, galaxy.bgcolor, galaxy.bgtrans);
        var newgalaxy2 = this.create(galaxy.radius2, galaxy.height2, galaxy.particles2, colorConversion(galaxy.color2), galaxy.size2, galaxy.bgcolor, galaxy.bgtrans);
        var newgalaxy3 = this.create(galaxy.radius3, galaxy.height3, galaxy.particles3, colorConversion(galaxy.color3), galaxy.size3, galaxy.bgcolor, galaxy.bgtrans);
        scene.add(newgalaxy, newgalaxy2, newgalaxy3);
        canUpdate = false;
      };

    };

  this.create = function(radius, height, starCount, color, size, bgcolor, bgtrans) {
    // Creates new Three geometry
    console.log(color);
    var geometry = new THREE.Geometry();
    sprite = THREE.ImageUtils.loadTexture( "images/disc2.png" );

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

     if (count2 == 0) {
       coords.y -= 0;
     }
     if (count2 == 1) {
       coords.y -= 20;
     }
     if (count2 == 2) {
       coords.y += 20;
     }
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
var galaxy = newGalaxy.create(100, 4, 300000, 0xff7a00, .05, 0xffffff, 2);
var galaxy2 = newGalaxy.create(3, 10, 300000, 0x00ffc2, .05, 0xffffff, 2);
var galaxy3 = newGalaxy.create(400, 4, 300000, 0x00c4db, .05, 0xffffff, 2);


scene.add(galaxy, galaxy2, galaxy3);
// var newPlanet = new newPlanet();
// var planet = newPlanet.create(0,0,0,100, 0xffffff);


var removeSceneChildren = function() {
  for (var i = 0; i < scene.children.length; i++) {
    console.log(scene.children[i]);
    scene.remove(scene.children[i]);
  }
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

var example = example || {};

(function () {
    "use strict";

    var freqTransform = function (value) {
        return (value * 6000) + 60;
    };

    var identityTransform = function (value) {
        return value;
    };

    var carrierSpec = {
        freq: {
            inputPath: "carrier.freq.value",
            transform: freqTransform
        },
        mul: {
            inputPath: "carrier.mul",
            transform: identityTransform
        }
    };

    var modulatorSpec = {
        freq: {
            inputPath: "modulator.freq.value",
            transform: freqTransform
        },
        mul: {
            inputPath: "modulator.mul",
            transform: freqTransform
        }
    };

    example.SocketSynth = function () {
        this.oscPort = new osc.WebSocketPort({
            url: "ws://localhost:8081"
        });

        this.listen();
        this.oscPort.open();

        this.oscPort.socket.onmessage = function (e) {
            console.log("message", e);
        };

        this.valueMap = {
            "/knobs/0": carrierSpec.freq,
            "/fader1/out": carrierSpec.freq,

            "/knobs/1": carrierSpec.mul,
            "/fader2/out": carrierSpec.mul,

            "/knobs/2": modulatorSpec.freq,
            "/fader3/out": modulatorSpec.freq,

            "/knobs/3": modulatorSpec.mul,
            "/fader4/out": modulatorSpec.mul
        };





    };

    example.SocketSynth.prototype.listen = function () {
        this.oscPort.on("message", this.mapMessage.bind(this));
        this.oscPort.on("message", function (msg) {
            console.log("message", msg);
        });
        this.oscPort.on("close", this.pause.bind(this));
    };


    example.SocketSynth.prototype.pause = function () {

    };

    example.SocketSynth.prototype.mapMessage = function (oscMessage) {
        $("#message").text(fluid.prettyPrintJSON(oscMessage));

        var address = oscMessage.address;
        var value = oscMessage.args[0];
        var transformSpec = this.valueMap[address];

        if (transformSpec) {
            var transformed = transformSpec.transform(value);


        }
    };

}());


function colorConversion(hexColor) {
  if (typeof hexColor === 'string' || hexColor instanceof String) {
    console.log('COLOR CONVERTING');
    var intColor = parseInt(hexColor.replace('#', '0x'));
    return intColor;
  } else {
    return 0xffffff;
  }

};
