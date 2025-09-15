import { ChevronDown, MessageCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I\'m here to help you learn more about Projection Academy. What would you like to know about?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatRef = useRef(null);
  const messagesRef = useRef(null);
  const buttonRef = useRef(null);

  // Quick reply options
  const quickReplyOptions = [
    { id: 'courses', text: 'Courses Offered' },
    { id: 'fees', text: 'Fee Structure' },
    { id: 'admission', text: 'Admission Process' },
    { id: 'mentorship', text: 'Mentorship Program' },
    { id: 'results', text: 'Success Results' },
    { id: 'timing', text: 'Class Timings' },
    { id: 'location', text: 'Academy Location' },
    { id: 'contact', text: 'Contact Information' },
  ];

  // FAQ responses
  const faqResponses = {
    'hello': 'Hello! Welcome to Projection Academy. How can I help you today?',
    'hi': 'Hi there! I\'m here to answer any questions about Projection Academy.',
    'courses': 'We provide expert-led JEE Main training, comprehensive Science courses for Classes 11th and 12th, and strong CBSE foundation courses for Classes 9th and 10th, ensuring students are well-prepared for both board exams and competitive success.',
    'fees': 'Our fee structure varies by course and duration. Please contact us at +91 95997 40029',
    'admission': 'Admissions are open throughout the year. We assess each student individually to create a personalized learning plan.',
    'contact': 'You can reach us at our academy or through our contact form. We\'re always here to help!',
    'mentorship': 'Yes! We provide dedicated one-on-one mentorship where each student gets personal attention from experienced faculty members.',
    'results': 'We\'re proud of our 98% success rate with 200+ selections and 300+ students currently studying with us.',
    'location': 'Please check our contact section for our complete address and directions to our academy.',
    'timing': 'We offer flexible timings to accommodate different student schedules. Contact us to discuss the best timing for you.',
    'default': 'I\'m here to help! You can ask me about our courses, admission process, fees, mentorship, results, or any other questions about Projection Academy.'
  };

  useEffect(() => {
    if (isOpen && messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [isOpen, messages]);

  const getBotResponse = (userMessageId) => {
    return faqResponses[userMessageId.toLowerCase()] || faqResponses.default;
  };

  const saveChatInteraction = async (userMessage, botResponse) => {
    // Implementation for saving chat interaction to backend if needed
  };

  const handleQuickReplyClick = async (optionId, optionText) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: optionText,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(optionId);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Optionally save the interaction
      saveChatInteraction(optionText, botResponse);
    }, 700);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-300"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
      
      {/* Chat container */}
      {isOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-xl shadow-xl flex flex-col transition-all duration-500 animate-fade-in-up"
          style={{ height: '500px', maxHeight: '80vh' }}
        >
          {/* Chat header */}
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">Projection Academy</h3>
              <p className="text-xs opacity-80">Chat Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div
            ref={messagesRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.isBot
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Quick reply options */}
          <div className="p-3 bg-gray-100 border-t border-gray-200 flex flex-wrap gap-2 justify-center">
            {quickReplyOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handleQuickReplyClick(option.id, option.text)}
                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full text-sm transition-colors"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;