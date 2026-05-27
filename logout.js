function logout() {
  localStorage.clear();
  // TODO: use SupaBase auth solution
  // TODO: redirect to index.html
  // Simulate an HTTP redirect:
  window.location.replace("/index.html");
}

//TODO: event listeners, preventdefaults etc. 
logoutBtn = document.querySelector("#Logout");
logoutBtn.addEventListener("click", logout);