
var data = function (c) {
    if (c == "&") {
        return characterReferenceInData;
    }
    if (c == "<") {
        return tagOpen;
    } else if (c == "\0") {
        error();
        emitToken(c);
        return data;
    } else if (c == EOF) {

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

var tagNameState = function tagNameState(c) {
    if (c.match(/[A-Z]/)) {
        token.name += c;

        return tagNameState;
    }

    if (c.match(/[a-z]/)) {
        token.name += c;
        return tagNameState;
    }

    emitToken(token);
    return attributeState
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
