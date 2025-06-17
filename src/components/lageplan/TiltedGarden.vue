<!-- cspell:disable -->
<template>
  <v-shape
    :config="{
      sceneFunc,
      fill: '#98fb98',
      stroke: '#2e8b57',
      strokeWidth: 8,
      x,
      y,
    }"
  />
</template>

<script setup lang="ts">
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

const props = defineProps({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  width: { type: Number, default: 500 },
  height: { type: Number, default: 200 },
  topWidth: { type: Number, default: 300 },
  slantDirection: { type: String as () => 'left' | 'right', default: 'right' },
})

const angleRad = (65 * Math.PI) / 180
const offset = props.height / Math.tan(angleRad)

const sceneFunc = (ctx: Context, shape: Shape) => {
  const { width, height, topWidth, slantDirection } = props

  const startX = (width - topWidth) / 2
  const slantOffset = slantDirection === 'right' ? offset : -offset

  ctx.beginPath()
  // Top-left
  ctx.moveTo(startX, 0)
  // Top-right
  ctx.lineTo(startX + topWidth, 0)
  // Bottom-right (slanted)
  ctx.lineTo(startX + topWidth + slantOffset, height)
  // Bottom-left (slanted in SAME direction)
  ctx.lineTo(startX + slantOffset, height)
  ctx.closePath()

  ctx.fillStrokeShape(shape)
}
</script>
<!-- <template>
  <v-shape
    :config="{
      sceneFunc,
      fill: '#98fb98',
      stroke: '#2e8b57',
      strokeWidth: 4,
      x,
      y,
    }"
  />
</template>

<script setup lang="ts">
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

const props = defineProps({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  width: { type: Number, default: 500 }, // Total width including the angled sides
  height: { type: Number, default: 200 },
  topWidth: { type: Number, default: 300 }, // Width of the top parallel side
})

// Calculate the correct offset for 65° angle
const angleRad = (65 * Math.PI) / 180
const offset = props.height / Math.tan(angleRad)

const sceneFunc = (ctx: Context, shape: Shape) => {
  const { width, height, topWidth } = props

  // Calculate starting points to center the trapezoid
  const startX = (width - topWidth) / 2

  ctx.beginPath()
  // Top-left point
  ctx.moveTo(startX, 0)
  // Top-right point
  ctx.lineTo(startX + topWidth, 0)
  // Bottom-right point (angled inward)
  ctx.lineTo(startX + topWidth + offset, height)
  // Bottom-left point (angled inward)
  ctx.lineTo(startX - offset, height)
  ctx.closePath()

  ctx.fillStrokeShape(shape)
}
</script> -->
