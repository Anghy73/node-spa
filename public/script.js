import { router } from "./routes/index.routes.js";

function loadContent() {
  router(window.location.hash);
}

window.addEventListener("hashchange", loadContent);

loadContent();
