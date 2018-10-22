// Pla infinit, definit per un punt i una normal
// Com tots els objectes, te color i coeficients difus i especular
class Plane {
	
	constructor(transform,color,coefDiffuse,coefSpecular,coefReflect) {
		this.transform = transform;
		this.color = color;
		this.coefDiffuse = coefDiffuse;
		this.coefSpecular = coefSpecular;
		this.coefReflect = coefReflect;
	}
	
	// Retorna null si ray no impacta amb l'objecte
	// Retorna un objecte HIT amb la informació necessària altrament
	intersectaObjecte(ray) {
		var normal = this.transform.up;
		vec3.normalize(normal,normal);
		var point = this.transform.position;
		var D = -vec3.dot(normal,point);
		var t = (-D - vec3.dot(normal,ray.origin)) / (vec3.dot(normal,ray.direction));
		var hit = null;
		if ( t >= 0 ) {
			var position = vec3.scaleAndAdd([],ray.origin,ray.direction,t);
			hit = new Hit(position,normal,this);
		}
		return hit;
	}
	/*
	intersectaObjecte(ray) {
		var normal = this.transform.up();
		var point = this.transform.position;
		
		var hit= null;
		
		var denom = vec3.dot(normal,ray.direction);
		console.log("denom "+denom);
		if ( denom > 0.0000001 ) {
			var v = vec3.sub([], point, ray.origin);
			var t = vec3.dot(v,normal) / denom;
			console.log("t "+t);
			if (t >= 0){
				console.log("hit");
				var hitPosition = vec3.scaleAndAdd([],ray.origin,ray.direction,t);
				hit = new Hit(hitPosition,normal,this);
				console.log(hit);
			}
		}
		return hit;
	}*/
}