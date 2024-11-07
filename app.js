const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("public"));

const news = [
  {
    id: 1,
    title: "Lionel Messi's luxurious house in Barcelona",
    hours: "8",
    img: "mansion.jpg",
    link: "https://www.youtube.com/watch?app=desktop&v=ncxD-WXorrA",
    category: ["Lifestyle", "Family", "Barcelona"],
  },
  {
    id: 2,
    title: "The day Messi scored with just one boot ",
    hours: "10",
    img: "farsa.jpg",
    link: "https://www.givemesport.com/88097980-lionel-messis-epic-barcelona-assist-with-just-one-boot-vs-real-madrid-and-ronaldo/",
    category: ["Stories", "Football", "Barcelona"],
  },
  {
    id: 3,
    title: "Did you know Messi was sent off in his debut?",
    hours: "12",
    img: "roja.jpg",
    link: "https://www.tycsports.com/seleccion-argentina/debut-de-lionel-messi-en-la-seleccion-argentina-ante-hungria-id529348.html",
    category: ["Fun Facts", "Argentina", "Football"],
  },
  {
    id: 4,
    title: "Lionel's tribute to Diego Armando Maradona ",
    hours: "12",
    img: "diego.jpeg",
    link: "https://www.theguardian.com/football/blog/2020/nov/30/lionel-messi-newells-old-boys-shirt-maradona-barcelona",
    category: ["Stories", "Football", "Barcelona", "Argentina"],
  },
  {
    id: 5,
    title: "Argentina's Lionel Messi blames soaked pitch",
    hours: "14",
    img: "soaked.jpg",
    link: "https://www.espn.com/soccer/story/_/id/41724998/argentina-lionel-messi-soaked-pitch-venezuela-draw",
    category: ["Argentina", "WC Qualifiers", "Recent"],
  },
  {
    id: 6,
    title: "The 10 players who can wear Messi's new boots",
    hours: "15",
    img: "boots.jpg",
    link: "https://www.sportbible.com/football/mls/lionel-messi-inter-miami-adidas-lamine-yamal-278908-20241011",
    category: ["Lifestyle", "Merch", "MLS"],
  },
  {
    id: 7,
    title: "Lionel Messi is nominated for MLS' MVP award",
    hours: "18",
    img: "inter.jpg",
    link: "https://www.dailymail.co.uk/sport/football/article-13942757/lionel-messi-mls-mvp-award-inter-miami.html",
    category: ["MLS", "Awards", "Recent"],
  },
  {
    id: 8,
    title: "Huge fan risking it all to meet Lio",
    hours: "20",
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

app.listen(3001, () => {
  console.log("Listening...");
});
