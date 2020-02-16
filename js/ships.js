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