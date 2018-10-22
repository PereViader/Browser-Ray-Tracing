var default_scene = {
	geometry: [
		new Sphere(2,[0,0,0],[0.3,0.5,0.6,1],1,0,1),
		new Plane(Transform.create([0,0,0]),[0.1,0.2,0.3,1],1,0,0),
	],
	
	lights : [
		new PointLight(Transform.create([0,5,0]),50,[1,1,1,1]),
	],
	
	ambientLight : [0.1, 0.1, 0.1, 1]
};
