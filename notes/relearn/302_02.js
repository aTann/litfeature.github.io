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
    emitToken('EOF'); 
    return data;
  } else {
    emitToken(c);
    return data;
  }
};

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

  if (c == "?") {
    return bogusCommentState;
  } else {
    error();
    return dataState;
  }
};

var endTagOpenState = function endTagOpenState(c) {

  if (c.match(/[A-Z]/)) {
    token = new EndTagToken();
    token.name = c;

    return tagNameState;
  }

  if (c.match(/[a-z]/)) {
    token = new EndTagToken();
    token.name = c;

    return tagNameState;
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

  if (c === ' ') {
    return attributeState;
  }
  
  // 开始状态闭合
  if (c === '>') {
    emitToken(token)
    token = null;
  }

  return data
};

var attributeState = function attributeState(c) {

  if (c.match(/[A-Z]/)) {
    token.attributeNameToken = c;
    return attributeNameState;
  }

  if (c.match(/[a-z]/)) {
    token.attributeNameToken = c;
    return attributeNameState;
  }

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

  if (c === ' ') {
    return attributeValueState(c)
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

  if (c.match(/[A-Z/-]/)) {
    token.attributeValueToken += c;
    return attributeValueState;
  }

  if (c.match(/[a-z/-]/)) {
    token.attributeValueToken += c;
    return attributeValueState;
  }

  if (c === '"') {
    // 第一个字符
    if (!token.attributeValueToken) {
      token.attributeValueToken += c;
    } else {
      token.attributeValueToken += c;
      setAttribute()
    }
    return attributeValueState
  }


  if (c === ' ') {
    const { attributeNameToken, attributeValueToken } = token;
    if (attributeValueToken.length) {
      return attributeValueState;
    }

    if (attributeNameToken.length && attributeValueToken.length) {
      token.attributeValueToken = true
      setAttribute()
    }
    
  }

  if (c === '>') {
    return tagNameState(c)
  }

  // token.attributeValueToken += c;
  return attributeState;
}


function StartTagToken() {
  this.type = "tagOpen";
  this.name = "";
  this.attributeNameToken = '';
  this.attributeValueToken = '';
}

function EndTagToken() {
  this.type = "tagEnd";
  this.name = "";
}

function emitToken(c, type) {
  if (typeof c === 'object') {
    source.push(c)
  } else if(c === 'EOF') {
    
  } else {
    source.push({
      type: 'String',
      value: c
    })
  }
  // console.log(source);
}

function error() {
  console.error('error');
}

// <p class="a">text text text</p>
const inTxt = `
<a title="inTxt" href="/" name="scroll-nav" class="logo" uigs="home">
  <span title="scroll-nav"></span>
</a>
`
const inTxts = inTxt.split("")
function getInput() {
  return inTxts.shift();
}

var state = data;
var char;

while ((char = getInput())) {
  // console.log(char);
  // console.log(state);
  state = state(char);
}

state('EOF')

console.log(source);
