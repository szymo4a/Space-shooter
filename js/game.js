//
//  Created by Szymon Krawczyk 2020
//

const game = () => {

	clearScene();

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

	let wallL = new THREE.Mesh(new THREE.PlaneGeometry(4, 16*2+4), materialL);
	scene.add(wallL);
	wallL.position.x = -10.5;

	let materialR = new THREE.MeshBasicMaterial({ 
			transparent: true
		,	opacity: 0.5
		,	color: 'white'
	});

	let wallR = new THREE.Mesh(new THREE.PlaneGeometry(4, 16*2+4), materialR);	
	scene.add(wallR);
	wallR.position.x = 10.5;

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
		if (pressingSpace && canShot && player.stunned == 0 && player.ammo >= player.SmolShotCost) {
			
			shotForce += 1 * TickrateMultiplayer * PlayerSpeed;
			if (shotForce >= player.forceThreshold && player.ammo < player.BigShotCost) {
				player.shoot(player.forceThreshold-1);
				canShot = false;
				shotForce = 0;
			}
			if (shotForce >= player.forceThreshold * 3) {
				player.shoot(shotForce);
				canShot = false;
				shotForce = 0;
			}
		} else {
			if (shotForce > 0) {
				player.shoot(shotForce);
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

	const animate = () => {

		GameSpeed = 1;
		adjustTickrateMultiplayer();


		destunPlayer();
		calculateShotForce();
		slowTimeWhenShooting();
		slowTimeAfterShooting();
		derecoilPlayer();

		adjustWalls();
		wallCollisionR();
		wallCollisionL();
		player.move();

		player.animate();

		//console.log(GameSpeed);


		setTimeout(animate, 1000/Tickrate);
	}
	animate();

	const Gstarting = () => {

		if (event.keyCode == 32) {	//space
			pressingSpace = true;
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
}