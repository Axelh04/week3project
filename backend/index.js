const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get("/boards", async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.status(200).json(boards);
  } catch (error) {
    console.error("Failed to retrieve boards:", error);
    res.status(500).json({ error: "Failed to retrieve boards" });
  }
});

app.get("/boards/:filter", async (req, res) => {
  const { filter } = req.params;
  try {
    const boards = await prisma.board.findMany({
      where: { category: filter },
    });
    res.status(200).json(boards);
  } catch (error) {
    console.error("Failed to retrieve filtered boards:", error);
    res.status(500).json({ error: "Failed to retrieve filtered boards" });
  }
});

app.get("/boards/filter/recent", async (req, res) => {
  try {
    const cards = await prisma.board.findMany({
      orderBy: { id: "desc" },
      take: 4,
    });
    res.status(200).json(cards);
  } catch (error) {
    console.error("Failed to retrieve recent boards:", error);
    res.status(500).json({ error: "Failed to retrieve recent boards" });
  }
});

app.get("/boards/query/:query", async (req, res) => {
  const { query } = req.params;
  try {
    const boards = await prisma.board.findMany({
      where: { title: { contains: query, mode: "insensitive" } },
    });
    res.status(200).json(boards);
  } catch (error) {
    console.error("Failed to search boards:", error);
    res.status(500).json({ error: "Failed to search boards" });
  }
});

app.post("/boards/create", async (req, res) => {
  const { title, category, author } = req.body;
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}`
    );
    const gifData = await response.json();
    const imageUrl = gifData.data.images.downsized.url;

    const newBoard = await prisma.board.create({
      data: { title, gifURL: imageUrl, category, author },
    });
    res.status(200).json(newBoard);
  } catch (error) {
    console.error("Failed to create board:", error);
    res.status(500).json({ error: "Failed to create board" });
  }
});

app.put("/boards/:id/update", async (req, res) => {
  const { id } = req.params;
  const { gifURL } = req.body;
  try {
    const updatedBoard = await prisma.board.update({
      where: { id: parseInt(id) },
      data: { gifURL },
    });
    res.status(200).json(updatedBoard);
  } catch (error) {
    console.error("Failed to update board:", error);
    res.status(500).json({ error: "Failed to update board" });
  }
});

app.delete("/boards/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBoard = await prisma.board.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedBoard);
  } catch (error) {
    console.error("Failed to delete board:", error);
    res.status(500).json({ error: "Failed to delete board" });
  }
});

app.get("/boards/:id/cards", async (req, res) => {
  const { id } = req.params;
  try {
    const cards = await prisma.card.findMany({
      where: { boardId: parseInt(id) },
      orderBy: { id: "asc" },
    });
    res.status(200).json(cards);
  } catch (error) {
    console.error("Failed to retrieve cards:", error);
    res.status(500).json({ error: "Failed to retrieve cards" });
  }
});
app.post("/boards/:id/cards/create", async (req, res) => {
  const { id } = req.params;
  const { title, author, description, gifURL } = req.body;
  try {
    const newCard = await prisma.card.create({
      data: {
        title,
        author,
        boardId: parseInt(id),
        votes: 0,
        description,
        gifURL,
      },
    });
    res.status(201).json(newCard);
  } catch (error) {
    console.error("Failed to create card:", error);
    res.status(500).json({ error: "Failed to create card" });
  }
});
app.delete("/boards/:id/cards/:cardId/delete", async (req, res) => {
  const { id, cardId } = req.params;
  try {
    const deletedCard = await prisma.card.delete({
      where: { id: parseInt(cardId), boardId: parseInt(id) },
    });
    res.status(200).json(deletedCard);
  } catch (error) {
    console.error("Failed to delete card:", error);
    res.status(500).json({ error: "Failed to delete card" });
  }
});
app.put("/boards/:id/cards/:cardId/update", async (req, res) => {
  const { id, cardId } = req.params;
  const { votes } = req.body;
  try {
    const updatedCard = await prisma.card.update({
      where: { id: parseInt(cardId), boardId: parseInt(id) },
      data: { votes: parseInt(votes) },
    });
    res.status(200).json(updatedCard);
  } catch (error) {
    console.error("Failed to update card:", error);
    res.status(500).json({ error: "Failed to update card" });
  }
});
// Error handling for unsupported routes
app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});
// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
