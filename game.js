
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 250 },  
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
  this.load.image('dude', 'assets/dude.png'); // Static character image
  this.load.image('sky', 'assets/sky.png');   // Background
  this.load.image('ground', 'assets/platform.png'); // Ground
}

function create() {
  // Add background
  this.add.image(400, 200, 'sky');

  // Create platforms
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 368, 'ground').setScale(2).refreshBody();

  // Create player
  player = this.physics.add.sprite(100, 300, 'dude');
  player.setCollideWorldBounds(true); // Prevent falling off the screen
  player.setBounce(0.2);              // Slight bounce for realism

  this.physics.add.collider(player, platforms);

  // Add input handling
  cursors = this.input.keyboard.createCursorKeys();
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Space bar for jump
}

function update() {
  // Basic movement
  if (cursors.left.isDown) {
    player.setVelocityX(-160); // Move left
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);  // Move right
  } else {
    player.setVelocityX(0);   // Stop moving horizontally
  }

  if (spaceBar.isDown && player.body.touching.down) {
    player.setVelocityY(-100); // Set upward velocity for jump
  }

  // Debugging: Log position to check player
  console.log(player.body.touching.down);
}
