"use client"
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function EcommerceChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm your VolterraEv assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const quickReplies = [
        "Vehicle types",
        "Pricing info",
        "Test drive",
        "Financing options",
        "Contact dealer"
    ];

    const botResponses = {
        // Vehicle types
        "vehicle": "We have a variety of electric vehicles including sedans, SUVs, trucks, and compact cars. What type interests you most?",
        "sedan": "Our electric sedans offer great range and efficiency. Popular models include luxury and economy options. Would you like specific recommendations?",
        "suv": "Electric SUVs are perfect for families! We have mid-size and full-size options with excellent cargo space and range.",
        "truck": "Our electric trucks combine power with efficiency. Great for work and recreation. Want to know about towing capacity?",

        // Pricing
        "price": "Vehicle prices vary by model and features. Entry-level starts around $35K, luxury models up to $80K+. What's your budget range?",
        "cost": "Total cost includes the vehicle, taxes, and any add-ons. We also offer financing and leasing options. Need a quote?",
        "financing": "We offer competitive financing rates starting at 2.9% APR. Lease options also available. Want to see what you qualify for?",

        // Services
        "test": "Test drives can be scheduled online or by calling our showroom. Would you like me to help you book one?",
        "drive": "Great! Test drives typically take 30-45 minutes. You can try different models. When would work best for you?",
        "contact": "You can reach our dealers at (555) 123-4567 or visit our showroom Mon-Sat 9AM-7PM. Need directions?",

        // General
        "hello": "Hello! Welcome to VolterraEv. I can help you explore our electric vehicles. What interests you?",
        "help": "I can assist with vehicle information, pricing, scheduling test drives, financing options, and connecting you with our dealers."
    };

    const getBotResponse = (userMessage) => {
        const message = userMessage.toLowerCase();

        // Check for keywords and return appropriate response
        for (const [keyword, response] of Object.entries(botResponses)) {
            if (message.includes(keyword)) {
                return response;
            }
        }

        // Default response
        return "I'd be happy to help! I can assist with vehicle information, pricing, test drives, and financing. What would you like to know more about?";
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot typing delay
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                text: getBotResponse(inputValue),
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleQuickReply = (reply) => {
        setInputValue(reply);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-50"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col z-50">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4" />
                            <div>
                                <h3 className="font-medium text-sm">VolterraEv Bot</h3>
                                <p className="text-xs opacity-90">Online now</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-blue-700 p-1 rounded"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                        message.sender === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-800 shadow-sm'
                                    }`}
                                >
                                    <div className="flex items-start space-x-2">
                                        {message.sender === 'bot' && <Bot className="w-3 h-3 mt-1 text-blue-600" />}
                                        {message.sender === 'user' && <User className="w-3 h-3 mt-1" />}
                                        <div className="flex-1">
                                            <p className="whitespace-pre-line">{message.text}</p>
                                            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-800 shadow-sm max-w-xs px-3 py-2 rounded-lg">
                                    <div className="flex items-center space-x-2">
                                        <Bot className="w-3 h-3 text-blue-600" />
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    <div className="p-2 bg-white border-t">
                        <p className="text-xs text-gray-600 mb-2">Quick actions:</p>
                        <div className="flex flex-wrap gap-1">
                            {quickReplies.map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickReply(reply)}
                                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 p-3 bg-white rounded-b-lg">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about vehicles..."
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}