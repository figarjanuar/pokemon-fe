import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonList: []
  }),
  actions: {
    setPokemonList(data) {
      this.pokemonList.push(data)
    },
    releasePokemon(index) {
      this.pokemonList.splice(index, 1)
    },
    renameNickname(index, newName) {
      this.pokemonList[index].nickname = newName
      this.pokemonList[index].renameCount++
    }
  },
  persist: true,
})

