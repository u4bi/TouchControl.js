export class Mobile {
    
    constructor(element){

        this.element = element || window;
        this.isTouch = false;
        this.isPinch = false;
 
        this.touch = {
            delta : {},
            move  : {},
            pinch : {},
            pitch : 0,
            yaw   : 0            
        };

        this.touchDown = this.touchDown.bind(this);
        this.touchUp   = this.touchUp.bind(this);
        this.touchMove = this.touchMove.bind(this);

        this.init();        
        
    }


    init(){
        // console.log('init');
        this.element.addEventListener('touchstart', this.touchDown);

        window.addEventListener('touchend', this.touchUp);
        window.addEventListener('touchmove', this.touchMove);

        this.isTouch = false;        

    }

    touchDown(e){
        // console.log(this);
        // console.log('touch start');

        this.isTouch = true;

        if(e.touches.length > 1){

            this.touch.pinch.x = e.touches[0].pageX - e.touches[1].pageX;
            this.touch.pinch.y = e.touches[0].pageY - e.touches[1].pageY;
 
            this.touch.pinch.start = Math.sqrt(this.touch.pinch.x * this.touch.pinch.x + this.touch.pinch.y * this.touch.pinch.y);
            // console.log('pinch start' ,this.touch.pinch.start);
            return;
        }
        

        this.touch.move.x = e.touches[0].pageX;
        this.touch.move.y = e.touches[0].pageY;
    }

    touchUp(e){ 
        // console.log('touch end');
        
        this.isTouch = false;
        this.isPinch = false;
    }

    touchMove(e){
        if(!this.isTouch) return;   
        // console.log('touch move');

        if(e.touches.length > 1){
            
            this.touch.pinch.x = e.touches[0].pageX - e.touches[1].pageX;
            this.touch.pinch.y = e.touches[0].pageY - e.touches[1].pageY;
            // console.log('pinch ' ,this.touch.pinch);

            this.touch.pinch.end = Math.sqrt(this.touch.pinch.x * this.touch.pinch.x + this.touch.pinch.y * this.touch.pinch.y);
            // console.log('pinch end ' ,this.touch.pinch.end);


            this.touch.pinch.zoom = this.touch.pinch.start / this.touch.pinch.end;
            // console.log('pinch zoom', this.touch.pinch.zoom);

            this.isPinch = true;
            return;
        }

        let screen = {
            width  : window.innerWidth,
            height : window.innerHeight
        };

        if(this.element !== window) screen = {
            width  : this.element.clientWidth,
            height : this.element.clientHeight
        };

        this.touch.delta = {
            x : parseInt(e.touches[0].pageX - this.touch.move.x),
            y : parseInt(e.touches[0].pageY - this.touch.move.y)
        };
 
        // console.log('delta ', this.touch.delta);

        this.touch.move = {
            x : e.touches[0].pageX,
            y : e.touches[0].pageY
        };

        // console.log('move ', this.touch.move);        

        // console.log('screen ', screen);

        let 
            fov    = 45,
            aspect = screen.width / screen.height,
            radian = Math.PI/180,
            half   = Math.PI/2;

        this.touch.yaw   += this.touch.delta.x / screen.width * fov * aspect * radian;
        
        this.touch.pitch += this.touch.delta.y / screen.height * fov * radian;
        this.touch.pitch  = Math.max(-half, Math.min(half, this.touch.pitch));

        // console.log('yaw', this.touch.yaw);
        // console.log('pitch', this.touch.pitch);
    }

}

  