function Interviewer() {

  this.convergame = null;

  this.x = 540;
  this.y = 335;

  this.body = null;
  this.mouth = null;
  this.eyes = null;
  this.pupils = null;
  this.eyebrows = null;

  this.mouthUp = true;

  this.talking = true;

  this.talkTimer = 0;
  this.talkTimerLimit = 0.20;

  this.update = function(time) {

    if (this.talking) {
      this.talkTimer += time;

      if (this.talkTimer > this.talkTimerLimit) {
        if (this.mouthUp) {
          this.mouth.y += 10;
          this.mouth.x += 10;
        } else {
          this.mouth.y -= 10;
          this.mouth.x -= 10;
        }
        this.mouthUp = !this.mouthUp;
        this.talkTimer = 0;
      }
    }

  };

  this.render = function() {

    this.body.render();
    this.mouth.render();
    this.eyes.render();
    this.pupils.render();
    this.eyebrows.render();


  };

  this.init = function(convergame) {

    this.convergame = convergame;

    this.body = new Sprite();
    this.body.init(this.convergame, this.x, this.y, 727, 454, 'images/interviewer/body.png');

    this.mouth = new Sprite();
    this.mouth.init(this.convergame, this.x, this.y, 727, 454, 'images/interviewer/mouth.png');

    this.eyes = new Sprite();
    this.eyes.init(this.convergame, this.x, this.y, 727, 454, 'images/interviewer/eyes.png');

    this.pupils = new Sprite();
    this.pupils.init(this.convergame, this.x, this.y, 727, 454, 'images/interviewer/pupils.png');

    this.eyebrows = new Sprite();
    this.eyebrows.init(this.convergame, this.x, this.y, 727, 454, 'images/interviewer/eyebrows.png');

  };

}
