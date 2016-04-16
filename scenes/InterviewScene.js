function InterviewScene() {

  this.convergame = null;

  this.background = null;

  this.interviewer = null;

  this.update = function(time) {

    this.interviewer.update(time);

  };

  this.render = function() {

    this.convergame.draw.blankCanvas('#7ec0ee'); // sky blue

    this.background.render();
    this.interviewer.render();

  };

  this.init = function(convergame) {

    this.convergame = convergame;

    this.background = new Sprite();
    this.background.init(this.convergame, 0, 0, 1920, 1080, 'images/office/office.png');

    this.interviewer = new Interviewer();
    this.interviewer.init(convergame);

  };

}
