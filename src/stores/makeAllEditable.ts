let htmlInput: HTMLInputElement | null
let livePreview: HTMLElement | null

document.addEventListener('DOMContentLoaded', function () {
  // Code to run when the DOM is ready
  livePreview = document.getElementById('live')
  htmlInput = document.getElementById('html-input') as HTMLInputElement | null

  // Check if livePreview is not null before using it
  if (livePreview !== null) {
    makeAllEditable()
  } else {
    console.error("Element with id 'live' not found in the DOM.")
  }
})

// Function to make all elements editable
export function makeAllEditable() {
  const editableElements = document.querySelectorAll('[contenteditable="true"]')
  editableElements.forEach((element) => {
    makeEditable(element)
  })
}

// Function to make an element editable
function makeEditable(element: Element) {
  element.addEventListener('input', editAndSaveToLocalStorage)
}

function editAndSaveToLocalStorage() {
  if (livePreview !== null) {
    if (htmlInput !== null) {
      htmlInput.value = livePreview?.innerHTML ?? ''
      const inputValue = htmlInput.value
      localStorage.setItem('localLivePreviewValue', inputValue)
    } else {
      console.error("Element with id 'htmlInput' is null.")
    }
  } else {
    console.error("Element with id 'live' is null.")
  }
}
