
const dataJson = [
    { id: 'Q-101', title: 'What is India\'s capital', type: 'radiogroup', options: ['Delhi', 'Mumbai', 'Kolkatta', 'Pune'] },
    { id: 'Q-103', title: "Grand Central Terminal, Park Avenue, New York is the world's", type: 'radiogroup', options: ['largest railway station', 'highest railway station', 'longest railway station', 'None of the above'] },
    { id: 'Q-103', title: 'Entomology is the science that studies', type: 'dropdown', options: ['Behavior of human beings', 'Insects', 'The origin and history of technical and scientific terms', 'The formation of rocks'] }
]

class App {
    constructor(appName) {
        this.appName = appName;
        this.appQuiz;
    }

    getQuizData(data) {

        return new Promise((resolve, reject) => {

            this.appQuiz = new Quiz(data.map(que => new Question(que)))

            if (this.appQuiz.questions.length) {
                resolve(this.appQuiz);
            } else {
                reject(e)
            }
        })
    }

    init() {

        this.getQuizData(dataJson).then((quiz) => {

            if (quiz.isEnded()) {
                // show result
            } else {

                this._render(quiz.getCurrentQuestion());
            }
        })

    }


    select(selectedOptIndex, queId) {
        if (queId) {
            const selectedOpt = document.getElementById(queId + '_opts').value;
            selectedOptIndex = this.appQuiz.getCurrentQuestion().options.indexOf(selectedOpt);
        }
        this.appQuiz.getCurrentQuestion().selectedOptIndex = selectedOptIndex;
        this._statusUpdate();
    }

    next() {

        if (this.appQuiz.isEnded()) {
            // show result
        } else {
            if (this.appQuiz.getCurrentQuestion().selectedOptIndex != null) {
                this.appQuiz.next();
                this._render(this.appQuiz.getCurrentQuestion());
            } else {
                alert('select an option')
            }
        }
    }

    previous() {
        if (this.appQuiz.currentQuestionIndex) {
            this.appQuiz.previous();
            this._render(this.appQuiz.getCurrentQuestion());
        }
    }

    _statusUpdate() {
        const status = document.querySelector('.status__count');
        const attemtedQues = this.appQuiz.questions.filter(que => que.selectedOptIndex != null).length;
        const totalQues = this.appQuiz.questions.length;
        status.textContent = `${attemtedQues}/${totalQues}`

        const bar = document.querySelector('.status__bar-success');
        const barWidth = (attemtedQues * 100) / totalQues;
        bar.style.width = barWidth + '%';

    }

    _getNavigation() {
        const btns = document.querySelector('.buttons');


        btns.innerHTML = `
            <button ${ questionnaire.appQuiz.isStart() ? 'disabled' : ''} onclick="questionnaire.previous()"> ‹ </button>
            <button ${ questionnaire.appQuiz.isEnded() ? 'disabled' : ''} onclick="questionnaire.next()"> › </button>
            `
        if (questionnaire.appQuiz.isEnded()) {
            btns.innerHTML += `<button onclick="questionnaire.submit()"> Submit </button>`
        }
    }

    _getDropDown(que, elm) {
        elm.innerHTML = `<select id="${que.id}_opts" onchange="questionnaire.select(null, '${que.id}')" ><option value="null" >Select an Option</option>
        ${que.options.map((opt, i) => `<option ${i == que.selectedOptIndex ? 'selected' : ''} value="${opt}">${opt}</option>`).join("")}
    </select>`
    }

    _getRadioGroup(que, elm) {
        elm.innerHTML = `<ul>${que.options.map((opt, i) => `
        <li>
        <label for="${que.id}_${i}"><input type="radio" 
                id="${que.id}_${i}"
                name="${que.id}" 
                onchange="questionnaire.select(${i})" ${i == que.selectedOptIndex ? 'checked' : ''}  />
            ${opt}</label>
        </li>
    `).join('')}
    </ul>`
    }

    _addTitle(title) {

        const titleElm = document.querySelector('.title');
        titleElm.textContent = title
    }

    _render(currentQuestion) {
        const opts = document.querySelector('.options');
        this._addTitle(currentQuestion.title);

        switch (currentQuestion.type) {
            case 'radiogroup':
                this._getRadioGroup(currentQuestion, opts)
                break;
            case 'dropdown':
                this._getDropDown(currentQuestion, opts);
                break;
        }

        this._getNavigation();
        this._statusUpdate();
    }

    _showResult() {
        const result = this.appQuiz.questions.reduce((answers, item, i) => {
            answers.push({ que: item.title, ans: item.options[item.selectedOptIndex] });
            return answers;
        }, [])

        const elm = document.querySelector('.options');

        elm.innerHTML = `<div class="result">${result.map((item, i) => `<div class="que">Q${i + 1}. ${item.que} <span><b>Ans-${item.ans}</b></span>   </div>`).join('')}</div>`


    }

    submit() {
        this._addTitle('Result');
        this._showResult();
        document.querySelector('footer').remove();
    }

}

const questionnaire = new App('questionnaire');
questionnaire.init();
