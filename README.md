
## Models 

ticket model

status :  0=opened , 1=waiting for admin respond , 2=waiting for user respond , 3=closed

user model 

role :    0=admin , 1=normal user


## Demo

demo user : normalUser@gmail.com 
password : 123456789

admin user : mustafa05deniz@gmail.com
password : 123456789

## Error

npm install bcrypt@3.0.6 --save

## Installation 

# Backend

```shell
    npm install && nodemon server.js

```

# Frontend

```shell
    npm install && ng serve 

```

change mongodb config

./config/database.js

const db_name = "yourMongoDBName";
const mongoDB = 'mongodb+srv://user:password@url/'+db_name+'?retryWrites=true&w=majority';

```shell
    npm install && npm start 
```

## İmages

<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/add_new_message.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/add_ticket.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/admin_screen.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/admin_screen.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/change_status.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/closed_tickets.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/filter_email_and_title.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/filter_email_and_title.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/filter_screen.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/filter_ticket.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/login_screen.PNG">
<img src="https://github.com/mustafa05deniz/TicketManagamentSystem/blob/master/frontend/my_tickets.PNG">



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
