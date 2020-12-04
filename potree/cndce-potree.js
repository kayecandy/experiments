$(()=>{

    const $potreeView = $(".cndce-potree--viewer");

    window.viewer = new Potree.Viewer($potreeView[0]);

    var container = $potreeView[0];

    var mouse = new THREE.Vector2();
    var raycaster = new THREE.Raycaster();

    var camera = viewer.scene.getActiveCamera();

    var panoramasQuaternions = [];

    viewer.setFOV(60);
    viewer.setPointBudget(1 * 1000 * 1000);
    viewer.loadSettingsFromURL();

    // viewer.loadGUI(() => {
    //     // viewer.setLanguage('en');
    //     $("#menu_tools").next().show();
    //     $("#menu_clipping").next().show();
    //     // viewer.toggleSidebar();
    // });

    // Load and add point cloud to scene
    Potree.loadPointCloud("./assets/pointcloud/metadata.json", "sigeom.sa", e => {
        let scene = viewer.scene;
        let pointcloud = e.pointcloud;

        let material = pointcloud.material;
        material.size = 1;
        material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
        material.shape = Potree.PointShape.SQUARE;
        material.activeAttributeName = "rgba";
        scene.addPointCloud(pointcloud);


        // Set camera initial position to sphere 1
        viewer.scene.view.position.copy(sphere_1.position);
        viewer.scene.view.lookAt(
            -100,
            -0.1100359142672947,
            -0.32940886022918914
        )

        var texture = new THREE.TextureLoader().load(sphere_1.image360_path);


        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = - 1;

        sphere_1.material.map = texture;
        sphere_1.material.opacity = 0;
        sphere_1.material.color = '';
        sphere_1.material.needsUpdate = true;
        controls.enabledPanorama = true;
        enabledPanorama = true;

        viewer.filterPointSourceIDRange = [sphere_1.num_panorama, sphere_1.num_panorama];


        viewer.setFOV(60);



    });



    var panoramas = [];
    var enabledPanorama = false;
    var controls = viewer.getControls(viewer.scene.view.navigationMode);

    console.log(controls);


    container.addEventListener('mousemove', function (e) {
        var rect = container.getBoundingClientRect();

        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(panoramas, false);
        if (intersects.length > 0) {
            container.style.cursor = "pointer";
        }
        else {
            container.style.cursor = "auto";
        }
        intersects = null;
    }, false);

    container.addEventListener('mousewheel', function (e) { 
        if (enabledPanorama) {

            if (!e.ctrlKey) {
                var current_fov = viewer.getFOV();
                if (e.deltaY > 0) { 
                    current_fov++;
                    if (current_fov > 100) { 
                        current_fov = 100;
                    }
                    viewer.setFOV(current_fov);
                }
                else {
                    current_fov--;
                    if (current_fov < 1) {
                        current_fov = 1;

                    }
                    viewer.setFOV(current_fov);
                }
            }
            else {
                raycaster.setFromCamera(mouse, camera);
                var intersects = raycaster.intersectObjects(panoramas, false);
                if (intersects.length > 0) {
                    if (e.deltaY > 0) {
                        if (intersects[0].object.type == 'CUBIC') { 
                            for (var i = 0; i < intersects[0].object.material.length; i++) {
                                intersects[0].object.material[i].opacity -= 0.05;
                                if (intersects[0].object.material[i].opacity < 0) {
                                    intersects[0].object.material[i].opacity = 0
                                }
                            }
                        }
                        else {
                            intersects[0].object.material.opacity -= 0.05;
                            if (intersects[0].object.material.opacity < 0) {
                                intersects[0].object.material.opacity = 0
                            }
                        }

                    }
                    else {

                        if (intersects[0].object.type == 'CUBIC') { 
                            for (var i = 0; i < intersects[0].object.material.length; i++) {
                                intersects[0].object.material[i].opacity += 0.05;
                                if (intersects[0].object.material[i].opacity > 1) {
                                    intersects[0].object.material[i].opacity = 1
                                }
                            }

                        }
                        else {
                            intersects[0].object.material.opacity += 0.05;
                            if (intersects[0].object.material.opacity > 1) {
                                intersects[0].object.material.opacity = 1
                            }

                        }

                    }
                }
            }

        }
    }, false);

    container.addEventListener('mousedown', function (e) {
        var rect = container.getBoundingClientRect();

        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(panoramas, false); 


        console.log(intersects);
        if (intersects.length > 0) { 

            if (!enabledPanorama) {

                intersects[0].object.geometry = new THREE.SphereGeometry(0.1, 64, 64);
                var texture = new THREE.TextureLoader().load(intersects[0].object.image360_path);

                /*var offset = - 28 / 180;

                texture.offset.set(0, offset);*/
                //texture.repeat.set(1,1.3);

                texture.wrapS = THREE.RepeatWrapping;
                texture.repeat.x = - 1;

                intersects[0].object.material.map = texture;
                intersects[0].object.material.opacity = 1;

                // console.log(intersects[0].object.image360_path);

                viewer.filterPointSourceIDRange = [intersects[0].object.num_panorama, intersects[0].object.num_panorama];

                viewer.setFOV(60);
                viewer.scene.view.position.set(intersects[0].object.position.x, intersects[0].object.position.y, intersects[0].object.position.z);
                viewer.setControls(viewer.orbitControls);
                currentImage360 = intersects[0].object.uuid;
                enabledPanorama = true;
                controls.enabledPanorama = true;

                intersects[0].object.material.color = '';
                intersects[0].object.material.needsUpdate = true;
            }
        }
        if (intersects.length > 2) {
            if (enabledPanorama) {


                intersects[0].object.geometry = new THREE.SphereGeometry(0.1, 64, 64);
                intersects[0].object.material = new THREE.MeshBasicMaterial({
                    map: "",
                    color: 0x299fed,
                    transparent: true,
                    opacity: .5,
                    side: THREE.DoubleSide,
                    depthTest: false
                });
                intersects[0].object.material.needsUpdate = true;

                intersects[1].object.geometry = new THREE.SphereGeometry(0.1, 64, 64);
                var texture = new THREE.TextureLoader().load(intersects[1].object.image360_path);

                /*var offset = - 28 / 180;

                texture.offset.set(0, offset);*/
                //texture.repeat.set(1,1.3);

                texture.wrapS = THREE.RepeatWrapping;
                texture.repeat.x = - 1;

                intersects[1].object.material.map = texture;
                intersects[1].object.material.opacity = 1;

                viewer.filterPointSourceIDRange = [intersects[1].object.num_panorama, intersects[1].object.num_panorama];

                viewer.setFOV(60);
                viewer.scene.view.position.set(intersects[1].object.position.x, intersects[1].object.position.y, intersects[1].object.position.z);
                viewer.setControls(viewer.orbitControls);
                currentImage360 = intersects[1].object.uuid;
                enabledPanorama = true;
                controls.enabledPanorama = true;

                intersects[1].object.material.color = '';
                intersects[1].object.material.needsUpdate = true;

                viewer.setFOV(60);
                viewer.scene.view.position.set(intersects[1].object.position.x, intersects[1].object.position.y, intersects[1].object.position.z);
                currentImage360 = intersects[1].object.uuid;
            }
        }
    }, false);


    window.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 27:
                if (enabledPanorama) {
                    viewer.filterPointSourceIDRange = [0, 65535];
                    currentImage360 = 0;
                    raycaster.setFromCamera(mouse, camera);
                    var intersects = raycaster.intersectObjects(panoramas); 
                    if (intersects.length > 0) {

                        intersects[0].object.geometry = new THREE.SphereGeometry(0.1, 64, 64);
                        intersects[0].object.material = new THREE.MeshBasicMaterial({
                            map: "",
                            color: 0x299fed,
                            transparent: true,
                            opacity: .5,
                            side: THREE.DoubleSide,
                            depthTest: false
                        }); 
                        intersects[0].object.material.needsUpdate = true;
                    }

                    enabledPanorama = false
                    controls.enabledPanorama = false;
                    viewer.setFOV(60);
                }
                break;
        }
    });

    var assembled = true;

    //CREATION OF IMAGES360 SPHERES (Hard values)
    var geometry_1 = new THREE.SphereBufferGeometry(0.1, 64, 64);
    var material_1 = new THREE.MeshBasicMaterial({
        map: "",
        color: 0x299fed,
        transparent: true,
        opacity: .5,
        side: THREE.DoubleSide,
        depthTest: false,
        needsUpdate: true
    });

    var sphere_1 = new THREE.Mesh(geometry_1, material_1);
    sphere_1.position.set(
        3.467665433883667,
        -1.8091012239456177,
        -0.8973892331123352
    );

    var q = new THREE.Quaternion().set(
        0.0028532735612865345,
        0.0003212657365512177,
        0.6617282283297861,
        0.749738292639394
    );

    //apply quaternion:
    sphere_1.quaternion.copy(q);

    // fix rotation:
    sphere_1.rotateX(Math.PI / 2);
    //sphere_1.rotateY(Math.PI/2);

    // change scale for test:

    sphere_1.type = 'XML_E57';
    sphere_1.image360_path = './assets/img/image3d-0.jpg';

    viewer.scene.scene.add(sphere_1);

    sphere_1.num_panorama = 1;

    sphere_1.assembled = assembled;
    panoramas.push(sphere_1);



    var geometry_2 = new THREE.SphereBufferGeometry(0.1, 64, 64);
    var material_2 = new THREE.MeshBasicMaterial({
        map: "",
        color: 0x299fed,
        transparent: true,
        opacity: .5,
        side: THREE.DoubleSide,
        depthTest: false,
        needsUpdate: true
    });

    var sphere_2 = new THREE.Mesh(geometry_2, material_2);
    sphere_2.position.set(
        2.569656888259754,
        -1.6921059434327848,
        -0.8898963237496307
    );

    var q = new THREE.Quaternion().set(
        0.0026623038773207746,
        -0.0007230004573720583,
        0.9123172394800277,
        0.40947483922207645
    );

    //apply quaternion:
    sphere_2.quaternion.copy(q);

    // fix rotation:
    sphere_2.rotateX(Math.PI / 2);
    //sphere_2.rotateY(Math.PI/2);

    // change scale for test:

    sphere_2.type = 'XML_E57';
    sphere_2.image360_path = './assets/img/image3d-1.jpg';

    viewer.scene.scene.add(sphere_2);

    sphere_2.num_panorama = 2;

    sphere_2.assembled = assembled;
    panoramas.push(sphere_2);


    var geometry_3 = new THREE.SphereBufferGeometry(0.1, 64, 64);
    var material_3 = new THREE.MeshBasicMaterial({
        map: "",
        color: 0x299fed,
        transparent: true,
        opacity: .5,
        side: THREE.DoubleSide,
        depthTest: false,
        needsUpdate: true
    });

    var sphere_3 = new THREE.Mesh(geometry_3, material_3);
    sphere_3.position.set(
        3.035545941505506,
        -1.6098312703012336,
        -0.9200451536244805
    );

    var q = new THREE.Quaternion().set(
        -0.005532127626852849,
        0.021334123700273735,
        0.9829453560184845,
        0.18257239060590794
    );

    //apply quaternion:
    sphere_3.quaternion.copy(q);

    // fix rotation:
    sphere_3.rotateX(Math.PI / 2);
    //sphere_3.rotateY(Math.PI/2);

    // change scale for test:

    sphere_3.type = 'XML_E57';
    sphere_3.image360_path = './assets/img/image3d-2.jpg';

    viewer.scene.scene.add(sphere_3);

    sphere_3.num_panorama = 3;

    sphere_3.assembled = assembled;
    panoramas.push(sphere_3);

    var geometry_4 = new THREE.SphereBufferGeometry(0.1, 64, 64);
    var material_4 = new THREE.MeshBasicMaterial({
        map: "",
        color: 0x299fed,
        transparent: true,
        opacity: .5,
        side: THREE.DoubleSide,
        depthTest: false,
        needsUpdate: true
    });

    var sphere_4 = new THREE.Mesh(geometry_4, material_4);
    sphere_4.position.set(
        2.889608031091997,
        -2.460854883068187,
        -0.8187139056566299
    );

    var q = new THREE.Quaternion().set(
        -0.032755073519649146,
        0.05573455083512741,
        0.29195534445743904,
        -0.9542446446507662
    );

    //apply quaternion:
    sphere_4.quaternion.copy(q);

    // fix rotation:
    sphere_4.rotateX(Math.PI / 2);
    //sphere_3.rotateY(Math.PI/2);

    // change scale for test:

    sphere_4.type = 'XML_E57';
    sphere_4.image360_path = './assets/img/image3d-3.jpg';

    // viewer.scene.scene.add(sphere_4);

    sphere_4.num_panorama = 4;

    sphere_4.assembled = assembled;
    // panoramas.push(sphere_4);

})