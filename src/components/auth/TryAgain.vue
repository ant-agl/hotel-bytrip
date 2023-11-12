<template>
  <button
    type="button"
    class="link"
    @click.prevent="send"
    :disabled="this.curSeconds > 0"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  emits: ["send"],
  props: {
    seconds: {
      type: Number,
      default: 60,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      curSeconds: this.active ? this.seconds : 0,
      timer: false,
    };
  },
  computed: {
    text() {
      return this.curSeconds > 0
        ? `Повторная отправка доступна через: ${this.time}`
        : "Отправить код еще раз";
    },
    time() {
      let minutes = Math.floor(this.curSeconds / 60);
      if (minutes < 10) minutes = "0" + minutes;

      let seconds = this.curSeconds - minutes * 60;
      if (seconds < 10) seconds = "0" + seconds;

      return `${minutes}:${seconds}`;
    },
  },
  methods: {
    send() {
      this.curSeconds = this.seconds;
      this.startTimer();
      this.$emit("send");
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.curSeconds--;

        if (this.curSeconds <= 0) clearInterval(this.timer);
      }, 1000);
    },
  },
  mounted() {
    this.startTimer();
  },
  unmounted() {
    clearInterval(this.timer);
  },
};
</script>
