
// // 1
// const express = require('express');

// // 2
// const port = 3000;

// // 3
// const app = express();
// // const dotenv = require('dotenv');

// // 4
// // Jis format me data araha usko JSON ki form me convert krdo usko BODYPARSER kehty hai ya iska kam ye hai 
// // ke agr JSON format me araha hai data to hame pata kr ke btao ke kis format me data araha hai
// const bodyParser = require('body-parser');



// // dotenv.config();




// // 24 db in database
// require('./database/db');
// // const setupDB = require('./database/db');
// // 25 user in model
// require('./models/User')



// // 26
// const authRoutes = require('./routes/authRoute');


// // setupDB()
// // 5
// // ab hamy app.get call krna prega ab uske jagah yebe call kr skty ho
// // ye apka jo be data ata hai usko JSON format me pass kr deta hai yani jo be data server me araha wo JSON me aye ga
// app.use(bodyParser.json());

// // 27
// // ab ese use krwana  hai to es ke neche likhenge 
// app.use(authRoutes)




// // 6
// // app.get('./') is ka multab ham homePage me hain 
// // or usme HELLO WORLD return krdo ya khush be uske bad server run kren npx nodemon index.js
// app.get('/', (req, res) => {
//     res.send('This is home page');
// })


// // 8 
// // ab me chahta hun ke me 1 signup wala page page banao jis se me user ka data get kron
// // mtlb user ne jab data post kiya to uskeleye POST ki REQUEST generate hoti hai 
// // POST request jab be call hoge hamy kese pata chalega to wo ham bad me dekhenge 
// // USER ne apna data signup krne ke leye bheja to ham route me signip likhenge


// // agr hamne postman se koi data yaha pe console.log krwaana hai to waha se ye data ese bhejen ge
// // Data from Postman and show in console.log(req.body);
// // {
// //     "name": "Mohsin Mustafa",
// //     "class": "BSCS",
// //     "semester": "8"
// // }

// // 9
// //  ye code likh ke ham postman me gye waha pe post ki request banai or data test kiya

// // 24
// // ab ham routing yaha nai rkhenge kyo ke ye bohat zayada types ki hoti hai
// // app.post('/signup', (req, res) => {
// //     // ye data postman se yaha pe bheja yani yaha pe log lagaaya or data hame show hoga
// //     // yani jo be requested body hai wo yaha ajaye ge
// //     console.log(req.body);
// //     // ye data yaha se postman pe bheja yani test kiya
// //     res.send('This is signup page');
// // });

// // setupDB();

// // 10
// // es ke bad bohat sary paths hamary ese nai hote hamne ab sabse me apna DATABASE setup kr leta hun 
// // me apne MONGODB ke database se connect kr leta hun ab esy me download nai kronga Internet wale mongodb ATLAS
// // se connect kr longa uska faida ye hai ke ham use apny pc me install ni krty internet se acces krlete hai live


// //7 kis port pe server chalana hai usko listen be krwana hai
// app.listen(port, () => {
//     console.log(`server is working on port ${port}`);
// })





// // 11
// // uske bad me db.js ka folder bana leta hun
// // 12
// // or 1 model ka folder bana leta hun
// // model ka matlab ke me user ki kush details set krna chahta hun save krna chahta hun
// // yani uska name hogya email hogya to mujhe 1 structure batana prega ke is structure me data aya tb he tm loge








// const express = require('express');
// const port = 8090;
// const app = express();
// const bodyParser = require('body-parser');

// require('./database/db');
// require('./models/User')

// const authRoutes = require('./routes/authRoute');

// app.use(bodyParser.json());

// app.use(authRoutes)


// app.get('/', (req, res) => {
//     res.send('This is home page');
// })



// app.listen(port, () => {
//     console.log(`server is working on port ${port}`);
// })










// const express = require('express');
// const { MongoClient } = require('mongodb');

// const app = express();
// const port = 27017; // Specify the desired port number

// // MongoDB connection URL and database name
// // const url = 'mongodb://localhost:27017';
// const uri = "mongodb+srv://mohsinmustafaansari:mohsinmustafaansari@cluster0.m6xozxd.mongodb.net/womenSafetyApp?retryWrites=true&w=majority"

// // Connect to MongoDB
// MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//         console.error('Error connecting to MongoDB:', err);
//         return;
//     }

//     console.log('Connected to MongoDB');

//     const db = client.db();

//     // Define your API endpoints here
//     // Example:
//     app.get('/api/users', (req, res) => {
//         db.collection('users')
//             .find()
//             .toArray()
//             .then((users) => {
//                 res.json(users);
//             })
//             .catch((error) => {
//                 console.error('Error retrieving users:', error);
//                 res.status(500).send('Internal Server Error');
//             });
//     });


//     app.get('/', (req, res) => {
//     res.send('This is home page');
// })

//     // Start the server
//     app.listen(port, () => {
//         console.log(`Server listening on port ${port}`);
//     });
// });









const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./database/db');
dotenv.config();
connectDB();
const app = express();


const bodyParser = require('body-parser');

// require('./database/db');
require('./models/User')

const authRoutes = require('./routes/authRoute');
// token ko lagane ke leye as a MIDDLEWARE 
const requireToken = require('./middleware/AuthTokenRequired');
const uploadMediaRoutes = require("./routes/UploadMediaRoutes");

app.use(bodyParser.json());

app.use(authRoutes)
app.use(uploadMediaRoutes)

// ab ham yaha pe middleware laga denge TOKEN
// hamne bola ke jese he ye page load ho to pehle requireToken kro os ke bad response/request bhejo
// ab ham authTokenRequired me jaye ge  
app.post('/userdata', requireToken, (req, res) => {
    // user ka data jese he mil jaye to ham log krwa skty hain usy 
    // ab hamary key to verify hogae
    console.log("Mohsin data check kro yr middleware ke token se", req.user);
    res.send(req.user);
    // res.send('This is home page');

})

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});



