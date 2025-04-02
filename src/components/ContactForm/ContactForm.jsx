import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsOps"; 
import styles from "./ContactForm.module.css"; 

function ContactForm() {
  const [formState, setFormState] = useState({ name: "", number: "" });
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = formState;

    if (!name.trim() || !number.trim()) {
      alert("Please provide both name and number.");
      return;
    }

    if (
      contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }));

    setFormState({ name: "", number: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="name" className={styles.label}>Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter name"
        value={formState.name}
        onChange={handleChange}
        className={styles.input}
      />
      <label htmlFor="number" className={styles.label}>Number</label>
      <input
        type="text"
        id="number"
        name="number"
        placeholder="Enter number"
        value={formState.number}
        onChange={handleChange}
        className={styles.input}
      />
      <button
        type="submit"
        disabled={!formState.name.trim() || !formState.number.trim()}
        className={styles.button}
      >
        Add Contact
      </button>
    </form>
  );
}

export default ContactForm;
