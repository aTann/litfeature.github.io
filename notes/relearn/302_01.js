var token = [], source = [];

var data = function (c) {
    if (c == "&") {
        return characterReferenceInData;
    }
    if (c == "<") {
        return tagOpenState;
    } else if (c == "\0") {
        error();
        emitToken(c);
        return data;
    } else if (c == 'EOF') {

    } else {
        emitToken(c);
        return data;
    }
}

var tagOpenState = function tagOpenState(c) {
    if (c == "/") {
        return endTagOpenState;
    }

    if (c.match(/[A-Z]/)) {
        token = new StartTagToken();
        token.name = c;

        return tagNameState;
    }

    if (c.match(/[a-z]/)) {
        token = new StartTagToken();
        token.name = c;

        return tagNameState;
    }

    if (c == '?') {
        return bogusCommentState;
    } else {
        error();
        return dataState;
    }
}

var endTagOpenState = function endTagOpenState(c) {
    emitToken(token)

    token = null;

    if (c === '>') {
        return ''
    } else {
        emitToken(c)
    }
}

var tagNameState = function tagNameState(c) {
    if (c.match(/[A-Z]/)) {
        token.name += c;

        return tagNameState;
    }

    if (c.match(/[a-z]/)) {
        token.name += c;
        return tagNameState;
    }

    return attributeState
}

var attributeState = function attributeState(c) {

    if (c.match(/[A-Z]/)) {
        token.attributeNameToken = c;
        return attributeNameState;
    }

    if (c.match(/[a-z]/)) {
        token.attributeNameToken = c;
        return attributeNameState;
    }

    return tagOpenState;
};

var attributeNameState = function attributeNameState(c) {

    if (c.match(/[A-Z]/)) {
        token.attributeNameToken += c;
        return attributeNameState;
    }

    if (c.match(/[a-z]/)) {
        token.attributeNameToken += c;
        return attributeNameState;
    }

    if (c === '=') {
        return attributeValueState
    }

    // 如果只写属性，不写属性值，默认为 true
    if (!token.attributeValueToken) {
        token.attributeValueToken = "true";
    }

    return attributeState;
}


var attributeValueState = function attributeValueState(c) {

    const setAttribute = () => {
        const { attributeNameToken, attributeValueToken } = token;
        token[attributeNameToken] = attributeValueToken

        token.attributeNameToken = ''
        token.attributeValueToken = ''
    }

    if (c === ' ') {
        setAttribute()
        return attributeNameState
    }

    if (c === '>') {
        setAttribute()
        return endTagOpenState
    }

    if (c === '"') {
        if (token.attributeValueToken.length) {
            setAttribute()
            return attributeState
        }
        return attributeValueState
    }

    token.attributeValueToken += c;
    return attributeValueState;
}

function StartTagToken() {
    this.type = "tagOpen";
    this.name = "";
    this.attributeNameToken = '';
    this.attributeValueToken = '';
}

function emitToken(c, type) {
    if (typeof c === 'object') {
        source.push(c)
    } else {
        source.push({
            type: 'String',
            value: c
        })
    }
    console.log(source);
}

function error() {
    console.error('error');
}

// <p class="a">text text text</p>
const inTxt = '<p class="a" />'
const inTxts = inTxt.split("")
function getInput() {
    return inTxts.shift();
}


// 这里的状态机，每一个状态是一个函数，通过“if else”来区分下一个字符做状态迁移。
// 这里所谓的状态迁移，就是当前状态函数返回下一个状态函数

var state = data;
var char;

while (char = getInput()) {
    state = state(char)
}

// 状态函数通过代码中的 emitToken 函数来输出解析好的 token（词），
// 我们只需要覆盖 emitToken，即可指定对解析结果的处理方式


// 词法分析器接受字符的方式

function HTMLLexicalParser() {
    // 状态函数们...
    function data() {
        // code
    }

    function tagOpen() {
        // code
    }

    // code

    var state = data;
    this.receiveInput = function (char) {
        state = state(char)
    }
}

function HTMLSyntaticalParser() {
    var stack = [new HTMLDocument];
    this.receiveInput = function (token) {
        // ...
    }

    this.getOutput = function () {
        return stack[0]
    }
}

function Element() {
    this.childNodes = [];
}

function Text(value) {
    this.value = value || "";
}
