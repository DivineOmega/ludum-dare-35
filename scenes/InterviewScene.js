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

  this.questionBag = [];
  this.questionNumber = 1;
  this.awaitingAnswer = false;
  this.totalQuestions = 10;
  this.correctAnswers = 0;

  this.resultsStep = 0;

  this.musicSound = new Audio('sounds/music.ogg');

  this.update = function(time) {

    if (this.musicSound.paused) {
      this.musicSound.volume = 0.8;
      this.musicSound.play();
    }

    this.interviewer.update(time);
    this.interviewer.talking = this.typing;
    this.input.hidden = this.typing;

    if (!this.input.hidden) {
      this.input.focus();
    }

    var words, i, response;

    if (this.introMode) {
      this.handleIntroSequence();
    } else if (this.questionNumber <= this.totalQuestions) {
      this.handleQuestioningSequence();
    } else {
      this.handleResults();
    }

    if (this.typing) {
      if (this.typingPosition >= this.typingText.length) {
        this.interviewer.talking = false;
      }
      if (this.typingPosition < this.typingText.length + 20) {
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
    this.questionText.maxWidth = 1670;
    this.questionText.lineHeight = 55;

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

    this.interviewer.visible = true;

    switch (this.introStep) {

      case 0:
        this.typingText = "Hello there. It's very nice to meet you.";
        this.typing = true;
        this.introStep = 10;
        break;

      case 10:
        if (!this.typing) {
          this.typingText = "I'll be interviewing you for the position of professional shapeshifter.";
          this.typing = true;
          this.introStep = 20;
        }
        break;

      case 20:
        if (!this.typing) {
          this.typingText = "Please take a seat... How are you today?";
          this.typing = true;
          this.introStep = 30;
        }
        break;

      case 30:
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
            this.introStep = 40;

          }

        }
        break;

      case 40:
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

    this.interviewer.visible = true;

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
            this.correctAnswers++;
          } else {
            this.typingText = incorrectResponse;
          }

          this.typing = true;

          this.awaitingAnswer = false;

          this.questionNumber++;

        }
      }
    } else if (this.typing === false) {

      if (this.questionBag.length === 0) {
        for (i = 0; i < questions.length; i++) {
          this.questionBag.push(questions[i]);
        }
      }

      index = Math.floor(Math.random() * this.questionBag.length);
      current = this.questionBag[index];
      this.questionBag.splice(index, 1);

      this.typingText = 'Question ' + this.questionNumber + ': ' + current.question;
      this.typing = true;

      this.awaitingAnswer = true;
    }

  };

  this.handleResults = function() {
    switch (this.resultsStep) {

      case 0:
        if (!this.typing) {
          this.typingText = "Okay. That concludes our interview session for today.";
          this.typing = true;
          this.resultsStep = 10;
        }
        break;

      case 10:
        if (!this.typing) {
          var percentage = (this.correctAnswers / this.totalQuestions) * 100;

          if (percentage >= 90) {
            this.typingText = "I'm happy to say you've got the job! Welcome to the wonderful world of professional shapeshifting.";
            this.typing = true;
            this.resultsStep = 30;
          } else if (percentage >= 60) {
            this.typingText = "Thanks for coming in. We'll give you a call if we're interested in taking you on.";
            this.typing = true;
            this.resultsStep = 20;
          } else if (percentage >= 30) {
            this.typingText = "Thanks for coming, but I'm afraid you're not really what we're looking for.";
            this.typing = true;
            this.resultsStep = 20;
          } else {
            this.typingText = "I'm sorry. I'm afraid you're definitely not what we're looking for.";
            this.typing = true;
            this.resultsStep = 20;
          }
        }
        break;

      case 20:
        if (!this.typing) {
          this.interviewer.visible = false;
          this.typingText = "[ They never called back. -_- Try again? [Y/N] ]";
          this.typing = true;
          this.resultsStep = 50;
        }
        break;

      case 30:
        if (!this.typing) {
          this.interviewer.visible = false;
          this.typingText = "[ Congratulations! You've got the job! ^_^ Go again? [Y/N] ]";
          this.typing = true;
          this.resultsStep = 50;
        }
        break;

      case 40:
        if (!this.typing) {
          this.interviewer.visible = false;
          this.typingText = "[ The End. Thank you so much for playing! ]";
          this.typing = true;
          this.resultsStep = 60;
        }
        break;

      case 50:
        if (!this.typing) {
          response = this.input.getInputtedText();

          if (response) {
            if (response.toLowerCase().indexOf('y') > -1) {
              this.introMode = true;
              this.questionNumber = 1;
              this.correctAnswers = 0;
              this.introStep = 20;
              this.resultsStep = 0;
            } else {
              this.resultsStep = 40;
            }
          }
        }
        break;

      case 60:
        this.input.hidden = true;
        break;
    }

  };

}
