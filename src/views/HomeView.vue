<template>
  <div class="wrapper">
    <nav class="navigation">
      <ul class="navigation__list">
        <li class="navigation__element">
          <router-link
            class="navigation__link"
            :class="{ navigation__link_active: actualRoute === 'home' }"
            :to="{ name: 'home' }"
            >Главная</router-link
          >
        </li>
        <li class="navigation__separator">/</li>
        <li class="navigation__element">
          <router-link
            class="navigation__link"
            :class="{ navigation__link_active: actualRoute === 'storage' }"
            :to="{ name: 'storage' }"
            >Системы хранения</router-link
          >
        </li>
        <li class="navigation__separator">/</li>
        <li class="navigation__element">
          <router-link
            class="navigation__link"
            :class="{ navigation__link_active: actualRoute === 'rack' }"
            :to="{ name: 'rack' }"
            >Комплекты стеллажных систем</router-link
          >
        </li>
      </ul>
    </nav>
    <main class="main-info">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const actualRoute = ref(route.name);
</script>

<style src="./HomeView.css" scoped />
