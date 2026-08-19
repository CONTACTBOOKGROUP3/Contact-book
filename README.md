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

## Testing Results

The app was tested with normal input and with unusual/edge-case input before submission.

### Normal Input Testing

| Test | Steps | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|
| Add contact | Enter name, phone, email, click Save Contact | New contact appears in the list | New contact appeared in the list | Pass |
| Display contacts | Open the app | All saved contacts are shown | All saved contacts displayed correctly | Pass |
| Edit contact | Select a contact, click Edit, change details, save | Contact updates with new details | Contact updated correctly | Pass |
| Delete contact | Select a contact, click Delete | Contact is removed from the list | Contact removed successfully | Pass |
| Search contacts | Type a name in the search box | Only matching contacts are shown | Only matching contacts displayed, case-insensitive | Pass |
| Local Storage persistence | Add contacts, refresh the page | Contacts remain after refresh | Contacts persisted after refresh | Pass |
| Responsive layout | Resize browser to a narrow width | Layout stacks vertically instead of breaking | Layout stacked cleanly, fully usable | Pass |

### Edge-Case / Unusual Input Testing

| Test | Steps | Expected Result | Actual Result | Pass/Fail |
|---|---|---|---|---|
| Empty fields | Click Save Contact with no input entered | Warning shown, contact not saved | Warnings shown under all three fields | Pass |
| Letters in phone field | Enter letters (e.g. "abcdefg") as phone number | Warning shown, contact not saved | Blocked with warning | Pass |
| Invalid email (no @) | Enter an email with no @ symbol | Warning shown, contact not saved | Blocked with warning | Pass |
| Very short phone number | Enter a single digit as phone number | Warning shown, contact not saved | Blocked with warning | Pass |
| Duplicate contact names | Add two contacts with the same name | Both saved separately, no overwrite | Both contacts saved and displayed separately | Pass |
| Special characters in name | Enter a name with an apostrophe/hyphen (e.g. O'Brien-Smith) | Name saved and displayed correctly | Displayed correctly | Pass |
| Edit then Cancel | Edit a contact's details, click Cancel instead of Save | Original details remain unchanged | Original details correctly preserved | Pass |
| Switch from Edit to Add mid-way | Start editing a contact, then click Add Contact instead | A new separate contact is created, original is untouched | New contact created correctly, original unaffected | Pass |
| Phone number of only dashes | Enter "-------" (dashes, no digits) as phone number | Warning shown, contact not saved | Initially accepted incorrectly (bug found) — now blocked after fix | Pass (after fix) |

### Bug Found and Fixed

**Bug: Phone validation accepted non-numeric input**
The phone number field was validated using a pattern that only checked for allowed characters (digits, `+`, spaces, `-`) and an overall length between 7 and 15 characters. This meant a phone number made entirely of dashes (e.g. `-------`) passed validation and was saved, even though it contained no actual digits.

- **Fix:** Added an additional check that counts the actual digits in the phone number and requires at least 7 of them, alongside the existing character and length check. Re-tested with a dashes-only input, which is now correctly blocked with a warning message.

## How to Run

This app runs entirely in the browser — no installation, server, or build tools required.

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html` (or right-click and choose "Open with" your preferred browser, e.g. Chrome or Edge).
4. The app will load directly in your browser.

All contacts are saved automatically to your browser's Local Storage, so they will still be there the next time you open the app on the same browser and computer.
