const universeSet = {
  theUniverse: 'The Universe'
};

const addressSet = {
  planetNine: 'Planet Nine'
};

const chargeSet = {
  positive: 'Positive',
  negative: 'Negative'
};

const directionSet = {
  north: 'North',
  south: 'South',
  east: 'East',
  west: 'West',
  up: 'Up',
  down: 'Down'
};

const raritySet = {
  common: 'Common',
  nine: 'Nine',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
  mythical: 'Mythical'
};

const sizeSet = {
  miniscule: 'Miniscule',
  tiny: 'Tiny',
  small: 'Small',
  medium: 'Medium',
  standard: 'Standard',
  big: 'Big',
  large: 'Large',
  huge: 'Huge',
};

const textureSet = {
  soft: 'Soft',
  bumpy: 'Bumpy',
  satin: 'Satin',
  rough: 'Rough',
  gritty: 'Gritty',
  metallic: 'Metallic',
  plush: 'Plush',
  woolen: 'Woolen',
};

const shapeSet = {
  sphere: 'Sphere',
  cylinder: 'Cylinder',
  tetrahedron: 'Tetrahedron',
  cube: 'Cube',
  octahedron: 'Octahedron',
  dodecahedron: 'Dodecahedron',
  cone: 'Cone',
  torus: 'Torus',
};

const yearSet = {
  year1: 'Year One',
  year2: 'Year Two',
  year3: 'Year Three',
  year4: 'Year Four',
  year5: 'Year Five',
  year6: 'Year Six',
  year7: 'Year Seven',
  year8: 'Year Eight',
}

function Nineum(universe, address, charge, direction, rarity, size, texture, shape, year, ordinal, hexString) {
  this.universe = universe;
  this.address = address;
  this.charge = charge;
  this.direction = direction;
  this.rarity = rarity;
  this.size = size;
  this.texture = texture;
  this.shape = shape;
  this.year = year;
  this.ordinal = ordinal;
  this.hexString = hexString;
}

module.exports = {
  getNineumArrayForNineumHexStrings: function (hexStrings) {
    let nineumArray = [];
    hexStrings.forEach(hexString => {
      let nineum = module.exports.getNineumFromHexString(hexString)
      nineumArray.push(nineum);
    });
    return nineumArray
  },

  getNineumFromHexString: function (hexString) {
    const universe = module.exports.getUniverseFromHexString(hexString.slice(0, 2))
    const address = module.exports.getAddressFromHexString(hexString.slice(2, 10))
    const charge = module.exports.getChargeFromHexString(hexString.slice(10, 12))
    const direction = module.exports.getDirectionFromHexString(hexString.slice(12, 14))
    const rarity = module.exports.getRarityFromHexString(hexString.slice(14, 16))
    const size = module.exports.getSizeFromHexString(hexString.slice(16, 18))
    const texture = module.exports.getTextureFromHexString(hexString.slice(18, 20))
    const shape = module.exports.getShapeFromHexString(hexString.slice(20, 22))
    const year = module.exports.getYearFromHexString(hexString.slice(22, 24))
    const ordinal = module.exports.getOrdinalFromHexString(hexString.slice(24, 32))

    const nineum = new Nineum(universe, address, charge, direction, rarity, size, texture, shape, year, ordinal, hexString);

    return nineum;
  },

  getUniverseFromHexString: function (hexString) {
    switch (hexString) {
      case '01':
        return universeSet.theUniverse
      default:
        return universeSet.theUniverse;
    }
  },

  getAddressFromHexString: function (hexString) {
    switch (hexString) {
      case '00000001':
        return addressSet.planetNine
      default:
        return addressSet.planetNine;
    }
  },

  getChargeFromHexString: function (hexString) {
    switch (hexString) {
      case '01':
        return chargeSet.positive
      case '02':
        return chargeSet.negative
      default:
        return chargeSet.positive;
    }
  },

  getDirectionFromHexString: function (hexString) {
    switch (hexString) {
      case '01':
        return directionSet.north
      case '02':
        return directionSet.south
      case '03':
        return directionSet.east
      case '04':
        return directionSet.west
      case '05':
        return directionSet.up
      case '06':
        return directionSet.down
      default:
        return directionSet.north
    }
  },

  getRarityFromHexString: function (hexString) {
    switch (hexString) {
      case '01':
        return raritySet.common
      case '02':
        return raritySet.uncommon
      case '03':
        return raritySet.rare
      case '04':
        return raritySet.epic
      case '05':
        return raritySet.legendary
      case '06':
        return raritySet.mythical
      case '09':
        return raritySet.nine
      default:
        return raritySet.common
    }
  },

  getSizeFromHexString: function (hexString) {
    switch (hexString) {
      case '01':
        return sizeSet.miniscule
      case '02':
        return sizeSet.tiny
      case '03':
        return sizeSet.small
      case '04':
        return sizeSet.medium
      case '05':
        return sizeSet.standard
      case '06':
        return sizeSet.big
      case '07':
        return sizeSet.large
      case '08':
        return sizeSet.huge
      default:
        return sizeSet.miniscule
    }
  },

  getTextureFromHexString: function (hexString) {
    switch (hexString) {
      case '01':
        return textureSet.soft
      case '02':
        return textureSet.bumpy
      case '03':
        return textureSet.satin
      case '04':
        return textureSet.rough
      case '05':
        return textureSet.gritty
      case '06':
        return textureSet.metallic
      case '07':
        return textureSet.plush
      case '08':
        return textureSet.woolen
      default:
        return textureSet.soft
    }
  },

  getShapeFromHexString: function (hexString) {
    switch (hexString) {
      case '01':
        return shapeSet.sphere
      case '02':
        return shapeSet.cylinder
      case '03':
        return shapeSet.tetrahedron
      case '04':
        return shapeSet.cube
      case '05':
        return shapeSet.octahedron
      case '06':
        return shapeSet.dodecahedron
      case '07':
        return shapeSet.cone
      case '08':
        return shapeSet.torus
      default:
        return shapeSet.sphere
    }
  },

  getYearFromHexString: function (hexString) {
    switch (hexString) {
      case '01':
        return yearSet.year1
      case '02':
        return yearSet.year2
      case '03':
        return yearSet.year3
      case '04':
        return yearSet.year4
      case '05':
        return yearSet.year5
      case '06':
        return yearSet.year6
      case '07':
        return yearSet.year7
      case '08':
        return yearSet.year8
      default:
        return yearSet.year8
    }
  },

  getOrdinalFromHexString: function (hexString) {
    const ordinal = parseInt(hexString, 16);
    return ordinal;
  },

}