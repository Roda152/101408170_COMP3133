const fs = require('fs');
const csv = require('csv-parser');

let canadaData = [];
let usaData = [];


fs.unlink('canada.txt', (err) => {
  if (err) console.log('canada.txt does not exist or was not deleted.');
  else console.log('canada.txt deleted.');
});

fs.unlink('usa.txt', (err) => {
  if (err) console.log('usa.txt does not exist or was not deleted.');
  else console.log('usa.txt deleted.');
});


fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
    
    console.log('Processing country:', row.country);

    
    let country = row.country.trim().toLowerCase();

    if (country === 'canada') {
      canadaData.push(row);
    }
    if (country === 'united states') {
      usaData.push(row);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');

    
    fs.writeFileSync('canada.txt', 'country,year,population\n');
    canadaData.forEach(row => {
      fs.appendFileSync('canada.txt', `canada,${row.year},${row.population}\n`);
    });
    console.log('Filtered Canada data written to canada.txt.');

    
    fs.writeFileSync('usa.txt', 'country,year,population\n');
    usaData.forEach(row => {
      fs.appendFileSync('usa.txt', `united states,${row.year},${row.population}\n`);
    });
    console.log('Filtered United States data written to usa.txt.');
  })
  .on('error', (err) => {
    console.error('Error processing CSV file:', err);
  });
