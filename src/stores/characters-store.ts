import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { BaseResponse } from 'src/interface/BaseResponse.interface';
import { ICharacter, ICharacterStore, IFilter} from 'src/interface/Character.interface';

export const characterStore = defineStore('characters', {
  state: (): ICharacterStore => ({
    characterList: [],
    randomCharacterList: [],
    favoritesCharacters: [],
    selectedFilters: {
      name: '',
      status: '',
      species: '',
      type: '',
      gender: ''
    },
    showFavorites: false
  }),
  getters: {
    isFavorite: (state) => {
      return (character: ICharacter) => !!state.favoritesCharacters.find(e => e.id === character.id);
    },
    getSelectedFilters: (state: ICharacterStore) => {
      const keys = Object.keys(state.selectedFilters).filter((key) => state.selectedFilters[key as keyof IFilter] !== '' && state.selectedFilters[key as keyof IFilter] !== 'all');
      return keys.map(key => key.charAt(0).toUpperCase() + key.slice(1)).join(', ').replace('"', '');
    }
  },
  actions: {
    async getCharacters(){
      const params: IFilter = this.selectedFilters;
      try {
        this.showFavorites = false;
        if (params && params.gender === 'all') {
          params.gender = ''
        }
        const { data } = await api.get<BaseResponse<ICharacter[]>>('/character', { params });
        this.characterList = data.results;
      } catch (error: any) {
        if (error.response?.status === 404) {
          this.router.push('no-data');
        }

      }
    },
    async getRandomCharacters() {
      try {
        const min = 1;
        const max = 183;
        const first = Math.floor(Math.random() * (max - min + 1)) + min;
        const second = Math.floor(Math.random() * (max - min + 1)) + min;

        const { data } = await api.get<ICharacter[]>(`/character/${first},${second}`);

        this.randomCharacterList = data;
      } catch (error: any) {
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

      if (this.characterList.length === 0) {
        this.router.push('no-data');
      }
    },
    restoreFilters(){
      this.selectedFilters = {
        gender: '',
        name: '',
        species: '',
        status: '',
        type: ''
      }
    }
  },
});
