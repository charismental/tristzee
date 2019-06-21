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
  border: 2px solid #000;
  display: inline-grid;
  padding-top: 3px;
  padding-left: 3px;
  grid-gap: 3px;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-template-areas: "a b c"
                      "d e f"
                      "g h i";
}
.held {
  background-color: lightgreen;
}
.dot {
  height: 10px;
  width: 10px;
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
</style>
