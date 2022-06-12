const fs = require("fs");

fs.writeFileSync(`${__dirname}/new-file.txt`, "test");
fs.copyFileSync(`${__dirname}/new-file.txt`, `${__dirname}/new-file-copy.txt`);
fs.renameSync(`${__dirname}/new-file.txt`, `${__dirname}/newer-file.txt`);
const filesList = fs.readdirSync(__dirname);
console.log(filesList);
fs.writeFileSync(
  `${__dirname}/files-list.txt`,
  "The files in this folder are: "
);
filesList.forEach((file) => {
  fs.appendFileSync(`${__dirname}/files-list.txt`, `${file} `);
});

setTimeout(() => {
  fs.rmdirSync(`${__dirname}/testing`);
}, 5000);
fs.mkdirSync(`${__dirname}/testing`);
