function WaveAnimation() {}
    var angle_in_degrees = 105;
    var angle_in_radians = angle_in_degrees * Math.PI / 180;

Object.assign( WaveAnimation.prototype, {

    init: function() {

        let upperArmTween1 = new TWEEN.Tween( {theta: 0} )
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

        // Here you may include animations for other parts 
        let lowerArmTween1 = new TWEEN.Tween( {theta: 0})
            .to( {theta: Math.PI/2 }, 500)
            .onUpdate(function(){

                var pivot_right_lower_arm;

                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                let right_lower_arm =  robot.getObjectByName("right_lower_arm");

                pivot_right_lower_arm = new THREE.Vector3(
                    right_lower_arm.position.x - right_lower_arm.geometry.parameters.width,
                    right_lower_arm.position.y - right_lower_arm.geometry.parameters.height/2 ,
                    right_lower_arm.position.z,
                );

                right_lower_arm.matrix.makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(-pivot_right_lower_arm.x, pivot_right_lower_arm.y/2, 0 ) );

                right_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera); 

            })

            let lowerArmTween2 = new TWEEN.Tween( {theta: Math.PI/2})
            .to( {theta: 0 }, 500)
            .onUpdate(function(){

                var pivot_right_lower_arm;

                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                let right_lower_arm =  robot.getObjectByName("right_lower_arm");

                pivot_right_lower_arm = new THREE.Vector3(
                    right_lower_arm.position.x - right_lower_arm.geometry.parameters.width,
                    right_lower_arm.position.y - right_lower_arm.geometry.parameters.height/2 ,
                    right_lower_arm.position.z,
                );

                right_lower_arm.matrix.makeRotationZ(this._object.theta).premultiply(
                    new THREE.Matrix4().makeTranslation(-pivot_right_lower_arm.x, pivot_right_lower_arm.y/2, 0 ) );

                right_lower_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera); 

            })
    
        let upperArmTween2 = new TWEEN.Tween( {theta: angle_in_radians} )
        .to( {theta: 0 }, 500)
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
        
        
        //  upperArmTween.chain( ... ); this allows other related Tween animations occur at the same time
        
        upperArmTween1.start();
        upperArmTween1.chain(lowerArmTween1);
        lowerArmTween1.chain(lowerArmTween2);
        lowerArmTween2.chain(upperArmTween2);  
        //lowerArmTween.start();     

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




