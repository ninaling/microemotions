var items=[
    {
        title: "If you could invite three people to dinner who would they be (alive only)?",
        message: "A: Dwayne \"The Rock\" Johnson, Barack Obama, and Gordan Ramsay"
    },
    {
        title: "Best movie you've ever seen?",
        message: "A: Nacho Libre"
    },
    {
        title: "If Batman fought all 4 ninja turtles at the same time who would win?",
        message: "A: Ninja turtles by far"
    },
    {
        title: "If you could be one animal what would it be?",
        message: "A: crocodile"
    },
    {
        title: "Would you rather spend a week stranded in the jungle or the desert?",
        message: "A: the desert, way too many giant bugs in the jungle"
    },
    {
        title: "If you could only drink one thing other than water for the rest of your life what would it be?",
        message: "beer"
    },
    {
        title: "Favorite sport to play or watch?",
        message: "A: Rugby to play and football to watch"
    },
    {
        title: "Least favorite genre of music?",
        message: "A: heavy trap music"
    },
    {
        title: "Rank the parts of a triathlon (swimming, biking, and running) in order from favorite to least favorite",
        message: "A: biking, swimming, running"
    },
    {
        title: "Would you rather never be able to access the internet again and live in LA or live on a remote island isolated with full access to the internet?",
        message: "A: LA with no internet, you can't replace actually interacting with other humans"
    }
];

var Answer=React.createClass({
  render: function(){
    var answerList=items.map(function(answer){
      return(
        <div className="answer">
          <span className='answer_title'>{answer.title}</span>
          <div className='answer_message'>{answer.message}</div>
        </div>
      );
    });
    return(<ul>{answerList}</ul>);
  }
});

React.render(<Answer/>, document.getElementById('answers_container'));


