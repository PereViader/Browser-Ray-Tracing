

class Transform {
	constructor(position,rotation) {
		//vector3
		this.position = position;
		
		//quaternion
		this.rotation = rotation;
		this.initializeVectors();
	}
	
	static create(position,rotationDegrees) {
		if ( typeof position == "undefined" )
			return new Transform(vec3.create(),quat.create());
		
		
		if ( typeof rotationDegrees == "undefined" )
			return new Transform(position,quat.create());
		
		var trsf = new Transform(position,quat.create());
		trsf.worldRotation(rotationDegrees);
		return trsf;
	}
	
	worldRotation(rotationDegrees) {
		var rotationRadiants = this.degreesToRad(rotationDegrees);
		var q = quat.fromEuler(rotationRadiants);
		this.rotation = quat.multiply([],q,this.rotation);
		this.calculateEverything();
	}
	
	degreesToRad(degrees) {
		return degrees.map(
			function degreesToRad(degrees) {
				return degrees * (Math.PI/180);
			});
	}
	
	localRotation(rotationDegrees) {
		var rotationRadiants = this.degreesToRad(rotationDegrees);
		
		var rotationX = quat.setAxisAngle([],this.right,rotationRadiants[0]);
		var rotationY = quat.setAxisAngle([],this.up,rotationRadiants[1]);
		var rotationZ = quat.setAxisAngle([],this.forward,rotationRadiants[2]);
		
		quat.multiply(this.rotation,rotationX,this.rotation);
		quat.multiply(this.rotation,rotationY,this.rotation);
		quat.multiply(this.rotation,rotationZ,this.rotation);
		this.calculateEverything();
	}
	
	move(movementDelta) {
		var vector = vec3.transformQuat([],movementDelta,this.rotation);
		vec3.add(this.position,this.position,vector);
		this.calculateEverything();
	}
	
	initializeVectors() {
		this.forward = [];
		this.backward = [];
		this.right = [];
		this.left = [];
		this.up = [];
		this.down = [];
		this.calculateEverything();
	}
	
	calculateEverything() {
		vec3.transformQuat(this.forward,vec3.forward,this.rotation);
		vec3.transformQuat(this.backward,vec3.backward,this.rotation);
		vec3.transformQuat(this.right,vec3.right,this.rotation);
		vec3.transformQuat(this.left,vec3.left,this.rotation);
		vec3.transformQuat(this.up,vec3.up,this.rotation);
		vec3.transformQuat(this.down,vec3.down,this.rotation);
	}
}