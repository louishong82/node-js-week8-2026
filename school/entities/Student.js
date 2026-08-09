const { EntitySchema, JoinColumn } = require('typeorm')


module.exports = new EntitySchema({
    name:'student',
    tableName:'STUDENT',
    columns:{
        id:{
            primary:true,
            type:'uuid',
            generated:'uuid'
        },
        name:{
            type:'varchar',
            length:50
        }
    },
    relations:{
        class:{
            target:'class',
            type:'many-to-one',
            joinColumn:{name:'class_id'},
            nullable:false
        }
    }
})