//
//  Created by Szymon Krawczyk 2020
//

class TexturePlane {

	constructor (sizeX, sizeY, texture) {

		this.width  = sizeX;
		this.height = sizeY;

		this.material = new THREE.MeshBasicMaterial({ 
				map: texture
			,	transparent: true
			 });
		this.object = new THREE.Mesh(
			  new THREE.PlaneGeometry(this.width, this.height)
			, this.material
		);

		this.Group = new THREE.Group();
		this.Group.add(this.object);
	}

	addToScene () {

		scene.add(this.Group);
	}

	setPosition (x, y, z) {

		this.Group.position.x = x;
		this.Group.position.y = y;
		this.Group.position.z = z;
	}

	changeTexture (newTexture) {

		this.material.map = newTexture;
	}
}