import { reactive } from 'vue';

interface AppState {
  selectedRadio: string;
}

export const appState = reactive<AppState>({
  selectedRadio: '',
});