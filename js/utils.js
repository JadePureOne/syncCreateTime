const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const { exec } = require('child_process');


/**
 * @description 获取文件的创建时间
 * @param {string} filePath 文件路径+文件名
 * @returns {Date} 文件的创建时间
 */
const getBirthTime = (filePath) => {
	const imagePath = path.join(filePath);
	fs.stat(imagePath, (err, stats) => {
		if (err) {
			console.error('读取文件信息时出错:', err);
			return;
		}
		console.log('创建时间: ' + stats.birthtime,typeof stats.birthtime);
		return stats.birthtime;
	});
};



/**
 * 更新文件的时间戳。
 *
 * @param {string} imagePath - 图片文件的完整路径。
 * @param {string} newCreationTime - 新的创建时间，格式为 'YYYY:MM:DD HH:MM:SS'。
 * @param {string} pythonScript - Python 脚本的完整路径。
 */
function updateFileTimestamps(imagePath, newCreationTime) {

	const pythonScript = path.join(__dirname,'js', 'modify.py');

	exec(`python "${pythonScript}" "${imagePath}" "${newCreationTime}"`, (error, stdout, stderr) => {
			if (error) {
					console.error(`Error: ${error.message}`);
					return;
			}
			if (stderr) {
					console.error(`Stderr: ${stderr}`);
					return;
			}
			console.log(`Output: ${stdout}`);
	});
}

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // 移除所有按钮的 active 类
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // 隐藏所有标签内容
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // 添加 active 类到当前按钮
        button.classList.add('active');

        // 显示对应的标签内容
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});
