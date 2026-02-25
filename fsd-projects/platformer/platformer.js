$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    toggleGrid();

    // TODO 2 - Create Platforms - Left to Right Level Progression //

    // Level 1 - Starting platforms (left side)
    createPlatform(50, 350, 100, 20); // Starting platform
    createPlatform(150, 300, 100, 20); // Up and right
    createPlatform(250, 280, 100, 20); // Continue right
    createPlatform(350, 330, 100, 20); // Step down
    createPlatform(450, 280, 100, 20); // Back up, moving right
    createPlatform(550, 300, 100, 20, "yellow"); // Approach barrier

    // Level 2 - Middle progression platforms
    createPlatform(600, 280, 80, 20); // Cross barrier area
    createPlatform(700, 250, 100, 20); // Continuing right
    createPlatform(800, 280, 100, 20); // Mid-right section
    createPlatform(900, 240, 100, 20); // Higher section
    createPlatform(1000, 280, 100, 20); // Return down
    createPlatform(1100, 250, 100, 20, "green"); // Near final area

    // Level 3 - Final platforms reaching rightmost collectable
    createPlatform(1150, 280, 80, 20); // Approach final stretch
    createPlatform(1230, 250, 80, 20); // Near end platforms
    createPlatform(1310, 200, 60, 20); // Final platform before end
    createPlatform(1350, 150, 50, 20); // Platform at rightmost collectible

    // TODO 3 - Create Collectables - Along the path from left to right
    //Level 1 - First collectible at start area
    createCollectable("database", 100, 320, 0, 0);
    //Level 2 - Second collectible in middle
    createCollectable("database", 800, 250, 0, 0);
    //Level 3 - Final collectible at the rightmost position
    createCollectable("database", 1350, 120, 0, 0);
    // TODO 4 - Create Cannons - Positioned along the path
    // Cannon 1: Left side, early obstacle
    createCannon("left", 200, 1500);
    // Cannon 2: Middle section, fires from top
    createCannon("top", 400, 1800);
    // Cannon 3: Right side, final challenge
    createCannon("left", 1200, 1500);
    // Cannon 4: Right side, upper area
    createCannon("left", 900, 1600);
    // Cannon 5: Far right, near goal
    createCannon("top", 1300, 1400);

    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////

    // Debug: log canvas and platforms to inspect barrier placement
    console.log(
      "%c canvas size:",
      "color: teal; font-weight: bold;",
      canvas.width,
      canvas.height,
    );
    console.log(
      "%c platforms count:",
      "color: teal; font-weight: bold;",
      platforms.length,
    );
    console.log(
      "%c barriers:",
      "color: teal; font-weight: bold;",
      platforms.filter(function (p) {
        return p.barrierId !== undefined;
      }),
    );
    console.log(
      "%c first 10 platforms:",
      "color: teal; font-weight: bold;",
      platforms.slice(0, 10),
    );
  }

  registerSetup(setup);
});
