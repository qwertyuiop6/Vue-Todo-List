const list = [
  "https://bigheads.io/svg?accessory=shades&body=breasts&circleColor=blue&clothing=vneck&clothingColor=black&eyebrows=serious&eyes=leftTwitch&faceMask=true&faceMaskColor=green&facialHair=stubble&graphic=vue&hair=afro&hairColor=white&hat=beanie&hatColor=green&lashes=false&lipColor=red&mask=true&mouth=open&skinTone=light",
  "https://bigheads.io/svg?accessory=roundGlasses&body=chest&circleColor=blue&clothing=dressShirt&clothingColor=white&eyebrows=leftLowered&eyes=normal&faceMask=true&faceMaskColor=blue&facialHair=none3&graphic=react&hair=afro&hairColor=pink&hat=beanie&hatColor=green&lashes=false&lipColor=purple&mask=true&mouth=serious&skinTone=light",
  "https://bigheads.io/svg?accessory=roundGlasses&body=chest&circleColor=blue&clothing=dressShirt&clothingColor=red&eyebrows=leftLowered&eyes=content&faceMask=true&faceMaskColor=red&facialHair=none2&graphic=redwood&hair=buzz&hairColor=white&hat=beanie&hatColor=white&lashes=false&lipColor=purple&mask=true&mouth=grin&skinTone=light",
  "https://bigheads.io/svg?accessory=roundGlasses&body=chest&circleColor=blue&clothing=tankTop&clothingColor=red&eyebrows=concerned&eyes=wink&faceMask=true&faceMaskColor=white&facialHair=none&graphic=react&hair=afro&hairColor=blue&hat=none5&hatColor=white&lashes=true&lipColor=pink&mask=true&mouth=sad&skinTone=red",
  "https://bigheads.io/svg?accessory=none&body=chest&circleColor=blue&clothing=dressShirt&clothingColor=red&eyebrows=serious&eyes=normal&faceMask=true&faceMaskColor=green&facialHair=mediumBeard&graphic=gatsby&hair=afro&hairColor=white&hat=none2&hatColor=white&lashes=false&lipColor=purple&mask=true&mouth=tongue&skinTone=dark",
  "https://bigheads.io/svg?accessory=none&body=chest&circleColor=blue&clothing=dressShirt&clothingColor=red&eyebrows=serious&eyes=normal&faceMask=true&faceMaskColor=white&facialHair=mediumBeard&graphic=gatsby&hair=afro&hairColor=white&hat=none2&hatColor=white&lashes=false&lipColor=green&mask=false&mouth=tongue&skinTone=light",
  "https://bigheads.io/svg?accessory=shades&body=chest&circleColor=blue&clothing=dressShirt&clothingColor=black&eyebrows=serious&eyes=dizzy&faceMask=true&faceMaskColor=green&facialHair=none2&graphic=none&hair=short&hairColor=black&hat=beanie&hatColor=blue&lashes=true&lipColor=green&mask=true&mouth=sad&skinTone=light"
];
module.exports = (r = Math.floor(Math.random() * 6)) => list[r];