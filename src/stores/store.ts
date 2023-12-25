import { reactive } from 'vue';

interface AppState {
  selectedRadio: string;
  htmlInput: string;
  livePreview: string;
}

export const appState = reactive<AppState>({
  selectedRadio: '',
  htmlInput: '',
  livePreview: '',
});