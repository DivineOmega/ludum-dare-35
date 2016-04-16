function InterviewScene() {

  this.convergame = null;

  this.background = null;
  this.interviewer = null;
  this.questionText = null;
  this.input = null;

  this.update = function(time) {

    this.interviewer.update(time);

    var response = this.input.getInputtedText();

    if (response.length>0) {
      alert(response);
    }

  };

  this.render = function() {

    this.convergame.draw.blankCanvas('#7ec0ee'); // sky blue

    this.background.render();
    this.interviewer.render();

    this.convergame.draw.rectangle(100, 20, 1700, 200, '#00cc00', '#333', 15);

    this.questionText.render();

    this.input.render();

  };

  this.init = function(convergame) {

    this.convergame = convergame;

    this.background = new Sprite();
    this.background.init(this.convergame, 0, 0, 1920, 1080, 'images/office/office.png');

    this.questionText = new Text();
    this.questionText.init(this.convergame, 130, 110, 'Question text!');
    this.questionText.font = 'MinecraftiaRegular';
    this.questionText.fontSize = 40;
    this.questionText.style = '#00CC00';

    this.input = new Input();
    this.input.init(this.convergame, 100, 900, 1700, 100, "Type your response...");
    this.input.align = "center";
    this.input.fontSize = 40;
    this.input.colour = '#00CC00';
    this.input.backgroundColour = '#111';
    this.input.borderColour = '#00CC00';
    this.input.borderWidth = 10;
    this.input.font = 'MinecraftiaRegular';
    this.input.focus();

    this.interviewer = new Interviewer();
    this.interviewer.init(convergame);

  };

}
