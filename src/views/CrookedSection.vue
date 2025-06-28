<template>
  <div class="crooked-section">
    <div class="content">
      <!-- <h2>Crooked Section</h2> -->
    </div>
  </div>
</template>

<style scoped>
.crooked-section {
  position: relative;
  /* Change the background color to make the skew effect visible */
  /* background-color: #333;  */
  padding: 20px 0;
}

.crooked-section:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 30%, 0 100%);
  background-color: white; /* Same as the page background color */
}

.content {
  padding: 20px;
  transform: skewY(-5deg); /* Counteract the skew for the content */
  transform-origin: 0;
}

.content h2 {
  transform: skewY(5deg); /* Counteract the skew for the text */
}
</style>
