
function JumpAnimation() {}  

    TWEEN.removeAll(); //to use only the tweens of this moviment
Object.assign( JumpAnimation.prototype, {

    init: function() {

        TWEEN.removeAll(); //to use just the tweens of this moviment

        //Right arm
        var angle_right_upper_arm_in_degrees = 150;
        var angle_right_upper_arm_in_radians = angle_right_upper_arm_in_degrees * Math.PI / 180;
    
        var angle_right_lower_arm_in_degrees = 90;
        var angle_right_lower_arm_in_radians = angle_right_lower_arm_in_degrees * Math.PI / 180;
        // -----
    
        // Left arm
        var angle_left_upper_arm_in_degrees = -150;
        var angle_left_upper_arm_in_radians = angle_left_upper_arm_in_degrees * Math.PI / 180;
    
        var angle_left_lower_arm_in_degrees = 90;
        var angle_left_lower_arm_in_radians = angle_left_lower_arm_in_degrees * Math.PI / 180;
        // -----
    
        // Right leg
        var angle_right_upper_leg_in_degrees = 60;
        var angle_right_upper_leg_in_radians = angle_right_upper_leg_in_degrees * Math.PI / 180;
    
        var angle_right_lower_leg_in_degrees = 90;
        var angle_right_lower_leg_in_radians = angle_right_lower_leg_in_degrees * Math.PI / 180;
        // -----
    
        // Left leg
        var angle_left_upper_leg_in_degrees = -150;
        var angle_left_upper_leg_in_radians = angle_left_upper_leg_in_degrees * Math.PI / 180;
    
        var angle_left_lower_leg_in_degrees = 90;
        var angle_left_lower_leg_in_radians = angle_left_lower_leg_in_degrees * Math.PI / 180;
        // -----
    
        // Altura do pulo, que é o quanto o torso vai ser transladado no eixo y
        var jump_height = 2;
        
        // Partes do robô
        let torso = robot.getObjectByName("torso");

        var right_upper_arm =  robot.getObjectByName("right_upper_arm");
        var right_lower_arm =  robot.getObjectByName("right_lower_arm");
        
        var left_upper_arm =  robot.getObjectByName("left_upper_arm");
        var left_lower_arm =  robot.getObjectByName("left_lower_arm");

        var right_upper_leg =  robot.getObjectByName("right_upper_leg");
        var right_lower_leg =  robot.getObjectByName("right_lower_leg");

        var left_upper_leg =  robot.getObjectByName("left_upper_leg");
        var left_lower_leg =  robot.getObjectByName("left_lower_leg");
            
        // Pivôs de rotação das articulações
        var pivot_right_upper_arm;
        var pivot_right_lower_arm; 
        
        var pivot_left_upper_arm;
        var pivot_left_lower_arm;
        
        var pivot_right_upper_leg;
        var pivot_right_lower_leg; 
        
        var pivot_left_upper_leg;
        var pivot_left_lower_leg; 

        // Right upper arm
        pivot_right_upper_arm = new THREE.Vector3(
            right_upper_arm.position.x,
            right_upper_arm.position.y + right_upper_arm.geometry.parameters.height/2,
            right_upper_arm.position.z,
        );
        
        // Right lower arm
        pivot_right_lower_arm = new THREE.Vector3(
            right_lower_arm.position.x,
            right_lower_arm.position.y + right_lower_arm.geometry.parameters.height/2,
            right_lower_arm.position.z,
        );
        
        // Left upper arm
        pivot_left_upper_arm = new THREE.Vector3(
            left_upper_arm.position.x,
            left_upper_arm.position.y + left_upper_arm.geometry.parameters.height/2,
            left_upper_arm.position.z,
        );
        
        // Left lower arm
        pivot_left_lower_arm = new THREE.Vector3(
            left_lower_arm.position.x,
            left_lower_arm.position.y + left_lower_arm.geometry.parameters.height/2,
            left_lower_arm.position.z,
        );

        // Right upper leg
        pivot_right_upper_leg = new THREE.Vector3(
            right_upper_leg.position.x,
            right_upper_leg.position.y + right_upper_leg.geometry.parameters.height/2,
            right_upper_leg.position.z,
        );
        
        // Right lower leg
        pivot_right_lower_leg = new THREE.Vector3(
            right_lower_leg.position.x,
            right_lower_leg.position.y + right_lower_leg.geometry.parameters.height/2,
            right_lower_leg.position.z,
        );
        
        // Left upper leg
        pivot_left_upper_leg = new THREE.Vector3(
            left_upper_leg.position.x,
            left_upper_leg.position.y + left_upper_leg.geometry.parameters.height/2,
            left_upper_leg.position.z,
        );
        
        // Left lower leg
        pivot_left_lower_leg = new THREE.Vector3(
            left_lower_leg.position.x,
            left_lower_leg.position.y + left_lower_leg.geometry.parameters.height/2,
            left_lower_leg.position.z,
        );

        let torsoTween1 = new TWEEN.Tween( { y: torso.position.y } )
            .to( { y: jump_height }, 500)
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
            })
        

        let torsoTween2 = new TWEEN.Tween( {y: jump_height } )
            .to( { y: torso.position.y }, 500)
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
            })

        let rightUpperArmTween1 = new TWEEN.Tween( { theta: 0} )
            .to( { theta: angle_right_upper_arm_in_radians }, 500)
            .onUpdate(function(){
                 // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                                
                // A primeira matriz da operação será a mais à direita
                // premultiply() vai adicionando as matriz à esquerda                
                right_upper_arm.matrix.makeTranslation(0, -pivot_right_upper_arm.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(pivot_right_upper_arm.x, pivot_right_upper_arm.y, 0 ) ));

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightUpperArmTween2 = new TWEEN.Tween( { theta: angle_right_upper_arm_in_radians} )
        .to( { theta: 0 }, 500)
        .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                                
                // A primeira matriz da operação será a mais à direita
                // premultiply() vai adicionando as matriz à esquerda                
                right_upper_arm.matrix.makeTranslation(0, -pivot_right_upper_arm.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(pivot_right_upper_arm.x, pivot_right_upper_arm.y, 0 ) ));

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
        })

        let leftUpperArmTween1 = new TWEEN.Tween( { theta: 0} )
            .to( { theta: angle_left_upper_arm_in_radians }, 500)
            .onUpdate(function(){
                 // This is an example of rotation of the left_upper_arm 
                // Notice that the transform is M = T * R 
                                
                // A primeira matriz da operação será a mais à direita
                // premultiply() vai adicionando as matriz à esquerda                
                left_upper_arm.matrix.makeTranslation(0, -pivot_left_upper_arm.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(pivot_left_upper_arm.x, pivot_left_upper_arm.y, 0 ) ));

                // Updating final world matrix (with parent transforms) - mandatory
                left_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let leftUpperArmTween2 = new TWEEN.Tween( { theta: angle_left_upper_arm_in_radians} )
        .to( { theta: 0 }, 500)
        .onUpdate(function(){
                // This is an example of rotation of the left_upper_arm 
                // Notice that the transform is M = T * R 
                                
                // A primeira matriz da operação será a mais à direita
                // premultiply() vai adicionando as matriz à esquerda                
                left_upper_arm.matrix.makeTranslation(0, -pivot_left_upper_arm.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(pivot_left_upper_arm.x, pivot_left_upper_arm.y, 0 ) ));

                // Updating final world matrix (with parent transforms) - mandatory
                left_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
        })

        let rightUpperLegTween1 = new TWEEN.Tween( { theta: 0} )
            .to( { theta: angle_right_upper_leg_in_radians }, 500)
            .onUpdate(function(){
                 // This is an example of rotation of the right_upper_leg 
                // Notice that the transform is M = T * R 
                                
                // A primeira matriz da operação será a mais à direita
                // premultiply() vai adicionando as matriz à esquerda                
                right_upper_leg.matrix.makeTranslation(0, pivot_right_upper_leg.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(pivot_right_upper_leg.x, pivot_right_upper_leg.y + 1, 0 ) ));

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })

        let rightUpperLegTween2 = new TWEEN.Tween( { theta: angle_right_upper_leg_in_radians} )
            .to( { theta: 0 }, 500)
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_leg 
                // Notice that the transform is M = T * R 
                                
                // A primeira matriz da operação será a mais à direita
                // premultiply() vai adicionando as matriz à esquerda                
                right_upper_leg.matrix.makeTranslation(0, pivot_right_upper_leg.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(pivot_right_upper_leg.x, pivot_right_upper_leg.y + 1, 0 ) ));

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
                
                // Debug
                /*
                console.log("upper leg height: " + right_upper_leg.geometry.parameters.height);
                console.log("upper leg width: " + right_upper_leg.geometry.parameters.width);
                console.log("upper leg position x: " + right_upper_leg.position.x);
                console.log("upper leg position y: " + right_upper_leg.position.y);
                console.log("upper leg pivot x: " + pivot_right_upper_leg.x);
                console.log("upper leg pivot y: " + pivot_right_upper_leg.y);
                console.log("==================");
                */
                
            })

        let rightLowerLegTween1 = new TWEEN.Tween( { theta: 0})
            .to( { theta: angle_right_lower_leg_in_radians }, 500)
            .onUpdate(function(){
        
                right_lower_leg.matrix.makeTranslation(0, pivot_right_lower_leg.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(0, pivot_right_lower_leg.y, 0 ) ));
        
                right_lower_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
                
            })
        
        let rightLowerLegTween2 = new TWEEN.Tween( { theta: angle_right_lower_leg_in_radians })
            .to( { theta: 0 }, 500)
            .onUpdate(function(){
        
                right_lower_leg.matrix.makeTranslation(0, pivot_right_lower_leg.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(0, pivot_right_lower_leg.y, 0 ) ));
        
                right_lower_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera); 
        
                // Debug
                /*
                console.log("lower leg height: " + right_lower_leg.geometry.parameters.height);
                console.log("lower leg width: " + right_lower_leg.geometry.parameters.width);
                console.log("lower leg position x: " + right_lower_leg.position.x);
                console.log("lower leg position y: " + right_lower_leg.position.y);
                console.log("lower leg pivot x: " + pivot_right_lower_leg.x);
                console.log("lower leg pivot y: " + pivot_right_lower_leg.y);
                console.log("==================");
                */
            })

        let leftUpperLegTween1 = new TWEEN.Tween( { theta: 0} )
            .to( { theta: angle_left_upper_leg_in_radians }, 500)
            .onUpdate(function(){
                // This is an example of rotation of the left_upper_leg 
                // Notice that the transform is M = T * R 
                                
                // A primeira matriz da operação será a mais à direita
                // premultiply() vai adicionando as matriz à esquerda                
                left_upper_leg.matrix.makeTranslation(0, pivot_left_upper_leg.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(pivot_left_upper_leg.x, pivot_left_upper_leg.y + 1, 0 ) ));
            
                // Updating final world matrix (with parent transforms) - mandatory
                left_upper_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
            
        let leftUpperLegTween2 = new TWEEN.Tween( { theta: angle_left_upper_leg_in_radians} )
            .to( { theta: 0 }, 500)
            .onUpdate(function(){
                // This is an example of rotation of the left_upper_leg 
                // Notice that the transform is M = T * R 
                                
                // A primeira matriz da operação será a mais à direita
                // premultiply() vai adicionando as matriz à esquerda                
                left_upper_leg.matrix.makeTranslation(0, pivot_left_upper_leg.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(pivot_left_upper_leg.x, pivot_left_upper_leg.y + 1, 0 ) ));
            
                // Updating final world matrix (with parent transforms) - mandatory
                left_upper_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
                
                // Debug
                /*
                console.log("upper leg height: " + left_upper_leg.geometry.parameters.height);
                console.log("upper leg width: " + left_upper_leg.geometry.parameters.width);
                console.log("upper leg position x: " + left_upper_leg.position.x);
                console.log("upper leg position y: " + left_upper_leg.position.y);
                console.log("upper leg pivot x: " + pivot_left_upper_leg.x);
                console.log("upper leg pivot y: " + pivot_left_upper_leg.y);
                console.log("==================");
                */
                
            })
            
        let leftLowerLegTween1 = new TWEEN.Tween( { theta: 0})
            .to( { theta: angle_left_lower_leg_in_radians }, 500)
            .onUpdate(function(){
            
                left_lower_leg.matrix.makeTranslation(0, pivot_left_lower_leg.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(0, pivot_left_lower_leg.y, 0 ) ));
            
                left_lower_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
                
            })
            
        let leftLowerLegTween2 = new TWEEN.Tween( { theta: angle_left_lower_leg_in_radians })
            .to( { theta: 0 }, 500)
            .onUpdate(function(){
            
                left_lower_leg.matrix.makeTranslation(0, pivot_left_lower_leg.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(0, pivot_left_lower_leg.y, 0 ) ));
            
                left_lower_leg.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera); 
            
                // Debug
                /*
                console.log("lower leg height: " + left_lower_leg.geometry.parameters.height);
                console.log("lower leg width: " + left_lower_leg.geometry.parameters.width);
                console.log("lower leg position x: " + left_lower_leg.position.x);
                console.log("lower leg position y: " + left_lower_leg.position.y);
                console.log("lower leg pivot x: " + pivot_left_lower_leg.x);
                console.log("lower leg pivot y: " + pivot_left_lower_leg.y);
                console.log("==================");
                */
            })
        
        
        torsoTween1.start();
        torsoTween1.chain(torsoTween2);

        rightUpperArmTween1.start();
        rightUpperArmTween1.chain(rightUpperArmTween2);
        
        rightUpperLegTween1.start();
        rightUpperLegTween1.chain(rightUpperLegTween2);
        
        rightLowerLegTween1.start();
        rightLowerLegTween1.chain(rightLowerLegTween2);

        leftUpperArmTween1.start();
        leftUpperArmTween1.chain(leftUpperArmTween2);

        leftUpperLegTween1.start();
        leftUpperLegTween1.chain(leftUpperLegTween2);

        leftLowerLegTween1.start();
        leftLowerLegTween1.chain(leftLowerLegTween2);
        

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