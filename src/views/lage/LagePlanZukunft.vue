<template>
  <div ref="canvasContainer" class="canvas-box"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Konva from 'konva';

const canvasContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!canvasContainer.value) return;

  const stage = new Konva.Stage({
    container: canvasContainer.value,
    width: 400,
    height: 350,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  // Draw custom trapezoid shape using ctx.beginPath()
  const trapezoid = new Konva.Shape({
    sceneFunc: (ctx, shape) => {
      ctx.beginPath();

      // Custom 4-point polygon
      ctx.moveTo(200, 100); // Point 1
      ctx.lineTo(350, 100); // Less slope side
      ctx.lineTo(400, 200); // More slope side
      ctx.lineTo(100, 200); // Back to bottom-left
      ctx.closePath();

      ctx.fillStrokeShape(shape);
    },
    fill: 'lightblue',
    stroke: 'black',
    strokeWidth: 2,
  });

  layer.add(trapezoid);
  layer.draw();
});
</script>

<style scoped>
.canvas-box {
  width: 500px;
  height: 400px;
  border: 1px solid #ccc;
}
</style>
