const express = require('express');
const cors = require('cors'); // Allows your React app to fetch data from this server
const { default: models } = require('./modelData/models');
const app = express();
const port = 4000;

app.use(cors());

app.get('/test', (req, res) => {
  res.send({ message: 'Hello from the Simple Express Server!' });
});

app.get('/users/list' ,(req, res) => {
  res.json(models.userListModel());
})

app.get('/users/:userId' , (req, res) => {
  const userId = req.params.userId;
  res.json(models.userModel(userId));
})

app.get('/photos/:userId' , (req, res) => {
  const userId = req.params.userId;
  res.json(models.photoOfUserModel(userId));
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
