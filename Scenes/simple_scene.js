var simple_scene = {
	geometry: [
		// back wall
		new Triangle([[-5,0,0],[5,0,0], [5,10,0]], [1,1,1,1],0,1,1),
		new Triangle([[-5,0,0],[5,10,0],[-5,10,0]], [1,1,1,1],0,1,1),
		
		//left wall
		new Triangle([[-5,0,-25],[-5,0,0], [-5,10,0]], [1,1,1,1],1,0,0),
		new Triangle([[-5,0,-25],[-5,10,0], [-5,10,-25]], [1,1,1,1],1,0,0),
		
		//right wall
		new Triangle([[5,0,-25], [5,10,0],[5,0,0]], [1,1,1,1],1,0,0),
		new Triangle([[5,0,-25], [5,10,-25],[5,10,0]], [1,1,1,1],1,0,0),
		
		//ceiling
		new Triangle([[-5,10,0], [5,10,0],[-5,10,-25]], [0,0.6,0,1],1,0,0),
		new Triangle([[5,10,0],[5,10,-25], [-5,10,-25]], [0,0.6,0,1],1,0,0),
		
		//floor
		new Triangle([[-5,0,0],[-5,0,-25], [5,0,0]], [0,0.6,0,1],1,0,0),
		new Triangle([[5,0,0], [-5,0,-25],[5,0,-25]], [0,0.6,0,1],1,0,0),
		
		// slope
		new Triangle([[-5,0,-10],[-1,0,-10],[-5,3,-10]],[0,0,0.6,1],1,0,0),
		new Triangle([[-5,3,-10],[-1,0,-10],[-1,0,-5]],[0,0,0.6,1],1,0,0),
		new Triangle([[-1,0,-5],[-5,3,-5],[-5,3,-10]],[0,0,0.6,1],1,0,0),
		new Triangle([[-1,0,-5],[-5,0,-5],[-5,3,-5]],[0,0,0.6,1],1,0,0),

		
		
		
		new Sphere(2,[5,2,-10],[0.3,0.5,0.6,1],1,0,1),
	],
	
	lights : [
		new PointLight(Transform.create([0,5,-10]),50,[1,1,1,1]),
	],
	
	ambientLight : [0.1, 0.1, 0.1, 1]
	
};