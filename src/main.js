import {
    createApp
} from 'vue'
import UltraButton from 'ultra-button'
import '../node_modules/ultra-button/ultra-button.css'
import App from './App.vue'

const app = createApp(App)
app.use(UltraButton);
app.mount('#app')