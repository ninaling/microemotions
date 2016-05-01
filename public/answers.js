var items=[
    {
        title: "what's your favourite colour?",
        message: "lime green"
    },
    {
        title: "what's your favourite animal?",
        message: "llama/doge"
    },
    {
        title: "hyphens or underscores as delimiters?",
        message: "underscores, hand down"
    },
    {
        title: "test question 4",
        message: "test answer 4"
    },
    {
        title: "test question 5",
        message: "test answer 5"
    },
    {
        title: "test question 6",
        message: "test answer 6"
    },
    {
        title: "test question 7",
        message: "test answer 7"
    },
    {
        title: "test question 8",
        message: "test answer 8"
    },
    {
        title: "test question 9",
        message: "test answer 9"
    },
    {
        title: "test question 10",
        message: "test answer 10"
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


