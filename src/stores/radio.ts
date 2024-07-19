<<<<<<< HEAD
import { defineStore } from 'pinia'

// Define the type for your store state
interface RadioState {
  radiostring: string
=======
import { defineStore } from 'pinia';

// Define the type for your store state
interface RadioState {
  radiostring: string;
>>>>>>> 182cd04a80d1dfe6147e1cdd64ccade794a2f5b5
}

export const useRadioStore = defineStore({
  id: 'radio',
  // Define the type for your state
  state: (): RadioState => ({
<<<<<<< HEAD
    radiostring: 'option1'
=======
    radiostring: 'option1',
>>>>>>> 182cd04a80d1dfe6147e1cdd64ccade794a2f5b5
  }),
  // Define the actions for your store
  actions: {
    // Define the type for the argument of the action
    updateString(newString: string) {
      // Use TypeScript assertion for safety
<<<<<<< HEAD
      this.radiostring = newString
    }
  }
})
=======
      this.radiostring = newString;
    },
  },
});



>>>>>>> 182cd04a80d1dfe6147e1cdd64ccade794a2f5b5
