// Raig propi del ray tracing, amb un origen i una direcció
class Ray {
	constructor(origin, direction) {
		this.origin = origin;
		this.direction = vec3.normalize([],direction);
	}
}