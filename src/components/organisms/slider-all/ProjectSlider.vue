<!-- <template>
    <Swiper :spaceBetween="50" :slidesPerView="3">
      <SwiperSlide v-for="slide in slides" :key="slide">{{ slide }}</SwiperSlide>
    </Swiper>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  
  const slides = ref(['Slide 1', 'Slide 2', 'Slide 3']);
  </script> -->


  <template>
 <Swiper 
    :modules="[]"
    effect=""
    :spaceBetween="30"
    :slidesPerView="1"
    :breakpoints="{
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }"
    :loop="true"

 >

      <SwiperSlide v-for="(post, index) in posts" :key="index">
        <div class="post">
          <h2>{{ post.title }}</h2>
          <p>{{ post.content }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // import { EffectFade } from 'swiper/modules';
  import 'swiper/css';
  // import 'swiper/css/effect-fade';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  
  const posts = ref([
    { title: 'Post 1', content: 'Content for post 1' },
    { title: 'Post 2', content: 'Content for post 2' },
    { title: 'Post 3', content: 'Content for post 3' },
    { title: 'Post 4', content: 'Content for post 4' },
    { title: 'Post 5', content: 'Content for post 5' },
  ]);
  </script>
  
  <style scoped>
  .post {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  </style>
  
  