function init() {
  var stats = initStats();
  var renderer = initRenderer();
  var camera = initCamera();
  var scene = new THREE.Scene();
  var clock = new THREE.Clock();

  //Menambahkan Object untuk intersection
  const objects = [];

  //Add raycaster to for interactivity
  //Raycaster untuk object intersection
  raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, 0 ), 0, 0 );

  scene.background = new THREE.Color('lightblue');

  {
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0x000000;  // black
    const intensity = 0.8;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 20);
    scene.add(light);
    scene.add(light.target);
  }

  //First Person Locked, a better camera than just first person Controls
  let moveForward = false;
  let moveBackward = false;
  let moveLeft = false;
  let moveRight = false;
  let canJump = false;
  var fpControls_locked = new THREE.PointerLockControls(camera, renderer.domElement);
  const instructions = document.getElementById( 'webgl-output' );

  instructions.addEventListener( 'click', function () {
    fpControls_locked.lock();
  } );

  fpControls_locked.addEventListener( 'lock', function () {

  } );

  fpControls_locked.addEventListener( 'unlock', function () {

  } );

  const webs = ['https://en.wikipedia.org/wiki/Fox',
                'https://en.wikipedia.org/wiki/Hippopotamus',
                'https://en.wikipedia.org/wiki/Kangaroo',
                'https://en.wikipedia.org/wiki/Moose',
                'https://en.wikipedia.org/wiki/Skunk',
                'https://en.wikipedia.org/wiki/Pig',
                'https://en.wikipedia.org/wiki/Sheep',
                'https://en.wikipedia.org/wiki/Cattle',
                'https://en.wikipedia.org/wiki/Giraffe'];

  const onKeyDown = function ( event ) {

    switch ( event.code ) {

      case 'ArrowUp':
      case 'KeyW':
        moveForward = true;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        moveLeft = true;
        break;

      case 'ArrowDown':
      case 'KeyS':
        moveBackward = true;
        break;

      case 'ArrowRight':
      case 'KeyD':
        moveRight = true;
        break;

      case 'Space':
        if ( canJump === true ) velocity.y += 350;
        canJump = false;
        break;

      case 'Digit1':
        window.open(webs[0], '_blank');
        break;

      case 'Digit2':
        window.open(webs[1], '_blank');
        break;

      case 'Digit3':
        window.open(webs[2], '_blank');
        break;

      case 'Digit4':
        window.open(webs[3], '_blank');
        break;

      case 'Digit5':
        window.open(webs[4], '_blank');
        break;

      case 'Digit6':
        window.open(webs[5], '_blank');
        break;

      case 'Digit7':
        window.open(webs[6], '_blank');
        break;

      case 'Digit8':
        window.open(webs[7], '_blank');
        break;

      case 'Digit9':
        window.open(webs[8], '_blank');
        break;

    }

  };

  const onKeyUp = function ( event ) {

    switch ( event.code ) {

      case 'ArrowUp':
      case 'KeyW':
        moveForward = false;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        moveLeft = false;
        break;

      case 'ArrowDown':
      case 'KeyS':
        moveBackward = false;
        break;

      case 'ArrowRight':
      case 'KeyD':
        moveRight = false;
        break;

    }

  };
 
  instructions.addEventListener('keydown', onKeyDown);
  instructions.addEventListener('keyup', onKeyUp);
  document.addEventListener( 'keydown', onKeyDown );
  document.addEventListener( 'keyup', onKeyUp );

  scene.add( fpControls_locked.getObject() );

  const velocity = new THREE.Vector3();
	const direction = new THREE.Vector3();
	const vertex = new THREE.Vector3();
  let prevTime = performance.now();

  var fpControls_gamepad = new THREE.GamepadControls(camera);
  fpControls_gamepad.lookSpeed = 1.0;
  
  //Load Maps & Models  
  const gltfLoader_1 = new THREE.GLTFLoader();
  gltfLoader_1.load('resource/map/Zoo.gltf', (gltf) => {
    
    gltf.scene.scale.set(4, 3, 4); 
    const root = gltf.scene;
    root.position.set(0, 0, 0);
    scene.add(root);
    // objects.push(root);
  });

  // Animal Object
  // Cage1
  
  var cowmixer = new THREE.AnimationMixer();
  var cowclipAction
  var cowcontrols
  var cowmixerControls = {
    time: 0,
    timeScale: 1,
    stopAllAction: function() {cowmixer.stopAllAction()},
  }
  
  initDefaultLighting(scene);
  var cowloader = new THREE.GLTFLoader();
  cowloader.load('resource/additional/Animal/Cow.gltf', function (result) {
    // correctly position the scene
    result.scene.scale.set(1.5, 1.5, 1.5);
    result.scene.position.set(20.,3,30.);
    result.scene.translateY(-3);
    result.scene.rotateY(-0.3*Math.PI)
    scene.add(result.scene)

    // setup the mixer
    cowmixer = new THREE.AnimationMixer( result.scene );
    animationClip = result.animations[6];
    cowclipAction = cowmixer.clipAction( animationClip ).play();    
    animationClip = cowclipAction.getClip();

    cowmixer.addEventListener('finished',function(e){
      secondAction.play()
    });

    // add the animation controls
    var gui = new dat.GUI();
    dat.GUI.toggleHide();
    var mixerFolder = gui.addFolder("AnimationMixer")
    mixerFolder.add(cowmixerControls, "time").listen()
    mixerFolder.add(cowmixerControls, "timeScale", 0, 5).onChange(function (timeScale) {cowmixer.timeScale = timeScale});
    mixerFolder.add(cowmixerControls, "stopAllAction").listen()
    
    cowcontrols = addClipActionFolder("ClipAction 1", gui, cowclipAction, animationClip);
  });

  var Cow1mixer = new THREE.AnimationMixer();
  var Cow1clipAction
  // var animationClip
  // var mesh
  var Cow1controls
  var Cow1mixerControls = {
    time: 0,
    timeScale: 1,
    stopAllAction: function() {Cow1mixer.stopAllAction()},
  }

  initDefaultLighting(scene);
  var Cow1loader = new THREE.GLTFLoader();
  Cow1loader.load('resource/additional/Animal/Cow.gltf', Cow1);

  var Cow2mixer = new THREE.AnimationMixer();
  var Cow2clipAction
  // var animationClip
  // var mesh
  var Cow2controls
  var Cow2mixerControls = {
    time: 0,
    timeScale: 1,
    stopAllAction: function() {Cow2mixer.stopAllAction()},
  }
  
  initDefaultLighting(scene);
  var Cow2loader = new THREE.GLTFLoader();
  Cow2loader.load('resource/additional/Animal/Cow.gltf', Cow2);

  var Bullmixer = new THREE.AnimationMixer();
  var BullclipAction
  // var animationClip
  // var mesh
  var Bullcontrols
  var BullmixerControls = {
    time: 0,
    timeScale: 1,
    stopAllAction: function() {Bullmixer.stopAllAction()},
  }
  
  initDefaultLighting(scene);
  var Bullloader = new THREE.GLTFLoader();
  Bullloader.load('resource/additional/Animal/Bull.gltf', function (result) {
    // correctly position the scene
    result.scene.position.set(20.,4,15.);
    result.scene.scale.set(1.5, 1.5, 1.5);
    result.scene.translateY(-3);
    result.scene.rotateY(1.5*Math.PI)
    scene.add(result.scene)

    // setup the mixer
    Bullmixer = new THREE.AnimationMixer( result.scene );
    animationClip = result.animations[3];
    BullclipAction = Bullmixer.clipAction( animationClip ).play();    
    animationClip = BullclipAction.getClip();

    Bullmixer.addEventListener('finished',function(e){
      secondAction.play()
    });

    // add the animation controls
    var gui = new dat.GUI();
    dat.GUI.toggleHide();
    var mixerFolder = gui.addFolder("AnimationMixer")
    mixerFolder.add(BullmixerControls, "time").listen()
    mixerFolder.add(BullmixerControls, "timeScale", 0, 5).onChange(function (timeScale) {Bullmixer.timeScale = timeScale});
    mixerFolder.add(BullmixerControls, "stopAllAction").listen()
    
    Bullcontrols = addClipActionFolder("ClipAction 1", gui, BullclipAction, animationClip);
  });

  var Bull1mixer = new THREE.AnimationMixer();
  var Bull1clipAction
  // var animationClip
  // var mesh
  var Bull1controls
  var Bull1mixerControls = {
    time: 0,
    timeScale: 1,
    stopAllAction: function() {Bull1mixer.stopAllAction()},
  }
  
  initDefaultLighting(scene);
  var Bull1loader = new THREE.GLTFLoader();
  Bull1loader.load('resource/additional/Animal/Bull.gltf', Bull1);
  // Cage2

  var horsemixer = new THREE.AnimationMixer();
  var horseclipAction
  // var animationClip
  // var mesh
  var Horsecontrols
  var horsemixerControls = {
    time: 0,
    timeScale: 1,
    stopAllAction: function() {horsemixer.stopAllAction()},
  }
  
  initDefaultLighting(scene);
  var Horseloader = new THREE.GLTFLoader();
  Horseloader.load('resource/additional/Animal/Horse.gltf', function (result) {
    // correctly position the scene
    result.scene.scale.set(1.7, 1.7, 1.7);
    result.scene.position.set(-23.,3,30.);
    result.scene.translateY(-3);
    result.scene.rotateY(0.5*Math.PI)
    scene.add(result.scene)

    // setup the mixer
    horsemixer = new THREE.AnimationMixer( result.scene );
    animationClip = result.animations[6];
    horseclipAction = horsemixer.clipAction( animationClip ).play();    
    animationClip = horseclipAction.getClip();

    horsemixer.addEventListener('finished',function(e){
      secondAction.play()
    });

    // add the animation controls
    var gui = new dat.GUI();
    dat.GUI.toggleHide();
    var mixerFolder = gui.addFolder("AnimationMixer")
    mixerFolder.add(horsemixerControls, "time").listen()
    mixerFolder.add(horsemixerControls, "timeScale", 0, 5).onChange(function (timeScale) {horsemixer.timeScale = timeScale});
    mixerFolder.add(horsemixerControls, "stopAllAction").listen()
    
    Horsecontrols = addClipActionFolder("ClipAction 1", gui, horseclipAction, animationClip);
  });


  render();
  function render() {
  
    //requestAnimationFrame(render);

    stats.update();
    var delta = clock.getDelta();

    if (cowmixer && cowclipAction && cowcontrols) {
      cowmixer.update( delta );
      cowcontrols.time = cowmixer.time;
      cowcontrols.effectiveTimeScale = cowclipAction.getEffectiveTimeScale();
      cowcontrols.effectiveWeight = cowclipAction.getEffectiveWeight();
    }

    if (Cow2mixer && Cow2clipAction && Cow2controls) {
      Cow2mixer.update( delta );
      Cow2controls.time = Cow2mixer.time;
      Cow2controls.effectiveTimeScale = Cow2clipAction.getEffectiveTimeScale();
      Cow2controls.effectiveWeight = Cow2clipAction.getEffectiveWeight();
    }

    if (Cow1mixer && Cow1clipAction && Cow1controls) {
      Cow1mixer.update( delta );
      Cow1controls.time = Cow1mixer.time;
      Cow1controls.effectiveTimeScale = Cow1clipAction.getEffectiveTimeScale();
      Cow1controls.effectiveWeight = Cow1clipAction.getEffectiveWeight();
    }

    if (Bullmixer && BullclipAction && Bullcontrols) {
      Bullmixer.update( delta );
      Bullcontrols.time = Bullmixer.time;
      Bullcontrols.effectiveTimeScale = BullclipAction.getEffectiveTimeScale();
      Bullcontrols.effectiveWeight = BullclipAction.getEffectiveWeight();
    }

    if (Bull1mixer && Bull1clipAction && Bull1controls) {
      Bull1mixer.update( delta );
      Bull1controls.time = Bull1mixer.time;
      Bull1controls.effectiveTimeScale = Bull1clipAction.getEffectiveTimeScale();
      Bull1controls.effectiveWeight = Bull1clipAction.getEffectiveWeight();
    }

    if (horsemixer && horseclipAction && Horsecontrols) {
      horsemixer.update( delta );
      Horsecontrols.time = horsemixer.time;
      Horsecontrols.effectiveTimeScale = horseclipAction.getEffectiveTimeScale();
      Horsecontrols.effectiveWeight = horseclipAction.getEffectiveWeight();
    }



    //Render parameters for first person locked
    const time = performance.now();
    if ( fpControls_locked.isLocked === true ) {

      //prevTime = performance.now();
      raycaster.ray.origin.copy( fpControls_locked.getObject().position );
      raycaster.ray.origin.y -= 10;

      const intersections = raycaster.intersectObjects( objects , false );

      const onObject = intersections.length > 0;

      var delta = ( time - prevTime ) / 1000;
      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      velocity.y -= 15.8 * 100.0 * delta; // 100.0 = mass

      direction.z = Number( moveForward ) - Number( moveBackward );
      direction.x = Number( moveRight ) - Number( moveLeft );
      direction.normalize(); // this ensures consistent movements in all directions

      if ( moveForward || moveBackward ) {
        velocity.z -= direction.z * 4.0 * delta;
      }
      if ( moveLeft || moveRight ) {
        velocity.x -= direction.x * 4.0 * delta;
      }
      if ( onObject === true ) {
        console.log("Diatas");
        velocity.y = Math.max( 0, velocity.y );
        canJump = true;
      } 

     
      fpControls_locked.moveRight( - velocity.x * delta * 100 );
      fpControls_locked.moveForward( - velocity.z * delta  * 100);  

      fpControls_locked.getObject().position.y += ( velocity.y * delta * 1/2 ); // new behavior

      if ( fpControls_locked.getObject().position.y < 5 ) {
        velocity.y = 0;
        fpControls_locked.getObject().position.y = 5;
        canJump = true;
      }

    }

    prevTime = time;
    stats.update();
    fpControls_locked.load;
    requestAnimationFrame(render);
    renderer.render(scene, camera)
  }
  
  function Bull1 (result) {
    // correctly position the scene
    result.scene.scale.set(1.7, 1.7, 1.7);
    result.scene.position.set(50.,3.5,30.);
    result.scene.translateY(-3);
    result.scene.rotateY(-2*Math.PI)
    scene.add(result.scene)

    // setup the mixer
    Bull1mixer = new THREE.AnimationMixer( result.scene );
    animationClip = result.animations[6];
    Bull1clipAction = Bull1mixer.clipAction( animationClip ).play();    
    animationClip = Bull1clipAction.getClip();

    Bull1mixer.addEventListener('finished',function(e){
      secondAction.play()
    });

    // add the animation controls
    var gui = new dat.GUI();
    dat.GUI.toggleHide();
    var mixerFolder = gui.addFolder("AnimationMixer")
    mixerFolder.add(Bull1mixerControls, "time").listen()
    mixerFolder.add(Bull1mixerControls, "timeScale", 0, 5).onChange(function (timeScale) {Bull1mixer.timeScale = timeScale});
    mixerFolder.add(Bull1mixerControls, "stopAllAction").listen()
    
    Bull1controls = addClipActionFolder("ClipAction 1", gui, Bull1clipAction, animationClip);
  }

  function Cow1(result) {
    // correctly position the scene
    result.scene.scale.set(1.6, 1.6, 1.6);
    result.scene.position.set(75.,3.5,30.);
    result.scene.translateY(-3);
    result.scene.rotateY(1*Math.PI)
    scene.add(result.scene)

    // setup the mixer
    Cow1mixer = new THREE.AnimationMixer( result.scene );
    animationClip = result.animations[3];
    Cow1clipAction = Cow1mixer.clipAction( animationClip ).play();    
    animationClip = Cow1clipAction.getClip();

    Cow1mixer.addEventListener('finished',function(e){
      secondAction.play()
    });

    // add the animation controls
    var gui = new dat.GUI();
    dat.GUI.toggleHide();
    var mixerFolder = gui.addFolder("AnimationMixer")
    mixerFolder.add(Cow1mixerControls, "time").listen()
    mixerFolder.add(Cow1mixerControls, "timeScale", 0, 5).onChange(function (timeScale) {Cow1mixer.timeScale = timeScale});
    mixerFolder.add(Cow1mixerControls, "stopAllAction").listen()
    
    Cow1controls = addClipActionFolder("ClipAction 1", gui, Cow1clipAction, animationClip);
  }

  function Cow2(result) {
    // correctly position the scene
    result.scene.position.set(75.,3.5,5.);
    result.scene.scale.set(1.7, 1.7, 1.7);
    result.scene.translateY(-3);
    result.scene.rotateY(-2*Math.PI)
    scene.add(result.scene)

    // setup the mixer
    Cow2mixer = new THREE.AnimationMixer( result.scene );
    animationClip = result.animations[6];
    Cow2clipAction = Cow2mixer.clipAction( animationClip ).play();    
    animationClip = Cow2clipAction.getClip();

    Cow2mixer.addEventListener('finished',function(e){
      secondAction.play()
    });

    // add the animation controls
    var gui = new dat.GUI();
    dat.GUI.toggleHide();
    var mixerFolder = gui.addFolder("AnimationMixer")
    mixerFolder.add(Cow2mixerControls, "time").listen()
    mixerFolder.add(Cow2mixerControls, "timeScale", 0, 5).onChange(function (timeScale) {Cow2mixer.timeScale = timeScale});
    mixerFolder.add(Cow2mixerControls, "stopAllAction").listen()
    
    Cow2controls = addClipActionFolder("ClipAction 1", gui, Cow2clipAction, animationClip);
  }

}
