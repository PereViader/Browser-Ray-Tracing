//Llum puntual amb intensitat i color específiques
class PointLight {
	constructor(transform,intensity,color) {
		this.transform = transform;
		this.intensity = intensity;
		this.color = color;
	}
	// Retorna la intensitat aplicant la disminució en funció de la distància
	getIntensityAtPosition(position) {
		var vect = vec3.sub([],position,this.transform.position);
		return this.intensity/vec3.dot(vect,vect);
	}
}