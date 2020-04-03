//
//  Created by Szymon Krawczyk 2020
//

const shipsMenu = () => {

	clearScene();

	let yShButtonPositions = [6.5];
	let currentArrowPosition = 0;
	let canMoveArrow = true;
	let canEnter = true;

	let shipsMenuButtons = [];

	for (let i = 1; i < shipTab.length; i++) {
		let newPos = yShButtonPositions[yShButtonPositions.length-1] - ((shipTab[i-1].height)/2 + (shipTab[i].height)/2 + 2);
		yShButtonPositions.push(newPos);
	}

	for (var i = 0; i < shipTab.length; i++) {
		shipTab[i].texture.magFilter = THREE.NearestFilter;
		shipTab[i].texture.minFilter = THREE.NearestFilter;		
		let tempShipButton = new TexturePlane(shipTab[i].width, shipTab[i].height, shipTab[i].texture);
		// menuArrowTexture.texture.magFilter = THREE.NearestFilter;
		// menuArrowTexture.texture.minFilter = THREE.NearestFilter;		
		// let tempShipButton = new TexturePlane(shipTab[i].width, shipTab[i].height, menuArrowTexture.texture);
		tempShipButton.addToScene();
		tempShipButton.setPosition(0, yShButtonPositions[i], 0.5);
		shipsMenuButtons.push(tempShipButton);
	 }

	yShButtonPositions.push(yShButtonPositions[yShButtonPositions.length-1] - (1+2+(shipTab[shipTab.length-1].height)/2));

	//console.log(yShButtonPositions);

	settingsBackTexture.texture.magFilter = THREE.NearestFilter;
	settingsBackTexture.texture.minFilter = THREE.NearestFilter;
	// settingsBackTexture.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	let settingsBack = new TexturePlane(10, 2, settingsBackTexture.texture);
	settingsBack.addToScene();
	settingsBack.setPosition(0, yShButtonPositions[yShButtonPositions.length-1], 0);
	shipsMenuButtons.push(settingsBack);

	//menuArrowTexture.texture.magFilter = THREE.NearestFilter;
	//menuArrowTexture.texture.minFilter = THREE.NearestFilter;
	menuArrowTexture.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	let menuShArrow = new TexturePlane(2, 2, menuArrowTexture.texture);
	menuShArrow.addToScene();
	menuShArrow.setPosition(-6, yShButtonPositions[0], 1);

	menuShipTexture.texture.magFilter = THREE.NearestFilter;
	menuShipTexture.texture.minFilter = THREE.NearestFilter;
	// menuSettingsTexture.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	let menuShips = new TexturePlane(12, 3, menuShipTexture.texture);
	menuShips.addToScene();
	menuShips.setPosition(0, 11.5, 0);

	let shipHighlight;
	
	const updateShipsMenu = () => {

		scene.remove(shipHighlight);
		shipHighlight = new THREE.Mesh(
			  new THREE.PlaneGeometry(shipTab[CurrentShip].width+1, shipTab[CurrentShip].height+1)
			, new THREE.MeshBasicMaterial({ 
				color: 'white'
			,	transparent: true
			,	opacity: 0.1
			 })
		);
		shipHighlight.position.z = -1;
		shipHighlight.position.y = yShButtonPositions[CurrentShip];
		scene.add(shipHighlight);

			menuShArrow.setPosition(-6, yShButtonPositions[currentArrowPosition], 1);

			for (var i = 0; i < shipsMenuButtons.length; i++) {
				shipsMenuButtons[i].setPosition(0, yShButtonPositions[i], 0);
			}
			if (currentArrowPosition == CurrentShip) {				
				shipHighlight.position.x = 1;
			} else {
				shipHighlight.position.x = 0;
			}
			shipsMenuButtons[currentArrowPosition].setPosition(1, yShButtonPositions[currentArrowPosition], 1);
	}

	const ShMstarting = () => {

		if (event.keyCode == 38 && canMoveArrow) {	//UpArr

			--currentArrowPosition;
			currentArrowPosition %= shipsMenuButtons.length;
			if (currentArrowPosition < 0){
				currentArrowPosition = shipsMenuButtons.length-1;
			}
			canMoveArrow = false;
		}

		if (event.keyCode == 40 && canMoveArrow) {	//DnArr

			++currentArrowPosition;
			currentArrowPosition %= shipsMenuButtons.length;
			canMoveArrow = false;
		}

		if (event.keyCode == 13) {	//enter

			if (canEnter) {

				if (currentArrowPosition >= shipsMenuButtons.length-1) {
					console.log('Back');
					document.removeEventListener("keydown", ShMstarting);
					document.removeEventListener("keyup", ShMstopping);
					mainMenu();
					return;
				} else {
					CurrentShip = currentArrowPosition;
					//console.log(`CurrentShip: ${CurrentShip}`);
				}				
			}
			canEnter = false;
		}
		updateShipsMenu();
	}

	const ShMstopping = () => {

		if (event.keyCode == 38 || event.keyCode == 40) {
			canMoveArrow = true;			
		}
		if (event.keyCode == 13) {
			canEnter = true;
		}
	}

	document.addEventListener("keydown", ShMstarting);
	document.addEventListener("keyup", ShMstopping);
	updateShipsMenu();

}