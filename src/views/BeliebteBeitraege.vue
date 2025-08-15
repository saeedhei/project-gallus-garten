<script setup lang="ts">
import { ref, onMounted } from 'vue';
import postsData from '@/assets/data/posts.json';

interface Post {
  id: number;
  name: string;
  description: string;
  images: string[];
  category: string;
}

const posts = ref<Post[]>([]);

onMounted(() => {
  // Filter for category = 'beliebt'
  posts.value = postsData.filter((post: Post) => post.category === 'beliebt');
});
</script>

<template>
  <div class="flex flex-col text-center py-16 px-4 lg:px-16 md:px-8 xl:px-24 xxl:px-40">
    <div class="px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8" id="blog-posts">
      <div class="max-w-screen-xl mx-auto">
        <div class="xl:flex">
          <div>
            <h3 class="leading-none font-black text-3xl">Beliebte Beiträge</h3>
            <div class="flex flex-col items-center lg:flex-row lg:items-stretch lg:justify-around">
              <router-link
                v-for="post in posts"
                :key="post.id"
                :to="`/beitraege/${post.id}`"
                class="flex w-full max-w-sm mt-6 lg:mt-8 xl:mr-8"
              >
                <div
                  class="transition-all duration-300 cursor-pointer w-full shadow-lg hover:shadow-xl rounded-lg bg-gray-100 relative"
                >
                  <div
                    class="w-full h-48 rounded-t-lg"
                    :style="`
                      background-image: url('${post.images[0]}');
                      background-size: cover;
                      background-repeat: no-repeat;
                      background-position: center;
                    `"
                  ></div>
                  <div class="p-6">
                    <div class="text-lg font-bold">{{ post.name }}</div>
                    <div class="mt-2 text-gray-900 text-sm">
                      {{ post.description }}
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <div class="mt-12 xl:mt-0 xl:ml-8">
            <h3 class="leading-none font-black text-3xl">kürzliche Posts</h3>
            <div
              class="flex flex-col items-center lg:flex-row lg:items-stretch lg:justify-around xl:flex-col"
            >
              <router-link :to="`/beitraege/4`" class="flex w-full max-w-sm mt-6 lg:mt-8">
                <div
                  class="transition-all duration-300 cursor-pointer w-full shadow-lg hover:shadow-xl rounded-lg bg-gray-100 relative xl:flex xl:flex-row-reverse xl:items-center xl:px-6 xl:py-8"
                >
                  <div
                    class="w-full h-48 bg-cover rounded-t-lg xl:w-32 xl:h-20 xl:rounded-lg xl:ml-2"
                    style="background-image: url('/images/beliebte-beitrag/4-1.jpg')"
                  ></div>
                  <div class="p-6 xl:p-0">
                    <div class="text-lg font-bold">
                      Ernte in Gefahr: Schädlinge vernichten erneut Dr. Rahims Kartoffelpflanzen
                    </div>
                    <div class="mt-2 text-gray-900 text-sm xl:hidden">
                      Bedauerlich: erneut sind die Kartoffelpflanzen von Doktor Rahim von
                      Schädlingen abgefressen worden. Ohne Blätter können die Kartoffeln keine
                      Energie sammeln und groß werden.
                    </div>
                  </div>
                </div>
              </router-link>

              <router-link :to="`/beitraege/5`" class="flex w-full max-w-sm mt-6 lg:mt-8">
                <div
                  class="transition-all duration-300 cursor-pointer w-full shadow-lg hover:shadow-xl rounded-lg bg-gray-100 relative xl:flex xl:flex-row-reverse xl:items-center xl:px-6 xl:py-8"
                >
                  <div
                    class="w-full h-48 bg-cover rounded-t-lg xl:w-32 xl:h-20 xl:rounded-lg xl:ml-2"
                    style="background-image: url('/images/beliebte-beitrag/5-1.jpg')"
                  ></div>
                  <div class="p-6 xl:p-0">
                    <div class="text-lg font-bold">
                      Gallus Garten: Ein Treffpunkt für Begegnung, Ruhe und Gemeinschaft
                    </div>
                    <div class="mt-2 text-gray-900 text-sm xl:hidden">
                      Der Gallus Garten, Galluswarte als sozialer Ort der Begegnung und das
                      Miteinander. Am 7. August lernte ich diese Gruppe von jungen indischen
                      Studenten kennen. Sie wohnen in der Nähe in einer Wohngemeinschaft und wollten
                      bei dieser Hitze am Abend an der frischen Luft, ohne Baustellenlärm,
                      zusammensetzen.Unsere zwölf Stämme sind für ein solches Beisammensein, ein
                      Sitzplatz mit hoher Aufenthaltsqualität.
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
