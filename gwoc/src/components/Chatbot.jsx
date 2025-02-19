import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Training data for the chatbot
const aboutUsInfo = {
  company: "KASHVI CREATION is a premium saree retailer specializing in traditional and modern designs.",
  mission: "Our mission is to bring the finest collection of traditional and modern sarees crafted by skilled artisans to our customers.",
  contact: {
    email: "info@saree.com",
    phone: "+1 234 567 890",
    address: "123 Fashion St, NY"
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! How can I help you today? You can ask me about our FAQs or about our company.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [faqs, setFaqs] = useState([]);
  const messagesEndRef = useRef(null);

  // Fetch FAQs from the backend
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/faq/all');
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFAQs();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for About Us related queries
    if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('who are you')) {
      return {
        type: 'bot',
        content: aboutUsInfo.company
      };
    }
    
    if (lowerMessage.includes('mission') || lowerMessage.includes('what do you do')) {
      return {
        type: 'bot',
        content: aboutUsInfo.mission
      };
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return {
        type: 'bot',
        content: `You can reach us at:\nEmail: ${aboutUsInfo.contact.email}\nPhone: ${aboutUsInfo.contact.phone}\nAddress: ${aboutUsInfo.contact.address}`
      };
    }

    // Check FAQ database for matches
    const matchingFaq = faqs.find(faq => 
      lowerMessage.includes(faq.question.toLowerCase()) || 
      faq.question.toLowerCase().includes(lowerMessage)
    );

    if (matchingFaq) {
      return {
        type: 'bot',
        content: matchingFaq.answer
      };
    }

    // If no direct match is found, suggest FAQs that might be relevant
    const relevantFaqs = faqs.filter(faq => 
      faq.question.toLowerCase().split(' ').some(word => 
        lowerMessage.includes(word.toLowerCase())
      )
    ).slice(0, 3);

    if (relevantFaqs.length > 0) {
      return {
        type: 'bot',
        content: 'Here are some relevant FAQ answers that might help:\n\n' + 
          relevantFaqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')
      };
    }

    // Default response
    return {
      type: 'bot',
      content: "I'm not sure about that. You can ask me about our company, contact information, or browse through our FAQs. What would you like to know?"
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: inputMessage
    };

    // Process the message and get bot response
    const botResponse = processMessage(inputMessage);

    // Update messages
    setMessages([...messages, userMessage, botResponse]);
    setInputMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#A27B5C] text-white rounded-full p-4 shadow-lg"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border">
          {/* Header */}
          <div className="bg-[#A27B5C] text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">KASHVI Support</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-[#A27B5C] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-[#A27B5C]"
              />
              <button
                type="submit"
                className="bg-[#A27B5C] text-white px-4 py-2 rounded-lg hover:bg-[#8B6B4F]"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;