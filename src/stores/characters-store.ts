import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { BaseResponse } from 'src/interface/BaseResponse.interface';
import { ICharacter, ICharacterStore, IFilter} from 'src/interface/Character.interface';

export const characterStore = defineStore('characters', {
  state: (): ICharacterStore => ({
    characterList: [],
    favoritesCharacters: [],
    selectedCharacter: undefined,
    selectedFilters: {
      name: '',
      status: 'alive',
      species: '',
      type: '',
      gender: 'all'
    }
  }),
  getters: {
    isFavorite: (state) => {
      return (character: ICharacter) => !!state.favoritesCharacters.find(e => e.id === character.id);
    }
  },
  actions: {
    async getCharacters(params?: IFilter){
      try {
        if (params && params.gender === 'all') {
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
