//
//  Created by Szymon Krawczyk 2020
//

class ImgAndHitboxes {

	constructor (texture, width, height) {

		this.texture  = texture;
		this.width = width;
		this.height = height;

		this.hitboxTab = [];
		this.animationFrameTab = [];

		this.animationFrameTab.push(this.texture);

	}

	addAnimationFrame (newAnimationFrame) {

		this.animationFrameTab.push(newAnimationFrame);
	}

	addHitbox (newHitbox) {

		this.hitboxTab.push(newHitbox);
	}

	changeTexture (newTexture) {

		this.texture = newTexture;
	}
}