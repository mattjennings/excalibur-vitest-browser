import { test, expect, beforeEach, describe } from '@/test-utils/fixture'
import Player from './player'
import { waitFor } from '@/test-utils/wait'

const player = new Player(100, 100)
class TestScene extends ex.Scene {
  onInitialize(): void {
    this.add(player)
  }
}

beforeEach(async ({ useScene }) => {
  await useScene(TestScene)
})

test('is added to scene', async ({ scene }) => {
  expect(scene.actors).toContain(player)
})

test('can move right', async ({ game, dispatchKeyEvent }) => {
  dispatchKeyEvent('keydown', 'ArrowRight')

  await waitFor(() => {
    return player.pos.x >= 102
  })

  dispatchKeyEvent('keyup', 'ArrowRight')
})

describe('using debug clock', () => {
  test('can move right using debug clock', async ({
    clock,
    dispatchKeyEvent,
  }) => {
    dispatchKeyEvent('keydown', 'ArrowRight')

    clock.step(100)

    expect(player.pos.x).toBe(106)

    dispatchKeyEvent('keyup', 'ArrowRight')
  })
})
