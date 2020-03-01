const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');
const teamMembers = []
const id = []
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

const init = () => {

    function createManager() {
        inquirer.prompt([{
            name: "ManagerName",
            type: "input",
            message: "What is your managers name?"
        },
        {
            name: "ManagerId",
            type: "input",
            message: "What is your Id?"
        },
        {
            name: "ManagerEmail",
            type: "input",
            message: "What's your email?"
        },
        {
            name: "OfficeNumber",
            type: "input",
            message: "What's your office number?"
        }
        ]).then(function (results) {
            const manager = new Manager(results.ManagerName, results.ManagerId, results.ManagerEmail, results.OfficeNumber)
            teamMembers.push(manager)

            id.push(results.ManagerId)

            teamMem()

        })

    }
    function teamMem() {
        inquirer.prompt([
            {
                choices: ["Engineer", "Intern", "I don't want to add any more team members"],
                name: "role",
                message: "What's your type of Team Member would you like to add?",
                type: "list"
            }
        ]).then(function (results) {
            switch (results.role) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    buildTeam();
            }
        })
    }

    function createEngineer() {
        inquirer.prompt([{
            name: "EngineerName",
            type: "input",
            message: "What is your engineer's name?"
        },
        {
            name: "EngineersId",
            type: "input",
            message: "What is your engineer's Id?"
        },
        {
            name: "EngineerEmail",
            type: "input",
            message: "What's your engineer's email?"
        },
        {
            name: "github",
            type: "input",
            message: "What's your engineer's github UserName?"
        }
        ]).then(function (results) {
            const engineer = new Engineer(results.EngineerName, results.EngineerId, results.EngineerEmail, results.github)
            teamMembers.push(engineer)

            id.push(results.EngineersId)

            teamMem()

        })
    }
    function createIntern() {
        inquirer.prompt([{
            name: "internName",
            type: "input",
            message: "What is your interns's name?"
        },
        {
            name: "internId",
            type: "input",
            message: "What is your interns's Id?"
        },
        {
            name: "internEmail",
            type: "input",
            message: "What's your interns's email?"
        },
        {
            name: "internSchool",
            type: "input",
            message: "What's your interns's school?"
        }
        ]).then(function (results) {
            const intern = new Engineer(results.internName, results.internId, results.internEmail, results.internSchool)
            teamMembers.push(intern)

            id.push(results.internId)

            teamMem()

        })

    }
    function buildTeam() {
        // Create the output directory if the output path doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
    createManager();
    
};



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not. The fs npm package may have methods to check if a directory exists, and they
// may also have methods to create a directory that doesn't...

init();
