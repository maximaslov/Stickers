'use strict'

import StickersApi from './StickersApi.js';

const DEL_BTN_CLASS = 'stickers__del';

const stickersPlace = document.querySelector('.stickers');
const createStickBtn = document.querySelector('.button');

createStickBtn.addEventListener('click', onCreateStickBtn);
// $createStickBtn.click(onCreateStickBtn)
stickersPlace.addEventListener('focusout', addTextToStickerApi);
stickersPlace.addEventListener('click', onDelBtnClick);

StickersApi.request('')
    .then(stickers => stickers.map(e => {
        const sticker = e;
        createSticker(sticker);
        addStickerToHtml(sticker, stickersPlace, createSticker)
    }))
    .catch(error => alert(error.message));

function onCreateStickBtn() {
    const sticker = getSticker()
    StickersApi.request('', 'POST', sticker)
        .then(res => {
            addStickerToHtml(res, stickersPlace, createSticker);
        });
}

function getSticker() {
    return {
        description: ``,
    }
}

function addTextToStickerApi(e) {
    const elem = e.target;
    const id = elem.dataset.id;
    const description = elem.value;
    
    putTextToAPI(id, description) 
}

function putTextToAPI(id, description) {
    StickersApi.textChange(id, description);
}

function onDelBtnClick(e) {
    const delBtn = e.target;
    if (delBtn.classList.contains(DEL_BTN_CLASS)) {
        const id = delBtn.nextElementSibling.dataset.id;
        deleteSticker(id);
        delBtn.parentElement.remove();
    }
}

function deleteSticker(id) {
    StickersApi.remove(id);
}

function createSticker(sticker) {
    const id = sticker.id;
    const text = sticker.description;

    return `
        <div class="sticker">
            <p class="stickers__del">DEL</p>
            <textarea spellcheck="false" class="sticker__text" name="sticker" data-id="${id}" cols="30" rows="5">${text}</textarea>
        </div>
    `
}

function addStickerToHtml(element, place, fn) {
    place.insertAdjacentHTML('afterbegin' , fn(element))
}