import * as THREE from "three";

export const TEXTURE_TYPES = {
    AmbientOcclusion: "ambientOcclusion",
    BaseColor: "baseColor",
    Height: "height",
    Normal: "normal",
    Opacity: "opacity",
    Roughness: "roughness",
    Metalness: "metallic",
};

export const MATERIALS = [
    {
        name: "Wood_Fence_001",
        textures: [
            TEXTURE_TYPES.BaseColor,
            TEXTURE_TYPES.Normal,
            TEXTURE_TYPES.Opacity,
            TEXTURE_TYPES.Roughness,
            TEXTURE_TYPES.Height,
        ],
        properties: {
            normalScale: new THREE.Vector2(5, 5),
        },
    },
    {
        name: "Stylized_Wood_Siding_001",
        textures: [
            TEXTURE_TYPES.BaseColor,
            TEXTURE_TYPES.Normal,
            TEXTURE_TYPES.Roughness,
            TEXTURE_TYPES.Height,
            TEXTURE_TYPES.Metalness,
        ],
        properties: {
            normalScale: new THREE.Vector2(7, 7),
            roughness: 1.5,
            metalness: 0.2,
        },
    },
    {
        name: "Wood_Wicker_008",
        textures: [
            TEXTURE_TYPES.BaseColor,
            TEXTURE_TYPES.Normal,
            TEXTURE_TYPES.Roughness,
            TEXTURE_TYPES.Height,
        ],
        properties: {
            normalScale: new THREE.Vector2(5, 5),
            roughness: 0.7,
            metalness: 0.4,
        },
        textureProperties: {
            repeat: new THREE.Vector2(2, 2),
        },
    },
    {
        name: "Stone_Wall_013",
        textures: [
            TEXTURE_TYPES.BaseColor,
            TEXTURE_TYPES.Normal,
            TEXTURE_TYPES.Roughness,
            TEXTURE_TYPES.Height,
        ],
        properties: {
            normalScale: new THREE.Vector2(10, 10),
            roughness: 1,
            metalness: 0.2,
        },
    },
    {
        name: "Stone_Wall_012",
        textures: [
            TEXTURE_TYPES.BaseColor,
            TEXTURE_TYPES.Normal,
            TEXTURE_TYPES.Roughness,
            TEXTURE_TYPES.Height,
        ],
        properties: {
            normalScale: new THREE.Vector2(20, 20),
            roughness: 0.7,
            metalness: 0.2,
        },
        textureProperties: {
            repeat: new THREE.Vector2(4, 4),
        },
    },
];

export const MATERIALS_PATH = "./assets/materials";
