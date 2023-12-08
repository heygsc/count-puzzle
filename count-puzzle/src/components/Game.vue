<template>
  <ub-black v-if="!firstVisible" class="start" @click="first" size="large" type="red">START</ub-black>
  <div v-if="firstVisible">
    <div class="note" v-if="!success">数出每行字母个数，填在输入框</div>
    <div class="note" v-if="success">PERFECT!</div>
    <div>
      <div v-for="(row, index) in rows" :key="index" class="row" :class="getRowClass(index)">
        <span class="letter">{{ row }}</span>
        <input @input="checkAnswers" v-model="numbers[index]" v-bind:disabled="isCorrect(index)">
      </div>
    </div>
    <div>
      <span class="time">TIME : {{ time }} s</span>
      <button v-if="false" @click="handleClick">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: [],
      numbers: [],
      flag: [],
      correctCount: 0,
      firstVisible: false,
      success: false,
      time: '0.0',
      interval: null,
      startTime: 0,
      btnText: 'Start',
    }
  },
  mounted() {
    this.generateRows()
  },
  methods: {
    generateRows() {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      this.rows = []
      this.flag = []
      for (let i = 0; i < 5; i++) {
        const length = Math.floor(Math.random() * 10 + 10)
        const lettersArr = Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)])
        const row = lettersArr.join('')
        this.rows.push(row)
        this.flag.push(false)
      }
      this.numbers = Array.from({ length: this.rows.length }, () => '')
    },
    first() {
      this.firstVisible = !this.firstVisible
      this.handleClick()
    },
    checkAnswers() {
      this.numbers.forEach((number, index) => {
        this.getRowClass(index)
        if (number == this.rows[index].length && this.flag[index] == false) {
          this.correctCount++
          this.flag[index] = true
        }
      })
      if (this.correctCount == 5) {
        this.success = true
        this.handleClick()
      }
    },
    isCorrect(index) {
      return this.numbers[index] == this.rows[index].length
    },
    getRowClass(index) {
      if (this.isCorrect(index)) {
        return {
          correct: true
        }
      } else {
        return {
          wrong: true
        }
      }
    },
    //计时
    formatTime(time) {
      let seconds = Math.floor(time / 1000);
      let milliseconds = time % 1000;
      return `${seconds}.${milliseconds}`;
    },
    handleClick() {
      if (this.btnText === 'Start') {
        this.startTime = Date.now();
        this.interval = setInterval(() => {
          this.time = this.formatTime(Date.now() - this.startTime);
        }, 100);
        this.btnText = 'Stop';
      } else {
        clearInterval(this.interval);
        this.btnText = 'Start';
      }
    }
  },
}
</script>

<style scoped>
.start {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.note {
  font-size: 3rem;
  letter-spacing: 10px;
  color: tomato;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
}

input {
  width: 100px;
  font-size: 30px;
  border: none;
}

.letter {
  font-size: 2rem;
  letter-spacing: 3px;
}

.row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  height: 60px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
}

.correct {
  background-color: #c8e6c9;
}

.wrong {
  background-color: #f48fb1;
}

.time {
  display: flex;
  justify-content: center;
  font-size: 5rem;
  color: #212121;
}
</style>
