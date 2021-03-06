//
//  Created by Szymon Krawczyk 2020
//

class Projectile {

constructor (proj, damage = 1, speed = 0.2) {

	this.speed = speed;
	this.damage = damage;

	proj.texture.magFilter = THREE.NearestFilter;
	proj.texture.minFilter = THREE.NearestFilter;

	this.object = new TexturePlane(proj.width, proj.height, proj.texture);
	this.hitboxTab = proj.hitboxTab;

	this.Group = new THREE.Group();
	this.Group.add(this.object.object);
	for (var i = 0; i < this.hitboxTab.length; i++) {
		this.Group.add(this.hitboxTab[i].box)
	}

	this.animationDurationMultiplayer = 0.5;
	this.animationFrames = proj.animationFrameTab;
	this.maxAnimationCounter = 64*this.animationDurationMultiplayer/this.animationFrames.length;
	this.currentAnimationCounter = 0;
	this.currentAnimationFrame = 0;
	for (let i = 0; i < this.animationFrames.length; i++) {
		this.animationFrames[i].magFilter = THREE.NearestFilter;
		this.animationFrames[i].minFilter = THREE.NearestFilter;
	}

	this.Group.position.z = -1;
}

animate() {
	this.maxAnimationCounter = 64*this.animationDurationMultiplayer/this.animationFrames.length;
	if (this.currentAnimationCounter >= this.maxAnimationCounter) {
		++this.currentAnimationFrame;
		this.currentAnimationFrame %= this.animationFrames.length;
		this.object.changeTexture(this.animationFrames[this.currentAnimationFrame]);
		this.currentAnimationCounter = 0;
	}
	this.currentAnimationCounter += 1 * GameSpeed;
}

position(x, y) {
	this.Group.position.x = x;
	this.Group.position.y = y;
}

target(x, y) {	// Calculate vector to target
	this.targetX = x;
	this.targetY = y;

	this.dirX = this.targetX - this.Group.position.x;
	this.dirY = this.targetY - this.Group.position.y;

	this.targetVL = Math.sqrt(this.dirX * this.dirX + this.dirY * this.dirY);
	this.dirVX = this.dirX / this.targetVL;
	this.dirVY = this.dirY / this.targetVL;
}

goToTarget() {
	this.Group.position.x += this.dirVX * this.speed * GameSpeed * TickrateMultiplayer;
	this.Group.position.y += this.dirVY * this.speed * GameSpeed * TickrateMultiplayer;
}

addToScene() {
	scene.add(this.Group);
}

};