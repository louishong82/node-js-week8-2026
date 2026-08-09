const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
    name:'grade',
    tableName:'GRADE',
    columns:{
        id:{
            primary:true,
            type:'uuid',
            generated:'uuid'
        },
        score:{
            type:'integer',
            nullable:false
        },
        retake_score:{
            type:'integer',
            nullable:true
        }
    },
    relations:{
        student:{
            target:'student',
            type:'many-to-one',
            joinColumn:{name:'student_id'},
            nullable:false
        },
        subject:{
            target:'subject',
            type:'many-to-one',
            joinColumn:{name:'subject_id'},
            nullable:false
        }
    }

})