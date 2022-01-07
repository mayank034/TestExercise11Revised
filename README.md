# TestExercise11

Problem Statement :-
 Create a Reminder App which can be used for day to day updates on important events of the day.
 It also should consist of features to create reminders for birthdays, holidays and anniversaries.
 You can also add different priorities of the reminders,notes and descriptions as well.
 
 Tasks :- 
 1. Sign Up Page/Api.- Api for sign up should have basic fields like email, password , name. Default role should be Admin.
 2. Sign In Page/Api. - Sign in form should have email and password and enable the user to login into the system by creating an access token.
 3. Forgot Password flow. - User should be able to reset his lost password and create a new one.
 4. Create Reminder API /Form - Create a new reminder by providing a description and a date (time of the day and recurring reminders are not required).
 5. Update Reminder API /Form - Update a reminder description or date.
 6. Functionality for Updating Status of reminder - Mark a reminder as completed or reopen it.
 7. List the coming reminders and also to be able to list reminders for a specific date. The list must also have an optional filter by reminder status (open or completed).
 8. Delete a specific reminder, delete all reminders for a specific date or delete all completed reminders.
 
Steps to run the project :-
1. Run 'npm i' to install all the node_modules.
2. Run 'npm run generate-migration' to transpile the typescript code into javascript and generate migrations( creating tables in schema ).
3. Run 'npm run start' to transpile and run the server( or run 'npm run serve' just to start the server).
4. After above steps the apis can be tested through Postman.
