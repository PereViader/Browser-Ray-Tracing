
// Funcions principals de la pràctica

// Funció que fa el cast de cada raig per a cada píxel de la pantalla
function RayCasting(screen, camera){
	for(var x = 0; x < screen.width; x++){
		for (y = 0; y < screen.height; y++){ 
			var ray = camera.computeRay(x,y);
			var color = RayTrace(Scene,ray,5);
			plot(x,y,color);
		}
	}
}

// Ray tracing recursiu en depth nivells
function RayTrace(scene, ray, depth){
	var color = [0,0,0,1.0];
	if(depth>0){
		var hit = primeraInterseccio(scene,ray);
		if ( hit != null ) {
			var contribution = addAmbientContribution(scene,hit);
			// Es calcula la contribució especular i difusa de cada llum
			for ( var i = 0; i < scene.lights.length; i ++) {
				var light = scene.lights[i];
				
				if ( isLightVisible(light,hit,scene)) {
					var lightDirection = vec3.sub([], light.transform.position,hit.position);
					var difuseCosene = (vec3.dot(hit.normal,lightDirection)/Math.abs(vec3.module(hit.normal)*vec3.module(lightDirection)));
					// La potencia del cosinus es directament proporcional al coeficient
					// especular, fent el reflex de la llum més gran a mida que el 
					// coeficient baixa, amb l'objecte iluminat al 100% per a 0 (cas difus)
					var specularCosene = Math.pow(difuseCosene,100*hit.object.coefSpecular);
					
					contribution = addDiffuseContribution(contribution,light,hit, difuseCosene);
					contribution = addSpecularContribution(contribution,light,hit, specularCosene);
				}
			}
			// Es calcula la contribució de la reflexió 
			// (independent de les llums, podem reflexar punts iluminats des de zones fosques)
			contribution = addReflectionContribution(scene,contribution,depth,ray,hit);
			
			color = contribution;
		}
	}	
	return color;
}


// Adds the reflection contribution.
// If the Reflection coefficient is >0, it will cast a new ray to search for the reflected color
function addReflectionContribution(scene,contribution,depth,currentRay, currentHit) {
	var newContribution = vec4.copy([],contribution);
	if(currentHit.object.coefReflect>0){
		var d1 = computeReflectionDirection(currentRay,currentHit);
		// A little offset is given to the origin position, to ensure the next ray doesn't
		// collide with the object it bounces off
		var origin = vec3.scaleAndAdd([],currentHit.position,currentHit.normal,0.001)
		// A new ray is traced to the next position visible on the reflective surface
		var r1 = new Ray(origin,d1);
		var color = RayTrace(scene,r1,depth-1);
		newContribution[0] += currentHit.object.coefReflect*color[0];
		newContribution[1] += currentHit.object.coefReflect*color[1];
		newContribution[2] += currentHit.object.coefReflect*color[2];
	}
	return newContribution;
}

// Returns the reflected ray direction from the hit normal and the impacted ray
function computeReflectionDirection(ray, hit) {
	return vec3.sub(
		[],
		ray.direction,
		vec3.scale(
			[],
			hit.normal,
			2*vec3.dot(
				ray.direction,
				hit.normal
			)
		)
	);
}

// Returns if the hit position is visible from the given light (shadow casting)
function isLightVisible(light,hit,scene) {
	var position = hit.position;
	var visibilityRay = new Ray(light.transform.position,vec3.sub([],position,light.transform.position));
	var hit2 = primeraInterseccio(scene,visibilityRay);
	return hit2==null || hit2.object == hit.object
}

// Returns the difuse contribution of a given light upon the hit position
function addDiffuseContribution(contribution,light,hit, factor) {
	var intensity = light.getIntensityAtPosition(hit.position);
	var newContribution = vec4.copy([],contribution);
	newContribution[0] += hit.object.coefDiffuse*intensity*factor*(light.color[0]*hit.object.color[0]);
	newContribution[1] += hit.object.coefDiffuse*intensity*factor*(light.color[1]*hit.object.color[1]);
	newContribution[2] += hit.object.coefDiffuse*intensity*factor*(light.color[2]*hit.object.color[2]);
	return newContribution;
}
// Returns de ambient light contribution, showing the color of the object in function of the scene's ambient light
function addAmbientContribution(scene,hit) {
	var newContribution = vec4.copy([],scene.ambientLight);
	newContribution[0] *= hit.object.color[0];
	newContribution[1] *= hit.object.color[1];
	newContribution[2] *= hit.object.color[2];
	return newContribution;
}

// Returns the specular contribution of a given light upon the hit position
function addSpecularContribution(contribution,light,hit, factor) {
	var intensity = light.getIntensityAtPosition(hit.position);
	var newContribution = vec4.copy([],contribution);
	newContribution[0] += hit.object.coefSpecular*intensity*factor*(light.color[0]*hit.object.color[0]);
	newContribution[1] += hit.object.coefSpecular*intensity*factor*(light.color[1]*hit.object.color[1]);
	newContribution[2] += hit.object.coefSpecular*intensity*factor*(light.color[2]*hit.object.color[2]);
	return newContribution;
}

// Returns the first object from the scene the ray intersects with
function primeraInterseccio(scene, ray) {
	var intersectants = new Array();
	
	for ( i = 0 ; i < scene.geometry.length ; i++ ) {
		var currentHit = scene.geometry[i].intersectaObjecte(ray);
		if ( currentHit != null ) {
			intersectants.push(currentHit);
		}
	}
	return closestHit(intersectants,ray.origin);
}

// From a list of hits, returns the one closest to origin
function closestHit(hits, origin) {	
	var closestHit = null;
	if ( hits.length > 0 ) {
		// Map all the hits to (hit,distance) pairs
		[closestHit,] = hits.map(
					function(obj){ 
						return [obj, vec3.distance(origin, obj.position) ];
					}
				// Get only the smalles distance pair
				).reduceRight(
					function(previousValue, currentValue, index, array) {
						[obj1,dist1] = previousValue;
						[obj2,dist2] = currentValue;
						if ( dist1 < dist2 ) {
							return previousValue;
						} else {
							return currentValue;
						}
					}
				);
	}
	return closestHit;
}