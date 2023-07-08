import * as THREE from "three";

import { MATERIALS, MATERIALS_PATH, TEXTURE_TYPES } from "./materials.js";

class MaterialHelper {
    materials = {};

    loadMaterials() {
        const textureLoader = new THREE.TextureLoader();

        for (const MATERIAL of MATERIALS) {
            const material = new THREE.MeshStandardMaterial();

            material.transparent = true;
            material.name = MATERIAL.name;

            for (const texture of MATERIAL.textures) {
                const t = textureLoader.load(
                    `${MATERIALS_PATH}/${MATERIAL.name}/${MATERIAL.name}_${texture}.jpg`
                );

                t.wrapS = THREE.RepeatWrapping;
                t.wrapT = THREE.RepeatWrapping;

                for (const [key, value] of Object.entries(
                    MATERIAL?.textureProperties ?? {}
                )) {
                    t[key] = value;
                }

                switch (texture) {
                    case TEXTURE_TYPES.BaseColor:
                        material.map = t;
                        break;
                    case TEXTURE_TYPES.Normal:
                        material.normalMap = t;
                        break;
                    case TEXTURE_TYPES.Roughness:
                        material.roughnessMap = t;
                    case TEXTURE_TYPES.Height:
                        material.bumpMap = t;
                        break;
                    case TEXTURE_TYPES.Metalness:
                        material.metalnessMap = t;
                        break;
                }
            }

            for (const [key, value] of Object.entries(MATERIAL.properties)) {
                material[key] = value;
            }

            this.materials[MATERIAL.name] = material;
        }

        console.log("Materials loaded", this.materials);
    }
}

export default new MaterialHelper();
