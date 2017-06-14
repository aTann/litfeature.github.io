var entries = [
  {
    "term": "BACCHUS",
    "part": "n.",
    "definition": "A convenient deity invented by the ancients as an excuse for getting drunk.",
    "quote": [
      "Is public worship, then, a sin,",
      "That for devotions paid to Bacchus",
      "The lictors dare to run us in,",
      "And resolutely thump and whack us?"
    ],
    "author": "Jorace"
  },
  {
    "term": "BACKBITE",
    "part": "v.t.",
    "definition": "To speak of a man as you find him when he can't find you."
  },
  {
    "term": "BEARD",
    "part": "n.",
    "definition": "The hair that is commonly cut off by those who justly execrate the absurd Chinese custom of shaving the head."
  },
  {
    "term": "BEGGAR",
    "part": "n.",
    "definition": "One who has relied on the assistance of his friends."
  },
  {
    "term": "BELLADONNA",
    "part": "n.",
    "definition": "In Italian a beautiful lady; in English a deadly poison.  A striking example of the essential identity of the two tongues."
  },
  {
    "term": "BIGAMY",
    "part": "n.",
    "definition": "A mistake in taste for which the wisdom of the future will adjudge a punishment called trigamy."
  },
  {
    "term": "BORE",
    "part": "n.",
    "definition": "A person who talks when you wish him to listen."
  }
];

var html = "";

$.each(entries, function() {

  html += "<div class='entry'>";
  html += "<h3 class='term'>" + this.term + "</h3>";
  html += "<div class='part'>" + this.part + "</div>";
  html += "<div class='definition'>" + this.definition + "</div>";
  html += "</div>";
});

$('#dictionary-c').html(html);








