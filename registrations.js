;
function RegisterWindowCallbacks() {
	window.addEventListener("resize", function () {
		engine.resize();
	});
}

function RegisterSceneCallbacks() {
	scene.actionManager = new BABYLON.ActionManager(scene);
	scene.registerAfterRender(animate);
}

var getGroundPosition = function () {
	var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh != ground;});
	if (pickinfo.hit) {
		return pickinfo.pickedPoint;
	}

	return null;
}

var pointerMove = function () {
	if (!startingPoint) {
		//console.log('null or undefined startingPoint');
		return;
	}
	var current = getGroundPosition();
	if (!current) {
		//console.log('null or undefined current');
		return;
	}

	if (currentMesh.id === 'skyBox') {
		//console.log('attempting to move', currentMesh.id);
		return;
	}

	//console.log('attempting to move', currentMesh);
	var diff = current.subtract(startingPoint);
	currentMesh.position.addInPlace(diff);

	startingPoint = current;

}

function RegisterKeyboardCallbacks() {
	scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				switch (kbInfo.event.key) {
					case ' ':
						console.log('fire');
						if (Tower.bricks.length > 0) {
							Tower.bricks.forEach(b => Zap(b));
						} else {
							console.log('bricks vector is empty');
						}

						break;
				}
				break;
		}
	});
}

var pointerDown = function (mesh) {
	//console.log(mesh.id);
	currentMesh = mesh;
	startingPoint = getGroundPosition();
	if (startingPoint) { // we need to disconnect camera from canvas
		setTimeout(function () {
			camera.detachControl(canvas);
		}, 0);
	}
}

var pointerUp = function () {
	if (startingPoint) {
		camera.attachControl(canvas, true);
		startingPoint = null;
		return;
	}
}

