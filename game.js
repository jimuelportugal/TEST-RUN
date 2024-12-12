const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false
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
  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
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

  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'idle',
    frames: [{ key: 'dude', frame: 0 }],
    frameRate: 10
  });

  player.play('idle'); 

  this.cameras.main.startFollow(player);
  this.cameras.main.setZoom(3);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('walk', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('walk', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('idle', true);
  }

  if (spaceBar.isDown && player.body.touching.down) {
    player.setVelocityY(-150);
  }
}
