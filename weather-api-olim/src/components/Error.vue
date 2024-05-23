<template>
  <div class="error-page">
    <h2>Oops! City not found.</h2>
    <p>Please check if the city name is correct and try again.</p>
    <p class="mt-3 text-center">
          Go to Home Page <RouterLink to="/">HERE!</RouterLink>
        </p>
    <img src="../assets/963dbf83410067b8216bf3fbeec50874.gif" alt="Error GIF">
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: "ErrorPage",
    components: { RouterLink }
};
</script>

<style scoped>
.error-page {
  text-align: center;
  font-family: "Arial", sans-serif;
  margin-top: 5rem;
}

.error-page h2 {
  font-size: 2.5rem;
  color: #ff3333; /* Vermelho */
}

.error-page p {
  font-size: 1.2rem;
  color: #666; /* Cinza escuro */
  margin-top: 1rem;
}

.error-page img {
  margin-top: 2rem;
  max-width: 100%;
}
</style>
