import React, {useState, useEffect} from 'react';
import api from './services/api';
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

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

 
  
  const [devs,setDevs] = useState([])



  useEffect(() => {
    async function carregaDevs(){
      const response = await api.get('/devs');
      setDevs(response.data)
    }
    carregaDevs()
  },[])

  async function addDev(e, data){
    e.preventDefault();
    const response = await api.post('/devs', data)
 
  }
  

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={addDev} />
      </aside>
      <main>
        <ul>
          {devs.map( dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
          

        </ul>

      </main>

    </div>
  );
}

export default App;