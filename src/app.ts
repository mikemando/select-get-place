const formElement = document.querySelector("form")! as HTMLFormElement;
const formInput = document.getElementById("address")! as HTMLInputElement;

const formSubmitHandler = (event: Event) => {
    event.preventDefault();
    const input = formInput.value;
};

formElement.addEventListener("submit", formSubmitHandler);
