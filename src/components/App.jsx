import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import { Div, Section, Phonebook, Contacts } from './App.styled';

function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const findName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (findName) {
      return alert(`${name} is already in contacts.`);
    }

    const findNumber = contacts.find(contact => contact.number === number);
    if (findNumber) {
      return alert(`This phone number is already in use.`);
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(contacts => [...contacts, newContact]);
  };

  const filterContacts = () => {
    const minusName = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(minusName)
    );
  };

  function deleteContact(contactId) {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  }

  const viewFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const viewContacts = filterContacts();

  useState(() => {
    const contacts = localStorage.getItem('contacts');
    const contactsParse = JSON.parse(contacts);

    if (contactsParse) {
      setContacts(contactsParse);
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Div>
      <Section title="Phonebook">
        <Phonebook>Phonebook</Phonebook>
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Contacts>Contacts</Contacts>
        <Filter value={filter} onChange={viewFilter} />
        <ContactList contacts={viewContacts} onDeleteContact={deleteContact} />
      </Section>
    </Div>
  );
}

export default App;
