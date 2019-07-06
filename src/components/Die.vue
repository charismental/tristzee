<template>
    <div class="die" :class="[{'held': held}]">
      <div class="dot a" :class='[{"hidden" : value <= 3}]'></div>
      <div class="b"></div>
      <div class="dot c" :class='[{"hidden" : value === 1}]'></div>
      <div class="dot d" :class='[{"hidden" : value !== 6}]'></div>
      <div class="dot e" :class='[{"hidden" : value % 2 === 0}]'></div>
      <div class="dot f" :class='[{"hidden" : value !== 6}]'></div>
      <div class="dot g" :class='[{"hidden" : value === 1}]'></div>
      <div class="h"></div>
      <div class="dot i" :class='[{"hidden" : value <= 3}]'></div>
    </div>
</template>

<script>
export default {
props: {
    value : Number,
    held : Boolean
}
}
</script>

<style scoped>
.die {
  cursor: pointer;
  position: relative;
  height: 48px;
  width: 48px;
  background-color: #FFF;
  border-radius: 8px;
  border: 2px solid #000;
  display: inline-grid;
  padding-top: 4px;
  padding-left: 4px;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-template-areas: "a b c"
                      "d e f"
                      "g h i";
}
.held {
  background-color: #78909C;
}
.dot {
  height: 9px;
  width: 9px;
  background-color: #000;
  border-radius: 50%;
}
.a {
 grid-area: a;
}
.b {
 grid-area: b;
}
.c {
 grid-area: c;
}
.d {
 grid-area: d;
}
.e {
 grid-area: e;
}
.f {
 grid-area: f;
}
.g {
 grid-area: g;
}
.h {
 grid-area: h;
}
.i {
 grid-area: i;
}
.hidden {
 opacity: 0;
}
@media only screen and (min-width: 380px) {
    .die {
      height: 64px;
      width: 64px;
      padding-top: 5px;
      padding-left: 5px;
  }
    .dot {
      height: 12px;
      width: 12px;
  }
}
</style>
