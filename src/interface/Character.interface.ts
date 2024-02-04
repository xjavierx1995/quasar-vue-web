export interface ICharacterStore {
  characterList: ICharacter[];
  selectedCharacter: ICharacter | undefined;
  favoritesCharacters: ICharacter[];
  selectedFilters: IFilter;
  showFavorites: boolean;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: IOrigin;
  location: IOrigin;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface IOrigin {
  name: string;
  url: string;
}

export interface IFilter {
  name: string;
  status: 'alive' | 'dead' | 'unknown' | '';
  species: string;
  type: string;
  gender: 'female' | 'male' | 'genderless' | 'unknown' | 'all' | '';
}
