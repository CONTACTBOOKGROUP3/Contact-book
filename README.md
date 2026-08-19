# CONTACT-BOOK

## Project Description
A simple contact management application where users can store personal contacts (name, phone number, email) and retrieve them later.

## Project Requirements
1. The user can add a new contact (Full Name, Phone Number, Email Address).
2. The user can view all saved contacts.
3. The user can edit an existing contact's information.
4. The user can delete a contact.
5. The user can search contacts by name.
6. The app validates phone number and email fields before saving.
7. The app saves contacts so they remain after refreshing the page.

## Classes/Functions Needed
- class Contact
  - (represents a single contact, with name, phone, and email)
- addContact(name, phone, email)
- deleteContact(id)
- editContact(id, newName, newPhone, newEmail)
- searchContacts(keyword)
- validateContact(phone, email)
- saveToStorage()
- loadFromStorage()

## Input/Output Sketch

| Feature | Input | Output |
|---|---|---|
| Add contact | Name, phone, email typed, Save clicked | New contact appears in the list |
| Display contacts | Page loads | All saved contacts shown |
| Edit contact | Contact clicked, new details entered | Contact updates in the list |
| Delete contact | Delete button clicked | Contact removed from the list |
| Search contacts | Name typed in search box | Only matching contacts shown |
| Invalid phone/email | Save clicked with bad format | Warning shown, contact not saved |
| Empty fields | Save clicked with missing field | Warning shown, contact not saved |
| Save/Load | Any change to contacts | Contacts persist after refresh |# Contact-book
