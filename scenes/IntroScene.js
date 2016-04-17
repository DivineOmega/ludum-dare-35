function IntroScene() {

  this.convergame = null;

  this.titleText = null;
  this.subtitleText  = null;
  this.otherText = null;

  this.timer = 0;
  this.timerLimit = 6;

  this.update = function(time) {

    this.timer += time;
    if (this.timer >= this.timerLimit) {
      this.timer = 0;
      this.convergame.scene.changeScene(interviewScene);
    }

  };

  this.render = function() {

    this.convergame.draw.blankCanvas('#333');

    this.titleText.render();
    this.subtitleText.render();
    this.otherText.render();

  };

  this.init = function(convergame) {

    this.convergame = convergame;

    this.titleText = new Text();
    this.titleText.init(this.convergame, 200, 310, 'The Professional Shapeshifter');
    this.titleText.font = 'MinecraftiaRegular';
    this.titleText.fontSize = 80;
    this.titleText.style = '#00CC00';
    this.titleText.maxWidth = 1900;
    this.titleText.lineHeight = 55;

    this.subtitleText = new Text();
    this.subtitleText.init(this.convergame, 400, 580, 'A Ludum Dare 35 game by Jordan Hall');
    this.subtitleText.font = 'MinecraftiaRegular';
    this.subtitleText.fontSize = 50;
    this.subtitleText.style = '#009900';
    this.subtitleText.maxWidth = 1900;
    this.subtitleText.lineHeight = 55;

    this.otherText = new Text();
    this.otherText.init(this.convergame, 510, 780, 'Twitter: @DivineOmega / Website: jordanhall.co.uk');
    this.otherText.font = 'MinecraftiaRegular';
    this.otherText.fontSize = 30;
    this.otherText.style = '#009900';
    this.otherText.maxWidth = 1900;
    this.otherText.lineHeight = 55;

    interviewScene.musicSound.play();

  };

}
