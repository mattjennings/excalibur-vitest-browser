import { Engine } from 'excalibur'

const spritesheet = ex.SpriteSheet.fromImageSource({
  image: $res('excalibot.png'),
  grid: {
    columns: 8,
    rows: 1,
    spriteWidth: 32,
    spriteHeight: 32,
  },
})

export default class Player extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      name: 'Bot',
      pos: new ex.Vector(x, y),
    })
  }

  onInitialize() {
    const idle = ex.Animation.fromSpriteSheet(spritesheet, [2, 3], 800)
    idle.scale = new ex.Vector(2, 2)

    this.graphics.add('idle', idle)
    this.graphics.use('idle')
  }

  onPostUpdate(engine: Engine<any>, delta: number): void {
    if (engine.input.keyboard.isHeld(ex.Keys.ArrowRight)) {
      this.pos.x += 2
    }

    if (engine.input.keyboard.isHeld(ex.Keys.ArrowLeft)) {
      this.pos.x -= 2
    }
  }
}
