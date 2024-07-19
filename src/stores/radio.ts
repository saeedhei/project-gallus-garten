import { defineStore } from 'pinia'

// Define the type for your store state
interface RadioState {
  radiostring: string
}

export const useRadioStore = defineStore({
  id: 'radio',
  // Define the type for your state
  state: (): RadioState => ({
    radiostring: 'option1'
  }),
  // Define the actions for your store
  actions: {
    // Define the type for the argument of the action
    updateString(newString: string) {
      // Use TypeScript assertion for safety
      this.radiostring = newString
    }
  }
})
