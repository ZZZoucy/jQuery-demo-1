window.jQuery = function (selectorOrArray) {
    let elements;
    if (typeof selectorOrArray === "string") {
        elements = document.querySelectorAll(selectorOrArray);
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray;
    }
    return {
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                element.classList.add(className);
            }
            return this;
        },
        find(selector) {
            let array = [];
            for (let i = 0; i < elements.length; i++) {
                const elements2 = Array.from(elements[i].querySelectorAll(selector));
                array = array.concat(elements2);
            }
            array.oldApi = this;
            return jQuery(array);
        },
    };
};

window.$ = window.jQuery;

$("#test").find(".child").addClass("red"); // 请确保这句话成功执行
