import './App.css';
import { useEffect, useRef, useState } from 'react';

import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/patients"
function App() {
  
  const [patients, setPatients] = useState([]);
  
  const {data: items} = useFetch(url)

  const [name, setName] = useState()
  const [birthdate, setBirthdate] = useState()

  const nameInputRef = useRef(null)
  const birthdateInputRef = useRef(null)

/*  useEffect( () => {
    async function fetchData(){
      const res = await fetch(url)
      const data = await res.json()
      setPatients(data)
    }
    fetchData()
  }, []); */

  const handleSubmit = async (e) => {
    e.preventDefault()
    const patient = {
      name,
      birthdate  
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient)
    });

    const addedPatient = await res.json()
    setPatients((prevPatients) => [...prevPatients, addedPatient] );

    setName("")
    setBirthdate("")
    nameInputRef.current.value = ""
    birthdateInputRef.current.value = ""
  }

  return (
    <div className="App">
      <h1>Pacientes: </h1>
      <ul>
        {items && items.map((patient) => (
          <li key={patient.id}>{patient.name} - {patient.birthdate}</li>
        ))}
      </ul>
      <div className="addProduct">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" ref={nameInputRef} name="name" onChange={(e) => setName(e.target.value)}/>
          </label>
          <label>
            Data de Nascimento:
            <input type="date" ref={birthdateInputRef} name="birthdate" onChange={(e) => setBirthdate(e.target.value)}/>
          </label>
          <input type="submit" value="Adicionar" />
        </form>
      </div>
    </div>
  );
}

export default App;
