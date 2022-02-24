'use strict';
const { rejects, deepStrictEqual } = require('assert');
const { errors } = require('./constants/default-errors');
const fileHandler = require('./src/file-handler');;

let fileTests = {
    fileTests: (async() => {
        {
          const filePath = './mocks/emptyFile-invalid.csv';
          const rejection = new Error(errors.FILE_FIELDS_ERROR_MESSAGE);
          const result = fileHandler.csvToJson(filePath);
          await rejects(result, rejection);
        } 
        {
          const filePath = './mocks/fourItens-ivalid.csv';
          const rejection = new Error(errors.FILE_LENGTH_ERROR_MESSAGE);
          const result = fileHandler.csvToJson(filePath);
          await rejects(result, rejection);
        } 
        {
          const filePath = './mocks/threeItens-valid.csv';
          const result = await fileHandler.csvToJson(filePath);
          const expected = [{
                  "name": "Aldebaran",
                  "id": 123,
                  "profession": "Cavaleiro",
                  "birthDay": 1987
                },
                {
                  "name": "Jiraya",
                  "id": 321,
                  "profession": "Ninja",
                  "birthDay": 1973
                },
                {
                  "name": "Feiticeira",
                  "id": 231,
                  "profession": "Apresentadora",
                  "birthDay": 1975
                }
            ]
          deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
        }
    })(),
}