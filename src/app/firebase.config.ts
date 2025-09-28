import { FirebaseOptions } from '@angular/fire/app';

interface Environment {
  production: boolean;
  firebaseConfig: FirebaseOptions;
}



export const environment: Environment = {
  production: false,
  firebaseConfig: { 
  apiKey: "AIzaSyBWBGRTJAkkYQyeIDX5VyEg0daZQCgYR6g",
  authDomain: "repo-sublime.firebaseapp.com",
  projectId: "repo-sublime",
  storageBucket: "repo-sublime.firebasestorage.app",
  messagingSenderId: "1033261148799",
  appId: "1:1033261148799:web:5676b6e3b93a8e01abed4a",
  measurementId: "G-ME0D7VYERB"
  }
};