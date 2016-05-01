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
    }
];
var n=items.length;

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


