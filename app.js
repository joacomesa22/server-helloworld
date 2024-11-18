const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
app.use(cors());
app.use(express.static("public"));
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const news = [
  {
    title: "Lionel Messi's luxurious house in Barcelona",
    img: "mansion.jpg",
    link: "https://www.youtube.com/watch?app=desktop&v=ncxD-WXorrA",
    category: ["Lifestyle", "Family", "Barcelona"],
  },
  {
    title: "The day Messi scored with just one boot ",
    img: "farsa.jpg",
    link: "https://www.givemesport.com/88097980-lionel-messis-epic-barcelona-assist-with-just-one-boot-vs-real-madrid-and-ronaldo/",
    category: ["Stories", "Football", "Barcelona"],
  },
  {
    title: "Did you know Messi was sent off in his debut?",
    img: "roja.jpg",
    link: "https://www.tycsports.com/seleccion-argentina/debut-de-lionel-messi-en-la-seleccion-argentina-ante-hungria-id529348.html",
    category: ["Fun Facts", "Argentina", "Football"],
  },
  {
    title: "Lionel's tribute to Diego Armando Maradona ",
    img: "diego.jpeg",
    link: "https://www.theguardian.com/football/blog/2020/nov/30/lionel-messi-newells-old-boys-shirt-maradona-barcelona",
    category: ["Stories", "Football", "Barcelona", "Argentina"],
  },
  {
    title: "Argentina's Lionel Messi blames soaked pitch",
    img: "soaked.jpg",
    link: "https://www.espn.com/soccer/story/_/id/41724998/argentina-lionel-messi-soaked-pitch-venezuela-draw",
    category: ["Argentina", "WC Qualifiers", "Recent"],
  },
  {
    title: "The 10 players who can wear Messi's new boots",
    img: "boots.jpg",
    link: "https://www.sportbible.com/football/mls/lionel-messi-inter-miami-adidas-lamine-yamal-278908-20241011",
    category: ["Lifestyle", "Merch", "MLS"],
  },
  {
    title: "Lionel Messi is nominated for MLS' MVP award",
    img: "inter.jpg",
    link: "https://www.dailymail.co.uk/sport/football/article-13942757/lionel-messi-mls-mvp-award-inter-miami.html",
    category: ["MLS", "Awards", "Recent"],
  },
  {
    title: "Huge fan risking it all to meet Lio",
    img: "invader.jpg",
    link: "https://www.miamiherald.com/sports/mls/inter-miami/article293671764.html",
    category: ["Stories", "Fun Fact", "MLS"],
  },
];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/news", (req, res) => {
  res.json(news);
});

app.post("/api/news", upload.single("img"), (req, res) => {
  console.log("POST request received");
  console.log(req.body);
  const result = validateNews(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    console.log("I HAVE AN ERROR!!!");
    return;
  }

  const article = {
    title: req.body.title,
    link: req.body.link,
    category: req.body.category,
  };

  if (req.file) {
    article.img = req.file.filename;
  }

  news.push(article);
  res.status(200).send(article);
});

const validateNews = (news) => {
  const schema = Joi.object({
    title: Joi.string().min(5).required(),
    link: Joi.string().required(),
    category: Joi.array(),
  });

  return schema.validate(news);
};

app.listen(3002, () => {
  console.log("Listening...");
});
