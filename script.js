const form = document.querySelector(".payment-form");
const submitBtn = document.querySelector(".form-submit-btn");
const helper = {
    CCNumberLength: 16,
    formatCCNumber(numberToFormat) {
        let number = `${numberToFormat}`.replaceAll(" ", "");
        let CCNumber = "";
        for (let i = 0; i < number.length && i < this.CCNumberLength; i++) {
            if (i % 4 === 0 && i !== 0) CCNumber += " " + number[i];
            else CCNumber += number[i];
        }

        return CCNumber.trim();
    },
};
const formInputs = {
    numberEl: form.querySelector("#ccn-input"),
    name: form.querySelector("#name"),
    dateMonth: form.querySelector("#month-input"),
    dateYear: form.querySelector("#year-input"),
    cvc: form.querySelector("#cvc-input"),
    validInputStyle: getComputedStyle(
        document.documentElement
    ).getPropertyValue("--valid-outline"),
    invalidInputStyle: getComputedStyle(
        document.documentElement
    ).getPropertyValue("--invalid-outline"),
    get date() {
        return `${this.dateMonth.value.padEnd(
            2,
            0
        )}/${this.dateYear.value.padEnd(2, 0)}`;
    },

    get number() {
        return helper.formatCCNumber(this.numberEl.value);
    },

    hideInvalidInputStyle() {
        document.documentElement.style.setProperty(
            "--invalid-outline",
            this.validInputStyle
        );
    },
    showInvalidInputStyle() {
        document.documentElement.style.setProperty(
            "--invalid-outline",
            this.invalidInputStyle
        );
    },
    invalidStyleTimeOut: null,
    invalidStyleTimeOutDelay: 2500,
    invokeInvalidStyleTimeOut() {
        this.invalidStyleTimeOut = setTimeout(() => {
            formInputs.showInvalidInputStyle();
        }, formInputs.invalidStyleTimeOutDelay);
    },
};
const CCIllustration = {
    number: document.querySelector(".illustration-1-text-ccd"),
    name: document.querySelector(".illustration-1-text-name"),
    date: document.querySelector(".illustration-1-text-date"),
    cvc: document.querySelector(".illustration-sub-2-cvc"),
    defaultName: "Jane Appleseed",
};
const updateCCIllustration = function () {
    CCIllustration.name.textContent =
        formInputs.name.value.slice(0, 25) || CCIllustration.defaultName;
    CCIllustration.number.textContent = helper.formatCCNumber(
        formInputs.number.padEnd(19, "0")
    );
    CCIllustration.date.textContent = formInputs.date;
    CCIllustration.cvc.textContent = formInputs.cvc.value.padEnd(3, 0);
};
const updateForm = function () {
    formInputs.numberEl.value = helper.formatCCNumber(
        formInputs.numberEl.value
    );
};

const init = function () {
    updateCCIllustration();
    updateForm();
    formInputs.hideInvalidInputStyle();
};

form.addEventListener("input", () => {
    updateCCIllustration();
    updateForm();
    clearInterval(formInputs.invalidStyleTimeOut);
    formInputs.hideInvalidInputStyle();
    formInputs.invokeInvalidStyleTimeOut();
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;
    document.querySelector(".payment-section").style.display = "none";
    document.querySelector(".form-complete-section").style.display = "flex";
});
init();
