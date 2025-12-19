const API_URL = "https://carambar-back-c4qi.onrender.com/api/v1/blagues/random";

const buttonGetJoke = document.getElementById("btn-joke");
const jokeSection = document.getElementById("joke");
const questionText = document.getElementById("question");
const answerText = document.getElementById("answer");
const errorMessage = document.getElementById("error");

buttonGetJoke.addEventListener("click", async () => {
  jokeSection.classList.add("hidden");
  errorMessage.classList.add("hidden");

  buttonGetJoke.disabled = true;
  buttonGetJoke.textContent = "Chargement...";

  try {
    const response = await fetch(API_URL);

    if (response.status === 404) {
      throw new Error("Aucune blague disponible");
    }

    if (!response.ok) {
      throw new Error("Erreur serveur");
    }

    const joke = await response.json();

    questionText.textContent = joke.question;
    answerText.textContent = joke.answer;

    jokeSection.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  } finally {
    buttonGetJoke.disabled = false;
    buttonGetJoke.textContent = "Afficher une blague";
  }
});
