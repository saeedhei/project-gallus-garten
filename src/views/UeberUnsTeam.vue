<script setup lang="ts">
import { reactive } from "vue";
import CardComponent from "./CardComponent.vue";

// Define the cards data as a reactive object
const cards = reactive([
  {
    id: 1,
    img: new URL("@/assets/img1.avif", import.meta.url).href,
    name: "Ralf Harth",
    title: "Lorem",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat, consectetur? Labore neque suscipit atque voluptatem, corrupti cumque ipsa delectus assumenda nihil fugit rerum nam repudiandae exercitationem maiores magni aut perspiciatis.",
    email: "ralf@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    img: new URL("@/assets/img2.avif", import.meta.url).href,
    name: "Saeed Heidariazarei",
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas enim eaque suscipit dolorum, qui delectus fuga mollitia velit odio laboriosam ut aperiam tempora voluptatum eveniet perferendis iste assumenda non maxime!",
    email: "saeed@example.com",
    phone: "987-654-3210",
  },
  {
    id: 3,
    img: new URL("@/assets/img2.avif", import.meta.url).href,
    name: "Sam Smith",
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis facere accusantium laborum ipsum recusandae, reprehenderit corrupti. Natus magnam officiis asperiores deserunt debitis.",
    email: "sam@example.com",
    phone: "555-555-5555",
  },
  {
    id: 4,
    img: new URL("@/assets/img1.avif", import.meta.url).href,
    name: "Lucy Brown",
    title: "Lorem",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat distinctio",
    email: "lucy@example.com",
    phone: "111-111-1111",
  },
]);
</script>

<template>
  <div
    class="bg-gradient-to-b from-green-200 to-green-300 min-h-screen flex items-center justify-center"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-6">
      <CardComponent
        v-for="card in cards"
        :key="card.id"
        :img="card.img"
        :name="card.name"
        :title="card.title"
        :description="card.description"
        :email="card.email"
        :phone="card.phone"
      />
    </div>
  </div>
</template>
