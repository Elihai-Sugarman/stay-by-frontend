<template>
  <div class="branded-btn">
    <div class="cell" v-for="n in 100"></div>
    <div class="content">
      <button class="action-btn">
        <div>
          <slot></slot>
        </div>
      </button>
    </div>
  </div>
</template>
