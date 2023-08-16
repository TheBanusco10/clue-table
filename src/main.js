import "./assets/styles.css";

import { createApp } from "vue";
import { createPinia, storeToRefs } from "pinia";

import App from "./App.vue";
import router from "./router";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "./stores/auth";
import { User } from "./utils/User";
import { auth } from "./config/firebase";

const app = createApp(App);

app.use(createPinia());

onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    const { user } = storeToRefs(useAuthStore());
    user.value = new User(firebaseUser);
  }
});

app.use(router);

app.mount("#app");
