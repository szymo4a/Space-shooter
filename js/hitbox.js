//
//  Created by Szymon Krawczyk 2020
//

class Hitbox {

	constructor (posX = 0, posY = 0, width = 1, height = 1) {

		this.posX   = posX;
		this.posY   = posY;
		this.width  = width;
		this.height = height;

		this.box    = new THREE.Group();

		let boxGeometry = new THREE.PlaneGeometry(this.width, this.height);	
		let wireframeGeo = new THREE.EdgesGeometry( boxGeometry );
		let wireframeMat = new THREE.LineBasicMaterial( { 
				color: 'pink'
			,	linewidth: 1
			,	transparent: true
			,	opacity: 0
			} );
		let wireframe = new THREE.LineSegments( wireframeGeo, wireframeMat );
		wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
		this.box.add( wireframe );

		this.box.position.z = 1;
	}

	addToScene (add = true) {
		if (add) {
			scene.add(this.box);
		} else {
			scene.remove(this.box);
		}
	}

}