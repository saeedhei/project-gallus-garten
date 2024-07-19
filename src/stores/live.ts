import { defineStore } from 'pinia'

// Define the type for your store state
interface StringState {
  livestring: string
}

export const useLiveStore = defineStore({
  id: 'live',
  // Define the type for your state
  state: (): StringState => ({
    livestring: 'Hi'
  }),
  // Define the actions for your store
  actions: {
    // Define the type for the argument of the action
    updateString(newString: string) {
      // Use TypeScript assertion for safety
      this.livestring = newString
    }
  }
})
