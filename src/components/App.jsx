import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { SectionPhonebook, SectionContact, SectionItem } from './App.styled';

const getContacts = () => {
  const savedContacts = localStorage.getItem('contact-save');
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  } else {
    return [];
  }
};

export const App = () => {
  const [contacts, setContact] = useState(getContacts);
  const [filters, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact-save', JSON.stringify(contacts));
  }, [contacts]);

  const inputItem = newItem => {
    const contact = contacts.find(
      contact => contact.name.toLowerCase() === newItem.name.toLowerCase()
    );

    if (contact) {
      alert(`${newItem.name} is already in contacts`);
      return;
    }

    const ContactId = {
      id: nanoid(),
      name: newItem.name,
      number: newItem.number,
    };

    setContact(prevState => [...prevState, ContactId]);
  };

  const changeFilter = newName => {
    setFilter(newName);
  };

  const handleDelete = contactsId => {
    setContact(prevState =>
      prevState.filter(contact => contact.id !== contactsId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filters.toLowerCase())
  );

  return (
    <SectionPhonebook>
      <SectionItem>Phonebook</SectionItem>
      <ContactForm addInfo={inputItem} />

      <SectionContact>Contacts</SectionContact>
      <Filter value={filters} onChange={changeFilter} />
      <ContactList
        onDeleteContact={handleDelete}
        visibleItems={filteredContacts}
      />
    </SectionPhonebook>
  );
};
