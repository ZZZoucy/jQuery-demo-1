// window.$ = window.jQuery 是为了添加别名
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements;
    if (typeof selectorOrArrayOrTemplate === "string") {
        if (selectorOrArrayOrTemplate[0] === "<") {
            // 说明是标签
            // 创建 div
            elements = [createElement(selectorOrArrayOrTemplate)];
        } else {
            // 说明是选择器
            // 查找 div
            elements = document.querySelectorAll(selectorOrArrayOrTemplate);
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate;
    }

    function createElement(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
    // api 可以操作 elements
    const api = Object.create(jQuery.prototype);
    // 创建一个对象，这个对象的 __proto__ 为jQuery.prototype
    // 相当于写成 const api = {__proto__:jQuery.prototype}
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi,
    });
    // Object.assign... 相当于写成下面的代码
    // api.elements = elements
    // api.oldApi = selectorOrArrayOrTemplate.oldApi
    return api;
};

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jQuery: true,
    get(index) {
        return this.elements[index];
    },
    appendTo(node) {
        // appendTo() 把新增的元素放到另一个元素里
        if (node instanceof Element) {
            this.each((el) => node.appendChild(el));
            // 遍历 elements，对每个 el 进行 node.appendChild 操作
        } else if (node.jQuery === true) {
            this.each((el) => node.get(0).appendChild(el));
            // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
        }
    },
    append(children) {
        //在每个匹配元素里面的末尾处插入参数内容
        if (children instanceof Element) {
            this.get(0).appendChild(children);
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i]);
            }
        } else if (children.jQuery === true) {
            children.each((node) => this.get(0).appendChild(node));
        }
    },
    find(selector) {
        let array = [];
        for (let i = 0; i < this.elements.length; i++) {
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
            array = array.concat(this.elements2);
        }
        array.oldApi = this; // 这里的 this 是 旧api
        return jQuery(array);
    },
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i);
        }
        return this;
    },
    parent() {
        const array = [];
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode);
            }
        });
        return jQuery(array);
    },
    children() {
        const array = [];
        this.each((node) => {
            array.push(...node.children);
        });
        return jQuery(array);
    },
    print() {
        console.log(this.elements);
    },
    // 闭包：函数访问外部变量
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            element.classList.add(className);
        }
        return this;
    },
    end() {
        return this.oldApi || this.constructor(null); // 这里的 this 是 新api
    },
};
