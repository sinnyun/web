import os
import shutil

def merge_images(source_folder, target_folder):
    """
    合并子文件夹中的图片到目标文件夹，并添加父文件夹前缀
    """
    try:
        if not os.path.exists(target_folder):
            os.makedirs(target_folder)
        
        file_count = 0
        for root, dirs, files in os.walk(source_folder):
            for file in files:
                if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                    parent_folder = os.path.basename(root)
                    new_name = f"{parent_folder}_{file}"
                    src_path = os.path.join(root, file)
                    dst_path = os.path.join(target_folder, new_name)
                    
                    # 打印完整路径用于调试
                    print(f"Processing: {src_path}")
                    
                    shutil.copy2(src_path, dst_path)
                    print(f"Copied: {src_path} -> {dst_path}")
                    file_count += 1
        
        print(f"成功合并 {file_count} 个文件到 {target_folder}")
        return True
    except Exception as e:
        print(f"错误发生: {str(e)}")
        return False

if __name__ == "__main__":
    # 合并3d文件夹
    success_3d = merge_images(
        os.path.join("f:\\", "个人项目", "web-wind", "img", "3d"),
        os.path.join("f:\\", "个人项目", "web-wind", "img", "3d_merged")
    )
    
    # 合并pr文件夹
    success_pr = merge_images(
        os.path.join("f:\\", "个人项目", "web-wind", "img", "pr"),
        os.path.join("f:\\", "个人项目", "web-wind", "img", "pr_merged")
    )
    
    if success_3d and success_pr:
        print("所有图片合并完成！")
    else:
        print("部分图片合并失败，请查看上方错误信息")