1. Whenever you will connect your application to a database, always wrap the connection code inside a try catch block and promises/async await. Dont assume that the connection will always work.
2. Database is an another continent.


Custom API Responses and Error Handling

Q. When do we use app.use() in express and nodejs application
`app.use()` is a method used to mount middleware functions at a specified path.

app.use() methods are used for configurations and middleswares(with or without url paths)

the files inside utils/ are there for wrapping frequent async/await and try...catch blocks in controllers and functions.

Using cloudinary to store the avatar and coverImage

Difference between bcrypt and  bcryptjs

learn about cors

In mongose models, we can define middleware(also pre-hooks) before the saving the data in the DB
**JWT is a bearer token**- joh bhi mujhe ye bhejega, mai usko data bhejunga

here, Hitesh is using both cookeis and sessions, quite secure.
Access token is not stored in the Database, but Refresh token is

File Upload is handled by backend Engg
For File Uploads, various services. and writing the function in a separate utiliity file

Slangish way to remember middlewares- *jaane se pehle mujhse milkar jaana*
Multer is commonly used package for file uploading 
Express-fileupload is an older way 
Initially, file uploaded using multer

multer to local server to cloudinary
In production-grade settings, file is taken from the user and stored in the local server temporarily, then using cloudinary, file from local storage and sent to the cloud server.
Done incase of any upload issues, the process can re-attempted

Why multer code is used a middleware?
jaha jaha file uploading capabilities ki jarurat hogi waha waha ye middleware inject kar denge

Need to read about multer, especially its other options and config

> Backend Engineers first consider all the corner cases, scenarios and design decisions, and not just write routes and controllers half-ass way.  that is what they are paid for.

## HTTP Crash Course
URL/URI/URN
- HTTP Headers
	metadata --> key-value sent along with req and res
	Headers are used for caching, authentication, manage State(example-logged in, guest login)
	Before 2012, headers used to start with X-prefix, now deprecated.

	Request Headers -> From Client
	Response Headers -> From Server
	Representaion Headers -> encoding/compression
	Payload Headers -> data

	Most Common Headers
		Accept: application/json
		User-agent
		Authorization(Bearer     )
		Content-Type
		Cookie
		Cache-control- 
   CORS
	   Access-Control-Allow-Origin		
	   Access-Control-Allow-Credentials
	   Access-Control-Allow-Method
	   
	Security
	    Cross-Origin-Embedder-Policy
		Cross-Origin-Opener-Policy
		Content-Security-Policy
		X-XSS-Protection

These are just headers, just info, nothing happens on its own. we have to define the header's behaviour

**HTTP Methods**
GET : Retrieve a resource
HEAD : No message body( Response headers only)
OPTIONS : what operations are available
TRACE : loopback test ( get some data)
DELETE : remove a resource
PUT : replace a resource
POST : interact with resource(mostly add)
PATCH : change a part of resource

We are supposed to write the logic of the methods on our own, nothing happends automatically.

**HTTP Status Code**
1. 1xx Informational
2. 2xx Success
3. 3xx Redirection
4. 4xx Client Error
5. 5xx Server Error

| Status                 | Codes                     |
| ---------------------- | ------------------------- |
| 100 Continue           | 400 Bad Request           |
| 102 Processing         | 401 Unauthorized          |
| 200 OK                 | 402 Payment Required      |
| 201 Created            | 404 Not Found             |
| 202 Accepted           | 500 Internal Server Error |
| 307 Temporary Redirect | 504 Gateway time out      |
| 308 Permanent Redirect |                           |

### Refresh Token and Access Tokens



## Subscription Schema
Channels and Subscribers

if you want to count the number of subscribers of a channel Chai aur Code, we will select all the documents containing the channel Chai aur Code.

How many channels the subscriber Vishal has subscribed to?
-> Select the documents containing subscriber as Vishal and pick out the channels list. 