var parser = {
  DIV_SIGN: document.getElementById('div').firstChild.nodeValue,
  MUL_SIGN: document.getElementById('mul').firstChild.nodeValue,
  MIN_SIGN: document.getElementById('sub').firstChild.nodeValue,

  input: document.getElementById('input'),

  reset: function() {
    input.value = '';
  },

  append: function(char) {
    input.value += this.handleInput(char);
  },

  removeLast: function() {
    input.value = input.value.slice(0, -1);
  },

  showResult: function() {
    input.value = this.convertDashToMin(this.handleUndefined(this.getResult()));
  },

  getResult: function() {
    return eval(this.fix(this.convertString(input.value)));
  },

  handleInput: function(char) {
    return this.handleAddingBracket(this.handleOperator(char));
  },

  handleUndefined: function(v) {
    return v === undefined ? '' : v;
  },

  handleOperator: function(char) {
    return this.handleAddingOperator(this.handleDoubledOperators(char));
  },

  handleDoubledOperators: function(char) {
    return this.isDoubledOperator(char) ? '' : char;
  },

  handleAddingOperator: function(char) {
    return this.isOperator(char) && input.value === '' && char !== this.MIN_SIGN
      ? '' : char;
  },

  handleAddingBracket: function(char) {
    return char === ')' && input.value.count('(') <= input.value.count(')')
      ? '' : char;
  },

  fix: function(str) {
    return this.fixOperator(this.fixLackOfMulSigns(this.fixBrackets(str)));
  },

  fixBrackets: function(str) {
    return this.fixEmptyBrackets(this.fixAmountOfBrackets(str));
  },

  fixEmptyBrackets: function(str) {
    let pos = str.indexOf('()');
    while (pos !== -1) {
      str = str.remove(pos, 2);
      pos = str.indexOf('()', --pos);
    }
    return str;
  },

  fixAmountOfBrackets: function(str) {
    return this.appendRightBrackets(str, str.count('(') - str.count(')'));
  },

  fixLackOfMulSigns: function(str) {
    return str.replace(/(\d)\(/g, '$1*(');
  },

  fixOperator: function(str) {
    return this.isOperator(str.slice(-1)) ? str.remove(str.length - 1, 1) : str;
  },

  appendRightBrackets: function(str, n) {
    while (n--) str += ')';
    return str;
  },

  isDigit: function(char) {
    return !isNaN(parseInt(char, 10));
  },

  isOperator: function(char) {
    return !this.isDigit(char) && char !== '(' && char !== ')' && char !== '';
  },

  isDoubledOperator: function(char) {
    return this.isOperator(char) && this.isOperator(input.value.slice(-1));
  },

  convertString: function(str) {
    str = str.replace(RegExp(this.DIV_SIGN, 'g'), '/');
    str = str.replace(RegExp(this.MUL_SIGN, 'g'), '*');
    str = str.replace(RegExp(this.MIN_SIGN, 'g'), '-');
    return str;
  },

  convertDashToMin: function(str) {
    return str.toString().replace('-', this.MIN_SIGN);
  }
};

String.prototype.insert = function(str, pos) {
  return this.substring(0, pos) + str + this.substring(pos, this.length);
}

String.prototype.remove = function(pos, len) {
  return this.substring(0, pos) + this.substring(pos + len, this.length);
}

String.prototype.count = function(str) {
  for (var num = 0, pos = this.indexOf(str); pos !== -1; ++num)
    pos = this.indexOf(str, pos + 1);
  return num;
}

String.prototype.setCharAt = function(pos, char) {
  if (pos > this.length - 1) return this;
  return this.substr(0, pos) + char + this.substr(pos + 1);
}
