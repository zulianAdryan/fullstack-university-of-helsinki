import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PersonsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // console.log("useEffect");
    PersonsService.getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => alert("Persons are still empty"));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
    };

    if (newName === "") {
      return alert(`name cannot be empty`);
    }
    if (newNumber === "") {
      return alert(`number cannot be empty`);
    }

    const isAlreadyExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLocaleLowerCase()
    );
    if (isAlreadyExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        PersonsService.update(
          persons.find(
            (person) =>
              person.name.toLowerCase() === newName.toLocaleLowerCase()
          ).id,
          newPerson
        )
          .then((returned) => {
            setPersons(
              persons.map((person) =>
                person.id !== returned.id ? person : returned
              )
            );
            setMessage(`${newName} phone number has been updated`);
            setIsError(false);
          })
          .catch((error) => {
            setMessage(
              `Sorry, either it's failed or ${newName} has already been deleted`
            );
            setIsError(true);
          });
      }
    } else {
      PersonsService.create(newPerson)
        .then((returnedNewPerson) => {
          setPersons(persons.concat(returnedNewPerson));
          setMessage(`Added ${newName} to phonebook`);
          setIsError(false);
        })
        .catch((error) => {
          setMessage(`Sorry, ${newName} could not be added to phonebook`);
          setIsError(true);
        });
    }

    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name} ?`
      )
    ) {
      PersonsService.deleteById(id)
        .then((response) => {
          // console.log("response :>> ", response);
        })
        .catch(() => {
          setMessage(
            `Information of ${
              persons.find((person) => person.id === id).name
            } has already been removed from the server`
          );
          setIsError(true);
          setTimeout(() => setMessage(null), 5000);
        })
        .finally(() =>
          setPersons(persons.filter((person) => person.id !== id))
        );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} isError={isError} />

      <Filter onChange={handleFilter} filter={filter} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onChangeName={handleNewName}
        onChangeNumber={handleNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={(id) => handleDelete(id)} />
    </div>
  );
};

export default App;
