const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
app.use(cors());
app.use(express.static("public"));
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mongoose
  .connect(
    "mongodb+srv://joaquin22:ntmrzCiHGMayO70s@messinews.udlti.mongodb.net/?retryWrites=true&w=majority&appName=MessiNews"
  )
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("couldn't connect to mongodb", error);
  });

const articleSchema = new mongoose.Schema({
  title: String,
  img: String,
  link: String,
  category: [String],
});

const Article = mongoose.model("Article", articleSchema);

// const news = [
//   {
//     _id: 1,
//     title: "Lionel Messi's luxurious house in Barcelona",
//     img: "mansion.jpg",
//     link: "https://www.youtube.com/watch?app=desktop&v=ncxD-WXorrA",
//     category: ["Lifestyle", "Barcelona"],
//   },
//   {
//     _id: 2,
//     title: "The day Messi scored with just one boot ",
//     img: "farsa.jpg",
//     link: "https://www.givemesport.com/88097980-lionel-messis-epic-barcelona-assist-with-just-one-boot-vs-real-madrid-and-ronaldo/",
//     category: ["Stories", "Football", "Barcelona"],
//   },
//   {
//     _id: 3,
//     title: "Did you know Messi was sent off in his debut?",
//     img: "roja.jpg",
//     link: "https://www.tycsports.com/seleccion-argentina/debut-de-lionel-messi-en-la-seleccion-argentina-ante-hungria-id529348.html",
//     category: ["Fun Facts", "Argentina", "Football"],
//   },
//   {
//     _id: 4,
//     title: "Lionel's tribute to Diego Armando Maradona ",
//     img: "diego.jpeg",
//     link: "https://www.theguardian.com/football/blog/2020/nov/30/lionel-messi-newells-old-boys-shirt-maradona-barcelona",
//     category: ["Stories", "Football", "Barcelona", "Argentina"],
//   },
//   {
//     _id: 5,
//     title: "Argentina's Lionel Messi blames soaked pitch",
//     img: "soaked.jpg",
//     link: "https://www.espn.com/soccer/story/_/id/41724998/argentina-lionel-messi-soaked-pitch-venezuela-draw",
//     category: ["Argentina", "Football", "Stories"],
//   },
//   {
//     _id: 6,
//     title: "The 10 players who can wear Messi's new boots",
//     img: "boots.jpg",
//     link: "https://www.sportbible.com/football/mls/lionel-messi-inter-miami-adidas-lamine-yamal-278908-20241011",
//     category: ["Lifestyle", "Fun Facts", "MLS"],
//   },
//   {
//     _id: 7,
//     title: "Lionel Messi is nominated for MLS' MVP award",
//     img: "inter.jpg",
//     link: "https://www.dailymail.co.uk/sport/football/article-13942757/lionel-messi-mls-mvp-award-inter-miami.html",
//     category: ["MLS", "Football", "Stories"],
//   },
//   {
//     _id: 8,
//     title: "Huge fan risking it all to meet Lio",
//     img: "invader.jpg",
//     link: "https://www.miamiherald.com/sports/mls/inter-miami/article293671764.html",
//     category: ["Stories", "Fun Facts", "MLS"],
//   },
// ];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/news", async (req, res) => {
  const news = await Article.find();
  res.send(news);
});

app.post("/api/news", upload.single("img"), async (req, res) => {
  const result = validateNews(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    console.log("I HAVE AN ERROR!!!");
    return;
  }

  const article = new Article({
    title: req.body.title,
    link: req.body.link,
    category: req.body.category,
  });

  if (req.file) {
    article.img = req.file.filename;
  }

  const newArticle = await article.save();

  res.status(200).send(newArticle);
});

app.put("/api/news/:id", upload.single("img"), async (req, res) => {
  const result = validateNews(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const fieldsToUpdate = {
    title: req.body.title,
    link: req.body.link,
    category: req.body.category,
  };

  if (req.file) {
    fieldsToUpdate.img = req.file.filename;
  }

  const wentThrough = await Article.updateOne(
    { _id: req.params.id },
    fieldsToUpdate
  );

  console.log(wentThrough);

  const article = await Article.findOne({ _id: req.params.id });

  res.status(200).send(article);
});

app.delete("/api/news/:id", async (req, res) => {
  const articleToDelete = await Article.findByIdAndDelete(req.params.id);
  if (!articleToDelete) {
    return res.status(404).send("Article not found, please try again");
  }

  res.status(200).send(`Article ${articleToDelete} deleted successfully!`);
});

const validateNews = (news) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    link: Joi.string().required(),
    category: Joi.alternatives().try(Joi.string(), Joi.array()),
  });

  return schema.validate(news);
};

app.listen(3002, () => {
  console.log("Listening...");
});
