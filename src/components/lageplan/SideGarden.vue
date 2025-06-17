<!-- cspell:disable -->#696969
<template>
  <v-group :config="{ x, y }">
    <!-- Trapezoidal walking path -->
    <v-rect
      :config="{
        x: 0,
        y: 0,
        width,
        height: pathHeight,
        fill: pathColor,
        stroke: '#696969', // dark gray stroke
        strokeWidth: 8,
        sceneFunc: pathFunc,
      }"
    />
  </v-group>
</template>

<script setup lang="ts">
import type { Context } from 'konva/lib/Context'
import type { Shape } from 'konva/lib/Shape'

const props = defineProps({
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  width: { type: Number, default: 11000 },
  pathHeight: { type: Number, default: 150 },
  pathColor: { type: String, default: '#53392d' }, // fill color
})

// 65° in radians
const angleRad = (65 * Math.PI) / 180

const pathFunc = (ctx: Context, shape: Shape) => {
  const w = props.width
  const h = props.pathHeight
  const offset = h / Math.tan(angleRad)

  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(w, 0)
  ctx.lineTo(w + offset, h)
  ctx.lineTo(offset, h)
  ctx.closePath()

  ctx.fillStrokeShape(shape)
}
</script>
