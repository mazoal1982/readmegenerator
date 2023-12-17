// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
const questions = [{
    type: "input",
    message: "What is your project title?",
    name: "title"
},
{
    type: "input",
    message: "Enter a description for your project.",
    name: "description"
},
{
    type: "input",
    message: "Enter installation requirements for your project.",
    name: "installation"
},
{
    type: "input",
    message: "Enter how your project should be used.",
    name: "usage"
},
{
    type: "input",
    message: "Would you like to include the contributors guidelines?",
    name: "contributor"
},
{
    type: "input",
    message: "Enter any tests on how to use your project.",
    name: "tests"
},
{
    type: "checkbox",
    name: "license",
    message: "Choose a license.",
    choices: [
        "AGPLv3",
        "GPLv3",
        "LGPLv3",
        "Mozilla",
        "Apache",
        "MIT",
        "Boost",
        "Unlicense"
    ]
},
{
    type: "input",
    message: "What is your Git Hub user name?",
    name: "username"
},
{
    type: "email",
    message: "What is your email",
    name: "email"
},


]
inquirer.prompt(questions)
.then(async function (response) {
    
      try {
        const title = `# ${response.title}`;
        const description = `\n \n## Description\n \n${response.description}`;
        const table = `\n \n
## Table of Contents 
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)\n \n`; 
        const installation = `\n \n## Installation\n \n${response.installation}`;
        const usage = `\n \n## Usage\n \n${response.usage}`;
        const license = `\n \n## License\n \n${generateMarkdown(response)}`;
        const contributing = `\n \n## Contributing\n \n${response.contributor}`;
        const tests = `\n \n## Tests\n \n${response.tests}`;
        const questions = `\n \n## Questions\n \n You can find my github at https://github.com/${response.username} or email me at ${response.email}`;
        const readme = title + description + table + installation + usage + license + contributing + tests + questions;
        await fs.writeFile("README.md", readme, function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("README file created successfully!");
        });
      } catch (err) {
        console.error(err);
      }
  })

