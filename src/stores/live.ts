<<<<<<< HEAD
import { defineStore } from 'pinia'

// Define the type for your store state
interface StringState {
  livestring: string
=======
import { defineStore } from 'pinia';

// Define the type for your store state
interface StringState {
  livestring: string;
>>>>>>> 182cd04a80d1dfe6147e1cdd64ccade794a2f5b5
}

export const useLiveStore = defineStore({
  id: 'live',
  // Define the type for your state
  state: (): StringState => ({
<<<<<<< HEAD
    livestring: 'Hi'
=======
    livestring: 'Hi',
>>>>>>> 182cd04a80d1dfe6147e1cdd64ccade794a2f5b5
  }),
  // Define the actions for your store
  actions: {
    // Define the type for the argument of the action
    updateString(newString: string) {
      // Use TypeScript assertion for safety
<<<<<<< HEAD
      this.livestring = newString
    }
  }
})
=======
      this.livestring = newString;
    },
  },
});



>>>>>>> 182cd04a80d1dfe6147e1cdd64ccade794a2f5b5
