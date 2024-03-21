import { test, expect, beforeEach, describe } from '@/test-utils/fixture'
import Player from './player'
import { waitFor } from '@/test-utils/wait'

let player: Player

class TestScene extends ex.Scene {
  onInitialize(): void {
    player = new Player(100, 100)
    this.add(player)
  }
}

beforeEach(async ({ useScene }) => {
  await useScene(TestScene)
})

test('is added to scene', async ({ scene }) => {
  expect(scene.actors).toContain(player)
})

test('can move right', async ({ clock, dispatchKeyEvent }) => {
  dispatchKeyEvent('keydown', 'ArrowRight')

  clock.step(100)

  expect(player.pos.x).toBe(102)
})

test('can move left', async ({ clock, dispatchKeyEvent }) => {
  dispatchKeyEvent('keydown', 'ArrowLeft')

  clock.step(100)

  expect(player.pos.x).toBe(98)
})
