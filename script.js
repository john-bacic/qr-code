function generateQR() {
  const message = document.getElementById('message').value
  if (!message.trim()) {
    alert('Please enter a message.')
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
}

function newMessage() {
  // Show the message input and hide the New Message button
  document.getElementById('message-input').style.display = 'block'
  document.getElementById('new-message').style.display = 'none'
  document.getElementById('qr-code').innerHTML = ''
  document.getElementById('message').value = ''
}

function displayMessage() {
  const urlParams = new URLSearchParams(window.location.search)
  const message = urlParams.get('message')
  const scannedMessage = document.getElementById('scanned-message')

  // Configuration for Typed.js
  const typedConfig = {
    typeSpeed: 50,
    showCursor: false,
    onComplete: (self) => {
      // Optional: Add any actions you want to perform after the animation is complete
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
  const buttons = document.querySelectorAll('button')
  buttons.forEach((button) => {
    const randomRotation = Math.random() * 6 - 3 // Random number between -3 and 3
    if (button.classList.contains('new-message-btn')) {
      button.style.transform = `translateX(-50%) rotate(${randomRotation}deg)`
    } else {
      button.style.transform = `rotate(${randomRotation}deg)`
    }
  })
}

// Apply rotation when the page loads
window.addEventListener('load', applyRandomRotation)

// Call this function when the message.html page loads
window.onload = displayMessage
