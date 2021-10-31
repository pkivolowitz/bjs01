;

class Brick {
	static brick_counter = 0;
	static wood = null;
	static height = 5;
	static wd = Brick.height / 3;

	constructor(scene) {
		let wd = Brick.wd;
		let h = Brick.height;
		let v = wd * wd * h;
		this.brick = BABYLON.MeshBuilder.CreateBox('brick' + Brick.brick_counter.toString(), { width: wd, depth: wd, height: h }, scene);
		if (Brick.wood == null) {
			Brick.wood = new BABYLON.StandardMaterial("wood0", scene);
			Brick.wood.diffuseTexture = new BABYLON.Texture("./textures/w.jpeg", scene);
			Brick.wood.specularColor = new BABYLON.Color3.Black;
		}
		this.brick.renderingGroupId = 1;
		this.brick.material = Brick.wood;
		this.brick.physicsImposter = new BABYLON.PhysicsImpostor(this.brick, BABYLON.PhysicsImpostor.BoxImpostor, 
			{ disableBidirectionalTransformation: false, mass: v, restitution: 0.0, friction: 3 }, scene);
		Brick.brick_counter += 1;
	}

	/*	An attempt to avoid a "bounce" on reload by setting the brick's initial mass to zero
		requires a method to set the brick's mass to what it ought to have been in the first
		place.
	*/
	SetMass(m) {
		this.brick.physicsImposter.setMass(m);
	}
	
	/*	
	*/
	SetPosition(p) {
		this.brick.position = p;
		this.brick.physicsImposter.forceUpdate()
		//this.brick.physicsImposter.setLinearVelocity(new BABYLON.Vector3(0, 0, 0));
		//this.brick.physicsImposter.setAngularVelocity(new BABYLON.Quaternion(0, 0, 0, 1));
	}

	Rotate(axis, angle) {
		this.brick.rotate(axis, angle);
		this.brick.physicsImposter.forceUpdate()
	}
}

class Tower {
	static bricks = [];
	static levels = 21;

	constructor(scene) {
		let delta = Brick.wd;
		let y = Brick.wd / 2;
		for (var l = 0; l < Tower.levels; l++) {
			let x = -delta;
			for (var i = 0; i < 3; i++) {
				let b = new Brick(scene);
				b.SetPosition(new BABYLON.Vector3((l % 2) ? x : 0, y, (l % 2) ? 0 : x))
				b.Rotate(BABYLON.Axis.Z, Math.PI / 2);
				if (l % 2)
					b.Rotate(BABYLON.Axis.X, Math.PI / 2);
				Tower.bricks.push(b);
				x += delta;
			}
			y += delta;
		}
	}
}