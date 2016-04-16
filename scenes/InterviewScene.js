function InterviewScene() {

  this.convergame = null;

  this.background = null;
  this.interviewer = null;
  this.questionText = null;

  this.update = function(time) {

    this.interviewer.update(time);

  };

  this.render = function() {

    this.convergame.draw.blankCanvas('#7ec0ee'); // sky blue

    this.background.render();
    this.interviewer.render();

    this.convergame.draw.rectangle(100, 20, 1700, 200, '#00cc00', '#333', 15);

    this.questionText.render();

  };

  this.init = function(convergame) {

    this.convergame = convergame;

    this.background = new Sprite();
    this.background.init(this.convergame, 0, 0, 1920, 1080, 'images/office/office.png');

    this.questionText = new Text();
    this.questionText.init(this.convergame, 130, 80, "Question text!");
    this.questionText.fontSize = 40;
    this.questionText.style = "#00CC00";

    this.interviewer = new Interviewer();
    this.interviewer.init(convergame);

  };

}
