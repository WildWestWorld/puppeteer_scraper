from collections import Counter
from wordcloud import WordCloud
import itertools
import jieba
import jieba.posseg
import json
import paddle
import os
from six.moves import urllib

import sys

paddle.enable_static()

# open("stopwords_cn.txt", encoding="utf-8")打开txt文件，编码方式是utf-8
# read()从打开的txt文件中读取数据
# splitlines() 若是里面有/n 换行之类的转义符都会实现功能，若是splitlines()里面有个true里面的转义符就只是字符，不会有任何功能
# set() 函数创建一个无序不重复元素集，可进行关系测试，删除重复数据，还可以计算交集、差集、并集等。
stopwords = set(open("stopwords_cn.txt", encoding="utf-8").read().splitlines())

# jieba就是个分词器
# 开启paddle模式
jieba.enable_paddle()

# json.load()：用于读取json文件
data = json.load(open("data.json", encoding="utf-8"))


# for res in data:
#     print(res['videoTitle'])
#     print(res['imgURL'])


def download_and_extract(filepath, save_dir):
    """根据给定的URL地址下载文件
    Parameter:
        filepath: list 文件的URL路径地址
        save_dir: str  保存路径
    Return:
        None
    """
    for url, index in zip(filepath, range(len(filepath))):
        filename = url.split('/')[-1]
        save_path = os.path.join(save_dir, filename)
        #核心下载代码
        urllib.request.urlretrieve(url, save_path)
        sys.stdout.write('\r>> Downloading %.1f%%' % (float(index + 1) / float(len(filepath)) * 100.0))
        sys.stdout.flush()
    print('\nSuccessfully downloaded')


def _get_file_urls(json_file):


    filepath = []
    # json.load()：用于读取json文件
    data = json.load(open(json_file, encoding="utf-8"))
    for res in data:

        imgURL = res['imgURL'];
        if (imgURL):
            print(imgURL[0])
            filepath.append(imgURL);

    return filepath


if __name__ == '__main__':
    jsonFile = "data.json"
    save_dir = 'save_dir/'
    filepath = _get_file_urls(jsonFile)
    download_and_extract(filepath, save_dir)

# # Extract all words
# words = [word for title in data for word, _ in jieba.posseg.cut(title)]
#
# # Filter out stop words
# words = filter(lambda x: x not in stopwords, words)
#
# # Filter out words with length <= 1
# words = filter(lambda x: len(x) > 1, words)
#
# # Select top 100 words based on their occurrence
# counter = Counter(list(words))
# most_common_words = counter.most_common(100)
# print(most_common_words)
#
#
# wordcloud = WordCloud(
#     font_path="SourceHanSerifSC-Medium", width=1920, height=1080, colormap="Blues",
# ).generate_from_frequencies(dict(most_common_words))
#
# im = wordcloud.to_image()
# im.save("word-cloud.png")
