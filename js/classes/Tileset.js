function Tileset(url)

/* Object representing a tileset : it is linked to an Image object through this.image
and the other way around with image.referenceDuTileset 
it has a method called dessinerTiled (see below)*/
{
	this.image = new Image();
	this.image.referenceDuTileset = this;
	this.image.onload = function()
	{
		if (!(this.complete))
		{
			// !!! notice that "this", within this function, refers to the image object,
			// NOT to the Tileset class object
			throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
		}

		this.referenceDuTileset.largeur = this.width / 32; // it creates a Tileset.largeur attribute
		// largeur is in terms of Tileset

	}

	this.image.src = "tilesets/" + url; 


}


Tileset.prototype.dessinerTile = function(numero, context, xDestination, yDestination)
{
	// Calculation of the coordinates to pass to drawImage
	// Coordinates starts from 0
	var xSourceEnTiles = numero % this.largeur;
	if (xSourceEnTiles == 0)
		xSourceEnTiles = this.largeur;
	var ySourceEnTiles = Math.ceil(numero / this.largeur);

	var xSource = (xSourceEnTiles - 1) * 32;
	var ySource = (ySourceEnTiles - 1) * 32;


	context.drawImage(this.image, xSource, ySource, 32, 32, xDestination, yDestination, 32, 32);


}