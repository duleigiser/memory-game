/**
 * @author [dulei]
 * @email [564779666@qq.com]
 * @create date 2017-12-13 10:26:37
 * @modify date 2017-12-13 10:26:37
 * @desc [description]
 */

/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position
 *      (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol
 *      (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page
 *      (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score
 *      (put this functionality in another function that you call from this one)
 */

window.PlayCard = function () {
  this.init.apply(this, arguments)
}
PlayCard.prototype = {
  init: function () {
    this.openList = [];
    //temporary storage of open cards
    this.sessionClassList = [];
    //temporary storage of open cards class to indentity card for compare
    this.cards = this.create()

  },
  //
  create: function () {
    let _this = this;
    let item = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']
    let items = shuffle([].concat(item, item))
    let cards = document.getElementsByClassName('card');
    let innerCard = null;

    // jquery 实现

    // $(cards).each(function(i){
    //   innerCard = this.getElementsByClassName('fa')[0];
    //   var newClass = innerCard.className.split(' ')[0] + " " + items[i]
    //   $(this).click(function(event){
    //     _this.handleClick(event, items[i])
    //   })

    //   .find('.fa').attr({class:newClass})
    // })

    // 原生实现

    Array.prototype.forEach.call(cards, function (card, index) {
       _this.bindclick = function(){
        //console.log('click')
        _this.handleClick(event, items[index])
      };
      card.addEventListener('click',_this.bindclick)
      innerCard = card.getElementsByClassName('fa')[0];
      innerCard.className = innerCard.className.split(' ')[0] + " " + items[index]
    });
    return cards
  },

  // 处理点击事件，并把点击的元素放入待检测的数组中对比，并决定
  handleClick: function (ev, _className) {
    let target = ev.target;
    target.className += " " + "open show rotate180"
    this.openList.push(target)
    this.checkIsMatch(_className)? this.foundMatch():this.hideCard();
  },
  checkIsMatch: function (_className) {
    let _this = this;
    let flag = true;
    if (this.sessionClassList.length == 0) {
      this.sessionClassList.push(_className)
    } else {
      flag = this.sessionClassList[0] === _className
      this.sessionClassList = [];
    }
    return flag;
  },
  foundMatch: function(){
    if(this.openList.length===2){
      this.openList[0].className='card match';
      this.openList[1].className='card match';
      this.openList = [];
    }
  },
  hideCard: function() {
    setTimeout( ()=>{
      this.openList[0].className='card';
      this.openList[1].className='card';
      this.openList = [];
    },1000)
  },
  restart: function () {
    let _move = document.getElementsByClassName('move')[0];
    _move.innerText = 0;
    this.create();
  },
}

var x = new PlayCard()
