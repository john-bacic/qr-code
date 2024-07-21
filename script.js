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
  qrCodeDiv.innerHTML = qr.createImgTag(10) // 10 is the scale factor, adjust as needed

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

  if (message) {
    new Typed('#scanned-message', {
      strings: [message],
      typeSpeed: 50,
      showCursor: false,
      onComplete: (self) => {
        // Optional: Add any actions you want to perform after the animation is complete
      },
    })
  } else {
    scannedMessage.textContent = 'No message found.'
  }
}

// Call this function when the message.html page loads
window.onload = displayMessage
