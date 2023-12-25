import { defineStore } from 'pinia';
export const useEventBusStore = defineStore('eventBus', {
    state: () => ({
        sharedData: '',
    }),
    actions: {
        setSharedData(data) {
            this.sharedData = data;
        },
    },
});
