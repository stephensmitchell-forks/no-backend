const express = require('express');
const noBackend = require('./../../dist/index');//for users require('no-backend')

const app = express();
app.use(express.json());
app.use((req,res,next)=>{
    req.user = {
        id:1,
        name:'Gheorghe'
    }
    next()
});

(async ()=>{

    const { noBackendExpressController } = await noBackend({ 
        graphiql_storm:true,
        connection:{
            driver:'mysql',
            host:'localhost',
            port:'3306',
            user:'root',
            password:'gherciu1',
            database:'test'
        },
        tablesRules:{//rules for all tables (if rule is undefined==>true)
            read:true,
            delete:false,
            products:{//rules for a certain table
                read:true,
                delete:(req)=>(req.user && req.user.id===1),
                update:(req)=>false,
                insert:(req)=>(req.user && req.user.name==='Gheorghe')
            }
        }
    })
    app.use('/api',noBackendExpressController)

})();


app.listen(2626);
console.log(`Server started at port : 2626`)
