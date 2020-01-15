import React, {useEffect} from 'react';

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

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(
      (position)=>{
          console.log(position)

      },
      (error) =>{
        console.log(error)
      },{
        timeout: 3000
      }
    )
  },[])
  

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_user">Usuário do Github</label>
            <input name="github_user" id="github_user" required></input>
          </div>
          <div className="input-block">
            <label htmlFor="techs">Techs</label>
            <input name="techs" id="techs" required></input>
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" required></input>
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" required></input>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>

      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/4217842?s=460&v=4" />
              <div className="user-info">
                <strong>Rebeca</strong>
                <span>React1,React2,React3</span>
              </div>
            </header>

            <p>
              Biografia não autorizada.
            </p>
            <a href="https://github.com/rebecabmfonseca">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/4217842?s=460&v=4" />
              <div className="user-info">
                <strong>Rebeca</strong>
                <span>React1,React2,React3</span>
              </div>
            </header>

            <p>
              Biografia não autorizada.
            </p>
            <a href="https://github.com/rebecabmfonseca">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/4217842?s=460&v=4" />
              <div className="user-info">
                <strong>Rebeca</strong>
                <span>React1,React2,React3</span>
              </div>
            </header>

            <p>
              Biografia não autorizada.
            </p>
            <a href="https://github.com/rebecabmfonseca">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars3.githubusercontent.com/u/4217842?s=460&v=4" />
              <div className="user-info">
                <strong>Rebeca</strong>
                <span>React1,React2,React3</span>
              </div>
            </header>

            <p>
              Biografia não autorizada.
            </p>
            <a href="https://github.com/rebecabmfonseca">Acessar perfil no Github</a>
          </li>
        </ul>

      </main>

    </div>
  );
}

export default App;