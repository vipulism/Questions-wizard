const dataJson=[{id:"Q-101",title:"What is India's capital",type:"radiogroup",options:["Delhi","Mumbai","Kolkatta","Pune"]},{id:"Q-103",title:"Grand Central Terminal, Park Avenue, New York is the world's",type:"radiogroup",options:["largest railway station","highest railway station","longest railway station","None of the above"]},{id:"Q-103",title:"Entomology is the science that studies",type:"dropdown",options:["Behavior of human beings","Insects","The origin and history of technical and scientific terms","The formation of rocks"]}];class App{constructor(t){this.appName=t,this.appQuiz}getQuizData(t){return new Promise((i,n)=>{this.appQuiz=new Quiz(t.map(t=>new Question(t))),this.appQuiz.questions.length?i(this.appQuiz):n(e)})}init(){this.getQuizData(dataJson).then(t=>{t.isEnded()||this._render(t.getCurrentQuestion())})}select(t,e){if(e){const i=document.getElementById(e+"_opts").value;t=this.appQuiz.getCurrentQuestion().options.indexOf(i)}this.appQuiz.getCurrentQuestion().selectedOptIndex=t,this._statusUpdate()}next(){this.appQuiz.isEnded()||(null!=this.appQuiz.getCurrentQuestion().selectedOptIndex?(this.appQuiz.next(),this._render(this.appQuiz.getCurrentQuestion())):alert("select an option"))}previous(){this.appQuiz.currentQuestionIndex&&(this.appQuiz.previous(),this._render(this.appQuiz.getCurrentQuestion()))}_statusUpdate(){const t=document.querySelector(".status__count"),e=this.appQuiz.questions.filter(t=>null!=t.selectedOptIndex).length,i=this.appQuiz.questions.length;t.textContent=`${e}/${i}`;const n=100*e/i;document.querySelector(".status__bar-success").style.width=n+"%"}_getNavigation(){const t=document.querySelector(".buttons");t.innerHTML=`\n            <button ${questionnaire.appQuiz.isStart()?"disabled":""} onclick="questionnaire.previous()"> ‹ </button>\n            <button ${questionnaire.appQuiz.isEnded()?"disabled":""} onclick="questionnaire.next()"> › </button>\n            `,questionnaire.appQuiz.isEnded()&&(t.innerHTML+='<button onclick="questionnaire.submit()"> Submit </button>')}_getDropDown(t,e){e.innerHTML=`<select id="${t.id}_opts" onchange="questionnaire.select(null, '${t.id}')" ><option value="null" >Select an Option</option>\n        ${t.options.map((e,i)=>`<option ${i==t.selectedOptIndex?"selected":""} value="${e}">${e}</option>`).join("")}\n    </select>`}_getRadioGroup(t,e){e.innerHTML=`<ul>${t.options.map((e,i)=>`\n        <li>\n        <label for="${t.id}_${i}"><input type="radio" \n                id="${t.id}_${i}"\n                name="${t.id}" \n                onchange="questionnaire.select(${i})" ${i==t.selectedOptIndex?"checked":""}  />\n            ${e}</label>\n        </li>\n    `).join("")}\n    </ul>`}_addTitle(t){document.querySelector(".title").textContent=t}_render(t){const e=document.querySelector(".options");switch(this._addTitle(t.title),t.type){case"radiogroup":this._getRadioGroup(t,e);break;case"dropdown":this._getDropDown(t,e)}this._getNavigation(),this._statusUpdate()}_showResult(){const t=this.appQuiz.questions.reduce((t,e,i)=>(t.push({que:e.title,ans:e.options[e.selectedOptIndex]}),t),[]);document.querySelector(".options").innerHTML=`<div class="result">${t.map((t,e)=>`<div class="que">Q${e+1}. ${t.que} <span><b>Ans-${t.ans}</b></span>   </div>`).join("")}</div>`}submit(){this._addTitle("Result"),this._showResult(),document.querySelector("footer").remove()}}const questionnaire=new App("questionnaire");questionnaire.init();