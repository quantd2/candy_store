const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString} = graphql;
const DogType = new GraphQLObjectType({
  name: 'Dog',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    characteristics: {type: GraphQLString}
  })
});

module.exports = DogType;
