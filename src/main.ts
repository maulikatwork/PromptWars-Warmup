import './style.css'
import { App } from './app'

const appEl = document.querySelector<HTMLDivElement>('#app')!
appEl.appendChild(App())
