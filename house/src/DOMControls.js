import * as dat from "dat.gui";

import { MATERIALS, MATERIALS_PATH } from "./materials.js";
import ThreeHelper from "./ThreeHelper.js";
import main from "../main.js";

class DOMControls {
    domMaterialContainer =
        document.getElementsByClassName("material-container")[0];
    domMaterialTemplate =
        this.domMaterialContainer.getElementsByClassName("template")[0];

    selectedMaterial = { name: "No model selected", selectedTexture: "" };

    /**
     *
     * @param {string} material
     */
    onMaterialClicked = (material) => {};

    _initMaterialChoices() {
        for (const MATERIAL of MATERIALS) {
            /**
             * @type {HTMLDivElement}
             */
            const domMaterial = this.domMaterialTemplate.cloneNode(true);
            const domMaterialImg = domMaterial.getElementsByTagName("img")[0];

            domMaterial.classList.remove("template");
            domMaterial.setAttribute("data-material", MATERIAL.name);
            domMaterial.addEventListener("click", () => {
                this.onMaterialClicked(MATERIAL.name);
            });

            domMaterialImg.src = `${MATERIALS_PATH}/${MATERIAL.name}/preview.png`;

            this.domMaterialContainer.append(domMaterial);
        }
    }

    _initDatGui() {
        const wl = ThreeHelper.scene.getObjectByName("WallLeft");
        const wr = ThreeHelper.scene.getObjectByName("WallRight");
        const f = ThreeHelper.scene.getObjectByName("Floor");
        const cabin = ThreeHelper.scene.getObjectByName("Cabin");

        console.log(wl);

        const gui = new dat.GUI({
            // autoPlace: false,
        });
        gui.domElement.id = "dat-gui";

        const modelFolder = gui.addFolder("Info");
        modelFolder.add(this.selectedMaterial, "name").listen();
        modelFolder.add(this.selectedMaterial, "selectedTexture").listen();
        modelFolder.open();
        for (const input of modelFolder.domElement.getElementsByTagName(
            "input"
        )) {
            input.disabled = true;
        }

        const wallFolder = gui.addFolder("Walls");
        wallFolder.add(wl.scale, "x", 0.3, 1).name("WallLeft");
        wallFolder.add(wr.scale, "x", 0.3, 1).name("WallRight");
        wallFolder.add(f.scale, "y", 0.3, 1).name("Floor");
        wallFolder.open();

        const cabinScaleFolder = gui.addFolder("Cabin Size");
        cabinScaleFolder.add(cabin.scale, "x", 1, 2);
        cabinScaleFolder.add(cabin.scale, "y", 1, 2);
        cabinScaleFolder.add(cabin.scale, "z", 1, 2);
        cabinScaleFolder.open();
    }
}

export default new DOMControls();
