function JumpAnimation() {}
    var angle_in_degrees = 105;
    var angle_in_radians = angle_in_degrees * Math.PI / 180;

Object.assign( JumpAnimation.prototype, {

    init: function() {

        let torsoTween1 = new TWEEN.Tween( {theta: 0} )
            .to( {theta: 0 }, 500)
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 

                let torso =  robot.getObjectByName("torso");   
                
                
                torso.updateMatrixWorld(true);

                // A primeira matriz da operação será a mais à direita
                // premultiply() vai adicionando as matriz à esquerda                
                torso.matrix.makeTranslation(0, 2, 0);

                // Updating final world matrix (with parent transforms) - mandatory
                torso.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
        

        let torsoTween2 = new TWEEN.Tween( {theta: 0} )
        .to( {theta: 0 }, 500)
        .onUpdate(function(){
            // This is an example of rotation of the right_upper_arm 
            // Notice that the transform is M = T * R 

            let torso =  robot.getObjectByName("torso");   
            
            
            torso.updateMatrixWorld(true);

            // A primeira matriz da operação será a mais à direita
            // premultiply() vai adicionando as matriz à esquerda                
            torso.matrix.makeTranslation(0, 0, 0);

            // Updating final world matrix (with parent transforms) - mandatory
            torso.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);    
        })

        let upperArmTween = new TWEEN.Tween( {theta: 0} )
            .to( {theta: angle_in_radians }, 500)
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 

                // Pivôs pra cada articulação do robô
                var pivot_right_upper_arm, pivot_right_lower_arm, pivot_right_hand;

                let right_upper_arm =  robot.getObjectByName("right_upper_arm");                

                pivot_right_upper_arm = new THREE.Vector3(
                    right_upper_arm.position.x,
                    right_upper_arm.position.y - right_upper_arm.geometry.parameters.height/2,
                    right_upper_arm.position.z,
                );                

                // A primeira matriz da operação será a mais à direita
                // premultiply() vai adicionando as matriz à esquerda                
                right_upper_arm.matrix.makeTranslation(0, pivot_right_upper_arm.y, 0).premultiply(
                    new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(pivot_right_upper_arm.x, -pivot_right_upper_arm.y, 0 ) ));
                    
                // Rotação original
                //right_upper_arm.matrix.makeRotationZ(this._object.theta).premultiply( new THREE.Matrix4().makeTranslation(2.6, 0, 0 ) );

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);    
            })
        
        torsoTween1.start(); 
        torsoTween1.chain(upperArmTween);
        upperArmTween.chain(torsoTween2);   

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