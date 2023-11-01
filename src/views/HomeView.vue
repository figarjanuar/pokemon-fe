<template>
  <div class="row">
    <div class="col-12">
      <h1 class="text-center m-5">{{ name }}</h1>
    </div>
  </div>

  <div class="row">
    <div
      v-for="(item, index) in list.results"
      :key="index"
      class="col-md-3 col-12 mb-3">
      <card-component :name="item.name" :img="item.img" />
    </div>
  </div>

  <div class="row">
    <div class="col-12 btn-wrapper">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          v-if="list.previous"
          @click="url = list.previous; getPokemon()"
          type="button"
          class="btn btn-primary">Prev</button>
          
        <button
          v-if="list.next"
          @click="url = list.next; getPokemon()"
          type="button"
          class="btn btn-primary">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CardComponent from '../components/CardComponent.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const name = 'Pokemon List'
const url = ref('https://pokeapi.co/api/v2/pokemon')
const list = ref([])

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getPokemon = async () => {
  try {
    const response = await axios.get(url.value)
    list.value = response.data

    const imagePromises = list.value.results.map(async (pokemon) => {
      const imgUrl = await getImage(pokemon.url)
      pokemon.img = imgUrl
    })

    await Promise.all(imagePromises)
    scrollToTop()
  } catch (error) {
    console.error('Error fetching Pokémon data:', error)
  }
}

const getImage = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data.sprites.front_default
  } catch (error) {
    console.error('Error fetching Pokémon image:', error)
    return ''
  }
}

onMounted(() => {
  getPokemon()
})
</script>

<style scoped>
.btn-wrapper {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
