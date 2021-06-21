'use strict'

const date = new Date();

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}

export const getTime = () => {
    const hours = (date.getHours() < 10 ? '0': '') + date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0': '') + date.getMinutes();
    const time = hours + ':' + minutes;
    return time;
};

export const getRandom = (damage) => Math.ceil(Math.random() * damage);



