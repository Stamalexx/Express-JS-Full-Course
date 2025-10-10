# Express-JS-Full-Course
Express JS Full Course from Youtube - https://www.youtube.com/watch?v=nH9E25nkk3I


npm run start:dev -to start the project


Thunder Client - postman like extension

Code ref comments

#1 
 mockusers.filter((user)=> user[filter].includes(value))

 Step-by-Step Logic


.filter() is an array method that returns a new array containing only the elements that pass a certain condition.


(user) => user[filter].includes(value) is the condition function:
    user[filter] dynamically accesses a property of the user object. For example, if filter = 'username', then user[filter] is user.username.
    .includes(value) checks if the string in that property contains the substring value.




#2
const newUser = {id: mockusers[mockusers.length - 1].id + 1, ...body};

mockusers is an array of user objects.
mockusers[mockusers.length - 1] gets the last user in the array.
.id + 1 increments that user's ID to create a new unique ID for the new user.
(This assumes that mockusers is not empty and that IDs are numeric and sequential.)

...body : This uses the spread operator to copy all properties from request.body into the new object.


#3

mockusers[findUserIndex]: This accesses the user object at the index found earlier using findIndex.
{ ...mockusers[findUserIndex], ...body }: This creates a new object by:

Copying all properties from the existing user (...mockusers[findUserIndex])
Overwriting or adding properties from the request body (...body)