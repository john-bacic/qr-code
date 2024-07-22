document.addEventListener('DOMContentLoaded', function () {
  const quickReplyButtons = document.querySelectorAll('.quick-reply')
  const messageTextarea = document.getElementById('message')
  const qrCodeButton = document.querySelector("button[onclick='generateQR()']")
  const newMessageButton = document.getElementById('new-message')

  function getRandomRotation() {
    return Math.floor(Math.random() * 7) - 3 // Generates a number between -3 and 3
  }

  function applyRandomRotation(button) {
    const rotationAngle = getRandomRotation()
    button.style.transform = `rotate(${rotationAngle}deg)`
  }

  quickReplyButtons.forEach((button) => {
    applyRandomRotation(button)

    function handleQuickReply(event) {
      const button = event.currentTarget
      const text = button.getAttribute('data-text')
      messageTextarea.value = text
    }

    button.addEventListener('click', handleQuickReply)
    button.addEventListener('touchend', handleQuickReply)
  })

  if (qrCodeButton) {
    applyRandomRotation(qrCodeButton)
  }

  if (newMessageButton) {
    applyRandomRotation(newMessageButton)
  }
})

function generateQR() {
  const message = document.getElementById('message').value
  if (!message.trim()) {
    alert('Write something!')
    return
  }

  const currentURL = window.location.href.split('/').slice(0, -1).join('/')
  const messageURL = `${currentURL}/message.html?message=${encodeURIComponent(
    message
  )}`

  const qr = qrcode(0, 'L')
  qr.addData(messageURL)
  qr.make()

  const qrCodeDiv = document.getElementById('qr-code')

  // Create a canvas element
  const canvas = document.createElement('canvas')
  const size = qr.getModuleCount() * 10 // 10 is the scale factor
  canvas.width = size
  canvas.height = size

  // Get the canvas context and make it transparent
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, size, size)

  // Draw the QR code on the canvas
  for (let row = 0; row < qr.getModuleCount(); row++) {
    for (let col = 0; col < qr.getModuleCount(); col++) {
      if (qr.isDark(row, col)) {
        ctx.fillStyle = 'black'
        ctx.fillRect(col * 10, row * 10, 10, 10)
      }
    }
  }

  // Convert the canvas to an image
  const img = document.createElement('img')
  img.src = canvas.toDataURL('image/png')
  img.alt = 'QR Code'

  // Clear previous content and add the new image
  qrCodeDiv.innerHTML = ''
  qrCodeDiv.appendChild(img)

  // Hide the message input and show the New Message button
  document.getElementById('message-input').style.display = 'none'
  document.getElementById('new-message').style.display = 'inline-block'

  // Hide the replyContainer
  document.getElementById('replyContainer').style.display = 'none'
}

function newMessage() {
  // Show the message input and hide the New Message button
  document.getElementById('message-input').style.display = 'block'
  document.getElementById('new-message').style.display = 'none'
  document.getElementById('qr-code').innerHTML = ''
  document.getElementById('message').value = ''

  // Show the replyContainer
  document.getElementById('replyContainer').style.display = 'block'
}

function displayMessage() {
  const urlParams = new URLSearchParams(window.location.search)
  const message = urlParams.get('message')
  const scannedMessage = document.getElementById('scanned-message')
  const replyButton = document.querySelector('.reply-button')

  // Hide the reply button initially
  if (replyButton) {
    replyButton.classList.add('hidden')
  }

  // Configuration for Typed.js
  const typedConfig = {
    typeSpeed: 50,
    showCursor: false,
    onComplete: (self) => {
      // Show the reply button after animation is complete
      if (replyButton) {
        const randomRotation = Math.random() * 6 - 3
        replyButton.style.setProperty(
          '--random-rotation',
          `${randomRotation}deg`
        )
        replyButton.classList.remove('hidden')

        // Apply final rotation after animations complete
        replyButton.addEventListener(
          'animationend',
          () => {
            replyButton.style.transform = `rotate(${randomRotation}deg)`
          },
          { once: true }
        )
      }
    },
  }

  if (message) {
    new Typed('#scanned-message', {
      ...typedConfig,
      strings: [message],
    })
  } else {
    new Typed('#scanned-message', {
      ...typedConfig,
      strings: ['No message found.'],
    })
  }
}

function applyRandomRotation() {
  const buttons = document.querySelectorAll('button:not(#openCamera)')
  buttons.forEach((button) => {
    const randomRotation = Math.random() * 6 - 3 // Random number between -3 and 3
    if (button.classList.contains('new-message-btn')) {
      button.style.transform = `translateX(-50%) rotate(${randomRotation}deg)`
    } else {
      button.style.transform = `rotate(${randomRotation}deg)`
    }
  })
}

function applyRandomRotationToMessageContainer() {
  const container = document.getElementById('message-container')
  if (container) {
    const randomRotation = Math.random() * 6 - 3 // Random number between -2 and 2
    container.style.transform = `rotate(${randomRotation}deg)`
  }
}

function setupReplyButtons() {
  const replyButtons = document.querySelectorAll('#replyContainer .quick-reply')
  const messageInput = document.getElementById('message')

  replyButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const text = this.getAttribute('data-text')
      messageInput.value = text

      // Trigger input event to simulate user typing
      const event = new Event('input', { bubbles: true })
      messageInput.dispatchEvent(event)
    })
  })
}

// Combine all onload functions
window.onload = function () {
  displayMessage()
  applyRandomRotationToMessageContainer()
  applyRandomRotation()
  setupCameraButton()
  setupReplyButtons() // Add this line
}

document.addEventListener('DOMContentLoaded', function () {
  const openCameraButton = document.getElementById('openCamera')

  openCameraButton.addEventListener('click', function () {
    window.location.href = 'camera.html'
  })
})

// Modify your window.onload function to include setupCameraButton
// window.onload = function () {
//   displayMessage()
//   applyRandomRotationToMessageContainer()
//   applyRandomRotation()
//   setupCameraButton()
// }
