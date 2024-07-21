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

function setupCameraButton() {
  const openCameraButton = document.getElementById('openCamera')
  const cameraInput = document.getElementById('cameraInput')

  openCameraButton.addEventListener('click', function () {
    // Open camera.html in a new window or tab
    window.open('camera.html', '_blank')
  })

  // Keep the file input handler if you still want to support file uploads
  cameraInput.addEventListener('change', function (event) {
    const file = event.target.files[0]
    if (file) {
      // Handle the file (e.g., read QR code from image)
      // Implement this part if needed
    }
  })
}
window.onload = function () {
  setupCameraButton()

  //// camera page

  async function startScanning() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      video.srcObject = stream
      video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
      video.play()
      requestAnimationFrame(tick)
      scanning = true
    } catch (error) {
      console.error('Error accessing the camera:', error)
      alert(
        "Unable to access the camera. Please make sure you've granted the necessary permissions."
      )
    }
  }

  function stopScanning() {
    video.srcObject.getTracks().forEach((track) => track.stop())
    scanning = false
  }

  function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvasElement.height = video.videoHeight
      canvasElement.width = video.videoWidth
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height)
      var imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      )
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      })
      if (code) {
        console.log('Found QR code', code.data)
        handleQRCode(code.data)
        stopScanning()
        return
      }
    }
    if (scanning) {
      requestAnimationFrame(tick)
    }
  }

  function handleQRCode(data) {
    // Assuming the QR code contains a URL to the message page
    window.location.href = data
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const openCameraButton = document.getElementById('openCamera')

  openCameraButton.addEventListener('click', function () {
    window.open('camera.html', '_blank')
  })
})

const closeCameraButton = document.getElementById('closeCamera')

closeCameraButton.addEventListener('click', function () {
  window.location.href = 'index.html'
})

// Modify your window.onload function to include setupCameraButton
window.onload = function () {
  displayMessage()
  applyRandomRotationToMessageContainer()
  applyRandomRotation()
  setupCameraButton()
}
