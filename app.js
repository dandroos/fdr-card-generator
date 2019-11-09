const PDFDocument = require("pdfkit");
const probe = require('probe-image-size')
const fs = require("fs");
const moment = require('moment')
const request = require("request");
const sharp = require("sharp");
const { prompt } = require('inquirer')

const validateLength = (input, maxLength)=>{
    if(input.length > maxLength){
        return `Too long! Keep it ${maxLength} and under.`
    }
    return true
}

const dir = fs.readdirSync('./tmp').filter((file)=>{
    const regex = /(\.jpg|\.png)/i
    return file.match(regex)
})

prompt([
    {
        name: 'name',
        message: 'Name:',
        validate(input){
            return validateLength(input, 15)
        }
    },
    {
        name: 'breed',
        message: 'Breed:',
        validate(input){
            return validateLength(input, 20)
        }
    },
    {
        name: 'dob',
        message: 'DOB: ',
        suffix: '(Must be in DDMMYYYY format)',
        validate(input){
            // const dateArr = input.split("/", 3)
            if(moment(input, 'DDMMYYYY').isValid()){
                return true
            }else{
                return 'Date is invalid'
            }
        }
    },
    {
        name: 'img',
        message: 'Choose an image:',
        type: 'list',
        choices: dir
    }
]).then((answers)=>{
    console.log(answers)
})

