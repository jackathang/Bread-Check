# MERN Stack

This repository contains various branches showcasing different aspects of how I like to build a MERN stack application. Each branch corresponds to a specific step or function from these tutorials.

Each branch can be checked out to explore the implementation and follow the development process step by step.

[Mern App](https://www.youtube.com/watch?v=8DploTqLstE&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=2)

[User Auth on Top of App](https://www.youtube.com/watch?v=WsRBmwNkv3Q&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT)

Use Next.js to create react application, so some workarounds like CORS, and other components are needed.

The project created is a money tracking app. Capabilities so far includes

## Server:
1. Custom backend with api, connected to MongoDB
2. User accounts, being able to sign in and out.
3. Require token to access backend api
4. vareity of methods of dealing with non-user objects in database.

## Client
1. Sync frontend data with backend database
2. Data handling to and from backend database
3. User authentication
4. Variable object pages
5. Profile / Account page

**More info about the above below, listed under each step**

### Branches:

1. [express-app-basic](https://github.com/jackathang/MERN-Stack/tree/express-app-basic)  
   **Basic backend app code**

2. [express-api-router](https://github.com/jackathang/MERN-Stack/tree/express-api-router)  
   **Creates routers to be handled through the backend app**

3. [express-connect-database](https://github.com/jackathang/MERN-Stack/tree/express-connect-database)  
   **Connect calls to the backend to data handling to and from the database (MONGODB)**

4. [database-schema-setup](https://github.com/jackathang/MERN-Stack/tree/database-schema-setup)  
   **Set up schema to format / validate data to database collections**

5. [database-controller-functions](https://github.com/jackathang/MERN-Stack/tree/database-controller-functions)  
   **Set up controller functions which deal with data handling from database, calls are connected to routes.**

6. [nextjs-app-basic](https://github.com/jackathang/MERN-Stack/tree/nextjs-app-basic)  
   **Create basic nextjs app**

7. [nextjs-fetch-api-data](https://github.com/jackathang/MERN-Stack/tree/nextjs-fetch-api-data)  
   **Connects nextjs frontend to backend server to fetch API data.**

8. [nextjs-post-request](https://github.com/jackathang/MERN-Stack/tree/nextjs-post-request)  
   **POST / create new object in database from frontend component / page.**

9. [nextjs-context-hooks](https://github.com/jackathang/MERN-Stack/tree/nextjs-context-hooks)  
   **Create context and hooks which sync frontend data to the backend. For example, if updating an object, change is reflected on frontend without refresh.**

10. [nextjs-delete-request](https://github.com/jackathang/MERN-Stack/tree/nextjs-delete-request)  
    **DELETE object in database from frontend, also updates the react context.**

11. [nextjs-patch-request](https://github.com/jackathang/MERN-Stack/tree/nextjs-patch-request)  
    **PATCH object in database from frontend, refreshes context + timestamp feature.**
    **Reworked unit + set components and backend patch conrtoller to work**

11. [nextjs-app-final](https://github.com/jackathang/MERN-Stack/tree/nextjs-app-final)  
    **Final adjustments before setting up accounts**

12. [express-users-base](https://github.com/jackathang/MERN-Stack/tree/express-users-base)  
    **Sets up user routes, controller and model**

13. [users-signup](https://github.com/jackathang/MERN-Stack/tree/users-signup)  
    **Creates mongoose schema function that signups user by salting and then hashing the password, conncets to api to signup a new user.**
    **Also creates json web token function**

14. [users-login](https://github.com/jackathang/MERN-Stack/tree/users-login)  
    **Creates schema static function to login user, also sets up login functionality for login controller function**

15. [nextjs-auth-context-hooks](https://github.com/jackathang/MERN-Stack/tree/nextjs-auth-context-hookss)  
   **Create context and hooks for user auth, basicially if the user is logged in or not**

16. [nextjs-auth-forms](https://github.com/jackathang/MERN-Stack/tree/nextjs-auth-forms)  
   **Creates forms and pages for login and signin pages**
   **Pulls and stores user token in local storage**

17. [express-middleware-auth](https://github.com/jackathang/MERN-Stack/tree/express-middleware-auth)  
   **Restricts access to the /sets api to require a token before accessing**

18. [nextjs-auth-routes](https://github.com/jackathang/MERN-Stack/tree/nextjs-auth-routes)  
   **Protects users from making unauthorized api calls when not logged in**

19. [nextjs-auth-redirects](https://github.com/jackathang/MERN-Stack/tree/nextjs-auth-redirects)  
   **Redirects users to different page depending on if they're logged in or not**

## Final project [here](https://github.com/jackathang/MERN-Stack)

<!-- https://www.youtube.com/watch?v=fYaduF4iUSQ&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=17 -->
