var w = window.innerWidth;
var h = window.innerHeight;

var renderer = PIXI.autoDetectRenderer(w, h);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var renderTexture = new PIXI.RenderTexture(renderer, renderer.width, renderer.height);
var renderTexture2 = new PIXI.RenderTexture(renderer, renderer.width, renderer.height);
var currentTexture = renderTexture;

var outputSprite = new PIXI.Sprite(currentTexture);


outputSprite.position.x = w/2;
outputSprite.position.y = h/2;
outputSprite.anchor.set(0.5);

stage.addChild(outputSprite);

var stuffContainer = new PIXI.Container();

stuffContainer.position.x = w/2;
stuffContainer.position.y = h/2;

stage.addChild(stuffContainer);


var fruits = [
    'http://roky.rocks/done_w/spin1.png',
    'http://roky.rocks/done_w/spin2.png',
    'http://roky.rocks/done_w/spin3.png',
    'http://roky.rocks/done_w/spin4.png',
    'http://roky.rocks/done_w/spin5.png',
    'http://roky.rocks/done_w/spin6.png',
    'http://roky.rocks/done_w/spin7.png',
    'http://roky.rocks/done_w/spin8.png'
];

var items = [];

for (var i = 0; i < 20; i++)
{
    var item = PIXI.Sprite.fromImage(fruits[i % fruits.length]);
    item.position.x = Math.random() * w/2 - 200;
    item.position.y = Math.random() * h/2 - 200;

    item.anchor.set(0.01);

    stuffContainer.addChild(item);

    items.push(item);
}

// used for spinning!
var count = 0;

animate();

function animate()
{
    requestAnimationFrame(animate);

    for (var i = 0; i < items.length; i++)
    {
        var item = items[i];
        item.rotation += 0.05;
    }

    count += 0.01;

    var temp = renderTexture;
    renderTexture = renderTexture2;
    renderTexture2 = temp;

    outputSprite.texture = renderTexture;

    stuffContainer.rotation -= 0.01;
    outputSprite.scale.set(1 + Math.sin(count) * 0.2);

    renderTexture2.render(stage, null, false);
  
    window.onresize = function (event){
    var w = window.innerWidth;
    var h = window.innerHeight;

    renderer.view.style.width = w + "px";
    renderer.view.style.height = h + "px";

    renderer.resize(w,h);
    }

    renderer.render(stage);
}