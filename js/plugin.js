// const dateRegex = /(\d{4})(\d{2})(\d{2})/;
const dateRegex = /(\d{4})(\d{2})(\d{2})|(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/;

let imgList = []


eagle.onPluginCreate(async (plugin) => {

	document.querySelector('#message').innerHTML = `
	<div class="tabs">
        <button class="tab-button active" data-tab="tab1">自定义日期</button>
        <button class="tab-button" data-tab="tab2">正则匹配</button>
				<button class="tab-button" data-tab="tab3">Auto</button>

    </div>

    <div class="tab-content">
        <div class="tab active" id="tab1">				
					
				</div>
        <div class="tab" id="tab2">
					<form>
						<ul>
							<li>
								<label for="regex">正则表达式:</label>
								<input type="text" id="regex" name="regex" />
							</li>			
						</ul>						
						<button type="button" id="search">替换</button>
					</form>
				</div>
				<div class="tab" id="tab3">				
					自动识别，使用内置正则
				</div>
	</div>
	`;

	// 使用示例
	const imagePath = path.join('G:', 'OneDrive', 'BlueAssets.library', 'images', 'M3JUL06YKDRWB.info', '[2024-06-12-12-01-49]今日。4.jpg');
	const newCreationTime = '2012:01:01 12:00:00';
	document.querySelector('#search').addEventListener('click', function() {
    // 获取输入框的值
    const regexValue = document.querySelector('#regex').value;
    console.log(regexValue); 		
		updateFileTimestamps(imagePath, newCreationTime);
	});

	//tab切换
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

	/**
	 * 映射选中图片
	 */
	let selected = await eagle.item.getSelected();
	imgList = selected.map(item => {
    const { filePath, name } = item;    

    const match = name.match(dateRegex);
    let date;

    if (match) {
        if (match[1]) { // If matching YYYYMMDD format
            const year = match[1];
            const month = match[2];
            const day = match[3];
            date = dayjs(`${year}-${month}-${day}`); // Create dayjs object
            console.log(`Date: ${date.format('YYYY-MM-DD')}`);
        } else { // If matching YYYY-MM-DD-HH-MM-SS format
            const year = match[4];
            const month = match[5];
            const day = match[6];
            const hour = match[7];
            const minute = match[8];
            const second = match[9];
      date = dayjs(`${year}-${month}-${day} ${hour}:${minute}:${second}`); // Create dayjs object
      console.log(`Date: ${date.format('YYYY-MM-DD HH:mm:ss')}`);
      }
    } else {
        console.log("No date found.");
    }

    return { filePath, date: date ? date.format() : null }; 
	});

	console.log("map", imgList);
});
