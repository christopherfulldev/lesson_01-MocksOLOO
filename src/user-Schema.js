'use strict'
const userSchema = {
    initializer: function ({id, name, profession, age, DEFAULTERRORMESSAGE}) {
        this.name = name || DEFAULTERRORMESSAGE(), 
        this.id = parseInt(id) || DEFAULTERRORMESSAGE(),
        this.profession = profession || DEFAULTERRORMESSAGE(),
        this.birthDay = new Date().getFullYear() - age -2 || DEFAULTERRORMESSAGE();
        return this;
    },

    DEFAULTERRORMESSAGE: function () {
        return 'Error trying to get value, try again'
    }
};                    

module.exports = userSchema;
