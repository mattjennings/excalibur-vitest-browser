import { game } from './game'
import { loader } from './loader'

const INITIAL_SCENE = 'level1'

game.start(INITIAL_SCENE, {
  loader,
  inTransition: new ex.FadeInOut({
    duration: 200,
    direction: 'in',
    color: ex.Color.ExcaliburBlue,
  }),
})
