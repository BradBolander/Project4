//Set up Three.js
// New Three renderer
// var renderer = new THREE.WebGLRenderer();
// Create new Three scene
var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0x000000, 0.001 );
// Create new Three perspective camera
var camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 50000);
camera.position.x = -200;
camera.position.z = 0;
var mouseX = 0;
var mouseY = 0;
var mtx = 0;
var mty = 0;
container = document.getElementById( "galaxy" );
document.body.appendChild( container );
document.addEventListener( 'mousemove', onMouseMove, false );
document.addEventListener( "keydown", doKeyDown, true )
var renderer = new THREE.WebGLRenderer();
renderer.setSize( 500, 500 );
container.appendChild( renderer.domElement );
var text2 = document.createElement('div');
text2.style.position = 'absolute';
//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
text2.style.width = 100;
text2.style.height = 100;
text2.innerHTML = "hi there!";
text2.style.top = window.innerHeight/2;
text2.style.left = window.innerWidth/2;
document.body.appendChild(text2);
// The function that creates a new galaxy
function newGalaxy() {
  this.create = function(radius, height, starCount, color) {
    // Creates new Three geometry
    console.log(color);
    var geometry = new THREE.Geometry();
    sprite = THREE.ImageUtils.loadTexture( "images/disc.png" );

    // Creates new material AKA the squares/stars
    var material = new THREE.PointCloudMaterial({
      color: color,
      size: .2,
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
    }

    //Creates new star with given geometry and material
    var star = new THREE.PointCloud(geometry, material);
    return star;
  }
}

// Create new instance of newGalaxy
var newGalaxy = new newGalaxy();
var galaxy = newGalaxy.create(500, 25, 500000, 0xcc4a28);

// Add galaxy to scene
scene.add(galaxy);


$('#add-galaxy').click(function(){
  var color = 0x1aae48;
  // removeSceneChildren();
  var galaxy2 = newGalaxy.create(500, 30, 500000, color);
  var galaxy3 = newGalaxy.create(500, 35, 500000, 0xffffff);

  scene.add(galaxy2, galaxy3);

});

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


  //Set camera Y coordinate
  camera.position.y = 0;
  camera.rotation.y += 1;
  //For a camera that rotates in and out
  /*camera.position.x = Math.cos(tickNum / 500) * 500;*/
  // Moving camera position
  // camera.position.z +=20 / tickNum;
  // camera.position.x +=20 / tickNum;
  // console.log(mouseX);
  // console.log(mouseY);
  // console.log(mtx);
  // console.log(mty);
  if (mtx > -500) {
    if (mouseY < window.innerWidth/2) {
      // camera.position.x -= .1;
      mtx -= 1;
    }
  }
  if (mtx < 500) {
    if (mouseY > window.innerWidth/2) {
      // camera.position.x += .1;
      mtx += 1;
    }
  }

    if (mouseX < window.innerHeight/2) {
      camera.position.z -= .1;
      mty += 1;
    }


    if (mouseX > window.innerHeight/2) {
      camera.position.z += .1;
      mty -= 1;
    }

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

function doKeyDown(e) {

  // W
  if ( e.keyCode == 87 ) {
    camera.position.x -= 1;
    console.log(' W is working');
  }

  // S
  if ( e.keyCode == 83 ) {
    camera.position.x += 1;
    console.log(' S is working');
  }

  // A
  if ( e.keyCode == 65 ) {
    camera.position.z += 1;
    console.log(' A is working');
  }

  // D
  if ( e.keyCode == 68 ) {
    camera.position.z -= 1;
    console.log(' D is working');
  }

}
