// Function to generate robot
// The strategy below is just a suggestion, you may change the shapes to create your customized robot

function gen_robot() {
    // Creating Group (not necessary, but better readability)
    var robot = new THREE.Group();

    // torso
    var torso = gen_rect(4, 6);
    torso.name = "torso";

    // head
    var head = gen_circle(1.6);
    head.name = "head";
    head.position.y = 4.8;
    head.position.z = -0.05;  // Not necessary, makes head not in front of other robot parts

    // left: upper arm, arm, hand
    var left_upper_arm = gen_rect(1.5, 4);
    left_upper_arm.name = "left_upper_arm";
    var left_lower_arm = gen_rect(1, 3);
    left_lower_arm.name = "left_lower_arm";
    var left_hand = gen_rect(1.5,0.5);
    left_hand.name = "hand";
    left_upper_arm.add(left_lower_arm);
    left_lower_arm.add(left_hand);
    left_hand.position.y = -1.5;
    left_lower_arm.position.y = -3;
    left_upper_arm.position.x = -2.6;

    // right: upper arm, arm, hand
    var right_upper_arm = left_upper_arm.clone();  
    right_upper_arm.name = "right_upper_arm";
    right_upper_arm.position.x = 2.6;
    

    // left: upper leg, leg, foot
    var left_upper_leg = left_upper_arm.clone();
    left_upper_leg.position.x = -1.0;
    left_upper_leg.position.y = -5;


    // right: upper leg, leg, foot
    var right_upper_leg = left_upper_arm.clone();
    right_upper_leg.position.x = 1;
    right_upper_leg.position.y = -5;

    // Creating hieararchy
    robot.add(torso);
    torso.add(right_upper_arm);
    torso.add(head);
    torso.add(left_upper_arm);
    torso.add(left_upper_leg);
    torso.add(right_upper_leg);


    //add remaining robot parts hierarchical relations

    right_upper_arm.name = "right_upper_arm";
    right_upper_arm.children[0].name = "right_lower_arm";
    right_upper_arm.children[0].children[0].name = "right_hand";

    left_upper_leg.name = "left_upper_leg";
    left_upper_leg.children[0].name = "left_lower_leg";
    right_upper_arm.children[0].children[0].name = "left_foot";

    right_upper_leg.name = "right_upper_leg";
    right_upper_leg.children[0].name = "right_lower_leg";
    right_upper_leg.children[0].children[0].name = "right_foot";


    robot.name = "robot";

    return robot;
}


// Auxiliary function to generate rectangle
function gen_rect( width, height ) {
    var plane_geometry = new THREE.PlaneGeometry( width, height );
    var plane_material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh(plane_geometry, plane_material);

    return plane;
}

// Auxiliary function to generate circle
function gen_circle( radius, segs = 30 ) {
    var circle_geometry = new THREE.CircleGeometry( radius, segs);
    var circle_material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff} );
    var circle = new THREE.Mesh(circle_geometry, circle_material);

    return circle
}

// Auxiliary function to generate triangle
function gen_triangle( size, v1 = new THREE.Vector3(-1, 0, 0), v2 = new THREE.Vector3(1, 0, 0), v3 = new THREE.Vector3(-1, 1, 0) ) {
    var triangle_geometry = new THREE.Geometry();
    var triangle = new THREE.Triangle(v1, v2, v3);
    var normal = triangle.normal();
    triangle_geometry.vertices.push(triangle.a);
    triangle_geometry.vertices.push(triangle.b);
    triangle_geometry.vertices.push(triangle.c);
    triangle_geometry.faces.push(new THREE.Face3(0, 1, 2, normal));
    var triangle = new THREE.Mesh(triangle_geometry, new THREE.MeshNormalMaterial());
    
    triangle.size = size;

    return triangle;
}

// Função que reseta as posições iniciais das partes do robô
function reset(){
    TWEEN.removeAll(); //to use just the tweens of this moviment

    // Ângulo do reset
    // Por default é 0, pra voltar tudo par posição inicial
    var reset_angle = 0;

    var reset_time = 500;

    var reset_y = 0;

    // Partes do robô
    var torso = robot.getObjectByName("torso");

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

    let torsoReset = new TWEEN.Tween( { y: torso.position.y } )
        .to( { y: reset_y }, reset_time)
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

    let rightUpperArmReset = new TWEEN.Tween( { theta: 0} )
        .to( { theta: reset_angle }, reset_time)
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

    let rightLowerArmReset = new TWEEN.Tween( { theta: 0})
        .to( { theta: reset_angle }, reset_time)
        .onUpdate(function(){
    
            right_lower_arm.matrix.makeTranslation(0, pivot_right_lower_arm.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(0, pivot_right_lower_arm.y, 0 ) ));
    
            right_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
            
        })

    let leftUpperArmReset = new TWEEN.Tween( { theta: 0} )
        .to( { theta: reset_angle }, reset_time)
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

    let leftLowerArmReset = new TWEEN.Tween( { theta: 0})
        .to( { theta: reset_angle }, reset_time)
        .onUpdate(function(){

            left_lower_arm.matrix.makeTranslation(0, pivot_left_lower_arm.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(0, pivot_left_lower_arm.y, 0 ) ));

            left_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
            
        })

    let rightUpperLegReset = new TWEEN.Tween( { theta: 0} )
        .to( { theta: reset_angle }, reset_time)
        .onUpdate(function(){
                // This is an example of rotation of the right_upper_leg 
            // Notice that the transform is M = T * R 
                            
            // A primeira matriz da operação será a mais à direita
            // premultiply() vai adicionando as matriz à esquerda                
            right_upper_leg.matrix.makeTranslation(0, pivot_right_upper_leg.y + 1, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_right_upper_leg.x, pivot_right_upper_leg.y, 0 ) ));

            // Updating final world matrix (with parent transforms) - mandatory
            right_upper_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);    
        })

    let rightLowerLegReset = new TWEEN.Tween( { theta: 0})
        .to( { theta: reset_angle }, reset_time)
        .onUpdate(function(){

            right_lower_leg.matrix.makeTranslation(0, pivot_right_lower_leg.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(0, pivot_right_lower_leg.y, 0 ) ));

            right_lower_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
            
        })

    let leftUpperLegReset = new TWEEN.Tween( { theta: 0} )
        .to( { theta: reset_angle }, reset_time)
        .onUpdate(function(){
            // This is an example of rotation of the left_upper_leg 
            // Notice that the transform is M = T * R 
                            
            // A primeira matriz da operação será a mais à direita
            // premultiply() vai adicionando as matriz à esquerda                
            left_upper_leg.matrix.makeTranslation(0, pivot_left_upper_leg.y + 1, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(pivot_left_upper_leg.x, pivot_left_upper_leg.y, 0 ) ));
        
            // Updating final world matrix (with parent transforms) - mandatory
            left_upper_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);    
        })
        
    let leftLowerLegReset = new TWEEN.Tween( { theta: 0})
        .to( { theta: reset_angle }, reset_time)
        .onUpdate(function(){
        
            left_lower_leg.matrix.makeTranslation(0, pivot_left_lower_leg.y, 0).premultiply(
                new THREE.Matrix4().makeRotationZ(this._object.theta).premultiply(
                new THREE.Matrix4().makeTranslation(0, pivot_left_lower_leg.y, 0 ) ));
        
            left_lower_leg.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
            
        })

    torsoReset.start();

    rightUpperArmReset.start();
    rightLowerArmReset.start();
    
    leftUpperArmReset.start();
    leftLowerArmReset.start();

    rightUpperLegReset.start();
    rightLowerLegReset.start();

    leftUpperLegReset.start();
    leftLowerLegReset.start();
}