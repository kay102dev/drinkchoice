# `React App`

A Drink Choice App in MERN (mongoDB, Express, React, Nodejs) Stack. (With Typescript for type-safe code)


The app creates FORM UI using the response received from up2Tom api via GET, sends user-input data again to up2Tom api for drink choice
decision making via POST. lastly stores the response using our 'Backend', an express server exposing an API handling the storing and fetching of data from MongoDB Atlas.

## Usage
Ensure you have node js installed
```
git clone https://github.com/kay102dev/drinkchoice.git
cd drinkchoice
npm install
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
npm run start dev
```

## Default UI
![Alt text](screenshot/screen1.png?raw=true "Title")

## Handle Errors
![Alt text](screenshot/error.png?raw=true "Title")

## Table
![Alt text](screenshot/table.png?raw=true "Title")


## MongoDB Cluster
![Alt text](screenshot/cluster.png?raw=true "Title")


## Validations added
- Form requires all fields to be present
![Alt text](screenshot/validation.png?raw=true "Title")


### Additions

The app incorporates the following libraries:

Here's what each package is for:
- `tailwindcss` - scans all of the HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file. 
- `mongoose` - a MongoDB object modeling tool designed to work in an asynchronous environment. Supports both promises and callbacks.
- `typescript` - the library that converts TypeScript files (file extension with `.ts` or `.tsx`) into JavaScript.
- `ts-loader` - Webpack loader that integrates TypeScript into Webpack. Webpack uses this loader to help convert TS
 files into the JS and integrate into the final bundle.  
 - `@types/react` - provide typing for React API. Also, provides intellisence and documentation. 
 - `@types/react-dom` - provide typing for React DOM API. Also, provides intellisence and documentation.
