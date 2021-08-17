# Learncube Virtual Classroom Rest API

### [Overview](README.md)
  * [Quickstart](README.md#quickstart)

### [Production Use](PRODUCTION.md)
  * [Routes](PRODUCTION.md#routes)
  * [Browser Support](PRODUCTION.md#browser)
  * [Authentication](PRODUCTION.md#authentication)
  * [Client Api Reference](PRODUCTION.md#api-reference)

### [Rest Api](RESTAPI.md)
  * [Classrooms](RESTAPI.md#classrooms)
  * [Participants](RESTAPI.md#participants)


### Classroom
Each instance of the Learncube Virtual Classroom represents an individual class, with a unique id, start time, end time, and other properties that define what type of class it will be.

#### Endpoints
Classrooms can be retrieved in a list or individually by providing the Learncube uuid.


```curl
GET https://api.learncube.com/api/virtual-classroom/classrooms/
GET https://api.learncube.com/api/virtual-classroom/classrooms/{uuid}/
```

#### Example
```json 
{
  "count": 101,
  "next": "https://api.learncube.com/api/virtual-classroom/classrooms/?page=2",
  "previous": null,
  "results": [
    {
      "uuid": "e1e3d61a-e79b-41d6-aa97",
      "teacher_first_name": "Test",
      "teacher_last_name": "Teacher",
      "teacher_avatar": "https://www.gravatar.com/avatar/7ae8da58e99182d4e74ffe3431c34cc0%3Fs%3D120%26d%3Didenticon",
      "creation_date": "2021-07-20T16:02:15Z",
      "room_token": "null",
      "cancelled": false,
      "cancelled_by": null,
      "company_slug": null,
      "description": "Test class for training",
      "start": "2021-10-12T16:00:00Z",
      "end": "2021-10-12T17:00:00Z",
      "max_participants": 5,
      "audio_only": false,
      "whiteboard_only": false,
      "teacher_attended": false,
      "teacher_attended_time": null,
      "actual_class_start": null,
      "actual_class_end": null,
      "actual_duration": 0,
      "return_url": null,
      "room_url": "https://api.learncube.com/vc/room/lc-client-test-101/",
      "room_review_url": "https://api.learncube.com/vc/room/lc-client-test-101/#/review/",
      "recorded_class_url": "https://api.learncube.com/vc/recording/lc-client-test-101/",
      "slug": "lc-client-test-101"
    }  
  ]
}
```

#### Properties
Name | Type | Description
-----|------|------------|
uuid | string | Internal Learncube unique id for tracking your class event
teacher_first_name |  string | The first name of the teacher for display in the UI 
teacher_last_name | string | The last name of the teacher for display in the UI 
teacher_avatar | url | The url of the teachers avatar for disaply in the UI
creation_date | datetime | The date the class was created
room_token | string | The unique token you provide to identify the room
cancelled | boolean | Flag for if the class is cancelled or not
cancelled_by | string | The id of the user that cancelled the class
company_slug | string | Company name formatted to create a searchable string 
description | string | Your description of the class
start | datetime | The scheduled start time / date of the class
end | datetime | The scheduled end time / date of the class
max_participants | number | The maximum amount of allowed participants per class
audio_only | boolean | The class does not use video if set to true. Good for lower speed connections
whiteboard_only | boolean | The class has only the whiteboard. Good for use with 3rd party video providers (Zoom, Skype, Meet...) 
teacher_attended | boolean | True if the teacher has attended the class
teacher_attended_time | datetime | The time / date the teacher first attended the class
actual_class_start | datetime | The real time the class started
actual_class_end | datetime | The real time the class ended
actual_duration | number | The total duration of the class
slug | string | The Learncube in-class identifier
\* return_url | url | The url to redirect to after the class has ended
\* room_url | url | The hosted url of the class
\* room_review_url | url | The url of the class review
\* recorded_class_url | url | The url of the class recording if available

\* Deprecated. This property applies to the hosted Learncube Virtual Classroom classes. For client integration they can be ignored. 


#### Query Parameters
The Classroom list can also be filtered by providing the following query parameters.

```curl
GET https://api.learncube.com/api/virtual-classroom/classrooms/?start_before=2021-07-20T16:02:15Z&page=3
```

#### Options
Name | Type | Description
-----|------|------------|
page | number| A page number of the result set. A page contains a maximum of 100 results
room_token | string | The unique token you provide to identify the room
start_before | datetime | Shows only classes scheduled to start before the date / time provided
start_after | datetime | Shows only classes scheduled to start after the date / time provided
teacher_attended | boolean | True if the teacher has attended the class
teacher_id | string | Show classes only for a particular teacher
