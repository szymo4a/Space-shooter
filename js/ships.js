//
//  Created by Szymon Krawczyk 2020
//


let shipTab = [];
let startingShip;
let secondShip;

const buildShips = () => {

	startingShip = new ImgAndHitboxes (startingShipTexture1.texture, 2.5, 2.5);
	startingShip.addAnimationFrame(startingShipTexture2.texture);
	startingShip.addAnimationFrame(startingShipTexture3.texture);
	startingShip.addAnimationFrame(startingShipTexture4.texture);
	startingShip.addHitbox(new Hitbox(0, 0, 2.5, 2.5));
	shipTab.push(startingShip);

	secondShip =  new ImgAndHitboxes (secondShipTexture.texture, 2.5, 2.5);
	secondShip.addHitbox(new Hitbox(0, 0, 2.5, 2.5));
	shipTab.push(secondShip);

	console.log(shipTab);
}


//


let projectileSTab = [];
let startingProjectileS;

const buildProjectilesS = () => {

	startingProjectileS = new ImgAndHitboxes (startingProjectileS1.texture, 1, 2);
	startingProjectileS.addAnimationFrame(startingProjectileS2.texture);
	startingProjectileS.addAnimationFrame(startingProjectileS3.texture);
	startingProjectileS.addAnimationFrame(startingProjectileS4.texture);
	startingProjectileS.addHitbox(new Hitbox(0, 0, 0.5, 1));
	projectileSTab.push(startingProjectileS);
}

let projectileLTab = [];

let startingProjectileL;

const buildProjectilesL = () => {

	startingProjectileL = new ImgAndHitboxes (startingProjectileL1.texture, 2, 1.2);
	startingProjectileL.addAnimationFrame(startingProjectileL2.texture);
	startingProjectileL.addAnimationFrame(startingProjectileL3.texture);
	startingProjectileL.addAnimationFrame(startingProjectileL4.texture);
	startingProjectileL.addHitbox(new Hitbox(0, 0, 1.6, 0.6));
	projectileLTab.push(startingProjectileL);
}