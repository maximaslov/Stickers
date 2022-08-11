import StickersApi from './StickersApi.js';

const DEL_BTN_CLASS = 'stickers__del';

const $stickersPlace = $('.stickers');
const $createStickBtn = $('.button');

$createStickBtn.on('click', onCreateStickBtn);
$stickersPlace.on('focusout', addTextToStickerApi);
$stickersPlace.on('click','.'+ DEL_BTN_CLASS, onDelBtnClick);

StickersApi.request('')
    .then(stickers => stickers.map(e => {
        const sticker = e;
        addStickerToHtml(sticker, $stickersPlace, createSticker)
    }))
    .catch(error => alert(error.message));

function onCreateStickBtn() {
    const sticker = getSticker()
    StickersApi.request('', 'POST', sticker)
        .then(res => {
            addStickerToHtml(res, $stickersPlace, createSticker);
        });
}

function getSticker() {
    return {
        description: ``,
    }
}

function addTextToStickerApi(e) {
    const $elem = $(e.target);
    const id = $elem.data('id');
    const description = $elem.val();
    
    putTextToAPI(id, description) 
}

function putTextToAPI(id, description) {
    StickersApi.textChange(id, description);
}

function onDelBtnClick(e) {
    const $delBtn = $(e.target);
    const id = $delBtn.next().data('id');
        deleteSticker(id);
        $delBtn.parent().remove();
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
    place.append(fn(element));
}