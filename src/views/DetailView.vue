<template>
  <div class="row mt-5 mb-5">
    <div class="col-md-6 col-12 mx-auto">
      <card-component
        @catch="catchPokemon"
        :name="route.params.name"
        :is-detail="true"
        :moves="detail.moves"
        :types="detail.types"
        :img="detail.sprites.front_default"
      />
    </div>
  </div>
</template>

<script setup>
import CardComponent from '../components/CardComponent.vue';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { usePokemonStore } from '../stores/pokemon';

const pokemonStore = usePokemonStore()

const detail = ref({
  sprites: {
    front_default: ''
  }
})

const route = useRoute()

const getDetail = () => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.name}`)
    .then(response => {
      detail.value = response.data
    })
    .catch(err => {
      console.error('Error fetching Pokémon image:', err)
      return ''
    })
}

const catchPokemon = () => {
  axios.post('http://localhost:8080/api/pokemon/catch')
    .then(() => {
      let nickname = prompt("Please enter your pokemon nickname:");
      if(nickname.length > 0) {
        const data = {
          name: route.params.name,
          url: `https://pokeapi.co/api/v2/pokemon/${route.params.name}`,
          img: detail.value.sprites.front_default,
          nickname: nickname,
          renameCount: 0
        }
  
        pokemonStore.setPokemonList(data)

        alert('Yay, you got a '+route.params.name+'!')
      }
    })
    .catch(err => {
      alert(err.response.data)
    })
}

onMounted(() => {
  getDetail()
})
</script>