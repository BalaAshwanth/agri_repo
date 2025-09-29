// Farm Assistant Chatbot with Gemini API Integration
class FarmAssistant {
  constructor() {
    this.apiKey = "AIzaSyCWn8VXcUJCy6ceF8V-6Z8Re95L6ToKAsY"; // Will be set by user
    this.chatHistory = this.loadChatHistory();
    this.isLoading = false;

    this.initializeEventListeners();
    this.renderChatHistory();
  }

  // Initialize event listeners
  initializeEventListeners() {
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");

    // Send message on Enter key
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Send message on button click
    sendButton.addEventListener("click", () => {
      this.sendMessage();
    });

    // Focus input when chat opens
    document.getElementById("chatWindow").addEventListener("click", () => {
      messageInput.focus();
    });
  }

  // Toggle chat window visibility
  toggleChat() {
    const chatWindow = document.getElementById("chatWindow");
    const chatButton = document.getElementById("chatButton");

    if (chatWindow.classList.contains("open")) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  // Open chat window
  openChat() {
    const chatWindow = document.getElementById("chatWindow");
    const chatButton = document.getElementById("chatButton");

    chatWindow.classList.add("open");
    chatButton.style.display = "none";

    // Focus on input
    setTimeout(() => {
      document.getElementById("messageInput").focus();
    }, 100);

    // Scroll to bottom
    this.scrollToBottom();
  }

  // Close chat window
  closeChat() {
    const chatWindow = document.getElementById("chatWindow");
    const chatButton = document.getElementById("chatButton");

    chatWindow.classList.remove("open");
    chatButton.style.display = "flex";
  }

  // Send message to Gemini API
  async sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value.trim();

    if (!message) return;

    // Add user message to chat
    this.addMessage(message);
    messageInput.value = "";

    // Show loading indicator
    this.showLoading();

    try {
      // Call Gemini API
      const response = await this.callGeminiAPI(message);
      this.hideLoading();
      this.addMessage(response, "bot");
    } catch (error) {
      this.hideLoading();
      this.addMessage(
        "Sorry, I encountered an error. Please try again.",
        "bot"
      );
      console.error("Error calling Gemini API:", error);
    }

    // Save chat history
    this.saveChatHistory();
  }

  // Call Google Gemini API
  async callGeminiAPI(message) {
    const systemPrompt = `You are a knowledgeable Farm Assistant AI. You help farmers with:
        - Crop management and growing techniques
        - Soil health and fertilization
        - Weather and climate considerations
        - Pest and disease identification and control
        - Equipment recommendations
        - Market prices and trends
        - Sustainable farming practices
        
        Provide helpful, accurate, and practical advice. Be conversational but professional. 
        If you don't know something specific, say so and suggest where they might find more information.
        Give the answers in brief no need detailed explanation",, if its need that okay, just need only 3 -4 lines max`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Invalid response format from API");
    }
  }

  // Add message to chat
  addMessage(text, sender) {
    const chatMessages = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.innerHTML = `<p>${this.formatMessage(text)}</p>`;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Add to chat history
    this.chatHistory.push({ text, sender, timestamp: Date.now() });

    // Scroll to bottom
    this.scrollToBottom();
  }

  // Format message text (basic formatting)
  formatMessage(text) {
    return text
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  }

  // Show loading indicator
  showLoading() {
    const chatMessages = document.getElementById("chatMessages");
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "message bot-message";
    loadingDiv.id = "loading-message";

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.innerHTML = '<div class="loading"></div>';

    loadingDiv.appendChild(contentDiv);
    chatMessages.appendChild(loadingDiv);

    this.scrollToBottom();
    this.isLoading = true;
  }

  // Hide loading indicator
  hideLoading() {
    const loadingMessage = document.getElementById("loading-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
    this.isLoading = false;
  }

  // Scroll to bottom of chat
  scrollToBottom() {
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Load chat history from localStorage
  loadChatHistory() {
    try {
      const saved = localStorage.getItem("farm_assistant_chat");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading chat history:", error);
      return [];
    }
  }

  // Save chat history to localStorage
  saveChatHistory() {
    try {
      localStorage.setItem(
        "farm_assistant_chat",
        JSON.stringify(this.chatHistory)
      );
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  }

  // Render chat history
  renderChatHistory() {
    const chatMessages = document.getElementById("chatMessages");

    // Clear existing messages except the welcome message
    const welcomeMessage = chatMessages.querySelector(".bot-message");
    chatMessages.innerHTML = "";

    // Add welcome message
    if (welcomeMessage) {
      chatMessages.appendChild(welcomeMessage);
    } else {
      this.addMessage(
        "Hello! I'm your Farm Assistant. I can help you with questions about crops, soil health, weather, pests, and more. What would you like to know?",
        "bot"
      );

      // Add sample questions if no chat history
      if (this.chatHistory.length === 0) {
        setTimeout(() => {
          this.addMessage(
            'Here are some things you can ask me:\n\n• "How do I improve soil health for corn?"\n• "What pests affect tomato plants?"\n• "When should I plant wheat in my region?"\n• "How do I read weather patterns for farming?"\n• "What are the best irrigation methods?"',
            "bot"
          );
        }, 1000);
      }
    }

    // Load and render saved messages
    this.chatHistory.forEach((msg) => {
      if (
        msg.sender !== "bot" ||
        msg.text !==
          "Hello! I'm your Farm Assistant. I can help you with questions about crops, soil health, weather, pests, and more. What would you like to know?"
      ) {
        this.addMessageToDOM(msg.text, msg.sender);
      }
    });
  }

  // Add message to DOM without adding to history
  addMessageToDOM(text, sender) {
    const chatMessages = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.innerHTML = `<p>${this.formatMessage(text)}</p>`;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
  }

  // Clear chat history
  clearChat() {
    if (confirm("Are you sure you want to clear the chat history?")) {
      this.chatHistory = [];
      this.saveChatHistory();

      const chatMessages = document.getElementById("chatMessages");
      chatMessages.innerHTML = "";
      this.addMessage("Chat history cleared. How can I help you today?", "bot");
    }
  }
}

// Global functions for HTML onclick events
let farmAssistant;

// Initialize the Farm Assistant when page loads
document.addEventListener("DOMContentLoaded", () => {
  farmAssistant = new FarmAssistant();
});

// Global functions for HTML onclick events
function toggleChat() {
  farmAssistant.toggleChat();
}

function openChat() {
  farmAssistant.openChat();
}

function closeChat() {
  farmAssistant.closeChat();
}

function sendMessage() {
  farmAssistant.sendMessage();
}

function clearChat() {
  farmAssistant.clearChat();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#ffffff";
    header.style.backdropFilter = "none";
  }
});

// Add animation on scroll for cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards for animation
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".offer-card, .story-card");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});
