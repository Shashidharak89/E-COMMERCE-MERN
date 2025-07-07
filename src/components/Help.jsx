import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  RotateCcw, 
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import './styles/help.css';

const Help = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I place an order?",
      answer: "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI, net banking, and popular digital wallets like Paytm, PhonePe, and Google Pay."
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days. Premium members get free express shipping on all orders."
    },
    {
      id: 4,
      question: "Can I track my order?",
      answer: "Yes! Once your order is shipped, you'll receive a tracking number via email and SMS. You can also track your order in the 'My Orders' section of your account."
    },
    {
      id: 5,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused and in original packaging. Some items like electronics have a 15-day return window."
    },
    {
      id: 6,
      question: "How do I cancel my order?",
      answer: "You can cancel your order within 24 hours of placing it by going to 'My Orders' and clicking 'Cancel Order'. After 24 hours, cancellation may not be possible if the item has been shipped."
    },
    {
      id: 7,
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. We're working on expanding to international shipping and will notify customers when this becomes available."
    },
    {
      id: 8,
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team via phone, email, or live chat. Our support hours are Monday-Sunday, 9 AM to 9 PM IST."
    }
  ];

  const contactMethods = [
    {
      icon: <Phone size={24} />,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      contact: "+91 1800-123-4567",
      hours: "9 AM - 9 PM (Mon-Sun)"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Support",
      description: "Send us your queries via email",
      contact: "support@shopx.com",
      hours: "Response within 24 hours"
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available on website",
      hours: "9 AM - 9 PM (Mon-Sun)"
    }
  ];

  const quickHelp = [
    {
      icon: <ShoppingCart size={30} />,
      title: "Order Issues",
      description: "Problems with placing or managing orders"
    },
    {
      icon: <CreditCard size={30} />,
      title: "Payment Problems",
      description: "Issues with payments or refunds"
    },
    {
      icon: <Truck size={30} />,
      title: "Shipping & Delivery",
      description: "Track orders or delivery concerns"
    },
    {
      icon: <RotateCcw size={30} />,
      title: "Returns & Exchanges",
      description: "Return or exchange your products"
    },
    {
      icon: <Shield size={30} />,
      title: "Account Security",
      description: "Login issues or account security"
    }
  ];

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="help-page-container">
      <div className="help-header-section">
        <h1 className="help-main-title">Help & Support</h1>
        <div className="help-subtitle">We're here to help you with any questions or concerns</div>
      </div>

      <div className="help-content-wrapper">
        {/* Quick Help Section */}
        <div className="quick-help-section">
          <h2 className="help-section-title">Quick Help</h2>
          <div className="quick-help-grid">
            {quickHelp.map((item, index) => (
              <div key={index} className="quick-help-card">
                <div className="quick-help-icon">
                  {item.icon}
                </div>
                <div className="quick-help-content">
                  <h3 className="quick-help-title">{item.title}</h3>
                  <p className="quick-help-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2 className="help-section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div 
                key={faq.id} 
                className="faq-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="faq-question" 
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div className="faq-question-text">
                    <HelpCircle size={20} className="faq-icon" />
                    {faq.question}
                  </div>
                  <div className="faq-toggle">
                    {expandedFaq === faq.id ? 
                      <ChevronUp size={20} /> : 
                      <ChevronDown size={20} />
                    }
                  </div>
                </div>
                {expandedFaq === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Methods Section */}
        <div className="contact-section">
          <h2 className="help-section-title">Contact Support</h2>
          <div className="contact-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-card">
                <div className="contact-icon-wrapper">
                  {method.icon}
                </div>
                <div className="contact-content">
                  <h3 className="contact-title">{method.title}</h3>
                  <p className="contact-description">{method.description}</p>
                  <div className="contact-info">
                    <div className="contact-detail">{method.contact}</div>
                    <div className="contact-hours">
                      <Clock size={16} />
                      {method.hours}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Hours Card */}
        <div className="support-hours-card">
          <div className="support-hours-content">
            <h3 className="support-hours-title">Our Support Hours</h3>
            <div className="support-hours-grid">
              <div className="support-hour-item">
                <span className="support-day">Monday - Friday</span>
                <span className="support-time">9:00 AM - 9:00 PM IST</span>
              </div>
              <div className="support-hour-item">
                <span className="support-day">Saturday - Sunday</span>
                <span className="support-time">9:00 AM - 6:00 PM IST</span>
              </div>
            </div>
            <p className="support-note">
              For urgent issues outside business hours, please email us and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;