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

	

### Production Use
The Virtual Classroom Client is a single page Javascript web application, that can be seamlessly embedded in any HTML page and rendered in a browser.

### Authentication
All api calls from the Virtual Classroom Client must be authenticated using JSON Web Tokens. For more information on this see [Authentication](AUTH.md)

### Browser Support
The Virtual Classroom Client uses web-rtc for video and voice calls and websockets for real-time messaging. Browser support is below.

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

The Virtual Classroom Client emits [custom events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) to notify you of user actions such as: 
* A user entering or exiting a class
* A class starting or ending
* A user has attempted to enter a breakout room

You can track these events by attaching event listeners to the DOM element returned by the Virtual Classroom Client constructor function.

Each event contains a detail object that has the timestamp of when the event occurred and additional data about the event.

There is a full list of available events below in the [API Reference](#api-reference)
```javascript
const classroomElement = new VirtualClassroomClient(el, userConfig, classConfig)

classroomElement.addEventListener('enterClass', function (evt) {
    const user = event.detail.user;
    const timestamp = event.detail.timestamp;
    console.log('User ' + user.username + 'entered the class at ' + timestamp)
});

classroomElement.addEventListener('exitClass', function (evt) {
    // redirect to your own custom feedback form
    window.location.href = 'https://feedback.your-domain.com'
});

classroomElement.addEventListener('enterBreakoutRoom', function (evt) {
    const breakoutRoomToken = event.detail.token;
    const breakoutRoomUser = event.detail.userid;
    console.log('Redirect ' + user.username + 'to a new url to enter the breakout room with the token ' + breakoutRoomToken)
});
```

### Triggers
The Virtual Classroom Client also listens to custom events that you can trigger from your own javascript runtime. The events can be used to start or end a class.

```javascript
const classroomElement = new VirtualClassroomClient(el, userConfig, classConfig)
classroomElement.dispatchEvent(new CustomEvent('startClass', {'detail': {}}))
```

<br/>
<br/>

### Breakout Rooms
[Breakout Rooms](https://support.learncube.com/en/articles/4149866-using-learncube-s-breakout-rooms-feature) are additional child rooms that can be used to split a group class into smaller separate classes.

Breakout rooms can be created through the UI in the classroom or using the [REST API](RESTAPI.md). Programatically, they are identical to a standard room, just with a reference to the parent room. 

To navigate between the parent room and breakout rooms, the user must first exit the current room, and then enter the breakout room. The recommended way to allow this is to have a unique url for each classroom.

A teacher can enter a Breakout Room by clicking a link in the UI. A student can be placed into the breakout room by the teacher. In both of these cases the Virtual Classroom Client will emit a custom event containing the room token for the breakout room. You must handle this event in order to exit one room and enter another. 

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
    'instantClass': {{true | false}}
}
```
Name | Type | Required | Default  | Description
-----|---------|-----|---------|---|
publicKey | string | yes | n/a | The unique [public key](https://app.learncube.com/app/dashboard/#api) that is associated with your learncube account. This is how we identify you and what we use for authenticating API calls.|
token | string | yes | n/a  | We use this to create the classroom record in the learncube database, so it must be unique. You can create the classroom using our REST API, or if the classroom doesn't exist when you access it here, it will be created. |
userid | string | yes | n/a  | This is the id of the participant that is entering the classroom. Each user must have a unique id for the real-time messaging and video conferencing to work properly. |
username | string | no | ' ' | This is the display name of the participant that is entering the classroom. Although this is not strictly required, it is highly recommended for the teacher to differentiate whiteboard annotations and chat messages |
avatar | string | no | ' ' | A url of a thumbnail that will be used to represent the user in various places of the Virtual Classroom  |
userType | string | no | student | Optional user type to overwite any settings for an already created class. |
validateUrl | url | yes | n/a  | Url endpoint to do the validation on your server |
instantClass | boolean | yes | false | Creates a class if one does not already exist with the token provided. |

<br/>

#### Class Config
```javascript
const classConfig = {
  'lesson_materials.can_upload': true,
  'lesson_materials.enable_screenshare': true,
  'lesson_materials.enable_doc_cam': true,
  'settings.embedded_whiteboard': true,
  'settings.show_class_feedback': true,
  'settings.class_control_button': true,
  'whiteboard.enable_math_tools': true,
  'whiteboard.can_edit_all': true
}
```
Name | Type | Required | Default | Description
-----|------|----------|---------|------------|
lesson_materials.can_upload | boolean | no | Teacher: true Student false | Gives the user permission to upload content to the whiteboard during the class. |
lesson_materials.enable_screenshare | boolean | no | Teacher: true Student false |  Gives the user permission to share their screen to the whiteboard during the class.|
lesson_materials.enable_doc_cam | boolean | no | Teacher: true Student: false  | Gives the user permission to share an additional camera feed to the whiteboard during the class. |
settings.embedded_whiteboard | boolean | no | false | Overwrites the class type to render the class in whiteboard only mode. There is no video or chat components in this view. |
settings.show_class_feedback | boolean | no | true | Shows the class feedback form at when the class is ended |
settings.class_control_button | boolean | no | false | Shows a button to start / end the class instead of the standard dropdown |
whiteboard.enable_math_tools | boolean | no | false | Enables maths tools to use on the whiteboard |
whiteboard.can_edit_all | boolean | no | true | Enables user to edit all annotations on the whiteboard.|

#### Events
Name | Triggered By | Example Payload | 
-----|--------------|---------|
enterClass | Entering a classroom | `{user: {userid: "12345G"}, timestamp: 1629448350461}` 
exitClass | Exiting a classroom | `{user: {userid: "12345G"}, timestamp: 1629448350461}` 
updateClassStatus | Exiting a classroom | `{classStatus: "in-progress", timestamp: 1629448350461}`  
enterBreakoutRoom | Clicking link to enter a Breakout Room | `{token: 'breakout-token', userid: "12345G", timestamp: 1629449473109}`

#### Triggers
Name | Example Payload | 
-----|---------|
startClass | n/a 
endClass | n/a 