# Learncube Virtual Classroom Client

### [Overview](README.md)
  * [Quickstart](README.md#quickstart)

### [Production Use](PRODUCTION.md)
  * [Routes](PRODUCTION.md#routes)
  * [Browser Support](PRODUCTION.md#browser)
  * [Authentication](PRODUCTION.md#authentication)
  * [Events](PRODUCTION.md#events)
  * [Breakout Rooms](PRODUCTION.md#breakout-rooms)
  * [Client Api Reference](PRODUCTION.md#api-reference)

### [Rest Api](RESTAPI.md)
  * [Classrooms](RESTAPI.md#classrooms)
  * [Participants](RESTAPI.md#participants)

### Overview
The Learncube Virtual Classroom is is an online learning environment that allows teachers and students to communicate, interact, collaborate through our video conferencing tool, chat box and interactive whiteboard. You can access all your past classes, upload and store class content, create breakout rooms, record your lessons and conduct classes in Conversation or Whiteboard-Only mode. 

<img src="https://www.learncube.com/images/blog_images/LearnCube-Update-July-2019.png">

<br/>
<br/>

### Quickstart Guide 

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
      <link rel="stylesheet" type="text/css" href="https://static.learncube.net/client/virtualclassroom.api.0.1.6.css">
      <script type="text/javascript" src="https://static.learncube.net/client/virtualclassroom.api.0.1.6.js"></script>
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

<br/>
<br/>




