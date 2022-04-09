import * as fs from 'fs';
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
    /* Connectors */
import connectDatabase from '../configurations/database.js'

    /* Models */
import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import City from '../models/cityModel.js'
import Institution from '../models/institutionModel.js'


/* Since this file is disconnected from the main code,
the need to configure the environment variables manually once again */
dotenv.config()

connectDatabase()

const FAILURE = 1;

async function destroyCities(){
  /* this function removes all the data in the cities collection */

  await City.deleteMany({});

  console.log('Cities succesfully destroyed'.red);
}

async function destroyInstitutions(){
  /* this function removes all the data in the institutions collection */

  await Institution.deleteMany({});

  console.log('Institutions succesfully destroyed'.red);
}

async function destroyPosts(){
  /* this function removes all the data in the posts collection */

  await Post.deleteMany({});

  console.log('Posts succesfully destroyed'.red);
}

async function destroyUsers(){
  /* this function removes all the data in the users collection */

  await User.deleteMany({});

  console.log('Users succesfully destroyed'.red);
}

async function seedPosts(users, institutions, cities){
  /* this function seed the posts to the database */

  await destroyPosts();
  
  const rawPosts = fs.readFileSync('./data/posts.json');

  const posts = JSON.parse(rawPosts);

  /* Assign a user to each post randomly */
  /* Assign an institution to each post randomly */
  /* Assign a city to each post randomly */
  /* Assign random users to the starrers of each post */

  /* for each post, do the steps above */
  posts.forEach(post => {

    /* get a random seller */
    let randomUserIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomUserIndex];
    const randomUserID = randomUser._id;

    // assign the seller to the post
    post.seller = randomUserID;

    /* get a random institution */
    let randomInstitutionIndex = Math.floor(Math.random() * institutions.length);
    const randomInstitution = institutions[randomInstitutionIndex];
    const randomInstitutionID = randomInstitution._id;

    // assign the institution to the post
    post.relatedInstitution = randomInstitutionID;


    /* get a random city */
    let randomCityIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomCityIndex];
    const randomCityID = randomCity._id;

    // assign the city to the post
    post.relatedCity = randomCityID;

    
    /* assign random users that have starred this post */

    /* get a random number of users */
    let randomNumberOfUsers = Math.ceil(Math.random() * users.length);

    let randomlyChosenPeople = [];

    /* randomly choose these users */
    for(let counter = 0; counter < randomNumberOfUsers; counter++){
      /* get a random user who stars this post */
      let randomUserIndex = Math.floor(Math.random() * users.length);
      const randomUser = users[randomUserIndex];
      const randomUserID = randomUser._id;

      if(randomlyChosenPeople.includes(randomUserID)){
        // if the same people has been chosen randomly, keep choosing
        counter--;
        continue;
      }

      randomlyChosenPeople.push(randomUserID);
    }

    /* make these people star this post */
    post.starredBy = randomlyChosenPeople;

  })

  /* Create these post with the computed relations */
  let createdPosts = await Post.insertMany(posts);

  /* Right after the posts are created,
    it is necessary to keep published posts reference on the user side as weel */
  
  
  for(let post of createdPosts){

    let sellerID = post.seller._id.toString(); // get the seller id of the post

    let seller = await User.findById(sellerID);

    seller.publishedPosts.push(post._id); /* keep the post reference in seller side as well */

    await seller.save();

  }
  
  
  /* Right after the posts are created,
     it is necessary to keep the starred posts reference on the user side as well 
  */

  for(let post of createdPosts){

    let likers = post.starredBy; /* get the people who like this post */

    for(let liker of likers){
      /* for each liker of this post, keep the post reference in the liker object */
      let user = await User.findById(liker);

      user.starredPosts.push(post._id); 

      await user.save();
    }
  }
  
  console.log('Posts succesfully seeded'.green);

  return createdPosts;
 
}

async function seedUsers(){
  /* this function will seed the users to the database */

  await destroyUsers();
  
  const rawUsers = fs.readFileSync('./data/users.json');

  const users = JSON.parse(rawUsers);

  const result = [];

  for(let user of users){
    /* Create each user seperately */
    let createdUser = await User.create(user);

    result.push(createdUser);
  }

  console.log('Users succesfully seeded'.green);

  return result;
 
}


async function seedInstitutions(){
  /* this function will seed the institutions to the database */

  await destroyInstitutions();
  
  const rawInstitutions = fs.readFileSync('./data/institutions.json');

  const institutions = JSON.parse(rawInstitutions);

  console.log('Institutions succesfully seeded'.green);

  return await Institution.insertMany(institutions);
 
} 

async function seedCities(){
  /* this function seeds the cities to the database */

  await destroyCities();
  
  const rawCities = fs.readFileSync('./data/cities.json');

  const cities = JSON.parse(rawCities);

  console.log('Cities succesfully seeded'.green);

  return await City.insertMany(cities);
 
}


async function seedDatabase(){
  /* this function seeds the database with mock posts, users, cities and institutions */
  
  /* first seed cities and institutions */
  let createdCities = await seedCities();
  let createdInstitutions = await seedInstitutions();

  /* second, seed users */
  let createdUsers = await seedUsers();

  /* third, seed posts */
  let createdPosts = await seedPosts(createdUsers, createdInstitutions, createdCities);

  console.log("Database seeded.".green.inverse);
}

async function destroyDatabase(){
  /* this function destroys everything in the database */

  await destroyCities();
  await destroyInstitutions();
  await destroyPosts();
  await destroyUsers();

  console.log('Database succesfully destroyed'.red.inverse);
}



/* this file is a seperate script that is NOT GOING to be used by the server code */
/* it will be used by the system admin with commands in the terminal */
/* so it is better to process the commands */

let OPTION = process.argv[2]; /* which option (destroy or seed) is chosen */

let SEED = '--seed';
let DESTROY = '--destroy';

if( OPTION === DESTROY ){
    /* this command destroys everything in the database */

    await destroyDatabase();

    process.exit();
  }
else if (OPTION === SEED){
  /* this command seeds the database with all the data provided in the data folder */

    await seedDatabase();

    process.exit();
}
else {
    console.error('Invalid option'.red.bold);

    process.exit(FAILURE);
}