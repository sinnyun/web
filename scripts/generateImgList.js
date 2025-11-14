const fs = require('fs');
const path = require('path');

// 配置
const IMG_DIR = path.join(__dirname, '../images');
const OUTPUT_FILE = path.join(__dirname, '../js/imglist.js');

// 获取所有项目图片
function generateImageList() {
    const projects = {};
    
    // 读取img目录下的所有项目文件夹
    const projectDirs = fs.readdirSync(IMG_DIR)
        .filter(dir => dir.startsWith('project') && fs.statSync(path.join(IMG_DIR, dir)).isDirectory());
    
    // 处理每个项目文件夹
    projectDirs.forEach(dir => {
        const projectId = parseInt(dir.replace('project', ''));
        const projectDir = path.join(IMG_DIR, dir);
        
        // 获取项目文件夹中的所有图片文件
        const imageFiles = fs.readdirSync(projectDir)
            .filter(file => {
                // 排除非图片文件和banner图片
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png'].includes(ext) && 
                       !file.includes('banner') &&
                       !file.includes('work.txt') &&
                       file !== '0.jpg';  // 明确排除0.jpg
            })
            .sort((a, b) => {
                // 按数字顺序排序 (1_1.jpg, 2_2.jpg等)
                const numA = parseInt(a.split('_')[0]) || 0;
                const numB = parseInt(b.split('_')[0]) || 0;
                return numA - numB;
            });
        
        projects[projectId] = imageFiles;
    });
    
    return projects;
}

// 生成imglist.js文件内容
function generateOutputContent(projects) {
    let content = `/**
 * 项目图片清单
 * 由 generateImgList.js 自动生成
 */

const projectImages = ${JSON.stringify(projects, null, 4)};

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
`;
    return content;
}

// 主函数
function main() {
    try {
        const projects = generateImageList();
        const outputContent = generateOutputContent(projects);
        
        fs.writeFileSync(OUTPUT_FILE, outputContent);
        console.log(`成功生成图片清单文件: ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('生成图片清单时出错:', error);
    }
}

main();