# Learncube Virtual Classroom Client

### [Overview](README.md)
  * [Quickstart](README.md#quickstart)

### [Production Use](PRODUCTION.md)
  * [Routes](PRODUCTION.md#routes)
  * [Browser Support](PRODUCTION.md#browser)
  * [Authentication](PRODUCTION.md#authentication)
  * [Events](PRODUCTION.md#events)
  * [Client Api Reference](PRODUCTION.md#api-reference)

### [Rest Api](RESTAPI.md)
  * [Classrooms](RESTAPI.md#classrooms)
  * [Participants](RESTAPI.md#participants)

	

### Production Use
Once you've got the Quickstart app up and running, it's time for a more in-depth look the requirements and options available for production use.

### Authentication
All api calls from the Virtual Classroom Client must be authenticated using JSON Web Tokens. For more information on this see [Authentication](AUTH.md)

### Browser Support
The Virtual Classroom Client is a single page Javascript web application. It uses web-rtc for video and voice calls and websockets for real-time messaging. Browser support is below.

Edge | Firefox | Chrome | Opera | Safari | Safari iOS | Chrome Android | Firefox Android | Samsung 
-----|---------|--------|-----|---------|--------|-----|---------|--------|
\> 79 | > 64 | > 70 | > 56 | 12.1 | > 12.1 | > 70 | > 64 | > 11 | 

There have been many improvements in Web-RTC support in the latest releases of all the above browsers. For the best experience we recommend the most up-to-date version of a Chromium based browser.
<br/>
<br/>

### Routes
The Virtual Classroom uses hash routes to navigate you through the various views available. To avoid any conflicts, please ensure that the page where the client code is embedded does not use hash routes.

The available views are:

 - `#/onboarding/` - We perform basic tests and permission checks to ensure your browser is compataible and the required permissions have been granted
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


### Events

The Virtual Classroom Client emits javascript events to notify you of user actions such as: 
A user entering or exiting a class
The class starting or ending
A user has attempted to enter a breakout room

Since the constructor function returns a HTML dom element, you can attach event listeners to these events.

You can track how much time your users spend in a classroom by logging the enter and exit events, or you can redirect users to a different url to access a breakout room.

There is a full list of available events below in the [API Reference](#api-reference)
```javascript
const classroomElement = new VirtualClassroomClient(el, userConfig, classConfig)

classroomElement.addEventListener('enterClass', function (evt) {
    const user = event.detail.user;
    const timestamp = event.detail.timestamp;
    console.log('User ' + user.username + 'entered the class at ' + timestamp)
});

classroomElement.addEventListener('enterBreakoutRoom', function (evt) {
    const breakoutRoomToken = event.detail.token;
    const breakoutRoomUser = event.detail.userid;
    console.log('Redirect ' + user.username + 'to a new url to enter the breakout room with the token ' + breakoutRoomToken)
});

```
<br/>
<br/>

### API Reference

#### Constructor
```javascript
const classroom = new VirtualClassroomClient(el, userConfig, classConfig)
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
