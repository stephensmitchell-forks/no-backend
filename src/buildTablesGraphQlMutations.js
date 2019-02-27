import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import buildGraphQlArgs from './helpers/buildGraphQlArgs';
import { rules, tablesMutationsMethods } from './helpers/constants';
import rulesReader from './helpers/rulesReader';
import { firstToUpperCase } from './helpers/textHelpers';

const statementResultType = new GraphQLObjectType({
    name:'statementResult',
    description:'Statement result',
    fields:{
        affectedRows: {type:GraphQLInt},
        changedRows: {type:GraphQLInt},
        insertId: {type:GraphQLInt},
        fieldCount: {type:GraphQLInt},
        warningCount: {type:GraphQLInt},
        message:{type:GraphQLString},
        insertIds:{type:new GraphQLNonNull(new GraphQLList(GraphQLInt))}
    }
})  
const buildTablesGraphQlMutations = ( options,tables,tablesTypes ) => {

    let tablesMutationsTypes = {}

    tables.forEach((tableObject)=> {

        let tableName = Object.values(tableObject)[0]
        let tableDesc = Object.values(tableObject)[1]
        let isActionAllowed = rulesReader(options.rules,rules['exclude'],tableName)

        if(isActionAllowed){
            tablesMutationsMethods.forEach((mutationMethod) => {
                tablesMutationsTypes[`${mutationMethod}${firstToUpperCase(tableName)}`] = {
                type: statementResultType,
                args: {
                    ...buildGraphQlArgs(tableName,tableDesc,'mutation',mutationMethod)
                }
            }
            })
        }

    })

    return {
        tablesMutationsTypes
    }

}

export default buildTablesGraphQlMutations