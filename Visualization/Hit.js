// Objecte que conté informació del punt d'impacte d'un raig
// també conté informació de l'objecte impactat i de la normal en el punt d'impacte
class Hit {
	constructor(position,normal,object) {
		this.position = position;
		this.normal = vec3.normalize([],normal);;
		this.object = object;
	}
}