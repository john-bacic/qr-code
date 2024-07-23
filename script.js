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
      messageTextarea.value = text // Set the textarea to the button's text
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

  // Prevent double-tap to zoom
  document.addEventListener(
    'touchstart',
    function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    },
    { passive: false }
  )

  // Prevent double-tap to zoom by disabling double-click
  let lastTouchEnd = 0
  document.addEventListener(
    'touchend',
    function (event) {
      const now = new Date().getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    false
  )
})
///////////////////////////////

/////////////// RANDOM QUESTION

const questions = [
  "What's the most embarrassing thing that's ever happened to you?",
  'If you could be anyone else for a day, who would you choose?',
  "What's the weirdest food you've ever tried?",
  "What's your favorite TV show or movie these days?",
  'If you could have any superpower, what would it be?',
  "What's the craziest dare you've ever done?",
  'What do you like better sunrise or sunset?',
  "What's your favorite way to spend the weekend?",
  'Ever met a celebrity? Who was it?',
  "What's the worst job you've ever had?",
  'If you could only eat one food forever, what would it be?',
  'What creatures scare you the most?',
  'What was your favorite TV show as a kid?',
  "If you won the lottery, what's the first thing you'd buy?",
  "What's the strangest dream you've ever had?",
  "What's the funniest thing that's happened to you lately?",
  "What's the silliest thing that's ever happened to you?",
  'Have you ever seen a ghost or something spooky?',
  "What's the most fun thing you've ever done without planning?",
  "What's the weirdest thing you've ever eaten for breakfast?",
  'If you could time travel, where would you go?',
  "What's the cutest thing your pet has ever done?",
  'If you could instantly become an expert in something, what would it be?',
  "What's the most unusual thing you've ever collected?",
  "What's the best halloween costume you've ever worn?",
  "What's the most awkward thing that's happened to you on a date?",
  'If you had a time machine, would you first go to the past or the future?',
  'If you could have dinner with anyone, who would it be?',
  "What's the most creative excuse you've ever made up?",
  'If you could only listen to one song for the rest of your life, what would it be?',
  'If you could be famous for one thing, what would it be?',
  "What's the weirdest talent you have?",
  'If you could teleport anywhere right now, where would you go?',
  "What's your favourite colour and why?",
  'If your belly button could talk, what would it say?',
  "What's the goofiest face you can make without using your hands?",
  'If you were a vegetable, which one would you be and why?',
  "What's the silliest thing you've ever said to your teacher by accident?",
  "If your pet could suddenly speak, what's the first thing they'd probably say?",
  "What's the weirdest place you've ever fallen asleep?",
  'If you could rename yourself, what ridiculous name would you choose?',
  "What's the most bizarre way you've ever tried to get out of doing homework?",
  'If you could swap bodies with any animal for a day, which one would it be?',
  "What's the funniest way you've ever tried to get your parents' attention?",
  'If your shoes could talk, what would they complain about most?',
  "What's the wackiest hairstyle you've ever wanted to try?",
  'If you could make any food rain from the sky, what would it be?',
  "What's the silliest thing you've ever done to make your friends laugh?",
  'If you were a superhero, what would be your ridiculous weakness?',
  "What's the most embarrassing nickname you've ever been given?",
  'If you could invent a new holiday, what would it celebrate?',
  "If you could have any animal's nose, which one would you choose?",
  'If your mirror could talk back, what would it probably say to you?',
  "What's the most bizarre thing you've ever used as a bookmark?",
  'If you could make any inanimate object come to life, what would it be?',
  "What's the weirdest combination of foods you've ever eaten together?",
  'If you could replace your hair with something else, what would it be?',
  'If you could have a conversation with any fictional character, who would it be?',
  'If you could turn into any household appliance, which one would you be?',
  "What's the most bizarre way you've ever tried to cure hiccups?",
]

let shuffledQuestions = shuffleArray(questions.slice())
let currentIndex = 0

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

document.addEventListener('DOMContentLoaded', (event) => {
  const qrCodeContainer = document.getElementById('qr-code')

  document
    .querySelector(
      '.quick-reply[data-text^="What is is your favourite colour?"]'
    )
    .addEventListener('click', () => {
      if (currentIndex >= shuffledQuestions.length) {
        shuffledQuestions = shuffleArray(questions.slice())
        currentIndex = 0
      }
      const randomQuestion = shuffledQuestions[currentIndex]
      currentIndex++
      document.getElementById('message').value = randomQuestion
      generateQR(randomQuestion)
    })

  function generateQR(text) {
    qrCodeContainer.innerHTML = ''
    const qr = qrcode(0, 'M')
    qr.addData(text)
    // qr.make()
    // qrCodeContainer.innerHTML = qr.createImgTag()
  }
})

//////////////////////////////

// Example existing function that sets a random message
function displayRandomQuestion() {
  const questions = [
    'What is your favourite colour?',
    'Hey whatsup? ✨👋',
    'Yes Yes & Yes 👍✨',
    '🚫 No nope nuh uh not even once never nada no comprende no abla negatory nein nill noooooooooOOOOOO!!!',
    'Maybe 🤔💭',
    'Later... TBD ⏲️✨',
    'Sure 👍✨',
    'Good Morning 🌞✨',
    'Hello, what do you want? ✨👋',
    'Thanks 🙏✨',
    'Great 🎉✨',
    'Sorry 😢✨',
    'Awesomely amazing ✨😎✨',
    'Okay ✨👌',
    '✨❤️❤️❤️✨',
    '💋💋💋✨',
    "Cool let's do it! ✨😎✨",
    'Agree ✨😉✨',
    'Yes sir ✨🤬✨',
    'No problem 🫠✨',
    'Will do ✨🖕✨',
    'Nice ✨😇✨',
    "Let's go ✨🚀",
    'On it ✨🌵✨',
    'Shit ✨💩✨',
    'Cheers ✨🍻✨',
    'Drink ✨🍺✨',
    'Fuck You ✨🖕✨',
  ]

  const randomIndex = Math.floor(Math.random() * questions.length)
  updateMessage(questions[randomIndex])
}

// Example of attaching event listeners to quick-reply buttons
document.querySelectorAll('.quick-reply').forEach((button) => {
  button.addEventListener('click', () => {
    const newMessage = button.getAttribute('data-text')
    updateMessage(newMessage)
  })
})

// Function to add fade-in effect
function addFadeInEffect(element) {
  element.classList.remove('fade-in')
  // Trigger reflow to restart animation
  void element.offsetWidth
  element.classList.add('fade-in')
}

// Example function that updates the message in the textarea
function updateMessage(newMessage) {
  const messageElement = document.getElementById('message')
  messageElement.value = newMessage
  addFadeInEffect(messageElement)
}

//////////////////////////////

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

  // After generating the QR code, add fade-in effect to the textarea
  addFadeInEffect(document.getElementById('message'))
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

// back to no clear quick butttons

// Modify existing code to use updateMessage function
