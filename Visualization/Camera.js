

class Camera {
	constructor(transform,screen,rati,angleObertura) {
		this.screen = screen;
		this.rati = rati;
		this.transform = transform;
		this.angleObertura = angleObertura;
		this.oberturaHoritzontal =  Math.tan((angleObertura * (Math.PI/180))/2)*2;
		this.oberturaVertical = this.oberturaHoritzontal * rati;
		// cada pixel pot tenir mides diferents
		this.Ax = this.oberturaHoritzontal / screen.width;
		this.Ay = this.oberturaHoritzontal*this.rati / screen.height;
	}
	
	calculatePixelOrigin() {
		// si la camera és un rectangle, calculem la posicio superior central de la camera
		var cameraCenter = vec3.add([],this.transform.position, this.transform.forward);
		var cameraCenterTop = vec3.scaleAndAdd([], cameraCenter, this.transform.up, this.oberturaHoritzontal/2 * this.rati );
		
		// calculem la posició de més a la esquerra possible del rectangle de la camera ( cameraTopLeft )
		return vec3.scaleAndAdd([], cameraCenterTop, this.transform.left,this.oberturaHoritzontal/2);
	}
	
	computeRay(x,y) {
			// a partir de la posicio inicial ens movem en l'eix de les x
			var screenPosition = vec3.scaleAndAdd([], this.calculatePixelOrigin(), this.transform.right, this.Ax/2 + x * this.Ax);
			// ens movem en l'eix de les y
			vec3.scaleAndAdd(screenPosition, screenPosition, this.transform.down, this.Ay/2 + y * this.Ay);
			// calculem la direcció del raig entre el punt de la pantalla i el centre de la camera
			var direction = vec3.sub([], screenPosition, this.transform.position);
			return new Ray(screenPosition, direction);
	}
}