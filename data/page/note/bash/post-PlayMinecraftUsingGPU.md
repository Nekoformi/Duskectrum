---
title: Play Minecraft Using GPU
date: 2024/02
author: Nekoformi
---

# Play Minecraft Using GPU

LinuxでもMinecraftをプレイすることができます！

1. [Minecraftの公式サイト](https://www.minecraft.net/en-us/download)から`Minecraft.deb`をダウンロードします。
2. ファイルを実行するか、ターミナルで`sudo apt install ~/Download/Minecraft.deb`を実行してパッケージをインストールします。
3. アプリケーションを実行するか、ターミナルで`minecraft-launcher`を実行してMinecraftを起動します。
4. プレイ！

しかし、この状態で起動したMinecraftはCPUを使用します。

![?width=640&height=360](/post/note/bash/post-PlayMinecraftUsingGPU/0001.png '')

GPUを使用するためには、幾つかの操作が必要になります。今回は、以下の環境で実現する方法を紹介します。

| 項目 | 情報 |
| --- | --- |
| CPU | Intel® Core™ i9-11900H |
| GPU | NVIDIA® GeForce RTX™ 3050 Ti |
| RAM | 16 GB |
| OPS | Ubuntu Studio 22.04 |

1. [CUDA Toolkit Downloads](https://developer.nvidia.com/cuda-downloads)から環境に適合した方法でドライバーをインストールします。

```sh:Bash
$ wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
$ sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
$ wget https://developer.download.nvidia.com/compute/cuda/12.3.2/local_installers/cuda-repo-ubuntu2204-12-3-local_12.3.2-545.23.08-1_amd64.deb
$ sudo dpkg -i cuda-repo-ubuntu2204-12-3-local_12.3.2-545.23.08-1_amd64.deb
$ sudo cp /var/cuda-repo-ubuntu2204-12-3-local/cuda-*-keyring.gpg /usr/share/keyrings/
$ sudo apt-get -y update
$ sudo apt-get -y install cuda-toolkit-12-3
$ sudo apt-get -y install cuda-drivers
$ sudo apt-get -y install nvidia-kernel-open-545
$ sudo apt-get -y install cuda-drivers-545
```

※これは私が2024年02月に使用したコマンドです。

2. `.bashrc`にPATHを追記します。

```sh:Bash
$ echo -e "\nexport PATH=\$PATH:/usr/local/cuda/bin" >> ~/.bashrc
$ echo -e "export LD_LIBRARY_PATH=\$LD_LIBRARY_PATH:/usr/local/cuda/lib64" >> ~/.bashrc
```

※今回は必須ではないですが、後々に使うかもしれないので書いておきましょう。

3. 再起動します。
4. アプリケーションをGPU（dGPU）で起動するためのスクリプトを作成します。ファイルの名前は自由ですが、PATHが通る場所に設置しましょう。

```sh:Bash
$ cd /usr/local/bin
$ sudo touch runGPU
$ sudo chmod 755 runGPU
$ sudo chown $USER runGPU
$ vi runGPU
```

```sh:/usr/local/bin/runGPU
#!/bin/bash

export __NV_PRIME_RENDER_OFFLOAD=1
export __GLX_VENDOR_LIBRARY_NAME=nvidia
export __VK_LAYER_NV_optimus=NVIDIA_only
export VK_ICD_FILENAMES=/usr/share/vulkan/icd.d/nvidia_icd.json

exec "$@"
```

5. ターミナルで`runGPU minecraft-launcher`を実行してMinecraftを起動します。
6. プレイ！

これで、無事にMinecraftをGPUで動かすことができました！

![?width=640&height=360](/post/note/bash/post-PlayMinecraftUsingGPU/0002.png '')
