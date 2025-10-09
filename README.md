# Express-JS-Full-Course
Express JS Full Course from Youtube - https://www.youtube.com/watch?v=nH9E25nkk3I




Thunder Client - postman like extension

Code ref comments

#1 
 mockusers.filter((user)=> user[filter].includes(value))

 Step-by-Step Logic


.filter() is an array method that returns a new array containing only the elements that pass a certain condition.


(user) => user[filter].includes(value) is the condition function:
    user[filter] dynamically accesses a property of the user object. For example, if filter = 'username', then user[filter] is user.username.
    .includes(value) checks if the string in that property contains the substring value.