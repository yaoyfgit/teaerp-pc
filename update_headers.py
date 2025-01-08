import os

def update_html_headers():
    # 获取当前脚本所在目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 读取公共header内容
    header_path = os.path.join(current_dir, 'teaerp', 'common', 'header.html')
    with open(header_path, 'r', encoding='utf-8') as f:
        header_content = f.read()
    
    # 遍历所有HTML文件
    pages_dir = os.path.join(current_dir, 'teaerp', 'pages')
    for root, dirs, files in os.walk(pages_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                
                try:
                    # 读取原文件内容
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # 替换header部分
                    if '<body>' in content:
                        new_content = content.replace(
                            content.split('<body>')[0],
                            header_content
                        )
                        
                        # 写回文件
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        
                        print(f'Updated: {file_path}')
                    else:
                        print(f'Skipped (no <body> tag): {file_path}')
                        
                except Exception as e:
                    print(f'Error processing {file_path}: {str(e)}')

if __name__ == '__main__':
    update_html_headers() 