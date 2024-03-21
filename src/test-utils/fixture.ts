import { test as base } from 'vitest'
import { resources } from 'vite-plugin-excalibur-resources/runtime'
import { DevLoader } from '@/loaders/dev'
import { WebAudio } from 'excalibur'

// @ts-ignore - suppress audio warning
WebAudio._UNLOCKED = true

export const test = base.extend<{
  game: ex.Engine<string>
  scene: ex.Scene
  loader: ex.Loader
  clock: ex.TestClock

  useScene: (scene: typeof ex.Scene) => Promise<ex.Scene>
  dispatchKeyEvent: (type: string, key: string) => void
}>({
  game: async ({ loader }, use) => {
    const game = new ex.Engine<string>({
      width: 800,
      height: 600,
      displayMode: ex.DisplayMode.FitScreenAndFill,
      pixelArt: true,
      suppressConsoleBootMessage: true,
      suppressPlayButton: true,
      scenes: {
        _: {
          scene: new ex.Scene(),
          loader,
        },
      },
    })

    // @ts-ignore - for debugging in headful browser
    window.game = game

    await game.start('_', {
      loader,
    } as any)

    await use(game)
    game.dispose()
  },
  scene: async ({ game }, use) => {
    await use(game.currentScene)
  },
  loader: async ({}, use) => {
    const loader = new DevLoader(resources)
    await use(loader)
  },
  useScene: async ({ game, loader }, use) => {
    await use(async (scene: typeof ex.Scene) => {
      game.add('test', scene)
      await game.goToScene('test', { loader })
      return game.currentScene
    })
    await game.goToScene('_')
    game.removeScene('test')
  },
  dispatchKeyEvent: async ({}, use) => {
    await use((type, code) => {
      window.top?.dispatchEvent(new KeyboardEvent(type, { code }))
    })
  },
  clock: async ({ game }, use) => {
    const testClock = game.debug.useTestClock()
    await use(testClock)
    game.debug.useStandardClock()
  },
})

export {
  expect,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  afterEach,
} from 'vitest'

declare module 'vitest' {
  export interface TestContext {
    game: ex.Engine<string>
    scene: ex.Scene
    loader: ex.Loader
    clock: ex.TestClock
    useScene: (scene: typeof ex.Scene) => Promise<ex.Scene>
    dispatchKeyEvent: (type: string, key: string) => void
  }
}
