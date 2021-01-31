

function danceAnimation() {}

var danceTweens = new TWEEN.Group();

Object.assign( danceAnimation.prototype, {

    init: function() {

    
        var right_upper_arm_angle_in_degrees = 180;
        var right_upper_arm_angle_in_radians = right_upper_arm_angle_in_degrees * (Math.PI/3) / 180;
        var right_upper_arm_angle_in_radians2 = right_upper_arm_angle_in_degrees * (Math.PI/6) / 180;
    
        //Right lower arm
        var right_lower_arm_angle_in_degrees = 180;
        var right_lower_arm_angle_in_radians = right_lower_arm_angle_in_degrees * (Math.PI/2) / 180;
    
        //Left upper arm
        var left_upper_arm_angle_in_degrees = 180;
        var left_upper_arm_angle_in_radians = left_upper_arm_angle_in_degrees * (-Math.PI/2) / 180;
        var left_upper_arm_angle_in_radians2 = left_upper_arm_angle_in_degrees * (-2*Math.PI/3) / 180;
    
        //Left lower arm
        var left_lower_arm_angle_in_degrees = 180;
        var left_lower_arm_angle_in_radians = left_lower_arm_angle_in_degrees * (-Math.PI/2) / 180;
    
        //Left upper leg
        var left_upper_leg_angle_in_degrees = 180;
        var left_upper_leg_angle_in_radians = left_upper_leg_angle_in_degrees * (-Math.PI/3) / 180;
    
        //Left lower leg
        var left_lower_leg_angle_in_degrees = 180;
        var left_lower_leg_angle_in_radians = left_lower_leg_angle_in_degrees * (Math.PI/3) / 180;
        var left_lower_leg_angle_in_radians2 = left_lower_leg_angle_in_degrees * (-Math.PI/3) / 180;
    
        //Right upper leg 
        var right_upper_leg_angle_in_degrees = 180;
        var right_upper_leg_angle_in_radians = right_upper_leg_angle_in_degrees * (Math.PI/3) / 180;
    
        //Right lower leg 
        var right_lower_leg_angle_in_degrees = 180;
        var right_lower_leg_angle_in_radians = right_lower_leg_angle_in_degrees * (-Math.PI/3) / 180;
        var right_lower_leg_angle_in_radians2 = right_lower_leg_angle_in_degrees * (Math.PI/3) / 180;
    
        //Torso -> agachamento
        var torso_sit = -2.5;

        // Pivôs pra cada articulação do robô
        var pivot_torso, pivot_right_upper_arm, pivor_right_lower_arm;
        var pivot_left_upper_arm, pivot_left_lower_arm, pivot_left_upper_leg, pivot_left_lower_leg;


        let torso = robot.getObjectByName("torso");

        let right_upper_arm =  robot.getObjectByName("right_upper_arm");
        let right_lower_arm = robot.getObjectByName("right_lower_arm");
      

        let left_upper_arm = robot.getObjectByName("left_upper_arm");
        let left_lower_arm = robot.getObjectByName("left_lower_arm");
     
        let left_upper_leg = robot.getObjectByName("left_upper_leg");
        let left_lower_leg = robot.getObjectByName("left_lower_leg");

        let right_upper_leg = robot.getObjectByName("right_upper_leg");
        let right_lower_leg = robot.getObjectByName("right_lower_leg");


        pivot_torso = new THREE.Vector3(
            torso.position.x,
            torso.position.y - torso.geometry.parameters.height/2,
            torso.position.z,
        );

        pivot_right_upper_arm = new THREE.Vector3(
            right_upper_arm.position.x,
            right_upper_arm.position.y + right_upper_arm.geometry.parameters.height/2,
            right_upper_arm.position.z,
        );

        pivot_right_lower_arm = new THREE.Vector3(
            right_lower_arm.position.x,
            right_lower_arm.position.y + right_lower_arm.geometry.parameters.height/2,
            right_lower_arm.position.z,
        );

        pivot_left_upper_arm = new THREE.Vector3(
            left_upper_arm.position.x,
            left_upper_arm.position.y + left_upper_arm.geometry.parameters.height/2,
            left_upper_arm.position.z,
        );

        pivot_left_lower_arm = new THREE.Vector3(
            left_lower_arm.position.x,
            left_lower_arm.position.y + left_lower_arm.geometry.parameters.height/2,
            left_lower_arm.position.z,
        );

        pivot_left_upper_leg = new THREE.Vector3(
            left_upper_leg.position.x,
            left_upper_leg.position.y + left_upper_leg.geometry.parameters.height/2,
            left_upper_leg.position.z,
        );

        pivot_left_lower_leg = new THREE.Vector3(
            left_lower_leg.position.x,
            left_lower_leg.position.y + left_lower_leg.geometry.parameters.height/2,
            left_lower_leg.position.z,
        );

        pivot_right_upper_leg = new THREE.Vector3(
            right_upper_leg.position.x,
            right_upper_leg.position.y + right_upper_leg.geometry.parameters.height/2,
            right_upper_leg.position.z,
        );

        pivot_right_lower_leg = new THREE.Vector3(
            right_lower_leg.position.x,
            right_lower_leg.position.y + right_lower_leg.geometry.parameters.height/2,
            right_lower_leg.position.z,
        );

        

        let rightUpperArmTween1 = new TWEEN.Tween( { theta: right_upper_arm_angle_in_radians2 }) //right arm up
        .to( { theta: right_upper_arm_angle_in_radians }, 500)
        .onUpdate(function(){
                         
            right_upper_arm.matrix.makeTranslation(0, -pivot_right_upper_arm.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_right_upper_arm.x, pivot_right_upper_arm.y, 0 ) ));
                
          
            right_upper_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
           
        });

        let rightUpperArmTween2 = new TWEEN.Tween( { theta: right_upper_arm_angle_in_radians })
        .to( { theta: right_upper_arm_angle_in_radians2 }, 500) //right arm down
        .onUpdate(function(){

            right_upper_arm.matrix.makeTranslation(0, -pivot_right_upper_arm.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_right_upper_arm.x, pivot_right_upper_arm.y, 0 ) ));

            right_upper_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera); 
        });

        let rightLowerArmTween1 = new TWEEN.Tween( { theta: 0}) 
        .to( { theta: right_lower_arm_angle_in_radians }, 500)
        .onUpdate(function(){

            right_lower_arm.matrix.makeTranslation(0, pivot_right_lower_arm.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(0, pivot_right_lower_arm.y, 0 ) ));

            right_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
            
        });

        let leftUpperArmTween1 = new TWEEN.Tween( { theta: left_upper_arm_angle_in_radians }) //left arm up
        .to( { theta: left_upper_arm_angle_in_radians2 }, 500)
        .onUpdate(function(){
                         
            left_upper_arm.matrix.makeTranslation(0, -pivot_left_upper_arm.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_left_upper_arm.x, pivot_left_upper_arm.y, 0 ) ));
                
          
            left_upper_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
           
        });

        let leftUpperArmTween2 = new TWEEN.Tween( { theta: left_upper_arm_angle_in_radians2 }) //left arm down
        .to( { theta: left_upper_arm_angle_in_radians }, 500)
        .onUpdate(function(){

            left_upper_arm.matrix.makeTranslation(0, -pivot_left_upper_arm.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_left_upper_arm.x, pivot_left_upper_arm.y, 0 ) ));

            left_upper_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera); 
        });

        let leftLowerArmTween1 = new TWEEN.Tween( { theta: 0}) 
        .to( { theta: left_lower_arm_angle_in_radians }, 500)
        .onUpdate(function(){

            left_lower_arm.matrix.makeTranslation(0, pivot_left_lower_arm.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(0, pivot_left_lower_arm.y, 0 ) ));

            left_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
            
        });

        let torsoTween1 = new TWEEN.Tween( { y: torso.position.y }) //"sit"
        .to( { y: torso_sit }, 500)
        .onUpdate(function(){
            // This is an example of rotation of the right_upper_arm 
            // Notice that the transform is M = T * R 

            // A primeira matriz da operação será a mais à direita
            // premultiply() vai adicionando as matriz à esquerda                
            torso.matrix.makeTranslation(0, this._object.y, 0);

            // Updating final world matrix (with parent transforms) - mandatory
            torso.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);    
        });


        let leftUpperLegTween1 = new TWEEN.Tween( { theta: 0 }) //"sit"
        .to( { theta: left_upper_leg_angle_in_radians }, 500)
        .onUpdate(function(){

            left_upper_leg.matrix.makeTranslation(0, pivot_left_upper_leg.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_left_upper_leg.x, pivot_left_upper_leg.y+1, 0 ) ));

            left_upper_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera); 
        });

        let leftLowerLegTween1 = new TWEEN.Tween( { theta: 0 }) //lower leg up
        .to( { theta: left_lower_leg_angle_in_radians }, 500)
        .onUpdate(function(){

            left_lower_leg.matrix.makeTranslation(0, pivot_left_lower_leg.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_left_lower_leg.x, pivot_left_lower_leg.y, 0 ) ));

            left_upper_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera); 
        });

        let leftLowerLegTween2 = new TWEEN.Tween( { theta: left_lower_leg_angle_in_radians }) //lower leg down
        .to( { theta: left_lower_leg_angle_in_radians2 }, 500)
        .onUpdate(function(){

            left_lower_leg.matrix.makeTranslation(0, pivot_left_lower_leg.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_left_lower_leg.x, pivot_left_lower_leg.y, 0 ) ));

            left_lower_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera); 
        }); 

        let rightUpperLegTween1 = new TWEEN.Tween( { theta: 0 }) // "sit"
        .to( { theta: right_upper_leg_angle_in_radians }, 500)
        .onUpdate(function(){

            right_upper_leg.matrix.makeTranslation(0, pivot_right_upper_leg.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_right_upper_leg.x, pivot_right_upper_leg.y+1, 0 ) ));

            right_upper_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera); 
        });

        let rightLowerLegTween1 = new TWEEN.Tween( { theta: 0 }) // lower leg up
        .to( { theta: right_lower_leg_angle_in_radians }, 500)
        .onUpdate(function(){

            right_lower_leg.matrix.makeTranslation(0, pivot_right_lower_leg.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_right_lower_leg.x, pivot_right_lower_leg.y, 0 ) ));

            right_lower_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera); 
        });

        let rightLowerLegTween2 = new TWEEN.Tween( { theta: right_lower_leg_angle_in_radians }) //lower leg down
        .to( { theta: right_lower_leg_angle_in_radians2 }, 500)
        .onUpdate(function(){

            right_lower_leg.matrix.makeTranslation(0, pivot_right_lower_leg.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_right_lower_leg.x, pivot_right_lower_leg.y, 0 ) ));

            right_lower_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera); 
        }); 

                
    
        
        //Arms
        rightUpperArmTween1.start(); 
        rightLowerArmTween1.start();
        rightUpperArmTween1.chain(rightUpperArmTween2);
        rightUpperArmTween2.chain(leftUpperArmTween2);    
        
    
        leftUpperArmTween1.start(); 
        leftLowerArmTween1.start();      
        leftUpperArmTween1.chain(leftUpperArmTween2);
        leftUpperArmTween2.chain(rightUpperArmTween2);
        
         

        //legs

        torsoTween1.start();
        leftUpperLegTween1.start();
        leftLowerLegTween1.start();
        rightUpperLegTween1.start();
        rightLowerLegTween1.start();

        //leftLowerLegTween1.chain(leftLowerLegTween2);

       // leftLowerLegTween2.chain(leftLowerLegTween1);
    
        
       // rightLowerLegTween1.chain(rightLowerLegTween2);
    
        //rightLowerLegTween1.chain(rightLowerLegTween2).repeat(2);
        //rightLowerLegTween1.start();
        
        leftLowerLegTween1.chain(leftLowerLegTween2);
        leftLowerLegTween2.chain(leftLowerLegTween1);

        rightLowerLegTween1.chain(rightLowerLegTween2);
        rightLowerLegTween2.chain(rightLowerLegTween1);

    },
    animate: function(time) {
        
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});






