<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  background: linear-gradient(to left, #248da8, #196579);
  padding: 0.5rem 3rem;
  border-radius: 0.5rem;
  color: #fff !important;
  border: none;
  font-family: "Shadows Into Light";
  margin-top: 20px;
  &:hover {
    color: #7adfe1 !important;
  }
}
</style>