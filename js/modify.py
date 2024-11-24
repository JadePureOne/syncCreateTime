import os
import time
from datetime import datetime
import sys

def update_file_timestamps(file_path, new_creation_time):
    timestamp = time.mktime(datetime.strptime(new_creation_time, '%Y:%m:%d %H:%M:%S').timetuple())
    os.utime(file_path, (timestamp, timestamp))
    print('File timestamps updated successfully.')

if __name__ == "__main__":
    # 从命令行参数获取文件路径和新的创建时间
    if len(sys.argv) != 3:
        print("Usage: python modify.py <file_path> <new_creation_time>")
        sys.exit(1)

    file_path = sys.argv[1]
    new_creation_time = sys.argv[2]
    
    update_file_timestamps(file_path, new_creation_time)
