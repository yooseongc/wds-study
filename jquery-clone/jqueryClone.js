
class ElementCollection extends Array {

    ready(callback) {
        const isReady = this.some(e => e.readyState != null && e.readyState !== 'loading');
        if (isReady) {
            callback();
        } else {
            this.on('DOMContentLoaded', callback);
        }
        return this;
    }

    on(event, callbackOrSelector, callback) {
        if (typeof callbackOrSelector === 'function') {
            this.forEach(e => e.addEventListener(event, callbackOrSelector));
        } else {
            this.forEach(el => {
                el.addEventListener(event, e => {
                    if (e.target.matches(callbackOrSelector)) {
                        callback(e);
                    }
                });
            });
        }
        return this;
    }

    next() {
        return this.map(e => e.nextElementSibling).filter(e => e != null);
    }

    prev() {
        return this.map(e => e.previousElementSibling).filter(e => e != null);
    }

    removeClass(className) {
        this.forEach(e => e.classList.remove(className));
        return this;
    }

    addClass(className) {
        this.forEach(e => e.classList.add(className));
        return this;
    }

    css(property, value) {
        const camelProp = property.replace(/(-[a-z])/, g => g.replace('-', '').toUpperCase());
        this.forEach(e => e.style[camelProp] = value);
        return this;
    }

}

class AjaxPromise {

    constructor(promise) {
        this.promise = promise;
    }

    done(callback) {
        this.promise = this.promise.then(data => {
            callback(data);
            return data;
        });
        return this;
    }

    fail(callback) {
        this.promise = this.promise.catch(callback);
        return this;
    }

    always(callback) {
        this.promise = this.promise.finally(callback);
        return this;
    }

}

function $(param) {
    if (typeof param === 'string' || param instanceof String) {
        return new ElementCollection(...document.querySelectorAll(param));
    } else {
        return new ElementCollection(param);
    }
}

$.get = function({ url, data = {}, success = () => {}, dataType }) {
    const queryString = Object.entries(data).map(([key, value]) => {
        return `${key}=${value}`
    }).join('&');

    return new AjaxPromise(
        fetch(`${url}?${queryString}`, {
            method: 'GET',
            headers: { 'Content-Type': dataType }
        }).then(res => { 
            if (res.ok) {
                res.json();
            } else {
                throw new Error(res.status);
            }
        }).then(data => {
            success(data);
            return data;
        })
    );
};
