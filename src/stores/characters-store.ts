import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { BaseResponse } from 'src/interface/BaseResponse.interface';
import { ICharacter, ICharacterStore } from 'src/interface/Character.interface';

export const characterStore = defineStore('characters', {
  state: (): ICharacterStore => ({
    characterList: [],
    favoritesCharacters: [],
    selectedCharacter: undefined
  }),
  getters: {
    isFavorite: (state) => {
      return (character) => !!state.favoritesCharacters.find(e => e.id === character.id);
    }
  },
  actions: {
    async getCharacters(gender?: string){
      try {
        const params = {
          gender
        };
        if (gender === 'all') {
          params.gender = ''
        }
        const { data } = await api.get<BaseResponse<ICharacter[]>>('/character', { params });
        this.characterList = data.results;
      } catch (error) {
        console.log(error);

      }
    },
    addFavorite(character: ICharacter){
      this.favoritesCharacters.push(character)
    },
    deleteFavorite(character: ICharacter){
      this.favoritesCharacters = this.favoritesCharacters.filter(e => e.id !== character.id);
    },
    getFavorites(){
      this.characterList = this.favoritesCharacters;
    }
  },
});
