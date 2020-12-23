const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];

let questionsEngineer = [
    {   
        type: "input",
        name:"name",
        message: "What is the name if the engineer you'd like to add?",
    },
    
    {
        typ: "input",
        name: "id",
        message: "What is the ID number of the engineer you'd like to add?",
    },

    {   
        type: "input",
        name:"email",
        message: "What is the email of the engineer you'd like to add?",
    },

    {   
        type: "input",
        name:"github",
        message: "What is the GitHub Username of the engineer you'd like to add?",
    },

    {
        type: "list",
        name: "teamMember",
        message: "What type of employee would you like to add next?",
        choices: [
            "Engineer",
            "Intern",
            "Im done adding employees",
        ]
    }
]

let questionsIntern = [
    {   
        type: "input",
        name:"name",
        message: "What is the name of the intern you'd like to add?",
    },

    {
        typ: "input",
        name: "id",
        message: "What is the ID number of the intern you'd like to add?"
    },

    {   
        type: "input",
        name:"email",
        message: "What is the email of the intern you'd like to add?",
    },

    {   
        type: "input",
        name:"school",
        message: "What school does the intern you'd like to add go to?",
    },

    {
        type: "list",
        name: "teamMember",
        message: "What type of employee would you like to add next?",
        choices: [
            "Engineer",
            "Intern",
            "Im done adding employees",
        ]
    }
]

let questionsManager = [
    {   
        type: "input",
        name:"name",
        message: "What is the name of the manager you'd like to add?",
    },

    {
        typ: "input",
        name: "id",
        message: "What is the ID number of the manager you'd like to add?",
    },

    {   
        type: "input",
        name:"email",
        message: "What is the email of the manager you'd like to add?",
    },

    {   
        type: "input",
        name:"officeNumber",
        message: "What is the office number of the manager you'd like to add?",
    },

    {
        type: "list",
        name: "teamMember",
        message: "What type of employee would you like to add next?",
        choices: [
            "Engineer",
            "Intern",
            "Im done adding employees",
        ]
    },
]

let inquirerPrompt = (questions,employee) =>{
    inquirer
    .prompt(questions)
    .then(answers => {
        let member = "";
        

        if(employee === "Manager"){
            let {name,id,email,officeNumber,teamMember} = answers
            let newTeamMember = new Manager(name,id,email,officeNumber);
            member=teamMember
            employees.push(newTeamMember);

        }else if(employee === "Engineer"){
            let {name,id,email,github,teamMember} = answers;
            let newTeamMember = new Engineer(name,id,email,github);
            member=teamMember
            employees.push(newTeamMember);

        }else if(employee === "Intern"){
            let {name,id,email,school,teamMember} = answers;
            let newTeamMember = new Intern(name,id,email,school);
            member=teamMember
            employees.push(newTeamMember);
        }
       


        if(member === "Engineer"){
            inquirerPrompt(questionsEngineer,"Engineer");

        }else if(member === "Intern"){
            inquirerPrompt(questionsIntern,"Intern");

        }else if(member === "Im done adding employees"){
           
            fs.writeFile(outputPath, render(employees), (err)=> {
                if (err) throw err;})
            console.log("Your New Team has been created!")
        }
    })

    .catch(error => {
        if(error){
            
            console.log(error)

        }
    });
};

// initially runs to ask user to add a manager
inquirerPrompt(questionsManager,"Manager");


















// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
