# Codecademy Portfolio Project - Appointment Booking (REST API)

## Description:

This project was completed as part of the Codecademy Full-Stack Engineer course. Specifically, the project covers the final assignment which is to design and develop a PERN application. No further guidance was given.

The purpose of this application is to provide a REST API that could be used for an appointments booking system for a group of physiotherapists. An accompanying client is providing an accompanying application.

The API offers the following:

1.  The ability to select a physiotherapist and to view their appointments from a specified point in time. Clicking on a different physiotherapist will bring up their appointment schedule.. <br> <br>
2.  When viewing an appointment sequence, it is possible to create a new appointment. By default the new appointment is scheduled immediately after the currently scheduled appointment, but the time can be changed using a datatime picker.<br> <br>
3.  Creating a booking supports the following features:
    - A treatment type can be selected. These have a specified duration which is used to create the appointment. <br> <br>
    - A client name must be provided, and there is the option to provide an email address or a telephone number. These are optional, but any values that are provided are validated.
    - There are check in place to ensure that the new appointment does not overlap with any existing appointment. If there is an overlap, the appointment will not be created.
    - Only appointments in the future can be created, and weekends appointments are prohibited. <br> <br>
4.  Appointments can be deleted using the delete button on the appointment. <br> <br>
5.  A date time picker is used to allow the appointments schedule to be viewed for any point in the future. This allows inspection to find existing appointments and to find suitable gaps for new appointments.
6.  The data time picker is also used to set the start time of new appointments. <br> <br>
7.  The application allows the registration of new booking agents, and password protected logon and logoff processes are implemented. <br> <br>

A set of .rest files for the API has been provided. These use the vscode 'REST Client' extension.` for immediate use.

Further details of these features are given below.

### Implementation details

1. The application is an express application. It make use of the _pg_ module to interact with a Postgres database. The data to support connection to the database is stored in a .env file at the root of the application file systems. <br> <br>
2. The data access and business logic are presented in the `/models` and `/controllers` directories of the project. <br> <br>
3. All of the database interactions are on single rows. <br> <br>
4. Authorisation and access are controlled using the _passport_ and _passport-local_ modules. Password salting and encryption uses the _bcrypt_ module. <br> <br>
5. The directory structure of the application is:

   > `/ - essential central control files`

   > `/models - SQL-interface to the database`

   > `/controller -logic and error handling for the SQL interface`

   > `/db - SQL scripts to build and populate the Postgres database`

   > `/passport - file to support user authorisation and access`

   > `/rest - a set of .rest files for the API. Requires the 'REST Client' extension.`

   > `/routes - set of routes needed by the API`

   > `/swagger - a file to allow online access to the ymal document`

   > `/utils - a file to support time stamping within the API` > <br> <br>

## Getting Started- notes and guidance

1. To begin, create a Postgres database and use the files in _/db_ to build and populate the database. <br> <br>
2. Settings to identify the database and to allow access can be set in the .env file. <br> <br>
3. The listening port for the API can be set in the .env file. If no port is provided, the API will default to 4000. <br> <br>
4. Run the express application (e.g using nodemon or 'node index.js' in a vscode terminal). <br> <br>
5. To check all is well, use the .rest files to register a new booking client. <br> <br>
6. Only two end-points of the API can be accessed without a login. These are _/auth/register_ and _/auth/login_. All other routes will decline with a message requesting a login. <br> <br>
7. A user must logout (/logout) before logging in again. <br> <br>
8. The project contains a _rest_ directory with a set of example API requests. In _vscode_, these can be used directly by the _Rest Client_ extension. Alternatively the rest files contain examples that can be used in other tools to create API requests.
9. Note that there is an environment variable NODE_ENV. If the setting is NODE_ENV="development" the following is used you connect to the database:

DB_HOST=?
DB_USER=?
DB_DATABASE=?
DB_PASSWORD=?
DB_PORT=?

if NODE_ENV="production" the following is used

DATABASE_URL=?

and the database pool has the following setting

    ssl: {
      rejectUnauthorized: false,
    },

## API Detail

General - the usual html codes are used in responses. These are 200, 201, 290, 409, and for system exceptions, 500.

We now provide details of the business logic embodied in the API.

### Registration and Authorisation

`POST:/auth/register`

> Registers a new user. Uses user name to provide an account identifier and records a password (encrypted).

> Check:

     - The username provided must be new.

> Example request body:

    content-type: application/json

    {
        "user_name": "v_green",
        "firstName": "Vinny",
        "lastName": "Green",
        "password": "12345678"
    }

> Example response:

    {
        "success": true,
        "message": "Username registered"
    }

`POST:/auth/login`

> Logs in a previously registered user. Checks that account username is not already logged in.

> <i>Checks:</i>

     Checks that that the username is known.
     Checks that the correct password has been provided.

> Example request body:

    content-type: application/json
    {
      "user_name": "v_green",
      "password": "12345678"
    }

> Example response:

    {
        "success": true,
        "message": "Logon successful"
    }

`DELETE:/auth/logout`

> Logs out the current user. Checks that someone is logged in.

> Example response:

    {
        "success": true,
        "message": "Logout successful"
    }

### Physiotherapist

`GET /physios`

> Login required. Returns a list of physiotherapists from the server database. The list contains the physiotherapist's name and a description of competences.

> Example response:

    [
        {
            "physio_id": 1,
            "physio_name": "Kath Wilson",
            "description": "Specialist in athletics sports injuries."
        },
        {
            "physio_id": 2,
            "physio_name": "David Allen",
            "description": "Specialist in post surgical treatments."
        }
    ]

### Treatments

`GET /treatments`

> Login required. Returns list of treatments from the server database. The list contains the treatment name and the duration of any appointments.

> Example response:

    [
        {
            "treatment_id": 1,
            "treatment_name": "Initial assessment",
            "treatment_duration": 60
        },
        {
            "treatment_id": 2,
            "treatment_name": "Follow up",
            "treatment_duration": 40
        }
    ]

### Appointments

`GET /appointments`

> Login required. Returns a list of all appointments in the system.

> Example response:

    [
        {
            "appointment_id": 5,
            "client_name": "Sammy Brady",
            "physio_name": "David Allen",
            "treatment": "Initial assessment",
            "start_datetime": "2023-02-09T12:15:00.000Z",
            "end_datetime": "2023-02-09T13:15:00.000Z",
            "email": "sam_brady@gmail.com",
            "telephone": "079263748"
        },
        {
            "appointment_id": 6,
            "client_name": "Sammy Brady",
            "physio_name": "David Allen",
            "treatment": "Follow up",
            "start_datetime": "2023-03-07T14:15:00.000Z",
            "end_datetime": "2023-03-07T14:55:00.000Z",
            "email": "sam_brady@gmail.com",
            "telephone": "079263748"
        },
        {
            "appointment_id": 7,
            "client_name": "Sammy Brady",
            "physio_name": "David Allen",
            "treatment": "Gait analysis",
            "start_datetime": "2023-03-14T10:15:00.000Z",
            "end_datetime": "2023-03-14T11:15:00.000Z",
            "email": "sam_brady@gmail.com",
            "telephone": "079263748"
        }
    ]

###

`GET /appointments/fromdate/:date`

> Login required. Returns a list of all appointments on after a give date. The list will be ordered in date time for immediate display as a schedule.

> Example response:

    See GET /appointments

###

`GET /appointments/client/:clientName`

> Login required. Returns a list of all appointments for a give client. The list will be ordered in date time for immediate display as a schedule.

> Example response:

    See GET /appointments

###

`GET /appointments/client/:clientName/fromdate/:date`

> Login required. Returns a list of all appointments for a give client on and after a given date. The list will be ordered in date time for immediate display as a schedule.

> Example response:

    See GET /appointments

###

`GET /appointments/physio/:physio`

> Login required. Returns a list of all appointments for a give physiotherapist. The list will be ordered in date time for immediate display as a schedule.

> Example response:

    See GET /appointments

###

`GET /appointments/physio/:physio/fromdate/:date`

> Login required. Returns a list of all appointments for a give physiotherapist on and after a given date. The list will be ordered in date time for immediate display as a schedule.

> Example response:

    See GET /appointments

###

POST /appointments

> Login required. This call creates a new appointment.

> <i>Checks:</i>
> There are checks to ensure that the new appointment does not overlap with an existing appointment with the given physiotherapist.

> Example request body:

    content-type: application/json

    {
        "client_name" : "Jet Black",
        "physio_name" : "Kath Wilson",
        "treatment" : "Initial assessment",
        "start_datetime" : "2024-01-07 13:45",
        "end_datetime" : "2024-01-07 14:45",
        "email" : "jet_b@gmail.com",
        "telephone" : "079969748"
    }

    Example response 1:

    {
        "appointment_id": 124,
        "client_name": "Jet Black",
        "physio_name": "Kath Wilson",
        "treatment": "Initial assessment",
        "start_datetime": "2024-01-07T13:45:00.000Z",
        "end_datetime": "2024-01-07T14:45:00.000Z",
        "email": "jet_b@gmail.com",
        "telephone": "079969748"
    }

    Example response 2:

    {
        "status": false,
        "message": "That would create an overlapping appointment. Please choose a new start time."
    }

###

`PUT http://localhost:4000/appointments/:id`

> Login required. This call will update an appointment for a given appointment id.

> <i>Checks:</i>

        There are checks to ensure that the updated appointment does not overlap with an existing appointment with the given physiotherapist.

> Example request body:

    content-type: application/json

    {
        "client_name" : "Jetter Black",
        "physio_name" : "Kath Wilson",
        "treatment" : "Initial assessment",
        "start_datetime" : "2023-01-07 12:15:00.136",
        "end_datetime" : "2023-01-07 12:45:00.136",
        "email" : "jet_b@gmail.com",
        "telephone" : "079969748"
    }

> Example response:

    {
        "success": true,
        "message": "Appointment updated"
    }

###

`DELETE /appointments/:id`

> Logon required. This call will delete the appointment with the specified id.

> Example response.

    {
        "success": true,
        "message": "Appointment deleted"
    }

## License

The code in this project can be freely copied and distributed provided the copies bear an appropriate acknowledgement.
