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


module.exports = class Nineum {
  constructor(opts) {
    this.universe = opts.universe;
    this.address = opts.address;
    this.charge = opts.charge;
    this.direction = opts.direction;
    this.rarity = opts.rarity;
    this.size = opts.size;
    this.texture = opts.texture;
    this.shape = opts.shape;
    this.year = opts.year;
    this.ordinal = opts.ordinal;
    this.uniqueId = opts.uniqueId;
  }

  static getNineumArrayForNineumHexStrings(hexStrings) {
    if (!Array.isArray(hexStrings)) {
      throw new TypeError(`Argument of getNineumArrayForNineumHexStrings() must be an array, not ${typeof hexStrings}`);
    }
    let nineumArray = [];
    hexStrings.forEach(hexString => {
      let nineum = module.exports.getNineumFromHexString(hexString)
      nineumArray.push(nineum);
    });
    return nineumArray
  }

  static getNineumFromHexString(hexString) {   
    if (typeof hexString !== 'string' || hexString instanceof String) {
      throw new TypeError(`Argument of getNineumFromHexString() must be a string, not ${typeof hexString}`);
    }

    let universe = Nineum.getUniverseFromHexString(hexString.slice(0, 2))
    let address = Nineum.getAddressFromHexString(hexString.slice(2, 10))
    let charge = Nineum.getChargeFromHexString(hexString.slice(10, 12))
    let direction = Nineum.getDirectionFromHexString(hexString.slice(12, 14))
    let rarity = Nineum.getRarityFromHexString(hexString.slice(14, 16))
    let size = Nineum.getSizeFromHexString(hexString.slice(16, 18))
    let texture = Nineum.getTextureFromHexString(hexString.slice(18, 20))
    let shape = Nineum.getShapeFromHexString(hexString.slice(20, 22))
    let year = Nineum.getYearFromHexString(hexString.slice(22, 24))
    let ordinal = Nineum.getOrdinalFromHexString(hexString.slice(24, 32))

    const nineumOptions = {
      universe: universe,
      address: address,
      charge: charge,
      direction: direction,
      rarity: rarity,
      size: size,
      texture: texture,
      shape: shape,
      year: year,
      ordinal: ordinal,
      uniqueId: hexString,
    }

    const nineum = new Nineum(nineumOptions);
    return nineum;
  }

  static getUniverseFromHexString(hexString) {
    switch (hexString) {
      case '01':
        return universeSet.theUniverse
      default:
        return universeSet.theUniverse;
    }
  }

  static getAddressFromHexString(hexString) {
    switch (hexString) {
      case '00000001':
        return addressSet.planetNine
      default:
        return addressSet.planetNine;
    }
  }

  static getChargeFromHexString(hexString) {
    switch (hexString) {
      case '01':
        return chargeSet.positive
      case '02':
        return chargeSet.negative
      default:
        return chargeSet.positive;
    }
  }

  static getDirectionFromHexString(hexString) {
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
  }

  static getRarityFromHexString(hexString) {
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
  }

  static getSizeFromHexString(hexString) {
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
  }

  static getTextureFromHexString(hexString) {
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
  }

  static getShapeFromHexString(hexString) {
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
  }

  static getYearFromHexString(hexString) {
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
  }

  static getOrdinalFromHexString(hexString) {
    const ordinal = parseInt(hexString, 16);
    return ordinal;
  }

}