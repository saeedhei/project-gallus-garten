<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Post {
  name: string
  description: string
  image: string
  category: string
}

const posts = ref<Post[]>([])

const fetchProducts = async () => {
  try {
    const response = await fetch('/data/posts.json')
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    const data = await response.json()
    // products.value = data;
    posts.value = data.filter((post: Post) => post.category === 'popular')
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div
    class="bg-emerald-200 flex flex-col text-center py-16 px-4 lg:px-16 md:px-8 xl:px-24 xxl:px-40"
  >
    <div class="bg-emerald-200 px-5 sm:px-10 md:px-20 lg:px-10 xl:px-20 py-8" id="blog-posts">
      <div class="max-w-screen-xl mx-auto">
        <div class="xl:flex">
          <div>
            <h3 class="leading-none font-black text-3xl">Beliebte Beiträge</h3>
            <div class="flex flex-col items-center lg:flex-row lg:items-stretch lg:justify-around">
              <a
                href="https://owaiskhan.me"
                class="flex w-full max-w-sm mt-6 lg:mt-8 xl:mr-8"
                v-for="(post, index) in posts"
                :key="index"
              >
                <div
                  class="transition-all duration-300 cursor-pointer w-full shadow-lg hover:shadow-xl rounded-lg bg-gray-100 relative"
                >
                  <div
                    class="w-full h-48 bg-cover rounded-t-lg"
                    :style="`background-image: url('${post.image}')`"
                  ></div>
                  <div class="p-6">
                    <div class="text-lg font-bold">{{ post.name }}</div>
                    <div class="mt-2 text-gray-900 text-sm">
                      {{ post.description }}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="mt-12 xl:mt-0 xl:ml-8">
            <h3 class="leading-none font-black text-3xl">kürzliche Posts</h3>
            <div
              class="flex flex-col items-center lg:flex-row lg:items-stretch lg:justify-around xl:flex-col"
            >
              <a href="https://owaiskhan.me" class="flex w-full max-w-sm mt-6 lg:mt-8">
                <div
                  class="transition-all duration-300 cursor-pointer w-full shadow-lg hover:shadow-xl rounded-lg bg-gray-100 relative xl:flex xl:flex-row-reverse xl:items-center xl:px-6 xl:py-8"
                >
                  <div
                    class="w-full h-48 bg-cover rounded-t-lg xl:w-32 xl:h-20 xl:rounded-lg xl:ml-2"
                    style="background-image: url('/gallus-garten/images/projects/digital.jpg')"
                  ></div>
                  <div class="p-6 xl:p-0">
                    <div class="text-lg font-bold">
                      Erfolgreiche Balkongärtnerei: Tipps für grüne Oasen
                    </div>
                    <div class="mt-2 text-gray-900 text-sm xl:hidden">
                      Hiring a freelancer for your new project can be challenging if you've never
                      done before. Learn some tips that will allow you to have a better experience
                      working with freelancers
                    </div>
                  </div>
                </div>
              </a>

              <a href="https://owaiskhan.me" class="flex w-full max-w-sm mt-6 lg:mt-8">
                <div
                  class="transition-all duration-300 cursor-pointer w-full shadow-lg hover:shadow-xl rounded-lg bg-gray-100 relative xl:flex xl:flex-row-reverse xl:items-center xl:px-6 xl:py-8"
                >
                  <div
                    class="w-full h-48 bg-cover rounded-t-lg xl:w-32 xl:h-20 xl:rounded-lg xl:ml-2"
                    style="background-image: url('/gallus-garten/images/projects/a.jpg')"
                  ></div>
                  <div class="p-6 xl:p-0">
                    <div class="text-lg font-bold">Gestaltung eines meditativen Gartens</div>
                    <div class="mt-2 text-gray-900 text-sm xl:hidden">
                      Animations play a vital role in user experience. This article describes how
                      you can create butter smooth 60 FPS animations easily.
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
