
/**function Ball() {
    this.x = 100;
    this.y = 100;
    this.vx = 5;
    this.vy = 1;
    this.radius = 25;
    this.color = 'blue';

    this.drawer = function draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    this.ticker = function tick() {
        this.draw();
        this.x += this.vx;
        this.y += this.vy;

        if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
            this.vy = -this.vy;
        }
        if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
            this.vx = -this.vx;
        }

    };
};


 //
 // How could you change this script to add more balls to the canvas?
 //