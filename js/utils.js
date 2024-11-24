const fs = require('fs');
const path = require('path');

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

// 导出函数
module.exports = {
  getBirthTime,
};