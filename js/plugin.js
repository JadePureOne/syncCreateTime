const dayjs = require('dayjs');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

// 匹配日期的正则表达式 yyyy-mm-dd-hh-mm-ss
// const dateRegex = /(\d{4})(\d{2})(\d{2})/;
const dateRegex = /(\d{4})(\d{2})(\d{2})|(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/;

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
function updateFileTimestamps(imagePath, newCreationTime, pythonScript) {
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

eagle.onPluginCreate(async (plugin) => {

	document.querySelector('#message').innerHTML = `
	<form>
		<ul>
			<li>
				<label for="regex">正则表达式:</label>
				<input type="text" id="regex" name="regex" />
			</li>			
		</ul>
		
		<button type="button" id="search">搜索</button>
	</form>`;

	let selected = await eagle.item.getSelected();
	for (let item of selected) {
		const { filePath, ext, name} = item;
		// console.log(`文件路径: ${filePath}; 文件扩展名: ${ext}; 文件名: ${name}`);
		const match = name.match(dateRegex);
		// console.log(`match: ${match}`);
		if (match) {
			if (match[1]) { // 如果匹配的是 YYYYMMDD 格式
					const year = match[1];
					const month = match[2];
					const day = match[3];
					const date = dayjs(`${year}-${month}-${day}`); // 创建 dayjs 对象
					console.log(`Date: ${date.format('YYYY-MM-DD')}`);					
			} else { // 如果匹配的是 YYYY-MM-DD-HH-MM-SS 格式
					const year = match[4];
					const month = match[5];
					const day = match[6];
					const hour = match[7];
					const minute = match[8];
					const second = match[9];
					const date = dayjs(`${year}-${month}-${day} ${hour}:${minute}:${second}`); // 创建 dayjs 对象
					console.log(`Date: ${date.format('YYYY-MM-DD HH:mm:ss')}`);			}
		} else {
				console.log("No date found.");
		}	
		
		// 使用示例
		const imagePath = path.join('G:', 'OneDrive', 'BlueAssets.library', 'images', 'M3JUL06YKDRWB.info', '[2024-06-12-12-01-49]今日。4.jpg');
		const newCreationTime = '2018:01:01 12:00:00';
		const pythonScript = path.join('G:', 'OneDrive', 'dev', 'syncCreateTime', 'js', 'modify.py');

		// 调用函数更新文件时间戳
		updateFileTimestamps(imagePath, newCreationTime, pythonScript);
	}
});


// eagle.onPluginRun(() => {
// 	console.log('eagle.onPluginRun');
// });

// eagle.onPluginShow(() => {
// 	console.log('eagle.onPluginShow');
// });

// eagle.onPluginHide(() => {
// 	console.log('eagle.onPluginHide');
// });

// eagle.onPluginBeforeExit((event) => {
// 	console.log('eagle.onPluginBeforeExit');
// });