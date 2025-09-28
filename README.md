**Setup**

Install TypeScript as a development dependency:

**npm install typescript --save-dev**

**Compile and Watch**

To compile TypeScript files and watch for changes:

**npx tsc --watch**


This will generate JavaScript files in the dist folder (as configured in tsconfig.json).

**Run**

Since browsers block file:// imports, you need to run index.html on a local server.

**npm install -g serve**

**serve .**

Open the URL shown in the console (usually http://localhost:3000) in your browser..

The compiled JavaScript from dist will be loaded automatically.
