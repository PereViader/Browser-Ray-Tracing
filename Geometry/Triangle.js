
// Triangle definit per tres punts. Orientació definida per el sentit de rotació dels punts
class Triangle {
	constructor(vertexs,color,coefDiffuse,coefSpecular,coefReflect) {
		this.vertexs = vertexs;
		this.color = color;
		this.coefDiffuse = coefDiffuse;
		this.coefSpecular = coefSpecular;
		this.coefReflect = coefReflect;
	}
	
	// Càlcul de la normal el funció de l'ordre de rotació dels vertexs.
	// La normal es calcula com el producte vectorial de les arestes
	calculateNormal() {
		var vec1 = vec3.sub([],this.vertexs[1],this.vertexs[0]);
		var vec2 = vec3.sub([],this.vertexs[2],this.vertexs[0]);
		return vec3.normalize([],vec3.cross([],vec2,vec1));
	}
	
	// Funcions que retornen els vectors aresta entre els vertexs del triangle
	
	getEdge1() {
		return vec3.sub([],this.vertexs[1],this.vertexs[0]);
	}
	
	getEdge2() {
		return vec3.sub([],this.vertexs[2],this.vertexs[1]);
	}
	
	getEdge3() {
		return vec3.sub([],this.vertexs[0],this.vertexs[2]);
	}
	
	// Algorisme d'interecció de raig amb un triangle inspirat en:
	//https://en.wikipedia.org/wiki/M%C3%B6ller%E2%80%93Trumbore_intersection_algorithm
	intersectaObjecte(ray) {	
		var e1,e2;
		var P,Q,T;
		var det,inv_det,u,v;
		var t;
		
		//Find vectors for two edges sharing V1
		e1 = vec3.sub([],this.vertexs[1],this.vertexs[0]);
		e2 = vec3.sub([],this.vertexs[2],this.vertexs[0]);

		//Begin calculating determinant - also used to calculate u parameter
		P = vec3.cross([],ray.direction,e2);
		
		//if determinant is near zero, ray lies in plane of triangle or ray is parallel to plane of triangle
		det = vec3.dot(e1,P);
		//NOT CULLING
		if(det > -Number.EPSILON && det < Number.EPSILON) return null;
		inv_det = 1 / det;

		//calculate distance from V1 to ray origin
		T = vec3.sub([],ray.origin,this.vertexs[0]);

		//Calculate u parameter and test bound
		u = vec3.dot(T,P) * inv_det;
		
		//The intersection lies outside of the triangle
		if(u < 0 || u > 1) return null;

		//Prepare to test v parameter
		Q = vec3.cross([],T,e1);

		//Calculate V parameter and test bound
		v = vec3.dot(ray.direction,Q) * inv_det;
		
		//The intersection lies outside of the triangle
		if(v < 0 || u + v  > 1) return null;

		t = vec3.dot(e2,Q) * inv_det;
		if(t > Number.EPSILON) { //ray intersection
			var hitPosition = vec3.scaleAndAdd([],ray.origin,ray.direction,t);
			var hit = new Hit(hitPosition,this.calculateNormal(),this);
			//console.log(hit);
			return hit;
		}

		// No hit, no win
		return null;
		
	}
}