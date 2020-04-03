//
//  Created by Szymon Krawczyk 2020
//

class Player {

constructor (ship) {

	this.ammo = 10;
	this.currentMaxAmmo = 10;
	this.maxAmmo = 20;
	this.forceThreshold = 64;
	this.BigShotCost = 4;
	this.SmolShotCost = 1;
	this.stunned = 0;
	this.recoil = 0;

	this.currentXDirection = 1;
	this.XSpeed = 0.1 * PlayerSpeed * GameSpeed * TickrateMultiplayer;


	ship.texture.magFilter = THREE.NearestFilter;
	ship.texture.minFilter = THREE.NearestFilter;	
	this.object = new TexturePlane(ship.width, ship.height, ship.texture);
	this.hitboxTab = ship.hitboxTab;

	this.Group = new THREE.Group();
	this.Group.add(this.object.object);
	for (var i = 0; i < this.hitboxTab.length; i++) {
		this.Group.add(this.hitboxTab[i].box)
	}

	this.animationDurationMultiplayer = 0.5;
	this.animationFrames = ship.animationFrameTab;
	this.maxAnimationCounter = 64*this.animationDurationMultiplayer/this.animationFrames.length;
	this.currentAnimationCounter = 0;
	this.currentAnimationFrame = 0;
	for (let i = 0; i < this.animationFrames.length; i++) {
		this.animationFrames[i].magFilter = THREE.NearestFilter;
		this.animationFrames[i].minFilter = THREE.NearestFilter;
	}

	//console.log(this.animationFrames);
}

changeShip(ship) {

	this.clearGroup();
	ship.texture.magFilter = THREE.NearestFilter;
	ship.texture.minFilter = THREE.NearestFilter;

	let posTp = [this.Group.position.x, this.Group.position.y, this.Group.position.z];

	this.object = new TexturePlane(ship.width, ship.height, ship.texture);
	this.hitboxTab = ship.hitboxTab;

	this.Group = new THREE.Group();
	this.Group.add(this.object.object);
	for (var i = 0; i < this.hitboxTab.length; i++) {
		this.Group.add(this.hitboxTab[i].box)
	}

	this.Group.position.x = posTp[0];
	this.Group.position.y = posTp[1];
	this.Group.position.z = posTp[2];

	this.animationFrames = ship.animationFrameTab;
	this.maxAnimationCounter = 64*this.animationDurationMultiplayer/this.animationFrames.length;
	this.currentAnimationCounter = 0;
	this.currentAnimationFrame = 0;
	for (let i = 0; i < this.animationFrames.length; i++) {
		this.animationFrames[i].magFilter = THREE.NearestFilter;
		this.animationFrames[i].minFilter = THREE.NearestFilter;
	}

	this.addToScene();
}

animate() {
	this.maxAnimationCounter = 64*this.animationDurationMultiplayer/this.animationFrames.length;
	if (this.currentAnimationCounter >= this.maxAnimationCounter) {
		++this.currentAnimationFrame;
		this.currentAnimationFrame %= this.animationFrames.length;
		this.object.changeTexture(this.animationFrames[this.currentAnimationFrame]);
		this.currentAnimationCounter = 0;
	}
	this.currentAnimationCounter += 1 * PlayerSpeed * GameSpeed;
}

clearGroup() {

	scene.remove(this.Group);

	while(this.Group.children.length > 0){ 
    	this.Group.remove(this.Group.children[0]); 
	}
}

addToScene() {

	scene.add(this.Group);
}

changeXDirection(){

	this.currentXDirection = -this.currentXDirection;
}

move(){
	this.XSpeed = 0.1 * PlayerSpeed * GameSpeed * TickrateMultiplayer;
	this.Group.position.x += this.XSpeed * this.currentXDirection;

	this.Group.position.y = -12 - this.recoil;
}

addRecoil(additionalRecoil) {
	this.recoil += additionalRecoil;
	if (this.recoil >= 1) {
		this.recoil = 1;
	}
}

shoot(force) {

	if (force >= this.forceThreshold) {

		//console.log('BigShot');
		camera.strength += bigShotShake;
		this.ammo -= this.BigShotCost;
		this.stunned = 12;
		this.changeXDirection();

		this.addRecoil(0.75);

		let tempProj = new Projectile(projectileLTab[0], 2);
		tempProj.position(this.Group.position.x, this.Group.position.y);
		tempProj.target(this.Group.position.x, this.Group.position.y + 1);
		tempProj.addToScene();
		PlayerProjectilesTab.push(tempProj);
		PlayerProjectilesTab[PlayerProjectilesTab.length-1].addToScene();

	} else if (force > 0){

		//console.log('SmolShot');
		camera.strength += smallShotShake;
		this.ammo -= this.SmolShotCost;
		this.stunned = 4;
		this.changeXDirection();

		this.addRecoil(0.15);

		let tempProj = new Projectile(projectileSTab[0]);
		tempProj.position(this.Group.position.x, this.Group.position.y);
		tempProj.target(this.Group.position.x, this.Group.position.y + 1);
		tempProj.addToScene();
		PlayerProjectilesTab.push(tempProj);
		PlayerProjectilesTab[PlayerProjectilesTab.length-1].addToScene();
	}
}

refillAmmo() {

	this.ammo = this.currentMaxAmmo;
}

};