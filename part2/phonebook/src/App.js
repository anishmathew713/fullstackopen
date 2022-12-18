import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [originalPersons, setOriginalPersons] = useState([])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)


  useEffect(() => {
    personService.getAll().then(initialList => {
      setOriginalPersons(initialList)
      setPersons(initialList)
    })
  }, [])


  const addName = (event) => {
    event.preventDefault();
    const existing = persons.find((person) => person.name === newName)
    if (existing) {
      if (newNumber) {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          const updatedPerson = { ...existing, number: newNumber };
          personService.update(existing.id, updatedPerson).then(() => {
            const updatedPersons = persons.map(person => {
              if (person.id === existing.id) {
                return updatedPerson;
              }
              return person;
            });
            setPersons(updatedPersons);
          });
        }
      } else {
        window.alert(`${newName} is already added to the phonebook`);
      }
      return;
    }


    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1

    }

    personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification(`Added ${newName}`)
        setNotificationType("success")
        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
        setNewName('');
        setNewNumber('');
      })
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value);
    if (event.target.value === '') {
      setPersons(originalPersons);
    } else {
      let filteredList = originalPersons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setPersons(filteredList)
    }
  }
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch((error => {
          setNotification(`Information of ${name} has already been removed from server`)
          setNotificationType("error")
          setTimeout(() => {
            setNotification(null)
            setNotificationType(null)
          }, 3000)
        }))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App