import { createApp } from 'vue'
import App from '../App.vue'
export const mapURL = process.env.VUE_APP_MAP
export const basicUrl = process.env.VUE_APP_API

const app = createApp(App)
app.config.globalProperties.basicUrl = mapURL

