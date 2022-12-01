function init() {
  var stats = initStats();
  var renderer = initRenderer();
  var camera = initCamera();
  var scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x333333));
  
  camera.position.set(0, 0, 20);

  var trackballControls = initTrackballControls(camera, renderer);
  var clock = new THREE.Clock();

  var mixer = new THREE.AnimationMixer();
  var clipAction
  var animationClip
  var mesh
  var controls
  var mixerControls = {
    time: 0,
    timeScale: 1,
    stopAllAction: function() {mixer.stopAllAction()},
  }
  
  initDefaultLighting(scene);
  var loader = new THREE.GLTFLoader();
  loader.load('resource/animals/cow/Cow.gltf', function (result) {
    // correctly position the scene
    result.scene.scale.set(0.8, 0.8, 0.8);
    result.scene.translateY(-3);
    result.scene.rotateY(-0.3*Math.PI)
    scene.add(result.scene)

    // setup the mixer
    mixer = new THREE.AnimationMixer( result.scene );
    animationClip = result.animations[6];
    clipAction = mixer.clipAction( animationClip ).play();    
    cowcontrol();
  });

  function cowcontrol() {
    var gui = new dat.GUI();
    var mixerFolder = gui.addFolder("testing")
    mixerFolder.add(mixerControls, "time").listen()
    mixerFolder.add(mixerControls, "timeScale", 0, 5).onChange(function (timeScale) {mixer.timeScale = timeScale});
    mixerFolder.add(mixerControls, "stopAllAction").listen()
    dat.GUI.toggleHide();
    controls = addClipActionFolder("ClipAction 1", gui, clipAction, animationClip);
  }

  render();
  function render() {
    stats.update();
    var delta = clock.getDelta();
    trackballControls.update(delta);
    requestAnimationFrame(render);
    renderer.render(scene, camera)
    
    //cow mixer
    if (mixer && clipAction && controls) {
      mixer.update( delta );
      controls.time = mixer.time;
      controls.effectiveTimeScale = clipAction.getEffectiveTimeScale();
      controls.effectiveWeight = clipAction.getEffectiveWeight();
    }
  }   
}