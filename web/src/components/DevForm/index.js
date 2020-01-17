import React, {useState, useEffect} from 'react';

function DevForm({onSubmit}) {

    const [latitude,setLatitude] = useState('');
    const [longitude,setLongitude] = useState('');
    const [github_user,setGithub_user] = useState('');
    const [techs,setTechs] = useState('');


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

      async function submit(e){
        e.preventDefault();
        await onSubmit({
            github_user,
            techs,
            latitude,
            longitude
          });

          setGithub_user('')
          setTechs('')
      }


    return (
        <form onSubmit={submit}>
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
                        onChange={e => setLatitude(e.target.value)}
                        required></input>
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number"
                        name="longitude"
                        id="longitude"
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        required></input>
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    )
}

export default DevForm;