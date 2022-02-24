'use strict'

const { readFile } = require('fs/promises');
const { join } = require('path');
const userSchema = require('./user-Schema');
const DEFAULT_OPTIONS = require('../constants/default-options');
const { errors } = require('../constants/default-errors');

let fileHandler = {
    csvToJson: async function (filePath) {
        const returnedContent = await fileHandler.getFileContent(filePath);
        const fileValidation = fileHandler.isValidFile(returnedContent);
        if(!fileValidation.valid) throw new Error(fileValidation.error);
        const users = await fileHandler.parseCSVToJSON(returnedContent);
        return users;
    },

    getFileContent: async function (filePath) {
        return (await readFile(filePath)).toString('utf8');
    },

    isValidFile: function (csvString, options = DEFAULT_OPTIONS) {
        const [fileHeader, ...fileWhitoutHeader] = csvString.split('\n');
        const isHeaderValid = fileHeader === options.fields.join(',');
       
        if(!isHeaderValid) {
            return {
                error: errors.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            };
        };

        const isContentLengthAceppted = (
            fileWhitoutHeader.length > 0 &&
            fileWhitoutHeader.length <= options.maxLines
        );

        if (!isContentLengthAceppted) {
            return {
                error: errors.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            };
        };

        return { valid: true }
    },

    parseCSVToJSON(csvString) {
        const fileLines = csvString.split('\n');
        const fileFirstLine = fileLines.shift();
        const fileHeader = fileFirstLine.split(',');
        const users = fileLines.map(line => {
            const columns = line.split(',');
            let user = {};
            for (const index in columns) {
                user[fileHeader[index]] = columns[index];
            }
            let mountedUser = Object.create(userSchema).initializer({...user});
            return mountedUser;
        });

        return users;
    }
};

module.exports = fileHandler;