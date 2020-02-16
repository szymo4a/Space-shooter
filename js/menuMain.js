//
//  Created by Szymon Krawczyk 2020
//

const mainMenu = () => {

	clearScene();

	let yButtonPositions = [1, -4.5, -9.5, -14];
	let currentArrowPosition = 0;
	let canMoveArrow = true;
	let canEnter = true;

	let mainMenuButtons = [];

	//menuArrowTexture.texture.magFilter = THREE.NearestFilter;
	//menuArrowTexture.texture.minFilter = THREE.NearestFilter;
	menuArrowTexture.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
	let menuArrow = new TexturePlane(2, 2, menuArrowTexture.texture);
	menuArrow.addToScene();
	menuArrow.setPosition(-7, yButtonPositions[0], 1);

	menuLogoTexture.texture.magFilter = THREE.NearestFilter;
	menuLogoTexture.texture.minFilter = THREE.NearestFilter;
	// menuLogoTexture.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
	let menuLogo = new TexturePlane(14, 9, menuLogoTexture.texture);
	menuLogo.addToScene();
	menuLogo.setPosition(0, 9.5, 0);

	menuPlayTexture.texture.magFilter = THREE.NearestFilter;
	menuPlayTexture.texture.minFilter = THREE.NearestFilter;
	// menuPlayTexture.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
	let menuPlay = new TexturePlane(12, 4, menuPlayTexture.texture);
	menuPlay.addToScene();
	menuPlay.setPosition(0, yButtonPositions[0], 0);
	mainMenuButtons.push(menuPlay);

	menuShipTexture.texture.magFilter = THREE.NearestFilter;
	menuShipTexture.texture.minFilter = THREE.NearestFilter;
	// menuShipTexture.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
	let menuShips = new TexturePlane(12, 3, menuShipTexture.texture);
	menuShips.addToScene();
	menuShips.setPosition(0, yButtonPositions[1], 0);
	mainMenuButtons.push(menuShips);

	menuSettingsTexture.texture.magFilter = THREE.NearestFilter;
	menuSettingsTexture.texture.minFilter = THREE.NearestFilter;
	// menuSettingsTexture.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
	let menuSettings = new TexturePlane(12, 3, menuSettingsTexture.texture);
	menuSettings.addToScene();
	menuSettings.setPosition(0, yButtonPositions[2], 0);
	mainMenuButtons.push(menuSettings);

	menuCreditsTexture.texture.magFilter = THREE.NearestFilter;
	menuCreditsTexture.texture.minFilter = THREE.NearestFilter;
	// menuCreditsTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
	let menuCredits = new TexturePlane(12, 2, menuCreditsTexture.texture);
	menuCredits.addToScene();
	menuCredits.setPosition(0, yButtonPositions[3], 0);
	mainMenuButtons.push(menuCredits);

	const updateMainMenu = () => {

			menuArrow.setPosition(-7, yButtonPositions[currentArrowPosition], 1);

			for (var i = 0; i < mainMenuButtons.length; i++) {
				mainMenuButtons[i].setPosition(0, yButtonPositions[i], 0);
			}
			mainMenuButtons[currentArrowPosition].setPosition(1, yButtonPositions[currentArrowPosition], 1);
	}

	const MMstarting = () => {

		if (event.keyCode == 38 && canMoveArrow) {	//UpArr

			--currentArrowPosition;
			currentArrowPosition %= mainMenuButtons.length;
			if (currentArrowPosition < 0){
				currentArrowPosition = mainMenuButtons.length-1;
			}
			canMoveArrow = false;
		}

		if (event.keyCode == 40 && canMoveArrow) {	//DnArr

			++currentArrowPosition;
			currentArrowPosition %= mainMenuButtons.length;
			canMoveArrow = false;
		}

		if (event.keyCode == 13) {	//enter

			if (canEnter) {

				switch (currentArrowPosition) {
					case (0):
						console.log('Play');
						document.removeEventListener("keydown", MMstarting);
						document.removeEventListener("keyup", MMstopping);
						game();
						return;
					break;

					case (1):
						console.log('ShipSelection');
						document.removeEventListener("keydown", MMstarting);
						document.removeEventListener("keyup", MMstopping);
						shipsMenu();
						return;
					break;

					case (2):
						console.log('Settings');
						document.removeEventListener("keydown", MMstarting);
						document.removeEventListener("keyup", MMstopping);
						settingsMenu();
						return;
					break;

					case (3):
						console.log('Credits');
						//document.removeEventListener("keydown", MMstarting);
						//document.removeEventListener("keyup", MMstopping);
						//credits();
					break;

				}				
			}
			canEnter = false;
		}
		updateMainMenu();
	}

	const MMstopping = () => {

		if (event.keyCode == 38 || event.keyCode == 40) {
			canMoveArrow = true;			
		}
		if (event.keyCode == 13) {
			canEnter = true;
		}
	}

	document.addEventListener("keydown", MMstarting);
	document.addEventListener("keyup", MMstopping);
	updateMainMenu();

}