const fs = require('fs/promises')

const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");;


const listContacts = async () => {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const chooseContact = contacts.find(item => item.id === contactId);
    return chooseContact || null;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [remoteContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return remoteContact;
}

const addContact = async (body) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...body,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}