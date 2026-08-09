const { EntitySchema } = require('typeorm');


module.exports = new EntitySchema({
    name:'subject',
    tableName:'SUBJECT',
    columns:{
        id:{
            primary:true,
            type:'uuid',
            generated:'uuid'
        },
        name:{
            type:'varchar',
            length:50,
            nullable:false
        }
    }
})