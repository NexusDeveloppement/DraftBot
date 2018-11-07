const express = require('express')
const lodash = require('lodash');
const https = require ('https'); 
const fs = require ('fs'); 

class WebSocket {

    constructor(token, port, client) {
        this.token = token
        this.port = port
        this.client = client
        this.app = express()

        this.app.use(express.static('static'));

        const commands = this.client.registry.groups.map(grp => grp.commands)

        this.app.get('/api/commands', (req, res) => res.status(200).send({ commands: lodash.flatten(commands)}))

        this.server = this.app.listen(port, () => {
            console.log("Websocket API set up at port " + this.server.address().port)
        })
    }
}

module.exports = WebSocket