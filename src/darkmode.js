const themeSwitch = document.getElementById("themeSwitch");
const body = document.body;

themeSwitch.onclick = () => {
  body.classList.toggle("dark-mode");
};

export { themeSwitch };
