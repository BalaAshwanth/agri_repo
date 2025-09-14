# Farm Assistant - AI-Powered Agricultural Chatbot

A modern, responsive web application designed for farmers, featuring an AI-powered chatbot powered by Google's Gemini API. The application provides valuable agricultural information and assistance through an intuitive chat interface.

## Features

- 🌱 **Modern, Responsive Design** - Clean, farmer-focused UI that works on all devices
- 🤖 **AI-Powered Chatbot** - Powered by Google Gemini API for intelligent agricultural advice
- 💾 **Persistent Chat History** - Conversations are saved locally and persist across sessions
- 📱 **Mobile-Friendly** - Fully responsive design optimized for mobile devices
- 🎯 **Farmer-Focused Content** - Specialized sections for crop management, weather, market prices, and more
- ⚡ **Real-time Chat** - Instant responses with loading indicators
- 🎨 **Beautiful UI** - Modern design with smooth animations and transitions

## Sections

- **Hero Section** - Welcoming introduction with call-to-action
- **What We Offer** - Six key service areas with icons and descriptions
- **Success Stories** - Testimonials from satisfied farmers
- **Floating Chat** - Always-accessible AI assistant

## Setup Instructions

### 1. Launch the Application

1. Open `index.html` in your browser or use `npm start` for a local server
2. Click the chat button (💬) in the bottom-right corner
3. Start asking questions about farming!

### 2. Start Using the Farm Assistant

- Click the floating chat button to open the chat window
- Ask questions about:
  - Crop management and growing techniques
  - Soil health and fertilization
  - Weather and climate considerations
  - Pest and disease control
  - Equipment recommendations
  - Market prices and trends
  - Sustainable farming practices

## File Structure

```
farm-assistant/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and API integration
└── README.md           # This file
```

## Technical Details

### Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Modern JavaScript with classes and async/await
- **Google Gemini API** - AI-powered responses
- **Local Storage** - Persistent chat history

### Key Features

- **Responsive Design** - Mobile-first approach with breakpoints
- **CSS Variables** - Easy theming and maintenance
- **Smooth Animations** - CSS transitions and keyframe animations
- **Error Handling** - Graceful error handling for API failures
- **Loading States** - Visual feedback during API calls

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Colors

The application uses CSS variables for easy theming. Modify the `:root` section in `styles.css`:

```css
:root {
  --primary-color: #2d5016; /* Main green color */
  --accent-color: #ffd700; /* Gold accent color */
  --text-dark: #2c3e50; /* Dark text color */
  /* ... other variables */
}
```

### Content

- Update the hero section text in `index.html`
- Modify the "What We Offer" cards
- Add or change success stories
- Customize the chatbot's system prompt in `script.js`

## API Usage

The application uses Google's Gemini 1.5 Flash model with the following configuration:

- **Temperature**: 0.7 (balanced creativity and accuracy)
- **Top-K**: 40
- **Top-P**: 0.95
- **Max Output Tokens**: 1024

## Privacy & Security

- No data is sent to external servers except for the Gemini API
- Chat history is stored locally and can be cleared at any time
- No user data is collected or transmitted

## Troubleshooting

### Common Issues

1. **Chat not responding**

   - Check your internet connection
   - Check the browser console for error messages

2. **Chat history not saving**
   - Ensure localStorage is enabled in your browser
   - Check if you're in private/incognito mode

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Ensure you have a stable internet connection
3. Try clearing your browser cache and localStorage

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

---

**Happy Farming! 🌱**
