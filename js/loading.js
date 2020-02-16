//
//  Created by Szymon Krawczyk 2020
//


{
	clearScene();

	// Graphical indicator

		// let loadingText = new THREE.Mesh(
		// 	  new THREE.PlaneGeometry(9, 3)
		// 	, new THREE.MeshBasicMaterial({

		// 		color: 'white'
		// 	  })
		// );
		// scene.add(loadingText);
		// loadingText.position.y += 2.5;

		let loadingBoxbg = new THREE.Mesh(
			  new THREE.PlaneGeometry(10.75, 1.75)
			, new THREE.MeshBasicMaterial({

				color: 'white'
			  })
		);
		scene.add(loadingBoxbg);
		//loadingBoxbg.position.y -= 1.5;
		loadingBoxbg.position.y = 0;

		let loadingBoxbg2 = new THREE.Mesh(
			  new THREE.PlaneGeometry(10.5, 1.5)
			, new THREE.MeshBasicMaterial({

				color: backgroundBasicColor
			  })
		);
		scene.add(loadingBoxbg2);
		loadingBoxbg2.position.z = 0.1;
		loadingBoxbg2.position.y = loadingBoxbg.position.y;

		let loadingBoxTab = [];
		for (let i = 0; i < 10; i++) {

			loadingBoxTab.push(
				new THREE.Mesh(
					  new THREE.PlaneGeometry(1, 1)
					, new THREE.MeshBasicMaterial({
						color: 'white'
					  })
				)
			);
			//scene.add(loadingBoxTab[i]);
			loadingBoxTab[i].position.y = loadingBoxbg.position.y;
			loadingBoxTab[i].position.z = 0.2;
			loadingBoxTab[i].position.x = -4.5 + 1*i;
		}
	//

	// Resources loading

		const updateLoading = (howMany) => {
			howMany /= 10;
			howMany = Math.ceil(howMany);
			for (let i = 0; i < howMany; i++) {
				scene.add(loadingBoxTab[i]);
			}
		}

		let loadingBoolTable = [];
		let loadingBoolTableHelp = [];
		let loaded = 0;

		// Actual loading

			menuArrowTexture= new MyTexture('Button_Arrow.png');
			loadingBoolTable.push(menuArrowTexture);
			loadingBoolTableHelp.push(false);

			menuLogoTexture = new MyTexture();
			loadingBoolTable.push(menuLogoTexture);
			loadingBoolTableHelp.push(false);

			menuPlayTexture = new MyTexture('Button_Play.png');
			loadingBoolTable.push(menuPlayTexture);
			loadingBoolTableHelp.push(false);

			menuShipTexture = new MyTexture('Button_Ships.png');
			loadingBoolTable.push(menuShipTexture);
			loadingBoolTableHelp.push(false);

			menuSettingsTexture = new MyTexture('Button_Settings.png');
			loadingBoolTable.push(menuSettingsTexture);
			loadingBoolTableHelp.push(false);

			menuCreditsTexture = new MyTexture('Button_Credits.png');
			loadingBoolTable.push(menuCreditsTexture);
			loadingBoolTableHelp.push(false);


			settingsTickrateTexture32 = new MyTexture('Button_Tickrate_32.png');
			loadingBoolTable.push(settingsTickrateTexture32);
			loadingBoolTableHelp.push(false);

			settingsTickrateTexture64 = new MyTexture('Button_Tickrate_64.png');
			loadingBoolTable.push(settingsTickrateTexture64);
			loadingBoolTableHelp.push(false);

			settingsTickrateTexture128 = new MyTexture('Button_Tickrate_128.png');
			loadingBoolTable.push(settingsTickrateTexture128);
			loadingBoolTableHelp.push(false);

			settingsMusicTextureOn = new MyTexture('Button_Music_On.png');
			loadingBoolTable.push(settingsMusicTextureOn);
			loadingBoolTableHelp.push(false);

			settingsMusicTextureOff = new MyTexture('Button_Music_Off.png');
			loadingBoolTable.push(settingsMusicTextureOff);
			loadingBoolTableHelp.push(false);

			settingsSFXTextureOn = new MyTexture('Button_SFX_On.png');
			loadingBoolTable.push(settingsSFXTextureOn);
			loadingBoolTableHelp.push(false);

			settingsSFXTextureOff = new MyTexture('Button_SFX_Off.png');
			loadingBoolTable.push(settingsSFXTextureOff);
			loadingBoolTableHelp.push(false);

			settingsBackTexture = new MyTexture('Button_Back.png');
			loadingBoolTable.push(settingsBackTexture);
			loadingBoolTableHelp.push(false);



			startingShipTexture1 = new MyTexture('ships/ship1_0.png', 1, 1, false);
			loadingBoolTable.push(startingShipTexture1);
			loadingBoolTableHelp.push(false);

			startingShipTexture2 = new MyTexture('ships/ship1_1.png', 1, 1, false);
			loadingBoolTable.push(startingShipTexture2);
			loadingBoolTableHelp.push(false);

			startingShipTexture3 = new MyTexture('ships/ship1_2.png', 1, 1, false);
			loadingBoolTable.push(startingShipTexture3);
			loadingBoolTableHelp.push(false);

			startingShipTexture4 = new MyTexture('ships/ship1_3.png', 1, 1, false);
			loadingBoolTable.push(startingShipTexture4);
			loadingBoolTableHelp.push(false);


			secondShipTexture = new MyTexture('ships/ship2.png', 1, 1, false);
			loadingBoolTable.push(secondShipTexture);
			loadingBoolTableHelp.push(false);
		//

		const checkIfLoaded = () => {

			for (var i = 0; i < loadingBoolTable.length; i++) {
				if (loadingBoolTable[i].loaded && !loadingBoolTableHelp[i]) {
					++loaded;
					loadingBoolTableHelp[i] = true;
					updateLoading((loaded+1)/(loadingBoolTable.length+1)*100);
				}
			}

			if ((loaded+1) ==(loadingBoolTable.length+1)) {
				buildShips();
				setTimeout(mainMenu, 500);
				return;
			} else {
				setTimeout(checkIfLoaded, 50);
			}
		}
		checkIfLoaded();
	//
}