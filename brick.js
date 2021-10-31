;

class Brick {
	static brick_counter = 0;
	static wood = null;
	static height = 4;

	constructor(scene) {
		this.brick = BABYLON.MeshBuilder.CreateBox('brick' + Brick.brick_counter.toString(), { width: 1, depth: 1, height: Brick.height }, scene);
		if (Brick.wood == null) {
			Brick.wood = new BABYLON.StandardMaterial("wood0", scene);
			Brick.wood.diffuseTexture = new BABYLON.Texture("./textures/w.jpeg", scene);
			Brick.wood.specularColor = new BABYLON.Color3.Black;
		}
		this.brick.renderingGroupId = 1;
		this.brick.material = Brick.wood;
		this.brick.physicsImposter = new BABYLON.PhysicsImpostor(this.brick, BABYLON.PhysicsImpostor.BoxImpostor, 
			{ disableBidirectionalTransformation: false, mass: 4, restitution: 0.0, friction: 0.9 }, scene);
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
}