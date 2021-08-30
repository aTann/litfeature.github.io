/**
 * 定义四则运算：产出四则运算的词法定义和语法定义。
 * 词法分析：把输入的字符串流变成 token。
 * 语法分析：把 token 变成抽象语法树 AST。
 * 解释执行：后序遍历 AST，执行得出结果。
 */

//  定义四则运算：产出四则运算的词法定义和语法定义。

/**
 * Token
 *    Number: 1 2 3 4 5 6 7 8 9 0 的组合
 *    Operator: + 、-、 *、 / 之一
 * Whitespace: <sp>
 * LineTerminator：<LF> <CR>
 */


// 语法定义多数采用 BNF

// 加减乘除有优先级


// 词法分析：状态机

var token = [];
var start = (char) => {
    if (char === '0'
        || char === '1'
        || char === '2'
        || char === '3'
        || char === '4'
        || char === '5'
        || char === '6'
        || char === '7'
        || char === '8'
        || char === '9'
    ) {
        token.push(char);
        return inNumber;
    }

    if (char === '+'
        || char === '-'
        || char === '*'
        || char === '/'
    ) {
        emmitToken(char, char);
        return start
    }

    if (char === ' ') {
        return start
    }

    if (char === '\r'
        || char === '\n') {
        return start
    }
}

const inNumber = char => {
    if (char === '0'
        || char === '1'
        || char === '2'
        || char === '3'
        || char === '4'
        || char === '5'
        || char === '6'
        || char === '7'
        || char === '8'
        || char === '9'
    ) {
        token.push(char);
        return inNumber;
    } else {
        emmitToken("Number", token.join(""));
        token = [];
        return start(char); // put back char
    }
}

function emmitToken(type, value) {
    console.log(value)
}

var input = "1024 + 2 * 256"

var state = start;

for (let c of input.split('')) {
    state = state(c)
}

// state(Symbol('EOF'))

// 语法分析：LL
var tokens = [
    { type: "Number", value: "1024" },
    { type: "+", value: "+" },
    { type: "Number", value: "2" },
    { type: "*", value: "*" },
    { type: "Number", value: "256" },
    { type: "EOF" }
];

function Expression(source) {
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === 'EOF') {
        let node = {
            type: 'Expression',
            children: [source.shift(), source.shift()]
        }
        source.unshift(node);
        return node
    }
    AdditiveExpression(source);
    return Expression(source)
}

function AdditiveExpression(source) {
    if (source[0].type === 'MultiplicativeExpression') {
        let node = {
            type: "AdditiveExpression",
            children: [source[0]]
        }

        source[0] = node;
        return AdditiveExpression(source)
    }

    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '+') {
        let node = {
            type: 'AdditiveExpression',
            operator: '+',
            children: []
        }

        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source)
    }

    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '-') {
        let node = {
            type: 'AdditiveExpression',
            operator: '-',
            children: []
        }

        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source)
    }

    if (source[0].type === 'AdditiveExpression') {
        return source[0]
    }

    MultiplicativeExpression(source);
    return AdditiveExpression(source);
}


function MultiplicativeExpression() {
    if (source[0].type === 'Number') {
        let node = {
            type: 'MultiplicativeExpression',
            children: [source[0]]
        }
        source[0] = node;
        return MultiplicativeExpression(source)
    }

    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '*') {
        let node = {
            type: 'MultiplicativeExpression',
            operator: '*',
            children: []
        }

        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);

        return MultiplicativeExpression(source)
    }

    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '/') {
        let node = {
            type: 'MultiplicativeExpression',
            operator: '/',
            children: []
        }

        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);

        return MultiplicativeExpression(source);
    }

    if (source[0].type === 'MultiplicativeExpression') {
        return source[0];
    }

    return MultiplicativeExpression(source);
}

var source = [
    { type: "Number", value: "3" }, 
    { type: "*", value: "*" }, 
    { type: "Number", value: "300" }, 
    { type: "+", value: "+" }, 
    { type: "Number", value: "2" }, 
    { type: "*", value: "*" }, 
    { type: "Number", value: "256" }, 
    { type: "EOF" }
]; 
    
var ast = Expression(source); 

console.log(ast);












