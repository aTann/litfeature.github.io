// "devDependencies": {
//     "@babel/core": "^7.15.0",
//     "@babel/parser": "^7.15.3"
// }
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");

const root = process.cwd();
// ./src/011/01.js
function exportCouter(entryPath) {
    const filePath =
        "./" +
        path.relative(root, path.resolve(entryPath)).replace(/\\+/g, "");

    // console.log(path.relative(root, path.resolve(entryPath)));

    // console.log(filePath);

    const content = fs.readFileSync(filePath, "utf-8");

    const ast = parser.parse(content, { sourceType: "module" });

    // console.log(JSON.stringify(ast));

    function counter(node) {
        if (node.type === "File") {
            return counter(node.program);
        }

        if (node.type === "Program") {
            return counter(node.body);
        }

        if (node.type === "ExportNamedDeclaration") {
            return 1;
        }

        if (node.type === "ExportDefaultDeclaration") {
            return 1;
        }

        if (node.type === "ImportDeclaration") {
            let sourceValue = node.source.value;
            sourceValue = path.join(path.dirname(entryPath), node.source.value);
            const scriptPath = './' + path.relative(root, sourceValue).replace(/\\+/g, '/');
            return exportCouter(scriptPath)
        }

        if (Array.isArray(node)) {
            const num = node.reduce((t, n) => t + counter(n), 0);
            return num;
        }

        return 0;
    }

    // console.log(counter(ast));
    return counter(ast)
}

const n = exportCouter('./src/011/01.js')

console.log(n);
