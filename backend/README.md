
## Models 

ticket model

status :  0=opened , 1=waiting for admin respond , 2=waiting for user respond , 3=closed

user model 

role :    0=admin , 1=normal user


## Demo

    

## Error

npm install bcrypt@3.0.6 --save


## Installation 

change mongodb config

./config/database.js

const db_name = "yourMongoDBName";
const mongoDB = 'mongodb+srv://user:password@url/'+db_name+'?retryWrites=true&w=majority';

```shell
    npm install && npm start 

    
```
## Structure

- _helpers
    response helpers and production Back logs 
- controllers 
    main functions
- functions 
    global functions , other controllers can use that other functions 
- model
    mongoose model structure 
- routes
    routing and validations 
