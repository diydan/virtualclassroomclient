# Learncube Virtual Classroom Client

### Overview
The Learncube Virtual Classroom is is an online learning environment that allows teachers and students to communicate, interact, collaborate through our video conferencing tool, chat box and interactive whiteboard. You can access all your past classes, upload and store class content, create breakout rooms, record your lessons and conduct classes in Conversation or Whiteboard-Only mode. 

<img src="https://www.learncube.com/images/blog_images/LearnCube-Update-July-2019.png">

<br/>
<br/>

### Quickstart Guide (Testing Mode)

Learcube's Virtual Classroom Client is a simple to use drop-in widget that allows you to embed a fully equipped virtual classroom in any web page or LMS.

Learncube's Virtual Classroom is only available to Learncube customers with API access enabled. Getting started is simple. 

- Log in to your [Learncube Account](https://app.learncube.com/), or [Sign up here for free](https://app.learncube.com/app/create/).
- Get your public and private [api keys here](https://app.learncube.com/app/dashboard/#api) from your Learcube API Dashboard. (Leave the account mode to testing in order to follow this example)
- Clone the quickstart app to your local machine

  ```shell 
  git clone https://github.com/brianjfinnerty/virtualclassroomclient.git
  ```

- Replace the variables in the `.env` file with real data from your Learncube API account.
  ```
  # Private Key
  privateKey={privatekeyfromyouraccount}

  # Learncube user username
  username={usernamefromyouraccount}

  # Learcube user id
  user_id={useridfromyouraccount}

  # Learncube user email
  email={emailyouusedtosignup}
  ```
  ***Important: This must match the user data we have stored for the Learncube account holder.***

- Replace the Classroom participant data in the `index.html`file with user data of a classroom participants. 

  ***Note: This does not have to match the user data in your `.env` file. All your classroom participants, teachers, students and admins, will access the classroom using your Learncube account details.***
  ```html
      <div id="virtual-classroom-client"></div>
      <link rel="stylesheet" type="text/css" href="https://static.learncube.net/virtualclassroom/widget.css">
      <script type="text/javascript" src="https://static.learncube.net/virtualclassroom/widget.js"></script>
      <script type="text/javascript">
          const classroom = new VirtualClassroom('#virtual-classroom-client',
              {
                  'token': {{UNIQUE ROOM TOKEN HERE}}, // Eg. first-test-room-token
                  'userid': {{FAKE USER ID HERE}}, // Eg. 12345G
                  'username': {{FAKE USERNAME HERE}}, // Eg. 'Test Widget Teacher',
                  'publicKey': {{YOUR PUBLIC KEY HERE}}',
                  'userType': 'teacher',
                  'validateUrl': '/get-valid-token/'
              });
      </script>
  ```

- Install dependencies and run 
  ```shell
  cd virtualclassroomclient
  npm install
  npm start
  ```

- Navigate to http://localhost:3000 and enter your first classroom.

<!-- 
- Copy the following snippet into your web page, replacing the variables: 
  - PUBLICKEY with your valid Learncube API public key
  - ROOMTOKEN with a unique string with which to identify the classroom
  - PARTICIPANTID with a string user id to identify the participant
```html

    <div id="virtual-classroom-client"></div>

    <link rel="stylesheet" type="text/css" href="https://static.learncube.net/virtualclassroom/widget.css">
    <script type="text/javascript" src="https://static.learncube.net/virtualclassroom/widget.js"></script>
    <script type="text/javascript">
        const classroom = new VirtualClassroom('#virtual-classroom-client', {
          {
            'token': {{ROOMTOKEN}},
            'userid': {{PARTICIPANTID}},
            'publicKey': {{PUBLICKEY}},
        });
    </script>
```
- Enter the virtual classroom and start your Learncube journey. For more details on the options available see below

<br/>
<br/>
-->
<br/>
<br/>


### Browser Support
The Virtual Classroom Client is a single page Javascript web application. It uses web-rtc for video and voice calls and websockets for real-time messaging. Browser support is below.

Edge | Firefox | Chrome | Opera | Safari | Safari iOS | Chrome Android | Firefox Android | Samsung 
-----|---------|--------|-----|---------|--------|-----|---------|--------|
> 79 | > 64 | > 70 | > 56 | 12.1 | > 12.1 | > 70 | > 64 | > 11 | 

There have been many improvements in Web-RTC support in the latest releases of all the above browsers. For the best experience we recommend the most up-to-date version of a Chromium based browser.

<br/>
<br/>

### Routes
The Virtual Classroom uses hash routes to navigate you through the learning experience. To avoid any conflicts, please ensure that the page where the client code is embedded does not use hash routes
 - `#/onboarding/` - We perform basic tests and permission checks to ensure your browser is compataible
 - `#/teacher/` - The main route for a teacher in a live class
 - `#/teacher/ended/` - Video call and socket connections are closed and the user can submit feedback about the class
 - `#/student/arrived/` - The waiting room for a student before the class starts
 - `#/student/` - The main route for a student in a live class
 - `#/student/ended/` - Video call and socket connections are closed and the user can submit feedback about the class
 - `#/student/removed/` - Where the student arrives after being removed from the class by the teacher
 - `#/review/` - A read-only version of the classroom without video where students and teachers can review the content
 - `#/whiteboard/` - A whiteboard-only version of the classroom, designed for use with 3rd party video conferencing tools
 - `#/whiteboard/ended/` - The end class view for a whiteboard only class

<br/>
<br/>


### Production Use
The snippet above contains:
 - `widget.js` contains all the javascript necessary to run the virtual classroom
 - `widget.css` contains the styles to render it on any device. You can add or overwrite any styles in your webpage.
 - A DOM element in which to render the classroom, which is also passed as the first parameter in the Constructor function.
 - An execution of the Constructor function with the minimum required parameters. Addtional parameters are detailed in the API Reference

To run the classroom in production we require you to:
1. Switch your api mode to "Production"
2. Set up a HTTP endpoint for authentication 
3. Provide additional user data for the classroom participant.
<br/>
<br/>


### Authentication
In "Testing Mode" the Learncube API performs a pseudo validation and returns a fake random user generated for the purposes of testing. 

In production the Learncube Virtual Classroom uses [JSON Web Tokens (JWT)](https://jwt.io/) to validate all api calls. JSON Web Tokens are encoded strings that consist of 3 parts, header, payload and signature, separated by dots. The JWT must be generated by you and added to each request in the "Authorization" header. The URL for this authentication endpoint must be included in the `userConfig` parameter that is passed to the constructor.

The ***Header*** typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
The ***Payload*** consists of user data corresponding to the Learncube API Users account (username, user_id, email) and a timestamp that is some time in the future. The `exp` property defines when this token will expire. We recommend a value between 5 and 15 minutes.

*** Important: This must match the user data we have stored for the Learncube account holder. ***
```json
{
  "username": "learncube_user",
  "user_id": 12345,
  "email": "learncube_user@yourdomain.com",
  "exp": 1626254079
}
```
The ***Signature*** is the consists of the header and payload, encrypted with your Learcube Private Key using the algorithm contained in the header.

The end result is three Base64-URL strings separated by dots. The HTTP response from your auth endpoint must have a 200 status code and return the token in a valid JSON object with `token` as the key.

```json
{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlYXJuY3ViZV91c2VyIiwidXNlcl9pZCI6MTIzNDUsImVtYWlsIjoibGVhcm5jdWJlX3VzZXJAeW91cmRvbWFpbi5jb20iLCJleHAiOjE2MjYyNTQwNzl9.tnIG4tJcpZ0sT4THyvQTvOckUStKbwUOkAsKatYMti4"}
```


The Learncube Virtualclassroom Client will include this token in the authoraization header in each request to the Learncube API server. When the token expires, we will return a `401 Unauthorized` error response, immediately re-request a token from your auth endpoint and retry the request the unauthorised request. 
***Important: Never share your secret key with anyone or include it in publicly visible code.*** 

#### Samples
There are many good libraries available for creating JWT's. Some samples below.

[Node - jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
```javascript
const jwt = require('jsonwebtoken')

const token = jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: {
    "username": "learncube_user",
    "user_id": 12345,
    "email": "learncube_user@yourdomain.com"
  }
}, "your-secret-key", { algorithm: 'HS256' })

const header = "Bearer " + token
```

[Python - pyjwt](https://pyjwt.readthedocs.io/en/stable/)
```python
import jwt, datetime
token = jwt.encode({
    "username": "learncube_user",
    "user_id": 12345,
    "email": "learncube_user@yourdomain.com"
    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=5)
  }, 'your-secret-key', algorithm="HS256")

header = "Bearer " + token
```

<!---
In production, you must perform the validation on your own server, by setting up a HTTP endpoint and configuring it to accept POST requests. The location of this endpoint must be saved in the [Learcube Dashboard](https://app.learncube.com/app/dashboard/#api.
<br/>

#### Successful Response
You create the logic on your side to determine if the "token" is valid and if the participant (based on the "userid") should be able to join the class. If valid the reply should have a 200 status code and a JSON response such as the following:
```json
{
  "status": true,
  "userid": "12345",
  "avatar": "https://randomuser.me/api/portraits/thumb/women/43.jpg",
  "full_name": "Jane Smith",
  "is_teacher": true
}
```

Name | Type | Required | Description
-----|---------|-----|---------|
status | boolean | yes | True if the user has been validated successfully |
userid | string | yes | The unque id of the class participant |
avatar | string | no | A url to a thumbnail of the users avatar for display in the classroom |
full_name | string | yes | A username for display in the classroom |
is_teacher | boolean | no | Tells us whether the participant should have teacher permissions or not. Note: This can be overwritten by including the `userType` property in the config options at class start time. |
<br/>

#### Unsuccessful Response
If the validation is not successful we expect a JSON response like this.
```json
{
  "status": false,
  "message": "User has not been validated"
}
```
Name | Type | Required | Description
-----|---------|-----|---------|
status | boolean | yes | True if the user has been validated successfully |
message | string | yes | Information about why the validation failed. This message will be displyed in the UI for the user |
--->
<br/>
<br/>

### API Reference

#### Constructor
```javascript
const el = VirtualClassroomClient(el, userConfig, classConfig)
```

#### Parameters
Name | Type | Required | Description
-----|---------|-----|---------|
el | string | yes | The id attribute of the DOM element in which to embed the VirtualClassroom |
userConfig | object | yes | Contains user data to validate and connect to the class |
classConfig | object | no | Contains specific options about the class |

#### Returns
The constructor returns the DOM element passed in as the first parameter. Event listeners can be attached to this element to handle custom events dispatched from the Learncube Virtual Client.

<br/>

#### User Config
```javascript
const userConfig = {
    'publicKey': {{PUBLICKEY}},
    'token': {{ROOMTOKEN}},
    'userid': {{PARTICIPANTID}},
    'username': {{PARTICIPANTNAME}},
    'avatar': {{PARTICIPANTTHUMBNAIL}},
    'userType': {{'teacher'|'student'}},
    'validateUrl': {{auth.your-server.com}},
}
```
Name | Type | Required | Description
-----|---------|-----|---------|
publicKey | string | no | The unique [public key](https://app.learncube.com/app/dashboard/#api) that is associated with your learncube account. This is how we identify you and what we use for authenticating API calls.|
token | string | yes | We use this to create the classroom record in the learncube database, so it must be unique. You can create the classroom using our REST API, or if the classroom doesn't exist when you access it here, it will be created. |
userid | string | yes | This is the id of the participant that is entering the classroom. Each user must have a unique id for the real-time messaging and video conferencing to work properly. |
username | string | no | This is the display name of the participant that is entering the classroom. Although this is not strictly required, it is highly recommended for the teacher to differentiate whiteboard annotations and chat messages |
avater | string | no | A url of a thumbnail that will be used to represent the user in various places of the Virtual Classroom  |
userType | string | no | Optional user type to overwite any settings for an already created class. Defaults to student if not provided |
validateUrl | url | yes | Url endpoint to do the validation on your server |

<br/>

#### Class Config
```javascript
const classConfig = {
  'lesson_materials.can_upload': true,
  'lesson_materials.enable_screenshare': true,
  'lesson_materials.enable_doc_cam': true,
  'settings.embedded_whiteboard': true,
  'settings.show_class_feedback': true,
  'whiteboard.enable_math_tools': true,
  'whiteboard.can_edit_all': true
}
```
Name | Type | Required | Description
-----|---------|-----|---------|
lesson_materials.can_upload | boolean | no | Gives the user permission to upload content to the whiteboard during the class. Default is true for Teacher and false for Students |
lesson_materials.enable_screenshare | boolean | no | Gives the user permission to share their screen to the whiteboard during the class. Default is true for Teacher and false for Students |
lesson_materials.enable_doc_cam | boolean | no | Gives the user permission to share an additional camera feed to the whiteboard during the class. Default is true for Teacher and false for Students |
settings.embedded_whiteboard | boolean | no | Overwrites the class type to render the class in whiteboard only mode. There is no video or chat components in this view |
settings.show_class_feedback | boolean | no | Shows the class feedback form at when the class is ended |
whiteboard.enable_math_tools | boolean | no | Enables maths tools to use on the whiteboard |
whiteboard.can_edit_all | boolean | no | Enables user to edit all annotations on the whiteboard. Default is true for all users |


