class Quiz {

    constructor(questions) {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = questions;

    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    isStart() {
        return this.currentQuestionIndex == 0;
    }
    isEnded() {
        return this.questions.length == (this.currentQuestionIndex + 1);
    }
    select(queId, selectedOptIndex) {
        this.questions.map(que => {
            if (que.id == queId) {
                que.selectedOptIndex = selectedOptIndex;
                console.log(this.questions);

            };
        })
    }

    next() {
        this.currentQuestionIndex++;
    }
    previous() {
        if (this.currentQuestionIndex) {
            this.currentQuestionIndex--;
        }
    }

}
