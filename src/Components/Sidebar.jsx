import React from 'react';

const Sidebar  = ({ contacts, onSelectContact }) => {
  return (
    <div className="contacts-sidebar">
      {contacts.map(contact => (
        <div key={contact.email} className="contact" onClick={() => onSelectContact(contact)}>
          {contact.email}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
