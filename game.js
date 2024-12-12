}
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player, cursors, spaceBar, platforms;

function preload() {
  this.load.image('dude', 'assets/dude.png');
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
}

function create() {
  this.add.image(400, 200, 'sky');
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 368, 'ground').setScale(2).refreshBody();
  player = this.physics.add.sprite(100, 300, 'dude');
  player.setCollideWorldBounds(true);
  player.setBounce(0.2);
  this.physics.add.collider(player, platforms);
  cursors = this.input.keyboard.createCursorKeys();
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  if (spaceBar.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }

  console.log(player.body.touching.down);
}
