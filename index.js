const hapi = require('hapi');
const mongoose = require('mongoose');
const Dog = require('./models/Dog');
const {graphqlHapi, graphiqlHapi} = require('apollo-server-hapi');
const schema = require('./graphql/schema');

// swagger section
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
require('./models/db');


var port = process.env.PORT || 3000;
const server = hapi.server({
  port: port
})


const init = async() => {
  await server.register(
  [{
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      },
      route: {
        cors: true
      }
    }
  },
  {
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  },
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'Dog API Documentation',
        version: Pack.version
      }
    }
  }]);

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        return `<h1> my best friend api</h1>`;
      },
    },
    {
      method: 'GET',
      path: '/api/v1/dogs',
      config: {
        description: 'Get All the dogs',
        tags: ['api', 'v1', 'dogs'],
      },
      handler: (req, res) => {
        return Dog.find();
      },
    },
    {
      method: 'POST',
      path: '/api/v1/dogs',
      config: {
        description: 'Add new dog',
        tags: ['api', 'v1', 'dogs']
      },
      handler: (req, res) => {
        const {name, description, characteristics} = req.payload;
        const dog = new Dog({
          name,
          description,
          characteristics
        });

        return dog.save();
      }
    }
  ]);

  await server.start();
  console.log(`server running at ${server.info.uri}`);
}

init();
