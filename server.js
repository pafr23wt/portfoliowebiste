/** @format */

// GLOBAL DEFINITIONS
const adminName = "Frida";
const adminPassword =
  "$2b$12$Bh7jD3XxvDZik7vONDTprOXK9.pWx2q3qD25KV7ZhRmJ/SKCLYf4m"; // password = 1234

// PACKAGES
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const { engine } = require("express-handlebars");
const bcrypt = require("bcrypt");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

// CONSTANTS
const app = express();
const port = 8080;
const dbFile = "my-project-data.sqlite3.db";
const db = new sqlite3.Database(dbFile);
const saltRounds = 12;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// STATIC FILE SERVING
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static("public"));

// SET UP HANDLERBARS VIEW ENGINE
app.engine(
  "handlebars",
  engine({
    helpers: {
      eq(a, b) {
        return a == b;
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// DATABASE INITIALIZATION
function initTableProject(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY, 
      name TEXT NOT NULL, 
      type TEXT NOT NULL, 
      desc TEXT NOT NULL, 
      year INTEGER NOT NULL,
      url TEXT)`,
    (error) => {
      if (error) {
        console.log("ERROR: ", error);
      } else {
        console.log("---> Table 'projects' created!");

        projects.forEach((oneProject) => {
          db.run(
            "INSERT INTO projects (name, type, desc, year, url) VALUES (?, ?, ?, ?, ?)",
            [
              oneProject.name,
              oneProject.type,
              oneProject.desc,
              oneProject.year,
              oneProject.url,
            ],
            (error) => {
              if (error) {
                console.log("ERROR: ", error);
              } else {
                console.log("Line added into the projects table!");
              }
            }
          );
        });
      }
    }
  );
}

function initTableSkills(db) {
  // Create table 'skills' and insert initial data
  db.run(
    `CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY, 
      name TEXT NOT NULL, 
      type TEXT NOT NULL, 
      desc TEXT NOT NULL, 
      level INTEGER NOT NULL)`,
    (error) => {
      if (error) {
        console.log("ERROR: ", error);
      } else {
        console.log("---> Table 'skills' created!");

        skills.forEach((oneSkill) => {
          db.run(
            "INSERT INTO skills (name, type, desc, level) VALUES(?, ?, ?, ?)",
            [oneSkill.name, oneSkill.type, oneSkill.desc, oneSkill.level],
            (error) => {
              if (error) {
                console.log("ERROR: ", error);
              } else {
                console.log("Line added into the skills table!");
              }
            }
          );
        });
      }
    }
  );
}

function initTableCode(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS codes (
      cid INTEGER PRIMARY KEY, 
      cname TEXT NOT NULL, 
      ctype TEXT NOT NULL, 
      cdesc TEXT NOT NULL, 
      cyear INTEGER NOT NULL,
      curl TEXT)`,
    (error) => {
      if (error) {
        console.log("ERROR: ", error);
      } else {
        console.log("---> Table 'codes' created!");

        codes.forEach((oneCode) => {
          db.run(
            "INSERT INTO codes (cname, ctype, cdesc, cyear, curl) VALUES (?, ?, ?, ?, ?)",
            [
              oneCode.name,
              oneCode.type,
              oneCode.desc,
              oneCode.year,
              oneCode.url,
            ],
            (error) => {
              if (error) {
                console.log("ERROR: ", error);
              } else {
                console.log("Line added into the codes table!");
              }
            }
          );
        });
      }
    }
  );
}

const projects = [
  {
    id: "1",
    name: "Coffeetable-book",
    type: "Design",
    desc: "A spread in a coffeetable book about Charles and James Eames.",
    year: 2023,
    url: "/img/coffetable1.jpg",
  },
  {
    id: "2",
    name: "Coffeetablebook spread 2",
    type: "Research",
    desc: "Second spread in the coffeetable book.",
    year: 2023,
    url: "/img/coffetable2.jpg",
  },
  {
    id: "3",
    name: "KRÖK - Magazine Cover & Back Cover",
    type: "Research",
    desc: "Second spread in the coffeetable book.",
    year: 2023,
    url: "/img/frontpage.jpg",
  },
  {
    id: "4",
    name: "KRÖK - Magazine Spread",
    type: "Research",
    desc: "Second spread in the coffeetable book.",
    year: 2023,
    url: "/img/paella.jpg",
  },
  {
    id: "5",
    name: "KRÖK - Magazine Spread",
    type: "Research",
    desc: "Second spread in the coffeetable book.",
    year: 2023,
    url: "/img/sangria.jpg",
  },
  {
    id: "6",
    name: "KRÖK - Magazine Spread",
    type: "Research",
    desc: "Second spread in the coffeetable book.",
    year: 2023,
    url: "/img/grapes.jpg",
  },
  {
    id: "7",
    name: "KRÖK - Content List",
    type: "Research",
    desc: "Second spread in the coffeetable book.",
    year: 2023,
    url: "/img/contents.jpg",
  },
];
const skills = [
  {
    id: "1",
    name: "Webb and Interface design",
    type: "Web development course",
    desc: "TWTG10",
    level: 1,
  },
  {
    id: "2",
    name: "Foundations of Programming",
    type: "Web development course",
    desc: "TGPK12",
    level: 2,
  },
  {
    id: "3",
    name: "Web Develpoment Fundamentals",
    type: "Web development course",
    desc: "TGWK12",
    level: 3,
  },
  {
    id: "4",
    name: "Visual Communication",
    type: "Visual Design course",
    desc: "TVKK12",
    level: 2,
  },
  {
    id: "5",
    name: "Fundamentals of Graphic Design",
    type: "Graphic Design course",
    desc: "TGG11",
    level: 1,
  },
];
const codes = [
  {
    id: "1",
    name: "Camel-Run",
    type: "Coding",
    desc: "Game coded in P5Canvas using Javascript and CSS .",
    year: 2023,
    url: "https://ju-nmd2023.github.io/fop-final-project-group-51/",
  },
  {
    id: "2",
    name: "Pig-Lander",
    type: "Coding",
    desc: "Lunar Lander game coded in P5Canvas, using CSS and Javascript.",
    year: 2023,
    url: "https://ju-nmd2023.github.io/fop-lunar-lander-pafr23wt/",
  },
  {
    id: "3",
    name: "To do List App",
    type: "Coding",
    desc: "Coded using HTML, CSS and Javascript.",
    year: 2023,
    url: "https://ju-nmd2023.github.io/fop-todo-list-pafr23wt/",
  },
  {
    id: "4",
    name: "WebShop",
    type: "Coding",
    desc: "Webshop coded using HTML, CSS and Javascript.",
    year: 2023,
    url: "https://ju-nmd2023.github.io/wuid-project-group-35/",
  },
];

// ROUTES
app.get("/", function (req, res) {
  //res.render("home", { layout: "main" });
  const model = {
    isLoggedIn: req.session.isLoggedIn,
    name: req.session.name,
    isAdmin: req.session.isAdmin,
  };
  console.log("---> Home model: " + JSON.stringify(model));
  res.render("home.handlebars", model);
});

// Serve the login page
app.get("/login", (req, res) => {
  res.render("login.handlebars"); // Render the login page
});
app.post("/login", (req, res) => {
  const { username, password } = req.body; // Get username and password

  // Verification steps
  if (!username || !password) {
    return res.status(400).send(`Username and password are required.<br />
    Please try again: <a href="/login">Login</a>`);
  }

  if (username === adminName) {
    console.log("The user is the admin one!");

    bcrypt.compare(password, adminPassword, (err, result) => {
      if (err) {
        const model = {
          error: `Error while comparing passwords: ${err.message}`,
          message: "",
        };
        return res.status(500).render("login.handlebars", model);
      }

      if (result) {
        console.log("The password is the admin one!");
        // Save the information into the session
        req.session.isAdmin = true;
        req.session.isLoggedIn = true;
        req.session.name = username;
        console.log("Session information: " + JSON.stringify(req.session));
        //do not go to /login but go to /
        res.redirect("/");
      } else {
        const model = { error: "Invalid password.", message: "" };
        return res.status(400).render("login.handlebars", model);
      }
    });
  } else {
    const model = { error: "Invalid username.", message: "" };
    return res.status(400).render("login.handlebars", model);
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while destroying the session:", err);
    } else {
      console.log("Logged out...");
      res.redirect("/");
    }
  });
});

// PROJECT ROUTES

// Get all projects
app.get("/projects", (req, res) => {
  db.all("SELECT * FROM projects", (error, listOfProjects) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      const model = { projects: listOfProjects };
      res.render("projects.handlebars", model);
    }
  });
});

// Get specific project by ID
app.get("/projects/:projectid", (req, res) => {
  console.log(
    "Project route parameter projectid: " + JSON.stringify(req.params.projectid)
  );
  db.get(
    "SELECT * FROM projects WHERE id=?",
    [req.params.projectid],
    (error, theProject) => {
      if (error) {
        console.log("ERROR: ", error);
      } else {
        const model = { project: theProject };
        res.render("project.handlebars", model);
      }
    }
  );
});

// Delete a specific project
app.get("/projects/delete/:projid", (req, res) => {
  if (!req.session.isAdmin) {
    return res
      .status(403)
      .send("Forbidden: You do not have permission to delete this project.");
  }
  console.log(
    "Project route parameter projid: " + JSON.stringify(req.params.projid)
  );
  db.run("DELETE FROM projects WHERE id=?", [req.params.projid], (error) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      console.log("The project " + req.params.projid + " has been deleted...");
      res.redirect("/projects");
    }
  });
});

// Render form to create a new project
app.get("/project/new", (req, res) => {
  if (!req.session.isAdmin) {
    return res
      .status(403)
      .send("Forbidden: You do not have permission to delete this project.");
  }
  res.render("project-new.handlebars");
});

// Handle other routes
app.get("/contact", (req, res) => {
  res.render("contact.handlebars");
});

app.get("/codes", (req, res) => {
  db.all("SELECT * FROM codes", (error, listOfCodes) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      const model = { codes: listOfCodes };
      res.render("codes.handlebars", model);
    }
  });
});

app.get("/cv", (req, res) => {
  res.render("cv.handlebars");
});

// Get all skills
app.get("/skills", (req, res) => {
  db.all("SELECT * FROM skills", (error, listOfSkills) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      res.render("skills.handlebars", { skills: listOfSkills });
    }
  });
});

// Pre-fill form to modify a project
app.get("/projects/modify/:projid", (req, res) => {
  const id = req.params.projid;
  db.get("SELECT * FROM projects WHERE id=?", [id], (error, theProject) => {
    if (error) {
      console.log("ERROR: ", error);
      res.redirect("/projects");
    } else {
      const model = { project: theProject };
      res.render("project-new.handlebars", model);
    }
  });
});

// Create a new project from form data
app.post("/project/new", (req, res) => {
  if (!req.session.isAdmin) {
    return res
      .status(403)
      .send("Forbidden: You do not have permission to modify projects.");
  }
  const { projname, projyear, projdesc, projtype, projurl } = req.body;
  db.run(
    "INSERT INTO projects (name, year, desc, type, url) VALUES (?, ?, ?, ?, ?)",
    [projname, projyear, projdesc, projtype, projurl],
    (error) => {
      if (error) {
        console.log("ERROR: ", error);
        res.redirect("/projects");
      } else {
        console.log("Line added into the projects table!");
        res.redirect("/projects");
      }
    }
  );
});

// Update a specific project
app.post("/projects/modify/:projid", (req, res) => {
  if (!req.session.isAdmin) {
    return res
      .status(403)
      .send("Forbidden: You do not have permission to modify projects.");
  }
  const id = req.params.projid;
  const { projname, projyear, projdesc, projtype, projurl } = req.body;
  db.run(
    `UPDATE projects 
     SET name=?, year=?, desc=?, type=?, url=?
     WHERE id=?`,
    [projname, projyear, projdesc, projtype, projurl, id],
    (error) => {
      if (error) {
        console.log("ERROR: ", error);
        res.redirect("/projects");
      } else {
        res.redirect("/projects");
      }
    }
  );
});

// 404 NOT FOUND
app.use((req, res) => {
  res.status(404).render("404.handlebars");
});

// 500 ERROR
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).render("500");
});

// Start server
app.listen(port, () => {
  initTableProject(db);
  initTableSkills(db);
  initTableCode(db);
  console.log(`Server is running on http://localhost:${port}`);
});
