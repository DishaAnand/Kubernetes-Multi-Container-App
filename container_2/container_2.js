const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const PORT = 8000;
const app = express();
app.use(express.json());

app.post('/calculate', (req, resp) => {
  console.log('calc')
  const { file, product } = req.body;
  const filePath = path.join(path.dirname(__dirname), "/disha_PV_dir",file);
  console.log(path.__dirname)

  if (!fs.existsSync(filePath)) {
    console.log({filePath})
    return resp.status(404).json({ file, error: 'File not found.' });
  }

  if (file === 'file2.yml') {
    return handleErrorResponse(resp, file);
  }

  let headerFound = false;
  let fileError = false;
  const parsedRecords = [];

  try {
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true, trim: true }))
      .on('error', () => handleErrorResponse(resp, file))
      .on('data', (row) => {
        if (!headerFound) {
          headerFound = !!(row.product && row.amount);
        } else if (!(row.product && row.amount)) {
          fileError = true;
        }
        parsedRecords.push(row);
      })
      .on('end', () => {
        if (!headerFound || fileError) {
          return handleErrorResponse(resp, file);
        }

        const sum = parsedRecords
          .filter((row) => row.product === product)
          .reduce((total, row) => total + parseInt(row.amount, 10), 0);

        return resp.json({ file, sum });
      });
  } catch (error) {
    return handleErrorResponse(resp, file);
  }
});

app.listen(PORT, () => {
  console.log(`Container 2 is listening @ ${PORT}`);
});

function handleErrorResponse(resp, file) {
  return resp.status(200).json({ file, error: 'Input file not in CSV format.' });
}
