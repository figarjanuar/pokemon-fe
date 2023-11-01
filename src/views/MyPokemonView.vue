<script setup>
import axios from 'axios';
import CardComponent from '../components/CardComponent.vue'
import { usePokemonStore } from '../stores/pokemon';

const name = 'My Pokemon'
const pokemonStore = usePokemonStore()

const release = (index) => {
  console.log(index);
  axios.post('http://localhost:8080/api/pokemon/release')
    .then(() => {
      pokemonStore.releasePokemon(index)
    })
    .catch(() => {
      alert('Oops! The Pokemon wont go away.')
    })
}

const rename = ((nickname, count, index) => {
  axios.post('http://localhost:8080/api/pokemon/rename', {
    name: nickname,
    count: count
  })
    .then(res => {
      pokemonStore.renameNickname(index, res.data)
      alert('Rename Success!')
    })
})

</script>

<template>
  <div class="row">
    <div class="col-12">
      <h1 class="text-center m-5">{{ name }}</h1>
    </div>
  </div>

  <div v-if="pokemonStore.pokemonList" class="row">
    <div
      v-for="(item, index) in pokemonStore.pokemonList"
      :key="index"
      class="col-md-3 col-12 mb-3">
      <card-component
        @rename="rename(item.nickname, item.renameCount, index)"
        @release="release(index)"
        :is-mine="true"
        :name="item.name"
        :nickname="item.nickname"
        :img="item.img" />
    </div>
  </div>
</template>

<style scoped>
  .btn-wrapper {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
</style>

