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
        "1.jpg",
        "2 (1).jpg",
        "2 (2).jpg",
        "2 (3).jpg",
        "2.jpg",
        "3 (1).jpg",
        "3 (2).jpg",
        "3 (3).jpg",
        "3.jpg",
        "4 (1).jpg",
        "4 (2).jpg",
        "4 (3).jpg",
        "4 (4).jpg",
        "4 (5).jpg",
        "4 (6).jpg",
        "4 (7).jpg",
        "5 (1).jpg",
        "5 (2).jpg",
        "5 (3).jpg",
        "6 (1).jpg",
        "6 (2).jpg",
        "6 (3).jpg",
        "6 (4).jpg",
        "6 (5).jpg",
        "6 (6).jpg"
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

module.exports = {
    projectImages,
    getProjectImages
};
