export default class Forms {
    constructor(forms, urlForm) {
        this.forms = document.querySelectorAll(forms);
        this.urlForm = urlForm;
        this.statusForm = {
            load: "Отправка....",
            success: "Мы с Вами скоро свяжемся.",
            failure: "Что-то пошло не так.",
        };
    }

    clearForm(form) {
        const inputs = form.querySelectorAll("input");
        inputs.forEach(elem => {
            elem.value = "";
        })
    }

    inputMask(selector) {
        let setCursorPosition = (pos, elem) => {
            elem.focus();

            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos)
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();

                range.collapse(true);
                range.moveEnd("cahracter", pos);
                range.moveStart("cahracter", pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = "+1 (___) ___ ____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                value = this.value.replace(/\D/g, "");

            if (def.length >= value.length) {
                value = def;
            }

            this.value = matrix.replace(/./g, function (a) {
                return (/[_\d]/.test(a) && i < value.length) ? value.charAt(i++) :
                    i >= value.length ? "" : a;
            })

            if (event.type === "blur") {
                if (this.value.length === 4) {
                    this.value = "";
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }


        const inputs = document.querySelectorAll(selector);

        inputs.forEach(input => {
            input.addEventListener("focus", createMask);
            input.addEventListener("blur", createMask);
            input.addEventListener("input", createMask);
            input.addEventListener("click", createMask);
        })
    }

    checkTextInput(select) {
        const inputs = document.querySelectorAll(select);

        inputs.forEach(elem => {
            elem.addEventListener("input", (e) => {
                e.target.value = e.target.value.replace(/[^a-z 0-9 @ \. \+]/ig, '');
                e.target.value = e.target.value.trim();
            })
        })
    }

    async postForm(url, data) {
        const response = await fetch(url, {
            method: "POST",
            body: data
        });

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status : ${response.status}`);
        }

        return await response.text();
    }

    sendForm() {
        this.forms.forEach(elem => {
            elem.addEventListener("submit", (event) => {
                event.preventDefault();

                let statusMessage = document.createElement("div");
                statusMessage.classList.add("form__status-message", "animated", "fadeIn");
                statusMessage.textContent = this.statusForm.load;
                document.body.prepend(statusMessage);

                const formData = new FormData(elem);
                this.postForm(this.urlForm, formData)
                    .then(res => {
                        console.log(res)
                        statusMessage.style.backgroundColor = "#2eb11ced"
                        statusMessage.textContent = this.statusForm.success;
                    })
                    .catch(e => {
                        statusMessage.textContent = this.statusForm.failure;
                        statusMessage.style.backgroundColor = "#b11c56ed"
                    })
                    .finally(() => {
                        this.clearForm(elem);
                        setInterval(() => {
                            statusMessage.classList.remove("fadeIn");
                            statusMessage.classList.add("fadeOut");
                        }, 3000);
                        setInterval(() => {
                            statusMessage.remove();
                        }, 4000);
                    })
            })
        })
    }

    init() {
        this.inputMask('[name="phone"]');
        this.checkTextInput("input[type='text']")
        this.sendForm();
    }
}