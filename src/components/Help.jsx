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

      <style jsx>{`
        .help-page-container {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }

        .help-header-section {
          text-align: center;
          margin-bottom: 40px;
          padding: 40px 0;
        }

        .help-main-title {
          font-size: 3rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }

        .help-subtitle {
          font-size: 1.2rem;
          color: #666;
          font-weight: 300;
        }

        .help-content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .help-section-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          text-align: center;
          margin-bottom: 30px;
        }

        .quick-help-section {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out;
        }

        .quick-help-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .quick-help-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .quick-help-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .quick-help-icon {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .quick-help-title {
          font-size: 1.1rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        }

        .quick-help-description {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .faq-section {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out 0.1s both;
        }

        .faq-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .faq-item {
          border: 1px solid #e9ecef;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
        }

        .faq-question {
          background: #f8f9fa;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .faq-question:hover {
          background: #e9ecef;
        }

        .faq-question-text {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
          color: #333;
        }

        .faq-icon {
          color: #667eea;
        }

        .faq-toggle {
          color: #667eea;
        }

        .faq-answer {
          padding: 20px;
          background: white;
          border-top: 1px solid #e9ecef;
          animation: fadeIn 0.3s ease-out;
        }

        .faq-answer p {
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .contact-section {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .contact-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .contact-icon-wrapper {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 20px;
        }

        .contact-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }

        .contact-description {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-detail {
          font-weight: 600;
          color: #667eea;
        }

        .contact-hours {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 0.9rem;
        }

        .support-hours-card {
          background: white;
          border-radius: 15px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: fadeInUp 0.6s ease-out 0.3s both;
        }

        .support-hours-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          text-align: center;
          margin-bottom: 25px;
        }

        .support-hours-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .support-hour-item {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .support-day {
          font-weight: 600;
          color: #333;
        }

        .support-time {
          color: #667eea;
          font-weight: 600;
        }

        .support-note {
          text-align: center;
          color: #666;
          font-style: italic;
          margin-top: 15px;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .help-main-title {
            font-size: 2rem;
          }

          .help-content-wrapper {
            padding: 0 10px;
          }

          .quick-help-grid {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .support-hours-grid {
            grid-template-columns: 1fr;
          }

          .quick-help-card {
            flex-direction: column;
            text-align: center;
          }

          .faq-question-text {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Help;