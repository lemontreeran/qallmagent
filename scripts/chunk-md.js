const fs = require('fs');
const path = require('path');

const folderPath = './knowledgebase';
const outputPath = './knowledgebase/chunks.json';
const allChunks = [];

fs.readdirSync(folderPath).forEach((file) => {
    if (file.endsWith('.md')) {
        const content = fs.readFileSync(path.join(folderPath, file), 'utf-8');
        const baseName = file.replace('.md', '');

        // Chunk by heading sections
        const chunks = content
              .split(/^##+\s/m) // or use /\n\n+/ for paragraph split
              .map(chunk => chunk.trim())
              .filter(chunk => chunk.length > 20); // skip short junk

        chunks.forEach((text, i) => {
            allChunks.push({
                file: baseName,
                chunkIndex: i,
                text,
                tags: [baseName], // optional metadata
            });
        });
    }
});

fs.writeFileSync(outputPath, JSON.stringify(allChunks, null, 2));
console.log(`✅ Chunked and saved to ${outputPath}`);
