/**
 * 项目图片清单
 * 由 generateImgList.js 自动生成
 */

const projectImages = {
    "1": [
        "1_1.jpg",
        "1_2.jpg",
        "2_2.jpg",
        "3_3.jpg",
        "4_3.jpg",
        "5_3.jpg",
        "6_2.png",
        "7_2.png",
        "8_1.png",
        "9_3.jpg",
        "10_3.jpg",
        "11_3.jpg",
        "12_3.jpg",
        "13_3.jpg",
        "14_3.jpg",
        "15_2.jpg",
        "16_2.jpg"
    ],
    "2": [
        "1_2.jpg",
        "2_2.jpg",
        "3_1.jpg",
        "4_3.jpg",
        "5_3.jpg",
        "6_3.jpg",
        "7_3.jpg",
        "8_3.jpg",
        "9_3.jpg",
        "10_2.jpg",
        "11_2.jpg",
        "12_2.jpg",
        "13_2.jpg",
        "14_2.jpg",
        "15_2.jpg",
        "16_1.jpg",
        "17_1.jpg",
        "18_1.jpg",
        "19_2.jpg",
        "20_2.jpg",
        "21_2.jpg",
        "22_2.jpg",
        "23_1.jpg",
        "24_1.jpg"
    ],
    "3": [
        "1 (1).jpg",
        "1 (2).jpg",
        "1 (3).jpg",
        "2 (1).jpg",
        "2 (2).jpg",
        "2 (3).jpg",
        "2 (4).jpg",
        "3 (1).jpg",
        "3 (2).jpg",
        "3 (3).jpg",
        "3 (4).jpg",
        "3 (5).jpg",
        "4 (1).jpg",
        "4 (2).jpg",
        "4 (3).jpg",
        "5 (1).png",
        "5 (2).png",
        "5 (3).png",
        "5 (4).png"
    ],
    "4": [],
    "5": [],
    "6": [
        "1_2.jpg",
        "2_2.jpg",
        "3_3 .jpg",
        "4_3.jpg",
        "5_3.jpg",
        "6_3.jpg",
        "7_3.jpg",
        "8_3.jpg",
        "9_3.jpg",
        "10_3.jpg",
        "12_3.jpg",
        "13_3.jpg",
        "14_3.jpg",
        "15_3.jpg"
    ],
    "7": [
        "1_1.jpg",
        "2_1.jpg",
        "3_1.jpg",
        "4_1.jpg",
        "5_1.jpg",
        "6_1.jpg",
        "7_1.jpg",
        "8_1.jpg"
    ],
    "8": [
        "1_1.jpg",
        "2_1.jpg",
        "3_1.jpg",
        "4_1.jpg",
        "5_1.jpg",
        "6_1.jpg",
        "7_1.jpg",
        "8_1.jpg"
    ],
    "9": [
        "1_1.jpg",
        "2_1.jpg",
        "3_1.jpg",
        "4_1.jpg",
        "5_1.jpg",
        "6_1.jpg",
        "7_1.jpg",
        "8_1.jpg"
    ],
    "10": [
        "1_1.jpg",
        "2_1.jpg",
        "3_1.jpg",
        "4_1.jpg",
        "5_1.jpg",
        "6_1.jpg",
        "7_1.jpg",
        "8_1.jpg"
    ],
    "11": [
        "1_1.jpg",
        "2_1.jpg",
        "3_1.jpg",
        "4_1.jpg",
        "5_1.jpg",
        "6_1.jpg",
        "7_1.jpg",
        "8_1.jpg"
    ],
    "12": [
        "1_1.jpg",
        "2_1.jpg",
        "3_1.jpg",
        "4_1.jpg",
        "5_1.jpg",
        "6_1.jpg",
        "7_1.jpg",
        "8_1.jpg"
    ],
    "13": [
        "1_1.jpg",
        "2_1.jpg",
        "3_1.jpg",
        "4_1.jpg",
        "5_1.jpg",
        "6_1.jpg",
        "7_1.jpg",
        "8_1.jpg"
    ],
    "14": [
        "1_1.jpg",
        "2_1.jpg",
        "3_1.jpg",
        "4_1.jpg",
        "5_1.jpg",
        "6_1.jpg",
        "7_1.jpg",
        "8_1.jpg"
    ],
    "15": [
        "1_1.jpg",
        "2_1.jpg",
        "3_1.jpg",
        "4_1.jpg",
        "5_1.jpg",
        "6_1.jpg",
        "7_1.jpg",
        "8_1.jpg"
    ],
    "16": [
        "1_1.jpg",
        "2_1.jpg",
        "3_1.jpg",
        "4_1.jpg",
        "5_1.jpg",
        "6_1.jpg",
        "7_1.jpg",
        "8_1.jpg"
    ]
};

/**
 * 获取项目的图片清单
 * @param {number} projectId 项目ID
 * @returns {string[]} 图片文件名数组
 */
function getProjectImages(projectId) {
    return projectImages[projectId] || [];
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        projectImages,
        getProjectImages
    };
}
