const fs = require('fs');
const { JSDOM } = require('jsdom');

// Read the HTML file
const htmlFilePath = './example5.html';
fs.readFile(htmlFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Parse the HTML content
    const dom = new JSDOM(data);
    const document = dom.window.document;

    const outerTables = document.querySelectorAll('body > table');

    outerTables.forEach((outerTable, outerIndex) => {
        const innerTables = outerTable.querySelectorAll('table');

        innerTables.forEach((innerTable, innerIndex) => {
            const newTable = innerTable.cloneNode(true);

            // Create a paragraph element with information
            const infoText = document.createElement('p');
            infoText.textContent = `Extracted Inner Table ${innerIndex + 1} from Outer Table ${outerIndex + 1}`;

            // Insert the text node and the new table after the outer table
            outerTable.insertAdjacentElement('afterend', infoText);
            infoText.insertAdjacentElement('afterend', newTable);
        });
    });

    // Output the modified HTML to stdout
    console.log(dom.serialize());
});
