//
//  Created by Szymon Krawczyk 2020
//

//gdy gameover: PlayerProjectilesTab.length = 0!!!

let engineTimeout;
let animemateTimeout;
let pausedFTimeout;

const game = () => {

	clearScene();

	let paused = false;
	let pauseShot = 0;

	let GameEnd;


	let pressingSpace = false;
	let canShot = true;
	let shotForce = 0;

	const BorderRight = 8.5;
	const BorderLeft = -8.5;

	let wallEnergizedL = true;
	let wallEnergizedR = false;
	if (Math.floor(Math.random()*2)) {
		wallEnergizedL = false;
		wallEnergizedR = true;
	}

	let canSpawnEnemies = false;
	setTimeout(function(){
		canSpawnEnemies = true;
	}, 3000);


	player = new Player(shipTab[CurrentShip]);
	player.addToScene();
	player.Group.position.y = -12;
	player.currentXDirection = wallEnergizedR - wallEnergizedL;


	//
	//
	//

	let materialL = new THREE.MeshBasicMaterial({ 
			transparent: true
		,	opacity: 0.5
		,	color: 'white'
	});

	let wallL = new THREE.Mesh(new THREE.PlaneGeometry(10, 16*5+4), materialL);
	scene.add(wallL);
	wallL.position.x = -13.5;

	let materialR = new THREE.MeshBasicMaterial({ 
			transparent: true
		,	opacity: 0.5
		,	color: 'white'
	});

	let wallR = new THREE.Mesh(new THREE.PlaneGeometry(10, 16*5+4), materialR);	
	scene.add(wallR);
	wallR.position.x = 13.5;

	//
	//
	//

	const adjustWalls = () => {
		if (wallEnergizedL) {
			materialL.opacity = 1;
		} else {
			materialL.opacity = 0.5;
		}
		if (wallEnergizedR) {			
			materialR.opacity = 1;
		} else {
			materialR.opacity = 0.5;
		}
	}

	const wallCollisionL = () => {
		if(player.Group.position.x <= (BorderLeft + player.object.width/2)) {
			player.currentXDirection = 1;
			if (wallEnergizedL) {				
				player.refillAmmo();
				wallEnergizedL = false;
			}
			wallEnergizedR = true;
		}	
	}

	const wallCollisionR = () => {
		if(player.Group.position.x >= (BorderRight - player.object.width/2)) {
			player.currentXDirection = -1;
			if (wallEnergizedR) {				
				player.refillAmmo();
				wallEnergizedR = false;
			}
			wallEnergizedL = true;
		}		
	}


	const adjustTickrateMultiplayer = () => {
		switch (Tickrate) {
			case 32:
				TickrateMultiplayer = 2;
			break;

			case 64:
				TickrateMultiplayer = 1;
			break;

			case 128:
				TickrateMultiplayer = 0.5;
			break;
		}
	}

	const calculateShotForce = () => {

		//console.log(shotForce);
		if (!paused && pressingSpace && canShot && player.stunned == 0 && player.ammo >= player.SmolShotCost) {
			
			shotForce += 1 * TickrateMultiplayer * PlayerSpeed;
			if (shotForce >= player.forceThreshold && player.ammo < player.BigShotCost) {
				//smallshot
				if (!paused) {

					player.shoot(player.forceThreshold-1);
				} else {
					pauseShot = shotForce;
				}
				canShot = false;
				shotForce = 0;
			}
			if (shotForce >= player.forceThreshold * 3) {
				//bigshot
				if (!paused) {

					player.shoot(shotForce);
				} else {
					pauseShot = shotForce;
				}
				canShot = false;
				shotForce = 0;
			}
		} else {
			if (shotForce > 0) {
				//smallshot or bigshot
				if (!paused) {

					player.shoot(shotForce);
				} else {
					pauseShot = shotForce;
				}
				//canShot = false;
				shotForce = 0;
			}
			shotForce = 0;
		}
	}

	const slowTimeWhenShooting = () => {

		let slowness = 1 - (shotForce/(64*2));
		if (slowness <= 0.50) {
			slowness = 0.50;
		}
		GameSpeed *= slowness;
	}

	const slowTimeAfterShooting = () => {

		let slowness = 1 - (player.recoil/(2));
		if (slowness <= 0.50) {
			slowness = 0.50;
		}
		GameSpeed *= slowness;
	}

	const derecoilPlayer = () => {
		if (player.recoil > 0) {
			player.recoil -= (1/64*2) * TickrateMultiplayer * GameSpeed * PlayerSpeed;
		} else if (player.recoil < 0) {
			player.recoil = 0;
		}
	}

	const destunPlayer = () => {
		if (player.stunned > 0) {
			player.stunned -= 1 * TickrateMultiplayer * GameSpeed * PlayerSpeed;
		} else if (player.stunned < 0) {
			player.stunned = 0;
		}
	}

	const animatePlayerProjectiles = () => {

		for (var i = 0; i < PlayerProjectilesTab.length; i++) {
			if (typeof PlayerProjectilesTab[i] != 'undefined') {
				PlayerProjectilesTab[i].animate();
			}
		}
	}

	const movePlayerProjectiles = () => {
		for (var i = 0; i < PlayerProjectilesTab.length; i++) {
			if (typeof PlayerProjectilesTab[i] != 'undefined') {
				PlayerProjectilesTab[i].goToTarget();
			}
		}
	}

	const discardProjectiles = () => {
		for (var i = 0; i < PlayerProjectilesTab.length; i++) {
			if (typeof PlayerProjectilesTab[i] != 'undefined') {
				if (PlayerProjectilesTab[i].Group.position.y >= 1.5*16) {

					PlayerProjectilesTab[i].Group.position.z = 100;
					scene.remove(PlayerProjectilesTab[i].Group);
					delete PlayerProjectilesTab[i];
				}
			}
		}
	}



	let pausedMultiplayer = 1.0;
	const engine = () => {

		adjustTickrateMultiplayer();

		GameSpeed = 1 * !paused;
		GameSpeed *= pausedMultiplayer;
		slowTimeWhenShooting();
		slowTimeAfterShooting();

		destunPlayer();
		derecoilPlayer();
		calculateShotForce();

		adjustWalls();
		wallCollisionR();
		wallCollisionL();

		player.move();
		movePlayerProjectiles();

		discardProjectiles();

		engineTimeout = setTimeout(engine, 1000/Tickrate);
	}
	engine();

	let pauseGroup = new THREE.Group();
	const animate = () => {

		player.animate();
		animatePlayerProjectiles();
		pauseGroup.position.x = camera.position.x;
		pauseGroup.position.y = camera.position.y;

		animemateTimeout = setTimeout(animate, 1000/64);
	}
	animate();



	let SPstarting;
	let SPstopping;

	const onPaused = () => {

		let background = new THREE.Mesh(
			new THREE.PlaneGeometry(12, 20),
			new THREE.MeshBasicMaterial({
					color: backgroundBasicColor
				,	transparent: true
				,	opacity: 0.15
			})
		);
		background.position.z -= 1;
		pauseGroup.add(background);

		let defOpacity = 0.6;
		let materialTab = [];
		{
			settingsTickrateTexture32.texture.magFilter = THREE.NearestFilter;
			settingsTickrateTexture32.texture.minFilter = THREE.NearestFilter;
			materialTab.push(new THREE.MeshBasicMaterial({
								map: settingsTickrateTexture32.texture
							,	transparent: true
							,	opacity: defOpacity
							}));

			settingsTickrateTexture64.texture.magFilter = THREE.NearestFilter;
			settingsTickrateTexture64.texture.minFilter = THREE.NearestFilter;
			materialTab.push(new THREE.MeshBasicMaterial({
								map: settingsTickrateTexture64.texture
							,	transparent: true
							,	opacity: defOpacity
							}));

			settingsTickrateTexture128.texture.magFilter = THREE.NearestFilter;
			settingsTickrateTexture128.texture.minFilter = THREE.NearestFilter;
			materialTab.push(new THREE.MeshBasicMaterial({
								map: settingsTickrateTexture128.texture
							,	transparent: true
							,	opacity: defOpacity
							}));


			settingsMusicTextureOn.texture.magFilter = THREE.NearestFilter;
			settingsMusicTextureOn.texture.minFilter = THREE.NearestFilter;
			materialTab.push(new THREE.MeshBasicMaterial({
								map: settingsMusicTextureOn.texture
							,	transparent: true
							,	opacity: defOpacity
							}));

			settingsMusicTextureOff.texture.magFilter = THREE.NearestFilter;
			settingsMusicTextureOff.texture.minFilter = THREE.NearestFilter;
			materialTab.push(new THREE.MeshBasicMaterial({
								map: settingsMusicTextureOff.texture
							,	transparent: true
							,	opacity: defOpacity
							}));


			settingsSFXTextureOn.texture.magFilter = THREE.NearestFilter;
			settingsSFXTextureOn.texture.minFilter = THREE.NearestFilter;
			materialTab.push(new THREE.MeshBasicMaterial({
								map: settingsSFXTextureOn.texture
							,	transparent: true
							,	opacity: defOpacity
							}));
			
			settingsSFXTextureOff.texture.magFilter = THREE.NearestFilter;
			settingsSFXTextureOff.texture.minFilter = THREE.NearestFilter;
			materialTab.push(new THREE.MeshBasicMaterial({
								map: settingsSFXTextureOff.texture
							,	transparent: true
							,	opacity: defOpacity
							}));

			settingsMenuTexture.texture.magFilter = THREE.NearestFilter;
			settingsMenuTexture.texture.minFilter = THREE.NearestFilter;
			materialTab.push(new THREE.MeshBasicMaterial({
								map: settingsMenuTexture.texture
							,	transparent: true
							,	opacity: defOpacity
							}));


			settingsBackTexture.texture.magFilter = THREE.NearestFilter;
			settingsBackTexture.texture.minFilter = THREE.NearestFilter;
			materialTab.push(new THREE.MeshBasicMaterial({
								map: settingsBackTexture.texture
							,	transparent: true
							,	opacity: defOpacity
							}));
		}
		

		menuSettingsTexture.texture.magFilter = THREE.NearestFilter;
		menuSettingsTexture.texture.minFilter = THREE.NearestFilter;
		let s1 = new THREE.Mesh(
			new THREE.PlaneGeometry(12, 3),
			new THREE.MeshBasicMaterial({
					map: menuSettingsTexture.texture
				,	transparent: true
			})
		);
		s1.position.y += 8.5;
		pauseGroup.add(s1);

		let buttonsPTab = [];

		let b1 = new THREE.Mesh(
			new THREE.PlaneGeometry(12, 2),
			materialTab[8]
		);
		b1.position.y -= 9;
		pauseGroup.add(b1);

		let t1 = new THREE.Mesh(
			new THREE.PlaneGeometry(10, 3),
			materialTab[0]
		);
		t1.position.y += 4.5;
		pauseGroup.add(t1);
		buttonsPTab.push(t1);

		let m1 = new THREE.Mesh(
			new THREE.PlaneGeometry(10, 3),
			materialTab[3]
		);
		m1.position.y += 1;
		pauseGroup.add(m1);
		buttonsPTab.push(m1);

		let sf1 = new THREE.Mesh(
			new THREE.PlaneGeometry(10, 3),
			materialTab[5]
		);
		sf1.position.y -= 2.5;
		pauseGroup.add(sf1);
		buttonsPTab.push(sf1);

		let me1 = new THREE.Mesh(
			new THREE.PlaneGeometry(10, 3),
			materialTab[7]
		);
		me1.position.y -= 6;
		pauseGroup.add(me1);
		buttonsPTab.push(me1);
		buttonsPTab.push(b1);

		pauseGroup.position.z = 5;
		scene.add(pauseGroup);

		let PcurrentArrowPosition = 0;
		let PcanMoveArrow = true;
		let PcanEnter = true;
		const maxCurrent = buttonsPTab.length;

		const updatePauseMenu = () => {

			switch (Tickrate) {
				case (32): 
					buttonsPTab[0].material = materialTab[0];
				break;

				case (64): 
					buttonsPTab[0].material = materialTab[1];
				break;

				case (128): 
					buttonsPTab[0].material = materialTab[2];
				break;
			}
			if (Music) {
				buttonsPTab[1].material = materialTab[3];
			} else {
				buttonsPTab[1].material = materialTab[4];
			}
			if (SFX) {
				buttonsPTab[2].material = materialTab[5];
			} else {
				buttonsPTab[2].material = materialTab[6];
			}

			for (var i = 0; i < materialTab.length; i++) {
				materialTab[i].opacity = defOpacity;
			}			
			buttonsPTab[PcurrentArrowPosition].material.opacity = 1;
			console.log(PcurrentArrowPosition);
		}

		SPstarting = () => {

			if (event.keyCode == 38 && PcanMoveArrow) {	//UpArr

				--PcurrentArrowPosition;
				PcurrentArrowPosition %= maxCurrent;
				if (PcurrentArrowPosition < 0){
					PcurrentArrowPosition = maxCurrent-1;
				}
				PcanMoveArrow = false;

			}

			if (event.keyCode == 40 && PcanMoveArrow) {	//DnArr

				++PcurrentArrowPosition;
				PcurrentArrowPosition %= maxCurrent;
				PcanMoveArrow = false;
			}

			if (event.keyCode == 13) {	//enter

				if (PcanEnter) {

					switch (PcurrentArrowPosition) {

						case (0):
							//console.log('Tickrate');
							switch (Tickrate) {

								case (32): 
									Tickrate = 64;
								break;

								case (64): 
									Tickrate = 128;
								break;

								case (128): 
									Tickrate = 32;
								break;

							}
							console.log(`Tickrate: ${Tickrate}`);
						break;

						case (1):
							//console.log('Music');
							if (Music) {
								Music = false;
								//stop music
							} else {
								Music = true;
								//start music
							}
							console.log(`Music: ${Music}`);
						break;

						case (2):
							//console.log('SFX');
							if (SFX) {
								SFX = false;
								//stop sfx
							} else {
								SFX = true;
								//start sfx
							}
							console.log(`SFX: ${SFX}`);
						break;

						case (3):
							console.log('Menu');
							document.removeEventListener("keydown", SPstarting);
							document.removeEventListener("keyup", SPstopping);
							GameEnd();
							return;
						break;

						case (4):
							console.log('Back');
							document.removeEventListener("keydown", SPstarting);
							document.removeEventListener("keyup", SPstopping);
							onResumed();
							return;
						break;

					}				
				}
				PcanEnter = false;
			}


			updatePauseMenu();
		}

		SPstopping = () => {

			if (event.keyCode == 38 || event.keyCode == 40) {
				PcanMoveArrow = true;			
			}
			if (event.keyCode == 13) {
				PcanEnter = true;
			}
		}

		document.addEventListener("keydown", SPstarting);
		document.addEventListener("keyup", SPstopping);
		//document.removeEventListener("keydown", SPstarting);
		//document.removeEventListener("keyup", SPstopping);
	 	updatePauseMenu();
		paused = true;
	}


	const onResumed = () => {
		document.removeEventListener("keydown", SPstarting);
		document.removeEventListener("keyup", SPstopping);

		while(pauseGroup.children.length > 0){ 
    		pauseGroup.remove(pauseGroup.children[0]); 
		}
		scene.remove(pauseGroup);

		if (pauseShot) player.shoot(pauseShot);
		pauseShot = 0;
		pausedMultiplayer = 0.5;
		paused = false;
	}

	const pausedMultiplayerF = () => {

		if (pausedMultiplayer < 1.0) {
			pausedMultiplayer+= 0.01;
		} else if (pausedMultiplayer >= 1.0) {
			pausedMultiplayer = 1.0;
		}


		pausedFTimeout = setTimeout(pausedMultiplayerF, 1000/64);
	}
	pausedMultiplayerF();


	const Gstarting = () => {

		if (event.keyCode == 32 && !paused) {	//space

			pressingSpace = true;
		}

		if (event.keyCode == 27) {	//escape

			if (paused) {
				
				onResumed();
			} else {

				onPaused();
			}
		}
	}

	const Gstopping = () => {

		if (event.keyCode == 32) {

			canShot = true;
			pressingSpace = false;
			//console.log(canShot);
		}
	}

	document.addEventListener("keydown", Gstarting);
	document.addEventListener("keyup", Gstopping);


	GameEnd = () => {

		onResumed();
		document.removeEventListener("keydown", Gstarting);
		document.removeEventListener("keyup", Gstopping);
		clearTimeout(engineTimeout);
		clearTimeout(animemateTimeout);
		clearTimeout(pausedFTimeout);
		mainMenu();
		return;
	}
}