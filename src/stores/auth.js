import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { User } from "../utils/User";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isLogged = computed(
    () => user.value !== undefined && user.value !== null
  );

  const logIn = async () => {
    try {
      const { user: firebaseUser } = await signInWithPopup(
        auth,
        new GoogleAuthProvider()
      );

      user.value = new User(firebaseUser);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      user.value = null;
    } catch (err) {
      console.error(err.message);
    }
  };

  return { user, isLogged, logIn, logOut };
});
