function InterviewScene() {

  this.convergame = null;

  this.background = null;
  this.interviewer = null;
  this.questionText = null;
  this.input = null;

  this.introMode = true;
  this.introStep = 0;

  this.typing = false;
  this.typingText = '';
  this.typingPosition = 0;
  this.typingTimer = 0;
  this.typingTimerLimit = 0.05;

  this.questionNumber = 1;
  this.awaitingAnswer = false;

  this.update = function(time) {

    this.interviewer.update(time);
    this.interviewer.talking = this.typing;
    this.input.hidden = this.typing;

    if (!this.input.hidden) {
      this.input.focus();
    }

    var words, i, response;

    if (this.introMode) {
      this.handleIntroSequence();
    } else {
      this.handleQuestioningSequence();
    }

    if (this.typing) {
      if (this.typingPosition < this.typingText.length + 25) {
        this.typingTimer += time;
        if (this.typingTimer >= this.typingTimerLimit) {
          this.typingPosition++;
          this.questionText.text = this.typingText.substr(0, this.typingPosition);
          this.typingTimer = 0;
        }
      } else {
        this.typing = false;
        this.typingPosition = 0;
      }
    }

  };

  this.render = function() {

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
    this.questionText.init(this.convergame, 130, 110, '');
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

    this.introMode = true;

  };

  this.handleIntroSequence = function() {
    switch (this.introStep) {
      case 0:
        this.typingText = "Hello there. Please take a seat. How are you?";
        this.typing = true;
        this.introStep = 1;
        break;

      case 1:
        if (!this.typing) {
          response = this.input.getInputtedText();

          if (response) {

            words = ['ok', 'fine', 'great', 'not bad', 'alright'];

            this.typingText = "Ah... Well, shall we get started?";
            for (i = 0; i < words.length; i++) {
              if (response.toLowerCase().indexOf(words[i]) > -1) {
                this.typingText = "Good good. Shall we get started?";
              }
            }

            this.typing = true;
            this.introStep = 2;

          }

        }
        break;

      case 2:
        if (!this.typing) {
          response = this.input.getInputtedText();

          if (response) {

            words = ['ok', 'fine', 'yes', 'alright', 'do it', 'indeed',
              'certainly', 'sure'];

            for (i = 0; i < words.length; i++) {
              if (response.toLowerCase().indexOf(words[i]) > -1) {
                this.introMode = false;
              }
            }

            if (this.introMode) {
              this.typingText = "Umm... shall we begin your shapeshifter interview?";
              this.typing = true;
            }

          }
        }
        break;
    }
  };

  this.handleQuestioningSequence = function() {

    var i, index;

    if (this.awaitingAnswer) {
      {
        var response = this.input.getInputtedText();

        if (response) {

          var answeredCorrectly = false;

          for (i = 0; i < current.answers.length; i++) {
            if (response.toLowerCase().indexOf(current.answers[i]) > -1) {
              answeredCorrectly = true;
              break;
            }
          }

          index = Math.floor(Math.random() * correctResponses.length);
          correctResponse = correctResponses[index];

          index = Math.floor(Math.random() * incorrectResponses.length);
          incorrectResponse = incorrectResponses[index];

          if (answeredCorrectly) {
            this.typingText = correctResponse;
          } else {
            this.typingText = incorrectResponse;
          }

          this.typing = true;

          this.awaitingAnswer = false;

          this.questionNumber++;

        }
      }
    } else if (this.typing === false) {

      index = Math.floor(Math.random() * questions.length);
      current = questions[index];

      this.typingText = 'Question ' + this.questionNumber + ': ' + current.question;
      this.typing = true;

      this.awaitingAnswer = true;
    }

  };
}
