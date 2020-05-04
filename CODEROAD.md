# Basic Node & Express

> Build a server with Node & Express

```config
config:
  testRunner:
    command: npm run programmatic-test
    fileFormats:
      - JS
      - JSON
      - .env
      - .gitignore
  repo: 
    uri: https://github.com/coderoad/fcc-basic-node-and-express
    branch: v0.3.0
  dependencies:
    - name: node
      version: >=10
```

## Meet the Node Console

> Introduction to the Node console

Node.js is a JavaScript runtime that allows developers to write backend (server-side) programs in JavaScript. Node.js comes with a handful of built-in modules - small, independent programs - that help facilitate this purpose. Some of the core modules include:

- HTTP: a module that acts as a server
- File System: a module that reads and modifies files
- Path: a module for working with directory and file paths
- Assertion Testing: a module that checks code against prescribed constraints

Express, while not included with Node.js, is another module often used with it. Express runs between the server created by Node.js and the frontend pages of a web application. Express also handles an application's routing. Routing directs users to the correct page based on their interaction with the application. While there are alternatives to using Express, its simplicity makes it a good place to begin when learning the interaction between a backend powered by Node.js and the frontend.
During the development process, it is important to be able to check what’s going on in your code. Node is just a JavaScript environment. Like client side JavaScript, you can use the console to display useful debug information. On your local machine, you would see the console output in a terminal. On Glitch you can open the logs in the lower part of the screen. You can toggle the log panel with the button ‘Logs’ (lower-left, inside the tools menu).

We recommend to keep the log panel open while working at these challenges. By reading the logs, you can be aware of the nature of errors that may occur.

### Step 1.1

```config
setup:
  files:
    - package.json
  commits:
    - 'a974aea'
    - 'bee383e'
  watchers:
    - package.json
    - node_modules/express
  commands:
    - npm install
solution:
  files:
    - package.json
  commits:
    - '63e304f'
  commands:
    - npm install
```

NPM install the "express" library module version. Use version 4.x.

### Step 1.2

```config
setup:
  files:
    - src/server.js
  commits:
    - 'd9bf5f3'
  commands:
    - npm install
solution:
  files:
    - src/server.js
  commits:
    - 'ad7af42'
```

Modify the `server.js` file to log "Hello World" to the console.

## Start a Working Server

> Create a server

In the first two lines of the file `server.js`, you can see how easy it is to create an Express app object. This object has several methods, and you will learn many of them in these challenges. One fundamental method is `app.listen(port)`. It tells your server to listen on a given port, putting it in running state. You can see it at the bottom of the file. It is inside comments because, for testing reasons, we need the app to be running in the background. All the code that you may want to add goes between these two fundamental parts. Glitch stores the port number in the environment variable `process.env.PORT`. Its value is `3000`.

Let’s serve our first string! In Express, routes takes the following structure: `app.METHOD(PATH, HANDLER)`. METHOD is an http method in lowercase. PATH is a relative path on the server (it can be a string, or even a regular expression). HANDLER is a function that Express calls when the route is matched.

Handlers take the form `function(req, res) {...}`, where req is the request object, and res is the response object. For example, the handler

```js
function(req, res) {
  res.send('Response String');
}
```

will serve the string 'Response String'.

### Step 2.1

```config
setup:
  files:
    - src/server.js
  commits:
    - '7462d28'
  commands:
    - npm install
solution:
  files:
    - src/server.js
  commits:
    - '331bdfc'
```

Use the `app.get()` method to serve the string "Hello Express" to GET requests matching the `/` (root) path.

**Note:** Be sure that your code works by looking at the logs, then see the results in your browser by running `npm start`.

## Serve an HTML File

> Serve an HTML file over the server

You can respond to requests with a file using the `res.sendFile(path)` method. You can put it inside the `app.get('/', ...)` route handler. Behind the scenes, this method will set the appropriate headers to instruct your browser on how to handle the file you want to send, according to its type. Then it will read and send the file. This method needs an absolute file path. We recommend you to use the Node global variable `\_\_dirname` to calculate the path like this:

```js
absolutePath = __dirname + relativePath / file.ext;
```

### Step 3.1

```config
setup:
  files:
    - src/views/index.html
  commits:
    - 'd806cc5'
solution:
  files:
    - src/server.js
  commits:
    - '1b04cf8'
```

Send the `/views/index.html` file as a response to GET requests to the `/` path. If you view your live app, you should see a big HTML heading (and a form that we will use later…), with no style applied.

**Note:** You can edit the solution of the previous challenge or create a new one. If you create a new solution, keep in mind that Express evaluates routes from top to bottom, and executes the handler for the first match. You have to comment out the preceding solution, or the server will keep responding with a string.

## Serve Static Assets

> Serve static CSS

An HTML server usually has one or more directories that are accessible by the user. You can place there the static assets needed by your application (stylesheets, scripts, images). In Express, you can put in place this functionality using the middleware `express.static(path)`, where the `path` parameter is the absolute path of the folder containing the assets. If you don’t know what middleware is... don’t worry, we will discuss in detail later. Basically, middleware are functions that intercept route handlers, adding some kind of information. A middleware needs to be mounted using the method `app.use(path, middlewareFunction)`. The first `path` argument is optional. If you don’t pass it, the middleware will be executed for all requests.

### Step 4.1

```config
setup:
  files:
    - src/public/style.css
  commits:
    - 'c2c1b90'
solution:
  files:
    - src/server.js
  commits:
    - 'bf27ac1'
```

Mount the `express.static()` middleware for all requests with `app.use()`. The absolute path to the assets folder is `\_\_dirname + /public`.
Now your app should be able to serve a CSS stylesheet. From outside, the public folder will appear mounted to the root directory. Your front-page should look a little better now!

## Serve JSON on a Route

> Serve JSON over a REST API

While an HTML server serves (you guessed it!) HTML, an API serves data. A <dfn>REST</dfn> (REpresentational State Transfer) API allows data exchange in a simple way, without the need for clients to know any detail about the server. The client only needs to know where the resource is (the URL), and the action it wants to perform on it (the verb). The GET verb is used when you are fetching some information, without modifying anything. These days, the preferred data format for moving information around the web is JSON. Simply put, JSON is a convenient way to represent a JavaScript object as a string, so it can be easily transmitted.

Let's create a simple API by creating a route that responds with JSON at the path `/json`. You can do it as usual, with the `app.get()` method. Inside the route handler, use the method `res.json()`, passing in an object as an argument. This method closes the request-response loop, returning the data. Behind the scenes, it converts a valid JavaScript object into a string, then sets the appropriate headers to tell your browser that you are serving JSON, and sends the data back. A valid object has the usual structure `{key: data}`. `data` can be a number, a string, a nested object or an array. `data` can also be a variable or the result of a function call, in which case it will be evaluated before being converted into a string.

### Step 1

```config
setup:
  files:
    - src/server.js
  commits:
    - 'ead9fcb'
solution:
  files:
    - src/server.js
  commits:
    - '31fd254'
```

Serve the object `{"message": "Hello json"}` as a response, in JSON format, to GET requests to the `/json` route. Then point your browser to `your-app-url/json`, you should see the message on the screen.

## Use the .env File

> Load secrets with the .env file

The `.env` file is a hidden file that is used to pass environment variables to your application. This file is secret, no one but you can access it, and it can be used to store data that you want to keep private or hidden. For example, you can store API keys from external services or your database URI. You can also use it to store configuration options. By setting configuration options, you can change the behavior of your application, without the need to rewrite some code.

The environment variables are accessible from the app as `process.env.VAR_NAME`. The `process.env` object is a global Node object, and variables are passed as strings. By convention, the variable names are all uppercase, with words separated by an underscore. The `.env` is a shell file, so you don’t need to wrap names or values in quotes. It is also important to note that there cannot be space around the equals sign when you are assigning values to your variables, e.g. `VAR_NAME=value`. Usually, you will put each variable definition on a separate line.

### Step 6.1

```config
setup:
  commits:
    - 'da2dfbc'
  watchers:
    - .env
solution:
  files:
    - .env
  commits:
    - '3037600'
```

Create a .env file in the root of your project.

### Step 6.2

```config
setup:
  files:
    - .gitignore
  commits:
    - '66a5a9e'
solution:
  files:
    - .gitignore
  commits:
    - 'b21bbf7'
```

Add the .env file to your .gitignore file. It should be kept a secret.

### Step 6.3

```config
setup:
  files:
    - .env
  commits:
    - 'b5a291a'
solution:
  files:
    - .env
  commits:
    - '508520c'
```

Let's add an environment variable as a configuration option.
Store the variable `MESSAGE_STYLE=uppercase` in the `.env` file.

### Step 6.4

```config
setup:
  files:
    - package.json
  commits:
    - '45eafdc'
  watchers:
    - package.json
    - node_modules/dotenv
solution:
  files:
    - package.json
  commits:
    - 'd400723'
  commands:
    - npm install
```

Install the dependency for the package "dotenv" as a devDependency (`npm install --save-dev module`). The package helps make variables from the .env file available in your code.

### Step 6.5

```config
setup:
  files:
    - src/server.js
  commits:
    - 'a1f1713'
solution:
  files:
    - src/server.js
  commits:
    - '44e6c3a'
```

Load dependencies into your server.js by adding the following line to the top of your file:

```js
require("dotenv").config();
```

You can test if it works by logging `process.env.MESSAGE_STYLE`.

### Step 6.6

```config
setup:
  files:
    - src/server.js
  commits:
    - '40fd774'
solution:
  files:
    - src/server.js
  commits:
    - 'f5340dc'
```

Tell the GET `/json` route handler that you created in the last challenge to transform the response object’s message to uppercase if `process.env.MESSAGE_STYLE` equals `uppercase`. The response object should become `{"message": "HELLO JSON"}`.

## Implement a Root-Level Request Logger Middleware

> Add logger middleware

Earlier, you were introduced to the `express.static()` middleware function. Now it’s time to see what middleware is, in more detail. Middleware functions are functions that take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle. These functions execute some code that can have side effects on the app, and usually add information to the request or response objects. They can also end the cycle by sending a response when some condition is met. If they don’t send the response when they are done, they start the execution of the next function in the stack. This triggers calling the 3rd argument, `next()`.

Look at the following example:

```js
function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```

Let’s suppose you mounted this function on a route. When a request matches the route, it displays the string “I’m a middleware…”, then it executes the next function in the stack.

In this exercise, you are going to build root-level middleware. As you have seen in challenge 4, to mount a middleware function at root level, you can use the `app.use(&lt;mware-function&gt;)` method. In this case, the function will be executed for all the requests, but you can also set more specific conditions. For example, if you want a function to be executed only for POST requests, you could use `app.post(&lt;mware-function&gt;)`. Analogous methods exist for all the HTTP verbs (GET, DELETE, PUT, …).

### Step 7.1

```config
setup:
  files:
    - src/server.js
  commits:
    - 'b18fa07'
solution:
  files:
    - src/server.js
  commits:
    - '9ba7d21'
```

Build a simple logger. For every request, it should log to the console a string taking the following format: `method path - ip`. An example would look like this: `GET /json - ::ffff:127.0.0.1`. Note that there is a space between `method` and `path` and that the dash separating `path` and `ip` is surrounded by a space on both sides. You can get the request method (http verb), the relative route path, and the caller’s ip from the request object using `req.method`, `req.path` and `req.ip`. Remember to call `next()` when you are done, or your server will be stuck forever. Be sure to have the ‘Logs’ opened, and see what happens when some request arrives.

**Note:** Express evaluates functions in the order they appear in the code. This is true for middleware too. If you want it to work for all the routes, it should be mounted before them.

## Chain Middleware to Create a Time Server

> Combine middleware in a chain

Middleware can be mounted at a specific route using `app.METHOD(path, middlewareFunction)`. Middleware can also be chained inside route definition.
Look at the following example:

```js
app.get(
  "/user",
  function(req, res, next) {
    req.user = getTheUserSync(); // Hypothetical synchronous operation
    next();
  },
  function(req, res) {
    res.send(req.user);
  }
);
```

This approach is useful to split the server operations into smaller units. That leads to a better app structure, and the possibility to reuse code in different places. This approach can also be used to perform some validation on the data. At each point of the middleware stack you can block the execution of the current chain and pass control to functions specifically designed to handle errors. Or you can pass control to the next matching route, to handle special cases. We will see how in the advanced Express section.

### Step 8.1

```config
setup:
  files:
    - src/server.js
  commits:
    - 'b3c244e'
solution:
  files:
    - src/server.js
  commits:
    - '5b12fa5'
```

In the route `app.get('/now', ...)` chain a middleware function and the final handler. In the middleware function you should add the current time to the request object in the `req.time` key. You can use `new Date().toString()`. In the handler, respond with a JSON object, taking the structure `{time: req.time}`.
**Note:** The test will not pass if you don’t chain the middleware. If you mount the function somewhere else, the test will fail, even if the output result is correct.

## Get Route Parameter Input From the Client

> Pass params in route names

When building an API, we have to allow users to communicate to us what they want to get from our service. For example, if the client is requesting information about a user stored in the database, they need a way to let us know which user they're interested in. One possible way to achieve this result is by using route parameters. Route parameters are named segments of the URL, delimited by slashes (/). Each segment captures the value of the part of the URL which matches its position. The captured values can be found in the `req.params` object.

<blockquote>route_path: '/user/:userId/book/:bookId'<br>actual_request_URL: '/user/546/book/6754' <br>req.params: {userId: '546', bookId: '6754'}</blockquote>

### Step 9.1

```config
setup:
  files:
    - src/server.js
  commits:
    - 'fd4a291'
solution:
  files:
    - src/server.js
  commits:
    - '6d1db55'
```

Build an echo server, mounted at the route `GET /echo/:word`. Respond with a JSON object, taking the structure `{echo: word}`. You can find the word to be repeated at `req.params.word`.

## Get Query Parameter Input from the Client

> Pass params in a query string

Another common way to get input from the client is by encoding the data after the route path, using a query string. The query string is delimited by a question mark (?), and includes field=value couples. Each couple is separated by an ampersand (&). Express can parse the data from the query string, and populate the object `req.query`. Some characters, like the percent (%), cannot be in URLs and have to be encoded in a different format before you can send them. If you use the API from JavaScript, you can use specific methods to encode/decode these characters.

<blockquote>route_path: '/library'<br>actual_request_URL: '/library?userId=546&bookId=6754' <br>req.query: {userId: '546', bookId: '6754'}</blockquote>

### Step 10.1

```config
setup:
  files:
    - src/server.js
  commits:
    - '1881c49'
solution:
  files:
    - src/server.js
  commits:
    - 'd12bd73'
```

Build an API endpoint, mounted at `GET /name`. Respond with a JSON document, taking the structure `{ name: 'firstname lastname'}`. The first and last name parameters should be encoded in a query string e.g. `?first=firstname&last=lastname`.

**Note:** In the following exercise you are going to receive data from a POST request, at the same `/name` route path. If you want, you can use the method `app.route(path).get(handler).post(handler)`. This syntax allows you to chain different verb handlers on the same path route. You can save a bit of typing, and have cleaner code.

## Use Body-Parser to Parse POST Requests

> Parse JSON from POST requests

Besides GET, there is another common HTTP verb, it is POST. POST is the default method used to send client data with HTML forms. In REST convention, POST is used to send data to create new items in the database (a new user, or a new blog post). You don’t have a database in this project, but you are going to learn how to handle POST requests anyway.
In these kind of requests, the data doesn’t appear in the URL, it is hidden in the request body. This is a part of the HTML request, also called payload. Since HTML is text-based, even if you don’t see the data, it doesn’t mean that it is secret. The raw content of an HTTP POST request is shown below:

```http
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20
name=John+Doe&age=25
```

As you can see, the body is encoded like the query string. This is the default format used by HTML forms. With Ajax, you can also use JSON to handle data having a more complex structure. There is also another type of encoding: multipart/form-data. This one is used to upload binary files.
In this exercise, you will use a urlencoded body. To parse the data coming from POST requests, you have to install the `body-parser` package. This package allows you to use a series of middleware, which can decode data in different formats.

### Step 11.1

```config
setup:
  files:
    - package.json
  commits:
    - 'e510f57'
  watchers:
    - package.json
    - node_modules/body-parser
solution:
  files:
    - package.json
  commits:
    - 'a38dc38'
  commands:
    - npm install
```

Install the `body-parser` module in your `package.json`.

### Step 11.2

```config
setup:
  files:
    - src/server.js
  commits:
    - '4249499'
solution:
  files:
    - src/server.js
  commits:
    - '2a74c71'
```

Require "body-parser" at the top of the server.js file. Store it in a variable named `bodyParser`. The middleware to handle urlencoded data is returned by `bodyParser.urlencoded({extended: false})`. Pass to `app.use()` the function returned by the previous method call. As usual, the middleware must be mounted before all the routes which need it.

**Note:** `extended=false` is a configuration option that tells the parser to use the classic encoding. When using it, values can be only strings or arrays. The extended version allows more data flexibility, but it is outmatched by JSON.