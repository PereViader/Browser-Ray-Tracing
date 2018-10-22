// Objecte esféric definit per un punt i un radi
// Com tots els objectes te un color i coeficients difús, especular i de reflexió
class Sphere {
	constructor(radius,position,color,coefDiffuse, coefSpecular, coefReflect) {
		this.radius = radius;
		this.transform = new Transform(position,quat.create());
		this.color = color;
		this.coefDiffuse = coefDiffuse;
		this.coefSpecular = coefSpecular;
		this.coefReflect = coefReflect;
	}
	
	intersectaObjecte(ray) {
		var hit = null;
		
		var L = vec3.subtract([], ray.origin, this.transform.position);
		var a = 1;
		var b = 2*vec3.dot(ray.direction,L);
		var c = vec3.dot(L,L) - this.radius * this.radius;
		
		var res = this.solveQuadratic(a,b,c);
		var magn = null;
		if ( res != null)
			if ( res.length == 1 ) {
				if ( res[0] >= 0 )
					magn = res[0];
			} else {
				if ( res[0] >= 0 )
					magn = res[0];
				else if ( res[1] >= 0 )
					magn = res[1];
			}
	
		if ( magn != null ) {
			
			
			
			var position = vec3.scale(vec3.create(),ray.direction, magn);
			position = vec3.add(vec3.create(), position, ray.origin);
			
			var normal = vec3.subtract(vec3.create(), position, this.transform.position);
			normal = vec3.normalize(vec3.create(), normal);
			hit = new Hit(position,normal,this);
		}
		return hit;
	}	
	
	solveQuadratic(a,b,c) {
		var x0, x1;
		var discr = b*b-4*a*c;
		if (discr < 0 ) return null;
		else if ( discr == 0 ) return [ -b/2*a, 0 ];
		else {
			var x0 = (-b-Math.sqrt(discr))/2*a;
			var x1 = (-b+Math.sqrt(discr))/2*a;
		}
		if ( x0 > x1 ) [x0,x1] = [x1,x0];
		return [x0,x1];
	}
}
