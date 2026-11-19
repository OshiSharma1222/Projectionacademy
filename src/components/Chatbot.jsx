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
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Chat button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg shadow-brand-900/20 transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-brand-800"
      >
        {!isOpen && <span aria-hidden className="chat-pulse absolute inset-0 rounded-full bg-brand-500" />}
        {isOpen ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-6 w-6" />}
      </button>

      {/* Chat container */}
      {isOpen && (
        <div
          ref={chatRef}
          className="animate-fade-in-up fixed inset-x-3 bottom-24 flex h-[min(520px,calc(100dvh-8rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-brand-900/15 sm:absolute sm:inset-x-auto sm:bottom-20 sm:right-0 sm:w-96"
        >
          {/* Chat header */}
          <div className="flex items-center justify-between bg-brand-700 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <img src="/images/projection logo-01.png" alt="" className="h-8 w-8 object-contain" />
              </span>
              <div>
                <h3 className="text-sm font-bold">Projection Academy</h3>
                <p className="text-xs text-brand-100">Quick answers</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Minimise chat"
              className="rounded-md p-1 text-brand-100 hover:bg-white/10 hover:text-white"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={messagesRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.isBot
                      ? 'rounded-bl-md border border-slate-200 bg-white text-slate-700'
                      : 'rounded-br-md bg-brand-700 text-white'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`mt-1 text-[11px] ${message.isBot ? 'text-slate-400' : 'text-brand-100'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                  {[0, 150, 300].map(delay => (
                    <span
                      key={delay}
                      className="h-2 w-2 animate-pulse rounded-full bg-slate-400"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick reply options */}
          <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto border-t border-slate-200 bg-white p-3">
            {quickReplyOptions.map(option => (
              <button
                key={option.id}
                onClick={() => handleQuickReplyClick(option.id, option.text)}
                className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-800 transition-colors hover:border-brand-200 hover:bg-brand-100 sm:text-sm"
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