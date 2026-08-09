const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
  name:'User',
  tableName:'USER',
  columns:{
    id:{
      primary:true,
      type:'uuid',
      generated:'uuid'
    },
    name:{
      type:'varchar',
      length:50,
      nullable:false,
    },
    email:{
      type:'varchar',
      length:320,
      nullable:false,
      unique:true
    },
    role:{
      type:'varchar',
      length:20,
      nullable: false
    },
    created_at:{
      type:'timestamp',
      createDate:true,
      nullable:false
    },
    updated_at:{
      type:'timestamp',
      updateDate:true,
      nullable:false
    }

  }
})