import * as THREE from "three";

import ThreeHelper from "./src/ThreeHelper.js";
import MaterialHelper from "./src/MaterialHelper.js";
import { TEXTURE_TYPES } from "./src/materials.js";
import DOMControls from "./src/DOMControls.js";

class Main {
    /** @type {THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>} */
    selectedModel;

    constructor() {
        ThreeHelper.init();
        MaterialHelper.loadMaterials();
        DOMControls._initMaterialChoices();

        ThreeHelper.onSceneLoaded = () => {
            DOMControls._initDatGui();
        };

        ThreeHelper.onIntersect = this._handleModelHover.bind(this);

        ThreeHelper.onIntersectClicked = this._handleModelSelected.bind(this);

        DOMControls.onMaterialClicked = this._handleMaterialClicked.bind(this);
    }

    _handleModelHover(intersect, prevIntersect) {
        console.log("Pointer intersected", intersect, prevIntersect);

        if (intersect) {
            intersect.object.material.opacity = 0.7;
            document.body.classList.add("cursor");
        } else {
            document.body.classList.remove("cursor");
        }

        if (prevIntersect) {
            if (prevIntersect.object !== this.selectedModel) {
                prevIntersect.object.material.opacity = 1;
            }
        }
    }

    _handleModelSelected(model) {
        console.log("Selected model", model, this);

        if (this.selectedModel) {
            this.selectedModel.material.opacity = 1;
        }

        this.selectedModel = model.object;
        document.body.classList.add("model-selected");

        DOMControls.selectedMaterial.name = this.selectedModel.name;
        DOMControls.selectedMaterial.selectedTexture =
            this.selectedModel.material.name;
    }

    _handleMaterialClicked(materialName) {
        console.log(materialName);

        console.log(this);

        if (this.selectedModel) {
            this.selectedModel.material =
                MaterialHelper.materials[materialName].clone();

            DOMControls.selectedMaterial.selectedTexture =
                this.selectedModel.material.name;
        }
    }
}

export default new Main();
