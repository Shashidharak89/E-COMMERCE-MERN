import React, { useEffect, useState } from 'react';

const Help = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error('Error fetching help data:', err));
  }, []);

  return (
    <div className="page">
      <h1>Help & Support</h1>
      {faqs.length === 0 ? (
        <p>Loading help content...</p>
      ) : (
        <ul>
          {faqs.map(faq => (
            <li key={faq.id}>
              <strong>{faq.title}</strong>
              <p>{faq.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Help;
