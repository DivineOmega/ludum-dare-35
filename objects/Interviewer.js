function Interviewer() {

  this.convergame = null;

  this.x = 540;
  this.y = 335;

  this.body = null;
  this.mouth = null;
  this.eyes = null;
  this.pupils = null;
  this.eyebrows = null;

  this.talking = true;

  this.mouthUp = true;
  this.talkTimer = 0;
  this.talkTimerLimit = 0.25;

  this.bodyUp = true;
  this.bodyTimer = 0;
  this.bodyTimerLimit = 0.32;

  this.visible = true;

  this.talkingSound = new Audio('sounds/talking.ogg');

  this.update = function(time) {

    if (this.talkingSound.paused) {
      this.talkingSound.play();
    }

    if (this.talking) {

      this.talkingSound.volume = 1;

      this.talkTimer += time;

      this.mouth.height = 454;
      this.mouth.y = this.y;

      if (this.talkTimer > this.talkTimerLimit) {
        if (this.mouthUp) {
          this.mouth.y += 8;
          this.mouth.x += 58;
          this.mouth.width -= 100;
        } else {
          this.mouth.y -= 8;
          this.mouth.x -= 58;
          this.mouth.width += 100;
        }
        this.mouthUp = !this.mouthUp;
        this.talkTimer = 0;
      }
    } else {

      this.talkingSound.volume = 0;

      this.mouth.height = 250;
      this.mouth.y = this.y + 120;
    }

    this.bodyTimer += time;

    if (this.bodyTimer > this.bodyTimerLimit) {
      if (this.bodyUp) {
        this.body.y += 5;
        this.eyes.y += 3;
        this.eyebrows.y += 10;
      } else {
        this.body.y -= 5;
        this.eyes.y -= 3;
        this.eyebrows.y -= 10;
      }
      this.bodyUp = !this.bodyUp;
      this.bodyTimer = 0;
    }

  };

  this.render = function() {

    if (this.visible) {
      this.body.render();
      this.mouth.render();
      this.eyes.render();
      this.pupils.render();
      this.eyebrows.render();
    }

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
