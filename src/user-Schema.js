'use strict'
const userSchema = {
    initializer: function ({id, name, profession, age}) {
        this.name = name,
        this.id = parseInt(id),
        this.profession = profession,
        this.birthDay =  new Date().getFullYear() - age -2;
        return this;
    }
};                    

module.exports = userSchema;
