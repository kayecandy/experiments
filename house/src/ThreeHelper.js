import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { randomProperty } from "./constants.js";
import MaterialHelper from "./MaterialHelper.js";

class ThreeHelper {
    /**
     * @type {THREE.WebGLRenderer}
     */
    renderer;
    camera;
    /**
     * @type {OrbitControls}
     */
    controls;
    /**
     * @type {THREE.Scene}
     */
    scene;
    /** @type {THREE.Raycaster} */
    raycaster;
    pointer;

    _intersected;

    onSceneLoaded = () => {};
    /**
     *
     * @param {THREE.Intersection<THREE.Mesh> | undefined} intersected
     * @param {THREE.Intersection<THREE.Mesh> | undefined} prevIntersected
     */
    onIntersect = (intersected, prevIntersected) => {};
    /**
     *
     * @param {THREE.Intersection<THREE.Mesh>} clicked
     */
    onIntersectClicked = (clicked) => {};

    init() {
        this._initThree();
        this._initScene();
        this._animate();
    }

    _initThree() {
        /**
         * Init camera
         */
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        /**
         * Init renderer
         */
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.useLegacyLights = false;
        this.renderer.setClearColor(0xffffff);

        window.onresize = (() => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }).bind(this);

        document.body.appendChild(this.renderer.domElement);

        /**
         * Init Scene
         */
        this.scene = new THREE.Scene();

        const bgTexture = new THREE.TextureLoader().load("./assets/bg.jpg");
        bgTexture.mapping = THREE.EquirectangularReflectionMapping;

        // this.scene.environment = bgTexture;

        /**
         * OrbitControls
         */
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        /**
         * Pointer
         */
        window.addEventListener(
            "pointermove",
            ((event) => {
                if (!this.pointer) {
                    this.pointer = new THREE.Vector2();
                }

                this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
                this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
            }).bind(this)
        );

        window.addEventListener(
            "click",
            this._handleIntersectClicked.bind(this)
        );

        /**
         * Raycaster
         */
        this.raycaster = new THREE.Raycaster();

        /**
         * Lights
         */
        const hemiLight = new THREE.AmbientLight(0xffffff, 2);
        // hemiLight.color.setHSL(0.6, 1, 0.6);
        // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        // hemiLight.position.set(0, 8, 0);
        this.scene.add(hemiLight);

        //

        const dirLight = new THREE.DirectionalLight(0xffffff, 2);
        // dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(-1.5, 2.5, 2.5);
        dirLight.position.multiplyScalar(4);
        this.scene.add(dirLight);

        dirLight.castShadow = true;

        const dirLight2 = new THREE.DirectionalLight(0xffffff, 2);
        // dirLight2.color.setHSL(0.1, 1, 0.95);
        dirLight2.position.set(1.5, 2.5, -2.5);
        dirLight2.position.multiplyScalar(4);
        this.scene.add(dirLight2);

        dirLight2.castShadow = true;

        const dirLight3 = new THREE.DirectionalLight(0xffffff, 1);
        // dirLight3.color.setHSL(0.1, 1, 0.95);
        dirLight3.position.set(1.5, -6.5, -2.5);
        dirLight3.position.multiplyScalar(4);
        this.scene.add(dirLight3);

        dirLight3.castShadow = true;

        // GROUND

        const groundGeo = new THREE.PlaneGeometry(10000, 10000);
        const groundMat = new THREE.ShadowMaterial();
        // groundMat.color.setHSL(0.095, 1, 0.75);

        const ground = new THREE.Mesh(groundGeo, groundMat);
        groundMat.opacity = 0.05;
        groundMat.transparent = true;
        ground.name = "Ground";
        ground.position.y = -1.795;
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        // this.scene.add(ground);
    }

    _initScene() {
        const gltfLoader = new GLTFLoader();

        gltfLoader.load("./assets/log-cabin.glb", (gltf) => {
            gltf.scene.name = "Cabin";

            this.scene.add(gltf.scene);

            for (const mesh of gltf.scene.children) {
                mesh.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color(0xcccccc),
                });

                // mesh.material = randomProperty(MaterialHelper.materials);
                mesh.castShadow = true;
                mesh.material.transparent = true;
                // mesh.receiveShadow = true;
            }

            window.scene = this.scene;
            this.onSceneLoaded();
        });
    }

    _animate() {
        requestAnimationFrame(this._animate.bind(this));

        this._handleIntersect();

        this.controls.update();

        if (this.scene) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    _handleIntersect() {
        if (this.scene && this.pointer) {
            this.raycaster.setFromCamera(this.pointer, this.camera);
            const intersects = this.raycaster.intersectObjects(
                this.scene.getObjectByName("Cabin")?.children ?? []
            );

            if (intersects.length) {
                if (this._intersected?.object !== intersects[0].object) {
                    this.onIntersect(intersects[0], this._intersected);

                    this._intersected = intersects[0];
                }
            } else {
                if (this._intersected) {
                    this.onIntersect(undefined, this._intersected);
                    this._intersected = undefined;
                }
            }
        }
    }

    _handleIntersectClicked() {
        if (this._intersected) {
            this.onIntersectClicked(this._intersected);
        }
    }
}

export default new ThreeHelper();
