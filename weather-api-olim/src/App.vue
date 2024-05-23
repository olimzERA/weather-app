<template>
  <div class="app">
    <div class="header container h-100 p-5 d-flex justify-content-between align-items-center">
      <h1 class="mb-5">Weather App</h1>
      <div class="d-flex align-items-center">
        <div class="searchbar w-50 mx-2">
          <input type="text" class="input form-control" v-model="city" placeholder="Enter a City">
        </div>
        <button class="btn-search btn" @click="searchWeather">Search
          <i class="search"></i>
        </button>
        <div class="ml-auto d-flex align-items-center"> 
         
          <div v-if="!user" class="d-flex">
            <router-link to="/login" class="btn-login btn mx-2">Login</router-link>
            <router-link to="/register" class="btn-register btn mx-2">Register</router-link>
          </div>
          
          <div v-else-if="user" class="d-flex align-items-center">
            <p class="mr-2">{{ user.displayName }}</p>
            <button @click="logout" class="btn btn-danger mx-2">LOGOUT</button>
          </div>
        </div>
      </div>
    </div>
    <router-view />
    <Weather v-if="showWeather" :city="city"></Weather>
    <ErrorPage v-if="showError"></ErrorPage>
  </div>
</template>

<script>
import axios from 'axios';
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Corrigido: importe a função signOut corretamente
import Weather from "./components/Weather.vue"; // Importe o componente Weather
import ErrorPage from "./components/Error.vue"; // Importe o componente ErrorPage

export default {
  name: "App",
  components: {
    Weather, // Adicione o componente Weather aqui
    ErrorPage // Adicione o componente ErrorPage aqui
  },
  data() {
    return {
      city: "",
      showWeather: false,
      showError: false,
      user: null 
    };
  },
  methods: {
    async searchWeather() {
      this.showError = false; // Definir para false ao iniciar uma nova busca
      await this.$nextTick();
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=8331cdef4f10633c84fd856ce65588b0`);
        const weatherData = response.data;
        if (weatherData.cod === 200) {
          this.showWeather = true; // Definir para true se os dados forem encontrados com sucesso
        } else {
          this.showWeather = false; // Definir para false se ocorrer um erro
          this.showError = true; // Definir para true para mostrar a página de erro
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.showWeather = false; // Definir para false se ocorrer um erro
        this.showError = true; // Definir para true para mostrar a página de erro
      }
    },
    
    logout() {
      signOut(auth)
        .then(() => {
          this.user = null; 
          this.$router.push('/login'); 
        })
        .catch(error => {
          console.error('Logout error:', error);
        });
    }
  },
  created() {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user; 
      } else {
        this.user = null; 
      }
    });
  }
};
</script>

<style>
body {
  background-color: #121212 !important;
  color: #fff;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.header {
  background-color: #212730;
  border-radius: 20px;
  margin-top: 5rem;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.header h1 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.searchbar .input {
  background-color: #2c2c2c;
  border: 1px solid #444;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem 1rem;
}

.searchbar .input::placeholder {
  color: #aaa;
}

.btn-search {
  background-image: linear-gradient(to right, #00c6ff, #0072ff);
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}

.btn-search:hover {
  background-image: linear-gradient(to right, #0072ff, #00c6ff);
  transform: translateY(-3px);
}

.btn-search:active {
  transform: translateY(1px);
}

.btn-login {
  background-color: #f857a6;
  background-image: linear-gradient(to right, #f857a6, #ff5858);
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}

.btn-login:hover {
  background-image: linear-gradient(to right, #ff5858, #f857a6);
  transform: translateY(-3px);
}

.btn-login:active {
  transform: translateY(1px);
}

.btn-register {
  background-color: #28a745;
  background-image: linear-gradient(to right, #28a745, #218838);
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}

.btn-register:hover {
  background-image: linear-gradient(to right, #218838, #28a745);
  transform: translateY(-3px);
}

.btn-register:active {
  transform: translateY(1px);
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
}
</style>
