# 定义文件路径和文件名
$directoryPath = 'G:\OneDrive\BlueAssets.library\images\M3JUL05MS9JUN.info'
$fileName = '[2020-01-29-18-15-22]库存。36715.jpg'

# 获取文件对象
$file = Get-ChildItem -Path $directoryPath | Where-Object { $_.Name -eq $fileName }

# 检查文件并修改创建时间
if ($file) {
    $file.CreationTime = [datetime]::Parse('2000-01-01T00:00:00.000Z')
    Write-Host "文件创建时间已修改为：$($file.CreationTime)"
} else {
    Write-Host "文件未找到"
}
