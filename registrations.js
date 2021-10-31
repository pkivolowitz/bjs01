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

function RegisterKeyboardCallbacks() {
	scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				switch (kbInfo.event.key) {
					case ' ':
						console.log('fire');
						if (bricks.length > 0) {
							bricks.forEach(b => Zap(b));
						} else {
							console.log('bricks vector is empty');
						}

						break;
				}
				break;
		}
	});
}
