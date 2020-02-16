//
//  Created by Szymon Krawczyk 2020
//

const settingsMenu = () => {

	clearScene();

	let ySButtonPositions = [6.5, 2.5, -1.5, -9];
	let currentArrowPosition = 0;
	let canMoveArrow = true;
	let canEnter = true;

	let settingsMenuButtons = [];

	//menuArrowTexture.texture.magFilter = THREE.NearestFilter;
	//menuArrowTexture.texture.minFilter = THREE.NearestFilter;
	menuArrowTexture.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	let menuSArrow = new TexturePlane(2, 2, menuArrowTexture.texture);
	menuSArrow.addToScene();
	menuSArrow.setPosition(-6, ySButtonPositions[0], 1);

	menuSettingsTexture.texture.magFilter = THREE.NearestFilter;
	menuSettingsTexture.texture.minFilter = THREE.NearestFilter;
	// menuSettingsTexture.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	let menuSettings = new TexturePlane(12, 3, menuSettingsTexture.texture);
	menuSettings.addToScene();
	menuSettings.setPosition(0, 11.5, 0);


	settingsTickrateTexture32.texture.magFilter = THREE.NearestFilter;
	settingsTickrateTexture64.texture.magFilter = THREE.NearestFilter;
	settingsTickrateTexture128.texture.magFilter = THREE.NearestFilter;
	settingsTickrateTexture32.texture.minFilter = THREE.NearestFilter;
	settingsTickrateTexture64.texture.minFilter = THREE.NearestFilter;
	settingsTickrateTexture128.texture.minFilter = THREE.NearestFilter;
	// settingsTickrateTexture32.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	// settingsTickrateTexture64.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	// settingsTickrateTexture128.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	let settingsTickrate;
	switch (Tickrate) {
		case (32): 
			settingsTickrate = new TexturePlane(10, 3, settingsTickrateTexture32.texture);
		break;
		case (64): 
			settingsTickrate = new TexturePlane(10, 3, settingsTickrateTexture64.texture);
		break;
		case (128): 
			settingsTickrate = new TexturePlane(10, 3, settingsTickrateTexture128.texture);
		break;

	}
	settingsTickrate.addToScene();
	settingsTickrate.setPosition(0, ySButtonPositions[0], 0);
	settingsMenuButtons.push(settingsTickrate);

	settingsMusicTextureOn.texture.magFilter = THREE.NearestFilter;
	settingsMusicTextureOff.texture.magFilter = THREE.NearestFilter;
	settingsMusicTextureOn.texture.minFilter = THREE.NearestFilter;
	settingsMusicTextureOff.texture.minFilter = THREE.NearestFilter;
	// settingsMusicTextureOn.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	// settingsMusicTextureOff.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	let settingsMusic;
	if (Music) {
		settingsMusic = new TexturePlane(10, 3, settingsMusicTextureOn.texture);
	} else {
		settingsMusic = new TexturePlane(10, 3, settingsMusicTextureOff.texture);
	}
	settingsMusic.addToScene();
	settingsMusic.setPosition(0, ySButtonPositions[1], 0);
	settingsMenuButtons.push(settingsMusic);

	settingsSFXTextureOn.texture.magFilter = THREE.NearestFilter;
	settingsSFXTextureOff.texture.magFilter = THREE.NearestFilter;
	settingsSFXTextureOn.texture.minFilter = THREE.NearestFilter;
	settingsSFXTextureOff.texture.minFilter = THREE.NearestFilter;
	// settingsSFXTextureOn.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	// settingsSFXTextureOff.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	let settingsSFX;
	if (SFX) {
		settingsSFX = new TexturePlane(10, 3, settingsSFXTextureOn.texture);
	} else {
		settingsSFX = new TexturePlane(10, 3, settingsSFXTextureOff.texture);
	}
	settingsSFX.addToScene();
	settingsSFX.setPosition(0, ySButtonPositions[2], 0);
	settingsMenuButtons.push(settingsSFX);

	settingsBackTexture.texture.magFilter = THREE.NearestFilter;
	settingsBackTexture.texture.minFilter = THREE.NearestFilter;
	// settingsBackTexture.texture.anisotropy  = renderer.capabilities.getMaxAnisotropy();
	let settingsBack = new TexturePlane(10, 2, settingsBackTexture.texture);
	settingsBack.addToScene();
	settingsBack.setPosition(0, ySButtonPositions[4], 0);
	settingsMenuButtons.push(settingsBack);

	const updateSettingsMenu = () => {

			menuSArrow.setPosition(-6, ySButtonPositions[currentArrowPosition], 1);

			for (var i = 0; i < settingsMenuButtons.length; i++) {
				settingsMenuButtons[i].setPosition(0, ySButtonPositions[i], 0);
			}
			settingsMenuButtons[currentArrowPosition].setPosition(1, ySButtonPositions[currentArrowPosition], 1);
	}

	const SMstarting = () => {

		if (event.keyCode == 38 && canMoveArrow) {	//UpArr

			--currentArrowPosition;
			currentArrowPosition %= settingsMenuButtons.length;
			if (currentArrowPosition < 0){
				currentArrowPosition = settingsMenuButtons.length-1;
			}
			canMoveArrow = false;
		}

		if (event.keyCode == 40 && canMoveArrow) {	//DnArr

			++currentArrowPosition;
			currentArrowPosition %= settingsMenuButtons.length;
			canMoveArrow = false;
		}

		if (event.keyCode == 13) {	//enter

			if (canEnter) {

				switch (currentArrowPosition) {

					case (0):
						//console.log('Tickrate');
						switch (Tickrate) {

							case (32): 
								Tickrate = 64;
								settingsTickrate.changeTexture(settingsTickrateTexture64.texture);
							break;

							case (64): 
								Tickrate = 128;
								settingsTickrate.changeTexture(settingsTickrateTexture128.texture);
							break;

							case (128): 
								Tickrate = 32;
								settingsTickrate.changeTexture(settingsTickrateTexture32.texture);
							break;

						}
						console.log(`Tickrate: ${Tickrate}`);
					break;

					case (1):
						//console.log('Music');
						if (Music) {
							Music = false;
							settingsMusic.changeTexture(settingsMusicTextureOff.texture);
							//stop music
						} else {
							Music = true;
							settingsMusic.changeTexture(settingsMusicTextureOn.texture);
							//start music
						}
						console.log(`Music: ${Music}`);
					break;

					case (2):
						//console.log('SFX');
						if (SFX) {
							SFX = false;
							settingsSFX.changeTexture(settingsSFXTextureOff.texture);
							//stop sfx
						} else {
							SFX = true;
							settingsSFX.changeTexture(settingsSFXTextureOn.texture);
							//start sfx
						}
						console.log(`SFX: ${SFX}`);
					break;

					case (3):
						console.log('Back');
						document.removeEventListener("keydown", SMstarting);
						document.removeEventListener("keyup", SMstopping);
						mainMenu();
						return;
					break;

				}				
			}
			canEnter = false;
		}
		updateSettingsMenu();
	}

	const SMstopping = () => {

		if (event.keyCode == 38 || event.keyCode == 40) {
			canMoveArrow = true;			
		}
		if (event.keyCode == 13) {
			canEnter = true;
		}
	}

	document.addEventListener("keydown", SMstarting);
	document.addEventListener("keyup", SMstopping);
	updateSettingsMenu();

}