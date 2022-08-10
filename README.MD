# Deployed Link: https://tdapi1.herokuapp.com/

# API End Points:

Get '/' - Welcome Message

# Authentication Endpoints:

## 1. POST '/auth/login' - Login - expects {email, password} in body
## 2. POST '/auth/register' - Signup - expects {email, password} in body
## 3. Post '/auth/changepassword' - Change Password expected body {newPassword: "Your New Password"} and jwt token in Authorization header

# Task Endpoints:
## 1. GET '/api/v1/getalltasks' - Get all tasks
## 2. POST '/api/v1/createtask' - Create a task - expects {title, description, isDone} in body

## 3. PUT '/api/v1/:id' - Update a task - expects {title, description, isDone} in body

## 4. DELETE '/api/v1/:id' - Delete a task

## 5. GET '/api/v1/:id' - Get a task

## 6. PUT "/api/v1/carryforward/:id" - increase the expiry date of a task by one day.
