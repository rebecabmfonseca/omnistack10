const axios = require('axios');
const Dev = require('../models/Dev')


module.exports = {
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs)
    },


    async store (request, response) {
        const {github_user, techs, latitude, longitude} = request.body

        let dev =  await Dev.findOne({github_user})

        if(!dev){
    
        const res = await axios.get(`https://api.github.com/users/${github_user}`)
        //console.log(res.data)
    
        const {name=login, avatar_url, bio} = res.data
        console.log(name, avatar_url, bio)
    
        const techsArray = techs.split(",").map(tech => tech.trim());
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    
        const dev = await Dev.create({
            github_user,
            name,
            avatar_url,
            bio, 
            techs: techsArray,
            location
        })
    }
    
        return response.send(dev)
    }
}