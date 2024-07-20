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

// function focusTextarea() {
//   const textarea = document.getElementById('message')

//   // Create a temporary input field
//   const temp = document.createElement('input')
//   temp.style.position = 'absolute'
//   temp.style.top = '-1000px'
//   temp.style.left = '-1000px'
//   document.body.appendChild(temp)

//   // Focus the temporary input
//   temp.focus()

//   // Remove the temporary input and focus the textarea
//   setTimeout(() => {
//     document.body.removeChild(temp)
//     textarea.focus()
//     // Scroll to the textarea to ensure it's in view
//     textarea.scrollIntoView()
//   }, 100)

//   // For iOS devices, we can try setting the cursor position
//   if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
//     textarea.selectionStart = textarea.selectionEnd = textarea.value.length
//   }
// }

// // Call the function when the page loads
// window.onload = focusTextarea
