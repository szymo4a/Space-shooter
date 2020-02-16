//
//  Created by Szymon Krawczyk 2020
//

// Height and width in 16:8 ratio
	let myWidth  = window.innerWidth;
	let myHeight = window.innerHeight;
	if ((myWidth*16)/9 <= myHeight) {
		myHeight = (myWidth*16)/9;
	} else {
		myWidth = (myHeight*9)/16;
	}
//



// Global variables

	const viewWidth  = 9  *2;
	const viewHeight = 16 *2;
	const backgroundBasicColor = 0x010B19;
	//const backgroundBasicColor = 0xFF0000;

	let scene = new THREE.Scene();
	let camera = new THREE.OrthographicCamera( viewWidth / - 2, viewWidth / 2, viewHeight / 2, viewHeight / - 2, 1, 1000 );
	let renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(myWidth, myHeight);

	document.body.appendChild(renderer.domElement);
	renderer.setClearColor ( backgroundBasicColor, 1.0 );
	scene.add( camera );
	camera.position.z = 10;

	// Important

		let GameSpeed = 1;
		let PlayerSpeed = 1;
		//let coinCount = 0;
		let score = 0;
		let scoreMax = 0;

		let CurrentShip = 0;

		//let Tickrate = 64;
		let Tickrate = 128;
		let TickrateMultiplayer = 1;
		let Music = true;
		let SFX = true;


	//

	// Objects

		let player;	
	//

	// Game Variables

		let PlayerProjectilesTab = [];
	//

	// Textures

		let menuArrowTexture;
		let menuLogoTexture;
		let menuPlayTexture;
		let menuShipTexture;
		let menuSettingsTexture;
		let menuCreditsTexture;

		let settingsTickrateTexture32;
		let settingsTickrateTexture64;
		let settingsTickrateTexture128;
		let settingsMusicTextureOn;
		let settingsMusicTextureOff;
		let settingsSFXTextureOn;
		let settingsSFXTextureOff;
		let settingsBackTexture;

		let startingShipTexture1;
		let startingShipTexture2;
		let startingShipTexture3;
		let startingShipTexture4;
		let secondShipTexture;


		let startingProjectileS1;
		let startingProjectileS2;
		let startingProjectileS3;
		let startingProjectileS4;

		let startingProjectileL1;
		let startingProjectileL2;
		let startingProjectileL3;
		let startingProjectileL4;

	//

//


// Automatic height and width in 9:16 ratio
	const resize = () => {
		requestAnimationFrame(resize);
			myWidth  = window.innerWidth;
			myHeight = window.innerHeight;
			if ((myWidth*16)/9 <= myHeight) {
				myHeight = (myWidth*16)/9;
			} else {
				myWidth = (myHeight*9)/16;
			}
		renderer.setSize(myWidth, myHeight);
		renderer.render(scene, camera);
	}
	resize();
//

// no ctrl+anything for you (except for browser shortcuts (like ctrl+w in chrome) while not in fullscreen mode)
	window.addEventListener("keydown",function (e) {
	    if (e.ctrlKey && !(e.ctrlKey && e.keyCode === 116)) { 	// 116 - F5
	        e.preventDefault();
	    }
	});
	window.onbeforeunload = function (e) {
	    if (e.ctrlKey && !(e.ctrlKey && e.keyCode === 116)) { 	// 116 - F5
	        e.preventDefault();
	    }
	};
//

// Global functions
	
	const clearScene = () => {

		while(scene.children.length > 0){ 
    		scene.remove(scene.children[0]); 
		}
	}
//