import React, {useState, useEffect} from 'react';
import api from './services/api';

import './css/global.css'
import './css/App.css'
import './css/Sidebar.css'
import './css/Main.css'

//Componente: Bloco isolado de HTML, CSS e JS que não interfere no restante da aplicação
// ex: <App />, <Header /> ...

//Propriedade: atributo estilo html,  componente PAI passa pro FILHO
// ex: <App titulo="lala"/> ... {props.titulo}

//Estado: informações mantidas e att pelo pŕoprio componente
//ex: function increment(){ setCounter(counter+1)} ... <h1> Contador {counter} </h1>

function App() {

  const [latitude,setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');
  const [github_user,setGithub_user] = useState('');
  const [techs,setTechs] = useState('');
  
  const [devs,setDevs] = useState([])

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(
      (position)=>{
          console.log(position)
          const { latitude, longitude } = position.coords;
          setLatitude(latitude)
          setLongitude(longitude)

      },
      (error) =>{
        console.log(error)
      },{
        timeout: 3000
      }
    )
  },[])

  useEffect(() => {
    async function carregaDevs(){
      const response = await api.get('/devs');
      setDevs(response.data)
    }
    carregaDevs()
  },[])

  async function addDev(e){
    e.preventDefault();
    const response = await api.post('/devs', {
      github_user,
      techs,
      latitude,
      longitude
    })

    setGithub_user('')
    setTechs('')
    
    
  }
  

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={addDev}> 
          <div className="input-block">
            <label htmlFor="github_user">Usuário do Github</label>
            <input name="github_user" 
            id="github_user" 
            value={github_user}
            onChange={e => setGithub_user(e.target.value)}
            required></input>
          </div>
          <div className="input-block">
            <label htmlFor="techs">Techs</label>
            <input name="techs" 
            id="techs" 
            value={techs}
            onChange={e => setTechs(e.target.value)}
            required></input>
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" 
              name="latitude" 
              id="latitude" 
              value={latitude} 
              onChange={ e=> setLatitude(e.target.value)} 
              required></input>
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" 
              name="longitude" 
              id="longitude" 
              value={longitude} 
              onChange={ e=> setLongitude(e.target.value)} 
              required></input>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>

      </aside>
      <main>
        <ul>
          {devs.map( dev => (
            <li key={dev._id} className="dev-item">
            <header>
              <img src={dev.avatar_url} alt={dev.name} />
              <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
              </div>
            </header>

            <p>
              {dev.bio}
            </p>
            <a href={`https://github.com/${dev.github_user}`}>Acessar perfil no Github</a>
          </li>
          ))}
          

        </ul>

      </main>

    </div>
  );
}

export default App;