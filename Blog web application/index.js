import express from "express";
import bodyParser from "body-parser";
import methodOverride from 'method-override';
const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to override method based on _method field
app.use(methodOverride('_method'));
let blogs = {};

app.get("/", (req, res) => {
  if (Object.keys(blogs).length == 0) {
    res.render("index.ejs");
  } else {
    res.render("index.ejs", { blogs: blogs });
  }
});


app.get("/blogs", (req, res) => {
  res.render("blogs.ejs");
});

// Blog Display
app
  .route("/blog/:title")
  .get((req, res) => {
    let title = req.params.title;

    if (!blogs[title]) {
      res.send(`blog ${title} does not exist`);
    }

    res.render("blog.ejs", { title: title, content: blogs[title] });
  })
  .delete((req, res) => {
    let title = req.params.title
    if(!blogs[title]){
      res.send("Title does not exist!");
    }
    delete blogs[title];

    res.render("index.ejs", {message: "Blog deleted successfully!"});
  });

// Blog creation  
app
  .route("/create")
  .get((req, res) => {
    res.render("create_blog.ejs");
  })
  .post((req, res) => {
    let data = {
      title: req.body["title"],
      content: req.body["blog-content"],
      message: "Blog created Successfully!"
    };
    blogs[data.title] = data.content;
    // res.sendStatus(200);
    res.render("blog.ejs", data);
  });


// Blog Editing 
app
  .route("/blog/:title/edit")
  .get((req, res) => {
    let title = req.params.title;

    if (!blogs[title]) {
      res.send(`blog ${title} does not exist`);
    }

    let blog = {"title": title, "content": blogs[title]}
    // console.log(blog);
    res.render("create_blog.ejs", blog );
  })
  .put((req, res) => {
    // console.log(req.params.title);
    if(!blogs[req.params.title]){
      res.send("Blog does not exist!")
    }

    let data = {
      title: req.params.title,
      content: req.body["blog-content"],
      message: req.params.title + " edited Successfully!"
    };
    blogs[data.title] = data.content;

    // res.sendStatus(200);
    res.render("blog.ejs", data);
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});