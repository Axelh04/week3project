const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })

app.get('/', (req, res) => {
    res.send('Welcome to my app!')
  })

app.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany()
    res.json(boards)
  })

  app.get('/boards/:filter', async (req, res) => {
    const { filter } = req.params
    const boards = await prisma.board.findMany({
    where: { category: filter }
    })
    res.json(boards)
  })

  app.get('/boards/:query', async (req, res) => {
    const { filter } = req.params
    const boards = await prisma.board.findMany({
    where: { category: filter }
    })
    res.json(boards)
  })

app.post('/boards/create', async (req, res) => {
    const {title, author, category} = req.body;
    const newBoard = await prisma.board.create({
      data: {
        title,
        author,
        category
      }
    })
    res.json(newBoard)
  })

  app.put('/boards/:id/update', async (req, res) => {
    const { id } = req.params
    const { title, author, category } = req.body
    const updatedBoard = await prisma.board.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        category
      }
    })
    res.json(updatedBoard)
  })

  app.delete('/boards/:id/delete', async (req, res) => {
    const { id } = req.params
    const deletedBoard = await prisma.board.delete({
      where: { id: parseInt(id) }
    })
    res.json(deletedBoard)
  })
  

  app.get('/boards/:id/cards', async (req, res) => {
    const { id } = req.params
    const cards = await prisma.card.findMany({ 
        where: { boardId: parseInt(id) }
    })
    res.json(cards)
  })


  app.post('/boards/:id/cards/create', async (req, res) => {
    const { id } = req.params
    const {title, author} = req.body;
    const newCard = await prisma.card.create({
        data: {
          title,
          author,
          boardId: parseInt(id)
        }
    })
    res.json(newCard)
  })

  app.delete('/boards/:id/cards/:cardId/delete', async (req, res) => {
    const { id } = req.params
    const { cardId } = req.params
    const deletedCard = await prisma.card.delete({
      where: { boardId: parseInt(id) },
      where: { id: parseInt(cardId) }
    })
    res.json(deletedCard)
  })