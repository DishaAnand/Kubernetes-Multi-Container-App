const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const path = require('path');
const CALCULATION_SERVICE_URL = 'http://container_2_service:8000';
const PORT = 6000;
app.use(express.json());

app.post('/store-file', (req, res) => {
  const { file, data } = req.body;

  if (!file || !data) {
    return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
  }
  const filePath = path.join((path.dirname(__dirname)), "/disha_PV_dir",file);
  try {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    fs.writeFileSync(filePath, data);
    res.status(200).json({ file, message: 'Success.' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error while storing the file to the storage.' });
  }
});

app.post('/calculate', async (req, resp) => {
  const { file, product } = req.body;

  if (file == null) {
    return resp.status(400).json({ error: 'Invalid JSON input.', file: null });
  }

  try {
    const sumResult = await axios.post(`${CALCULATION_SERVICE_URL}/calculate`, {
      file,
      product,
    });
    return resp.status(200).json(sumResult.data);
  } catch (error) {
    return handleErrorResponse({ resp, error, file });
  }
});

app.listen(PORT, () => {
  console.log(`Container 1 is listening @ ${PORT}`);
});

function handleErrorResponse({ resp, error, file }) {
  const {
    response: { status },
  } = error;

  switch (status) {
    case 404:
      return resp.status(404).json({ file, error: 'File not found.' });
    case 200:
      return resp
        .status(200)
        .json({ file, error: 'Input file not in CSV format.' });
    case 400:
      return resp
        .status(400)
        .json({ error: 'Invalid JSON input.', file: null });
    default:
      return resp.status(500).json({ error: 'Unhandled error', file: null });
  }
}
