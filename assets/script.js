const canvas = new fabric.Canvas('fabricCanvas', {
    width: 300,
    height: 300
});

let toText,
    fromText;

fabric.Image.fromURL('assets/base.webp', function (img) {
    img.set({
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
    });
    canvas.setBackgroundImage(img, function () {
        toText = new fabric.CurvedText('To: ______ <3', {
            top: 240,
            textAlign: 'center',
            fill: '#ffffff',
            radius: 500,
            fontSize: 19,
            spacing: 0.2,
            fontFamily: 'WakuWaku',
            reverse: true,
            locked: true,
            selectable: false,
            originX: 'center'
        });

        fromText = new fabric.CurvedText('From: ______ :3', {
            top: 268,
            textAlign: 'center',
            fill: '#ffffff',
            radius: 500,
            fontSize: 14,
            spacing: 0.3,
            fontFamily: 'WakuWaku',
            reverse: true,
            locked: true,
            selectable: false,
            originX: 'center'
        });
        canvas.add(toText, fromText);
        canvas.centerObjectH(toText);
        canvas.centerObjectH(fromText);
        canvas.renderAll();
    });
});


function drawText(from, to) {
    toText.setText(`To: ${to} <3`);
    fromText.setText(`From: ${from} c:`);
    canvas.renderAll();
}

let generateBtn = document.querySelector('.generate-button'),
    toInput = document.querySelector(".to-input"),
    fromInput = document.querySelector(".from-input"),
    generateEls = document.querySelectorAll("[data-view='generate']"),
    generatedEls = document.querySelectorAll("[data-view='generated']"),
    regenerateBtn = document.querySelector('.regen-button'),
    downloadBtn = document.querySelector('.download-button')

function showEls(els) {
    els.forEach(e => e.classList.remove("d-none"));
}

function hideEls(els) {
    els.forEach(e => e.classList.add("d-none"));
}

function createImage() {
    return canvas.toDataURL({
        format: 'png',
        multiplier: 1.8,
        quality: 1
    });
}

generateBtn.addEventListener("click", async function () {
    let from = fromInput.value.trim(),
        to = toInput.value.trim();

    if (!from || !to) return;

    drawText(from, to);

    downloadBtn.href = createImage();
    showEls(generatedEls);
    hideEls(generateEls);
});

regenerateBtn.addEventListener("click", async function () {
    drawText("______", "_______");
    hideEls(generatedEls);
    showEls(generateEls);
    toInput.value = "";
    fromInput.value = "";
});
