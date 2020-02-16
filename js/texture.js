//
//  Created by Szymon Krawczyk 2020
//

class MyTexture {

constructor (url_ = 'missing.bmp', X_ = 1, Z_ = 1, wrapping_ = true) {

	this.url = url_;
	this.loaded = false;

	this.wrapping = wrapping_;
	this.X = X_;
	this.Z = Z_;


	let _this = this;  //Because 'this' is not visible

	this.texture = new THREE.TextureLoader().load(
		`textures/${_this.url}`,

		// onLoad callback
		function ( texture ) {

			if (_this.wrapping) {
				_this.texture.wrapS = THREE.RepeatWrapping;
				_this.texture.wrapT = THREE.RepeatWrapping;				
			}
			_this.texture.repeat.set( _this.X, _this.Z );
			//texture.magFilter = THREE.NearestFilter //remove blurry pixels
			_this.loaded = true;
		},

		// onProgress callback currently not supported
		undefined,

		// onError callback
		function ( err ) {
			console.error( 'An error happened.' );
		}
	);
}

};