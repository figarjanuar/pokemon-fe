<template>
  <div class="card">
    <div v-if="isDetail" @click="catchPokemon" class="pokeball">
      <img class="pokeball-img" :src="pokeball" alt="Catch Me!!">
    </div>
    <img :src="mutableImg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title text-capitalize text-center">{{ name }}</h5>
      <h6 class="card-title text-center">{{ nickname }}</h6>

      <div v-if="isDetail" class="detail-wrapper d-flex">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Moves
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <ul>
                  <li v-for="(item, index) in moves" :key="index">
                    {{ item.move.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion" id="typeParent">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingType">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#type" aria-expanded="false" aria-controls="type">
                Type
              </button>
            </h2>
            <div id="type" class="accordion-collapse collapse" aria-labelledby="headingType" data-bs-parent="#typeParent">
              <div class="accordion-body">
                <ul>
                  <li v-for="(item, index) in types" :key="index">
                    {{ item.type.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="btn-wrapper mt-5">
        <router-link
          v-if="!isDetail"
          class="btn btn-primary"
          :to="{ name: 'detail', params: { name: name } }"
        >
          Detail
        </router-link>
  
        <button @click="renamePokemon" v-if="isMine" class="btn btn-success">Rename</button>
  
        <button @click="releasePokemon" v-if="isMine" class="btn btn-warning">Release</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps(['img', 'name', 'isDetail', 'moves', 'types', 'nickname', 'isMine'])

const pokeball = 'https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-17015278258617bdog.png'
const mutableImg = ref(props.img)
const emit = defineEmits(['inFocus', 'submit'])

const catchPokemon = () => {
  emit('catch')
}
const releasePokemon = () => {
  emit('release')
}
const renamePokemon = () => {
  emit('rename')
}

watch(() => props.img, (newVal) => {
  mutableImg.value = newVal
})
</script>

<style>
.card {
  position: relative;
}

.pokeball {
  cursor: pointer;
  position: absolute;
  opacity: 0;
  transition: all ease-in .2s;
}

.pokeball-img {
  width: 100%;
}

.pokeball:hover {
  opacity: 0.5;
}

.detail-wrapper {
  gap: 16px;
  justify-content: space-around;
}

.accordion {
  flex: 1;
}

.btn-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
