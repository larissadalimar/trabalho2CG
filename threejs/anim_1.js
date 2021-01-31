function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        // Ângulos que cada articulação rotacionará
        // Deixei o ângulo em graus pra ficar mais legível/fácil de entender, depois passo pra radianos
        var angle_right_upper_arm_in_degrees = 105;
        var angle_right_upper_arm_in_radians = angle_right_upper_arm_in_degrees * Math.PI / 180;

        var angle_right_lower_arm_in_degrees = 90;
        var angle_right_lower_arm_in_radians = angle_right_lower_arm_in_degrees * Math.PI / 180;

        // Partes do robô
        var right_upper_arm =  robot.getObjectByName("right_upper_arm");
        var right_lower_arm =  robot.getObjectByName("right_lower_arm");  
        
        // Pivôs de rotação das articulações
        var pivot_right_upper_arm;
        var pivot_right_lower_arm;     

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
                    
                // Rotação original
                //right_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(2.6, 0, 0 ) );

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
                
                // Debug
                /*
                console.log("upper arm height: " + right_upper_arm.geometry.parameters.height);
                console.log("upper arm width: " + right_upper_arm.geometry.parameters.width);
                console.log("upper arm position x: " + right_upper_arm.position.x);
                console.log("upper arm position y: " + right_upper_arm.position.y);
                console.log("upper arm pivot x: " + pivot_right_upper_arm.x);
                console.log("upper arm pivot y: " + pivot_right_upper_arm.y);
                console.log("==================");
                */
            })

        // Here you may include animations for other parts 
        let rightLowerArmTween1 = new TWEEN.Tween( { theta: 0})
            .to( { theta: angle_right_lower_arm_in_radians }, 500)
            .onUpdate(function(){

                right_lower_arm.matrix.makeTranslation(0, pivot_right_lower_arm.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(0, pivot_right_lower_arm.y, 0 ) ));

                right_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
                
            })

            let rightLowerArmTween2 = new TWEEN.Tween( { theta: angle_right_lower_arm_in_radians })
            .to( { theta: 0 }, 500)
            .onUpdate(function(){

                right_lower_arm.matrix.makeTranslation(0, pivot_right_lower_arm.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(0, pivot_right_lower_arm.y, 0 ) ));

                right_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera); 

                // Debug
                /*
                console.log("lower arm height: " + right_lower_arm.geometry.parameters.height);
                console.log("lower arm width: " + right_lower_arm.geometry.parameters.width);
                console.log("lower arm position x: " + right_lower_arm.position.x);
                console.log("lower arm position y: " + right_lower_arm.position.y);
                console.log("lower arm pivot x: " + pivot_right_lower_arm.x);
                console.log("lower arm pivot y: " + pivot_right_lower_arm.y);
                console.log("==================");
                */
            })
    
        let rightUpperArmTween2 = new TWEEN.Tween( { theta: angle_right_upper_arm_in_radians } )
        .to( { theta: 0 }, 500)
        .onUpdate(function(){
            // This is an example of rotation of the right_upper_arm 
            // Notice that the transform is M = T * R             

            // A primeira matriz da operação será a mais à direita
            // premultiply() vai adicionando as matriz à esquerda                
            right_upper_arm.matrix.makeTranslation(0, -pivot_right_upper_arm.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_right_upper_arm.x, pivot_right_upper_arm.y, 0 ) ));
                
            // Rotação original
            //right_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(2.6, 0, 0 ) );

            // Updating final world matrix (with parent transforms) - mandatory
            right_upper_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);    
        })
        
        
        //  rightUpperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        
        rightUpperArmTween1.start();
        rightUpperArmTween1.chain(rightLowerArmTween1);
        rightLowerArmTween1.chain(rightLowerArmTween2);
        rightLowerArmTween2.chain(rightUpperArmTween2);
        

        //rightLowerArmTween1.start(); 
        //rightLowerArmTween1.chain(rightLowerArmTween2);

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




