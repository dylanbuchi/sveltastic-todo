import App from "./App.svelte";
import "../node_modules/bulma/css/bulma.css";
import "./app.css";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
