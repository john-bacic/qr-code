document.addEventListener('DOMContentLoaded', function () {
  // Function to apply random rotation
  function applyRandomRotation(element) {
    const rotationAngle = Math.floor(Math.random() * 7) - 3
    element.style.transform = `rotate(${rotationAngle}deg)`
  }

  // Function to handle quick replies with a delay
  function setupQuickReplyButtons() {
    const quickReplyButtons = document.querySelectorAll('.quick-reply')
    const messageTextarea = document.getElementById('message')

    quickReplyButtons.forEach((button) => {
      applyRandomRotation(button)

      button.addEventListener('click', function () {
        const text = button.getAttribute('data-text')
        // setTimeout(() => {
        //   messageTextarea.value = text
        // }, 500) // 0.5 second delay
      })

      button.addEventListener('touchend', function () {
        const text = button.getAttribute('data-text')
        // setTimeout(() => {
        //   messageTextarea.value = text
        // }, 500) // 0.5 second delay
      })
    })
  }

  // Function to apply random rotation to QR code and new message buttons
  function applyRandomRotationToButtons() {
    const qrCodeButton = document.querySelector(
      "button[onclick='generateQR()']"
    )
    const newMessageButton = document.getElementById('new-message')

    if (qrCodeButton) applyRandomRotation(qrCodeButton)
    if (newMessageButton) applyRandomRotation(newMessageButton)
  }

  // Setup all event listeners and initial setups
  function initialize() {
    setupQuickReplyButtons()
    applyRandomRotationToButtons()
  }

  // Initialize the setup
  initialize()

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
// refactored 2 with delay
/////////////// RANDOM QUESTION

const questions = [
  'If you could be anyone else for a day, who would you choose?',
  "What's the weirdest food you've ever tried?",
  "What's your favorite TV show or movie these days?",
  'If you could have any superpower, what would it be?',
  'What do you like better sunrise or sunset?',
  "What's your favorite way to spend the weekend?",
  'Ever met a celebrity? Who was it?',
  "What's the worst job you've ever had?",
  'If you could only eat one food forever, what would it be?',
  'What bug, fish or animal scares you the most?',
  "If you won the lottery, what's the first thing you'd buy?",
  "What's the strangest dream you've ever had?",
  'Have you ever seen a ghost or something spooky?',
  "What's the most fun thing you've ever done without planning?",
  'What did you eat for breakfast this morning?',
  'If you could time travel, where would you go?',
  'What do you collect?',
  "What's the best halloween costume you've ever worn?",
  'If you had a time machine, would you first go to the past or the future?',
  'If you could have dinner with anyone, who would it be?',
  'If you could only listen to one song for the rest of your life, what would it be?',
  'If you could be famous for one thing, what would it be?',
  'If you could teleport anywhere right now, where would you go?',
  "What's your favourite colour? Why?",
  'If your belly button could talk, what would it say?',
  'If you were a vegetable, which one would you be and why?',
  "What's the weirdest place you've ever fallen asleep?",
  'If you could rename yourself, what would you choose?',
  'If you could swap bodies with any animal for a day, which one would it be?',
  'If your shoes could talk, what would they complain about most?',
  'If you could make any food rain from the sky, what would it be?',
  'If you were a superhero, what would be your weakness?',
  "If you could have any animal's nose, which one would you choose?",
  'If your mirror could talk back, what would it probably say to you?',
  "What's the weirdest combination of foods you've ever eaten together?",
  'If you could replace your hair with something else, what would it be?',
  'If you could turn into any household appliance, which one would you be?',
  "What's the most bizarre way you've ever tried to cure hiccups?",
  'If you could create a new flavor of ice cream, what would it be called and what would it taste like?',
  'If you could only use one word for the rest of your life, what would it be?',
  "What's the most unusual gift you've ever received?",
  'If you could have a secret hideout anywhere in the world, where would it be?',
  'If you had to describe yourself as a flavor, what flavor would you be?',
  "What's the most awkward moment you've ever had on public transportation?",
  "What's the strangest superstition you've ever heard of?",
  'If you could swap your voice with any celebrity, whose would you choose?',
  "What's the most ridiculous argument you've ever had?",
  'If you could live inside any TV show for a week, which one would it be?',
  "What's the most absurd law you've ever heard of?",
  'If you could instantly play any instrument, which one would it be?',
  "What's the weirdest dream you've had that you can still remember?",
  'If you had to survive a zombie apocalypse with one famous person, who would it be?',
  'If you could bring any fictional character to life, who would it be?',
  "What's the funniest costume you've ever seen someone wear?",
  "If you could have any animal's ears, which would you choose and why?",
  'If you could have a personal robot, what would you want it to do?',
  'If you could live in any time in history, which one would you choose?',
  'If you could change the ending of any movie, which one would it be and how would it end?',
  'If you could have dinner with any fictional villain, who would it be and why?',
  "What's the most bizarre rumor you've ever heard about yourself?",
  'If you could be any mythical creature, which one would you choose to be?',
  "What's the most unusual place you've ever found something valuable?",
  "What's the weirdest coincidence you've ever experienced?",
  'If you could communicate with one type of animal, which would it be?',
  "What's the most interesting class you've ever taken?",
  'If you could have any job for just one day, what would it be?',
  'If you could choose any fictional character to be your best friend, who would it be?',
  'If you could instantly learn any language, which one would it be and why?',
  "What's the most unusual hobby you've ever heard of?",
  'What do you watch mostly on YouTube?',
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
    // 'Hey whatsup? ✨👋',
    // 'Yes Yes & Yes 👍✨',
    // '🚫 No nope nuh uh not even once never nada no comprende no abla negatory nein nill noooooooooOOOOOO!!!',
    // 'Maybe 🤔💭',
    // 'Later... TBD ⏲️✨',
    // 'Sure 👍✨',
    // 'Oh My God! 🤯✨',
    // 'Good Morning 🌞✨',
    // 'Hello, what do you want? ✨👋',
    // 'Thanks 🙏✨',
    // 'Great 🎉✨',
    // 'Sorry 😢✨',
    // 'Awesomely amazing ✨😎✨',
    // 'Okay ✨👌',
    // '✨❤️❤️❤️✨',
    // '💋💋💋✨',
    // "Cool let's do it! ✨😎✨",
    // 'Agree ✨😉✨',
    // 'Yes sir ✨🤬✨',
    // 'No problem 🫠✨',
    // 'Will do ✨🖕✨',
    // 'Nice ✨😇✨',
    // "Let's go ✨🚀",
    // 'On it ✨🌵✨',
    // 'Shit ✨💩✨',
    // 'Cheers ✨🍻✨',
    // 'Drink ✨🍺✨',
    // "For fuck's sakes!      ✨🙈✨",
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

// Function to prevent text copying
// function preventTextCopying() {
//   document.addEventListener('copy', function (e) {
//     e.preventDefault()
//   })

//   document.addEventListener('cut', function (e) {
//     e.preventDefault()
//   })

//   document.addEventListener('contextmenu', function (e) {
//     e.preventDefault()
//   })
// }

// Call the function to prevent text copying
// preventTextCopying()

// Modify existing code to use updateMessage function
