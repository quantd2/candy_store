const graphql = require('graphql');
const DogType = require('./DogType');
const Dog = require('./../models/Dog');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    dog: {
      type: DogType,
      args: { id:{ type: GraphQLString } },
      resolve(parent, args){
        return Dog.findById(args.id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
