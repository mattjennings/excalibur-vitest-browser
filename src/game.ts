import { loader } from './loader'
import './style.css'

// load all scenes from ./scenes directory
const scenes = import.meta.glob('./scenes/**/*.ts', { eager: true }) as Record<
  string,
  { default: typeof ex.Scene }
>

export const game = new ex.Engine<string>({
  width: 800,
  height: 600,
  displayMode: ex.DisplayMode.FitScreen,
  pixelArt: true,
  scenes: Object.entries(scenes).reduce((acc, [key, scene]) => {
    const name = key.split('/scenes/')[1].split('.ts')[0]

    return {
      ...acc,
      [name]: {
        scene: scene.default,
        loader,
      },
    }
  }, {}),
})
