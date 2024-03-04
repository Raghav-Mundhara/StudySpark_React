import React, { useState } from 'react';
import '../style.css';
import ContactsSidebar from './Sidebar.jsx';
import ContactWindow from './Contactwindow.jsx';

const dummyContacts = [
  { email: ' ' },
  { email: 'anushka@gmail.com' },
  { email: 'kaushik@gmail.com' },
  { email: 'raghav@gmail.com' },
  { email: 'nishtha@gmail.com' },
];

function App() {
  const [selectedContact, setSelectedContact] = useState(dummyContacts[0]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="app">
      {/* <ContactsSidebar contacts={dummyContacts} onSelectContact={handleSelectContact} /> */}
      <ContactWindow activeContact={selectedContact} />
    </div>
  );
}

export default App;
