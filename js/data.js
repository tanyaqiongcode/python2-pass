/* 本文件由 tools/build_data.py 自动生成，请勿手改；源数据在 data_src/ */
window.BANK = {
 "mcq": [
  {
   "id": "mcq-l6-021",
   "level": 6,
   "topic": "tkinter 控件布局",
   "q": "有如下程序：\nimport tkinter as tk\n\nroot = tk.Tk()\nroot.title('登录')\ntk.Label(root, text='用户名').pack()\ntk.Entry(root).pack()\ntk.Button(root, text='确定').pack()\nroot.mainloop()\n运行后，窗口中控件从上到下的排列顺序是____。",
   "opts": [
    "Button 在最上面，Label 在最下面",
    "Label 与 Entry 左右并排在一行",
    "Label“用户名”、Entry 输入框、Button“确定”自上而下依次排列",
    "三个控件重叠挤在窗口中心"
   ],
   "ans": 2,
   "exp": "pack() 不带参数时默认从窗口顶部开始自上而下依次堆放控件，所以顺序就是创建顺序：标签、输入框、按钮；要左右并排须用 pack(side=...) 设置，本题未设置；控件也不会重叠或颠倒。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-022",
   "level": 6,
   "topic": "Button 的 command 回调",
   "q": "有如下程序：\nimport tkinter as tk\n\ndef hello():\n    print('欢迎')\n\nroot = tk.Tk()\ntk.Button(root, text='点我', command=hello).pack()\nroot.mainloop()\n程序运行后，下列说法正确的是____。",
   "opts": [
    "创建按钮的那一行执行时立即调用 hello 并打印“欢迎”",
    "command=hello 不加括号，是把函数交给按钮保存，点击按钮时才执行并打印“欢迎”",
    "必须写成 command=hello()，否则点击按钮没有任何反应",
    "点击按钮会打印函数对象本身，如 <function hello>"
   ],
   "ans": 1,
   "exp": "command 绑定的是“函数名”（函数对象），不加括号表示“点击时再调用”；写成 command=hello() 会在创建按钮时立即执行一次，点击后反而不响应。点击按钮时才调用 hello，打印“欢迎”。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-023",
   "level": 6,
   "topic": "Entry 取值 get()",
   "q": "有如下程序：\nimport tkinter as tk\n\ndef show():\n    print(e.get())\n\nroot = tk.Tk()\ne = tk.Entry(root)\ne.pack()\ntk.Button(root, text='显示', command=show).pack()\nroot.mainloop()\n运行后在输入框中输入 Python，再点击“显示”按钮，结果是____。",
   "opts": [
    "在控制台打印 Python",
    "在控制台打印空字符串",
    "打印 Entry 控件对象的信息",
    "程序报错，因为定义 show 时变量 e 还不存在"
   ],
   "ans": 0,
   "exp": "Entry 的 get() 方法返回输入框当前的内容。函数定义时函数体不执行，点击按钮调用 show 时全局变量 e 已创建，get() 返回 Python 并打印；定义顺序在前并不影响调用时取值。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-024",
   "level": 6,
   "topic": "mainloop 的作用",
   "q": "关于 tkinter 程序最后的 root.mainloop()，下列说法正确的是____。",
   "opts": [
    "它销毁所有控件并立即结束程序",
    "它只负责把窗口画出来，画完就接着执行下一行代码",
    "它必须在创建任何控件之前调用，否则窗口无法显示",
    "它进入事件监听循环，等待并处理按钮点击、键盘输入等事件；没有它窗口无法持续显示和响应用户操作"
   ],
   "ans": 3,
   "exp": "mainloop() 启动消息循环，程序停在这里不断接收用户事件并触发对应回调；它应放在窗口和控件都创建完成之后调用，一般写在程序最后一行，其后代码通常不会再执行。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-025",
   "level": 6,
   "topic": "openpyxl 修改与保存",
   "q": "有如下程序（score.xlsx 是已存在的工作簿）：\nfrom openpyxl import load_workbook\n\nwb = load_workbook('score.xlsx')\nws = wb.active\nws['B1'] = '总分'\nwb.save('score.xlsx')\n程序执行后，下列说法正确的是____。",
   "opts": [
    "程序报错，load_workbook 不能打开已存在的文件",
    "B1 单元格被写入“总分”，调用 save 后修改被写回 score.xlsx 文件",
    "ws['B1'] = '总分' 只改了内存中的数据，score.xlsx 的文件内容不变",
    "save 会另存为一个新文件，原文件保持不变"
   ],
   "ans": 1,
   "exp": "load_workbook 用于打开已有工作簿；对单元格赋值先修改内存中的工作簿对象，wb.save('score.xlsx') 再把修改写回文件（保存到同名文件即覆盖更新）。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-026",
   "level": 6,
   "topic": "openpyxl cell(row, column)",
   "q": "有如下程序（data.xlsx 中已有数据）：\nfrom openpyxl import load_workbook\n\nwb = load_workbook('data.xlsx')\nws = wb.active\nprint(ws.cell(row=3, column=2).value)\n这条 print 输出的是____。",
   "opts": [
    "工作表的名称（如 Sheet）",
    "第 2 行第 3 列（C2）单元格的值",
    "第 3 行第 2 列（B3）单元格的值",
    "第 3 行第 3 列（C3）单元格的值"
   ],
   "ans": 2,
   "exp": "cell(row=行号, column=列号) 中 row 在前、column 在后，row=3、column=2 即第 3 行第 2 列，也就是 B3 单元格，加 .value 取其值；C2 是第 2 行第 3 列，C3 是第 3 行第 3 列。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-037",
   "level": 7,
   "topic": "matplotlib bar 柱状图",
   "q": "有如下程序：\nimport matplotlib.pyplot as plt\n\nplt.bar(['苹果', '香蕉', '橘子'], [30, 45, 25])\nplt.show()\n运行后显示的图形是____。",
   "opts": [
    "柱状图：横轴是三种水果名称，柱子高度分别对应 30、45、25",
    "折线图：把三个数据点用折线依次连接",
    "饼图：三块扇形分别表示三种水果的占比",
    "散点图：在坐标系中画出三个孤立的点"
   ],
   "ans": 0,
   "exp": "plt.bar() 绘制柱状图，第一个参数是横轴上的类目，第二个参数是对应柱子的高度；plot 画折线图、pie 画饼图、scatter 画散点图。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-038",
   "level": 7,
   "topic": "matplotlib 图例 legend",
   "q": "有如下程序：\nimport matplotlib.pyplot as plt\n\nplt.plot([1, 2, 3], [5, 7, 6], label='北京')\nplt.plot([1, 2, 3], [9, 4, 8], label='上海')\nplt.legend()\nplt.show()\n下列说法正确的是____。",
   "opts": [
    "第二条 plot 会覆盖第一条，图中最终只有一条折线",
    "图例中只显示“北京”，因为 legend() 默认只取第一个 label",
    "legend() 必须传入图例文字参数，否则无法显示图例",
    "图中同时画出两条折线，图例中同时出现“北京”和“上海”两项"
   ],
   "ans": 3,
   "exp": "连续调用 plot 会在同一坐标系中叠加多条线而不是覆盖；每条线的 label 都会被 legend() 自动收集，因此图例同时显示“北京”和“上海”两项；legend() 不带参数即可使用此前设置的 label。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-001",
   "level": 1,
   "topic": "标识符规则",
   "q": "下列选项中，不能作为 Python 变量名的是____。",
   "opts": [
    "_score",
    "my_var",
    "2nd_name",
    "姓名"
   ],
   "ans": 2,
   "exp": "变量名只能由字母、数字和下划线组成，且不能以数字开头。2nd_name 以数字 2 开头，非法；下划线和中文都可以作变量名。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-002",
   "level": 1,
   "topic": "关键字",
   "q": "下列选项中，属于 Python 关键字（保留字）的是____。",
   "opts": [
    "def",
    "printf",
    "function",
    "include"
   ],
   "ans": 0,
   "exp": "def 是定义函数的关键字，不能用作变量名；printf、function、include 都是普通标识符，不是 Python 关键字。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-003",
   "level": 1,
   "topic": "书写格式",
   "q": "下列关于 Python 程序书写格式的说法，正确的是____。",
   "opts": [
    "Python 使用大括号 {} 划分代码块",
    "同一层级的语句缩进必须保持一致",
    "一行内绝对不能写多条语句",
    "注释只能单独占一行"
   ],
   "ans": 1,
   "exp": "Python 靠缩进表示代码块，同一层级缩进不一致会报错。C 错：可用分号在一行写多条语句（不推荐）；D 错：# 注释也可以写在行尾。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-004",
   "level": 1,
   "topic": "编程环境与运行步骤",
   "q": "下列关于 Python 程序编写与运行的说法，错误的是____。",
   "opts": [
    "Python 源程序文件通常以 .py 为扩展名",
    "在 IDLE 中新建文件编写程序后，可按 F5 运行",
    "可以在命令行用 python 文件名.py 的方式运行程序",
    "Python 程序只能在交互式环境中逐行执行，不能整段运行"
   ],
   "ans": 3,
   "exp": "Python 程序既可以交互式逐行执行，也可以保存为 .py 文件整段运行：IDLE 中按 F5（Run Module）或命令行 python 文件名.py。A、B、C 均正确。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-005",
   "level": 1,
   "topic": "input() 函数",
   "q": "执行 `x = input()`，从键盘输入 123，则变量 x 的类型和值是____。",
   "opts": [
    "整型，值为 123",
    "字符串，值为 '123'",
    "浮点型，值为 123.0",
    "列表，值为 ['1', '2', '3']"
   ],
   "ans": 1,
   "exp": "input() 的返回值永远是字符串，输入 123 得到的是 '123'；要参与算术运算需先用 int() 或 eval() 转换。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-006",
   "level": 1,
   "topic": "eval() 与 input() 组合",
   "q": "有如下程序：\nx = eval(input())\nprint(x)\n运行时输入 3+4，则输出结果是____。",
   "opts": [
    "'3+4'",
    "3+4",
    "7",
    "程序报错"
   ],
   "ans": 2,
   "exp": "eval() 把输入的字符串 '3+4' 当作 Python 表达式求值，结果为 7。若不用 eval()，input() 只能返回字符串 '3+4'。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-007",
   "level": 1,
   "topic": "print() 与 sep",
   "q": "`print('a', 'b', 'c', sep='*')` 的输出结果是____。",
   "opts": [
    "a*b*c",
    "abc",
    "a, b, c",
    "a b c"
   ],
   "ans": 0,
   "exp": "sep 参数指定多个输出项之间的分隔符，默认是空格，这里改为 *，故输出 a*b*c。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-008",
   "level": 1,
   "topic": "print() 与 end",
   "q": "有如下程序：\nprint(1, end='')\nprint(2)\nprint(3)\n输出结果是____。",
   "opts": [
    "1、2、3 各占一行输出",
    "123 在一行输出",
    "1 2 3 在一行输出（空格分隔）",
    "12 在一行、3 在一行输出"
   ],
   "ans": 3,
   "exp": "end 默认是换行符，改为 '' 后第一个 print 不换行，1 和 2 连在一行；print(2) 末尾换行，所以 3 单独一行。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-009",
   "level": 1,
   "topic": "整型",
   "q": "下列关于 Python 整型（int）的说法，正确的是____。",
   "opts": [
    "Python 整数的大小不受限制，可以表示任意大的整数",
    "整数的长度不能超过 32 位",
    "3.0 属于整型",
    "整型和浮点型不能混合运算"
   ],
   "ans": 0,
   "exp": "Python 整数采用任意精度，可以表示很大的数。3.0 是浮点型；整型与浮点型可以混合运算，结果为浮点型。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-010",
   "level": 1,
   "topic": "浮点型与误差",
   "q": "`print(0.1 + 0.2 == 0.3)` 的输出结果是____。",
   "opts": [
    "True",
    "False",
    "0.3",
    "程序报错"
   ],
   "ans": 1,
   "exp": "浮点数以二进制存储存在精度误差，0.1 + 0.2 的实际值是 0.30000000000000004，不等于 0.3，故输出 False。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-011",
   "level": 1,
   "topic": "复数",
   "q": "有如下程序：\nz = 3 + 4j\nprint(z.real, z.imag)\n输出结果是____。",
   "opts": [
    "3 4",
    "4.0 3.0",
    "3.0 4.0",
    "程序报错"
   ],
   "ans": 2,
   "exp": "复数以 j 表示虚部，.real 取实部、.imag 取虚部，两个属性的值都是浮点型，输出 3.0 4.0。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-012",
   "level": 1,
   "topic": "字符串不可变性",
   "q": "有如下程序：\ns = 'abc'\ns[0] = 'd'\n运行结果是____。",
   "opts": [
    "s 变为 'dbc'",
    "s 变为 'dabc'",
    "s 变为 'abcd'",
    "程序报错（TypeError）"
   ],
   "ans": 3,
   "exp": "字符串是不可变类型，不能对其中某个字符赋值，执行 s[0]='d' 抛出 TypeError；只能重新赋值整个字符串或用 replace 生成新串。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-013",
   "level": 1,
   "topic": "布尔型",
   "q": "`print(True + True)` 的输出结果是____。",
   "opts": [
    "2",
    "TrueTrue",
    "1",
    "程序报错"
   ],
   "ans": 0,
   "exp": "布尔型是整型的子类，True 相当于 1、False 相当于 0，所以 True+True 参与算术运算结果为 2。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-014",
   "level": 1,
   "topic": "None",
   "q": "下列关于 None 的说法，正确的是____。",
   "opts": [
    "None 与 0 相等",
    "None 表示空值，其类型是 NoneType",
    "None 就是空字符串",
    "变量未赋值时其值自动为 None"
   ],
   "ans": 1,
   "exp": "None 是 NoneType 类型的唯一值，表示空值；None == 0 和 None == '' 都是 False，使用未赋值的变量会报 NameError 而不是得到 None。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-015",
   "level": 1,
   "topic": "链式赋值",
   "q": "有如下程序：\na = b = c = 10\na = 20\nprint(b)\n输出结果是____。",
   "opts": [
    "20",
    "30",
    "10",
    "程序报错"
   ],
   "ans": 2,
   "exp": "链式赋值 a=b=c=10 使三个变量都指向整数 10；对 a 重新赋值只是让 a 指向 20，不影响 b，故输出 10。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-016",
   "level": 1,
   "topic": "多重赋值与交换",
   "q": "有如下程序：\na, b = 3, 5\na, b = b, a\nprint(a, b)\n输出结果是____。",
   "opts": [
    "3 5",
    "3 3",
    "5 5",
    "5 3"
   ],
   "ans": 3,
   "exp": "多重赋值 a, b = b, a 先把右侧按原值组成元组 (5, 3)，再分别赋给 a、b，实现两变量交换，输出 5 3。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-017",
   "level": 1,
   "topic": "多重赋值求值顺序",
   "q": "有如下程序：\na, b = 1, 2\na, b = b, a + b\nprint(a, b)\n输出结果是____。",
   "opts": [
    "2 3",
    "2 2",
    "2 4",
    "1 3"
   ],
   "ans": 0,
   "exp": "多重赋值先整体求右侧：按旧值算出 (b, a+b) 即 (2, 3)，再同时赋给 a、b。误认为 a 先变成 2 再算 a+b 会错选 2 4。",
   "difficulty": 3
  },
  {
   "id": "mcq-l1-018",
   "level": 1,
   "topic": "类型转换 int()",
   "q": "下列语句中，运行时会报错的是____。",
   "opts": [
    "int('12')",
    "int(3.9)",
    "int('3.5')",
    "int(True)"
   ],
   "ans": 2,
   "exp": "int() 直接转换字符串时要求是合法的整数形式，int('3.5') 抛出 ValueError；int(3.9) 截断小数得 3，int(True) 得 1。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-019",
   "level": 1,
   "topic": "类型转换 float()/str()",
   "q": "`print(float('3') + 1, str(3) + '5')` 的输出结果是____。",
   "opts": [
    "4 35",
    "4.0 35",
    "4.0 '35'",
    "程序报错"
   ],
   "ans": 1,
   "exp": "float('3') 得 3.0，加 1 为 4.0；str(3) 得 '3'，与 '5' 拼接为 '35'，print 输出时不带引号，结果为 4.0 35。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-020",
   "level": 1,
   "topic": "eval() 函数",
   "q": "下列关于 eval() 函数的说法，正确的是____。",
   "opts": [
    "eval() 用于把整数转换成字符串",
    "eval() 只能处理整数字符串",
    "eval() 与 int() 的功能完全相同",
    "eval() 把字符串作为 Python 表达式求值并返回结果"
   ],
   "ans": 3,
   "exp": "eval() 去掉字符串引号并按表达式求值，如 eval('3*4') 得 12；它不仅能转数字，还能计算表达式，与 int() 不同。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-021",
   "level": 1,
   "topic": "整除与取余",
   "q": "`print(17 // 5, 17 % 5)` 的输出结果是____。",
   "opts": [
    "3 2",
    "3.4 2",
    "3 3",
    "2 3"
   ],
   "ans": 0,
   "exp": "// 是整除（向下取整），17//5=3；% 是取余数，17%5=2，满足 17 = 5*3 + 2。",
   "difficulty": 1
  },
  {
   "id": "mcq-l1-022",
   "level": 1,
   "topic": "幂运算与优先级",
   "q": "`print(-3 ** 2, (-3) ** 2)` 的输出结果是____。",
   "opts": [
    "9 9",
    "-9 9",
    "-9 -9",
    "9 -9"
   ],
   "ans": 1,
   "exp": "** 的优先级高于负号，-3**2 相当于 -(3**2) 即 -9；加括号后 (-3)**2 是 9 的平方，结果为 9。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-023",
   "level": 1,
   "topic": "and/or 的返回值",
   "q": "`print(3 and 5, 0 or 'x')` 的输出结果是____。",
   "opts": [
    "True True",
    "3 x",
    "5 x",
    "程序报错"
   ],
   "ans": 2,
   "exp": "and/or 的结果是参与运算的值而非布尔值：3 为真，and 返回后一个值 5；0 为假，or 返回第一个为真的值 'x'，输出 5 x。",
   "difficulty": 3
  },
  {
   "id": "mcq-l1-024",
   "level": 1,
   "topic": "not/and/or 优先级",
   "q": "`print(not 2 > 3 and 4 > 5 or 6 > 5)` 的输出结果是____。",
   "opts": [
    "True",
    "False",
    "None",
    "程序报错"
   ],
   "ans": 0,
   "exp": "优先级从高到低为：比较运算、not、and、or。not(2>3)=True，True and (4>5)=False，False or (6>5)=True。",
   "difficulty": 3
  },
  {
   "id": "mcq-l1-025",
   "level": 1,
   "topic": "混合运算自动类型转换",
   "q": "`print(3 / 2, 5 // 2.0)` 的输出结果是____。",
   "opts": [
    "1 2",
    "1 2.0",
    "1.5 2",
    "1.5 2.0"
   ],
   "ans": 3,
   "exp": "/ 的结果总是浮点型，3/2=1.5；// 只要有一个操作数是浮点型，结果就是浮点型，5//2.0=2.0。",
   "difficulty": 2
  },
  {
   "id": "mcq-l1-026",
   "level": 1,
   "topic": "表达式求值",
   "q": "`print(2 + 3 * 4 ** 2 // 5 - 1)` 的输出结果是____。",
   "opts": [
    "9",
    "10",
    "11",
    "16"
   ],
   "ans": 1,
   "exp": "先算 4**2=16，* 与 // 同级从左到右：3*16=48、48//5=9，最后 2+9-1=10。漏掉 -1 会错选 11。",
   "difficulty": 3
  },
  {
   "id": "mcq-l2-001",
   "level": 2,
   "topic": "三种基本结构",
   "q": "Python 程序的三种基本控制结构是____。",
   "opts": [
    "输入结构、处理结构、输出结构",
    "顺序结构、分支结构、循环结构",
    "变量结构、函数结构、类结构",
    "单分支结构、双分支结构、多分支结构"
   ],
   "ans": 1,
   "exp": "任何程序都可由顺序、分支（选择）、循环三种基本结构组合实现；输入/处理/输出是程序的功能步骤，单分支/双分支只是分支的具体形式。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-002",
   "level": 2,
   "topic": "if 语句语法",
   "q": "下列 if 语句中，语法正确的是____。",
   "opts": [
    "if x > 0:\n    print('正数')",
    "if x > 0\n    print('正数')",
    "if (x > 0) print('正数')",
    "if x > 0 then: print('正数')"
   ],
   "ans": 0,
   "exp": "if 条件后必须跟冒号，分支体靠缩进表示；Python 中没有 then 关键字，条件后也不能直接跟语句而不写冒号。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-003",
   "level": 2,
   "topic": "if-elif-else 分支",
   "q": "有如下程序：\nx = 75\nif x >= 90:\n    print('A')\nelif x >= 60:\n    print('B')\nelse:\n    print('C')\n输出结果是____。",
   "opts": [
    "A",
    "C",
    "B",
    "程序报错"
   ],
   "ans": 2,
   "exp": "多分支自上而下判断，75 不满足 x>=90，满足 x>=60，输出 B 后其余分支不再执行；只会输出一个分支。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-004",
   "level": 2,
   "topic": "嵌套 if 与求最大值",
   "q": "有如下程序：\na, b, c = 3, 7, 5\nif a > b:\n    if a > c:\n        print(a)\n    else:\n        print(c)\nelse:\n    if b > c:\n        print(b)\n    else:\n        print(c)\n输出结果是____。",
   "opts": [
    "3",
    "5",
    "7",
    "程序报错"
   ],
   "ans": 2,
   "exp": "a>b 为假进入外层 else，b>c 为真输出 b 即 7。该程序用嵌套分支输出三个数中的最大值。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-005",
   "level": 2,
   "topic": "条件的真值判断",
   "q": "有如下程序：\ns = '0'\nif s:\n    print('yes')\nelse:\n    print('no')\n输出结果是____。",
   "opts": [
    "yes",
    "no",
    "0",
    "程序报错"
   ],
   "ans": 0,
   "exp": "非空字符串作条件时为真，'0' 是长度为 1 的字符串，不是数值 0，输出 yes；空字符串 ''、0、None 作条件时才为假。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-006",
   "level": 2,
   "topic": "while 循环累加",
   "q": "有如下程序：\ni, s = 1, 0\nwhile i <= 10:\n    s = s + i\n    i = i + 2\nprint(s)\n输出结果是____。",
   "opts": [
    "55",
    "30",
    "20",
    "25"
   ],
   "ans": 3,
   "exp": "i 依次取 1、3、5、7、9，累加和为 25，i=11 时不满足条件退出。误认为 1~10 全部累加会错选 55。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-007",
   "level": 2,
   "topic": "while 循环次数",
   "q": "有如下程序：\nn = 100\ncount = 0\nwhile n > 1:\n    n = n // 2\n    count += 1\nprint(count)\n输出结果是____。",
   "opts": [
    "5",
    "6",
    "7",
    "100"
   ],
   "ans": 1,
   "exp": "n 依次变为 50、25、12、6、3、1，共循环 6 次；n 变为 1 时条件 n>1 不再成立。",
   "difficulty": 3
  },
  {
   "id": "mcq-l2-008",
   "level": 2,
   "topic": "无限循环",
   "q": "下列程序段中，循环体会无限执行（死循环）的是____。",
   "opts": [
    "i = 0\nwhile i < 5:\n    i += 1",
    "for i in range(10):\n    print(i)",
    "i = 10\nwhile i > 0:\n    i += 1",
    "n = 5\nwhile n:\n    n -= 1"
   ],
   "ans": 2,
   "exp": "选项 C 中 i 不断增大，条件 i>0 永远成立，构成死循环；A 中 i 增到 5 退出，B 遍历完结束，D 中 n 减到 0 时条件为假退出。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-009",
   "level": 2,
   "topic": "for 与 range()",
   "q": "有如下程序：\nfor i in range(1, 10, 3):\n    print(i, end=' ')\n输出结果是____。",
   "opts": [
    "1 4 7",
    "1 4 7 10",
    "1 3 6 9",
    "3 6 9"
   ],
   "ans": 0,
   "exp": "range(1, 10, 3) 从 1 开始、步长为 3，产生 1、4、7，含头不含尾，不会取到终点 10。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-010",
   "level": 2,
   "topic": "range() 遍历次数",
   "q": "`for i in range(3, 10)` 的循环体共执行____次。",
   "opts": [
    "8 次，i 依次取 3~10",
    "7 次，i 依次取 3~10",
    "6 次，i 依次取 4~9",
    "7 次，i 依次取 3~9"
   ],
   "ans": 3,
   "exp": "range(起, 止) 含头不含尾，产生 3~9 共 10-3=7 个整数，循环 7 次。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-011",
   "level": 2,
   "topic": "for 遍历字符串",
   "q": "有如下程序：\nfor ch in 'abc':\n    print(ch * 2, end='')\n输出结果是____。",
   "opts": [
    "abc",
    "aabbcc",
    "aa bb cc",
    "程序报错"
   ],
   "ans": 1,
   "exp": "逐字符遍历，ch*2 把每个字符重复 2 次得 aa、bb、cc，end='' 使输出连在一行，结果为 aabbcc。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-012",
   "level": 2,
   "topic": "循环嵌套与乘法表",
   "q": "用双层 for 循环打印九九乘法表，内层循环用 print(算式, end='\\t') 输出一行中的多个乘式，每输出完一行后应执行____来实现换行。",
   "opts": [
    "print()",
    "print(end='')",
    "break",
    "continue"
   ],
   "ans": 0,
   "exp": "print() 默认输出换行符，用于一行结束后换行；print(end='') 不换行，break/continue 会改变循环流程而非换行。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-013",
   "level": 2,
   "topic": "循环嵌套与图形打印",
   "q": "有如下程序：\nfor i in range(1, 4):\n    print('*' * i)\n输出结果是____。",
   "opts": [
    "输出一行：******",
    "输出三行：***、**、*",
    "程序报错",
    "输出三行：*、**、***"
   ],
   "ans": 3,
   "exp": "i 依次取 1、2、3，字符串乘法 '*'*i 使每行输出 i 个星号，共三行逐行增加；range(1,4) 不含 4。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-014",
   "level": 2,
   "topic": "嵌套循环与计数器",
   "q": "有如下程序：\ncount = 0\nfor i in range(3):\n    for j in range(4):\n        count += 1\nprint(count)\n输出结果是____。",
   "opts": [
    "3",
    "7",
    "12",
    "4"
   ],
   "ans": 2,
   "exp": "外层执行 3 次、内层每次执行 4 次，计数器共累加 3×4=12 次，输出 12。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-015",
   "level": 2,
   "topic": "break 语句",
   "q": "有如下程序：\nfor i in range(1, 6):\n    if i == 3:\n        break\n    print(i, end=' ')\n输出结果是____。",
   "opts": [
    "1 2 3 4 5",
    "1 2",
    "1 2 4 5",
    "3"
   ],
   "ans": 1,
   "exp": "i 为 3 时执行 break 立即跳出整个循环，3、4、5 都不再输出，只输出 1 2。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-016",
   "level": 2,
   "topic": "continue 语句",
   "q": "有如下程序：\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    print(i, end=' ')\n输出结果是____。",
   "opts": [
    "1 2 3 4 5",
    "1 2",
    "3",
    "1 2 4 5"
   ],
   "ans": 3,
   "exp": "i 为 3 时 continue 跳过本次循环剩余语句，只跳过 3 的输出，循环继续到 5，输出 1 2 4 5。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-017",
   "level": 2,
   "topic": "break 与 continue 区别",
   "q": "关于 break 和 continue，下列说法正确的是____。",
   "opts": [
    "break 跳出并结束整个循环，continue 跳过本次循环剩余语句、进入下一次循环",
    "break 结束本次循环，continue 结束整个循环",
    "break 和 continue 都只能用在 while 循环中",
    "continue 会终止整个程序的执行"
   ],
   "ans": 0,
   "exp": "break 终止整个循环，continue 只结束本次进入下一次；两者都可用于 for 和 while 循环。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-018",
   "level": 2,
   "topic": "for-else 结构",
   "q": "有如下程序：\nfor i in range(3):\n    print(i, end=' ')\nelse:\n    print('end')\n输出结果是____。",
   "opts": [
    "只输出一行：0 1 2",
    "第一行输出 0 1 2，第二行输出 end",
    "只输出 end",
    "程序报错"
   ],
   "ans": 1,
   "exp": "for 循环正常结束（未被 break 打断）时会执行 else 子句，故先输出 0 1 2，再输出 end。",
   "difficulty": 3
  },
  {
   "id": "mcq-l2-019",
   "level": 2,
   "topic": "while True 与 break",
   "q": "有如下程序：\nn = 0\nwhile True:\n    n += 1\n    if n == 3:\n        break\nprint(n)\n输出结果是____。",
   "opts": [
    "2",
    "4",
    "3",
    "程序死循环，无输出"
   ],
   "ans": 2,
   "exp": "while True 条件恒真，需要靠 break 退出：n 增到 3 时执行 break 跳出循环，输出 3。这是“无限循环+break”的典型结构。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-020",
   "level": 2,
   "topic": "try-except 概念",
   "q": "关于 try-except 异常处理语句，下列说法正确的是____。",
   "opts": [
    "try 子句中的代码出现异常时，程序立即终止运行",
    "except 子句必须写在 try 子句之前",
    "try-except 语句只能处理语法错误",
    "try 子句中的代码出现异常时，转去执行 except 子句，程序不会中断"
   ],
   "ans": 3,
   "exp": "try 中出现运行时异常会跳到 except 分支处理，程序继续运行；except 必须写在 try 之后，语法错误无法用 try-except 捕获。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-021",
   "level": 2,
   "topic": "try-except 执行流程",
   "q": "有如下程序：\ntry:\n    x = int('abc')\n    print(x)\nexcept:\n    print('error')\n输出结果是____。",
   "opts": [
    "error",
    "abc",
    "0",
    "程序报错终止"
   ],
   "ans": 0,
   "exp": "int('abc') 抛出 ValueError，try 中剩余语句 print(x) 被跳过，转去执行 except 分支输出 error。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-022",
   "level": 2,
   "topic": "素数判断",
   "q": "有如下程序：\nn = 17\nflag = True\nfor i in range(2, n):\n    if n % i == 0:\n        flag = False\n        break\nprint(flag)\n输出结果是____。",
   "opts": [
    "False",
    "True",
    "17",
    "程序报错"
   ],
   "ans": 1,
   "exp": "17 只能被 1 和它本身整除，2~16 中没有它的因数，flag 保持 True，输出 True，说明 17 是素数。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-023",
   "level": 2,
   "topic": "水仙花数",
   "q": "水仙花数是一个三位数，其各位数字的立方和等于它本身。下列数中，是水仙花数的是____。",
   "opts": [
    "100",
    "135",
    "153",
    "351"
   ],
   "ans": 2,
   "exp": "153 = 1³+5³+3³ = 1+125+27，是水仙花数；100、135、351 各位数字的立方和都不等于自身。",
   "difficulty": 1
  },
  {
   "id": "mcq-l2-024",
   "level": 2,
   "topic": "斐波那契数列",
   "q": "有如下程序：\na, b = 1, 1\nfor i in range(4):\n    a, b = b, a + b\nprint(b)\n输出结果是____。",
   "opts": [
    "3",
    "5",
    "13",
    "8"
   ],
   "ans": 3,
   "exp": "每次迭代 (a, b) 依次变为 (1,2)、(2,3)、(3,5)、(5,8)，输出 8，即斐波那契数列 1,1,2,3,5,8 的第 6 项。",
   "difficulty": 3
  },
  {
   "id": "mcq-l2-025",
   "level": 2,
   "topic": "累乘（阶乘）",
   "q": "有如下程序：\np = 1\nfor i in range(1, 5):\n    p = p * i\nprint(p)\n输出结果是____。",
   "opts": [
    "24",
    "10",
    "120",
    "4"
   ],
   "ans": 0,
   "exp": "循环计算 1×2×3×4=24，即 4 的阶乘。累乘器初值必须是 1；若想算 5! 应写 range(1, 6)，结果是 120。",
   "difficulty": 2
  },
  {
   "id": "mcq-l2-026",
   "level": 2,
   "topic": "最大公约数（辗转相除法）",
   "q": "有如下程序（辗转相除法求最大公约数）：\na, b = 12, 18\nwhile b:\n    a, b = b, a % b\nprint(a)\n输出结果是____。",
   "opts": [
    "2",
    "3",
    "6",
    "36"
   ],
   "ans": 2,
   "exp": "(a, b) 依次变为 (18,12)、(12,6)、(6,0)，b 为 0 时循环结束，a 即最大公约数 6。",
   "difficulty": 3
  },
  {
   "id": "mcq-l3-001",
   "level": 3,
   "topic": "字符串索引",
   "q": "有如下程序：\ns = 'Python'\nprint(s[1], s[-1])\n输出结果是____。",
   "opts": [
    "P n",
    "P o",
    "y n",
    "程序报错"
   ],
   "ans": 2,
   "exp": "索引从 0 开始，s[1] 是第 2 个字符 y；负索引从末尾数起，s[-1] 是最后一个字符 n。",
   "difficulty": 1
  },
  {
   "id": "mcq-l3-002",
   "level": 3,
   "topic": "字符串切片",
   "q": "`s = 'Python'`，则 `s[1:4]` 的值是____。",
   "opts": [
    "'yth'",
    "'Pyt'",
    "'ytho'",
    "'Pyth'"
   ],
   "ans": 0,
   "exp": "切片 s[起:止] 含头不含尾，取下标 1、2、3 的字符 y、t、h，结果为 'yth'。",
   "difficulty": 1
  },
  {
   "id": "mcq-l3-003",
   "level": 3,
   "topic": "切片步长",
   "q": "`print('abcde'[::-1])` 的输出结果是____。",
   "opts": [
    "abcde",
    "edc",
    "a",
    "edcba"
   ],
   "ans": 3,
   "exp": "步长为 -1 表示从右往左逐个取字符，实现字符串反转，输出 edcba。",
   "difficulty": 1
  },
  {
   "id": "mcq-l3-004",
   "level": 3,
   "topic": "find 方法",
   "q": "`print('hello world'.find('o'))` 的输出结果是____。",
   "opts": [
    "7",
    "4",
    "-1",
    "5"
   ],
   "ans": 1,
   "exp": "find 返回子串第一次出现的下标，第一个 o 在下标 4；若找不到返回 -1。第二个 o 在下标 7，但 find 只返回第一次出现的位置。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-005",
   "level": 3,
   "topic": "replace 方法",
   "q": "`print('a-b-c'.replace('-', '+'))` 的输出结果是____。",
   "opts": [
    "a-b-c",
    "a+b-c",
    "a+b+c",
    "['a', 'b', 'c']"
   ],
   "ans": 2,
   "exp": "replace 把字符串中所有 - 替换为 +（不只是第一个），返回新字符串 a+b+c，原字符串不变。",
   "difficulty": 1
  },
  {
   "id": "mcq-l3-006",
   "level": 3,
   "topic": "split 方法",
   "q": "`print('a,b,c'.split(','))` 的输出结果是____。",
   "opts": [
    "['a', 'b', 'c']",
    "'a,b,c'",
    "('a', 'b', 'c')",
    "abc"
   ],
   "ans": 0,
   "exp": "split 按指定分隔符切分字符串，返回列表 ['a', 'b', 'c']，是字符串转列表的常用方法。",
   "difficulty": 1
  },
  {
   "id": "mcq-l3-007",
   "level": 3,
   "topic": "strip 方法",
   "q": "`print('  hi  '.strip() + '!')` 的输出结果是____。",
   "opts": [
    "'  hi  !'",
    "'hi  !'",
    "'  hi!'",
    "hi!"
   ],
   "ans": 3,
   "exp": "strip 去掉字符串首尾两端的空白字符（中间的空格保留），得到 'hi'，再拼接 ! 输出 hi!。",
   "difficulty": 1
  },
  {
   "id": "mcq-l3-008",
   "level": 3,
   "topic": "upper/lower 方法",
   "q": "有如下程序：\ns = 'hello'\ns.upper()\nprint(s)\n输出结果是____。",
   "opts": [
    "HELLO",
    "hello",
    "Hello",
    "程序报错"
   ],
   "ans": 1,
   "exp": "字符串不可变，s.upper() 返回新字符串 'HELLO' 但不改变 s 本身；想生效需写 s = s.upper()。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-009",
   "level": 3,
   "topic": "count 方法",
   "q": "`print('banana'.count('a'))` 的输出结果是____。",
   "opts": [
    "3",
    "2",
    "4",
    "1"
   ],
   "ans": 0,
   "exp": "count 统计子串出现的次数，banana 中有 3 个 a。",
   "difficulty": 1
  },
  {
   "id": "mcq-l3-010",
   "level": 3,
   "topic": "join 方法",
   "q": "`print('-'.join(['2026', '09', '25']))` 的输出结果是____。",
   "opts": [
    "['2026', '09', '25']",
    "20260925",
    "2026-09-25",
    "程序报错"
   ],
   "ans": 2,
   "exp": "join 把列表中各字符串用指定分隔符连接成一个字符串，输出 2026-09-25；join 与 split 互为逆操作，常用于列表与字符串互转。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-011",
   "level": 3,
   "topic": "% 格式化",
   "q": "`print('姓名:%s, 年龄:%d' % ('李明', 18))` 的输出结果是____。",
   "opts": [
    "姓名:%s, 年龄:%d",
    "姓名:18, 年龄:李明",
    "程序报错",
    "姓名:李明, 年龄:18"
   ],
   "ans": 3,
   "exp": "%s 对应字符串、%d 对应整数，右侧元组中的值按顺序填入占位符，输出 姓名:李明, 年龄:18。",
   "difficulty": 1
  },
  {
   "id": "mcq-l3-012",
   "level": 3,
   "topic": "format 方法",
   "q": "`print('{:.2f}'.format(3.14159))` 的输出结果是____。",
   "opts": [
    "3.14",
    "3.1416",
    "3.1",
    "3.15"
   ],
   "ans": 0,
   "exp": "{:.2f} 表示保留两位小数（f 为浮点数格式），3.14159 四舍五入为 3.14。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-013",
   "level": 3,
   "topic": "f-string 格式化",
   "q": "有如下程序：\nname, age = '王芳', 20\nprint(f'{name}今年{age}岁')\n输出结果是____。",
   "opts": [
    "{name}今年{age}岁",
    "王芳今年20岁",
    "name今年age岁",
    "程序报错"
   ],
   "ans": 1,
   "exp": "f 字符串中的 {变量名} 会被替换为变量的值，是最简洁的格式化方式；不加 f 前缀时花括号原样输出。",
   "difficulty": 1
  },
  {
   "id": "mcq-l3-014",
   "level": 3,
   "topic": "append 方法",
   "q": "有如下程序：\nlst = [1, 2, 3]\nlst.append([4, 5])\nprint(len(lst))\n输出结果是____。",
   "opts": [
    "5",
    "3",
    "4",
    "程序报错"
   ],
   "ans": 2,
   "exp": "append 把整个 [4, 5] 作为单个元素追加到末尾，列表变为 [1, 2, 3, [4, 5]]，长度为 4。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-015",
   "level": 3,
   "topic": "insert 与 pop",
   "q": "有如下程序：\nlst = [10, 20, 30, 40]\nlst.insert(1, 15)\nx = lst.pop(2)\nprint(lst, x)\n输出结果是____。",
   "opts": [
    "[10, 15, 30, 40] 30",
    "[10, 20, 30, 40] 15",
    "[10, 15, 20, 40] 20",
    "[10, 15, 30, 40] 20"
   ],
   "ans": 3,
   "exp": "insert(1, 15) 在下标 1 处插入得 [10,15,20,30,40]；pop(2) 删除并返回下标 2 的元素 20，列表变为 [10, 15, 30, 40]。",
   "difficulty": 3
  },
  {
   "id": "mcq-l3-016",
   "level": 3,
   "topic": "remove 方法",
   "q": "有如下程序：\nlst = [1, 2, 2, 3]\nlst.remove(2)\nprint(lst)\n输出结果是____。",
   "opts": [
    "[1, 2, 3]",
    "[1, 3]",
    "[1, 2, 2, 3]",
    "程序报错"
   ],
   "ans": 0,
   "exp": "remove 只删除第一个值为 2 的元素，剩下的 2 保留；按位置删除应使用 pop 或 del。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-017",
   "level": 3,
   "topic": "sort 与 sorted",
   "q": "有如下程序：\na = [3, 1, 2]\nb = sorted(a)\nprint(a, b)\n输出结果是____。",
   "opts": [
    "[1, 2, 3] [1, 2, 3]",
    "[3, 1, 2] [1, 2, 3]",
    "[1, 2, 3] [3, 1, 2]",
    "[3, 1, 2] [3, 1, 2]"
   ],
   "ans": 1,
   "exp": "sorted(a) 返回排序后的新列表，原列表 a 不变；a.sort() 才是原地排序、直接修改 a 本身。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-018",
   "level": 3,
   "topic": "reverse/index/count",
   "q": "有如下程序：\nlst = [1, 2, 3, 2]\nlst.reverse()\nprint(lst, lst.index(2), lst.count(2))\n输出结果是____。",
   "opts": [
    "[1, 2, 3, 2] 1 2",
    "[2, 3, 2, 1] 1 2",
    "[2, 3, 2, 1] 0 2",
    "[2, 3, 2, 1] 0 3"
   ],
   "ans": 2,
   "exp": "reverse 原地反转为 [2, 3, 2, 1]；index 返回第一个匹配元素的下标 0，count 统计 2 共出现 2 次。",
   "difficulty": 3
  },
  {
   "id": "mcq-l3-019",
   "level": 3,
   "topic": "列表解析式",
   "q": "`print([x * x for x in range(1, 5) if x % 2 == 0])` 的输出结果是____。",
   "opts": [
    "[1, 4, 9, 16]",
    "[2, 4]",
    "[4, 16]",
    "[4]"
   ],
   "ans": 2,
   "exp": "range(1, 5) 取 1~4，if 筛出偶数 2 和 4，平方后得 [4, 16]；列表解析式 = 遍历 + 过滤 + 表达式。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-020",
   "level": 3,
   "topic": "enumerate",
   "q": "`print(list(enumerate('abc')))` 的输出结果是____。",
   "opts": [
    "['a', 'b', 'c']",
    "[(1, 'a'), (2, 'b'), (3, 'c')]",
    "程序报错",
    "[(0, 'a'), (1, 'b'), (2, 'c')]"
   ],
   "ans": 3,
   "exp": "enumerate 同时给出下标和元素，下标默认从 0 开始，组成 (下标, 元素) 元组的列表；for i, ch in enumerate(...) 就是在做元组解包。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-021",
   "level": 3,
   "topic": "深浅复制",
   "q": "有如下程序：\na = [1, 2, 3]\nb = a[:]\nb[0] = 99\nprint(a)\n输出结果是____。",
   "opts": [
    "[1, 2, 3]",
    "[99, 2, 3]",
    "[1, 2, 3, 99]",
    "程序报错"
   ],
   "ans": 0,
   "exp": "b=a[:] 复制出一个新列表，修改 b 不影响 a；若写成 b=a，两个名字指向同一个列表，a 也会变成 [99, 2, 3]。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-022",
   "level": 3,
   "topic": "元组与单元素元组",
   "q": "有如下程序：\nt = (5)\nprint(type(t))\n输出结果是____。",
   "opts": [
    "<class 'tuple'>",
    "<class 'int'>",
    "<class 'float'>",
    "<class 'str'>"
   ],
   "ans": 1,
   "exp": "(5) 只是带括号的整数表达式，定义单元素元组必须写 (5,)。元组是不可变类型，不能对其中元素赋值。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-023",
   "level": 3,
   "topic": "字典增删改",
   "q": "有如下程序：\nd = {'a': 1, 'b': 2}\nd['c'] = 3\ndel d['a']\nprint(d)\n输出结果是____。",
   "opts": [
    "{'a': 1, 'b': 2, 'c': 3}",
    "{'c': 3}",
    "{'b': 2, 'c': 3}",
    "程序报错"
   ],
   "ans": 2,
   "exp": "d['c']=3 新增键值对，del d['a'] 删除键 'a'；也可以用 d.pop('a') 删除并返回对应的值。",
   "difficulty": 1
  },
  {
   "id": "mcq-l3-024",
   "level": 3,
   "topic": "字典分类计数",
   "q": "有如下程序：\ns = 'ababc'\nd = {}\nfor ch in s:\n    d[ch] = d.get(ch, 0) + 1\nprint(d)\n输出结果是____。",
   "opts": [
    "{'a': 2, 'b': 2, 'c': 1}",
    "{'a': 1, 'b': 1, 'c': 1}",
    "{'ababc': 1}",
    "程序报错"
   ],
   "ans": 0,
   "exp": "d.get(ch, 0) 在键不存在时返回默认值 0，实现逐字符计数；遍历键值对可用 for k, v in d.items()（键值元组解包）。",
   "difficulty": 3
  },
  {
   "id": "mcq-l3-025",
   "level": 3,
   "topic": "不可变对象作键",
   "q": "下列选项中，不能作为字典键的是____。",
   "opts": [
    "'name'",
    "(1, 2)",
    "3.14",
    "[1, 2]"
   ],
   "ans": 3,
   "exp": "字典的键必须是不可变对象：字符串、数值、元组都可以，列表是可变类型，作键会报 TypeError。",
   "difficulty": 2
  },
  {
   "id": "mcq-l3-026",
   "level": 3,
   "topic": "集合去重",
   "q": "有如下程序：\nlst = [1, 2, 2, 3, 3, 3]\nprint(len(set(lst)))\n输出结果是____。",
   "opts": [
    "6",
    "3",
    "1",
    "程序报错"
   ],
   "ans": 1,
   "exp": "set() 把列表转成集合时自动去掉重复元素，得到 {1, 2, 3} 共 3 个元素；这是列表去重的常用方法。",
   "difficulty": 1
  },
  {
   "id": "mcq-l4-001",
   "level": 4,
   "topic": "函数定义",
   "q": "下列关于函数定义的说法，错误的是____。",
   "opts": [
    "函数定义后，必须被调用才能执行函数体中的代码",
    "def 语句定义函数时，函数体必须相对 def 缩进",
    "函数体中必须包含 return 语句，否则定义函数时会报语法错误",
    "函数名的命名规则与变量名相同"
   ],
   "ans": 2,
   "exp": "函数可以没有 return 语句，此时函数返回 None，不会报语法错误；其余三项都是函数定义的正确规则。",
   "difficulty": 1
  },
  {
   "id": "mcq-l4-002",
   "level": 4,
   "topic": "返回值",
   "q": "有如下程序：\ndef f(x):\n    x = x + 1\nprint(f(3))\n输出结果是____。",
   "opts": [
    "None",
    "4",
    "3",
    "程序报错"
   ],
   "ans": 0,
   "exp": "函数体中没有 return 语句时，函数返回 None。函数体虽然执行了 x=x+1，但没有把结果返回，print 输出 None。",
   "difficulty": 1
  },
  {
   "id": "mcq-l4-003",
   "level": 4,
   "topic": "多返回值",
   "q": "有如下程序：\ndef f(a, b):\n    return a + b, a * b\nr = f(2, 3)\nprint(r)\n输出结果是____。",
   "opts": [
    "[5, 6]",
    "5 6",
    "程序报错",
    "(5, 6)"
   ],
   "ans": 3,
   "exp": "return 后跟多个值时会自动打包成一个元组返回，a+b=5、a*b=6，故 r 是元组 (5, 6)；5 6 是 print 多个值的输出形式，而 r 本身是一个元组对象。",
   "difficulty": 1
  },
  {
   "id": "mcq-l4-004",
   "level": 4,
   "topic": "形参与实参",
   "q": "有函数定义 `def add(x, y):`，调用 `add(3, 5)` 时，下列说法正确的是____。",
   "opts": [
    "3 和 5 是形式参数",
    "3 和 5 是实际参数",
    "3 是形参，5 是实参",
    "3 和 5 是关键字参数"
   ],
   "ans": 1,
   "exp": "定义时括号中的 x、y 是形式参数（形参），调用时传入的具体值 3、5 是实际参数（实参）；按位置直接传值的不是关键字参数。",
   "difficulty": 1
  },
  {
   "id": "mcq-l4-005",
   "level": 4,
   "topic": "默认参数",
   "q": "有如下程序：\ndef f(a, b=10):\n    return a + b\nprint(f(1), f(1, 2))\n输出结果是____。",
   "opts": [
    "11 12",
    "11 3",
    "3 12",
    "程序报错"
   ],
   "ans": 1,
   "exp": "f(1) 只按位置给 a 传 1，b 使用默认值 10，得 11；f(1, 2) 按位置给 b 传 2，覆盖默认值，得 3。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-006",
   "level": 4,
   "topic": "关键字参数",
   "q": "有如下程序：\ndef f(a, b):\n    return a - b\nprint(f(b=1, a=5))\n输出结果是____。",
   "opts": [
    "-4",
    "6",
    "程序报错",
    "4"
   ],
   "ans": 3,
   "exp": "关键字参数按参数名传递，与书写顺序无关，相当于 a=5、b=1，故 a-b=4；若误按位置理解为 1-5 会错选 -4。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-007",
   "level": 4,
   "topic": "可变参数",
   "q": "有如下程序：\ndef f(a, *b):\n    print(a, b)\nf(1, 2, 3)\n输出结果是____。",
   "opts": [
    "1 (2, 3)",
    "1 [2, 3]",
    "1 2 3",
    "程序报错"
   ],
   "ans": 0,
   "exp": "形参前的 * 号把多余的位置参数收集成一个元组，a 接收第一个实参 1，b 是元组 (2, 3)，print 输出 1 (2, 3)。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-008",
   "level": 4,
   "topic": "可变参数",
   "q": "有如下程序：\ndef f(**kw):\n    return kw\nprint(f(x=1, y=2))\n输出结果是____。",
   "opts": [
    "[('x', 1), ('y', 2)]",
    "(1, 2)",
    "{'x': 1, 'y': 2}",
    "程序报错"
   ],
   "ans": 2,
   "exp": "形参前的 ** 号把关键字参数收集成一个字典，键是参数名字符串、值是对应实参，故返回 {'x': 1, 'y': 2}；*args 才是收集为元组。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-009",
   "level": 4,
   "topic": "作用域",
   "q": "有如下程序：\ndef f():\n    x = 10\n    return x\nx = 5\nf()\nprint(x)\n输出结果是____。",
   "opts": [
    "5",
    "10",
    "15",
    "程序报错"
   ],
   "ans": 0,
   "exp": "函数内赋值的 x 是局部变量，只在函数内部有效，不影响外面的全局变量 x，故输出 5；要在函数内修改全局变量须先 global 声明。",
   "difficulty": 1
  },
  {
   "id": "mcq-l4-010",
   "level": 4,
   "topic": "global 语句",
   "q": "有如下程序：\nn = 10\ndef f():\n    global n\n    n = n + 5\n    return n\nf()\nprint(n)\n输出结果是____。",
   "opts": [
    "10",
    "5",
    "15",
    "程序报错"
   ],
   "ans": 2,
   "exp": "global n 声明函数内的 n 就是全局变量，n=n+5 直接修改全局变量，调用后 n 变为 15，输出 15。",
   "difficulty": 1
  },
  {
   "id": "mcq-l4-011",
   "level": 4,
   "topic": "作用域",
   "q": "有如下程序：\nn = 10\ndef f():\n    n = n + 1\nf()\nprint(n)\n运行结果是____。",
   "opts": [
    "11",
    "程序报错，提示局部变量 n 在赋值前被引用",
    "10",
    "None"
   ],
   "ans": 1,
   "exp": "函数内对 n 赋值使 n 被当作局部变量，但执行 n=n+1 时右侧的 n 还未赋值，引发 UnboundLocalError；想在函数内修改全局变量必须先写 global n。",
   "difficulty": 3
  },
  {
   "id": "mcq-l4-012",
   "level": 4,
   "topic": "lambda",
   "q": "有如下程序：\nf = lambda x, y: x if x > y else y\nprint(f(3, 8))\n输出结果是____。",
   "opts": [
    "3",
    "(3, 8)",
    "程序报错",
    "8"
   ],
   "ans": 3,
   "exp": "lambda 冒号后是一个表达式，其值即返回值；条件表达式 x if x>y else y 取较大者，f(3, 8) 返回 8。该 lambda 相当于定义了求两数最大值的函数。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-013",
   "level": 4,
   "topic": "map()",
   "q": "有如下程序：\nprint(list(map(lambda x: x * 2, [1, 2, 3])))\n输出结果是____。",
   "opts": [
    "[1, 4, 9]",
    "[1, 2, 3]",
    "程序报错",
    "[2, 4, 6]"
   ],
   "ans": 3,
   "exp": "map(f, 序列) 把函数 f 逐个作用于序列的每个元素并返回 map 对象，用 list() 转成列表得 [2, 4, 6]。",
   "difficulty": 1
  },
  {
   "id": "mcq-l4-014",
   "level": 4,
   "topic": "filter()",
   "q": "有如下程序：\nprint(list(filter(lambda x: x % 2 == 1, [1, 2, 3, 4, 5])))\n输出结果是____。",
   "opts": [
    "[2, 4]",
    "[1, 3, 5]",
    "[1, 2, 3, 4, 5]",
    "程序报错"
   ],
   "ans": 1,
   "exp": "filter(f, 序列) 只保留使 f(x) 为真的元素，这里筛选奇数得 [1, 3, 5]；filter 只做筛选，不改变元素本身。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-015",
   "level": 4,
   "topic": "sorted(key=)",
   "q": "有如下程序：\nwords = ['pear', 'fig', 'banana']\nprint(sorted(words, key=len))\n输出结果是____。",
   "opts": [
    "['banana', 'fig', 'pear']",
    "程序报错",
    "['fig', 'pear', 'banana']",
    "['fig', 'banana', 'pear']"
   ],
   "ans": 2,
   "exp": "key=len 表示按每个字符串的长度排序：fig 长 3、pear 长 4、banana 长 6；不加 key 时才按字典序，banana 会排在最前。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-016",
   "level": 4,
   "topic": "sorted(key=)",
   "q": "有如下程序：\npairs = [(1, 3), (2, 1), (3, 2)]\nprint(sorted(pairs, key=lambda t: t[1]))\n输出结果是____。",
   "opts": [
    "[(2, 1), (3, 2), (1, 3)]",
    "[(1, 3), (2, 1), (3, 2)]",
    "[(1, 2, 3)]",
    "程序报错"
   ],
   "ans": 0,
   "exp": "key=lambda t: t[1] 指定按每个元组的第 2 个元素排序，三个元组的第 2 个元素分别为 3、1、2，升序排列后为 (2,1)、(3,2)、(1,3)。",
   "difficulty": 3
  },
  {
   "id": "mcq-l4-017",
   "level": 4,
   "topic": "递归",
   "q": "有如下程序：\ndef f(n):\n    if n == 1:\n        return 1\n    return n * f(n - 1)\nprint(f(4))\n输出结果是____。",
   "opts": [
    "10",
    "24",
    "120",
    "程序报错"
   ],
   "ans": 1,
   "exp": "递归计算 4!=4×3×2×1=24；f(4)=4×f(3)，逐层展开到 f(1) 返回 1 后逐层回乘。120 是 5! 的结果。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-018",
   "level": 4,
   "topic": "递归调用次数",
   "q": "有如下程序：\ncount = 0\ndef f(n):\n    global count\n    count += 1\n    if n == 0:\n        return 0\n    return f(n - 1)\nf(4)\nprint(count)\n输出结果是____。",
   "opts": [
    "5",
    "4",
    "程序报错",
    "20"
   ],
   "ans": 0,
   "exp": "f(4) 依次递归调用 f(3)、f(2)、f(1)、f(0)，加上 f(4) 本身共被调用 5 次，每次 count 加 1，输出 5。",
   "difficulty": 3
  },
  {
   "id": "mcq-l4-019",
   "level": 4,
   "topic": "递归",
   "q": "下列关于递归的说法，错误的是____。",
   "opts": [
    "递归的执行效率一定比等效的循环实现高",
    "递归是函数直接或间接调用自身",
    "递归函数必须有终止条件，否则会无限递归下去",
    "递归层次太深可能超过最大递归深度而报错"
   ],
   "ans": 0,
   "exp": "递归每层调用都要占用栈空间且有函数调用开销，效率通常低于等效的循环实现，A 说法错误；B、C、D 都正确描述了递归的特点。",
   "difficulty": 1
  },
  {
   "id": "mcq-l4-020",
   "level": 4,
   "topic": "生成器",
   "q": "有如下程序：\ndef gen():\n    yield 1\n    yield 2\ng = gen()\nprint(next(g))\n输出结果是____。",
   "opts": [
    "2",
    "[1, 2]",
    "1",
    "程序报错"
   ],
   "ans": 2,
   "exp": "函数体中含有 yield 时它是生成器函数，调用 gen() 不执行函数体而是返回生成器对象；第一次 next(g) 执行到第一个 yield 暂停并返回 1。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-021",
   "level": 4,
   "topic": "装饰器",
   "q": "下列关于装饰器（decorator）的说法，正确的是____。",
   "opts": [
    "使用装饰器时必须修改被装饰函数的源代码",
    "装饰器只能装饰内置函数，不能装饰自定义函数",
    "装饰器本质是一个函数，它接收一个函数作为参数并返回一个新函数，可在不修改原函数代码的前提下扩展其功能",
    "@装饰器名 必须写在被装饰函数的函数体内部"
   ],
   "ans": 2,
   "exp": "装饰器接收函数并返回新函数，通过 @语法写在函数定义的上方使用；它不修改原函数源码，自定义函数同样可以装饰。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-022",
   "level": 4,
   "topic": "模块导入",
   "q": "已执行 `import math`，下列调用 math 模块中 sqrt 函数的语句，正确的是____。",
   "opts": [
    "sqrt(4)",
    "import.sqrt(4)",
    "math->sqrt(4)",
    "math.sqrt(4)"
   ],
   "ans": 3,
   "exp": "import math 导入整个模块，使用其中函数要加模块名前缀，即 math.sqrt(4)；若使用 from math import sqrt 导入，才可以直接写 sqrt(4)。",
   "difficulty": 1
  },
  {
   "id": "mcq-l5-001",
   "level": 5,
   "topic": "文本与二进制文件",
   "q": "下列关于文本文件与二进制文件的说法，正确的是____。",
   "opts": [
    "文本文件只能存储英文字符，不能存储中文",
    "文本文件与二进制文件的存储格式完全相同，只是扩展名不同",
    "二进制文件无法被计算机读取和处理",
    "文本文件是基于字符编码保存的文件，二进制文件是由字节序列组成的文件，如图片、视频文件"
   ],
   "ans": 3,
   "exp": "文本文件按某种字符编码（如 UTF-8）把字符转换为字节保存；二进制文件直接以字节序列保存，需按其固有格式解析。文本文件可以存中文，二进制文件当然能被计算机处理。",
   "difficulty": 1
  },
  {
   "id": "mcq-l5-002",
   "level": 5,
   "topic": "打开模式",
   "q": "语句 `open('data.txt')` 中未指定打开模式，则默认使用的打开模式是____。",
   "opts": [
    "'w'（写入）",
    "'r'（只读）",
    "'a'（追加）",
    "'rb'（二进制只读）"
   ],
   "ans": 1,
   "exp": "open 不指定 mode 参数时默认为 'r' 只读文本模式；'w'、'a'、'rb' 等模式都需要显式写出。",
   "difficulty": 1
  },
  {
   "id": "mcq-l5-003",
   "level": 5,
   "topic": "w 模式",
   "q": "已知文件 a.txt 的内容为 hello，执行以下程序后，a.txt 的内容是____。\nf = open('a.txt', 'w')\nf.write('123')\nf.close()",
   "opts": [
    "123",
    "hello123",
    "hello",
    "123hello"
   ],
   "ans": 0,
   "exp": "'w' 模式打开已存在的文件时会先清空文件的全部原内容，再从头写入，所以最终只剩新写入的 123；想在原内容后面添加应使用 'a' 追加模式。",
   "difficulty": 2
  },
  {
   "id": "mcq-l5-004",
   "level": 5,
   "topic": "a 模式",
   "q": "已知文件 a.txt 的内容为 hello，执行以下程序后，a.txt 的内容是____。\nf = open('a.txt', 'a')\nf.write('123')\nf.close()",
   "opts": [
    "123",
    "hello123",
    "hello",
    "123hello"
   ],
   "ans": 1,
   "exp": "'a' 追加模式不清空原内容，文件指针定位在文件末尾，写入的内容接在原内容之后，得到 hello123。",
   "difficulty": 2
  },
  {
   "id": "mcq-l5-005",
   "level": 5,
   "topic": "打开模式",
   "q": "当前目录下不存在文件 b.txt，执行 `f = open('b.txt', 'r')` 的结果是____。",
   "opts": [
    "自动创建空文件 b.txt",
    "返回一个空文件对象，程序继续运行",
    "弹出对话框提示是否新建文件",
    "程序报错 FileNotFoundError"
   ],
   "ans": 3,
   "exp": "'r' 模式要求文件必须已经存在，否则抛出 FileNotFoundError；'w' 模式打开不存在的文件时才会自动创建新文件。",
   "difficulty": 1
  },
  {
   "id": "mcq-l5-006",
   "level": 5,
   "topic": "read()",
   "q": "文件 s.txt 的内容为两行：第一行 abc，第二行 xyz（文件末尾没有换行符）。有如下程序：\nf = open('s.txt')\nt = f.read()\nprint(len(t))\nf.close()\n输出结果是____。",
   "opts": [
    "3",
    "6",
    "7",
    "程序报错"
   ],
   "ans": 2,
   "exp": "read() 不带参数时一次读出整个文件内容为一个字符串，'abc\\nxyz' 包含中间的换行符共 3+1+3=7 个字符。",
   "difficulty": 1
  },
  {
   "id": "mcq-l5-007",
   "level": 5,
   "topic": "读取方法",
   "q": "下列关于 read()、readline()、readlines() 的说法，正确的是____。",
   "opts": [
    "readlines() 返回一个字符串，包含文件的全部内容",
    "readline() 每次读取文件的全部内容",
    "read() 每次只能读取一行内容",
    "readline() 每次读取一行内容，readlines() 把各行作为元素组成列表返回"
   ],
   "ans": 3,
   "exp": "readline() 每次读一行（含行尾换行符），readlines() 返回由各行组成的列表，read() 读取整个文件为字符串；A、B、C 都把三者的功能弄反了。",
   "difficulty": 1
  },
  {
   "id": "mcq-l5-008",
   "level": 5,
   "topic": "readlines()",
   "q": "文件 s.txt 的内容为 abc\\nxyz\\n（两行，每行末尾有换行符）。有如下程序：\nf = open('s.txt')\nlines = f.readlines()\nf.close()\nprint(lines)\n输出结果是____。",
   "opts": [
    "['abc', 'xyz']",
    "'abc\\nxyz\\n'",
    "['abc\\n', 'xyz\\n']",
    "程序报错"
   ],
   "ans": 2,
   "exp": "readlines() 按行读取并把每行（含行尾的换行符）作为列表的一个元素，屏幕显示为 ['abc\\n', 'xyz\\n']；要去掉换行符需对各元素使用 strip()。",
   "difficulty": 2
  },
  {
   "id": "mcq-l5-009",
   "level": 5,
   "topic": "with 语句",
   "q": "下列关于 with 语句打开文件的说法，错误的是____。",
   "opts": [
    "with 语句块结束时自动关闭文件，不必再写 f.close()",
    "使用 with 打开的文件必须再写一行 f.close() 才能关闭",
    "with open('a.txt') as f: 中的 f 是文件对象",
    "即使读取过程中发生异常，with 也能保证文件被关闭"
   ],
   "ans": 1,
   "exp": "with 上下文管理机制会在语句块结束（无论是否发生异常）时自动调用 close 关闭文件，这正是它比直接 open 更安全的地方，B 说法错误。",
   "difficulty": 1
  },
  {
   "id": "mcq-l5-010",
   "level": 5,
   "topic": "seek()",
   "q": "文件 s.txt 的内容为 abcdef。有如下程序：\nf = open('s.txt')\nprint(f.read(2))\nf.seek(3)\nprint(f.read(2))\nf.close()\n输出结果是____。",
   "opts": [
    "ab 和 de（分两行输出）",
    "ab 和 cd（分两行输出）",
    "ab 和 ef（分两行输出）",
    "程序报错"
   ],
   "ans": 0,
   "exp": "read(2) 从当前位置读取 2 个字符得 ab，指针移到下标 2；seek(3) 把指针移到下标 3（字符 d 处），再读 2 个字符得 de。",
   "difficulty": 2
  },
  {
   "id": "mcq-l5-011",
   "level": 5,
   "topic": "编码",
   "q": "某中文文本文件是以 GBK 编码保存的，却用 `open('note.txt', encoding='utf-8')` 读取它，最可能出现的现象是____。",
   "opts": [
    "读取到的内容比原文件多一倍",
    "抛出 UnicodeDecodeError 异常或出现乱码",
    "Python 会自动转换编码，正常读出中文",
    "读取到的内容为空"
   ],
   "ans": 1,
   "exp": "文件实际是 GBK 编码却按 UTF-8 解码，字节序列无法正确对应字符，通常会抛出 UnicodeDecodeError 或显示乱码；open 的 encoding 参数必须与文件的实际编码一致。",
   "difficulty": 2
  },
  {
   "id": "mcq-l5-012",
   "level": 5,
   "topic": "write()",
   "q": "有如下程序：\nf = open('out.txt', 'w')\nn = f.write('hello')\nprint(n)\nf.close()\n输出结果是____。",
   "opts": [
    "'hello'",
    "None",
    "5",
    "程序报错"
   ],
   "ans": 2,
   "exp": "write(s) 把字符串写入文件，并返回写入的字符个数，'hello' 共 5 个字符，故输出 5；写入的内容在文件里，返回值是字符个数。",
   "difficulty": 3
  },
  {
   "id": "mcq-l5-013",
   "level": 5,
   "topic": "writelines()",
   "q": "有如下程序：\nf = open('out.txt', 'w')\nf.writelines(['aa', 'bb', 'cc'])\nf.close()\nt = open('out.txt').read()\nprint(t)\n输出结果是____。",
   "opts": [
    "aabbcc",
    "aa bb cc",
    "['aa', 'bb', 'cc']",
    "aa,bb,cc"
   ],
   "ans": 0,
   "exp": "writelines() 把列表中的字符串依次原样写入文件，不会自动添加换行符或分隔符，文件内容为 aabbcc；想分行需要在元素中自带 \\n。",
   "difficulty": 1
  },
  {
   "id": "mcq-l5-014",
   "level": 5,
   "topic": "CSV 处理",
   "q": "data.csv 每行格式为：姓名,年龄（英文逗号分隔，UTF-8 编码，无标题行）。要逐行读出每个人的姓名和年龄，横线处应填入的是____。\nfor line in open('data.csv', encoding='utf-8'):\n    name, age = ____",
   "opts": [
    "line.split()",
    "line.strip().split('，')",
    "line.split(' ')",
    "line.strip().split(',')"
   ],
   "ans": 3,
   "exp": "先用 strip() 去掉行尾换行符，再用英文逗号 split(',') 切分并解包；不 strip 会把换行符留在年龄里，split() 默认按空白切分，中文逗号也切不开英文逗号分隔的数据。",
   "difficulty": 2
  },
  {
   "id": "mcq-l5-015",
   "level": 5,
   "topic": "词频统计",
   "q": "文件 stat.txt 的内容为一行：apple banana apple。有如下程序：\ncounts = {}\nfor line in open('stat.txt'):\n    for word in line.split():\n        counts[word] = counts.get(word, 0) + 1\nprint(counts['apple'])\n输出结果是____。",
   "opts": [
    "2",
    "1",
    "3",
    "程序报错"
   ],
   "ans": 0,
   "exp": "程序逐行、逐词统计词频：line.split() 按空白切出单词，counts.get(word, 0) 在键不存在时返回 0，apple 出现 2 次，输出 2。这是基于文件的词频统计典型模式。",
   "difficulty": 3
  },
  {
   "id": "mcq-l5-016",
   "level": 5,
   "topic": "文件统计",
   "q": "文件 nums.txt 中每行一个整数：10、20、30。有如下程序：\ns = 0\nfor line in open('nums.txt'):\n    s += int(line)\nprint(s)\n输出结果是____。",
   "opts": [
    "10",
    "102030",
    "程序报错",
    "60"
   ],
   "ans": 3,
   "exp": "逐行读取文件，int(line) 把每行内容（int 会自动忽略首尾空白）转成整数后累加，10+20+30=60。",
   "difficulty": 2
  },
  {
   "id": "mcq-l5-017",
   "level": 5,
   "topic": "遍历文件",
   "q": "下列关于文件遍历与读取的说法，错误的是____。",
   "opts": [
    "for line in f 可以直接逐行遍历已打开的文件对象 f",
    "文件读取结束后应及时调用 f.close() 释放资源",
    "文件对象 f 必须先用 readlines() 把内容读成列表，才能逐行处理",
    "for line in f 取出的 line 末尾通常带有换行符，常配合 strip() 使用"
   ],
   "ans": 2,
   "exp": "文件对象是可迭代对象，可以直接用 for line in f 逐行读取，不必先 readlines()，C 说法错误；直接遍历得到的每行末尾带换行符，常需 strip()。",
   "difficulty": 2
  },
  {
   "id": "mcq-l5-018",
   "level": 5,
   "topic": "二进制读取",
   "q": "有如下程序（a.txt 是当前目录下已存在的文件）：\nf = open('a.txt', 'rb')\ndata = f.read()\nprint(type(data))\nf.close()\n输出结果是____。",
   "opts": [
    "<class 'str'>",
    "<class 'bytes'>",
    "<class 'list'>",
    "<class 'dict'>"
   ],
   "ans": 1,
   "exp": "'rb' 以二进制模式打开文件，read() 返回 bytes（字节串）对象；文本模式 'r' 读出的才是 str 字符串。",
   "difficulty": 1
  },
  {
   "id": "mcq-l5-019",
   "level": 5,
   "topic": "读写模式",
   "q": "有如下程序：\nf = open('t.txt', 'w+')\nf.write('hello')\nprint(f.read())\nf.close()\n输出结果是____。",
   "opts": [
    "hello",
    "程序报错",
    "输出一个空行（空字符串）",
    "hellohello"
   ],
   "ans": 2,
   "exp": "'w+' 允许读写，先写入 hello 后文件指针停在文件末尾，接着 read() 从指针处开始读，读不到任何内容，输出空字符串；先 f.seek(0) 把指针移回开头再读才能得到 hello。",
   "difficulty": 3
  },
  {
   "id": "mcq-l5-020",
   "level": 5,
   "topic": "文件统计",
   "q": "文件 score.txt 中每行一个整数：80、90、60。有如下程序：\nc = 0\nfor line in open('score.txt'):\n    if int(line) >= 80:\n        c += 1\nprint(c)\n输出结果是____。",
   "opts": [
    "1",
    "2",
    "3",
    "程序报错"
   ],
   "ans": 1,
   "exp": "程序逐行读取并统计不小于 80 的数的个数，80 和 90 满足条件，输出 2。基于文件做统计的一般套路是：逐行读取、类型转换、判断、计数。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-001",
   "level": 6,
   "topic": "pip 安装",
   "q": "要安装第三方库 jieba，下列命令行命令正确的是____。",
   "opts": [
    "install jieba pip",
    "python install jieba",
    "download jieba",
    "pip install jieba"
   ],
   "ans": 3,
   "exp": "pip 是 Python 的包管理工具，在命令行执行 pip install 库名 即可在线安装，如 pip install jieba；其余写法都不是有效命令。",
   "difficulty": 1
  },
  {
   "id": "mcq-l6-002",
   "level": 6,
   "topic": "whl 安装",
   "q": "在无网络的计算机上安装第三方库，可以先从网上下载该库的 whl 文件到本地，然后执行的命令是____。",
   "opts": [
    "pip install 路径/xxx.whl",
    "pip download 路径/xxx.whl",
    "python 路径/xxx.whl",
    "import 路径/xxx.whl"
   ],
   "ans": 0,
   "exp": "whl 是已打包的库文件，用 pip install 路径/xxx.whl 即可离线安装；download 是下载命令，whl 文件不能当作脚本运行，也不能直接 import。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-003",
   "level": 6,
   "topic": "模块导入",
   "q": "下列关于 import 与 from…import 的说法，正确的是____。",
   "opts": [
    "from random import randint 之后，使用 randint 仍需写成 random.randint(1, 10)",
    "import 与 from…import 两种导入方式的使用方法完全相同",
    "import 语句只能写在程序的最后一行",
    "import random 之后需用 random.函数名() 的方式调用，而 from random import randint 之后可以直接写 randint(1, 10)"
   ],
   "ans": 3,
   "exp": "import 模块 导入整个模块，调用其中函数要加模块名前缀；from 模块 import 函数 把函数直接引入，可按名字直接调用。import 通常写在程序开头，但并非只能写在最后一行。",
   "difficulty": 1
  },
  {
   "id": "mcq-l6-004",
   "level": 6,
   "topic": "as 别名",
   "q": "执行 `import numpy as np` 后，下列调用正确的是____。",
   "opts": [
    "np.array([1, 2])",
    "numpy.array([1, 2])",
    "as.array([1, 2])",
    "n.array([1, 2])"
   ],
   "ans": 0,
   "exp": "as 为模块指定别名后，只能用别名 np 访问模块内容，再写原名 numpy 会报 NameError；as 和 n 都不是导入时定义的名称。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-005",
   "level": 6,
   "topic": "random.seed()",
   "q": "在生成随机数前执行 `random.seed(10)`，其作用是____。",
   "opts": [
    "生成 10 个随机数",
    "设置随机数种子，使每次运行程序生成的随机数序列相同",
    "把随机数的取值范围限定在 10 以内",
    "清除之前生成的随机数"
   ],
   "ans": 1,
   "exp": "seed 设置随机数生成器的种子，种子相同则每次运行产生的随机序列完全相同，便于结果复现和测试；它不会改变随机数的取值范围。",
   "difficulty": 1
  },
  {
   "id": "mcq-l6-006",
   "level": 6,
   "topic": "randint",
   "q": "`random.randint(1, 10)` 生成的随机整数的范围是____。",
   "opts": [
    "1 ~ 9 的整数",
    "0 ~ 10 的整数",
    "1 ~ 10 的整数（含 1 和 10）",
    "0 ~ 9 的整数"
   ],
   "ans": 2,
   "exp": "randint(a, b) 返回 [a, b] 区间内的随机整数，包含两个端点，因此既能取到 1 也能取到 10。",
   "difficulty": 1
  },
  {
   "id": "mcq-l6-007",
   "level": 6,
   "topic": "random.seed()",
   "q": "有如下程序：\nimport random\nrandom.seed(2)\na = random.randint(1, 100)\nrandom.seed(2)\nb = random.randint(1, 100)\nprint(a == b)\n输出结果是____。",
   "opts": [
    "False",
    "True",
    "程序报错",
    "每次运行结果都不同"
   ],
   "ans": 1,
   "exp": "第二次 random.seed(2) 把随机序列重置回开头，随后的 randint 与第一次得到相同的值，a 与 b 相等，输出 True；这正是种子可复现随机序列的体现。",
   "difficulty": 3
  },
  {
   "id": "mcq-l6-008",
   "level": 6,
   "topic": "random()",
   "q": "`random.random()` 返回的随机数的范围是____。",
   "opts": [
    "0 ~ 1 之间的随机整数",
    "1 ~ 10 之间的随机小数",
    "0 ~ 100 之间的随机数",
    "0.0 ~ 1.0 之间的随机小数（含 0.0 不含 1.0）"
   ],
   "ans": 3,
   "exp": "random.random() 返回 [0.0, 1.0) 区间的随机小数，能取到 0.0 取不到 1.0；要生成 1~10 的随机整数应使用 randint(1, 10)。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-009",
   "level": 6,
   "topic": "shuffle",
   "q": "有如下程序：\nimport random\nlst = [1, 2, 3, 4, 5]\nr = random.shuffle(lst)\nprint(r)\n输出结果是____。",
   "opts": [
    "打乱顺序后的新列表",
    "[1, 2, 3, 4, 5]",
    "None",
    "程序报错"
   ],
   "ans": 2,
   "exp": "shuffle(lst) 将列表 lst 原地打乱顺序，返回值是 None；想查看打乱结果应输出 lst 本身。返回 None 是考试常见的坑。",
   "difficulty": 3
  },
  {
   "id": "mcq-l6-010",
   "level": 6,
   "topic": "floor 与 ceil",
   "q": "有如下程序：\nimport math\nprint(math.floor(-3.5), math.ceil(-3.5))\n输出结果是____。",
   "opts": [
    "-4 -3",
    "-3 -4",
    "-3 -3",
    "-4 -4"
   ],
   "ans": 0,
   "exp": "floor 是向下取整，-3.5 往小的方向取 -4；ceil 是向上取整，-3.5 往大的方向取 -3。负数取整的方向容易弄反。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-011",
   "level": 6,
   "topic": "sqrt 与 pi",
   "q": "有如下程序：\nimport math\nprint(math.sqrt(16), math.pi > 3.14)\n输出结果是____。",
   "opts": [
    "4.0 True",
    "4 True",
    "4.0 False",
    "16 True"
   ],
   "ans": 0,
   "exp": "math.sqrt(16) 返回浮点数 4.0；math.pi 是圆周率常量 3.14159…，大于 3.14，输出 True。注意 sqrt 的结果总是浮点型。",
   "difficulty": 1
  },
  {
   "id": "mcq-l6-012",
   "level": 6,
   "topic": "time",
   "q": "下列关于 time 模块常用函数的说法，正确的是____。",
   "opts": [
    "time.time() 返回当前时间的字符串",
    "time.sleep(2) 可以使程序快进 2 秒",
    "time.time() 返回从 1970 年 1 月 1 日 0 时到当前时刻的秒数（浮点数），time.sleep(2) 使程序暂停 2 秒",
    "time.sleep() 会结束整个程序"
   ],
   "ans": 2,
   "exp": "time.time() 返回时间戳（1970 年至今的浮点秒数）；time.sleep(秒数) 使程序暂停指定秒数，常用于控制执行节奏，并非加速或退出程序。",
   "difficulty": 1
  },
  {
   "id": "mcq-l6-013",
   "level": 6,
   "topic": "strftime",
   "q": "执行 `time.strftime('%Y-%m-%d %H:%M:%S')`，输出结果形如____。",
   "opts": [
    "2026/9/25 14:30",
    "Friday",
    "14:30 2026-09-25",
    "2026-09-25 14:30:05"
   ],
   "ans": 3,
   "exp": "strftime 按格式符生成时间字符串：%Y 是四位年份，%m、%d 是两位月、日，%H:%M:%S 是两位时分秒（不足补零），格式串中的 - 和 : 原样输出，故形如 2026-09-25 14:30:05。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-014",
   "level": 6,
   "topic": "calendar",
   "q": "有如下程序：\nimport calendar\nprint(calendar.isleap(2024), calendar.isleap(2023))\n输出结果是____。",
   "opts": [
    "False False",
    "True False",
    "True True",
    "False True"
   ],
   "ans": 1,
   "exp": "isleap(y) 判断 y 是否为闰年（能被 4 整除但不能被 100 整除，或能被 400 整除）。2024 是闰年、2023 不是，输出 True False。",
   "difficulty": 1
  },
  {
   "id": "mcq-l6-015",
   "level": 6,
   "topic": "turtle",
   "q": "有如下程序（turtle 画笔初始位于画布中心、朝向右方）：\nimport turtle\nt = turtle.Pen()\nt.forward(100)\nt.left(90)\nt.forward(100)\n程序执行后，画笔相对起点的位置是____。",
   "opts": [
    "位于起点正右方 200 处",
    "回到起点",
    "先向右前进 100，左转 90 度后向上前进 100，最终位于起点正上方 100 处",
    "位于起点正下方 100 处"
   ],
   "ans": 2,
   "exp": "forward(100) 沿当前方向（向右）前进，left(90) 使画笔逆时针左转 90 度改为朝上，再前进 100，最终停在起点上方 100 处。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-016",
   "level": 6,
   "topic": "turtle",
   "q": "下列关于 turtle 画笔状态的说法，正确的是____。",
   "opts": [
    "penup() 抬笔后移动画笔不留痕迹，pendown() 落笔后移动才画线",
    "penup() 之后移动画笔仍会画出线条",
    "pendown() 的作用是抬起画笔停止画线",
    "goto(x, y) 只能改变画笔的方向，不能改变画笔的位置"
   ],
   "ans": 0,
   "exp": "penup() 抬笔，之后的移动不画线；pendown() 落笔，之后移动才画线；goto(x, y) 使画笔直接移动到坐标 (x, y) 处（抬笔状态下移动不留痕迹）。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-017",
   "level": 6,
   "topic": "jieba",
   "q": "有如下程序：\nimport jieba\ns = jieba.lcut('我爱人工智能')\nprint(len(s))\n下列说法正确的是____。",
   "opts": [
    "jieba.lcut 返回生成器，len 会报错",
    "jieba.lcut 把中文句子切分成词语组成的列表，len 输出列表中词语的个数",
    "jieba.lcut 返回一个字符串，len 求字符串长度",
    "程序报错，中文句子无法分词"
   ],
   "ans": 1,
   "exp": "jieba.lcut(s) 对中文文本分词并返回由词语组成的列表（jieba.cut 才返回生成器），len 统计的是列表中词语的个数。",
   "difficulty": 1
  },
  {
   "id": "mcq-l6-018",
   "level": 6,
   "topic": "wordcloud",
   "q": "使用 wordcloud 库由文本生成词云图片的基本流程是____。",
   "opts": [
    "把文本文件路径直接赋值给变量即可自动生成图片",
    "先调用 to_file() 保存，再调用 generate() 生成词云",
    "词云必须配合 turtle 库才能显示出来",
    "先创建 WordCloud 对象，调用 generate(文本) 生成词云，再用 to_file(文件名) 把词云保存为图片"
   ],
   "ans": 3,
   "exp": "标准流程：wc = WordCloud(参数) 创建对象 → wc.generate(text) 根据文本生成词云 → wc.to_file('wc.png') 输出图片文件，顺序不能颠倒。",
   "difficulty": 2
  },
  {
   "id": "mcq-l6-019",
   "level": 6,
   "topic": "openpyxl",
   "q": "使用 openpyxl 读取已有 Excel 文件 score.xlsx 中 A1 单元格的值，下列代码正确的是____。",
   "opts": [
    "wb = open('score.xlsx')，然后 print(wb.A1.value)",
    "wb = load_workbook('score.xlsx')，然后直接 print(wb['A1'])",
    "ws = Workbook('score.xlsx')，然后 print(ws['A1'])",
    "wb = load_workbook('score.xlsx')，ws = wb.active，然后 print(ws['A1'].value)"
   ],
   "ans": 3,
   "exp": "读取流程：load_workbook(文件名) 打开工作簿，wb.active 取得当前工作表，ws['A1'].value 取单元格的值；open 是文件操作函数，Workbook 用于新建工作簿，都不能读取已有文件，且单元格的值要取 .value。",
   "difficulty": 3
  },
  {
   "id": "mcq-l6-020",
   "level": 6,
   "topic": "Pillow",
   "q": "有如下程序（当前目录下存在图片 pic.png）：\nfrom PIL import Image\nim = Image.open('pic.png')\nprint(im.size)\nim.save('new.jpg')\n下列说法正确的是____。",
   "opts": [
    "im.size 返回图片文件的大小（字节数）",
    "im.size 返回由图片宽度和高度组成的元组，save 把图片另存为 new.jpg",
    "程序报错，png 格式的图片不能保存为 jpg",
    "Image.open 会直接在屏幕上显示图片"
   ],
   "ans": 1,
   "exp": "im.size 是 (宽, 高) 形式的元组；save(路径) 按扩展名转换格式并保存，PNG 可以另存为 JPG；要在屏幕上显示图片应使用 im.show()。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-001",
   "level": 7,
   "topic": "正则元字符",
   "q": "正则表达式中，能匹配任意一个数字字符（0~9）的是____。",
   "opts": [
    "\\d",
    "\\w",
    "\\s",
    "."
   ],
   "ans": 0,
   "exp": "\\d 匹配一个数字字符；\\w 匹配字母、数字或下划线，\\s 匹配一个空白字符，. 匹配除换行符外的任意单个字符。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-002",
   "level": 7,
   "topic": "正则量词",
   "q": "关于正则表达式中的量词 * 和 +，下列说法正确的是____。",
   "opts": [
    "* 匹配 1 次或多次，+ 匹配 0 次或多次",
    "* 和 + 的功能完全相同",
    "* 匹配前面的字符 0 次或多次，+ 匹配前面的字符 1 次或多次",
    "* 只能匹配数字，+ 只能匹配字母"
   ],
   "ans": 2,
   "exp": "x* 表示 x 出现 0 次或多次，x+ 表示 x 出现 1 次或多次；量词作用于它前面的字符或分组，与字符种类无关。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-003",
   "level": 7,
   "topic": "正则量词",
   "q": "有如下程序：\nimport re\nprint(re.findall(r'go?d', 'gd god good'))\n输出结果是____。",
   "opts": [
    "['gd', 'god', 'good']",
    "['gd', 'god']",
    "['god', 'good']",
    "['good']"
   ],
   "ans": 1,
   "exp": "量词 ? 表示前面的字符出现 0 次或 1 次，o? 即 o 可有可无，故能匹配 gd 和 god；good 中有两个 o，无法匹配。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-004",
   "level": 7,
   "topic": "正则锚点",
   "q": "有如下程序：\nimport re\nprint(re.findall(r'^\\w+$', 'hello'))\nprint(re.findall(r'^\\w+$', 'hello world'))\n输出结果是____。",
   "opts": [
    "第一行 ['hello']，第二行 []",
    "第一行 []，第二行 ['hello world']",
    "两行都输出 ['hello']",
    "两行都报错"
   ],
   "ans": 0,
   "exp": "^ 匹配字符串开头，$ 匹配字符串结尾，^\\w+$ 要求整个字符串都由字母数字下划线组成：'hello' 整体匹配，'hello world' 中含空格不能整体匹配，findall 返回空列表 []。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-005",
   "level": 7,
   "topic": "match 与 search",
   "q": "下列关于 re.match() 与 re.search() 的说法，正确的是____。",
   "opts": [
    "两者都从字符串的任意位置开始查找",
    "两者都要求匹配整个字符串",
    "re.match() 只从字符串开头进行匹配，re.search() 会扫描整个字符串并返回第一个匹配",
    "re.match() 返回所有匹配的结果，re.search() 只返回一个匹配"
   ],
   "ans": 2,
   "exp": "match 只在字符串开头尝试匹配，开头不匹配就返回 None；search 从头到尾扫描，返回第一个匹配对象。返回所有匹配结果的是 findall。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-006",
   "level": 7,
   "topic": "findall",
   "q": "`re.findall(r'\\d+', 'a1b22c333')` 的返回结果是____。",
   "opts": [
    "['a', 'b', 'c']",
    "'122333'",
    "['1b22c333']",
    "['1', '22', '333']"
   ],
   "ans": 3,
   "exp": "findall 返回字符串中所有与模式匹配的子串组成的列表，\\d+ 匹配一串连续数字，得到 ['1', '22', '333']。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-007",
   "level": 7,
   "topic": "sub",
   "q": "有如下程序：\nimport re\nprint(re.sub(r'\\d+', '*', 'a1b22c333'))\n输出结果是____。",
   "opts": [
    "a*b*c*",
    "*1b22c333",
    "['*', '*', '*']",
    "a*b*c"
   ],
   "ans": 0,
   "exp": "sub(模式, 替换串, 原串) 把原串中所有匹配的子串都替换为指定内容，末尾的 333 也被替换成 *，输出 a*b*c*；漏掉末尾替换是常见错误。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-008",
   "level": 7,
   "topic": "贪婪与非贪婪",
   "q": "有如下程序：\nimport re\nprint(re.findall(r'a.*b', 'a1ba2b'))\nprint(re.findall(r'a.*?b', 'a1ba2b'))\n输出结果是____。",
   "opts": [
    "第一行 ['a1b', 'a2b']，第二行 ['a1b', 'a2b']",
    "第一行 ['a1ba2b']，第二行 ['a1ba2b']",
    "第一行 ['a1b', 'a2b']，第二行 ['a1ba2b']",
    "第一行 ['a1ba2b']，第二行 ['a1b', 'a2b']"
   ],
   "ans": 3,
   "exp": "量词 * 默认贪婪，尽可能多地匹配，a.*b 一次匹配到 a1ba2b；在量词后加 ? 变为非贪婪，尽可能少地匹配，得到 a1b 和 a2b 两个结果。",
   "difficulty": 3
  },
  {
   "id": "mcq-l7-009",
   "level": 7,
   "topic": "类与对象",
   "q": "下列关于类与对象的说法，错误的是____。",
   "opts": [
    "__init__ 方法在创建对象时自动执行，用于初始化对象的属性",
    "修改一个对象的实例属性会影响该类的其他对象，因为实例属性被所有实例共享",
    "类中方法的第一个参数习惯上命名为 self，代表当前对象本身",
    "创建对象的过程称为实例化，如 s = Student() 就是实例化"
   ],
   "ans": 1,
   "exp": "实例属性属于各个对象自己，互相独立，修改一个对象的实例属性不影响其他对象，B 错误；被所有实例共享的是类属性（定义在类中、方法之外）。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-010",
   "level": 7,
   "topic": "实例化",
   "q": "有如下程序：\nclass Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n    def info(self):\n        return self.name + ':' + str(self.score)\n\ns = Student('李明', 90)\nprint(s.info())\n输出结果是____。",
   "opts": [
    "name:score",
    "程序报错",
    "李明:90",
    "李明"
   ],
   "ans": 2,
   "exp": "实例化时 __init__ 自动执行，把 '李明' 和 90 存为对象属性；s.info() 中 self 绑定到 s，拼接输出 李明:90。调用方法时 self 由 Python 自动传入。",
   "difficulty": 3
  },
  {
   "id": "mcq-l7-011",
   "level": 7,
   "topic": "继承",
   "q": "有如下程序：\nclass A:\n    def hello(self):\n        return 'A'\n\nclass B(A):\n    def hello(self):\n        return 'B' + super().hello()\n\nprint(B().hello())\n输出结果是____。",
   "opts": [
    "A",
    "B",
    "BA",
    "程序报错"
   ],
   "ans": 2,
   "exp": "B 继承 A；B 中重写了 hello 方法，其中 super().hello() 调用父类 A 的版本得 'A'，与 'B' 拼接后输出 BA。",
   "difficulty": 3
  },
  {
   "id": "mcq-l7-012",
   "level": 7,
   "topic": "sqlite3",
   "q": "使用 sqlite3 模块操作 SQLite 数据库的基本步骤，下列顺序正确的是____。",
   "opts": [
    "创建游标 → 连接数据库 → 关闭连接 → 执行 SQL",
    "执行 SQL → 连接数据库 → 获取结果 → 创建游标",
    "连接数据库 → 执行 SQL → 创建游标 → 关闭连接",
    "连接数据库 → 创建游标 → 执行 SQL → 获取结果 → 关闭连接"
   ],
   "ans": 3,
   "exp": "标准流程：sqlite3.connect(文件名) 建立连接，conn.cursor() 创建游标，cursor.execute(SQL) 执行语句，用 fetchone()/fetchall() 获取结果，最后 conn.close() 关闭连接。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-013",
   "level": 7,
   "topic": "sqlite3",
   "q": "数据库 test.db 的表 t 中共有 3 条记录。有如下程序：\nimport sqlite3\nconn = sqlite3.connect('test.db')\ncur = conn.cursor()\ncur.execute('SELECT * FROM t')\nrows = cur.fetchall()\nprint(len(rows))\nconn.close()\n输出结果是____。",
   "opts": [
    "1",
    "3",
    "0",
    "程序报错"
   ],
   "ans": 1,
   "exp": "fetchall() 取回结果集中的全部记录，组成的列表长度等于记录条数 3；fetchone() 每次只取一条记录。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-014",
   "level": 7,
   "topic": "json",
   "q": "有如下程序：\nimport json\ns = '{\"a\": 1, \"b\": [2, 3]}'\nd = json.loads(s)\nprint(d['b'][1])\nprint(type(d))\n输出结果是____。",
   "opts": [
    "第一行 3，第二行 <class 'dict'>",
    "第一行 2，第二行 <class 'list'>",
    "程序报错",
    "第一行 3，第二行 <class 'str'>"
   ],
   "ans": 0,
   "exp": "json.loads 把 JSON 字符串解析成 Python 对象：JSON 对象对应字典、JSON 数组对应列表。d['b'] 是 [2, 3]，下标 1 的元素是 3，d 的类型是字典。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-015",
   "level": 7,
   "topic": "RESTful",
   "q": "关于 RESTful 风格的网络接口，下列说法正确的是____。",
   "opts": [
    "RESTful 接口中，GET 请求用于创建新资源，POST 请求用于查询资源",
    "RESTful 用 URL 表示资源，用 GET/POST/PUT/DELETE 等 HTTP 方法表示对资源的查询、创建、更新、删除操作",
    "RESTful 要求所有请求都使用 GET 方法完成",
    "RESTful 是 Python 特有的协议，其他编程语言无法使用"
   ],
   "ans": 1,
   "exp": "RESTful 以资源为中心设计 URL，用标准 HTTP 方法表达操作语义：GET 查询、POST 创建、PUT 更新、DELETE 删除；它与编程语言无关。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-016",
   "level": 7,
   "topic": "Flask 路由",
   "q": "有如下 Flask 程序：\nfrom flask import Flask\napp = Flask(__name__)\n\n@app.route('/hello')\ndef hello():\n    return 'hi'\n\napp.run()\n程序运行后，在浏览器中访问 http://127.0.0.1:5000/hello，页面显示的内容是____。",
   "opts": [
    "404 页面，因为路由不存在",
    "hello",
    "hi",
    "程序报错，Flask 必须搭配数据库才能运行"
   ],
   "ans": 2,
   "exp": "@app.route('/hello') 把 URL 路径 /hello 映射到函数 hello，访问该路径时返回函数的返回值 'hi'；页面显示的是函数结果而不是函数名。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-017",
   "level": 7,
   "topic": "matplotlib",
   "q": "有如下程序：\nimport matplotlib.pyplot as plt\nplt.plot([1, 2, 3], [2, 4, 6], label='line1')\nplt.legend()\nplt.show()\n下列说法正确的是____。",
   "opts": [
    "plt.plot 绘制折线图，label 设置图例文字，plt.legend() 显示图例，plt.show() 弹出窗口显示图形",
    "plt.plot 绘制的是柱状图",
    "删去 plt.show() 图形也会自动弹出窗口",
    "plt.legend() 的作用是把图形保存为图片文件"
   ],
   "ans": 0,
   "exp": "plot 画折线图（bar 画柱状图、pie 画饼图），legend 显示由 label 标注的图例，show 显示绘图窗口；保存图片用 savefig，不调用 show 通常不会弹出窗口。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-018",
   "level": 7,
   "topic": "matplotlib",
   "q": "要用 matplotlib 展示各品牌手机的市场份额占比（各部分占整体的百分比），最合适的绘图函数是____。",
   "opts": [
    "plt.plot()",
    "plt.scatter()",
    "plt.bar()",
    "plt.pie()"
   ],
   "ans": 3,
   "exp": "pie 绘制饼图，适合表示各部分占整体的比例；plot 折线图适合表现变化趋势，bar 柱状图适合比较数量大小，scatter 散点图适合呈现分布与相关性。",
   "difficulty": 1
  },
  {
   "id": "mcq-l4-023",
   "level": 4,
   "topic": "递归调用次数",
   "q": "有如下程序：\ndef fib(n):\n    if n == 1 or n == 2:\n        return 1\n    return fib(n - 1) + fib(n - 2)\nprint(fib(5))\n程序运行结束后，函数 fib 共被调用的次数是____。",
   "opts": [
    "5",
    "7",
    "9",
    "15"
   ],
   "ans": 2,
   "exp": "直接数调用：fib(5) 调 1 次，引发 fib(4) 调 2 次、fib(3) 调 3 次、fib(2) 调 3 次、fib(1) 调 2 次，合计 9 次；5 是返回值而不是调用次数，15 是 fib(6) 规模的干扰项。这类双递归调用次数按 1+2+3+3 快速累加即可。",
   "difficulty": 3
  },
  {
   "id": "mcq-l4-024",
   "level": 4,
   "topic": "递归与循环等价",
   "q": "有如下递归函数（n 为正整数）：\ndef f(n):\n    if n == 1:\n        return 1\n    return n + f(n - 1)\n它的功能是计算 1+2+…+n。下列程序段中，与 f(n) 功能等价的是____。",
   "opts": [
    "s = 0\nfor i in range(1, n + 1):\n    s += i",
    "s = 0\nfor i in range(1, n):\n    s += i",
    "s = 0\ni = 1\nwhile i < n:\n    s += i\n    i += 1",
    "s = 0\nfor i in range(n):\n    s += i"
   ],
   "ans": 0,
   "exp": "range(1, n + 1) 恰好取到 1~n，累加得 1+2+…+n；其余三项都只累加到 n-1（B、C 漏了 n，D 取的是 0~n-1），以 n=4 验证：正确版得 10，三个错误版都得 6。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-025",
   "level": 4,
   "topic": "递归深度限制",
   "q": "有如下程序：\ndef f(n):\n    return f(n + 1)\nprint(f(1))\n运行结果是____。",
   "opts": [
    "1",
    "程序报错：超过最大递归深度，抛出 RecursionError",
    "程序陷入死循环，永远运行不停止",
    "0"
   ],
   "ans": 1,
   "exp": "f 没有终止条件，每层调用都开辟新的栈帧，达到系统允许的最大递归深度后抛出 RecursionError；Python 会主动限制递归深度，所以既不是输出 1，也不是永远不停的死循环。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-026",
   "level": 4,
   "topic": "sorted(key=)多级排序",
   "q": "有如下程序：\ndata = [('李明', 90), ('张伟', 85), ('王芳', 90)]\nprint(sorted(data, key=lambda t: (-t[1], t[0])))\n输出结果是____。",
   "opts": [
    "[('张伟', 85), ('李明', 90), ('王芳', 90)]",
    "[('王芳', 90), ('李明', 90), ('张伟', 85)]",
    "程序报错",
    "[('李明', 90), ('王芳', 90), ('张伟', 85)]"
   ],
   "ans": 3,
   "exp": "key 返回 (-分数, 姓名) 元组，先按分数降序（加负号），分数相同时再按姓名升序，因此 90 分的李明、王芳按姓名先后排在前面；A 是只按分数升序的结果，B 把同分的姓名顺序弄反了。",
   "difficulty": 3
  },
  {
   "id": "mcq-l4-027",
   "level": 4,
   "topic": "map+filter链式",
   "q": "有如下程序：\nnums = [1, 2, 3, 4, 5, 6]\nr = map(lambda x: x * x, filter(lambda x: x % 2 == 0, nums))\nprint(list(r))\n输出结果是____。",
   "opts": [
    "[4, 16, 36]",
    "[1, 4, 9, 16, 25, 36]",
    "[2, 4, 6]",
    "[1, 9, 25]"
   ],
   "ans": 0,
   "exp": "链式调用时数据先经过 filter：筛出偶数 2、4、6，再进入 map 平方得 4、16、36；B 是全部元素平方，C 只做了筛选没平方，D 是对奇数平方。",
   "difficulty": 2
  },
  {
   "id": "mcq-l4-028",
   "level": 4,
   "topic": "闭包",
   "q": "有如下程序：\ndef make_adder(n):\n    def add(x):\n        return x + n\n    return add\n\nf = make_adder(10)\nprint(f(5))\n输出结果是____。",
   "opts": [
    "5",
    "10",
    "15",
    "程序报错：n 在 add 中未定义"
   ],
   "ans": 2,
   "exp": "内层函数 add 引用了外层函数的局部变量 n，构成闭包：make_adder(10) 返回后 n=10 仍被记住，f(5) 即 5+10=15；闭包会保存外层变量，不会报 NameError。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-019",
   "level": 7,
   "topic": "正则分组提取",
   "q": "有如下程序：\nimport re\ns = '张三:90,李四:85'\nprint(re.findall(r'(\\w+):(\\d+)', s))\n输出结果是____。",
   "opts": [
    "['张三:90', '李四:85']",
    "[('张三', '90'), ('李四', '85')]",
    "[('90', '张三'), ('85', '李四')]",
    "[('张三', '90')]"
   ],
   "ans": 1,
   "exp": "findall 的模式中带分组时，返回的是由各分组匹配内容组成的元组的列表，元组内顺序与分组在模式中的先后一致：\\w+ 在前匹配姓名、\\d+ 在后匹配分数；不带分组时才返回整个匹配子串的列表。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-020",
   "level": 7,
   "topic": "正则命名分组",
   "q": "有如下程序：\nimport re\nm = re.search(r'(?P<y>\\d{4})-(?P<m>\\d{2})', '日期:2024-06')\nprint(m.group('y'), m.group('m'))\n输出结果是____。",
   "opts": [
    "y m",
    "2024-06 2024",
    "程序报错：search 不支持命名分组",
    "2024 06"
   ],
   "ans": 3,
   "exp": "(?P<名字>…) 给分组命名，匹配成功后可用 m.group('名字') 按名字取对应分组的内容：y 组是 2024、m 组是 06；要取整个匹配串 2024-06 应使用不带参数的 m.group()。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-021",
   "level": 7,
   "topic": "re.split",
   "q": "有如下程序：\nimport re\nprint(re.split(r'[,;]', 'a,b;c,d'))\n输出结果是____。",
   "opts": [
    "['a', 'b', 'c', 'd']",
    "['a,b;c,d']",
    "['a', 'b;c', 'd']",
    "['a,b', 'c,d']"
   ],
   "ans": 0,
   "exp": "re.split 按模式匹配到的每个位置切分字符串，字符组 [,;] 表示逗号或分号都是分隔符，得到 4 段；普通 str.split 一次只能按单一分隔符切，这正是正则 split 的优势。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-022",
   "level": 7,
   "topic": "re.sub反向引用",
   "q": "有如下程序：\nimport re\nprint(re.sub(r'(\\d{4})-(\\d{2})', r'\\2/\\1', '2024-06'))\n输出结果是____。",
   "opts": [
    "2024-06",
    "\\2/\\1",
    "06/2024",
    "2024/06"
   ],
   "ans": 2,
   "exp": "替换串中的 \\1、\\2 依次引用模式里第 1、2 个分组匹配到的内容：\\1 是 2024、\\2 是 06，故替换结果为 06/2024；若写成 \\1/\\2 才得到 2024/06，引用写反是常见错误。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-023",
   "level": 7,
   "topic": "正则手机号",
   "q": "要匹配中国大陆手机号：以 1 开头，第二位是 3~9 之间的数字，后面还有 9 位数字（共 11 位）。下列正则表达式正确的是____。",
   "opts": [
    "r'1[0-2]\\d{9}'",
    "r'1[3-9]\\d{9}'",
    "r'1[3-9]\\d{8}'",
    "r'\\d{9}'"
   ],
   "ans": 1,
   "exp": "字符组 [3-9] 限定第二位，后接 9 个 \\d，加上开头的 1 共 11 位；A 的第二位范围错为 0~2，C 总共只有 10 位，D 既不要求以 1 开头位数也不够。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-024",
   "level": 7,
   "topic": "非贪婪实战",
   "q": "有如下程序：\nimport re\ns = '<h1>标题一</h1><h1>标题二</h1>'\nprint(re.findall(r'<h1>(.*?)</h1>', s))\n输出结果是____。",
   "opts": [
    "['标题一', '标题二']",
    "['标题一</h1><h1>标题二']",
    "['标题一']",
    "['<h1>标题一</h1>', '<h1>标题二</h1>']"
   ],
   "ans": 0,
   "exp": ".*? 是非贪婪匹配，遇到最近的 </h1> 就结束本次匹配，因此分别取出两处标签内容；若用贪婪的 .* 会一直匹配到字符串中最后一个 </h1>，得到 ['标题一</h1><h1>标题二']。",
   "difficulty": 3
  },
  {
   "id": "mcq-l7-025",
   "level": 7,
   "topic": "sqlite3内存数据库",
   "q": "下列关于 `sqlite3.connect(':memory:')` 的说法，正确的是____。",
   "opts": [
    "在当前目录下创建名为 memory 的数据库文件",
    "该写法错误，connect 必须传入一个真实存在的文件名",
    "创建内存数据库，数据会自动永久保存到磁盘文件中",
    "创建内存数据库，数据只保存在内存中，程序结束后不会存入任何文件"
   ],
   "ans": 3,
   "exp": "':memory:' 表示在内存中建立临时数据库，读写快但不落盘，程序结束数据即消失；要持久保存必须 connect 一个真实的文件名，connect 并不要求该文件已存在。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-026",
   "level": 7,
   "topic": "sqlite3占位符",
   "q": "有如下程序：\nimport sqlite3\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.execute('CREATE TABLE t(name TEXT, score INTEGER)')\ncur.execute('INSERT INTO t VALUES (?, ?)', ('李明', 90))\ncur.execute('INSERT INTO t VALUES (?, ?)', ('张伟', 85))\nconn.commit()\ncur.execute('SELECT name FROM t WHERE score > ?', (86,))\nprint(cur.fetchall())\nconn.close()\n输出结果是____。",
   "opts": [
    "[('张伟',)]",
    "[('李明',)]",
    "[('李明', 90)]",
    "[]"
   ],
   "ans": 1,
   "exp": "? 占位符由参数元组提供值，(86,) 是只含一个元素的元组；查询分数大于 86 的记录只有李明 90 满足，且 SELECT 只取 name 列，故结果为 [('李明',)]；参数必须写成元组 (86,)，写成 (86) 会报错。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-027",
   "level": 7,
   "topic": "sqlite3返回值形态",
   "q": "SQLite 数据库表 t 有两列：name(TEXT)、score(INTEGER)，共 2 条记录。执行 `cur.execute('SELECT * FROM t')` 后，`cur.fetchall()` 的返回值是____。",
   "opts": [
    "列表，每个元素是一个元组，如 [('李明', 90), ('张伟', 85)]",
    "字典，键为列名、值为该列的所有数据",
    "一个元组，按顺序装着所有记录的全部字段值",
    "字符串，所有记录拼接成一个长字符串"
   ],
   "ans": 0,
   "exp": "fetchall 返回由记录组成的列表，每条记录是一个元组，元组元素与 SELECT 的列一一对应；fetchone 返回的则是单个这样的元组，没有记录时返回 None。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-028",
   "level": 7,
   "topic": "sqlite3事务",
   "q": "下列关于 sqlite3 中 commit 与 rollback 的说法，正确的是____。",
   "opts": [
    "执行 INSERT 后不调用 conn.commit()，数据也会自动永久保存到数据库文件",
    "conn.rollback() 可以撤销已经 commit 并保存到文件中的更改",
    "conn.rollback() 可以撤销自上一次 commit 之后尚未提交的更改",
    "SELECT 查询的结果也必须先 commit 才能读取"
   ],
   "ans": 2,
   "exp": "增删改操作只有 commit 后才真正写入数据库文件，rollback 撤销的是自上次 commit 以来尚未提交的更改；已提交的更改无法用 rollback 撤销，查询操作不需要 commit。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-029",
   "level": 7,
   "topic": "sqlite3防注入",
   "q": "变量 name 中存放着用户输入的用户名，要查询该用户的记录并防止 SQL 注入，下列写法正确的是____。",
   "opts": [
    "cur.execute(\"SELECT * FROM users WHERE name = '\" + name + \"'\")",
    "cur.execute(f'SELECT * FROM users WHERE name = {name}')",
    "cur.execute(\"SELECT * FROM users WHERE name = '%s'\" % name)",
    "cur.execute('SELECT * FROM users WHERE name = ?', (name,))"
   ],
   "ans": 3,
   "exp": "? 占位符加参数元组是参数化查询，用户输入只会被当作数据而不会拼进 SQL 语句，可防止注入；其余三种都把输入直接拼接进 SQL，攻击者可构造形如 ' OR '1'='1 的输入篡改语句。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-030",
   "level": 7,
   "topic": "sqlite3游标消费",
   "q": "数据库 test.db 的表 t 中共有 3 条记录，id 依次为 1、2、3。有如下程序：\nimport sqlite3\nconn = sqlite3.connect('test.db')\ncur = conn.cursor()\ncur.execute('SELECT id FROM t')\nr1 = cur.fetchone()\nr2 = cur.fetchall()\nprint(r1, len(r2))\nconn.close()\n输出结果是____。",
   "opts": [
    "(1,) 2",
    "(1,) 3",
    "1 2",
    "[(1,), (2,), (3,)] 0"
   ],
   "ans": 0,
   "exp": "游标读取结果像指针逐条下移：fetchone 取走第 1 条得 (1,)，fetchall 只能取到剩余的第 2、3 条共 2 条；已被取走的部分不会重复返回，所以 len(r2) 是 2 而不是 3。",
   "difficulty": 3
  },
  {
   "id": "mcq-l7-031",
   "level": 7,
   "topic": "类属性与实例属性",
   "q": "有如下程序：\nclass A:\n    count = 0\n    def __init__(self):\n        A.count += 1\n\na = A()\nb = A()\nc = A()\nprint(A.count)\n输出结果是____。",
   "opts": [
    "0",
    "1",
    "3",
    "程序报错"
   ],
   "ans": 2,
   "exp": "count 定义在类中、方法之外，是类属性，被所有实例共享；每创建一个对象 __init__ 就执行一次，A.count 加 1，共实例化 3 次后输出 3；若写成 self.count = 0 则是各实例独立的实例属性。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-032",
   "level": 7,
   "topic": "self绑定",
   "q": "有如下程序：\nclass P:\n    def get(self):\n        return self.v\n\np = P()\np.v = 5\nprint(p.get())\n下列关于该程序中 self 的说法，正确的是____。",
   "opts": [
    "调用 p.get() 时必须写成 p.get(p)，手动把对象传给 self",
    "p.get() 等价于 P.get(p)，Python 自动把对象 p 传给第一个参数 self",
    "self 是 Python 的关键字，方法中第一个参数必须叫 self，改名会报错",
    "self 代表类本身，一个类的所有方法共享同一个 self"
   ],
   "ans": 1,
   "exp": "通过对象调用方法时，Python 自动把该对象绑定到方法的第一个参数，p.get() 就是 P.get(p)，输出 5；self 只是约定俗成的名字并非关键字；self 代表当前对象而不是类。",
   "difficulty": 2
  },
  {
   "id": "mcq-l7-033",
   "level": 7,
   "topic": "多继承与MRO",
   "q": "下列关于 Python 多继承与方法查找顺序（MRO）的说法，错误的是____。",
   "opts": [
    "Python 允许一个类同时继承多个父类，如 class C(A, B)",
    "MRO 顺序是随机确定的，每次程序运行都可能不同",
    "当多个父类中有同名方法时，Python 按 MRO 顺序查找，默认从左到右",
    "可以通过 `类名.__mro__` 查看某个类的方法查找顺序"
   ],
   "ans": 1,
   "exp": "多继承的 MRO 由 C3 算法确定，是一个固定不变的顺序，可用 类名.__mro__ 查看，并非随机产生；同名方法按该顺序从左到右查找，先找到谁就用谁，B 说法错误。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-034",
   "level": 7,
   "topic": "matplotlib plot参数",
   "q": "有如下程序：\nimport matplotlib.pyplot as plt\nplt.plot([1, 2, 3], [4, 5, 6])\nplt.show()\n下列说法正确的是____。",
   "opts": [
    "第一个列表是 y 坐标，第二个列表是 x 坐标",
    "这两个列表会被绘制成两组柱状图",
    "第一个列表作为各点的 x 坐标，第二个列表作为 y 坐标，绘制出一条折线",
    "plot 只能接收一个列表参数，传两个列表会报错"
   ],
   "ans": 2,
   "exp": "plt.plot(x, y) 的第一个参数是 x 坐标列表、第二个是 y 坐标列表，把点 (1,4)、(2,5)、(3,6) 连成折线；只传一个列表时它才被当作 y 值，x 默认取 0、1、2…。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-035",
   "level": 7,
   "topic": "matplotlib子图",
   "q": "语句 `plt.subplot(2, 2, 1)` 的作用是____。",
   "opts": [
    "把当前图划分为 2 个子图，编号分别为 2 和 1",
    "设置整个画布的大小为 2×2 英寸",
    "绘制一个包含 22 个子图的图形",
    "把画布划分为 2 行 2 列共 4 个子图区域，并选定第 1 个（左上角）作为当前绘图区"
   ],
   "ans": 3,
   "exp": "subplot 的三个参数依次是行数、列数、当前子图编号，编号从 1 开始按行优先排列，(2,2,1) 即选中 2×2 网格的左上角区域；绘图后仍用 plt.legend() 显示图例、plt.show() 显示窗口。",
   "difficulty": 1
  },
  {
   "id": "mcq-l7-036",
   "level": 7,
   "topic": "json.dumps参数",
   "q": "有如下程序：\nimport json\nd = {'name': '李明', 'score': 90}\ns = json.dumps(d, ensure_ascii=False, indent=4)\n下列说法正确的是____。",
   "opts": [
    "输出中 '李明' 会显示为 \\u674e\\u660e 这样的转义形式",
    "变量 s 的类型是 dict",
    "indent 参数无效，结果仍是单行紧凑字符串",
    "ensure_ascii=False 使中文按原字符输出而不转义成 \\uXXXX，indent=4 让结果按 4 个空格缩进分层换行"
   ],
   "ans": 3,
   "exp": "默认 ensure_ascii=True 会把非 ASCII 字符转成 \\uXXXX 转义，ensure_ascii=False 保持中文原样；indent 指定缩进的空格数并引入换行，本例输出为多行带 4 空格缩进的 JSON 文本；dumps 的返回值是 str 类型的 JSON 字符串，不是 dict。",
   "difficulty": 1
  },
  {
   "id": "p27-m1",
   "level": 1,
   "topic": "标识符与关键字",
   "difficulty": 1,
   "q": "下面____选项是无效的 Python 对象命名。",
   "opts": [
    "_private_var",
    "global",
    "CapitalCase",
    "utf8_编码"
   ],
   "ans": 1,
   "exp": "global 是 Python 关键字（声明全局变量用），不能作为变量名。下划线开头、大写驼峰、中文数字组合都合法。"
  },
  {
   "id": "p27-m2",
   "level": 3,
   "topic": "字符串切片",
   "difficulty": 2,
   "q": "name = \"Python语言程序设计\"，结果为“thon语言程序”的代码是_______。",
   "opts": [
    "print(name[2: -2])",
    "print(name[2: -3])",
    "print(name[3: -2])",
    "print(name[3: -3])"
   ],
   "ans": 0,
   "exp": "'thon语言程序' 从索引 2（t）到倒数第 2 个字符（含）结束，即 name[2:-2]。注意中文与英文都按一个字符计。"
  },
  {
   "id": "p27-m3",
   "level": 3,
   "topic": "列表解析式",
   "difficulty": 1,
   "q": "与 [x * 2 for x in range(5) if x % 2 == 0] 结果相同的列表是_________。",
   "opts": [
    "[0, 2, 4, 6, 8]",
    "[0, 4]",
    "[0, 4, 8]",
    "[0, 2, 4]"
   ],
   "ans": 2,
   "exp": "range(5) 中偶数为 0、2、4，翻倍后 [0, 4, 8]。"
  },
  {
   "id": "p27-m4",
   "level": 3,
   "topic": "元组",
   "difficulty": 1,
   "q": "关于 Python 元组的基本特性，以下说法正确的是________。",
   "opts": [
    "元组创建后可以使用append()方法添加新元素",
    "元组可以包含不同类型的元素",
    "元组中的元素可以通过索引重新赋值",
    "使用花括号{}定义空元组"
   ],
   "ans": 1,
   "exp": "元组不可变：没有 append、不能重新赋值；空元组是 () 而不是 {}（{} 是空字典）；但元组内可以放任意不同类型的元素。"
  },
  {
   "id": "p27-m5",
   "level": 3,
   "topic": "字典遍历",
   "difficulty": 2,
   "q": "执行程序代码：\nfruit_dict = {\"apple\": 5, \"banana\": 3, \"orange\": 8}\nfor k, v in fruit_dict.items():\n    print(f\"{v}个{k}\", end=\", \")\n运行结果为_______。",
   "opts": [
    "5个apple, 3个banana, 8个orange,",
    "apple:5, banana:3, orange:8,",
    "('apple', 5), ('banana', 3), ('orange', 8),",
    "报错：ValueError: too many values to unpack"
   ],
   "ans": 0,
   "exp": "items() 把每个键值对解包为 k、v；f\"{v}个{k}\" 输出 5个apple 等，end=\", \" 使输出同行逗号分隔。"
  },
  {
   "id": "p27-m6",
   "level": 2,
   "topic": "if-else 分支",
   "difficulty": 1,
   "q": "在 Python 的条件分支结构中，关于 else 语句的描述正确的是_______。",
   "opts": [
    "必须与if或elif配对使用",
    "可以独立于if语句单独使用",
    "一个分支结构中允许存在多个else块",
    "else语句行也可以有分支条件"
   ],
   "ans": 0,
   "exp": "else 必须与 if/elif 配对，且一个 if 结构最多一个 else；else 后不能带条件（带条件的是 elif）。"
  },
  {
   "id": "p27-m7",
   "level": 2,
   "topic": "range 与循环次数",
   "difficulty": 1,
   "q": "执行以下代码，循环体中的 print 语句会运行_______次。\nfor i in range(3, 10, 2):\n    print(i)",
   "opts": [
    "3",
    "5",
    "6",
    "4"
   ],
   "ans": 3,
   "exp": "range(3, 10, 2) 产生 3、5、7、9，共 4 个值（含头不含尾）。"
  },
  {
   "id": "p27-m8",
   "level": 4,
   "topic": "lambda 与默认参数",
   "difficulty": 2,
   "q": "运行 print(f(3)) 打印结果为 9 的前一句代码为_______。",
   "opts": [
    "f = lambda x, y=2: x ** y",
    "f = lambda x: x *2",
    "f = lambda x, y: x ** y",
    "f = lambda x**2: x"
   ],
   "ans": 0,
   "exp": "A 中 y 有默认值 2，f(3) 即 3**2=9；B 得 6；C 缺第二个参数会报错；D 的 lambda 参数语法非法。"
  },
  {
   "id": "p27-m9",
   "level": 5,
   "topic": "文件打开模式",
   "difficulty": 1,
   "q": "以下_______模式打开文件时，会清空原文件内容。\nf = open('data.txt', _______)\nf.write('new content')\nf.close()",
   "opts": [
    "'r'",
    "'a'",
    "'x'",
    "'w'"
   ],
   "ans": 3,
   "exp": "'w' 模式打开即清空原文件再写入；'a' 追加保留原内容；'r' 只读；'x' 新建文件、已存在则报错。"
  },
  {
   "id": "p27-m10",
   "level": 1,
   "topic": "程序设计方法与计算思维",
   "difficulty": 2,
   "q": "在设计一个学生成绩管理程序时，以下_______分解方式最合理。",
   "opts": [
    "将整个程序分解为输入、处理、输出三个模块，其中处理模块又包括计算平均分、最高分、排序等功能",
    "将程序分解为数学运算模块、字符串处理模块、文件存储模块",
    "按照学生姓名、学号、成绩等数据分别建立独立模块",
    "尽可能设计一个函数完成所有功能"
   ],
   "ans": 0,
   "exp": "自顶向下、按功能（输入-处理-输出）分解，处理模块再细分，是结构化程序设计的标准思想。"
  }
 ],
 "blanks": [
  {
   "id": "blk-l3-008",
   "level": 3,
   "title": "冒泡排序填空",
   "desc": "输入一行若干个整数（用空格分隔），程序使用冒泡排序将其升序排列后输出（同一行，空格分隔）。请补全程序中的 3 处空白。",
   "code": "nums = [int(v) for v in input().split()]\nn = len(nums)\nfor i in ___(1)___:\n    for j in ___(2)___:\n        if nums[j] > nums[j + 1]:\n            ___(3)___\nprint(' '.join(str(v) for v in nums))",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "range(n - 1)",
      "range(n-1)"
     ],
     "hint": "n 个数最多需要 n-1 趟"
    },
    {
     "n": 2,
     "answers": [
      "range(n - 1 - i)",
      "range(n-1-i)",
      "range(n - i - 1)",
      "range(n-i-1)"
     ],
     "hint": "第 i 趟时后面已有 i 个元素排好，内层只需比较到 n-1-i"
    },
    {
     "n": 3,
     "answers": [
      "nums[j], nums[j + 1] = nums[j + 1], nums[j]",
      "nums[j], nums[j+1] = nums[j+1], nums[j]",
      "nums[j + 1], nums[j] = nums[j], nums[j + 1]",
      "nums[j+1], nums[j] = nums[j], nums[j+1]"
     ],
     "hint": "相邻两个元素逆序时交换：把 nums[j] 与 nums[j+1] 互换"
    }
   ],
   "stdin": "5 2 8 1 9\n",
   "expected": "1 2 5 8 9",
   "ref": "nums = [int(v) for v in input().split()]\nn = len(nums)\nfor i in range(n - 1):\n    for j in range(n - 1 - i):\n        if nums[j] > nums[j + 1]:\n            nums[j], nums[j + 1] = nums[j + 1], nums[j]\nprint(' '.join(str(v) for v in nums))",
   "hint": "外层控制趟数，内层比较范围随 i 递减；交换可用多重赋值 a, b = b, a。",
   "exp": "考查冒泡排序的双重循环边界（外层趟数、内层随 i 收缩）与相邻元素交换语句。"
  },
  {
   "id": "blk-l2-008",
   "level": 2,
   "title": "除法除零防护填空",
   "desc": "输入两个整数 a、b（每行一个），程序计算并输出 a÷b 的商。为防止程序崩溃，用 try-except 做防护：若 b 为 0，捕获 ZeroDivisionError，输出 除数不能为零！；若输入的内容不能转换成整数，捕获 ValueError，输出 请输入整数！。请补全程序中的 3 处空白。",
   "code": "try:\n    a = int(input())\n    b = int(input())\n    ___(1)___\n___(2)___\n    print('除数不能为零！')\n___(3)___\n    print('请输入整数！')",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "print(a / b)",
      "print(a/b)"
     ],
     "hint": "在 try 子句中输出 a 除以 b 的商"
    },
    {
     "n": 2,
     "answers": [
      "except ZeroDivisionError:"
     ],
     "hint": "捕获除零异常，注意结尾的冒号"
    },
    {
     "n": 3,
     "answers": [
      "except ValueError:"
     ],
     "hint": "捕获类型转换失败异常，注意结尾的冒号"
    }
   ],
   "stdin": "8\n0\n",
   "expected": "除数不能为零！",
   "ref": "try:\n    a = int(input())\n    b = int(input())\n    print(a / b)\nexcept ZeroDivisionError:\n    print('除数不能为零！')\nexcept ValueError:\n    print('请输入整数！')",
   "hint": "可能出错的除法语句放在 try 中；每个 except 子句写成 except 异常类型: 的形式。",
   "exp": "考查 try-except 异常处理结构：int() 转换失败触发 ValueError，除数为 0 触发 ZeroDivisionError，分别在不同 except 分支中给出提示。"
  },
  {
   "id": "blk-l4-008",
   "level": 4,
   "title": "二分查找填空",
   "desc": "输入两行：第一行为一组按升序排列的整数（用空格分隔），第二行为要查找的目标值。程序用 while 循环实现二分查找：找到则输出其下标（从 0 开始），找不到输出 -1。请补全程序中的 4 处空白。",
   "code": "nums = [int(v) for v in input().split()]\nx = int(input())\nlow, high = 0, ___(1)___\nidx = -1\nwhile ___(2)___:\n    mid = (low + high) // 2\n    if nums[mid] == x:\n        idx = mid\n        ___(3)___\n    elif nums[mid] < x:\n        low = ___(4)___\n    else:\n        high = mid - 1\nprint(idx)",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "len(nums) - 1",
      "len(nums)-1"
     ],
     "hint": "high 初始为最后一个元素的下标"
    },
    {
     "n": 2,
     "answers": [
      "low <= high"
     ],
     "hint": "查找区间还存在时继续（注意是 <=）"
    },
    {
     "n": 3,
     "answers": [
      "break"
     ],
     "hint": "找到目标后立即退出循环"
    },
    {
     "n": 4,
     "answers": [
      "mid + 1",
      "mid+1"
     ],
     "hint": "中间值比目标小，目标只可能在右半区间"
    }
   ],
   "stdin": "2 5 8 12 16 23 38 56 72 91\n23\n",
   "expected": "5",
   "ref": "nums = [int(v) for v in input().split()]\nx = int(input())\nlow, high = 0, len(nums) - 1\nidx = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if nums[mid] == x:\n        idx = mid\n        break\n    elif nums[mid] < x:\n        low = mid + 1\n    else:\n        high = mid - 1\nprint(idx)",
   "hint": "二分查找四要素：high 初值、low <= high、找到后 break、区间收缩方向。",
   "exp": "考查迭代二分查找的关键边界：循环条件 low <= high 与 low = mid + 1、high = mid - 1 的配合，漏写 +1/-1 会造成死循环。"
  },
  {
   "id": "blk-l1-001",
   "level": 1,
   "title": "三数求和与平均值",
   "desc": "输入三个整数（每行一个），输出它们的和与平均值，平均值保留 2 位小数。例如输入 3、5、10，输出两行：和为18 与 平均值为6.00。",
   "code": "a = int(input())\nb = int(input())\nc = int(input())\ntotal = ___(1)___\navg = ___(2)___\nprint('和为%d' % total)\nprint('平均值为%.2f' % ___(3)___)",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "a + b + c",
      "a+b+c"
     ],
     "hint": "把三个变量相加"
    },
    {
     "n": 2,
     "answers": [
      "total / 3",
      "total/3"
     ],
     "hint": "和除以 3，用 / 得到浮点数"
    },
    {
     "n": 3,
     "answers": [
      "avg"
     ],
     "hint": "输出平均值变量"
    }
   ],
   "stdin": "3\n5\n10\n",
   "expected": "和为18\n平均值为6.00",
   "hint": "/ 的结果是浮点数；%.2f 表示保留两位小数",
   "exp": "考查算术表达式、变量赋值与 % 格式化输出（%d 整数、%.2f 两位小数）。",
   "ref": "a = int(input())\nb = int(input())\nc = int(input())\ntotal = a + b + c\navg = total / 3\nprint('和为%d' % total)\nprint('平均值为%.2f' % avg)"
  },
  {
   "id": "blk-l1-002",
   "level": 1,
   "title": "交换两个变量",
   "desc": "输入两个整数 a、b（每行一个），先按原顺序输出，再交换后输出。输出格式形如：交换前: a=3, b=8 与 交换后: a=8, b=3。",
   "code": "a = int(input())\nb = int(input())\nprint('交换前: a=%d, b=%d' % (a, b))\na, b = ___(1)___\nprint('交换后: a=%d, b=%d' % (___(2)___, ___(3)___))",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "b, a",
      "b,a"
     ],
     "hint": "利用元组打包同时赋值"
    },
    {
     "n": 2,
     "answers": [
      "a"
     ],
     "hint": "交换后 a 中是原来的 b 的值"
    },
    {
     "n": 3,
     "answers": [
      "b"
     ],
     "hint": "交换后 b 中是原来的 a 的值"
    }
   ],
   "stdin": "3\n8\n",
   "expected": "交换前: a=3, b=8\n交换后: a=8, b=3",
   "hint": "a, b = b, a 是 Python 特有的同时赋值写法",
   "exp": "考查序列解包（元组赋值）交换变量与 % 格式化输出。",
   "ref": "a = int(input())\nb = int(input())\nprint('交换前: a=%d, b=%d' % (a, b))\na, b = b, a\nprint('交换后: a=%d, b=%d' % (a, b))"
  },
  {
   "id": "blk-l1-003",
   "level": 1,
   "title": "温度换算与表达式求值",
   "desc": "第一行输入华氏温度（可能是小数），按公式 摄氏 = (华氏 - 32) / 1.8 换算，输出形如：华氏100.0度=摄氏37.8度（均保留 1 位小数）。第二行输入一个算式字符串（如 2**10），用 eval 求值后输出：计算结果: 1024。",
   "code": "f = float(input())\nc = ___(1)___\nprint('华氏%.1f度=摄氏%.1f度' % (___(2)___, c))\ns = input()\nprint('计算结果:', ___(3)___(s))",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "(f - 32) / 1.8",
      "(f-32)/1.8",
      "(f - 32) * 5 / 9",
      "(f-32)*5/9"
     ],
     "hint": "按华氏转摄氏公式写表达式"
    },
    {
     "n": 2,
     "answers": [
      "f"
     ],
     "hint": "华氏温度就是变量 f"
    },
    {
     "n": 3,
     "answers": [
      "eval"
     ],
     "hint": "eval 可以计算字符串形式的表达式"
    }
   ],
   "stdin": "100\n2**10\n",
   "expected": "华氏100.0度=摄氏37.8度\n计算结果: 1024",
   "hint": "float() 把输入字符串转成浮点数；eval 返回表达式的值",
   "exp": "考查 float() 类型转换、算术表达式、%.1f 格式化与 eval 表达式求值。",
   "ref": "f = float(input())\nc = (f - 32) / 1.8\nprint('华氏%.1f度=摄氏%.1f度' % (f, c))\ns = input()\nprint('计算结果:', eval(s))"
  },
  {
   "id": "blk-l2-002",
   "level": 2,
   "title": "素数判断",
   "desc": "输入若干个整数（每行一个，输入空行结束），对每个数判断是否为素数，输出形如：7 是素数、15 不是素数。",
   "code": "def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, ___(1)___):\n        if n % i == 0:\n            return ___(2)___\n    return True\n\nwhile True:\n    s = input()\n    if s == '':\n        ___(3)___\n    n = int(s)\n    if is_prime(n):\n        print(n, '是素数')\n    else:\n        print(n, '不是素数')",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "int(n ** 0.5) + 1",
      "int(n**0.5) + 1",
      "n",
      "n // 2 + 1",
      "n//2 + 1",
      "n//2+1"
     ],
     "hint": "试除的上界，可以到 n-1，也可以只试到平方根"
    },
    {
     "n": 2,
     "answers": [
      "False"
     ],
     "hint": "能被整除就不是素数"
    },
    {
     "n": 3,
     "answers": [
      "break"
     ],
     "hint": "空行作为结束标志，退出无限循环"
    }
   ],
   "stdin": "7\n15\n2\n1\n\n",
   "expected": "7 是素数\n15 不是素数\n2 是素数\n1 不是素数",
   "hint": "素数指大于 1 且只能被 1 和自身整除的数",
   "exp": "考查函数定义、循环试除判断素数、return 返回布尔值与 break 结束无限循环。",
   "ref": "def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nwhile True:\n    s = input()\n    if s == '':\n        break\n    n = int(s)\n    if is_prime(n):\n        print(n, '是素数')\n    else:\n        print(n, '不是素数')"
  },
  {
   "id": "blk-l2-003",
   "level": 2,
   "title": "九九乘法表",
   "desc": "输出下三角九九乘法表：第 i 行输出 i 个等式（i 从 1 到 9），等式形如 i*j=积，同一行内用制表符 \\t 分隔。",
   "code": "for i in range(1, 10):\n    for j in range(1, ___(1)___):\n        print('%d*%d=%d' % (i, j, ___(2)___), end='\\t')\n    ___(3)___",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "i + 1",
      "i+1"
     ],
     "hint": "第 i 行有 i 个等式，j 取 1..i"
    },
    {
     "n": 2,
     "answers": [
      "i * j",
      "i*j"
     ],
     "hint": "等式的积"
    },
    {
     "n": 3,
     "answers": [
      "print()"
     ],
     "hint": "每行结束后换行"
    }
   ],
   "stdin": "",
   "expected": "1*1=1\t\n2*1=2\t2*2=4\t\n3*1=3\t3*2=6\t3*3=9\t\n4*1=4\t4*2=8\t4*3=12\t4*4=16\t\n5*1=5\t5*2=10\t5*3=15\t5*4=20\t5*5=25\t\n6*1=6\t6*2=12\t6*3=18\t6*4=24\t6*5=30\t6*6=36\t\n7*1=7\t7*2=14\t7*3=21\t7*4=28\t7*5=35\t7*6=42\t7*7=49\t\n8*1=8\t8*2=16\t8*3=24\t8*4=32\t8*5=40\t8*6=48\t8*7=56\t8*8=64\t\n9*1=9\t9*2=18\t9*3=27\t9*4=36\t9*5=45\t9*6=54\t9*7=63\t9*8=72\t9*9=81\t",
   "hint": "内层循环控制每行的列数，end='\\t' 使 print 不换行",
   "exp": "考查嵌套循环、range 边界、% 格式化与 print 的 end 参数。",
   "ref": "for i in range(1, 10):\n    for j in range(1, i + 1):\n        print('%d*%d=%d' % (i, j, i * j), end='\\t')\n    print()"
  },
  {
   "id": "blk-l2-004",
   "level": 2,
   "title": "圆周率近似",
   "desc": "用公式 π/4 = 1 - 1/3 + 1/5 - 1/7 + … 计算圆周率近似值：从 1 开始逐项累加，符号交替，当某一项的绝对值小于 1e-5 时停止累加，最后输出（保留 6 位小数）：圆周率近似值为3.141573。",
   "code": "pi4 = 0\nsign = 1\ni = 1\nwhile True:\n    item = sign / i\n    if abs(item) < 1e-5:\n        ___(1)___\n    pi4 = pi4 + item\n    sign = ___(2)___\n    i = i + 2\nprint('圆周率近似值为%.6f' % (___(3)___))",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "break"
     ],
     "hint": "项太小就退出无限循环"
    },
    {
     "n": 2,
     "answers": [
      "-sign"
     ],
     "hint": "符号正负交替"
    },
    {
     "n": 3,
     "answers": [
      "pi4 * 4",
      "pi4*4",
      "4 * pi4",
      "4*pi4"
     ],
     "hint": "累加和是 π/4，要乘 4"
    }
   ],
   "stdin": "",
   "expected": "圆周率近似值为3.141573",
   "hint": "sign 在 1 和 -1 之间交替；abs(item) 求绝对值",
   "exp": "考查 while True 无限循环、break、累加求和、符号交替与 %.6f 格式化。",
   "ref": "pi4 = 0\nsign = 1\ni = 1\nwhile True:\n    item = sign / i\n    if abs(item) < 1e-5:\n        break\n    pi4 = pi4 + item\n    sign = -sign\n    i = i + 2\nprint('圆周率近似值为%.6f' % (pi4 * 4))"
  },
  {
   "id": "blk-l2-005",
   "level": 2,
   "title": "水仙花数",
   "desc": "打印所有三位水仙花数（各位数字立方和等于其本身的三位数），每行一个。",
   "code": "for n in range(100, ___(1)___):\n    a = n // 100\n    b = n // 10 % 10\n    c = ___(2)___\n    if a ** 3 + b ** 3 + c ** 3 == ___(3)___:\n        print(n)",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "1000"
     ],
     "hint": "三位数的范围是 100~999"
    },
    {
     "n": 2,
     "answers": [
      "n % 10"
     ],
     "hint": "个位数字"
    },
    {
     "n": 3,
     "answers": [
      "n"
     ],
     "hint": "与 n 本身比较"
    }
   ],
   "stdin": "",
   "expected": "153\n370\n371\n407",
   "hint": "a、b、c 分别是百位、十位、个位",
   "exp": "考查 range 边界、整除与取余运算拆分位数、幂运算符 ** 与条件判断。",
   "ref": "for n in range(100, 1000):\n    a = n // 100\n    b = n // 10 % 10\n    c = n % 10\n    if a ** 3 + b ** 3 + c ** 3 == n:\n        print(n)"
  },
  {
   "id": "blk-l2-006",
   "level": 2,
   "title": "辗转相除法求最大公约数",
   "desc": "输入两个正整数（每行一个），用辗转相除法求它们的最大公约数，并输出最小公倍数。输出形如：最大公约数: 12 与 最小公倍数: 72。",
   "code": "a = int(input())\nb = int(input())\nm, n = a, b\nwhile n != 0:\n    r = m % ___(1)___\n    m = n\n    n = ___(2)___\nprint('最大公约数:', ___(3)___)\nprint('最小公倍数:', a * b // m)",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "n"
     ],
     "hint": "用除数去除"
    },
    {
     "n": 2,
     "answers": [
      "r"
     ],
     "hint": "余数作为新一轮的除数"
    },
    {
     "n": 3,
     "answers": [
      "m"
     ],
     "hint": "循环结束时 m 就是最大公约数"
    }
   ],
   "stdin": "24\n36\n",
   "expected": "最大公约数: 12\n最小公倍数: 72",
   "hint": "最小公倍数 = 两数之积 // 最大公约数",
   "exp": "考查 while 循环实现辗转相除法、变量轮换与整除运算求最小公倍数。",
   "ref": "a = int(input())\nb = int(input())\nm, n = a, b\nwhile n != 0:\n    r = m % n\n    m = n\n    n = r\nprint('最大公约数:', m)\nprint('最小公倍数:', a * b // m)"
  },
  {
   "id": "blk-l3-001",
   "level": 3,
   "title": "字符串反转与回文判断",
   "desc": "输入一个字符串（可能含大小写），先把字母全部转为小写，输出反转后的字符串，再判断反转后是否与原串相同：相同输出 是回文，否则输出 不是回文。",
   "code": "s = input()\ns = s.lower()\nrs = ___(1)___\nprint('反转后:', rs)\nif ___(2)___:\n    print('是回文')\n___(3)___:\n    print('不是回文')",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "s[::-1]"
     ],
     "hint": "步长为 -1 的切片实现反转"
    },
    {
     "n": 2,
     "answers": [
      "s == rs"
     ],
     "hint": "比较原串与反转串"
    },
    {
     "n": 3,
     "answers": [
      "else"
     ],
     "hint": "if 的另一个分支"
    }
   ],
   "stdin": "Level\n",
   "expected": "反转后: level\n是回文",
   "hint": "s[::-1] 表示从尾到头每隔 1 个字符取一次",
   "exp": "考查 lower() 方法、切片 s[::-1] 反转字符串、字符串比较与 if-else 分支。",
   "ref": "s = input()\ns = s.lower()\nrs = s[::-1]\nprint('反转后:', rs)\nif s == rs:\n    print('是回文')\nelse:\n    print('不是回文')"
  },
  {
   "id": "blk-l3-002",
   "level": 3,
   "title": "筛选列表中的偶数",
   "desc": "输入一行用空格分隔的整数，筛选出其中的偶数放入新列表，输出偶数列表、偶数个数与偶数之和。例如输入 12 7 8 3 6，输出：偶数列表: [12, 8, 6]、偶数个数: 3、偶数和: 26。",
   "code": "nums = list(map(int, input().split()))\nevens = []\nfor x in nums:\n    if ___(1)___:\n        evens.append(x)\nprint('偶数列表:', evens)\nprint('偶数个数:', ___(2)___)\nprint('偶数和:', ___(3)___)",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "x % 2 == 0"
     ],
     "hint": "能被 2 整除即偶数"
    },
    {
     "n": 2,
     "answers": [
      "len(evens)"
     ],
     "hint": "统计列表元素个数"
    },
    {
     "n": 3,
     "answers": [
      "sum(evens)"
     ],
     "hint": "求列表元素之和"
    }
   ],
   "stdin": "12 7 8 3 6\n",
   "expected": "偶数列表: [12, 8, 6]\n偶数个数: 3\n偶数和: 26",
   "hint": "append() 向列表末尾添加元素",
   "exp": "考查 input().split() 与 map(int, ...) 组合读入、取余判断偶数、列表 append 方法与 len()/sum() 函数。",
   "ref": "nums = list(map(int, input().split()))\nevens = []\nfor x in nums:\n    if x % 2 == 0:\n        evens.append(x)\nprint('偶数列表:', evens)\nprint('偶数个数:', len(evens))\nprint('偶数和:', sum(evens))"
  },
  {
   "id": "blk-l3-003",
   "level": 3,
   "title": "列表解析式",
   "desc": "输入一个正整数 n（如 6），用列表解析式生成 1~n 各数的平方列表 squares，再生成 1~n 中的奇数列表 odds，输出两个列表及平方之和。例如 n=6 时输出：[1, 4, 9, 16, 25, 36]、[1, 3, 5]、平方和: 91。",
   "code": "n = int(input())\nsquares = [___(1)___ for i in range(1, n + 1)]\nodds = [i for i in range(1, n + 1) if i % 2 == ___(2)___]\nprint(squares)\nprint(odds)\nprint('平方和:', ___(3)___)",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "i * i",
      "i*i",
      "i ** 2",
      "i**2"
     ],
     "hint": "平方"
    },
    {
     "n": 2,
     "answers": [
      "1"
     ],
     "hint": "奇数除以 2 余 1"
    },
    {
     "n": 3,
     "answers": [
      "sum(squares)"
     ],
     "hint": "对平方列表求和"
    }
   ],
   "stdin": "6\n",
   "expected": "[1, 4, 9, 16, 25, 36]\n[1, 3, 5]\n平方和: 91",
   "hint": "列表解析式格式：[表达式 for 变量 in 序列 if 条件]",
   "exp": "考查列表解析式的基本形式与带 if 筛选的写法，以及 sum() 求和。",
   "ref": "n = int(input())\nsquares = [i * i for i in range(1, n + 1)]\nodds = [i for i in range(1, n + 1) if i % 2 == 1]\nprint(squares)\nprint(odds)\nprint('平方和:', sum(squares))"
  },
  {
   "id": "blk-l3-004",
   "level": 3,
   "title": "字典统计字符频次",
   "desc": "输入一行字符串，用字典统计每个字符出现的次数，按出现先后顺序输出（每行格式：字符 出现 次数 次），最后输出不同字符的个数。例如输入 banana，输出：b 出现 1 次、a 出现 3 次、n 出现 2 次、不同字符数: 3。",
   "code": "s = input()\nd = {}\nfor ch in s:\n    d[___(1)___] = d.get(ch, 0) + ___(2)___\nfor k, v in d.items():\n    print(k, '出现', v, '次')\nprint('不同字符数:', ___(3)___)",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "ch"
     ],
     "hint": "以当前字符为键"
    },
    {
     "n": 2,
     "answers": [
      "1"
     ],
     "hint": "每见到一次计数加 1"
    },
    {
     "n": 3,
     "answers": [
      "len(d)"
     ],
     "hint": "字典中键的个数"
    }
   ],
   "stdin": "banana\n",
   "expected": "b 出现 1 次\na 出现 3 次\nn 出现 2 次\n不同字符数: 3",
   "hint": "d.get(k, 0) 在键不存在时返回默认值 0",
   "exp": "考查字典分类计数、get 方法设置默认值、items() 遍历与 len() 求键数。",
   "ref": "s = input()\nd = {}\nfor ch in s:\n    d[ch] = d.get(ch, 0) + 1\nfor k, v in d.items():\n    print(k, '出现', v, '次')\nprint('不同字符数:', len(d))"
  },
  {
   "id": "blk-l3-005",
   "level": 3,
   "title": "集合去重与排序",
   "desc": "输入一行用空格分隔的整数，用集合去掉重复元素后转为列表并升序排序，输出去重后个数、排序结果以及最大值和最小值。例如输入 5 3 9 3 5 1 7，输出：去重后共 5 个不同数、[1, 3, 5, 7, 9]、最大值: 9 最小值: 1。",
   "code": "nums = list(map(int, input().split()))\ns = ___(1)___(nums)\nlst = ___(2)___(s)\nlst.___(3)___()\nprint('去重后共', len(lst), '个不同数')\nprint(lst)\nprint('最大值:', lst[-1], '最小值:', lst[0])",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "set"
     ],
     "hint": "集合自动去重"
    },
    {
     "n": 2,
     "answers": [
      "list"
     ],
     "hint": "集合再转回列表"
    },
    {
     "n": 3,
     "answers": [
      "sort"
     ],
     "hint": "列表原地升序排序"
    }
   ],
   "stdin": "5 3 9 3 5 1 7\n",
   "expected": "去重后共 5 个不同数\n[1, 3, 5, 7, 9]\n最大值: 9 最小值: 1",
   "hint": "sort() 排序后 lst[-1] 是最大值，lst[0] 是最小值",
   "exp": "考查 set() 去重、list() 类型转换、sort() 排序与列表索引。",
   "ref": "nums = list(map(int, input().split()))\ns = set(nums)\nlst = list(s)\nlst.sort()\nprint('去重后共', len(lst), '个不同数')\nprint(lst)\nprint('最大值:', lst[-1], '最小值:', lst[0])"
  },
  {
   "id": "blk-l4-001",
   "level": 4,
   "title": "自定义函数求最大值与阶乘",
   "desc": "输入三个整数（每行一个），函数 mymax 返回三者中的最大值；函数 fact 用循环计算阶乘。输出最大值及其阶乘。例如输入 3、9、5，输出：最大值: 9 与 最大值的阶乘: 362880。",
   "code": "def mymax(a, b, c):\n    m = a\n    if b > m:\n        m = b\n    if ___(1)___:\n        m = c\n    return ___(2)___\n\ndef fact(n):\n    r = 1\n    for i in range(2, n + 1):\n        r = r ___(3)___ i\n    return r\n\na = int(input())\nb = int(input())\nc = int(input())\nt = mymax(a, b, c)\nprint('最大值:', t)\nprint('最大值的阶乘:', fact(t))",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "c > m"
     ],
     "hint": "c 比当前最大值还大"
    },
    {
     "n": 2,
     "answers": [
      "m"
     ],
     "hint": "返回最大值"
    },
    {
     "n": 3,
     "answers": [
      "*"
     ],
     "hint": "累乘用乘法"
    }
   ],
   "stdin": "3\n9\n5\n",
   "expected": "最大值: 9\n最大值的阶乘: 362880",
   "hint": "求最值先假设第一个数最大，再逐个比较更新",
   "exp": "考查函数定义与 return、分支求最值、循环累乘求阶乘。",
   "ref": "def mymax(a, b, c):\n    m = a\n    if b > m:\n        m = b\n    if c > m:\n        m = c\n    return m\n\ndef fact(n):\n    r = 1\n    for i in range(2, n + 1):\n        r = r * i\n    return r\n\na = int(input())\nb = int(input())\nc = int(input())\nt = mymax(a, b, c)\nprint('最大值:', t)\nprint('最大值的阶乘:', fact(t))"
  },
  {
   "id": "blk-l4-002",
   "level": 4,
   "title": "默认参数与关键字参数",
   "desc": "函数 power(x, n=2) 计算 x 的 n 次方（n 有默认值 2）。依次输出 power(3)、power(2, 10) 和 power(x=5, n=3) 的结果，每行一个：9、1024、125。",
   "code": "def power(x, n=2):\n    r = 1\n    for i in range(n):\n        r = r * x\n    return ___(1)___\n\nprint(power(3))\nprint(power(2, ___(2)___))\nprint(power(x=___(3)___, n=3))",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "r"
     ],
     "hint": "返回累乘结果"
    },
    {
     "n": 2,
     "answers": [
      "10"
     ],
     "hint": "2 的 10 次方是 1024"
    },
    {
     "n": 3,
     "answers": [
      "5"
     ],
     "hint": "关键字参数 x=5"
    }
   ],
   "stdin": "",
   "expected": "9\n1024\n125",
   "hint": "不传 n 时使用默认值 2；关键字参数按名字传递，顺序可以颠倒",
   "exp": "考查函数默认参数（省略实参时取默认值）与关键字参数（x=5, n=3）的用法。",
   "ref": "def power(x, n=2):\n    r = 1\n    for i in range(n):\n        r = r * x\n    return r\n\nprint(power(3))\nprint(power(2, 10))\nprint(power(x=5, n=3))"
  },
  {
   "id": "blk-l4-003",
   "level": 4,
   "title": "map 与 filter 处理列表",
   "desc": "输入一行用空格分隔的整数，用 map 把每个数变成它的平方，用 filter 筛出平方后大于 50 的数，输出平方列表、筛出的列表与平均值（保留 1 位小数）。例如输入 3 6 8 5，输出：平方列表: [9, 36, 64, 25]、大于50的数: [64]、平均值: 33.5。",
   "code": "nums = list(map(int, input().split()))\nsq = list(map(___(1)___, nums))\nbig = list(filter(lambda x: x > ___(2)___, sq))\nprint('平方列表:', sq)\nprint('大于50的数:', big)\nprint('平均值: %.1f' % (sum(sq) / ___(3)___))",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "lambda x: x * x",
      "lambda x: x*x",
      "lambda x: x**2"
     ],
     "hint": "用 lambda 返回 x 的平方"
    },
    {
     "n": 2,
     "answers": [
      "50"
     ],
     "hint": "筛选阈值是 50"
    },
    {
     "n": 3,
     "answers": [
      "len(sq)",
      "len(nums)"
     ],
     "hint": "平均值 = 总和 / 个数"
    }
   ],
   "stdin": "3 6 8 5\n",
   "expected": "平方列表: [9, 36, 64, 25]\n大于50的数: [64]\n平均值: 33.5",
   "hint": "map 对每个元素施加函数，filter 按条件筛选",
   "exp": "考查 lambda 表达式、map 映射、filter 筛选与 len()/sum() 统计。",
   "ref": "nums = list(map(int, input().split()))\nsq = list(map(lambda x: x * x, nums))\nbig = list(filter(lambda x: x > 50, sq))\nprint('平方列表:', sq)\nprint('大于50的数:', big)\nprint('平均值: %.1f' % (sum(sq) / len(sq)))"
  },
  {
   "id": "blk-l4-004",
   "level": 4,
   "title": "递归求斐波那契与汉诺塔次数",
   "desc": "递归函数 fib(n) 返回斐波那契数列第 n 项（f(1)=f(2)=1）；递归函数 hanoi(n) 返回 n 个盘子的汉诺塔最少移动次数（hanoi(1)=1，hanoi(n)=2*hanoi(n-1)+1）。输出 fib(10) 与 hanoi(5)，格式：fib(10) = 55 与 hanoi(5) = 31。",
   "code": "def fib(n):\n    if n == 1 or n == ___(1)___:\n        return 1\n    return fib(n - 1) + ___(2)___\n\ndef hanoi(n):\n    if n == 1:\n        return 1\n    return 2 * hanoi(n - 1) + ___(3)___\n\nprint('fib(10) =', fib(10))\nprint('hanoi(5) =', hanoi(5))",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "2"
     ],
     "hint": "递归基例有两个：n=1 和 n=2"
    },
    {
     "n": 2,
     "answers": [
      "fib(n - 2)",
      "fib(n-2)"
     ],
     "hint": "斐波那契递推式"
    },
    {
     "n": 3,
     "answers": [
      "1"
     ],
     "hint": "移动次数递推：2*f(n-1)+1"
    }
   ],
   "stdin": "",
   "expected": "fib(10) = 55\nhanoi(5) = 31",
   "hint": "递归 = 基例（直接得出结果）+ 递推式（调用自己）",
   "exp": "考查递归函数的基例与递推式：斐波那契数列与汉诺塔移动次数 2^n-1。",
   "ref": "def fib(n):\n    if n == 1 or n == 2:\n        return 1\n    return fib(n - 1) + fib(n - 2)\n\ndef hanoi(n):\n    if n == 1:\n        return 1\n    return 2 * hanoi(n - 1) + 1\n\nprint('fib(10) =', fib(10))\nprint('hanoi(5) =', hanoi(5))"
  },
  {
   "id": "blk-l5-001",
   "level": 5,
   "title": "文件逐行读取统计",
   "desc": "data.txt（UTF-8 编码）存放了若干行英文句子。逐行读取：统计总行数、包含 Python 的行数，以及所有行的平均长度（每行去掉行尾换行符后取长度，保留 1 位小数）。输出格式：总行数: 4、含Python的行数: 2、平均行长: 19.0。",
   "files": [
    {
     "name": "data.txt",
     "content": "Python is easy to learn\nI love coding\nLife is short, use Python\nKeep it simple!\n"
    }
   ],
   "code": "f = open('data.txt', 'r', encoding='utf-8')\nn = 0\ncnt = 0\ntotal = 0\nfor line in f:\n    line = line.___(1)___()\n    n = n + 1\n    total = total + ___(2)___\n    if 'Python' in line:\n        cnt = cnt + 1\nprint('总行数:', n)\nprint('含Python的行数:', cnt)\nprint('平均行长: %.1f' % (total / n))\nf.___(3)___()",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "strip"
     ],
     "hint": "去掉行尾的换行符"
    },
    {
     "n": 2,
     "answers": [
      "len(line)"
     ],
     "hint": "当前行的长度"
    },
    {
     "n": 3,
     "answers": [
      "close"
     ],
     "hint": "文件用完要关闭"
    }
   ],
   "stdin": "",
   "expected": "总行数: 4\n含Python的行数: 2\n平均行长: 19.0",
   "hint": "for line in f 逐行迭代文件对象",
   "exp": "考查 open 打开文件、for 逐行读取、strip() 去换行、len() 计长、in 判断包含与 close()。",
   "ref": "f = open('data.txt', 'r', encoding='utf-8')\nn = 0\ncnt = 0\ntotal = 0\nfor line in f:\n    line = line.strip()\n    n = n + 1\n    total = total + len(line)\n    if 'Python' in line:\n        cnt = cnt + 1\nprint('总行数:', n)\nprint('含Python的行数:', cnt)\nprint('平均行长: %.1f' % (total / n))\nf.close()"
  },
  {
   "id": "blk-l5-002",
   "level": 5,
   "title": "CSV 成绩文件处理",
   "desc": "data.csv（UTF-8 编码）首行为标题行：姓名,语文,数学,英语，其后每行是一名学生的三科成绩。逐行读取并计算每人的总分（输出格式：姓名 总分 数值），最后输出总分最高的学生：总分最高: 姓名 总分。跳过标题行用 next(f)。",
   "files": [
    {
     "name": "data.csv",
     "content": "姓名,语文,数学,英语\n张三,85,92,78\n李四,90,88,95\n王五,76,85,80\n"
    }
   ],
   "code": "f = open('data.csv', 'r', encoding='utf-8')\n___(1)___\nbest_name = ''\nbest_total = 0\nfor line in f:\n    parts = line.strip().___(2)___(',')\n    total = int(parts[1]) + int(parts[2]) + int(parts[3])\n    print(parts[0], '总分', total)\n    if total > best_total:\n        best_total = total\n        best_name = ___(3)___\nf.close()\nprint('总分最高:', best_name, best_total)",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "next(f)",
      "f.readline()"
     ],
     "hint": "读走第一行标题"
    },
    {
     "n": 2,
     "answers": [
      "split"
     ],
     "hint": "按逗号切分一行"
    },
    {
     "n": 3,
     "answers": [
      "parts[0]"
     ],
     "hint": "姓名是切分后的第一项"
    }
   ],
   "stdin": "",
   "expected": "张三 总分 255\n李四 总分 273\n王五 总分 241\n总分最高: 李四 273",
   "hint": "split(',') 得到列表，parts[1]~parts[3] 是三科成绩字符串，要 int() 转换",
   "exp": "考查 CSV 逐行处理：next() 跳过标题、strip() 去换行、split(',') 切分、int() 转换与打擂台求最值。",
   "ref": "f = open('data.csv', 'r', encoding='utf-8')\nnext(f)\nbest_name = ''\nbest_total = 0\nfor line in f:\n    parts = line.strip().split(',')\n    total = int(parts[1]) + int(parts[2]) + int(parts[3])\n    print(parts[0], '总分', total)\n    if total > best_total:\n        best_total = total\n        best_name = parts[0]\nf.close()\nprint('总分最高:', best_name, best_total)"
  },
  {
   "id": "blk-l5-003",
   "level": 5,
   "title": "英文词频统计",
   "desc": "article.txt（UTF-8 编码）是一篇英文短文。先把全部字母转为小写，再把标点 .,!?;: 替换为空格，然后按空格分词，用字典统计词频。输出不同单词数与 the 出现的次数，格式：不同单词数: 6 与 the 出现次数: 2。",
   "files": [
    {
     "name": "article.txt",
     "content": "Python is simple. Python is powerful!\nThe simple is the best.\n"
    }
   ],
   "code": "f = open('article.txt', 'r', encoding='utf-8')\ntext = f.read().lower()\nf.close()\nfor ch in '.,!?;:':\n    text = text.replace(ch, ' ')\nwords = text.___(1)___()\nd = {}\nfor w in words:\n    d[w] = d.get(w, 0) + ___(2)___\nprint('不同单词数:', ___(3)___)\nprint('the 出现次数:', d.get('the', 0))",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "split"
     ],
     "hint": "按空白切分成单词列表"
    },
    {
     "n": 2,
     "answers": [
      "1"
     ],
     "hint": "每出现一次计数加 1"
    },
    {
     "n": 3,
     "answers": [
      "len(d)"
     ],
     "hint": "不同单词的个数就是键的个数"
    }
   ],
   "stdin": "",
   "expected": "不同单词数: 6\nthe 出现次数: 2",
   "hint": "split() 不带参数时按任意空白（含换行）切分，比 split(' ') 更稳",
   "exp": "考查文件读入、字符串 lower()/replace()、split() 分词与字典 get 词频统计。",
   "ref": "f = open('article.txt', 'r', encoding='utf-8')\ntext = f.read().lower()\nf.close()\nfor ch in '.,!?;:':\n    text = text.replace(ch, ' ')\nwords = text.split()\nd = {}\nfor w in words:\n    d[w] = d.get(w, 0) + 1\nprint('不同单词数:', len(d))\nprint('the 出现次数:', d.get('the', 0))"
  },
  {
   "id": "blk-l5-004",
   "level": 5,
   "title": "文件复制与追加",
   "desc": "把 source.txt（UTF-8 编码）的内容逐行复制到 copy.txt（用写模式打开），再以追加模式在 copy.txt 末尾写入一行 --- END ---，最后读出 copy.txt 全部内容打印。输出：Hello Python、File copy test、--- END --- 共三行。",
   "files": [
    {
     "name": "source.txt",
     "content": "Hello Python\nFile copy test\n"
    }
   ],
   "code": "f = open('source.txt', 'r', encoding='utf-8')\ng = open('copy.txt', ___(1)___, encoding='utf-8')\nfor line in f:\n    g.write(line)\nf.close()\ng.close()\ng = open('copy.txt', ___(2)___, encoding='utf-8')\ng.write('--- END ---\\n')\ng.___(3)___()\nh = open('copy.txt', 'r', encoding='utf-8')\nprint(h.read(), end='')\nh.close()",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "'w'",
      "\"w\""
     ],
     "hint": "写模式打开新文件"
    },
    {
     "n": 2,
     "answers": [
      "'a'",
      "\"a\""
     ],
     "hint": "追加模式不会清空原内容"
    },
    {
     "n": 3,
     "answers": [
      "close"
     ],
     "hint": "写完关闭文件，内容才稳妥落盘"
    }
   ],
   "stdin": "",
   "expected": "Hello Python\nFile copy test\n--- END ---\n",
   "hint": "r 读、w 写（清空）、a 追加，是三种最常用的文件模式",
   "exp": "考查文件读写模式 r/w/a 的区别、write() 写入与 close()、read() 读全文。",
   "ref": "f = open('source.txt', 'r', encoding='utf-8')\ng = open('copy.txt', 'w', encoding='utf-8')\nfor line in f:\n    g.write(line)\nf.close()\ng.close()\ng = open('copy.txt', 'a', encoding='utf-8')\ng.write('--- END ---\\n')\ng.close()\nh = open('copy.txt', 'r', encoding='utf-8')\nprint(h.read(), end='')\nh.close()"
  },
  {
   "id": "blk-l6-001",
   "level": 6,
   "title": "random 猜数字游戏",
   "desc": "用固定种子 random.seed(5) 生成一个 1~100 的随机整数作为答案，循环读入玩家猜的整数：比答案大输出 猜大了，比答案小输出 猜小了，猜中输出 猜对了，共用了N次 并结束（N 为已猜次数）。测试输入依次为 100、50、80，输出：猜大了、猜小了、猜对了，共用了3次。",
   "code": "import random\nrandom.seed(5)\ntarget = random.___(1)___(1, 100)\ncnt = 0\nwhile True:\n    g = int(input())\n    cnt = cnt + 1\n    if g > target:\n        print('猜大了')\n    elif g ___(2)___ target:\n        print('猜小了')\n    else:\n        print('猜对了，共用了%d次' % cnt)\n        ___(3)___",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "randint"
     ],
     "hint": "生成 [a, b] 区间随机整数的函数"
    },
    {
     "n": 2,
     "answers": [
      "<"
     ],
     "hint": "比答案小"
    },
    {
     "n": 3,
     "answers": [
      "break"
     ],
     "hint": "猜中后退出循环"
    }
   ],
   "stdin": "100\n50\n80\n",
   "expected": "猜大了\n猜小了\n猜对了，共用了3次",
   "hint": "random.seed(5) 固定种子后，random.randint(1, 100) 生成 80",
   "exp": "考查 random.seed 固定随机种子、randint 生成区间整数、多分支判断与 break。",
   "ref": "import random\nrandom.seed(5)\ntarget = random.randint(1, 100)\ncnt = 0\nwhile True:\n    g = int(input())\n    cnt = cnt + 1\n    if g > target:\n        print('猜大了')\n    elif g < target:\n        print('猜小了')\n    else:\n        print('猜对了，共用了%d次' % cnt)\n        break"
  },
  {
   "id": "blk-l6-002",
   "level": 6,
   "title": "turtle 画正方形",
   "desc": "用 turtle 画一个蓝色正方形（边长 100，每画完一条边右转 90 度），然后抬起画笔移到 (150, 0)，换成红色画笔写上文字 正方形，最后打印验证信息（格式：正方形颜色: blue、落点: 150 0、画笔按下: False）。本站已内置 turtle 画布，可直接运行。",
   "code": "import turtle\nt = turtle.Turtle()\nc1 = ___(1)___\nt.pencolor(c1)\nfor i in range(4):\n    t.forward(100)\n    t.right(90)\nt.penup()\nt.goto(___(2)___, 0)\nt.pencolor('red')\nt.write('正方形')\nprint('正方形颜色:', c1)\nprint('落点:', round(t.xcor()), round(t.ycor()))\nprint('画笔按下:', t.___(3)___())",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "'blue'",
      "\"blue\""
     ],
     "hint": "正方形要用蓝色画笔"
    },
    {
     "n": 2,
     "answers": [
      "150"
     ],
     "hint": "移到横坐标 150 处"
    },
    {
     "n": 3,
     "answers": [
      "isdown"
     ],
     "hint": "查询画笔是否落下的方法"
    }
   ],
   "stdin": "",
   "expected": "正方形颜色: blue\n落点: 150 0\n画笔按下: False",
   "hint": "penup() 抬笔后移动不会再画线；isdown() 返回 True/False",
   "exp": "考查 turtle 基本绘图：pencolor、forward/right 循环画正方形、penup/goto 移动、write 写字与 isdown 状态查询。",
   "ref": "import turtle\nt = turtle.Turtle()\nc1 = 'blue'\nt.pencolor(c1)\nfor i in range(4):\n    t.forward(100)\n    t.right(90)\nt.penup()\nt.goto(150, 0)\nt.pencolor('red')\nt.write('正方形')\nprint('正方形颜色:', c1)\nprint('落点:', round(t.xcor()), round(t.ycor()))\nprint('画笔按下:', t.isdown())"
  },
  {
   "id": "blk-l7-001",
   "level": 7,
   "title": "正则提取手机号与邮箱",
   "desc": "输入一行文本，用 re.findall 提取其中所有手机号（模式：1[35789]\\d{9}，即 1 开头、第二位为 3/5/7/8/9 的 11 位数字）和所有邮箱（模式：\\w+@\\w+\\.\\w+），按格式输出两个列表与手机号个数。测试输入：联系我: 13812345678 或 zhang3@qq.com, 备用 15987654321.",
   "code": "import re\ns = input()\nphones = re.findall(r'1[35789]\\d{9}', s)\nemails = re.findall(___(1)___, s)\nprint('手机号:', ___(2)___)\nprint('邮箱:', emails)\nprint('共提取手机号', ___(3)___, '个')",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "r'\\w+@\\w+\\.\\w+'",
      "'\\w+@\\w+\\.\\w+'",
      "r\"\\w+@\\w+\\.\\w+\"",
      "\"\\w+@\\w+\\.\\w+\""
     ],
     "hint": "邮箱正则：\\w+@\\w+\\.\\w+（建议加 r 前缀写原始字符串）"
    },
    {
     "n": 2,
     "answers": [
      "phones"
     ],
     "hint": "输出手机号列表"
    },
    {
     "n": 3,
     "answers": [
      "len(phones)"
     ],
     "hint": "统计列表长度"
    }
   ],
   "stdin": "联系我: 13812345678 或 zhang3@qq.com, 备用 15987654321.\n",
   "expected": "手机号: ['13812345678', '15987654321']\n邮箱: ['zhang3@qq.com']\n共提取手机号 2 个",
   "hint": "findall 返回所有匹配组成的列表",
   "exp": "考查 re.findall、字符类 [...]、\\d、\\w 量词与量词 {9}，以及 len() 统计。",
   "ref": "import re\ns = input()\nphones = re.findall(r'1[35789]\\d{9}', s)\nemails = re.findall(r'\\w+@\\w+\\.\\w+', s)\nprint('手机号:', phones)\nprint('邮箱:', emails)\nprint('共提取手机号', len(phones), '个')"
  },
  {
   "id": "blk-l7-002",
   "level": 7,
   "title": "SQLite 内存库建表与查询",
   "desc": "程序使用 SQLite 在内存中建库：创建 scores 表（name TEXT, score INTEGER），用占位符 ? 插入 3 条记录（张三 85、李四 92、王强 78），提交事务后，根据输入的姓名查询成绩：查到输出“姓名的成绩是分数”，查不到输出“查无此人”。测试输入：李四",
   "code": "import sqlite3\n\nconn = ___(1)___\ncur = ___(2)___\ncur.execute('CREATE TABLE scores(name TEXT, score INTEGER)')\ncur.execute('INSERT INTO scores VALUES(?, ?)', ('张三', 85))\ncur.execute('INSERT INTO scores VALUES(?, ?)', ('李四', 92))\ncur.execute('INSERT INTO scores VALUES(?, ?)', ('王强', 78))\n___(3)___\nname = input()\ncur.execute('SELECT score FROM scores WHERE name = ?', (name,))\nrow = ___(4)___\nif row is None:\n    print('查无此人')\nelse:\n    print(f'{name}的成绩是{row[0]}')",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "sqlite3.connect(':memory:')",
      "sqlite3.connect(\":memory:\")"
     ],
     "hint": "连接内存数据库：sqlite3.connect(':memory:')"
    },
    {
     "n": 2,
     "answers": [
      "conn.cursor()"
     ],
     "hint": "由连接对象创建游标"
    },
    {
     "n": 3,
     "answers": [
      "conn.commit()"
     ],
     "hint": "插入数据后要提交事务"
    },
    {
     "n": 4,
     "answers": [
      "cur.fetchone()",
      "cur.fetchall()[0]"
     ],
     "hint": "取出查询结果中的一条记录"
    }
   ],
   "stdin": "李四\n",
   "expected": "李四的成绩是92",
   "ref": "import sqlite3\n\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.execute('CREATE TABLE scores(name TEXT, score INTEGER)')\ncur.execute('INSERT INTO scores VALUES(?, ?)', ('张三', 85))\ncur.execute('INSERT INTO scores VALUES(?, ?)', ('李四', 92))\ncur.execute('INSERT INTO scores VALUES(?, ?)', ('王强', 78))\nconn.commit()\nname = input()\ncur.execute('SELECT score FROM scores WHERE name = ?', (name,))\nrow = cur.fetchone()\nif row is None:\n    print('查无此人')\nelse:\n    print(f'{name}的成绩是{row[0]}')",
   "hint": "connect 建连接、cursor() 建游标、INSERT 后要 commit、fetchone() 取一条记录",
   "exp": "考查 SQLite 编程关键步骤：connect 连接（:memory: 内存库）、cursor 创建游标、execute 占位符传参、commit 提交事务、fetchone 获取查询结果。"
  },
  {
   "id": "blk-l7-003",
   "level": 7,
   "title": "正则解析访问日志",
   "desc": "输入若干行 Web 服务器访问日志（空行结束），每行格式形如：192.168.1.5 - - [25/Sep/2026:10:01:02] \"GET /index.html HTTP/1.1\" 200 2326。用 re.findall 配合两个分组同时提取每行的 IP 和状态码，先输出共提取多少条记录，再逐行输出“IP 的状态码是 状态码”，最后输出其中状态码为 200 的条数。",
   "code": "import re\n\nresult = []    # 每个元素是 (IP, 状态码) 元组\nwhile True:\n    line = input()\n    if line == '':\n        break\n    result += re.findall(___(1)___, line)\n\nprint('共提取', ___(2)___, '条记录')\nn200 = 0\nfor ip, code in result:\n    print(ip, '的状态码是', code)\n    if ___(3)___:\n        n200 += 1\nprint('其中状态码为200的有', n200, '条')",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "r'(\\d+\\.\\d+\\.\\d+\\.\\d+).*?\" (\\d{3}) '",
      "r'(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}).*?\" (\\d{3}) '",
      "r'(\\d+\\.\\d+\\.\\d+\\.\\d+).*?\" (\\d{3})'",
      "'(\\\\d+\\\\.\\\\d+\\\\.\\\\d+\\\\.\\\\d+).*?\" (\\\\d{3}) '"
     ],
     "hint": "两个分组：IP（每个点号都要转义 \\.）与引号后的三位状态码 (\\d{3})，中间用 .*? 连接"
    },
    {
     "n": 2,
     "answers": [
      "len(result)"
     ],
     "hint": "统计元组列表的长度"
    },
    {
     "n": 3,
     "answers": [
      "code == '200'",
      "code == \"200\"",
      "int(code) == 200",
      "'200' == code"
     ],
     "hint": "分组取出的状态码是字符串，与 '200' 比较"
    }
   ],
   "stdin": "192.168.1.5 - - [25/Sep/2026:10:01:02] \"GET /index.html HTTP/1.1\" 200 2326\n10.0.0.88 - - [25/Sep/2026:10:02:15] \"POST /api/login HTTP/1.1\" 404 512\n\n",
   "expected": "共提取 2 条记录\n192.168.1.5 的状态码是 200\n10.0.0.88 的状态码是 404\n其中状态码为200的有 1 条",
   "ref": "import re\n\nresult = []    # 每个元素是 (IP, 状态码) 元组\nwhile True:\n    line = input()\n    if line == '':\n        break\n    result += re.findall(r'(\\d+\\.\\d+\\.\\d+\\.\\d+).*?\" (\\d{3}) ', line)\n\nprint('共提取', len(result), '条记录')\nn200 = 0\nfor ip, code in result:\n    print(ip, '的状态码是', code)\n    if code == '200':\n        n200 += 1\nprint('其中状态码为200的有', n200, '条')",
   "hint": "findall 配合两个分组返回 (IP, 状态码) 元组列表；正则里的点号必须转义",
   "exp": "考查 re.findall 分组提取（有多个分组时返回元组列表）、元字符 . 的转义、.*? 懒惰匹配、遍历解包与条件统计。"
  },
  {
   "id": "blk-l7-004",
   "level": 7,
   "title": "定义 Student 类并评定等级",
   "desc": "定义 Student 类：构造方法接收姓名 name 和分数 score 并保存为实例属性；实例方法 grade() 按分数返回等级（90 分及以上为“优秀”，60 分及以上为“及格”，否则“不及格”）。输入姓名和分数（各占一行），创建 Student 实例并按“姓名 分数 等级”输出。测试输入：王五、73",
   "code": "class Student:\n    def ___(1)___(self, name, score):\n        self.name = name\n        self.score = score\n\n    def grade(___(2)___):\n        if self.score >= 90:\n            return '优秀'\n        elif self.score >= 60:\n            return '及格'\n        else:\n            return '不及格'\n\nname = input()\nscore = int(input())\ns = ___(3)___(name, score)\nprint(s.name, s.score, s.___(4)___())",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "__init__"
     ],
     "hint": "构造方法名，前后各两个下划线"
    },
    {
     "n": 2,
     "answers": [
      "self"
     ],
     "hint": "实例方法的第一个参数代表实例本身"
    },
    {
     "n": 3,
     "answers": [
      "Student"
     ],
     "hint": "用 类名(参数) 创建实例"
    },
    {
     "n": 4,
     "answers": [
      "grade"
     ],
     "hint": "通过实例调用评定等级的方法"
    }
   ],
   "stdin": "王五\n73\n",
   "expected": "王五 73 及格",
   "ref": "class Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n\n    def grade(self):\n        if self.score >= 90:\n            return '优秀'\n        elif self.score >= 60:\n            return '及格'\n        else:\n            return '不及格'\n\nname = input()\nscore = int(input())\ns = Student(name, score)\nprint(s.name, s.score, s.grade())",
   "hint": "构造方法名是 __init__；方法内通过 self 访问实例属性；实例化写 类名(实参)",
   "exp": "考查面向对象基础：__init__ 构造方法、self 参数、实例属性、类实例化与实例方法调用。"
  },
  {
   "id": "blk-l7-005",
   "level": 7,
   "title": "递归实现二分查找",
   "desc": "程序用递归函数 bsearch 在有序列表 data = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] 中二分查找。输入两个待查找的整数（各占一行），逐个查找：找到输出“x的下标是索引”，找不到输出“x不在列表中”。测试输入：23、50",
   "code": "def bsearch(lst, low, high, x):\n    if ___(1)___:\n        return -1\n    mid = ___(2)___\n    if lst[mid] == x:\n        return ___(3)___\n    elif lst[mid] > x:\n        return bsearch(lst, low, ___(4)___, x)\n    else:\n        return bsearch(lst, mid + 1, high, x)\n\ndata = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nfor i in range(2):\n    t = int(input())\n    pos = bsearch(data, 0, len(data) - 1, t)\n    if pos == -1:\n        print(f'{t}不在列表中')\n    else:\n        print(f'{t}的下标是{pos}')",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "low > high",
      "high < low"
     ],
     "hint": "查找区间为空（low 越过 high）是递归基例"
    },
    {
     "n": 2,
     "answers": [
      "(low + high) // 2",
      "(low+high)//2",
      "(high + low) // 2",
      "low + (high - low) // 2"
     ],
     "hint": "计算中间位置下标（整除）"
    },
    {
     "n": 3,
     "answers": [
      "mid"
     ],
     "hint": "命中时返回中间位置下标"
    },
    {
     "n": 4,
     "answers": [
      "mid - 1",
      "mid-1"
     ],
     "hint": "查左半段时，上界收窄到 mid 的左侧"
    }
   ],
   "stdin": "23\n50\n",
   "expected": "23的下标是5\n50不在列表中",
   "ref": "def bsearch(lst, low, high, x):\n    if low > high:\n        return -1\n    mid = (low + high) // 2\n    if lst[mid] == x:\n        return mid\n    elif lst[mid] > x:\n        return bsearch(lst, low, mid - 1, x)\n    else:\n        return bsearch(lst, mid + 1, high, x)\n\ndata = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nfor i in range(2):\n    t = int(input())\n    pos = bsearch(data, 0, len(data) - 1, t)\n    if pos == -1:\n        print(f'{t}不在列表中')\n    else:\n        print(f'{t}的下标是{pos}')",
   "hint": "基例是区间为空返回 -1；中点 (low + high) // 2；找到返回 mid；左半段上界为 mid - 1",
   "exp": "考查递归二分查找：基例（区间空返回 -1）、中点计算、命中返回下标、向左右子区间递归（参数收敛）。"
  },
  {
   "id": "blk-l7-006",
   "level": 7,
   "title": "JSON 图书清单筛选与写回",
   "desc": "books.json 存放图书数组（每个元素含 name、price 两个键）。程序读取并解析该文件，输入一个价格上限，把 price 不超过上限的书组成新列表，用 json.dumps（ensure_ascii=False）写回 result.json；最后输出符合条件的本书数，并把 result.json 的内容原样输出。测试输入：50",
   "code": "import json\n\nfr = open('books.json', 'r', encoding='utf-8')\nbooks = ___(1)___\nfr.close()\nlimit = int(input())\nresult = []\nfor b in books:\n    if ___(2)___:\n        result.append(b)\nfw = open('result.json', ___(3)___, encoding='utf-8')\nfw.write(json.dumps(___(4)___, ensure_ascii=False))\nfw.close()\nprint('价格不超过', limit, '的书共', len(result), '本')\nfr2 = open('result.json', 'r', encoding='utf-8')\nprint(fr2.read())\nfr2.close()",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "json.loads(fr.read())",
      "json.load(fr)"
     ],
     "hint": "loads 接收字符串，load 直接接收文件对象，二者皆可"
    },
    {
     "n": 2,
     "answers": [
      "b['price'] <= limit",
      "b['price']<=limit",
      "b.get('price') <= limit"
     ],
     "hint": "b 是字典，取键 'price' 与上限比较"
    },
    {
     "n": 3,
     "answers": [
      "'w'",
      "\"w\""
     ],
     "hint": "写文件要用写模式 'w'"
    },
    {
     "n": 4,
     "answers": [
      "result"
     ],
     "hint": "把筛选出的列表序列化写回"
    }
   ],
   "stdin": "50\n",
   "files": [
    {
     "name": "books.json",
     "content": "[{\"name\": \"Python入门\", \"price\": 49}, {\"name\": \"数据结构\", \"price\": 65}, {\"name\": \"机器学习\", \"price\": 88}, {\"name\": \"C语言程序设计\", \"price\": 36}, {\"name\": \"算法导论\", \"price\": 102}]"
    }
   ],
   "expected": "价格不超过 50 的书共 2 本\n[{\"name\": \"Python入门\", \"price\": 49}, {\"name\": \"C语言程序设计\", \"price\": 36}]",
   "ref": "import json\n\nfr = open('books.json', 'r', encoding='utf-8')\nbooks = json.loads(fr.read())\nfr.close()\nlimit = int(input())\nresult = []\nfor b in books:\n    if b['price'] <= limit:\n        result.append(b)\nfw = open('result.json', 'w', encoding='utf-8')\nfw.write(json.dumps(result, ensure_ascii=False))\nfw.close()\nprint('价格不超过', limit, '的书共', len(result), '本')\nfr2 = open('result.json', 'r', encoding='utf-8')\nprint(fr2.read())\nfr2.close()",
   "hint": "json.loads 解析字符串（json.load 可直接读文件）；写文件用 'w' 模式；dumps 的对象是筛选结果",
   "exp": "考查 JSON 与文件综合应用：loads/load 解析、遍历字典列表筛选、open 'w' 模式、json.dumps 序列化写回并读回验证。"
  },
  {
   "id": "blk-l2-001",
   "level": 2,
   "title": "密码强度判断",
   "desc": "输入一串字符作为密码（输入空串结束循环），判断其强度：长度不少于 8 位记 1 分，含数字记 1 分，含大写字母记 1 分，含小写字母记 1 分；合计 1-2 分为弱，3 分为中，4 分为强。",
   "code": "def judge(passwd):\n    plen = 0\n    if ___(1)___ >= 8:\n        plen = 1\n    pnum, pupper, plower = False, False, False\n    for ch in passwd:\n        if ch in '0123456789':\n            pnum = True\n        if 'A' <= ch <= 'Z':\n            pupper = True\n        if 'a' <= ch <= 'z':\n            plower = True\n    result = plen + pnum + pupper + plower\n    return result\n\nwhile True:\n    pw = input()\n    if pw == '':\n        ___(2)___\n    s = judge(pw)\n    if s <= 2:\n        print('弱密码')\n    elif s == 3:\n        print('中等密码')\n    else:\n        print('强密码')",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "len(passwd)"
     ],
     "hint": "求密码字符串的长度"
    },
    {
     "n": 2,
     "answers": [
      "break"
     ],
     "hint": "空串时退出无限循环"
    }
   ],
   "stdin": "Abc12345\nweakpw\n\n",
   "expected": "强密码\n弱密码",
   "ref": "def judge(passwd):\n    plen = 0\n    if len(passwd) >= 8:\n        plen = 1\n    pnum, pupper, plower = False, False, False\n    for ch in passwd:\n        if ch in '0123456789':\n            pnum = True\n        if 'A' <= ch <= 'Z':\n            pupper = True\n        if 'a' <= ch <= 'z':\n            plower = True\n    result = plen + pnum + pupper + plower\n    return result\n\nwhile True:\n    pw = input()\n    if pw == '':\n        break\n    s = judge(pw)\n    if s <= 2:\n        print('弱密码')\n    elif s == 3:\n        print('中等密码')\n    else:\n        print('强密码')",
   "hint": "布尔值参与加法运算时 True 等于 1、False 等于 0",
   "exp": "考查 len() 求长度、break 退出无限循环、布尔值累加计数与 if-elif 多分支。"
  },
  {
   "id": "p27-b1",
   "level": 3,
   "title": "风洞试验：空气阻力二维列表",
   "desc": "飞机高速飞行所受空气阻力 F = 0.5·C·ρ·S·v²（C 取 0.1，ρ 取 1.2）。给定 4 种截面积 S 与 5 种飞行速度 v，计算对应空气阻力（取整数）的二维列表：每行对应同一截面积、不同速度的阻力值。",
   "code": "S = [120, 130, 140, 150]\nv = [70, 160, 230, 280, 300]\nF = ___(1)___\nfor i in range(len(S)):\n    F.___(2)___([0] * len(v))\nC, p = 0.1, 1.2\nfor i in range(len(S)):\n    for j in range(___(3)___):\n        ___(4)___ = int(0.5 * C * p * S[i] * (v[j] ** 2))\nfor L in F:\n    print(L)",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "[]",
      "list()"
     ],
     "hint": "先创建空列表"
    },
    {
     "n": 2,
     "answers": [
      "append"
     ],
     "hint": "列表添加一行的方法"
    },
    {
     "n": 3,
     "answers": [
      "len(v)"
     ],
     "hint": "内层循环次数由速度个数决定"
    },
    {
     "n": 4,
     "answers": [
      "F[i][j]"
     ],
     "hint": "给第 i 行第 j 列赋值"
    }
   ],
   "stdin": "",
   "expected": "[35280, 184319, 380879, 564480, 647999]\n[38220, 199680, 412620, 611520, 702000]\n[41160, 215040, 444360, 658560, 756000]\n[44100, 230400, 476100, 705600, 810000]",
   "ref": "S = [120, 130, 140, 150]\nv = [70, 160, 230, 280, 300]\nF = []\nfor i in range(len(S)):\n    F.append([0] * len(v))\nC, p = 0.1, 1.2\nfor i in range(len(S)):\n    for j in range(len(v)):\n        F[i][j] = int(0.5 * C * p * S[i] * (v[j] ** 2))\nfor L in F:\n    print(L)",
   "hint": "二维列表 = 列表的列表；先建外层，再逐行 append 内层",
   "exp": "考查二维列表的创建与按行列下标赋值、嵌套循环遍历。"
  },
  {
   "id": "p27-b2",
   "level": 4,
   "title": "强化学习：动作组合频率统计",
   "desc": "使用列表记录智能体的状态动作组合，统计各组合出现次数，输出最高频的 3 个组合。",
   "code": "act_record = [(\"a3\", \"f1\"), (\"a1\", \"f2\"), (\"a2\", \"f3\"),\n            (\"a1\", \"f2\"), (\"a3\", \"f1\"), (\"a2\", \"f3\"),\n            (\"a2\", \"f3\"), (\"a1\", \"f1\")]\n\ndef count_act(___(1)___):\n    counts = ___(2)___\n    for af in act:\n        counts[___(3)___] = counts.get(af, 0) + 1\n    counts_list = list(counts.items())\n    counts_list.sort(key=lambda x: x[1], reverse=True)\n    return counts_list\n\nfrq_list = ___(4)___\nfor af, count in frq_list[:3]:\n    print(f\"{af}状态动作组合出现{count}次\")",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "act"
     ],
     "hint": "函数的形式参数名，函数体内遍历的是它"
    },
    {
     "n": 2,
     "answers": [
      "{}",
      "dict()"
     ],
     "hint": "空字典用于计数"
    },
    {
     "n": 3,
     "answers": [
      "af"
     ],
     "hint": "以组合本身为键累加"
    },
    {
     "n": 4,
     "answers": [
      "count_act(act_record)"
     ],
     "hint": "调用函数并传入记录列表"
    }
   ],
   "stdin": "",
   "expected": "('a2', 'f3')状态动作组合出现3次\n('a3', 'f1')状态动作组合出现2次\n('a1', 'f2')状态动作组合出现2次",
   "ref": "act_record = [(\"a3\", \"f1\"), (\"a1\", \"f2\"), (\"a2\", \"f3\"),\n            (\"a1\", \"f2\"), (\"a3\", \"f1\"), (\"a2\", \"f3\"),\n            (\"a2\", \"f3\"), (\"a1\", \"f1\")]\n\ndef count_act(act):\n    counts = {}\n    for af in act:\n        counts[af] = counts.get(af, 0) + 1\n    counts_list = list(counts.items())\n    counts_list.sort(key=lambda x: x[1], reverse=True)\n    return counts_list\n\nfrq_list = count_act(act_record)\nfor af, count in frq_list[:3]:\n    print(f\"{af}状态动作组合出现{count}次\")",
   "hint": "字典 get 计数模板 + sorted(key=lambda, reverse=True) 降序",
   "exp": "考查字典分类计数、items()、按值排序与元组解包遍历。"
  },
  {
   "id": "p27-b3",
   "level": 7,
   "title": "机器人路径：递归计数",
   "desc": "机器人在 m×n 网格左上角，每次只能向右或向下移动。递归公式：f(i, j) = f(i+1, j) + f(i, j+1)；到达边界（最后一行或最后一列）时只剩 1 条路径。输入行列数，输出路径总数。",
   "code": "def count_paths(i, j):\n    if i == m - 1 ___(1)___ j == n - 1:\n        return ___(2)___\n    else:\n        return count_paths(i + 1, j) + ___(3)___\n\nm, n = eval(input('请输入网格数，行列以英文逗号隔开：'))\nprint('测试网格为{}行{}列'.format(m, n))\nprint(f'从起点(0,0)到终点({m-1},{___(4)___})共有{count_paths(0, 0)}条路径')",
   "blanks": [
    {
     "n": 1,
     "answers": [
      "or"
     ],
     "hint": "到最后一行或最后一列都只剩一条直路"
    },
    {
     "n": 2,
     "answers": [
      "1"
     ],
     "hint": "边界条件下路径数为 1"
    },
    {
     "n": 3,
     "answers": [
      "count_paths(i, j + 1)"
     ],
     "hint": "向下走一步的递归调用"
    },
    {
     "n": 4,
     "answers": [
      "n - 1"
     ],
     "hint": "终点列下标"
    }
   ],
   "stdin": "3,4\n",
   "expected": "测试网格为3行4列\n从起点(0,0)到终点(2,3)共有10条路径",
   "ref": "def count_paths(i, j):\n    if i == m - 1 or j == n - 1:\n        return 1\n    else:\n        return count_paths(i + 1, j) + count_paths(i, j + 1)\n\nm, n = eval(input('请输入网格数，行列以英文逗号隔开：'))\nprint('测试网格为{}行{}列'.format(m, n))\nprint(f'从起点(0,0)到终点({m-1},{n-1})共有{count_paths(0, 0)}条路径')",
   "hint": "递归两要素：终止条件 + 递推调用；3行4列时答案即组合数 C(5,2)=10",
   "exp": "三级重点：递归的定义、终止条件与执行过程（网格路径计数）。"
  }
 ],
 "fixes": [
  {
   "id": "fix-l1-001",
   "level": 1,
   "title": "华氏温度转摄氏温度",
   "desc": "输入一个华氏温度（可能带小数），输出对应的摄氏温度，保留 1 位小数，输出格式如：摄氏温度为36.7度。换算公式：摄氏温度 = (华氏温度 - 32) × 5 / 9。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "f = input()\nc = (f - 32) * 5 // 9\nprint('摄氏温度为{:.2f}度'.format(c))",
   "stdin": "98\n",
   "expected": "摄氏温度为36.7度",
   "errors": [
    {
     "line": 1,
     "hint": "input() 得到的是字符串，参与算术运算前要用 float() 转换成数"
    },
    {
     "line": 2,
     "hint": "// 是整除（截断小数），温度换算要用普通除法 /"
    },
    {
     "line": 3,
     "hint": "题目要求保留 1 位小数，格式占位符应为 {:.1f}"
    }
   ],
   "ref": "f = float(input())\nc = (f - 32) * 5 / 9\nprint('摄氏温度为{:.1f}度'.format(c))",
   "exp": "考查 input 的类型转换、整除 // 与除法 / 的区别、格式化占位符 {:.1f}。三处都是一级考试高频错误点。"
  },
  {
   "id": "fix-l5-003",
   "level": 5,
   "title": "统计文件行数与最长单词",
   "desc": "站内已提供文件 words.txt（UTF-8 编码），每行存放一个英文单词。程序要输出：第一行为单词行数，如“共 5 行”；第二行为最长的单词。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "f = open('words.txt', 'w', encoding='utf-8')\nlines = f.readlines()\nf.close()\nprint('共', len(lines), '行')\nmx = lines[len(lines)]\nfor line in lines:\n    if len(line) > len(mx):\n        mx = line\nprint(mx, end='')",
   "stdin": "",
   "expected": "共 5 行\nwonderful",
   "files": [
    {
     "name": "words.txt",
     "content": "hi\nhello\nwonderful\nok\npython\n"
    }
   ],
   "errors": [
    {
     "line": 1,
     "hint": "读取文件要用 'r' 模式，'w' 模式会清空文件且不能读"
    },
    {
     "line": 5,
     "hint": "lines[len(lines)] 下标越界：最大合法下标是 len(lines)-1，应取第 1 行 lines[0] 作初始值"
    },
    {
     "line": 7,
     "hint": "readlines 读到的每行末尾带换行符 \\n，比较长度前要用 strip() 去掉（mx 同样要用去掉换行的内容）"
    }
   ],
   "ref": "f = open('words.txt', 'r', encoding='utf-8')\nlines = f.readlines()\nf.close()\nprint('共', len(lines), '行')\nmx = lines[0].strip()\nfor line in lines:\n    if len(line.strip()) > len(mx):\n        mx = line.strip()\nprint(mx, end='')",
   "exp": "考查文件打开模式（w 清空且不可读）、readlines 的下标范围（len(lines) 越界）、逐行读取后 strip() 去换行再比较。三处错误层层递进，是 L5 文件题的典型组合。"
  },
  {
   "id": "fix-l3-007",
   "level": 3,
   "title": "冒泡排序改错",
   "desc": "输入一行若干个整数（用空格分隔），程序使用冒泡排序将其升序排列后输出（同一行，空格分隔）。程序中有 3 处错误，请修改（不增删语句），不得使用 `sort()` 或 `sorted()`。",
   "buggy": "nums = [int(v) for v in input().split()]\nn = len(nums)\nfor i in range(n - 2):\n    for j in range(n - 1 - i):\n        if nums[j] < nums[j + 1]:\n            t = nums[j]\n            nums[j + 1] = t\n            nums[j] = nums[j + 1]\nprint(' '.join(str(v) for v in nums))",
   "stdin": "9 5 8 1 3\n",
   "expected": "1 3 5 8 9",
   "errors": [
    {
     "line": 3,
     "hint": "冒泡排序 n 个数最多需要 n-1 趟，外层循环次数少了一趟（写成了 range(n-2)）"
    },
    {
     "line": 5,
     "hint": "升序排序应把大的元素往后换，比较条件方向写反了（应为 nums[j] > nums[j + 1]）"
    },
    {
     "line": 8,
     "hint": "交换的两条赋值语句写反了：应先 nums[j] = nums[j + 1]，再 nums[j + 1] = t（t 中保存的是 nums[j] 的旧值）"
    }
   ],
   "ref": "nums = [int(v) for v in input().split()]\nn = len(nums)\nfor i in range(n - 1):\n    for j in range(n - 1 - i):\n        if nums[j] > nums[j + 1]:\n            t = nums[j]\n            nums[j] = nums[j + 1]\n            nums[j + 1] = t\nprint(' '.join(str(v) for v in nums))",
   "exp": "考查冒泡排序三要素：趟数（range(n-1)）、比较方向（升序用 >）与借助临时变量交换时的赋值顺序。"
  },
  {
   "id": "fix-l2-009",
   "level": 2,
   "title": "异常处理改错",
   "desc": "程序连续处理 3 组数据（共 6 行输入，每两行为一组：第一行为 a，第二行为 b），每组输出一行结果：正常时输出 a÷b 的商；若 b 为 0，输出 错误: division by zero（利用异常对象 e）；若输入不能转换成整数，输出 请输入整数！。程序中有 3 处错误，请修改（不增删语句）。",
   "buggy": "for k in range(3):\n    try:\n        a = int(input())\n        b = int(input())\n        print(a // b)\n    except ZeroDivisionError:\n        print('错误:', e)\n    except ValueError:\n        print('除数不能为零！')",
   "stdin": "7\n2\n8\n0\n3\nx\n",
   "expected": "3.5\n错误: division by zero\n请输入整数！",
   "errors": [
    {
     "line": 5,
     "hint": "题目要求输出 a÷b 的商，// 是整除（会丢掉小数部分），应使用 /"
    },
    {
     "line": 6,
     "hint": "下一行要用异常对象 e 输出错误信息，但该 except 子句漏写了 as e"
    },
    {
     "line": 9,
     "hint": "这是捕获 ValueError（输入不是整数）的分支，提示语与除零分支写混了，应输出 请输入整数！"
    }
   ],
   "ref": "for k in range(3):\n    try:\n        a = int(input())\n        b = int(input())\n        print(a / b)\n    except ZeroDivisionError as e:\n        print('错误:', e)\n    except ValueError:\n        print('请输入整数！')",
   "exp": "考查 try-except 多分支：/ 与 // 的区别、as e 接收异常对象并在分支中输出、异常类型与提示语的对应关系。"
  },
  {
   "id": "fix-l3-008",
   "level": 3,
   "title": "选择排序改错",
   "desc": "输入一行若干个整数（用空格分隔），程序使用选择排序将其升序排列后输出（同一行，空格分隔）。程序中有 3 处错误，请修改（不增删语句）。",
   "buggy": "nums = [int(v) for v in input().split()]\nn = len(nums)\nfor i in range(n - 1):\n    k = i\n    for j in range(i + 2, n):\n        if nums[j] > nums[k]:\n            k = j\n    t = nums[i]\n    nums[i] = nums[k]\n    nums[k] = nums[i]\nprint(' '.join(str(v) for v in nums))",
   "stdin": "9 5 8 1 3\n",
   "expected": "1 3 5 8 9",
   "errors": [
    {
     "line": 5,
     "hint": "内层循环应从 i+1 开始逐个检查未排序部分，起点写成 i+2 会漏看紧邻的 nums[i+1]"
    },
    {
     "line": 6,
     "hint": "升序选择排序每趟要在未排序部分找最小值，比较条件方向写反了（应为 nums[j] < nums[k]）"
    },
    {
     "line": 10,
     "hint": "交换的最后一步应把临时变量 t 赋给 nums[k]，写成 nums[i] 会让交换失效"
    }
   ],
   "ref": "nums = [int(v) for v in input().split()]\nn = len(nums)\nfor i in range(n - 1):\n    k = i\n    for j in range(i + 1, n):\n        if nums[j] < nums[k]:\n            k = j\n    t = nums[i]\n    nums[i] = nums[k]\n    nums[k] = t\nprint(' '.join(str(v) for v in nums))",
   "exp": "考查选择排序三要素：内层起点（i+1）、找最小值的比较方向（<）与借助临时变量的交换。"
  },
  {
   "id": "fix-l2-002",
   "level": 2,
   "title": "成绩等级判断",
   "desc": "循环读入整数（输入 -999 结束）：85 及以上输出 优秀，60~84 输出 及格，0~59 输出 不及格，负数输出 输入错误。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "while True:\n    s = int(input())\n    if s == -999:\n        break\n    if s > 85:\n        print('优秀')\n    elif s >= 60:\n        print('及格')\n    elif s > 0:\n        print('不及格')\n    else:\n        print('输入错误')",
   "stdin": "85\n60\n0\n-999\n",
   "expected": "优秀\n及格\n不及格",
   "errors": [
    {
     "line": 5,
     "hint": "85 分也应算优秀，条件应为 s >= 85"
    },
    {
     "line": 7,
     "hint": "60 分应算及格，条件应为 s >= 60"
    },
    {
     "line": 9,
     "hint": "0 分应算不及格，条件应为 s >= 0"
    }
   ],
   "ref": "while True:\n    s = int(input())\n    if s == -999:\n        break\n    if s >= 85:\n        print('优秀')\n    elif s >= 60:\n        print('及格')\n    elif s >= 0:\n        print('不及格')\n    else:\n        print('输入错误')",
   "exp": "考查 if-elif 多分支条件的边界值（>= 与 > 的区别）。"
  },
  {
   "id": "fix-l2-003",
   "level": 2,
   "title": "打印偶数并求和",
   "desc": "输入正整数 n，在同一行用空格分隔输出 1~n 中的所有偶数（含 n），然后换行输出它们的和，格式：1~12的偶数和: 42。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "n = int(input())\ntotal = 0\nfor i in range(2, n, 2):\n    print(i)\n    total =+ i\nprint()\nprint('1~%d的偶数和:' % n, total)",
   "stdin": "12\n",
   "expected": "2 4 6 8 10 12 \n1~12的偶数和: 42",
   "errors": [
    {
     "line": 3,
     "hint": "n 本身是偶数时也要包含，range 终点应为 n + 1"
    },
    {
     "line": 4,
     "hint": "偶数要输出在同一行，print 应加 end=' ' 参数"
    },
    {
     "line": 5,
     "hint": "total =+ i 把 + 当成了正号，累加应写 total += i"
    }
   ],
   "ref": "n = int(input())\ntotal = 0\nfor i in range(2, n + 1, 2):\n    print(i, end=' ')\n    total += i\nprint()\nprint('1~%d的偶数和:' % n, total)",
   "exp": "考查 range(start, stop, step) 边界、print 的 end 参数与 += 累加写法。"
  },
  {
   "id": "fix-l2-004",
   "level": 2,
   "title": "累加求和（死循环）",
   "desc": "程序想计算 1+2+…+10 并输出：1加到10的和: 55，但运行时陷入死循环。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "i = 1\ns = 1\nwhile i < 10:\n    s = s + i\n    j = i + 1\nprint('1加到10的和:', s)",
   "stdin": "",
   "expected": "1加到10的和: 55",
   "errors": [
    {
     "line": 2,
     "hint": "累加器 s 的初值应为 0"
    },
    {
     "line": 3,
     "hint": "10 也要加进去，条件应为 i <= 10"
    },
    {
     "line": 5,
     "hint": "更新了没用的 j，循环变量 i 永远不变导致死循环，应改为 i = i + 1"
    }
   ],
   "ref": "i = 1\ns = 0\nwhile i <= 10:\n    s = s + i\n    i = i + 1\nprint('1加到10的和:', s)",
   "exp": "考查 while 循环三要素：初值、循环条件与循环变量的更新（忘更新即死循环）。"
  },
  {
   "id": "fix-l2-005",
   "level": 2,
   "title": "统计 3 的倍数（缩进错误）",
   "desc": "输入正整数 n，统计 1~n 中能被 3 整除的数的个数与总和并输出。例如 n=15 时输出：个数: 5 与 和: 45。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "n = int(input())\ns = 0\ncnt = 0\nfor i in range(1, n):\n    if i % 3 == 0:\n        cnt = cnt + i\ns = s + i\nprint('个数:', cnt)\nprint('和:', s)",
   "stdin": "15\n",
   "expected": "个数: 5\n和: 45",
   "errors": [
    {
     "line": 4,
     "hint": "range 终点不含 n，应改为 range(1, n + 1)"
    },
    {
     "line": 6,
     "hint": "cnt 统计的是个数，应加 1 而不是加 i"
    },
    {
     "line": 7,
     "hint": "该行缩进错误：应移入 if 分支内（与上一行对齐），只累加 3 的倍数"
    }
   ],
   "ref": "n = int(input())\ns = 0\ncnt = 0\nfor i in range(1, n + 1):\n    if i % 3 == 0:\n        cnt = cnt + 1\n        s = s + i\nprint('个数:', cnt)\nprint('和:', s)",
   "exp": "考查 range 边界、计数与累加的区别以及缩进决定语句归属的规则。"
  },
  {
   "id": "fix-l2-006",
   "level": 2,
   "title": "break 与 continue 误用",
   "desc": "输出 1~20 中的所有奇数（同一行用空格分隔），一旦遇到大于 15 的奇数就停止输出，然后统计实际输出的个数。正确输出：1 3 5 7 9 11 13 15 与 个数: 8。程序把 break/continue 用反了，连同计数器初值共 3 处错误，请修改（不增删语句）。",
   "buggy": "cnt = 1\nfor i in range(1, 21):\n    if i % 2 == 0:\n        break\n    if i > 15:\n        continue\n    print(i, end=' ')\n    cnt += 1\nprint()\nprint('个数:', cnt)",
   "stdin": "",
   "expected": "1 3 5 7 9 11 13 15 \n个数: 8",
   "errors": [
    {
     "line": 1,
     "hint": "计数器初值应为 0"
    },
    {
     "line": 4,
     "hint": "遇到偶数只是跳过本次继续循环，应该用 continue 而不是 break"
    },
    {
     "line": 6,
     "hint": "遇到大于 15 的奇数要结束整个循环，应该用 break 而不是 continue"
    }
   ],
   "ref": "cnt = 0\nfor i in range(1, 21):\n    if i % 2 == 0:\n        continue\n    if i > 15:\n        break\n    print(i, end=' ')\n    cnt += 1\nprint()\nprint('个数:', cnt)",
   "exp": "考查 break（结束整个循环）与 continue（跳过本次循环）的区别。"
  },
  {
   "id": "fix-l3-001",
   "level": 3,
   "title": "字符串切片",
   "desc": "输入一个字符串（如 Python），依次输出：前 3 个字符、后 2 个字符、反转后的字符串。正确输出：前3个字符: Pyt、后2个字符: on、反转: nohtyP。程序有 3 处切片错误，请修改（不增删语句）。",
   "buggy": "s = input()\nprint('前3个字符:', s[1:3])\nprint('后2个字符:', s[2:])\nprint('反转:', s[::1])",
   "stdin": "Python\n",
   "expected": "前3个字符: Pyt\n后2个字符: on\n反转: nohtyP",
   "errors": [
    {
     "line": 2,
     "hint": "前 3 个字符应从头开始：s[:3] 或 s[0:3]"
    },
    {
     "line": 3,
     "hint": "后 2 个字符用负索引：s[-2:]"
    },
    {
     "line": 4,
     "hint": "反转要使用步长 -1：s[::-1]"
    }
   ],
   "ref": "s = input()\nprint('前3个字符:', s[:3])\nprint('后2个字符:', s[-2:])\nprint('反转:', s[::-1])",
   "exp": "考查切片语法 [start:stop:step]：省略起点、负索引与负步长。"
  },
  {
   "id": "fix-l3-002",
   "level": 3,
   "title": "列表方法返回值",
   "desc": "程序想把列表 [5, 2, 8, 9, 7] 升序排序、删除其中的 2、再在末尾添加 10，最后输出：[5, 7, 8, 9, 10]。运行却报错。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "nums = [5, 2, 8, 9, 7]\nnums = nums.sort()\nnums = nums.remove(2)\nnums = nums.append(10)\nprint(nums)",
   "stdin": "",
   "expected": "[5, 7, 8, 9, 10]",
   "errors": [
    {
     "line": 2,
     "hint": "sort() 原地排序并返回 None，应直接写 nums.sort()"
    },
    {
     "line": 3,
     "hint": "remove() 返回 None，应直接写 nums.remove(2)"
    },
    {
     "line": 4,
     "hint": "append() 返回 None，应直接写 nums.append(10)"
    }
   ],
   "ref": "nums = [5, 2, 8, 9, 7]\nnums.sort()\nnums.remove(2)\nnums.append(10)\nprint(nums)",
   "exp": "考查列表 sort/remove/append 均为原地操作、返回值是 None，不能再赋回变量。"
  },
  {
   "id": "fix-l3-003",
   "level": 3,
   "title": "字典统计次数",
   "desc": "统计列表 [3, 5, 3, 7, 5, 3] 中每个数出现的次数，输出：3出现了 3 次、5出现了 2 次、所有次数: [3, 2, 1]。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "nums = [3, 5, 3, 7, 5, 3]\nd = []\nfor x in nums:\n    d[x] = d.get(x, 0) + 1\nprint('3出现了', d[3], '次')\nprint('5出现了', d['5'], '次')\nprint('所有次数:', d.values())",
   "stdin": "",
   "expected": "3出现了 3 次\n5出现了 2 次\n所有次数: [3, 2, 1]",
   "errors": [
    {
     "line": 2,
     "hint": "统计用的容器应是字典 {} 而不是列表 []"
    },
    {
     "line": 6,
     "hint": "键是整数，d['5'] 应改为 d[5]"
    },
    {
     "line": 7,
     "hint": "dict_values 不是列表，应输出 list(d.values())"
    }
   ],
   "ref": "nums = [3, 5, 3, 7, 5, 3]\nd = {}\nfor x in nums:\n    d[x] = d.get(x, 0) + 1\nprint('3出现了', d[3], '次')\nprint('5出现了', d[5], '次')\nprint('所有次数:', list(d.values()))",
   "exp": "考查字典创建、键类型必须与存入时一致（整数键）、values() 需转列表输出。"
  },
  {
   "id": "fix-l3-004",
   "level": 3,
   "title": "可变对象作默认参数",
   "desc": "tag_page(title) 想把标题加入标签列表并返回：tag_page('基础') 应返回 ['基础']，tag_page('提高') 应返回 ['提高']。程序还输出 p1 的最后一个标签（基础）和 p2 的长度（1）。现在运行报错且结果不对，共 3 处错误，请修改（不增删语句）。",
   "buggy": "def tag_page(title, tags=['Python']):\n    tags.append(title)\n    return tags\n\np1 = tag_page('基础')\ntag_page('提高')\nprint(p1)\nprint(p2)\nprint(p1[-1])\nprint(len(p2))",
   "stdin": "",
   "expected": "['基础']\n['提高']\n基础\n1",
   "errors": [
    {
     "line": 1,
     "hint": "默认参数不应预设非空列表，应改为 tags=[]"
    },
    {
     "line": 2,
     "hint": "append 会修改共享的默认列表，应改为 tags = tags + [title] 生成新列表"
    },
    {
     "line": 6,
     "hint": "函数返回值应接收保存：p2 = tag_page('提高')"
    }
   ],
   "ref": "def tag_page(title, tags=[]):\n    tags = tags + [title]\n    return tags\n\np1 = tag_page('基础')\np2 = tag_page('提高')\nprint(p1)\nprint(p2)\nprint(p1[-1])\nprint(len(p2))",
   "exp": "考查可变对象作默认参数的陷阱：默认列表在多次调用间共享，应避免原地修改（或改用 tags=[] 配合生成新列表），以及返回值要接收。"
  },
  {
   "id": "fix-l4-001",
   "level": 4,
   "title": "函数累计消费金额",
   "desc": "consume(money, t) 表示在当前累计 t 的基础上消费 money，返回新累计。依次消费 100、200、300 后输出合计，正确输出：合计: 600。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "total = 0\ndef consume(money, t):\n    t = t + money\n    return t\n\ntotal = consume(100, total)\ntotal = consume(200)\nconsume(300, total)\nprint('合计:', t)",
   "stdin": "",
   "expected": "合计: 600",
   "errors": [
    {
     "line": 7,
     "hint": "调用时漏传了当前累计值 total，应为 consume(200, total)"
    },
    {
     "line": 8,
     "hint": "函数的返回值没有被接收，累加结果被丢弃，应写 total = consume(300, total)"
    },
    {
     "line": 9,
     "hint": "t 是函数内部的局部变量，函数外应输出全局变量 total"
    }
   ],
   "ref": "total = 0\ndef consume(money, t):\n    t = t + money\n    return t\n\ntotal = consume(100, total)\ntotal = consume(200, total)\ntotal = consume(300, total)\nprint('合计:', total)",
   "exp": "考查局部变量与全局变量的作用域、参数传递与函数返回值的接收。"
  },
  {
   "id": "fix-l4-002",
   "level": 4,
   "title": "求幂函数的返回值",
   "desc": "函数 power(x, y) 用循环计算 x 的 y 次方。程序想输出 power(2, 10) + power(3, 3) 的结果 1051，但运行报错。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "def power(x, y):\n    r = 0\n    for i in range(y):\n        r = r * x\n    print(r)\n\npower(2, 10)\nb = power(3, 3)\nprint(a + b)",
   "stdin": "",
   "expected": "1051",
   "errors": [
    {
     "line": 2,
     "hint": "累乘器初值应为 1，0 乘任何数都是 0"
    },
    {
     "line": 5,
     "hint": "应把结果 return 回去，而不是 print 出来"
    },
    {
     "line": 7,
     "hint": "返回值应接收保存：a = power(2, 10)"
    }
   ],
   "ref": "def power(x, y):\n    r = 1\n    for i in range(y):\n        r = r * x\n    return r\n\na = power(2, 10)\nb = power(3, 3)\nprint(a + b)",
   "exp": "考查函数 return 与 print 的区别：没有 return 的函数返回 None。"
  },
  {
   "id": "fix-l4-003",
   "level": 4,
   "title": "递归斐波那契",
   "desc": "递归函数 fib(n) 返回斐波那契数列第 n 项（f(1)=f(2)=1），程序想输出 fib(10) 即 55。程序有 3 处错误，请修改（不增删语句）。",
   "buggy": "def fib(n):\n    if n == 1:\n        return 1\n    return fib(n - 1) + fib(n - 1)\n\nprint(fib(9))",
   "stdin": "",
   "expected": "55",
   "errors": [
    {
     "line": 2,
     "hint": "递归基例缺少 n == 2，应为 if n == 1 or n == 2"
    },
    {
     "line": 4,
     "hint": "递推式应为 fib(n - 1) + fib(n - 2)，第二项写重了"
    },
    {
     "line": 6,
     "hint": "题目要求输出第 10 项，实参应为 fib(10)"
    }
   ],
   "ref": "def fib(n):\n    if n == 1 or n == 2:\n        return 1\n    return fib(n - 1) + fib(n - 2)\n\nprint(fib(10))",
   "exp": "考查递归三要素：基例必须完整（n=1 与 n=2）、递推式正确、调用实参正确。"
  },
  {
   "id": "fix-l5-001",
   "level": 5,
   "title": "日志文件追加记录",
   "desc": "log.txt（UTF-8 编码）已有一行日志。程序要把新日志 2026-09-25 登录成功 追加到文件末尾（保留原有内容，新日志独占一行），然后读出整个文件打印。正确输出两行：2026-09-23 启动系统 与 2026-09-25 登录成功。程序有 3 处错误，请修改（不增删语句）。",
   "files": [
    {
     "name": "log.txt",
     "content": "2026-09-23 启动系统\n"
    }
   ],
   "buggy": "f = open('log.txt', 'w', encoding='utf-8')\nf.write('2026-09-25 登录成功')\nf.close()\ng = open('log.txt', 'w', encoding='utf-8')\nprint(g.read(), end='')\ng.close()",
   "stdin": "",
   "expected": "2026-09-23 启动系统\n2026-09-25 登录成功\n",
   "errors": [
    {
     "line": 1,
     "hint": "'w' 模式会清空原文件，追加应使用 'a' 模式"
    },
    {
     "line": 2,
     "hint": "写入内容末尾缺少换行符 \\n"
    },
    {
     "line": 4,
     "hint": "读取文件应使用 'r' 模式，'w' 模式打开的文件不能读"
    }
   ],
   "ref": "f = open('log.txt', 'a', encoding='utf-8')\nf.write('2026-09-25 登录成功\\n')\nf.close()\ng = open('log.txt', 'r', encoding='utf-8')\nprint(g.read(), end='')\ng.close()",
   "exp": "考查文件打开模式：r 读、w 写（清空）、a 追加，以及 write 不会自动换行。"
  },
  {
   "id": "fix-l5-002",
   "level": 5,
   "title": "读取数字文件求和",
   "desc": "nums.txt（UTF-8 编码）每行存放一个整数。程序要统计个数、总和与最大值并输出：共 4 个数、总和: 55、最大值: 30。程序有 3 处错误，请修改（不增删语句）。",
   "files": [
    {
     "name": "nums.txt",
     "content": "12\n5\n30\n8\n"
    }
   ],
   "buggy": "f = open('nums.txt', 'r', encoding='utf-8')\ntotal = 0\nmx = 0\ncnt == 0\nfor line in f:\n    total = total + line\n    if line > mx:\n        mx = line\n    cnt = cnt + 1\nf.close()\nprint('共', cnt, '个数')\nprint('总和:', total)\nprint('最大值:', mx)",
   "stdin": "",
   "expected": "共 4 个数\n总和: 55\n最大值: 30",
   "errors": [
    {
     "line": 4,
     "hint": "cnt == 0 是比较不是赋值，应为 cnt = 0"
    },
    {
     "line": 6,
     "hint": "从文件读到的 line 是字符串，求和前要 int(line) 转换"
    },
    {
     "line": 7,
     "hint": "比较大小时同样要 int(line) 转换后再比较"
    }
   ],
   "ref": "f = open('nums.txt', 'r', encoding='utf-8')\ntotal = 0\nmx = 0\ncnt = 0\nfor line in f:\n    total = total + int(line)\n    if int(line) > mx:\n        mx = int(line)\n    cnt = cnt + 1\nf.close()\nprint('共', cnt, '个数')\nprint('总和:', total)\nprint('最大值:', mx)",
   "exp": "考查 == 与 = 的区别，以及文件逐行读到的字符串必须转换类型后才能运算比较。"
  },
  {
   "id": "fix-l6-001",
   "level": 6,
   "title": "turtle 画正方形",
   "desc": "程序要用红色画笔画一个边长 100 的正方形（每画完一条边左转 90 度），画完抬起画笔，然后打印验证信息。正确输出：画笔颜色: red、落点: 0 0、画笔按下: False。程序有 3 处错误，请修改（不增删语句）。本站已内置 turtle 画布。",
   "buggy": "import turtle\nt = turtle.Turtle()\nt.pencolor('blue')\nfor i in range(4):\n    t.forward(100)\n    t.left(45)\nt.pendown()\nprint('画笔颜色:', t.pencolor())\nprint('落点:', round(t.xcor()), round(t.ycor()))\nprint('画笔按下:', t.isdown())",
   "stdin": "",
   "expected": "画笔颜色: red\n落点: 0 0\n画笔按下: False",
   "errors": [
    {
     "line": 3,
     "hint": "题目要求红色画笔，应为 pencolor('red')"
    },
    {
     "line": 6,
     "hint": "正方形每个外角是 90 度，left(45) 转角度数不对"
    },
    {
     "line": 7,
     "hint": "画完后应抬起画笔 penup()，而不是落下 pendown()"
    }
   ],
   "ref": "import turtle\nt = turtle.Turtle()\nt.pencolor('red')\nfor i in range(4):\n    t.forward(100)\n    t.left(90)\nt.penup()\nprint('画笔颜色:', t.pencolor())\nprint('落点:', round(t.xcor()), round(t.ycor()))\nprint('画笔按下:', t.isdown())",
   "exp": "考查 turtle 画笔颜色、正方形转角 90 度与 penup/pendown 画笔状态。"
  },
  {
   "id": "fix-l7-002",
   "level": 7,
   "title": "SQLite 成绩入库与查询",
   "desc": "程序先把 3 名学生的成绩写入 stu.db（先删除旧表再新建）并提交，然后重新连接数据库，输入一个分数线，查询并输出所有成绩不低于该分数线的记录（按成绩升序，每行“姓名 分数”）。程序中有 3 处错误，请修改（不增删语句）。测试输入：80",
   "buggy": "import sqlite3\n\nconn = sqlite3.connect('stu.db')\ncur = conn.cursor()\ncur.execute('DROP TABLE IF EXISTS stu')\ncur.execute('CREATE TABLE stu(name TEXT, score INTEGER)')\ncur.execute('INSERT INTO stu VALUES(?, ?)', ('张三', 85))\ncur.execute('INSERT INTO stu VALUES(?, ?)', ('李四', 72))\ncur.execute('INSERT INTO stu VALUES(?, ?)', ('王强', 90))\nconn.commit\nconn.close()\n\nconn = sqlite3.connect('stu.db')\ncur = conn.cursor()\nn = int(input())\ncur.execute('SELECT name, score FROM stu WHERE score >= ? ORDER BY score', n)\nrows = cur.fetchone()\nfor row in rows:\n    print(row[0], row[1])\nconn.close()",
   "stdin": "80\n",
   "expected": "张三 85\n王强 90",
   "errors": [
    {
     "line": 10,
     "hint": "commit 是方法，必须加括号调用才会真正提交事务；现在数据没有提交，关闭连接后被回滚，重新连接查不到数据"
    },
    {
     "line": 16,
     "hint": "占位符 ? 的参数必须以元组形式提供：单个元素要写成 (n,)，直接传 n 会绑定失败"
    },
    {
     "line": 17,
     "hint": "题目要输出所有满足条件的记录，fetchone() 只取第一条，应使用 fetchall()"
    }
   ],
   "ref": "import sqlite3\n\nconn = sqlite3.connect('stu.db')\ncur = conn.cursor()\ncur.execute('DROP TABLE IF EXISTS stu')\ncur.execute('CREATE TABLE stu(name TEXT, score INTEGER)')\ncur.execute('INSERT INTO stu VALUES(?, ?)', ('张三', 85))\ncur.execute('INSERT INTO stu VALUES(?, ?)', ('李四', 72))\ncur.execute('INSERT INTO stu VALUES(?, ?)', ('王强', 90))\nconn.commit()\nconn.close()\n\nconn = sqlite3.connect('stu.db')\ncur = conn.cursor()\nn = int(input())\ncur.execute('SELECT name, score FROM stu WHERE score >= ? ORDER BY score', (n,))\nrows = cur.fetchall()\nfor row in rows:\n    print(row[0], row[1])\nconn.close()",
   "hint": "commit 要加括号调用；占位符参数用 (n,)；取全部记录用 fetchall()",
   "exp": "考查 SQLite 事务提交（未提交即关闭会被回滚）、占位符参数必须以元组传入、fetchone 与 fetchall 的区别。"
  },
  {
   "id": "fix-l7-003",
   "level": 7,
   "title": "提取文本中的小数",
   "desc": "输入一行文本，先输出其中第一个小数（形如 12.5，小数点前至少一位数字），再逐行输出文本中的所有小数，最后输出小数总个数。程序中有 3 处错误，请修改（不增删语句）。测试输入：订单号 2026，苹果 12.5 元，香蕉 3.99 元",
   "buggy": "import re\n\ns = input()\nm = re.findall(r'\\d+\\.\\d+', s)\nprint('第一个小数:', m.group())\nnums = re.findall(r'\\d+.\\d+', s)\nfor x in nums:\n    print(x)\nprint('共', len(m), '个小数')",
   "stdin": "订单号 2026，苹果 12.5 元，香蕉 3.99 元\n",
   "expected": "第一个小数: 12.5\n12.5\n3.99\n共 2 个小数",
   "errors": [
    {
     "line": 4,
     "hint": "取第一个匹配应该用 re.search；re.findall 返回的是列表，列表没有 group 方法"
    },
    {
     "line": 6,
     "hint": "模式中的小数点没有转义，. 会匹配任意字符，把 2026 这样的整数也误判为小数；应写成 \\."
    },
    {
     "line": 9,
     "hint": "统计所有小数的个数应该用 nums 的长度；search 得到的匹配对象没有长度"
    }
   ],
   "ref": "import re\n\ns = input()\nm = re.search(r'\\d+\\.\\d+', s)\nprint('第一个小数:', m.group())\nnums = re.findall(r'\\d+\\.\\d+', s)\nfor x in nums:\n    print(x)\nprint('共', len(nums), '个小数')",
   "hint": "取第一个匹配用 search；findall 才返回全部匹配；模式中的点号必须转义成 \\.",
   "exp": "考查 re.search 与 re.findall 的区别、匹配对象与列表用法的不同、元字符 . 未转义造成的误匹配。"
  },
  {
   "id": "fix-l7-004",
   "level": 7,
   "title": "Student 类的三处错误",
   "desc": "定义 Student 类：构造方法保存姓名和分数，实例方法 grade() 按分数返回等级（≥90 优秀，≥60 及格，否则不及格）。程序创建实例并按“姓名 分数 等级”输出。程序中有 3 处错误，请修改（不增删语句）。本题无输入。",
   "buggy": "class Student:\n    def __init(self, name, score):\n        self.name = name\n        self.score = score\n\n    def grade():\n        if self.score >= 90:\n            return '优秀'\n        elif self.score >= 60:\n            return '及格'\n        else:\n            return '不及格'\n\ns = Student(73, '王五')\nprint(s.name, s.score, s.grade())",
   "stdin": "",
   "expected": "王五 73 及格",
   "errors": [
    {
     "line": 2,
     "hint": "构造方法名拼写错误：必须是 __init__（前后各两个下划线），否则实例化传参会报 TypeError"
    },
    {
     "line": 6,
     "hint": "实例方法定义缺少第一个参数 self，实例调用 s.grade() 时会自动传入对象，导致参数个数不符"
    },
    {
     "line": 14,
     "hint": "实例化时实参顺序与形参不一致：73 会赋给 name、'王五' 赋给 score，等级比较时发生类型错误"
    }
   ],
   "ref": "class Student:\n    def __init__(self, name, score):\n        self.name = name\n        self.score = score\n\n    def grade(self):\n        if self.score >= 90:\n            return '优秀'\n        elif self.score >= 60:\n            return '及格'\n        else:\n            return '不及格'\n\ns = Student('王五', 73)\nprint(s.name, s.score, s.grade())",
   "hint": "构造方法名是 __init__；实例方法必须有 self；实参顺序要与形参一致",
   "exp": "考查构造方法 __init__ 的拼写、实例方法 self 参数、实例化时实参与形参的对应关系。"
  },
  {
   "id": "fix-l7-005",
   "level": 7,
   "title": "递归求阶乘",
   "desc": "输入正整数 n，用递归函数 fact 计算 n 的阶乘并输出结果。程序中有 3 处错误，请修改（不增删语句）。测试输入：5",
   "buggy": "def fact(n):\n    if n >= 1:\n        return 0\n    return n * fact(n)\n\nn = int(input())\nprint(fact(n))",
   "stdin": "5\n",
   "expected": "120",
   "errors": [
    {
     "line": 2,
     "hint": "基例条件写错：n >= 1 把所有正整数输入都拦截并直接返回了，应当只在 n == 1 时返回基例值"
    },
    {
     "line": 3,
     "hint": "基例返回值错误：递归到 1 时应返回 1，返回 0 会使整个乘积变成 0"
    },
    {
     "line": 4,
     "hint": "递归调用的参数不收敛：fact(n) 传的还是 n，会无限递归，应改为 fact(n - 1)"
    }
   ],
   "ref": "def fact(n):\n    if n == 1:\n        return 1\n    return n * fact(n - 1)\n\nn = int(input())\nprint(fact(n))",
   "hint": "基例 n == 1 时返回 1；递归调用必须用 n - 1 向基例收敛",
   "exp": "考查递归三要素：基例条件、基例返回值、递归调用参数必须向基例收敛（否则无限递归）。"
  },
  {
   "id": "fix-l7-006",
   "level": 7,
   "title": "JSON 城市人口统计",
   "desc": "city.json 存放城市人口 JSON 数组（每个元素含 city、pop 两个键）。程序读取并解析该文件，累加总人口，把 {\"total\": 总人口} 用 json.dumps 写入 out.json，再读回并输出“统计结果: {...}”。程序中有 3 处错误，请修改（不增删语句）。本题无输入。",
   "buggy": "import json\n\nf = open('city.json', 'r', encoding='utf-8')\ndata = json.dumps(f)\nf.close()\ntotal = 0\nfor d in data.keys():\n    total = total + d['pop']\nfw = open('out.json', 'r', encoding='utf-8')\nfw.write(json.dumps({'total': total}, ensure_ascii=False))\nfw.close()\nfr = open('out.json', 'r', encoding='utf-8')\nprint('统计结果:', fr.read())\nfr.close()",
   "stdin": "",
   "files": [
    {
     "name": "city.json",
     "content": "[{\"city\": \"北京\", \"pop\": 2189}, {\"city\": \"上海\", \"pop\": 2487}, {\"city\": \"广州\", \"pop\": 1868}]"
    }
   ],
   "expected": "统计结果: {\"total\": 6544}",
   "errors": [
    {
     "line": 4,
     "hint": "从文件读取 JSON 应该用 json.load(f)；json.dumps 是把对象序列化成字符串，方向用反了，而且文件对象不能被序列化"
    },
    {
     "line": 7,
     "hint": "data 是列表，列表没有 keys 方法；应直接遍历列表，每个 d 是一个城市字典"
    },
    {
     "line": 9,
     "hint": "要把统计结果写入 out.json，必须用 'w' 写模式打开，用 'r' 打开后不可写"
    }
   ],
   "ref": "import json\n\nf = open('city.json', 'r', encoding='utf-8')\ndata = json.load(f)\nf.close()\ntotal = 0\nfor d in data:\n    total = total + d['pop']\nfw = open('out.json', 'w', encoding='utf-8')\nfw.write(json.dumps({'total': total}, ensure_ascii=False))\nfw.close()\nfr = open('out.json', 'r', encoding='utf-8')\nprint('统计结果:', fr.read())\nfr.close()",
   "hint": "读 JSON 用 json.load；遍历列表直接 for d in data；写文件用 'w' 模式",
   "exp": "考查 json.load 与 json.dumps 的方向、列表与字典遍历方式的区别、open 写模式的正确使用。"
  },
  {
   "id": "fix-l2-001",
   "level": 2,
   "title": "打印数字三角形",
   "desc": "输入一个 1-9 之间的正整数 n，打印 n 行数字三角形：第 m 行输出 1 到 m 的数字连在一起。若 n 不在 1-9 范围内则输出提示语。程序中有 3 处错误，请修改（不增删语句）。",
   "buggy": "line = input()\nn = int(line)\nif n > 9:\n    for m in range(1, n + 1):\n        for i in range(1, m + 1):\n            print(i, end='')\n        print()\nelse:\n    print('输入的行数不能超过9！')",
   "stdin": "4\n",
   "expected": "1\n12\n123\n1234",
   "errors": [
    {
     "line": 3,
     "hint": "题目要求 1-9 之间打印三角形，范围判断条件写反了"
    },
    {
     "line": 7,
     "hint": "每个数字打印后要换行，print() 的位置与内层循环的关系要想清楚"
    },
    {
     "line": 8,
     "hint": "else 分支对应的提示语在输入合法时也会被检查"
    }
   ],
   "ref": "line = input()\nn = int(line)\nif n <= 9:\n    for m in range(1, n + 1):\n        for i in range(1, m + 1):\n            print(i, end='')\n        print()\nelse:\n    print('输入的行数不能超过9！')",
   "exp": "考查 if 选择结构、range 范围、嵌套循环与 print 的 end 参数。"
  },
  {
   "id": "p27-f1",
   "level": 2,
   "title": "调试题1：自动驾驶奖励函数",
   "desc": "根据车辆偏离航向角度（浮点数，可多次输入，输入 q 退出）给出奖励信号：|角度|≤5° 奖励 2.0；5°<|角度|≤15° 奖励 1.0-0.1×(|角度|-5)；其他为 -1.0。每次输出格式如“角度:2.3°；奖励:2.00”（保留2位小数）。程序有 3 处错误，不增删语句修改（本站以运行结果判分，不要求 #### 标记）。",
   "buggy": "angle = input()\nwhile angle != 'q':\n    a = float(angle)\n    if abs(a) > 5:\n        reward = 2.0\n    elif abs(a) < 15:\n        reward = 1.0 - 0.1 * (abs(a) - 5)\n    else:\n        reward = -1.0\n    print('角度:{}°；奖励:{}'.format(a, reward))\n    angle = input()",
   "stdin": "2.3\n-10.7\n18.5\nq\n",
   "expected": "角度:2.3°；奖励:2.00\n角度:-10.7°；奖励:0.43\n角度:18.5°；奖励:-1.00",
   "errors": [
    {
     "line": 4,
     "hint": "5°以内（含）奖励 2.0 —— 条件方向写反了"
    },
    {
     "line": 6,
     "hint": "5°到15°间（含15°）—— 边界值被排除了"
    },
    {
     "line": 10,
     "hint": "奖励要精确到 2 位小数 —— 格式化缺了精度"
    }
   ],
   "ref": "angle = input()\nwhile angle != 'q':\n    a = float(angle)\n    if abs(a) <= 5:\n        reward = 2.0\n    elif abs(a) <= 15:\n        reward = 1.0 - 0.1 * (abs(a) - 5)\n    else:\n        reward = -1.0\n    print('角度:{}°；奖励:{:.2f}'.format(a, reward))\n    angle = input()",
   "exp": "考查 if-elif 多分支的边界条件与 format 保留小数。"
  },
  {
   "id": "p27-f2",
   "level": 3,
   "title": "调试题2：视觉反应字符方阵",
   "desc": "输入 3~9 之间的整数 n，生成 n×n 字符方阵：由数字 n 组成、混杂一个其他随机数字；输入 2 时输出“请重新输入”；输入 x 或 X 退出。为使判题可复现，本站版本已固定随机种子（random.seed(7)，不得改动）。",
   "buggy": "import random\nrandom.seed(7)\nn = input()\nwhile n != 'x' or n != 'X':\n    num = int(n)\n    if num < 3 and num > 9:\n        print('请重新输入')\n    else:\n        pos = random.randint(0, num * num - 1)\n        other = random.randint(0, 9)\n        if other == num:\n            other = (num + 1) % 10\n        for k in range(num * num):\n            if k == pos:\n                ch = str(other)\n            else:\n                ch = str(num)\n            print(ch, end='')\n            if k % num == 0:\n                print()\n    n = input()",
   "stdin": "2\n3\n4\nX\n",
   "expected": "请重新输入\n333\n332\n333\n4444\n4444\n4444\n0444",
   "errors": [
    {
     "line": 4,
     "hint": "x 或 X 都要退出 —— and/or 逻辑写反成了永真死循环"
    },
    {
     "line": 5,
     "hint": "3~9 之外（含 2）都要重新输入 —— 范围连接词错了"
    },
    {
     "line": 17,
     "hint": "每输出满 n 个字符换一行 —— 取余位置错了"
    }
   ],
   "ref": "import random\nrandom.seed(7)\nn = input()\nwhile n != 'x' and n != 'X':\n    num = int(n)\n    if num < 3 or num > 9:\n        print('请重新输入')\n    else:\n        pos = random.randint(0, num * num - 1)\n        other = random.randint(0, 9)\n        if other == num:\n            other = (num + 1) % 10\n        for k in range(num * num):\n            if k == pos:\n                ch = str(other)\n            else:\n                ch = str(num)\n            print(ch, end='')\n            if k % num == num - 1:\n                print()\n    n = input()",
   "exp": "考查 while 循环退出条件、多分支范围判断、嵌套循环按行输出与随机数固定种子。"
  },
  {
   "id": "p27-f3",
   "level": 3,
   "title": "调试题3：八卦与二进制",
   "desc": "八卦蕴含二进制思想：乾111、坎010、艮100、震001、巽110、离101、坤000、兑011。输入卦名字符串，输出“卦名 --> 对应二进制串”（按输入顺序拼接）。如输入 艮巽坎坤 输出 艮巽坎坤 --> 100110010000。程序有 3 处错误。",
   "buggy": "bagua = {'乾': '111', '坎': '001', '艮': '100', '震': '001',\n         '巽': '110', '离': '101', '坤': '000', '兑': '011'}\ns = input('请输入卦名字符串:')\nout = ''\nfor ch in bagua:\n    out = bagua[ch] + out\nprint(s, '-->', out)",
   "stdin": "艮巽坎坤\n",
   "expected": "艮巽坎坤 --> 100110010000",
   "errors": [
    {
     "line": 4,
     "hint": "字典里 坎 的二进制抄错了，对照八卦表检查"
    },
    {
     "line": 5,
     "hint": "应遍历输入的字符串，而不是遍历字典"
    },
    {
     "line": 6,
     "hint": "二进制串要按输入顺序拼接 —— 前后接反了"
    }
   ],
   "ref": "bagua = {'乾': '111', '坎': '010', '艮': '100', '震': '001',\n         '巽': '110', '离': '101', '坤': '000', '兑': '011'}\ns = input('请输入卦名字符串:')\nout = ''\nfor ch in s:\n    out = out + bagua[ch]\nprint(s, '-->', out)",
   "exp": "考查字典建表与按键取值、字符串按序拼接、遍历对象的选择。"
  }
 ],
 "coding": [
  {
   "id": "code-l2-006",
   "level": 2,
   "title": "顺序查找",
   "desc": "输入两行：第一行为若干个整数（用空格分隔），第二行为要查找的目标值 x。程序用顺序查找在列表中查找 x：若找到，输出 x 第一次出现处的下标（从 0 开始）；若找不到，输出 -1。要求用循环逐个比较实现，不得使用 `index()` 方法。",
   "starter": "# 读入一行整数与目标值，顺序查找输出下标或 -1\n",
   "tests": [
    {
     "stdin": "10 20 30 40 50\n30\n",
     "expected": "2"
    },
    {
     "stdin": "10 20 30 40 50\n35\n",
     "expected": "-1"
    },
    {
     "stdin": "5 3 8 3 9\n3\n",
     "expected": "1"
    }
   ],
   "ref": "s = input().split()\nnums = []\nfor v in s:\n    nums.append(int(v))\nx = int(input())\nidx = -1\nfor i in range(len(nums)):\n    if nums[i] == x:\n        idx = i\n        break\nprint(idx)",
   "hint": "先把 idx 设为 -1 作为“未找到”的标记；用 for i in range(len(nums)) 逐个比较，相等时记下 i 并 break，保证输出的是第一次出现的下标。",
   "exp": "考查列表遍历、条件判断、break 的使用与哨兵变量设计——顺序查找是最基础的查找算法，真题常考“找到输出下标、找不到输出-1”。",
   "tags": [
    "列表",
    "循环",
    "查找"
   ]
  },
  {
   "id": "code-l2-007",
   "level": 2,
   "title": "角谷猜想",
   "desc": "角谷猜想：对任一正整数，若是偶数就把它减半（`n//2`），若是奇数就把它变成 `3n+1`，如此反复最终会变成 1。输入一个正整数 n，输出每一次变换，每行格式为 当前值->变换后的值（如 6->3），全部变换完后最后一行输出 共N步（N 为变换总次数）。若输入的 n 本身就是 1，则直接输出 共0步。",
   "starter": "# 按角谷猜想规则变换，输出每次变化与总步数\n",
   "tests": [
    {
     "stdin": "6\n",
     "expected": "6->3\n3->10\n10->5\n5->16\n16->8\n8->4\n4->2\n2->1\n共8步"
    },
    {
     "stdin": "1\n",
     "expected": "共0步"
    },
    {
     "stdin": "7\n",
     "expected": "7->22\n22->11\n11->34\n34->17\n17->52\n52->26\n26->13\n13->40\n40->20\n20->10\n10->5\n5->16\n16->8\n8->4\n4->2\n2->1\n共16步"
    }
   ],
   "ref": "n = int(input())\ncount = 0\nwhile n != 1:\n    if n % 2 == 0:\n        m = n // 2\n    else:\n        m = n * 3 + 1\n    print('{}->{}'.format(n, m))\n    n = m\n    count += 1\nprint('共{}步'.format(count))",
   "hint": "用 while n != 1 控制变换；偶数用 // 整除 2，奇数乘 3 加 1；每变换一次计数器加 1。",
   "exp": "考查 while 循环、奇偶判断（%）、变量迭代与 format 格式化输出——角谷猜想是循环类真题的经典题型。",
   "tags": [
    "循环",
    "while",
    "经典算法"
   ]
  },
  {
   "id": "code-l2-008",
   "level": 2,
   "title": "完全数判断",
   "desc": "完全数指它所有真因子（除自身以外的全部正约数）之和恰好等于它本身。例如 6 的真因子是 1、2、3，且 1+2+3=6，所以 6 是完全数。输入一个正整数 n，按从小到大的顺序输出 2~n（含 n）之间的所有完全数，每个数占一行；若该范围内没有完全数，则不输出任何内容。",
   "starter": "# 枚举 2~n，求每个数的真因子之和，判断是否为完全数\n",
   "tests": [
    {
     "stdin": "1000\n",
     "expected": "6\n28\n496"
    },
    {
     "stdin": "30\n",
     "expected": "6\n28"
    },
    {
     "stdin": "496\n",
     "expected": "6\n28\n496"
    }
   ],
   "ref": "n = int(input())\nfor num in range(2, n + 1):\n    s = 0\n    for i in range(1, num):\n        if num % i == 0:\n            s += i\n    if s == num:\n        print(num)",
   "hint": "对每个 num 用内层循环 i 从 1 到 num-1 试除，能整除就累加到 s；内层结束后判断 s 是否等于 num。",
   "exp": "考查双重循环、整除运算符 % 与累加求和——“枚举 + 因子求和”与素数、水仙花数是同一套路子。",
   "tags": [
    "循环",
    "经典算法",
    "累加"
   ]
  },
  {
   "id": "code-l3-006",
   "level": 3,
   "title": "冒泡排序（升序）",
   "desc": "输入一行若干个整数（用空格分隔），使用冒泡排序把它们从小到大排序后输出，同一行内用空格分隔。要求手动实现冒泡排序（相邻元素两两比较、逆序交换），不得调用 `sort()` 或 `sorted()`。",
   "starter": "nums = [int(v) for v in input().split()]\nn = len(nums)\n# 请用冒泡排序把 nums 升序排列（不得使用 sort() 或 sorted()）\n",
   "tests": [
    {
     "stdin": "5 2 8 1 9\n",
     "expected": "1 2 5 8 9"
    },
    {
     "stdin": "3 -1 4 -5 2 0\n",
     "expected": "-5 -1 0 2 3 4"
    },
    {
     "stdin": "42\n",
     "expected": "42"
    }
   ],
   "ref": "nums = [int(v) for v in input().split()]\nn = len(nums)\nfor i in range(n - 1):\n    for j in range(n - 1 - i):\n        if nums[j] > nums[j + 1]:\n            nums[j], nums[j + 1] = nums[j + 1], nums[j]\nprint(' '.join(str(v) for v in nums))",
   "hint": "外层共 n-1 趟；第 i 趟内层用 range(n-1-i) 比较相邻元素，把大的换到后面；输出用 ' '.join(str(v) for v in nums)。",
   "exp": "考查冒泡排序双重循环的边界控制、相邻元素交换与列表输出——排序是三级考试最常考的算法大题。",
   "tags": [
    "排序",
    "列表",
    "双重循环"
   ]
  },
  {
   "id": "code-l3-007",
   "level": 3,
   "title": "选择排序（降序）",
   "desc": "输入一行若干个整数成绩（用空格分隔），使用选择排序把它们从高到低排序后输出，同一行内用空格分隔。要求手动实现选择排序（每趟从未排序部分选出最大值，与该部分第一个元素交换），不得调用 `sort()` 或 `sorted()`。",
   "starter": "scores = [int(v) for v in input().split()]\nn = len(scores)\n# 请用选择排序把 scores 降序排列（不得使用 sort() 或 sorted()）\n",
   "tests": [
    {
     "stdin": "88 75 92 60 88\n",
     "expected": "92 88 88 75 60"
    },
    {
     "stdin": "100\n",
     "expected": "100"
    },
    {
     "stdin": "59 60 61 47\n",
     "expected": "61 60 59 47"
    }
   ],
   "ref": "scores = [int(v) for v in input().split()]\nn = len(scores)\nfor i in range(n - 1):\n    k = i\n    for j in range(i + 1, n):\n        if scores[j] > scores[k]:\n            k = j\n    scores[i], scores[k] = scores[k], scores[i]\nprint(' '.join(str(v) for v in scores))",
   "hint": "每趟先记 k = i，内层 j 从 i+1 扫描到 n-1，若 scores[j] > scores[k] 就更新 k；一趟结束后交换 scores[i] 与 scores[k]。降序即每趟选最大。",
   "exp": "考查选择排序的双重循环、极值下标 k 的记录与一趟只交换一次的特点——降序只需把找最小改成找最大。",
   "tags": [
    "排序",
    "列表",
    "双重循环"
   ]
  },
  {
   "id": "code-l4-007",
   "level": 4,
   "title": "二分查找（迭代）",
   "desc": "输入两行：第一行为一组按升序排列的整数（用空格分隔），第二行为要查找的目标值 x。程序用 while 循环实现二分查找，输出 x 在列表中的下标（从 0 开始）；若不存在，输出 -1。要求迭代实现（不得使用递归），不得使用 `index()` 方法。",
   "starter": "nums = [int(v) for v in input().split()]\nx = int(input())\n# 请用 while 循环实现二分查找，输出下标或 -1\n",
   "tests": [
    {
     "stdin": "2 5 8 12 16 23 38 56 72 91\n23\n",
     "expected": "5"
    },
    {
     "stdin": "2 5 8 12 16 23 38 56 72 91\n91\n",
     "expected": "9"
    },
    {
     "stdin": "2 5 8 12 16\n10\n",
     "expected": "-1"
    }
   ],
   "ref": "nums = [int(v) for v in input().split()]\nx = int(input())\nlow, high = 0, len(nums) - 1\nidx = -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if nums[mid] == x:\n        idx = mid\n        break\n    elif nums[mid] < x:\n        low = mid + 1\n    else:\n        high = mid - 1\nprint(idx)",
   "hint": "low, high = 0, len(nums) - 1；循环条件 low <= high；mid = (low + high) // 2；中间值比 x 小则 low = mid + 1，比 x 大则 high = mid - 1。",
   "exp": "考查二分查找的循环实现：区间初值、循环条件与 low/high 的收缩方向是三大易错点，比顺序查找高效。",
   "tags": [
    "查找",
    "循环",
    "算法"
   ]
  },
  {
   "id": "code-l6-005",
   "level": 6,
   "title": "openpyxl 读取成绩表求总分",
   "desc": "站内已提供 Excel 文件 scores.xlsx（Sheet 名为 stu，UTF-8），第一行是表头：姓名、语文、数学，其后 6 行是学生数据（成绩均为整数）。编写程序读取该表，按行输出每个学生的姓名和总分（姓名与总分之间用一个空格分隔），例如：王芳 177。每人一行，共 6 行。",
   "files": [
    {
     "name": "scores.xlsx",
     "content": "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",
     "b64": true
    }
   ],
   "starter": "from openpyxl import load_workbook\n\nwb = load_workbook('scores.xlsx')\nws = wb['stu']\n",
   "tests": [
    {
     "stdin": "",
     "expected": "王芳 177\n李伟 166\n张敏 185\n刘洋 141\n陈静 167\n赵磊 154"
    },
    {
     "stdin": "",
     "expected": "王芳 177\n李伟 166\n张敏 185\n刘洋 141\n陈静 167\n赵磊 154"
    }
   ],
   "ref": "from openpyxl import load_workbook\n\nwb = load_workbook('scores.xlsx')\nws = wb['stu']\nfor i in range(2, ws.max_row + 1):\n    name = ws.cell(row=i, column=1).value\n    chinese = ws.cell(row=i, column=2).value\n    math = ws.cell(row=i, column=3).value\n    print(name, chinese + math)",
   "hint": "第 1 行是表头，从第 2 行遍历到 ws.max_row；用 cell(row=i, column=n).value 逐格取值，姓名在第 1 列。",
   "exp": "考查 openpyxl 完整读流程：load_workbook 打开工作簿 → 按名取工作表 → cell(row, column).value 逐格读取 → 计算并格式化输出。",
   "tags": [
    "openpyxl",
    "Excel",
    "循环"
   ]
  },
  {
   "id": "code-l6-006",
   "level": 6,
   "title": "openpyxl 写入总分列并找最高分",
   "desc": "站内已提供 Excel 文件 scores.xlsx（Sheet 名为 stu，UTF-8），第一行是表头：姓名、语文、数学，其后 6 行是学生数据（成绩均为整数）。编写程序：①为每个学生计算语文与数学的总分，写入新的一列——E1 单元格写入表头“总分”，E2 起依次写入各人的总分；②输出总分最高的学生姓名（每人总分互不相同，只输出一行姓名）。保存工作簿与否不影响判题，判题只看 print 输出。",
   "files": [
    {
     "name": "scores.xlsx",
     "content": "UEsDBBQAAAAIAFsiWl1Gx01IlQAAAM0AAAAQAAAAZG9jUHJvcHMvYXBwLnhtbE3PTQvCMAwG4L9SdreZih6kDkQ9ip68zy51hbYpbYT67+0EP255ecgboi6JIia2mEXxLuRtMzLHDUDWI/o+y8qhiqHke64x3YGMsRoPpB8eA8OibdeAhTEMOMzit7Dp1C5GZ3XPlkJ3sjpRJsPiWDQ6sScfq9wcChDneiU+ixNLOZcrBf+LU8sVU57mym/8ZAW/B7oXUEsDBBQAAAAIAFsiWl1hsFF97wAAACsCAAARAAAAZG9jUHJvcHMvY29yZS54bWzNksFqwzAMhl9l+J7ITkkZJs1lY6cWBits7GZstTWLHWNrJH37JV6bMrYH2NHS70+fQI0OUvcRn2MfMJLFdDe6ziepw4adiIIESPqETqVySvipeeijUzQ94xGC0h/qiFBxvgaHpIwiBTOwCAuRtY3RUkdU1McL3ugFHz5jl2FGA3bo0FMCUQpg7TwxnMeugRtghhFGl74LaBZirv6JzR1gl+SY7JIahqEcVjk37SDgbbd9yesW1idSXuP0K1lJ54Abdp38unp43D+xtuLVuhC8qOp9xaW4l3X9Prv+8LsJu97Yg/3HxlfBtoFfd9F+AVBLAwQUAAAACABbIlpdmVycIxAGAACcJwAAEwAAAHhsL3RoZW1lL3RoZW1lMS54bWztWltz2jgUfu+v0Hhn9m0LxjaBtrQTc2l227SZhO1OH4URWI1seWSRhH+/RzYQy5YN7ZJNups8BCzp+85FR+foOHnz7i5i6IaIlPJ4YNkv29a7ty/e4FcyJBFBMBmnr/DACqVMXrVaaQDDOH3JExLD3IKLCEt4FMvWXOBbGi8j1uq0291WhGlsoRhHZGB9XixoQNBUUVpvXyC05R8z+BXLVI1lowETV0EmuYi08vlsxfza3j5lz+k6HTKBbjAbWCB/zm+n5E5aiOFUwsTAamc/VmvH0dJIgILJfZQFukn2o9MVCDINOzqdWM52fPbE7Z+Mytp0NG0a4OPxeDi2y9KLcBwE4FG7nsKd9Gy/pEEJtKNp0GTY9tqukaaqjVNP0/d93+ubaJwKjVtP02t33dOOicat0HgNvvFPh8Ouicar0HTraSYn/a5rpOkWaEJG4+t6EhW15UDTIABYcHbWzNIDll4p+nWUGtkdu91BXPBY7jmJEf7GxQTWadIZljRGcp2QBQ4AN8TRTFB8r0G2iuDCktJckNbPKbVQGgiayIH1R4Ihxdyv/fWXu8mkM3qdfTrOa5R/aasBp+27m8+T/HPo5J+nk9dNQs5wvCwJ8fsjW2GHJ247E3I6HGdCfM/29pGlJTLP7/kK6048Zx9WlrBdz8/knoxyI7vd9lh99k9HbiPXqcCzIteURiRFn8gtuuQROLVJDTITPwidhphqUBwCpAkxlqGG+LTGrBHgE323vgjI342I96tvmj1XoVhJ2oT4EEYa4pxz5nPRbPsHpUbR9lW83KOXWBUBlxjfNKo1LMXWeJXA8a2cPB0TEs2UCwZBhpckJhKpOX5NSBP+K6Xa/pzTQPCULyT6SpGPabMjp3QmzegzGsFGrxt1h2jSPHr+BfmcNQockRsdAmcbs0YhhGm78B6vJI6arcIRK0I+Yhk2GnK1FoG2camEYFoSxtF4TtK0EfxZrDWTPmDI7M2Rdc7WkQ4Rkl43Qj5izouQEb8ehjhKmu2icVgE/Z5ew0nB6ILLZv24fobVM2wsjvdH1BdK5A8mpz/pMjQHo5pZCb2EVmqfqoc0PqgeMgoF8bkePuV6eAo3lsa8UK6CewH/0do3wqv4gsA5fy59z6XvufQ9odK3NyN9Z8HTi1veRm5bxPuuMdrXNC4oY1dyzcjHVK+TKdg5n8Ds/Wg+nvHt+tkkhK+aWS0jFpBLgbNBJLj8i8rwKsQJ6GRbJQnLVNNlN4oSnkIbbulT9UqV1+WvuSi4PFvk6a+hdD4sz/k8X+e0zQszQ7dyS+q2lL61JjhK9LHMcE4eyww7ZzySHbZ3oB01+/ZdduQjpTBTl0O4GkK+A226ndw6OJ6YkbkK01KQb8P56cV4GuI52QS5fZhXbefY0dH758FRsKPvPJYdx4jyoiHuoYaYz8NDh3l7X5hnlcZQNBRtbKwkLEa3YLjX8SwU4GRgLaAHg69RAvJSVWAxW8YDK5CifEyMRehw55dcX+PRkuPbpmW1bq8pdxltIlI5wmmYE2eryt5lscFVHc9VW/Kwvmo9tBVOz/5ZrcifDBFOFgsSSGOUF6ZKovMZU77nK0nEVTi/RTO2EpcYvOPmx3FOU7gSdrYPAjK5uzmpemUxZ6by3y0MCSxbiFkS4k1d7dXnm5yueiJ2+pd3wWDy/XDJRw/lO+df9F1Drn723eP6bpM7SEycecURAXRFAiOVHAYWFzLkUO6SkAYTAc2UyUTwAoJkphyAmPoLvfIMuSkVzq0+OX9FLIOGTl7SJRIUirAMBSEXcuPv75Nqd4zX+iyBbYRUMmTVF8pDicE9M3JD2FQl867aJguF2+JUzbsaviZgS8N6bp0tJ//bXtQ9tBc9RvOjmeAes4dzm3q4wkWs/1jWHvky3zlw2zreA17mEyxDpH7BfYqKgBGrYr66r0/5JZw7tHvxgSCb/NbbpPbd4Ax81KtapWQrET9LB3wfkgZjjFv0NF+PFGKtprGtxtoxDHmAWPMMoWY434dFmhoz1YusOY0Kb0HVQOU/29QNaPYNNByRBV4xmbY2o+ROCjzc/u8NsMLEjuHti78BUEsDBBQAAAAIAFsiWl0EeOTeDwIAALsFAAAYAAAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sfZTBjtsgEIZfxXKlHhcDxsCuY6mbqmoPlaJdtT2ThMTW2sbFJGnfvuAkiLVwTwZ+Zub7x/aUF6XfxlpKk/zp2n5cpbUxwyMA466WnRgf1CB7qxyU7oSxW30E46Cl2E9BXQtQlhWgE02fVuV0ttFVqU6mbXq50cl46jqh/z7LVl1WKUzvBy/NsTbuAFTlII7yVZofw0bbHfBZ9k0n+7FRfaLlYZV+go9r6u5PF3428jIG68Q52Sr15jbf9qs0c0CylTvjMgj7OMu1bFuXyGL8vuVMfUkXGK7v2b9M3q2XrRjlWrW/mr2pVylLk708iFNrXtTlq7z5IR7wszCiKrW6JNr5rMqdW7ja9l7Tu/68Gm3PG1vIVB8/IMQ5ebJPSCB9KoGxME4Du1vs83IsJgxBF0s4h7HY9X/qEl4wF4sxZ7NYYPm9CeRNoOVknFBuk2GcEx41cY11n8u5YqQE55AyFDny4jsM7DHwMkaR54XzlCFCohg4qETZDCMUGYtj5B4jX8bIMUHX14LjGHloeN6Nd2IWxyAegyxjwAxO3aAcxjFIUKkoZhihSEkco/AYxfJHynLquoEZzeMYRbzvV4xQpDyOQT0GXcYoEMQOI+MIRTFoWAnPMEKRwRkGCH59N9a+C31s+jFp5cEGZQ/U9lJfR8V1Y9QwjcWtMkZ107K201Vqd8HqB6XMfeMmlZ/X1T9QSwMEFAAAAAgAWyJaXXzzo9xRAgAA9gkAAA0AAAB4bC9zdHlsZXMueG1s3VbbitswEP0V4Q+ok5g1cUnyUENgoS0Luw99VWI5EejiyvKS9Os7Izl2s6tZKH2rTfDMHJ25G2fT+6sSz2chPLtoZfptdva++5zn/fEsNO8/2U4YQFrrNPegulPed07wpkeSVvlqsShzzaXJdhsz6L32PTvawfhttsjy3aa1ZrYss2iAo1wL9srVNqu5kgcnw1mupbpG8woNR6usYx5SEUgGS/8rwsuoYZajHy2NdWjMY4Tw6MGpVGpKYJVFw27Tce+FM3tQAicY30FslF+uHWRwcvy6XD1kMyE8IMjBuka4uzqjabdRovVAcPJ0xqe3XY6g91aD0Eh+soaHHG6MUQC3R6HUM47oR3vn+9Ky2OvHBtvMsNSbCAmNYnQTFfT/p7fo+5/dsk6+Wv9lgGpM0H8O1osnJ1p5CfqlvY8/hQ6J3EWfrAyXY5t9x51Tswt2GKTy0ozaWTaNMO9qA/eeH2Cp7/zD+Ua0fFD+ZQK32Sx/E40cdDWdesKyxlOz/BVnuCynzYRY0jTiIpp6VN3pEEQGAkQdLyS8RfbhSiMUJ2JpBDEqDpUBxYksKs7/VM+arCdiVG7rJLImOWuSE1kppA43FSfNqeBKV1pVRVGWVEfrOplBTfWtLPGX9kblhgwqDkb6u17T06Y35OM9oGb60YZQldKbSFVK9xqRdN+QUVXpaVNxkEFNgdodjJ+OgzuV5hQFTpXKjXqDaaSqKAR3Mb2jZUl0p8Q7PR/qLSmKqkojiKUzKAoKwbeRRqgMMAcKKYrwHXzzPcpv36l8/qe3+w1QSwMEFAAAAAgAWyJaXZeKuxzAAAAAEwIAAAsAAABfcmVscy8ucmVsc52SuW7DMAxAf8XQnjAH0CGIM2XxFgT5AVaiD9gSBYpFnb+v2qVxkAsZeT08EtweaUDtOKS2i6kY/RBSaVrVuAFItiWPac6RQq7ULB41h9JARNtjQ7BaLD5ALhlmt71kFqdzpFeIXNedpT3bL09Bb4CvOkxxQmlISzMO8M3SfzL38ww1ReVKI5VbGnjT5f524EnRoSJYFppFydOiHaV/Hcf2kNPpr2MitHpb6PlxaFQKjtxjJYxxYrT+NYLJD+x+AFBLAwQUAAAACABbIlpd5u9AJjEBAAAgAgAADwAAAHhsL3dvcmtib29rLnhtbI1R0UrDQBD8lXAfYFLRgqXpi0UtiBYrfb8km2bp3W3Y27Tar3eTECz44tPezizDzNzyTHwsiI7Jl3ch5qYRaRdpGssGvI031EJQpib2VnTlQxpbBlvFBkC8S2+zbJ56i8GslpPWltPrhQRKQQoK9sAe4Rx/+X5NThixQIfynZvh7cAkHgN6vECVm8wksaHzCzFeKIh1u5LJudzMRmIPLFj+gXe9yU9bxAERW3xYNZKbeaaCNXKU4WLQt+rxBHo8bp3QEzoBXluBZ6auxXDoZTRFehVj6GGaY4kL/k+NVNdYwprKzkOQsUcG1xsMscE2miRYD7mJ0vVpVH5TjclELV31xAtUgjfVaG5yVEGNAao3FYmKazvllpN+DDq3d/ezB22hc+5RsffwSraaAk6fs/oBUEsDBBQAAAAIAFsiWl0kHpuirQAAAPgBAAAaAAAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHO1kT0OgzAMha8S5QA1UKlDBUxdWCsuEAXzIxISxa4Kty+FAZA6dGGyni1/78lOn2gUd26gtvMkRmsGymTL7O8ApFu0ii7O4zBPahes4lmGBrzSvWoQkii6QdgzZJ7umaKcPP5DdHXdaXw4/bI48A8wvF3oqUVkKUoVGuRMwmi2NsFS4stMlqKoMhmKKpZwWiDiySBtaVZ9sE9OtOd5Fzf3Ra7N4wmu3wxweHT+AVBLAwQUAAAACABbIlpdZZB5khkBAADPAwAAEwAAAFtDb250ZW50X1R5cGVzXS54bWytk01OwzAQha8SZVslLixYoKYbYAtdcAFjTxqr/pNnWtLbM07aSqASFYVNrHjevM+el6zejxGw6J312JQdUXwUAlUHTmIdIniutCE5SfyatiJKtZNbEPfL5YNQwRN4qih7lOvVM7Ryb6l46XkbTfBNmcBiWTyNwsxqShmjNUoS18XB6x+U6kSouXPQYGciLlhQiquEXPkdcOp7O0BKRkOxkYlepWOV6K1AOlrAetriyhlD2xoFOqi945YaYwKpsQMgZ+vRdDFNJp4wjM+72fzBZgrIyk0KETmxBH/HnSPJ3VVkI0hkpq94IbL17PtBTluDvpHN4/0MaTfkgWJY5s/4e8YX/xvO8RHC7r8/sbzWThp/5ovhP15/AVBLAQIUAxQAAAAIAFsiWl1Gx01IlQAAAM0AAAAQAAAAAAAAAAAAAACAAQAAAABkb2NQcm9wcy9hcHAueG1sUEsBAhQDFAAAAAgAWyJaXWGwUX3vAAAAKwIAABEAAAAAAAAAAAAAAIABwwAAAGRvY1Byb3BzL2NvcmUueG1sUEsBAhQDFAAAAAgAWyJaXZlcnCMQBgAAnCcAABMAAAAAAAAAAAAAAIAB4QEAAHhsL3RoZW1lL3RoZW1lMS54bWxQSwECFAMUAAAACABbIlpdBHjk3g8CAAC7BQAAGAAAAAAAAAAAAAAAgIEiCAAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sUEsBAhQDFAAAAAgAWyJaXXzzo9xRAgAA9gkAAA0AAAAAAAAAAAAAAIABZwoAAHhsL3N0eWxlcy54bWxQSwECFAMUAAAACABbIlpdl4q7HMAAAAATAgAACwAAAAAAAAAAAAAAgAHjDAAAX3JlbHMvLnJlbHNQSwECFAMUAAAACABbIlpd5u9AJjEBAAAgAgAADwAAAAAAAAAAAAAAgAHMDQAAeGwvd29ya2Jvb2sueG1sUEsBAhQDFAAAAAgAWyJaXSQem6KtAAAA+AEAABoAAAAAAAAAAAAAAIABKg8AAHhsL19yZWxzL3dvcmtib29rLnhtbC5yZWxzUEsBAhQDFAAAAAgAWyJaXWWQeZIZAQAAzwMAABMAAAAAAAAAAAAAAIABDxAAAFtDb250ZW50X1R5cGVzXS54bWxQSwUGAAAAAAkACQA+AgAAWREAAAAA",
     "b64": true
    }
   ],
   "starter": "from openpyxl import load_workbook\n\nwb = load_workbook('scores.xlsx')\nws = wb['stu']\n",
   "tests": [
    {
     "stdin": "",
     "expected": "张敏"
    },
    {
     "stdin": "",
     "expected": "张敏"
    }
   ],
   "ref": "from openpyxl import load_workbook\n\nwb = load_workbook('scores.xlsx')\nws = wb['stu']\nws['E1'] = '总分'\nbest_name = ''\nbest = 0\nfor i in range(2, ws.max_row + 1):\n    name = ws.cell(row=i, column=1).value\n    total = ws.cell(row=i, column=2).value + ws.cell(row=i, column=3).value\n    ws.cell(row=i, column=5).value = total\n    if total > best:\n        best_name = name\n        best = total\nwb.save('scores.xlsx')\nprint(best_name)",
   "hint": "单元格赋值用 ws['E1'] = '总分' 或 ws.cell(row=i, column=5).value = total；求最高分用“打擂台”：总分更大时更新记录者；最后 wb.save('scores.xlsx') 保存。",
   "exp": "考查 openpyxl 读写完整闭环：读单元格计算 → 写入新列 → save 写回文件 → 打擂台法求最值。判题依据为输出的最高分学生姓名。",
   "tags": [
    "openpyxl",
    "Excel",
    "最值"
   ]
  },
  {
   "id": "code-l7-013",
   "level": 7,
   "title": "matplotlib 绘制气温折线图",
   "desc": "起始代码已给出 12 个月的月份列表 months 和月平均气温列表 temps。要求：①用 plt.plot 绘制气温随月份变化的折线图，并用 plt.savefig('t.png') 把图形保存为图片 t.png；②按月份顺序逐行输出“月:气温”，例如 1:5；③最后输出一行平均气温，格式如：平均气温:19.5（保留 1 位小数）。判题只看 print 输出，不看图片。",
   "starter": "import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\n\nmonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]\ntemps = [5, 8, 14, 20, 26, 31, 33, 32, 27, 20, 12, 6]\n",
   "tests": [
    {
     "stdin": "",
     "expected": "1:5\n2:8\n3:14\n4:20\n5:26\n6:31\n7:33\n8:32\n9:27\n10:20\n11:12\n12:6\n平均气温:19.5"
    },
    {
     "stdin": "",
     "expected": "1:5\n2:8\n3:14\n4:20\n5:26\n6:31\n7:33\n8:32\n9:27\n10:20\n11:12\n12:6\n平均气温:19.5"
    }
   ],
   "ref": "import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\n\nmonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]\ntemps = [5, 8, 14, 20, 26, 31, 33, 32, 27, 20, 12, 6]\nplt.plot(months, temps)\nplt.savefig('t.png')\nfor i in range(12):\n    print('{}:{}'.format(months[i], temps[i]))\nprint('平均气温:{:.1f}'.format(sum(temps) / len(temps)))",
   "hint": "plt.plot( months, temps ) 画折线，plt.savefig('t.png') 存图；平均气温 = sum(temps) / len(temps)，用 '{:.1f}'.format() 保留 1 位小数。",
   "exp": "考查 matplotlib 折线图绘制与保存（plot + savefig），以及列表遍历输出与平均值统计；判题通过打印数据验证，绘图仅要求代码正确执行。",
   "tags": [
    "matplotlib",
    "可视化",
    "统计"
   ]
  },
  {
   "id": "code-l1-001",
   "level": 1,
   "title": "两数交换与平均值",
   "desc": "输入两个整数 a、b（各占一行）。程序将两个数交换（交换后 a 中存放原来 b 的值，b 中存放原来 a 的值）：第一行输出交换后的两个整数（用空格分隔），第二行输出这两个数的平均值（保留 2 位小数）。",
   "starter": "# 读入两个整数，交换后输出，再输出平均值\n",
   "tests": [
    {
     "stdin": "3\n5\n",
     "expected": "5 3\n4.00"
    },
    {
     "stdin": "10\n-2\n",
     "expected": "-2 10\n4.00"
    },
    {
     "stdin": "7\n8\n",
     "expected": "8 7\n7.50"
    }
   ],
   "ref": "a = int(input())\nb = int(input())\na, b = b, a\nprint(a, b)\nprint('{:.2f}'.format((a + b) / 2))",
   "hint": "用 `a, b = b, a` 一行完成交换；平均值可能带小数，用 `'{:.2f}'.format(x)` 保留两位。",
   "exp": "考查 int() 类型转换、多元赋值交换、print 输出与 format 保留小数位——L1 输入输出基本功。",
   "tags": [
    "输入输出",
    "变量",
    "格式化"
   ]
  },
  {
   "id": "code-l1-002",
   "level": 1,
   "title": "华氏温度转摄氏温度",
   "desc": "输入一个华氏温度值 f（可能是小数），按公式 c = 5×(f−32)÷9 换算成摄氏温度，输出换算结果并保留 1 位小数。",
   "starter": "# 读入华氏温度，换算后保留 1 位小数输出\n",
   "tests": [
    {
     "stdin": "100\n",
     "expected": "37.8"
    },
    {
     "stdin": "32\n",
     "expected": "0.0"
    },
    {
     "stdin": "212\n",
     "expected": "100.0"
    }
   ],
   "ref": "f = float(input())\nc = 5 * (f - 32) / 9\nprint('{:.1f}'.format(c))",
   "hint": "用 `float(input())` 读入可能带小数的温度；`'{:.1f}'.format(c)` 保留 1 位小数。",
   "exp": "考查 float() 类型转换、算术表达式书写与 format 格式化——温度换算是真题常客。",
   "tags": [
    "类型转换",
    "运算符",
    "格式化"
   ]
  },
  {
   "id": "code-l1-003",
   "level": 1,
   "title": "三角形面积（海伦公式）",
   "desc": "输入三角形的三条边长 a、b、c（各占一行，可以是小数）。先判断能否构成三角形（任意两边之和大于第三边）：能构成则用海伦公式计算面积，输出格式为\"面积=x.xx\"（x.xx 表示保留 2 位小数的面积值）；不能构成则输出\"不能构成三角形\"。",
   "starter": "import math\n\n# 读入三边，判断能否构成三角形并计算面积\n",
   "tests": [
    {
     "stdin": "3\n4\n5\n",
     "expected": "面积=6.00"
    },
    {
     "stdin": "7\n8\n9\n",
     "expected": "面积=26.83"
    },
    {
     "stdin": "1\n2\n3\n",
     "expected": "不能构成三角形"
    }
   ],
   "ref": "import math\na = float(input())\nb = float(input())\nc = float(input())\nif a + b > c and a + c > b and b + c > a:\n    p = (a + b + c) / 2\n    area = math.sqrt(p * (p - a) * (p - b) * (p - c))\n    print('面积={:.2f}'.format(area))\nelse:\n    print('不能构成三角形')",
   "hint": "海伦公式：p=(a+b+c)/2，面积=√(p(p−a)(p−b)(p−c))，开平方用 `math.sqrt()`。",
   "exp": "考查多分支 if-else、逻辑运算符 and、math 模块使用与格式化输出。",
   "tags": [
    "math",
    "if 分支",
    "格式化"
   ]
  },
  {
   "id": "code-l1-004",
   "level": 1,
   "title": "姓名年龄表格输出",
   "desc": "第一行输入整数 n（1≤n≤10），随后 n 行每行输入一个学生的\"姓名 年龄\"（姓名中不含空格，年龄为整数，姓名与年龄之间用一个空格分隔）。按输入顺序输出 n 行，每行格式为：姓名左对齐占 6 个字符宽，年龄右对齐占 4 个字符宽，两个格式域之间不加任何其他字符（用 format 或 f-string 的对齐功能实现）。",
   "starter": "# 读 n 个\"姓名 年龄\"，按指定宽度格式化输出\n",
   "tests": [
    {
     "stdin": "3\n张三 18\nLucy 20\n李四 19\n",
     "expected": "张三      18\nLucy    20\n李四      19"
    },
    {
     "stdin": "1\n王小明 100\n",
     "expected": "王小明    100"
    },
    {
     "stdin": "2\nTom 9\nJerry 12\n",
     "expected": "Tom      9\nJerry   12"
    }
   ],
   "ref": "n = int(input())\nfor i in range(n):\n    name, age = input().split()\n    print('{:<6}{:>4}'.format(name, age))",
   "hint": "`'{:<6}'.format(name)` 左对齐占 6 位，`'{:>4}'.format(age)` 右对齐占 4 位；`input().split()` 按空白拆开姓名和年龄。",
   "exp": "考查字符串 split 拆分与 format 的 `<`、`>` 对齐宽度控制——格式化输出的典型考题。",
   "tags": [
    "字符串",
    "格式化",
    "循环"
   ]
  },
  {
   "id": "code-l2-001",
   "level": 2,
   "title": "素数判断与区间统计",
   "desc": "输入两个整数 m、n（各占一行，满足 2≤m≤n≤1000）。输出 m 到 n 之间（含端点）的全部素数，每行一个；最后输出一行\"共N个\"（N 为该区间内素数个数）。若区间内没有素数，则只输出\"共0个\"。",
   "starter": "# 输出 [m, n] 内的全部素数并统计个数\n",
   "tests": [
    {
     "stdin": "2\n10\n",
     "expected": "2\n3\n5\n7\n共4个"
    },
    {
     "stdin": "10\n20\n",
     "expected": "11\n13\n17\n19\n共4个"
    },
    {
     "stdin": "14\n16\n",
     "expected": "共0个"
    }
   ],
   "ref": "m = int(input())\nn = int(input())\ncount = 0\nfor x in range(m, n + 1):\n    if x < 2:\n        continue\n    is_prime = True\n    for i in range(2, int(x ** 0.5) + 1):\n        if x % i == 0:\n            is_prime = False\n            break\n    if is_prime:\n        print(x)\n        count += 1\nprint('共{}个'.format(count))",
   "hint": "判断 x 是否素数：用 2 到 √x 之间的整数试除，能整除就不是素数；注意 2 是最小的素数，1 不是素数。",
   "exp": "考查嵌套循环、break 提前退出、标志变量与计数——素数是二级考试出现率最高的算法之一。",
   "tags": [
    "循环",
    "素数",
    "计数"
   ]
  },
  {
   "id": "code-l2-002",
   "level": 2,
   "title": "九九乘法表（前 n 行）",
   "desc": "输入一个 1~9 的整数 n，输出九九乘法表的前 n 行。第 i 行（1≤i≤n）由 i 个乘式组成，第 j 个乘式为\"jxi=积\"（j 从 1 到 i），乘式之间用一个空格分隔，行末不输出多余空格。",
   "starter": "# 输出九九乘法表的前 n 行\n",
   "tests": [
    {
     "stdin": "1\n",
     "expected": "1x1=1"
    },
    {
     "stdin": "5\n",
     "expected": "1x1=1\n1x2=2 2x2=4\n1x3=3 2x3=6 3x3=9\n1x4=4 2x4=8 3x4=12 4x4=16\n1x5=5 2x5=10 3x5=15 4x5=20 5x5=25"
    },
    {
     "stdin": "9\n",
     "expected": "1x1=1\n1x2=2 2x2=4\n1x3=3 2x3=6 3x3=9\n1x4=4 2x4=8 3x4=12 4x4=16\n1x5=5 2x5=10 3x5=15 4x5=20 5x5=25\n1x6=6 2x6=12 3x6=18 4x6=24 5x6=30 6x6=36\n1x7=7 2x7=14 3x7=21 4x7=28 5x7=35 6x7=42 7x7=49\n1x8=8 2x8=16 3x8=24 4x8=32 5x8=40 6x8=48 7x8=56 8x8=64\n1x9=9 2x9=18 3x9=27 4x9=36 5x9=45 6x9=54 7x9=63 8x9=72 9x9=81"
    }
   ],
   "ref": "n = int(input())\nfor i in range(1, n + 1):\n    row = []\n    for j in range(1, i + 1):\n        row.append('{}x{}={}'.format(j, i, i * j))\n    print(' '.join(row))",
   "hint": "外层 i 控制行数，内层 j 从 1 到 i；把每行的乘式先拼进列表再用 `' '.join()` 连接，可避免行尾多出空格。",
   "exp": "考查嵌套循环、range 的两个参数、字符串格式化与 join——乘法表是循环章节的必考图形题。",
   "tags": [
    "嵌套循环",
    "字符串",
    "乘法表"
   ]
  },
  {
   "id": "code-l2-003",
   "level": 2,
   "title": "水仙花数判断",
   "desc": "水仙花数是指一个三位数，它等于其百位、十位、个位数字的立方和（如 153=1³+5³+3³）。输入一个 100~999 之间的整数 n：第一行输出 n 的各位数字立方和；第二行输出判断结果——若 n 是水仙花数输出\"是水仙花数\"，否则输出\"不是水仙花数\"。",
   "starter": "# 分离 n 的百位、十位、个位，求立方和并判断\n",
   "tests": [
    {
     "stdin": "153\n",
     "expected": "153\n是水仙花数"
    },
    {
     "stdin": "100\n",
     "expected": "1\n不是水仙花数"
    },
    {
     "stdin": "407\n",
     "expected": "407\n是水仙花数"
    }
   ],
   "ref": "n = int(input())\na = n // 100\nb = n // 10 % 10\nc = n % 10\ns = a ** 3 + b ** 3 + c ** 3\nprint(s)\nif s == n:\n    print('是水仙花数')\nelse:\n    print('不是水仙花数')",
   "hint": "用整除 `//` 和取余 `%` 分离各位数字：百位 `n//100`，十位 `n//10%10`，个位 `n%10`；`**` 求立方。",
   "exp": "考查整除与取余运算、幂运算、if-else 判断——水仙花数是经典小算法高频考点。",
   "tags": [
    "运算符",
    "if 分支",
    "水仙花数"
   ]
  },
  {
   "id": "code-l2-004",
   "level": 2,
   "title": "猜数字游戏",
   "desc": "程序开头已给定三行代码（不要改动）：`import random`、`random.seed(10)`、`target = random.randint(1, 100)`，由固定种子生成一个 1~100 的目标数。之后每行输入一个 1~100 的整数进行猜测：猜的数比目标数大输出\"大了\"，比目标数小输出\"小了\"，恰好等于目标数输出\"猜对了\"并结束程序（测试数据保证一定能猜中）。",
   "starter": "import random\nrandom.seed(10)\ntarget = random.randint(1, 100)\n# 请补全猜数字过程：反复读入猜测，直到猜中\n",
   "tests": [
    {
     "stdin": "74\n",
     "expected": "猜对了"
    },
    {
     "stdin": "50\n90\n74\n",
     "expected": "小了\n大了\n猜对了"
    },
    {
     "stdin": "1\n100\n74\n",
     "expected": "小了\n大了\n猜对了"
    }
   ],
   "ref": "import random\nrandom.seed(10)\ntarget = random.randint(1, 100)\nwhile True:\n    g = int(input())\n    if g > target:\n        print('大了')\n    elif g < target:\n        print('小了')\n    else:\n        print('猜对了')\n        break",
   "hint": "用 `while True` 配合 `break` 反复读入；先判断大于、小于，剩下相等的情况输出\"猜对了\"后跳出。",
   "exp": "考查 random.seed 固定随机数、while True 无限循环、if-elif-else 多分支与 break 的配合使用。",
   "tags": [
    "random",
    "while 循环",
    "分支"
   ]
  },
  {
   "id": "code-l2-005",
   "level": 2,
   "title": "星号菱形打印",
   "desc": "输入一个奇数 n（1≤n≤9），输出由星号 `*` 组成的菱形：共 n 行，正中间一行有 n 个连续的星号，向上每行星号依次减少 2 个、向下每行星号依次减少 2 个；每行星号前用空格补齐使菱形左右居中，行末不输出多余空格。",
   "starter": "# 读入奇数 n，打印 n 行星号菱形\n",
   "tests": [
    {
     "stdin": "1\n",
     "expected": "*"
    },
    {
     "stdin": "3\n",
     "expected": "*\n***\n *"
    },
    {
     "stdin": "5\n",
     "expected": "*\n ***\n*****\n ***\n  *"
    }
   ],
   "ref": "n = int(input())\nm = (n + 1) // 2\nfor i in range(1, n + 1):\n    stars = n - 2 * abs(i - m)\n    print(' ' * ((n - stars) // 2) + '*' * stars)",
   "hint": "中间行行号 m=(n+1)//2；第 i 行星号数为 n−2×|i−m|，前导空格数为 (n−星数)//2；用字符串乘法 `' '*k` 和 `'*'*k` 拼行。",
   "exp": "考查找规律、字符串乘法与循环打印图形——图形题的关键是算准每行空格数与星号数。",
   "tags": [
    "循环",
    "字符串",
    "图形打印"
   ]
  },
  {
   "id": "code-l3-001",
   "level": 3,
   "title": "回文判断",
   "desc": "输入一个不含空格的字符串 s（长度 1~100）：第一行输出 s 的反串（倒序字符串）；第二行判断 s 是否为回文串（正读反读完全相同，区分大小写）——是则输出\"是回文\"，否则输出\"不是回文\"。",
   "starter": "# 用切片求反串并判断是否回文\n",
   "tests": [
    {
     "stdin": "level\n",
     "expected": "level\n是回文"
    },
    {
     "stdin": "abc\n",
     "expected": "cba\n不是回文"
    },
    {
     "stdin": "上海自来水来自海上\n",
     "expected": "上海自来水来自海上\n是回文"
    }
   ],
   "ref": "s = input()\nt = s[::-1]\nprint(t)\nif s == t:\n    print('是回文')\nelse:\n    print('不是回文')",
   "hint": "切片 `s[::-1]` 步长为 -1，直接得到反串；回文即 `s == s[::-1]`。",
   "exp": "考查字符串切片步长 -1 与比较运算——回文判断是字符串部分的高频考题，中文回文同样适用。",
   "tags": [
    "字符串",
    "切片",
    "回文"
   ]
  },
  {
   "id": "code-l3-002",
   "level": 3,
   "title": "列表奇偶分离",
   "desc": "输入一行以空格分隔的整数（至少 1 个，可能含负数和 0）。把其中的奇数按输入顺序存入列表 odds、偶数按输入顺序存入列表 evens：第一行输出 odds，第二行输出 evens（均按 Python 列表格式输出，空列表输出 []）。",
   "starter": "# 读入一行整数，分离奇偶到两个列表\n",
   "tests": [
    {
     "stdin": "1 2 3 4 5 6\n",
     "expected": "[1, 3, 5]\n[2, 4, 6]"
    },
    {
     "stdin": "-3 -2 0 7\n",
     "expected": "[-3, 7]\n[-2, 0]"
    },
    {
     "stdin": "8\n",
     "expected": "[]\n[8]"
    }
   ],
   "ref": "nums = list(map(int, input().split()))\nodds = []\nevens = []\nfor x in nums:\n    if x % 2 != 0:\n        odds.append(x)\n    else:\n        evens.append(x)\nprint(odds)\nprint(evens)",
   "hint": "`input().split()` 拆分后用 `map(int, ...)` 转整数；判奇偶用 `x % 2 != 0`（Python 中 -3 % 2 == 1，负数同样适用）；空列表 print 出来是 `[]`。",
   "exp": "考查 split、map 类型转换、列表 append 与 if-else 分类——组合数据类型的基本功。",
   "tags": [
    "列表",
    "循环",
    "split"
   ]
  },
  {
   "id": "code-l3-003",
   "level": 3,
   "title": "字符频次统计",
   "desc": "输入一行不含空格的字符串 s（长度 1~100），统计每个字符出现的次数：每行输出\"字符:次数\"（字符与次数之间用英文冒号分隔），按字符在 s 中首次出现的顺序输出。",
   "starter": "# 用字典统计每个字符出现的次数\n",
   "tests": [
    {
     "stdin": "hello\n",
     "expected": "h:1\ne:1\nl:2\no:1"
    },
    {
     "stdin": "aabbcc\n",
     "expected": "a:2\nb:2\nc:2"
    },
    {
     "stdin": "abcabcab\n",
     "expected": "a:3\nb:3\nc:2"
    }
   ],
   "ref": "s = input()\nd = {}\nfor ch in s:\n    d[ch] = d.get(ch, 0) + 1\nfor ch in d:\n    print('{}:{}'.format(ch, d[ch]))",
   "hint": "`d.get(ch, 0) + 1` 是字典计数惯用写法；字典保留插入顺序，按插入顺序遍历正好是字符首次出现的顺序。",
   "exp": "考查字典 get 计数与遍历输出——字符/词频统计类题目的基础套路，为 L5 词频统计打底。",
   "tags": [
    "字典",
    "计数",
    "字符串"
   ]
  },
  {
   "id": "code-l3-004",
   "level": 3,
   "title": "成绩分段统计",
   "desc": "输入一行以空格分隔的成绩（0~100 的整数，至少 1 个）。按 优秀(90~100)、良好(80~89)、中等(70~79)、及格(60~69)、不及格(0~59) 五段统计人数，输出 5 行，依次为：\"优秀N人\"、\"良好N人\"、\"中等N人\"、\"及格N人\"、\"不及格N人\"（N 为该段人数）。",
   "starter": "# 读入成绩列表，分段统计到字典并输出\n",
   "tests": [
    {
     "stdin": "95 82 73 61 45 100 80\n",
     "expected": "优秀2人\n良好2人\n中等1人\n及格1人\n不及格1人"
    },
    {
     "stdin": "0 59\n",
     "expected": "优秀0人\n良好0人\n中等0人\n及格0人\n不及格2人"
    },
    {
     "stdin": "90 89 79 69 60 80\n",
     "expected": "优秀1人\n良好2人\n中等1人\n及格2人\n不及格0人"
    }
   ],
   "ref": "scores = list(map(int, input().split()))\nd = {'优秀': 0, '良好': 0, '中等': 0, '及格': 0, '不及格': 0}\nfor s in scores:\n    if s >= 90:\n        d['优秀'] += 1\n    elif s >= 80:\n        d['良好'] += 1\n    elif s >= 70:\n        d['中等'] += 1\n    elif s >= 60:\n        d['及格'] += 1\n    else:\n        d['不及格'] += 1\nfor k in d:\n    print('{}{}人'.format(k, d[k]))",
   "hint": "if-elif 按从高到低的顺序判断，注意边界 90、80、70、60 归属哪一段；用字典保存各段人数，遍历字典按插入顺序输出。",
   "exp": "考查列表遍历、if-elif 多分支边界划分与字典统计——成绩分段是列表+字典组合的典型真题。",
   "tags": [
    "列表",
    "字典",
    "if-elif"
   ]
  },
  {
   "id": "code-l3-005",
   "level": 3,
   "title": "去重并排序",
   "desc": "输入一行以空格分隔的整数（可能重复，可能为负数，至少 1 个）。用集合去掉重复元素后按从小到大排序：第一行输出去重后的元素个数，第二行输出排序后的列表（按 Python 列表格式输出）。",
   "starter": "# 用集合去重，再排序输出\n",
   "tests": [
    {
     "stdin": "3 1 2 3 5 1\n",
     "expected": "4\n[1, 2, 3, 5]"
    },
    {
     "stdin": "5 5 5 5\n",
     "expected": "1\n[5]"
    },
    {
     "stdin": "-1 0 -1 3\n",
     "expected": "3\n[-1, 0, 3]"
    }
   ],
   "ref": "nums = list(map(int, input().split()))\ns = set(nums)\nlst = sorted(s)\nprint(len(lst))\nprint(lst)",
   "hint": "`set(nums)` 去重，`sorted(s)` 返回升序列表；集合是无序的，不能直接 print 集合，要先 sorted 成列表。",
   "exp": "考查集合去重与 sorted 排序的组合使用——\"set+sorted\"是去重排序题的标准解法。",
   "tags": [
    "集合",
    "排序",
    "列表"
   ]
  },
  {
   "id": "code-l4-001",
   "level": 4,
   "title": "函数求最大公约数",
   "desc": "编写函数 `gcd(a, b)`，用辗转相除法（while 循环）返回 a、b 的最大公约数。主程序输入两个正整数 m、n（各占一行），调用 gcd 求出最大公约数 g：第一行输出\"最大公约数:g\"，第二行输出\"最小公倍数:l\"（其中 l=m×n÷g，用整除计算）。",
   "starter": "def gcd(a, b):\n    # 用辗转相除法求最大公约数\n    pass\n\nm = int(input())\nn = int(input())\n# 请调用 gcd 并按要求输出\n",
   "tests": [
    {
     "stdin": "12\n18\n",
     "expected": "最大公约数:6\n最小公倍数:36"
    },
    {
     "stdin": "7\n13\n",
     "expected": "最大公约数:1\n最小公倍数:91"
    },
    {
     "stdin": "100\n25\n",
     "expected": "最大公约数:25\n最小公倍数:100"
    }
   ],
   "ref": "def gcd(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n\nm = int(input())\nn = int(input())\ng = gcd(m, n)\nprint('最大公约数:{}'.format(g))\nprint('最小公倍数:{}'.format(m * n // g))",
   "hint": "辗转相除：循环中 `a, b = b, a % b`，当 b 为 0 时 a 就是最大公约数；最小公倍数 = m*n//g。",
   "exp": "考查函数定义与调用、while 循环与整除运算——辗转相除法是函数章节的经典算法题。",
   "tags": [
    "函数",
    "while 循环",
    "辗转相除"
   ]
  },
  {
   "id": "code-l4-002",
   "level": 4,
   "title": "可变参数求和",
   "desc": "编写函数 `my_sum(*args)`，返回所有位置参数之和；不传参数时返回 0。主程序读入一行以空格分隔的整数，用 `*` 解包方式把每个整数作为独立参数传给 my_sum，输出求和结果（一行，只有一个整数）。",
   "starter": "def my_sum(*args):\n    pass\n\nnums = list(map(int, input().split()))\n# 请用 *nums 解包调用 my_sum 并输出结果\n",
   "tests": [
    {
     "stdin": "1 2 3 4 5\n",
     "expected": "15"
    },
    {
     "stdin": "10\n",
     "expected": "10"
    },
    {
     "stdin": "-1 -2 3\n",
     "expected": "0"
    }
   ],
   "ref": "def my_sum(*args):\n    total = 0\n    for x in args:\n        total += x\n    return total\n\nnums = list(map(int, input().split()))\nprint(my_sum(*nums))",
   "hint": "函数体内 args 是一个元组，遍历累加即可；调用时 `my_sum(*nums)` 把列表解包成一个个独立参数。",
   "exp": "考查可变参数 `*args` 的定义、元组遍历与调用时 `*` 解包——可变参数的直接考法。",
   "tags": [
    "函数",
    "可变参数",
    "解包"
   ]
  },
  {
   "id": "code-l4-003",
   "level": 4,
   "title": "map 与 filter 加工单词表",
   "desc": "输入一行英文单词（以空格分隔，至少 1 个）。先用 `filter` 筛选出长度不小于 4 的单词，再用 `map` 把筛选出的单词全部转为大写：第一行输出处理后组成的列表（按 Python 列表格式输出），第二行输出列表中单词的个数。",
   "starter": "# 用 filter 筛选长度>=4 的单词，再用 map 转大写\n",
   "tests": [
    {
     "stdin": "i love python code\n",
     "expected": "['LOVE', 'PYTHON', 'CODE']\n3"
    },
    {
     "stdin": "a bc\n",
     "expected": "[]\n0"
    },
    {
     "stdin": "Abc Defg Hi\n",
     "expected": "['DEFG']\n1"
    }
   ],
   "ref": "words = input().split()\npicked = list(map(str.upper, filter(lambda w: len(w) >= 4, words)))\nprint(picked)\nprint(len(picked))",
   "hint": "`filter(lambda w: len(w) >= 4, words)` 得到筛选结果，外接 `map(str.upper, ...)` 转大写，最后 `list()` 收拢。",
   "exp": "考查 filter+lambda 筛选、map 映射与 list 转换的链式使用——函数式加工列表的标准考法。",
   "tags": [
    "map",
    "filter",
    "lambda"
   ]
  },
  {
   "id": "code-l4-004",
   "level": 4,
   "title": "递归求阶乘与斐波那契",
   "desc": "编写两个递归函数：`fact(n)` 返回 n 的阶乘（约定 fact(0)=fact(1)=1）；`fib(n)` 返回斐波那契数列第 n 项（fib(1)=fib(2)=1，从第 3 项起每项等于前两项之和）。输入一个正整数 n（1≤n≤10）：第一行输出 n!，第二行输出斐波那契数列第 n 项。",
   "starter": "def fact(n):\n    pass\n\ndef fib(n):\n    pass\n\nn = int(input())\nprint(fact(n))\nprint(fib(n))\n",
   "tests": [
    {
     "stdin": "5\n",
     "expected": "120\n5"
    },
    {
     "stdin": "1\n",
     "expected": "1\n1"
    },
    {
     "stdin": "10\n",
     "expected": "3628800\n55"
    }
   ],
   "ref": "def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)\n\ndef fib(n):\n    if n <= 2:\n        return 1\n    return fib(n - 1) + fib(n - 2)\n\nn = int(input())\nprint(fact(n))\nprint(fib(n))",
   "hint": "递归要有终止条件：fact 在 n≤1 时返回 1，fib 在 n≤2 时返回 1；一般情况调用自身缩小问题规模。",
   "exp": "考查递归函数的终止条件与自我调用——阶乘与斐波那契是递归理解题的两大经典。",
   "tags": [
    "递归",
    "函数",
    "阶乘"
   ]
  },
  {
   "id": "code-l5-002",
   "level": 5,
   "title": "学生成绩统计",
   "desc": "当前目录下有 data.csv，存放若干学生的选课成绩（首行为标题行，UTF-8 编码），列依次为：姓名,科目,分数。程序输入一个科目名（保证在文件中出现），统计该科目成绩：第一行输出该科目的平均分（保留 2 位小数），第二行输出该科目最高分学生的姓名；若最高分并列，输出文件中先出现的学生。",
   "files": [
    {
     "name": "data.csv",
     "content": "姓名,科目,分数\n张伟,数学,85\n李娜,数学,92\n王强,英语,78\n刘洋,数学,92\n陈静,英语,88\n赵磊,数学,67\n孙悦,语文,90\n周涛,语文,76\n"
    }
   ],
   "starter": "# 读入 data.csv，统计输入科目的平均分与最高分学生\n",
   "tests": [
    {
     "stdin": "数学\n",
     "expected": "84.00\n李娜\n"
    },
    {
     "stdin": "英语\n",
     "expected": "83.00\n陈静\n"
    },
    {
     "stdin": "语文\n",
     "expected": "83.00\n孙悦\n"
    }
   ],
   "ref": "f = open('data.csv', 'r', encoding='utf-8')\nnext(f)\nsub = input()\ntotal = 0\ncnt = 0\nmx = -1\ntop = ''\nfor line in f:\n    parts = line.strip().split(',')\n    if parts[1] == sub:\n        s = int(parts[2])\n        total += s\n        cnt += 1\n        if s > mx:\n            mx = s\n            top = parts[0]\nf.close()\nprint('{:.2f}'.format(total / cnt))\nprint(top)",
   "hint": "用 next(f) 跳过标题行；每行 strip() 后 split(',')；累加总分和人数求平均，打擂台（大于才更新）求最高分，并列时自然保留先出现者。",
   "exp": "综合考查 CSV 文件逐行读取、split 切分、类型转换、累加求平均与打擂台求最值——文件数据分析大题的标准套路。",
   "tags": [
    "文件",
    "CSV",
    "统计"
   ]
  },
  {
   "id": "code-l5-003",
   "level": 5,
   "title": "英文词频统计",
   "desc": "当前目录下有 data.txt，存放一段英文（若干行，UTF-8 编码；单词只由英文字母组成，单词后可能跟逗号、句号等标点，标点不属于单词）。统计每个单词出现的次数（不区分大小写，统计前统一转为小写）：输出出现次数最多的前 3 个单词，每行格式为\"单词 次数\"（空格分隔）；次数相同的按单词字典序从小到大输出。数据保证第 3 名与第 4 名的次数不同。",
   "files": [
    {
     "name": "data.txt",
     "content": "Python is a great language.\nPython is easy to learn!\nMany people love python, because python is powerful.\nWe can use python for many things.\n"
    }
   ],
   "starter": "# 读入 data.txt，统计每个单词出现次数，输出前 3 名\n",
   "tests": [
    {
     "stdin": "",
     "expected": "python 5\nis 3\nmany 2\n"
    },
    {
     "stdin": "",
     "expected": "python 5\nis 3\nmany 2\n"
    }
   ],
   "ref": "f = open('data.txt', 'r', encoding='utf-8')\nd = {}\nfor line in f:\n    for ch in ',.!?;:':\n        line = line.replace(ch, ' ')\n    for w in line.lower().split():\n        d[w] = d.get(w, 0) + 1\nf.close()\nitems = sorted(d.items(), key=lambda x: (-x[1], x[0]))\nfor w, c in items[:3]:\n    print(w, c)",
   "hint": "先把每行中的标点替换成空格再 split()；用 d.get(w, 0) + 1 计数；sorted(d.items(), key=lambda x: (-x[1], x[0])) 一步完成按次数降序、同次数按字典序升序。",
   "exp": "考查文件读取、标点清洗、转小写、字典计数与多关键字排序——词频统计是 L5 的代表性大题。",
   "tags": [
    "文件",
    "词频统计",
    "字典"
   ]
  },
  {
   "id": "code-l5-004",
   "level": 5,
   "title": "手机月销量分析",
   "desc": "当前目录下有 data.csv，存放某手机店各品牌的月销量数据（首行为标题行，UTF-8 编码），列依次为：品牌,销量,月份（月份为整数）。程序输入一个月份（整数），输出该月销售情况：第一行输出该月销量最高的品牌名与销量（空格分隔，若并列输出文件中先出现的品牌），第二行输出该月的总销量。",
   "files": [
    {
     "name": "data.csv",
     "content": "品牌,销量,月份\n华为,120,1\n苹果,98,1\n小米,150,1\n华为,135,2\n苹果,110,2\n小米,90,2\n华为,160,3\n苹果,105,3\n小米,88,3\nOPPO,200,3\n"
    }
   ],
   "starter": "# 读入 data.csv，统计输入月份的销量最高品牌与总销量\n",
   "tests": [
    {
     "stdin": "1\n",
     "expected": "小米 150\n368\n"
    },
    {
     "stdin": "3\n",
     "expected": "OPPO 200\n553\n"
    },
    {
     "stdin": "2\n",
     "expected": "华为 135\n335\n"
    }
   ],
   "ref": "f = open('data.csv', 'r', encoding='utf-8')\nnext(f)\nm = int(input())\nbest_name = ''\nbest_num = -1\ntotal = 0\nfor line in f:\n    parts = line.strip().split(',')\n    if int(parts[2]) == m:\n        num = int(parts[1])\n        total += num\n        if num > best_num:\n            best_num = num\n            best_name = parts[0]\nf.close()\nprint(best_name, best_num)\nprint(total)",
   "hint": "列顺序是 品牌,销量,月份，注意下标；筛选出该月的记录后打擂台求最大销量，同时累加总销量。",
   "exp": "考查按列筛选 CSV 记录、条件统计与求最值，贴近真实数据清洗场景。",
   "tags": [
    "文件",
    "CSV",
    "最值"
   ]
  },
  {
   "id": "code-l5-005",
   "level": 5,
   "title": "访问日志分析",
   "desc": "当前目录下有 data.log，存放网站访问日志（UTF-8 编码），每行格式为：日期 IP 状态码（三部分用空格分隔，如 2024-05-01 192.168.1.5 200）。程序输入一个状态码（如 404）：第一行输出该状态码在日志中出现的次数，随后按首次出现顺序每行输出一个产生过该状态码的 IP（去重，每个 IP 只输出一次）。",
   "files": [
    {
     "name": "data.log",
     "content": "2024-05-01 192.168.1.5 200\n2024-05-01 192.168.1.12 404\n2024-05-01 192.168.1.5 404\n2024-05-02 10.0.0.8 200\n2024-05-02 192.168.1.12 404\n2024-05-02 172.16.0.3 500\n2024-05-02 10.0.0.8 404\n2024-05-03 192.168.1.5 200\n"
    }
   ],
   "starter": "# 读入 data.log，统计输入状态码的出现次数与涉及的 IP\n",
   "tests": [
    {
     "stdin": "404\n",
     "expected": "4\n192.168.1.12\n192.168.1.5\n10.0.0.8\n"
    },
    {
     "stdin": "200\n",
     "expected": "3\n192.168.1.5\n10.0.0.8\n"
    },
    {
     "stdin": "500\n",
     "expected": "1\n172.16.0.3\n"
    }
   ],
   "ref": "f = open('data.log', 'r', encoding='utf-8')\ncode = input()\ncnt = 0\nips = []\nfor line in f:\n    parts = line.split()\n    if parts[2] == code:\n        cnt += 1\n        if parts[1] not in ips:\n            ips.append(parts[1])\nf.close()\nprint(cnt)\nfor ip in ips:\n    print(ip)",
   "hint": "line.split() 按空白切出三部分；用列表的 not in 判断 IP 是否已出现过，可保持首次出现的顺序。",
   "exp": "考查 split 解析空格分隔的日志、条件筛选、计数与保序去重（列表 not in）。",
   "tags": [
    "文件",
    "字符串",
    "去重"
   ]
  },
  {
   "id": "code-l5-006",
   "level": 5,
   "title": "商品价格表合并",
   "desc": "当前目录下有 goods1.csv 和 goods2.csv 两个商品价格表（首行为标题行，UTF-8 编码），每行格式为：品名,价格（价格为整数）。goods1 是旧价格表，goods2 是新价格表：合并时若品名相同，以 goods2 中的价格为准。把两个文件合并后，按价格从高到低输出全部商品，每行格式为\"品名 价格\"（空格分隔）；价格相同的按品名字典序从小到大输出。",
   "files": [
    {
     "name": "goods1.csv",
     "content": "品名,价格\n苹果,5\n牛奶,12\n面包,8\n鸡蛋,15\n"
    },
    {
     "name": "goods2.csv",
     "content": "品名,价格\n牛奶,13\n香蕉,6\n苹果,4\n咖啡,30\n"
    }
   ],
   "starter": "# 合并 goods1.csv 与 goods2.csv，按价格降序输出全部商品\n",
   "tests": [
    {
     "stdin": "",
     "expected": "咖啡 30\n鸡蛋 15\n牛奶 13\n面包 8\n香蕉 6\n苹果 4\n"
    },
    {
     "stdin": "",
     "expected": "咖啡 30\n鸡蛋 15\n牛奶 13\n面包 8\n香蕉 6\n苹果 4\n"
    }
   ],
   "ref": "d = {}\nf = open('goods1.csv', 'r', encoding='utf-8')\nnext(f)\nfor line in f:\n    parts = line.strip().split(',')\n    d[parts[0]] = int(parts[1])\nf.close()\nf = open('goods2.csv', 'r', encoding='utf-8')\nnext(f)\nfor line in f:\n    parts = line.strip().split(',')\n    d[parts[0]] = int(parts[1])\nf.close()\nitems = sorted(d.items(), key=lambda x: (-x[1], x[0]))\nfor name, price in items:\n    print(name, price)",
   "hint": "用字典合并：先读 goods1 存入字典，再读 goods2 覆盖同名品名；sorted(d.items(), key=lambda x: (-x[1], x[0])) 按价格降序、同价按品名升序。",
   "exp": "考查多文件读取、字典覆盖式合并与 sorted 多关键字排序。",
   "tags": [
    "文件",
    "字典",
    "排序"
   ]
  },
  {
   "id": "code-l5-007",
   "level": 5,
   "title": "文本字符分类统计",
   "desc": "当前目录下有 data.txt，存放一段英文文本（若干行，UTF-8 编码）。逐行统计文件中各类字符的个数（每行先去掉行末换行符再统计，空格计入其他字符），输出 4 行，依次为：\"大写字母:N\"、\"小写字母:N\"、\"数字:N\"、\"其他字符:N\"（N 为相应个数）。",
   "files": [
    {
     "name": "data.txt",
     "content": "Hello Python 123!\nI like Python3.11\nRoom 404, Floor 2\n"
    }
   ],
   "starter": "# 读入 data.txt，分类统计大写/小写/数字/其他字符\n",
   "tests": [
    {
     "stdin": "",
     "expected": "大写字母:6\n小写字母:25\n数字:10\n其他字符:10\n"
    },
    {
     "stdin": "",
     "expected": "大写字母:6\n小写字母:25\n数字:10\n其他字符:10\n"
    }
   ],
   "ref": "f = open('data.txt', 'r', encoding='utf-8')\nupper = lower = digit = other = 0\nfor line in f:\n    line = line.strip('\\n')\n    for ch in line:\n        if ch.isupper():\n            upper += 1\n        elif ch.islower():\n            lower += 1\n        elif ch.isdigit():\n            digit += 1\n        else:\n            other += 1\nf.close()\nprint('大写字母:{}'.format(upper))\nprint('小写字母:{}'.format(lower))\nprint('数字:{}'.format(digit))\nprint('其他字符:{}'.format(other))",
   "hint": "逐行读取，line.strip('\\n') 去掉换行；字符分类用 isupper()/islower()/isdigit()，都不满足即其他字符。",
   "exp": "考查逐字符分类统计：isupper/islower/isdigit 与 else 兜底，注意先把换行符去掉。",
   "tags": [
    "文件",
    "字符串",
    "统计"
   ]
  },
  {
   "id": "code-l5-008",
   "level": 5,
   "title": "成绩分段统计",
   "desc": "当前目录下有 data.csv，存放全班学生的程序设计成绩（首行为标题行，UTF-8 编码），每行格式为：姓名,分数（分数为 0~100 的整数）。按分数段统计人数并输出 5 行：前 4 行依次为\"90分及以上:N\"、\"80-89分:N\"、\"60-79分:N\"、\"60分以下:N\"；第 5 行输出\"不及格名单:\"，随后按文件原顺序每行输出一个不及格（60 分以下）学生的姓名。",
   "files": [
    {
     "name": "data.csv",
     "content": "姓名,分数\n张伟,95\n李娜,84\n王强,55\n刘洋,73\n陈静,88\n赵磊,91\n孙悦,64\n"
    }
   ],
   "starter": "# 读入 data.csv，分段统计人数并输出不及格名单\n",
   "tests": [
    {
     "stdin": "",
     "expected": "90分及以上:2\n80-89分:2\n60-79分:2\n60分以下:1\n不及格名单:\n王强\n"
    },
    {
     "stdin": "",
     "expected": "90分及以上:2\n80-89分:2\n60-79分:2\n60分以下:1\n不及格名单:\n王强\n"
    }
   ],
   "ref": "f = open('data.csv', 'r', encoding='utf-8')\nnext(f)\nc1 = c2 = c3 = c4 = 0\nfailed = []\nfor line in f:\n    parts = line.strip().split(',')\n    s = int(parts[1])\n    if s >= 90:\n        c1 += 1\n    elif s >= 80:\n        c2 += 1\n    elif s >= 60:\n        c3 += 1\n    else:\n        c4 += 1\n        failed.append(parts[0])\nf.close()\nprint('90分及以上:{}'.format(c1))\nprint('80-89分:{}'.format(c2))\nprint('60-79分:{}'.format(c3))\nprint('60分以下:{}'.format(c4))\nprint('不及格名单:')\nfor name in failed:\n    print(name)",
   "hint": "if-elif 按从高到低的顺序判断边界；60 分以下的记录在计数的同时把姓名存入列表。",
   "exp": "考查 if-elif 边界划分、分段计数以及\"边统计边收集\"输出名单。",
   "tags": [
    "文件",
    "CSV",
    "分段统计"
   ]
  },
  {
   "id": "code-l5-009",
   "level": 5,
   "title": "凯撒加密写文件",
   "desc": "当前目录下有 data.txt，存放若干行英文文本（UTF-8 编码）。程序对每一行做凯撒加密：每行先去掉行末换行符，然后将其中的字母循环右移 3 位（a→d、b→e、…、x→a、y→b、z→c，大写字母同理），非字母字符保持不变。按原行顺序把加密后的每一行打印出来，同时把加密后的内容逐行写入当前目录下的 out.txt（每行末尾写一个换行符）。",
   "files": [
    {
     "name": "data.txt",
     "content": "Hello, Python!\nAttack at dawn\nabc XYZ 123\n"
    }
   ],
   "starter": "# 读入 data.txt 逐行加密，打印并写入 out.txt\n",
   "tests": [
    {
     "stdin": "",
     "expected": "Khoor, Sbwkrq!\nDwwdfn dw gdzq\ndef ABC 123\n"
    },
    {
     "stdin": "",
     "expected": "Khoor, Sbwkrq!\nDwwdfn dw gdzq\ndef ABC 123\n"
    }
   ],
   "ref": "f = open('data.txt', 'r', encoding='utf-8')\nout = open('out.txt', 'w', encoding='utf-8')\nfor line in f:\n    line = line.rstrip('\\n')\n    res = ''\n    for ch in line:\n        if 'a' <= ch <= 'z':\n            res += chr((ord(ch) - ord('a') + 3) % 26 + ord('a'))\n        elif 'A' <= ch <= 'Z':\n            res += chr((ord(ch) - ord('A') + 3) % 26 + ord('A'))\n        else:\n            res += ch\n    print(res)\n    out.write(res + '\\n')\nf.close()\nout.close()",
   "hint": "循环移位用 chr((ord(ch) - ord('a') + 3) % 26 + ord('a'))，大写同理；每行加密结果 print 的同时 out.write(res + '\\n')。",
   "exp": "考查逐行读写文件与 ord/chr 字符编码运算——凯撒密码是文件+字符处理的综合题。",
   "tags": [
    "文件",
    "字符串",
    "加密"
   ]
  },
  {
   "id": "code-l6-001",
   "level": 6,
   "title": "随机密码生成器",
   "desc": "第一行输入一个整数作为随机数种子，第二行输入密码长度 n（1≤n≤16）。程序先执行 `random.seed(种子)`，再从固定字符池 `string.ascii_letters + string.digits`（52 个大小写字母在前、10 个数字在后，顺序固定）中用 `random.choice(字符池)` 依次随机取 n 个字符，拼接成密码后输出（只输出这一行密码）。",
   "starter": "import random\nimport string\n\n# 读入种子和长度 n，先 random.seed(种子)，再用 random.choice 从固定字符池依次取 n 个字符\n",
   "tests": [
    {
     "stdin": "10\n8\n",
     "expected": "KcBEKanD\n"
    },
    {
     "stdin": "2024\n12\n",
     "expected": "ElULtm4UAWTW\n"
    },
    {
     "stdin": "7\n1\n",
     "expected": "u\n"
    }
   ],
   "ref": "import random\nimport string\n\nseed = int(input())\nn = int(input())\nrandom.seed(seed)\npool = string.ascii_letters + string.digits\npw = ''\nfor i in range(n):\n    pw = pw + random.choice(pool)\nprint(pw)",
   "hint": "random.seed 要在读入后立即调用；pool = string.ascii_letters + string.digits；循环 n 次 pw += random.choice(pool)。",
   "exp": "考查 random.seed 固定随机序列、random.choice 取元素与字符串拼接——随机类题目必须先固定种子。",
   "tags": [
    "random",
    "string",
    "循环"
   ]
  },
  {
   "id": "code-l6-002",
   "level": 6,
   "title": "莱布尼茨级数求圆周率",
   "desc": "用莱布尼茨级数近似圆周率：π/4 = 1 − 1/3 + 1/5 − 1/7 + 1/9 − …（分母依次为 1,3,5,7,…，第 1 项为正，之后各项符号交替）。输入一个正整数 n，计算前 n 项之和 s，按 π ≈ 4×s 输出近似值（保留 6 位小数）。如 n=1 时输出 4.000000。",
   "starter": "# 读入 n，循环累加莱布尼茨级数前 n 项，输出 4*s（保留 6 位小数）\n",
   "tests": [
    {
     "stdin": "1\n",
     "expected": "4.000000\n"
    },
    {
     "stdin": "10\n",
     "expected": "3.041840\n"
    },
    {
     "stdin": "10000\n",
     "expected": "3.141493\n"
    }
   ],
   "ref": "n = int(input())\ns = 0.0\nsign = 1\nfor i in range(n):\n    s = s + sign / (2 * i + 1)\n    sign = -sign\nprint('{:.6f}'.format(4 * s))",
   "hint": "第 i 项（i 从 0 开始）为 sign / (2*i + 1)，sign 每轮取反；注意先乘 4 再用 '{:.6f}'.format 格式化。",
   "exp": "考查循环累加交错级数与 format 保留小数——数学近似计算的经典题。",
   "tags": [
    "循环",
    "格式化",
    "数学近似"
   ]
  },
  {
   "id": "code-l6-003",
   "level": 6,
   "title": "闰年与月份天数",
   "desc": "第一行输入年份（整数），第二行输入月份（1~12 的整数）。用 `calendar.isleap()` 判断该年是否闰年：第一行输出\"闰年\"或\"平年\"；第二行输出\"该月有N天\"（N 为该月实际天数，闰年 2 月为 29 天）。要求用 if 语句或列表手写各月天数表，不得使用 `calendar.monthrange`。",
   "starter": "import calendar\n\n# 读入年、月，用 calendar.isleap 判断闰年，用手写天数表输出该月天数\n",
   "tests": [
    {
     "stdin": "2024\n2\n",
     "expected": "闰年\n该月有29天\n"
    },
    {
     "stdin": "2023\n2\n",
     "expected": "平年\n该月有28天\n"
    },
    {
     "stdin": "1900\n2\n",
     "expected": "平年\n该月有28天\n"
    }
   ],
   "ref": "import calendar\n\ny = int(input())\nm = int(input())\ndays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]\nif calendar.isleap(y):\n    print('闰年')\n    days[1] = 29\nelse:\n    print('平年')\nprint('该月有{}天'.format(days[m - 1]))",
   "hint": "days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]；闰年时把 days[1] 改成 29；calendar.isleap(y) 返回 True/False（整百年要能被 400 整除才算闰年）。",
   "exp": "考查 calendar.isleap、列表下标与分支修改——万年历天数计算的常考点。",
   "tags": [
    "calendar",
    "闰年",
    "列表"
   ]
  },
  {
   "id": "code-l6-004",
   "level": 6,
   "title": "turtle 画正多边形",
   "desc": "第一行输入正多边形的边数 n（3~8 的整数），第二行输入边长 d（正整数）。用红色画笔画这个正多边形：画笔从默认位置 (0,0)、朝向右方出发，每画一条长 d 的边就右转 360/n 度，共画 n 条边。画完后输出三行验证信息：第一行\"外角: X\"（X 为 360/n 的值，用 / 除法，形如 90.0）；第二行\"落点: X Y\"（画完后画笔的横、纵坐标，用 `round()` 取整）；第三行\"画笔颜色: red\"。本站已内置 turtle 画布，可直接运行。",
   "starter": "import turtle\n\nn = int(input())\nd = int(input())\nt = turtle.Turtle()\n# 请补全：设红色画笔，循环画 n 条边（每条边后右转 360/n 度），最后打印三行验证信息\n",
   "tests": [
    {
     "stdin": "4\n100\n",
     "expected": "外角: 90.0\n落点: 0 0\n画笔颜色: red\n"
    },
    {
     "stdin": "3\n100\n",
     "expected": "外角: 120.0\n落点: 0 0\n画笔颜色: red\n"
    },
    {
     "stdin": "6\n50\n",
     "expected": "外角: 60.0\n落点: 0 0\n画笔颜色: red\n"
    }
   ],
   "ref": "import turtle\n\nn = int(input())\nd = int(input())\nt = turtle.Turtle()\nt.pencolor('red')\nang = 360 / n\nfor i in range(n):\n    t.forward(d)\n    t.right(ang)\nprint('外角:', ang)\nprint('落点:', round(t.xcor()), round(t.ycor()))\nprint('画笔颜色:', t.pencolor())",
   "hint": "for i in range(n): t.forward(d) 后 t.right(360 / n)；最后用 t.xcor()、t.ycor()、t.pencolor() 查询状态打印。",
   "exp": "考查 turtle 画笔控制、循环画正多边形与 xcor/ycor/pencolor 状态查询，判题以打印的状态值为准。",
   "tags": [
    "turtle",
    "循环",
    "图形"
   ]
  },
  {
   "id": "code-l7-001",
   "level": 7,
   "title": "正则提取手机号",
   "desc": "程序开头已给定字符串变量 text（starter 中已提供，内容包含若干手机号、邮箱和座机）。用 `re` 模块找出 text 中所有的手机号（以 1 开头、后面跟 10 位数字的连续 11 位数字），按出现顺序每行输出一个。",
   "starter": "import re\n\ntext = \"请联系张先生，电话 13812345678；备用邮箱 zhang_wei@example.com，也可拨打 15901234567 或 150。李女士的电话是 18765432109，邮箱 li_miss@163.com 不必回复。应急电话 010-62785000 为座机。\"\n# 请补全：用 re 找出 text 中所有手机号并逐行输出\n",
   "tests": [
    {
     "stdin": "",
     "expected": "13812345678\n15901234567\n18765432109\n"
    },
    {
     "stdin": "",
     "expected": "13812345678\n15901234567\n18765432109\n"
    }
   ],
   "ref": "import re\n\ntext = \"请联系张先生，电话 13812345678；备用邮箱 zhang_wei@example.com，也可拨打 15901234567 或 150。李女士的电话是 18765432109，邮箱 li_miss@163.com 不必回复。应急电话 010-62785000 为座机。\"\n\nfor p in re.findall(r'1\\d{10}', text):\n    print(p)",
   "hint": "re.findall(r'1\\d{10}', text) 返回所有匹配的手机号列表，直接遍历打印。",
   "exp": "考查 re.findall 与正则 r'1\\d{10}' 的书写——手机号匹配是正则最高频的考题。",
   "tags": [
    "re",
    "正则",
    "字符串"
   ]
  },
  {
   "id": "code-l7-002",
   "level": 7,
   "title": "解析 JSON 成绩数据",
   "desc": "程序开头已给定 JSON 字符串 data_str（starter 中已提供，是一个班级的成绩数组，每个元素含 name、score 两个键）。用 `json` 模块解析后：第一行输出全班平均分（保留 2 位小数），第二行输出最高分学生的姓名（数据保证最高分唯一）。",
   "starter": "import json\n\ndata_str = '[{\"name\": \"张伟\", \"score\": 85}, {\"name\": \"李娜\", \"score\": 92}, {\"name\": \"王强\", \"score\": 78}, {\"name\": \"刘洋\", \"score\": 90}, {\"name\": \"陈静\", \"score\": 88}]'\n# 请补全：解析 JSON，输出平均分（2 位小数）与最高分学生姓名\n",
   "tests": [
    {
     "stdin": "",
     "expected": "86.60\n李娜\n"
    },
    {
     "stdin": "",
     "expected": "86.60\n李娜\n"
    }
   ],
   "ref": "import json\n\ndata_str = '[{\"name\": \"张伟\", \"score\": 85}, {\"name\": \"李娜\", \"score\": 92}, {\"name\": \"王强\", \"score\": 78}, {\"name\": \"刘洋\", \"score\": 90}, {\"name\": \"陈静\", \"score\": 88}]'\nstudents = json.loads(data_str)\ntotal = 0\nmx = -1\ntop = ''\nfor st in students:\n    total += st['score']\n    if st['score'] > mx:\n        mx = st['score']\n        top = st['name']\nprint('{:.2f}'.format(total / len(students)))\nprint(top)",
   "hint": "json.loads(data_str) 得到字典列表；遍历累加 score 求平均，打擂台找最高分对应的名字。",
   "exp": "考查 json.loads 解析、字典取值与累加统计——JSON 数据处理的基础题。",
   "tags": [
    "json",
    "字典",
    "统计"
   ]
  },
  {
   "id": "code-l7-003",
   "level": 7,
   "title": "JSON 转 CSV 输出",
   "desc": "程序开头已给定 JSON 字符串 data_str（starter 中已提供，是一个商品数组，每个元素含 name、price 两个键）。解析后把数据转成 CSV 格式文本输出：第一行输出列名 name,price，随后按原顺序每行输出一个商品的 name,price（英文逗号分隔）。",
   "starter": "import json\n\ndata_str = '[{\"name\": \"apple\", \"price\": 5}, {\"name\": \"milk\", \"price\": 12}, {\"name\": \"bread\", \"price\": 8}, {\"name\": \"egg\", \"price\": 15}, {\"name\": \"coffee\", \"price\": 30}]'\n# 请补全：解析 JSON，按 CSV 格式输出（首行 name,price）\n",
   "tests": [
    {
     "stdin": "",
     "expected": "name,price\napple,5\nmilk,12\nbread,8\negg,15\ncoffee,30\n"
    },
    {
     "stdin": "",
     "expected": "name,price\napple,5\nmilk,12\nbread,8\negg,15\ncoffee,30\n"
    }
   ],
   "ref": "import json\n\ndata_str = '[{\"name\": \"apple\", \"price\": 5}, {\"name\": \"milk\", \"price\": 12}, {\"name\": \"bread\", \"price\": 8}, {\"name\": \"egg\", \"price\": 15}, {\"name\": \"coffee\", \"price\": 30}]'\nitems = json.loads(data_str)\nprint('name,price')\nfor it in items:\n    print('{},{}'.format(it['name'], it['price']))",
   "hint": "json.loads 解析后先 print 表头，再遍历列表，用 '{},{}'.format(it['name'], it['price']) 拼每一行。",
   "exp": "考查 JSON 解析与 CSV 格式拼装输出——两种数据格式的转换。",
   "tags": [
    "json",
    "CSV",
    "循环"
   ]
  },
  {
   "id": "code-l7-004",
   "level": 7,
   "title": "数据库查询——商品销售额统计",
   "desc": "sales.db（SQLite 数据库，本站判题环境已提供）中有表 orders，字段为：id（INTEGER 主键）、product（TEXT，商品名）、qty（INTEGER，数量）、price（REAL，单价），共 10 行记录。编程：输入一个商品名，在 orders 中查询该商品的全部记录：若存在，第一行输出“{商品名}总销售额:X”（X 为该商品所有记录的 数量×单价 之和，保留 2 位小数），第二行输出“最大单笔数量:N”（N 为该商品记录中 qty 的最大值）；若不存在，只输出一行“无该商品记录”。",
   "files": [
    {
     "name": "sales.db",
     "content": "U1FMaXRlIGZvcm1hdCAzABAAAQEAQCAgAAAAAgAAAAIAAAAAAAAAAAAAAAEAAAAEAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAC6N+A0AAAABD5MAD5MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAawEHFxkZAYExdGFibGVvcmRlcnNvcmRlcnMCQ1JFQVRFIFRBQkxFIG9yZGVycyhpZCBJTlRFR0VSIFBSSU1BUlkgS0VZLCBwcm9kdWN0IFRFWFQsIHF0eSBJTlRFR0VSLCBwcmljZSBSRUFMKQ0AAAAKDyIAD+cPyw+7D6IPjw9zD2MPTQ81DyIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARCgUAHwEC5pi+56S65ZmoBgUTFgkFACsJAueslOiusOacrOeUteiEkROHFAgFABkBB1VTQue6vxRAL8zMzMzMzQ4HBQAZAQLplK7nm5gMAMcaBgUAJQEH5peg57q/6byg5qCHCEBWYAAAAAAAEQUFAB8BAuaYvuekuuWZqAQFExcEBQArAQLnrJTorrDmnKznlLXohJECE4cOAwUAGQEC6ZSu55uYBQDHGgIFACUBB+aXoOe6v+m8oOaghwpAVmAAAAAAABcBBQArAQLnrJTorrDmnKznlLXohJEDE4c=",
     "b64": true
    }
   ],
   "starter": "import sqlite3\n\nconn = sqlite3.connect('sales.db')\ncur = conn.cursor()\n# 1. 输入商品名，用参数化查询取回该商品所有记录的 qty、price\n# 2. 有记录：输出总销售额（保留2位）与最大单笔数量\n# 3. 无记录：输出 无该商品记录\n",
   "tests": [
    {
     "stdin": "笔记本电脑\n",
     "expected": "笔记本电脑总销售额:29994.00\n最大单笔数量:3\n"
    },
    {
     "stdin": "键盘\n",
     "expected": "键盘总销售额:3383.00\n最大单笔数量:12\n"
    },
    {
     "stdin": "耳机\n",
     "expected": "无该商品记录\n"
    }
   ],
   "ref": "import sqlite3\n\nconn = sqlite3.connect('sales.db')\ncur = conn.cursor()\nname = input()\ncur.execute('SELECT qty, price FROM orders WHERE product=?', (name,))\nrows = cur.fetchall()\nif len(rows) == 0:\n    print('无该商品记录')\nelse:\n    total = 0\n    maxq = rows[0][0]\n    for qty, price in rows:\n        total += qty * price\n        if qty > maxq:\n            maxq = qty\n    print('{}总销售额:{:.2f}'.format(name, total))\n    print('最大单笔数量:{}'.format(maxq))\nconn.close()\n",
   "hint": "cur.execute 的 SQL 里用 ? 占位，参数写成 (name,)；fetchall() 返回元组列表，逐行累加 qty*price；格式化 {:.2f} 保留 2 位。",
   "exp": "考查 sqlite3 连接查询、参数化 SQL 防注入写法、聚合思想的循环实现与 {:.2f} 格式化，为三级数据库应用大题原型。",
   "tags": [
    "SQLite",
    "SQL 查询",
    "聚合统计"
   ]
  },
  {
   "id": "code-l7-005",
   "level": 7,
   "title": "数据库建表与降序输出",
   "desc": "用 sqlite3 在内存中建库：conn = sqlite3.connect(':memory:')，建表 student，字段 name（TEXT）、score（INTEGER）。循环读入 3 行“姓名 分数”（空格分隔，分数互不相同）插入表中并 commit，然后按 score 从高到低逐行输出“姓名 分数”（空格分隔）。本站判题环境已支持 sqlite3。",
   "files": [],
   "starter": "import sqlite3\n\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\n# 1. 建表 student(name TEXT, score INTEGER)\n# 2. 循环 3 次读入“姓名 分数”并 INSERT（用 ? 占位）\n# 3. conn.commit() 后按 score 降序 SELECT，逐行输出\n",
   "tests": [
    {
     "stdin": "张三 78\n李四 95\n王五 86\n",
     "expected": "李四 95\n王五 86\n张三 78\n"
    },
    {
     "stdin": "赵六 60\n钱七 92\n孙八 73\n",
     "expected": "钱七 92\n孙八 73\n赵六 60\n"
    },
    {
     "stdin": "周一 88\n吴二 55\n郑三 100\n",
     "expected": "郑三 100\n周一 88\n吴二 55\n"
    }
   ],
   "ref": "import sqlite3\n\nconn = sqlite3.connect(':memory:')\ncur = conn.cursor()\ncur.execute('CREATE TABLE student(name TEXT, score INTEGER)')\nfor i in range(3):\n    parts = input().split()\n    cur.execute('INSERT INTO student VALUES (?, ?)', (parts[0], int(parts[1])))\nconn.commit()\ncur.execute('SELECT name, score FROM student ORDER BY score DESC')\nfor row in cur.fetchall():\n    print(row[0], row[1])\nconn.close()\n",
   "hint": "建表与插入都用 cur.execute；插入参数 (name, int(score))；排序在 SQL 里用 ORDER BY score DESC，不必在 Python 里再排。",
   "exp": "考查 SQLite 建库建表、INSERT 参数化、commit 与 ORDER BY 排序查询的完整流程，对应三级数据库大题“建—插—查”全链路。",
   "tags": [
    "SQLite",
    "建表插入",
    "排序查询"
   ]
  },
  {
   "id": "code-l7-006",
   "level": 7,
   "title": "正则日志分析",
   "desc": "app.log（UTF-8 编码，本站已提供）记录了服务运行日志，每行格式为“日期 时间 级别 消息”（以空格分隔；日期形如 2024-05-20，时间形如 09:15:32，级别为 INFO/DEBUG/WARNING/ERROR 之一，消息中可能含空格）。输入一个级别字符串，用 re 模块解析每一行：第一行输出该级别的日志条数；第二行输出该级别最后一条日志的“日期 时间”（即日期与时间之间保留一个空格）。测试数据保证所查级别在日志中至少出现一次。",
   "files": [
    {
     "name": "app.log",
     "content": "2024-05-20 09:15:32 INFO 服务启动完成\n2024-05-20 09:15:40 DEBUG 加载配置文件 config.ini\n2024-05-20 09:16:02 INFO 收到用户请求 /index\n2024-05-20 09:17:15 ERROR 数据库连接失败\n2024-05-20 09:18:03 WARNING 内存使用率达到75%\n2024-05-20 09:18:30 INFO 收到用户请求 /login\n2024-05-20 09:19:47 ERROR 接口响应超时\n2024-05-20 09:20:55 DEBUG 会话已清理\n2024-05-20 09:21:10 INFO 数据已保存\n2024-05-20 09:22:33 WARNING 磁盘剩余空间不足\n2024-05-20 09:23:01 ERROR 文件写入失败\n2024-05-20 09:24:18 DEBUG 缓存已刷新\n"
    }
   ],
   "starter": "import re\n\nlevel = input()\n# 逐行读取 app.log，用 re.match 拆出 日期、时间、级别、消息\n# 统计该级别条数，并记录最后一条的“日期 时间”\n",
   "tests": [
    {
     "stdin": "ERROR\n",
     "expected": "3\n2024-05-20 09:23:01\n"
    },
    {
     "stdin": "INFO\n",
     "expected": "4\n2024-05-20 09:21:10\n"
    },
    {
     "stdin": "WARNING\n",
     "expected": "2\n2024-05-20 09:22:33\n"
    }
   ],
   "ref": "import re\n\nlevel = input()\ncount = 0\nlast = ''\nfor line in open('app.log', encoding='utf-8'):\n    m = re.match(r'(\\S+) (\\S+) (\\S+) (.+)', line.strip())\n    if m is not None and m.group(3) == level:\n        count += 1\n        last = m.group(1) + ' ' + m.group(2)\nprint(count)\nprint(last)\n",
   "hint": "\\S+ 匹配一段非空白字符：前两段合起来是完整时间（日期 空格 时间），第 3 段是级别，剩下 (.+) 是消息；最后一条时间在每次命中时覆盖 last 即可。",
   "exp": "考查 re.match 分组提取（\\S+ 与 .+ 的区别）、文件逐行处理与“最后一条”的记录技巧，是三级正则应用大题的典型形态。",
   "tags": [
    "re",
    "正则分组",
    "文件"
   ]
  },
  {
   "id": "code-l7-007",
   "level": 7,
   "title": "正则提取重量并排序",
   "desc": "输入一行文本，其中混有若干“数字+单位”片段：数字为整数或小数（如 12、1.5），单位仅可能是 mg、g、kg、t，形如 12kg、1.5t、200mg、500g。用 re 模块提取出全部片段（不必做单位换算），按片段中数字的数值从小到大排序后，每行输出一个原始片段。数据保证各片段数值互不相同。",
   "files": [],
   "starter": "import re\n\ntext = input()\n# 用 re.findall 配合分组 (数字)(单位) 提取全部片段\n# 按数字值从小到大排序后逐行输出原始片段\n",
   "tests": [
    {
     "stdin": "今日入库：苹果12kg、大米5t、食盐500g、白糖800g、钢材3t\n",
     "expected": "3t\n5t\n12kg\n500g\n800g\n"
    },
    {
     "stdin": "面粉25.5kg、茶叶2.4kg、大豆1.5t、药材200mg\n",
     "expected": "1.5t\n2.4kg\n25.5kg\n200mg\n"
    },
    {
     "stdin": "包裹A重4kg，内含光盘50g与说明书1kg，外箱1.2kg\n",
     "expected": "1kg\n1.2kg\n4kg\n50g\n"
    }
   ],
   "ref": "import re\n\ntext = input()\npairs = re.findall(r'(\\d+(?:\\.\\d+)?)(mg|kg|t|g)', text)\npairs.sort(key=lambda p: float(p[0]))\nfor num, unit in pairs:\n    print(num + unit)\n",
   "hint": "re.findall 带两个分组时返回 (数字, 单位) 元组列表；\\d+(?:\\.\\d+)? 匹配整数或小数；sort 的 key 用 float(数字) 保证 1.2 与 1 按数值比较。",
   "exp": "考查 re.findall 分组捕获、(?: ) 非捕获组、可选小数点写法与 lambda 作 sort key 的数值排序，是三级正则重点题型。",
   "tags": [
    "re",
    "正则分组",
    "排序"
   ]
  },
  {
   "id": "code-l7-008",
   "level": 7,
   "title": "银行账户类 BankAccount",
   "desc": "定义类 BankAccount：__init__(self, owner, balance) 保存户主名和余额；deposit(self, amount) 存款，余额增加 amount 并输出“{户主}存入{amount}元，余额{余额}元”；withdraw(self, amount) 取款：若 amount 不超过余额，扣款并输出“{户主}取出{amount}元，余额{余额}元”，否则输出“余额不足，{户主}取款失败”（余额不变）。输入一个整数作为初始余额（第一行），主程序已按下面顺序调用（不得改动）：创建户主为“小明”的账户后，依次 deposit(200)、withdraw(450)、withdraw(300)。输出即三次调用的打印结果。",
   "files": [],
   "starter": "class BankAccount:\n    def __init__(self, owner, balance):\n        pass\n\n    def deposit(self, amount):\n        pass\n\n    def withdraw(self, amount):\n        pass\n\nbalance = int(input())\nacc = BankAccount('小明', balance)\nacc.deposit(200)\nacc.withdraw(450)\nacc.withdraw(300)\n",
   "tests": [
    {
     "stdin": "100\n",
     "expected": "小明存入200元，余额300元\n余额不足，小明取款失败\n小明取出300元，余额0元\n"
    },
    {
     "stdin": "400\n",
     "expected": "小明存入200元，余额600元\n小明取出450元，余额150元\n余额不足，小明取款失败\n"
    },
    {
     "stdin": "50\n",
     "expected": "小明存入200元，余额250元\n余额不足，小明取款失败\n余额不足，小明取款失败\n"
    }
   ],
   "ref": "class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        print('{}存入{}元，余额{}元'.format(self.owner, amount, self.balance))\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            print('余额不足，{}取款失败'.format(self.owner))\n        else:\n            self.balance -= amount\n            print('{}取出{}元，余额{}元'.format(self.owner, amount, self.balance))\n\nbalance = int(input())\nacc = BankAccount('小明', balance)\nacc.deposit(200)\nacc.withdraw(450)\nacc.withdraw(300)\n",
   "hint": "余额应存为实例属性 self.balance，方法里用 self.balance 更新；取款前先比较 amount 与 self.balance 决定走哪个分支。",
   "exp": "考查类的定义、__init__ 与实例属性、实例方法及分支逻辑，是三级面向对象大题“账户口令”原型。",
   "tags": [
    "面向对象",
    "类与实例",
    "方法"
   ]
  },
  {
   "id": "code-l7-009",
   "level": 7,
   "title": "动物继承与多态",
   "desc": "基类 Animal 与主程序已给出：Animal 的 __init__ 保存名字，speak(self) 返回 '...'；主程序先输入 n，再输入 n 行“类型 名字”（类型只可能是 dog 或 cat，空格分隔），把创建的对象存入列表，最后逐个调用 speak 多态输出“{名字}的叫声是{叫声}”。请补全两个子类：Dog 继承 Animal 并重写 speak 返回 '汪汪'，Cat 继承 Animal 并重写 speak 返回 '喵喵'（都不得改动主程序）。",
   "files": [],
   "starter": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return '...'\n\nclass Dog(Animal):\n    pass\n\nclass Cat(Animal):\n    pass\n\nn = int(input())\nanimals = []\nfor i in range(n):\n    t, name = input().split()\n    if t == 'dog':\n        animals.append(Dog(name))\n    else:\n        animals.append(Cat(name))\nfor a in animals:\n    print('{}的叫声是{}'.format(a.name, a.speak()))\n",
   "tests": [
    {
     "stdin": "3\ndog 旺财\ncat 咪咪\ndog 小黑\n",
     "expected": "旺财的叫声是汪汪\n咪咪的叫声是喵喵\n小黑的叫声是汪汪\n"
    },
    {
     "stdin": "2\ncat 咪咪\ncat 蓝蓝\n",
     "expected": "咪咪的叫声是喵喵\n蓝蓝的叫声是喵喵\n"
    },
    {
     "stdin": "4\ndog 阿黄\ncat 雪球\ndog 大壮\ncat 煤球\n",
     "expected": "阿黄的叫声是汪汪\n雪球的叫声是喵喵\n大壮的叫声是汪汪\n煤球的叫声是喵喵\n"
    }
   ],
   "ref": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return '...'\n\nclass Dog(Animal):\n    def speak(self):\n        return '汪汪'\n\nclass Cat(Animal):\n    def speak(self):\n        return '喵喵'\n\nn = int(input())\nanimals = []\nfor i in range(n):\n    t, name = input().split()\n    if t == 'dog':\n        animals.append(Dog(name))\n    else:\n        animals.append(Cat(name))\nfor a in animals:\n    print('{}的叫声是{}'.format(a.name, a.speak()))\n",
   "hint": "子类只需重写 speak 方法（class Dog(Animal): 下重新定义 speak 并 return），__init__ 从父类继承不必重写；同一个 speak() 调用对不同子类对象表现出不同行为即多态。",
   "exp": "考查继承语法 class 子类(父类)、方法重写与多态调用，是三级面向对象“动物叫声”经典题。",
   "tags": [
    "面向对象",
    "继承",
    "多态"
   ]
  },
  {
   "id": "code-l7-010",
   "level": 7,
   "title": "matplotlib 销售额折线图",
   "desc": "第一行输入月份数 n（2≤n≤12），第二行输入 n 个整数（空格分隔），依次为 1~n 月的销售额。用 matplotlib 绘制折线图（x 轴为月份 1..n，画法用 plt.plot(xs, ys, 'o-')，即带圆点标记），保存为 sales.png（本站判题不显示图，不必调用 plt.show()，图不影响判题）；同时在屏幕输出 n 行“{月份}月:{销售额}”，最后一行输出“最高:{月份}月”（销售额最高的月份，数据保证唯一）。本站判题环境已支持 matplotlib。",
   "files": [],
   "starter": "import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\n\nn = int(input())\nys = list(map(int, input().split()))\n# 1. 构造月份列表 xs = 1..n，plt.plot(xs, ys, 'o-') 后 plt.savefig('sales.png')\n# 2. 逐行输出每月销售额，最后输出最高销售额的月份\n",
   "tests": [
    {
     "stdin": "6\n45 51 38 62 57 70\n",
     "expected": "1月:45\n2月:51\n3月:38\n4月:62\n5月:57\n6月:70\n最高:6月\n"
    },
    {
     "stdin": "5\n88 92 79 95 83\n",
     "expected": "1月:88\n2月:92\n3月:79\n4月:95\n5月:83\n最高:4月\n"
    },
    {
     "stdin": "12\n30 42 38 55 61 58 72 69 84 77 90 86\n",
     "expected": "1月:30\n2月:42\n3月:38\n4月:55\n5月:61\n6月:58\n7月:72\n8月:69\n9月:84\n10月:77\n11月:90\n12月:86\n最高:11月\n"
    }
   ],
   "ref": "import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\n\nn = int(input())\nys = list(map(int, input().split()))\nxs = list(range(1, n + 1))\nplt.plot(xs, ys, 'o-')\nplt.savefig('sales.png')\nbest = 1\nfor i in range(1, n):\n    if ys[i] > ys[best - 1]:\n        best = i + 1\nfor i in range(n):\n    print('{}月:{}'.format(xs[i], ys[i]))\nprint('最高:{}月'.format(best))\n",
   "hint": "xs 用 list(range(1, n+1)) 生成；最高月份用打擂台（记录下标）或 ys.index(max(ys))+1 求出；savefig 之前不要调用 plt.show()。",
   "exp": "考查 matplotlib 折线图绘制与 savefig 保存（Agg 后端），配合列表遍历求最值；判题以 print 的数据为准，图作为练习产物。",
   "tags": [
    "matplotlib",
    "数据可视化",
    "求最值"
   ]
  },
  {
   "id": "code-l7-011",
   "level": 7,
   "title": "JSON 商品数据 Top-N",
   "desc": "data.json（UTF-8 编码，本站已提供）是某电商的商品数组，每个元素含三个键：name（名称）、price（价格，数字）、sales（月销量，整数），共 10 个商品。第一行输入销量下限 k，第二行输入整数 N：从数组中筛选出 sales 不小于 k 的全部商品，按 sales 从高到低输出前 N 个（不足 N 个则全部输出），每行“名称 销量”（空格分隔，数据保证销量互不相同）；最后输出一行“平均价格:X”，X 为全部符合条件商品 price 的平均值（保留 2 位小数）。",
   "files": [
    {
     "name": "data.json",
     "content": "[\n {\n  \"name\": \"保温杯\",\n  \"price\": 45.0,\n  \"sales\": 1200\n },\n {\n  \"name\": \"蓝牙耳机\",\n  \"price\": 199.0,\n  \"sales\": 3500\n },\n {\n  \"name\": \"数据线\",\n  \"price\": 12.5,\n  \"sales\": 8000\n },\n {\n  \"name\": \"充电宝\",\n  \"price\": 89.0,\n  \"sales\": 2600\n },\n {\n  \"name\": \"手机壳\",\n  \"price\": 25.0,\n  \"sales\": 5200\n },\n {\n  \"name\": \"键盘\",\n  \"price\": 159.0,\n  \"sales\": 980\n },\n {\n  \"name\": \"鼠标垫\",\n  \"price\": 19.9,\n  \"sales\": 4100\n },\n {\n  \"name\": \"音箱\",\n  \"price\": 299.0,\n  \"sales\": 1500\n },\n {\n  \"name\": \"摄像头\",\n  \"price\": 129.0,\n  \"sales\": 2200\n },\n {\n  \"name\": \"U盘\",\n  \"price\": 39.9,\n  \"sales\": 6300\n }\n]\n"
    }
   ],
   "starter": "import json\n\nitems = json.load(open('data.json', encoding='utf-8'))\nk = int(input())\nn = int(input())\n# 1. 列表解析筛选 sales >= k 的商品\n# 2. 按 sales 降序排序，输出前 n 个“名称 销量”\n# 3. 输出全部符合条件商品的平均价格（保留2位）\n",
   "tests": [
    {
     "stdin": "1000\n3\n",
     "expected": "数据线 8000\nU盘 6300\n手机壳 5200\n平均价格:95.37\n"
    },
    {
     "stdin": "2000\n2\n",
     "expected": "数据线 8000\nU盘 6300\n平均价格:73.47\n"
    },
    {
     "stdin": "6000\n5\n",
     "expected": "数据线 8000\nU盘 6300\n平均价格:26.20\n"
    }
   ],
   "ref": "import json\n\nitems = json.load(open('data.json', encoding='utf-8'))\nk = int(input())\nn = int(input())\npicked = [it for it in items if it['sales'] >= k]\npicked.sort(key=lambda it: -it['sales'])\ntotal = 0\nfor it in picked:\n    total += it['price']\nfor it in picked[:n]:\n    print(it['name'], it['sales'])\nprint('平均价格:{:.2f}'.format(total / len(picked)))\n",
   "hint": "json.load 直接得到字典列表；筛选用列表解析 [it for it in items if it['sales'] >= k]；降序可用 key=lambda it: -it['sales']；平均价按全部筛选结果而非前 N 个计算。",
   "exp": "考查 json 文件解析、字典取键、列表解析过滤、lambda 排序与格式化统计的 JSON 综合大题。",
   "tags": [
    "json",
    "过滤",
    "排序统计"
   ]
  },
  {
   "id": "code-l7-012",
   "level": 7,
   "title": "网页书单综合分析",
   "desc": "books.html（UTF-8 编码，本站已提供）中书目行形如：<li><span class=\"title\">书名</span><span class=\"price\">价格</span></li>，价格是形如 45.80 的数字。输入一个价格阈值 t（整数或小数）：用 re 模块提取全部书名和价格；先按文件中出现顺序输出价格不低于 t 的书，每行“书名 价格”（价格保留 2 位小数）；再输出一行“平均价格:X”（全部书的均价，保留 2 位小数）；最后输出一行“最贵:书名 价格”（保留 2 位小数，数据保证最贵的书唯一）。",
   "files": [
    {
     "name": "books.html",
     "content": "<!DOCTYPE html>\n<html>\n<head><meta charset=\"utf-8\"><title>计算机书店</title></head>\n<body>\n<h1>本月书单</h1>\n<ul class=\"books\">\n<li><span class=\"title\">Python编程入门</span><span class=\"price\">45.80</span></li>\n<li><span class=\"title\">数据结构</span><span class=\"price\">52.00</span></li>\n<li><span class=\"title\">深度学习实战</span><span class=\"price\">89.00</span></li>\n<li><span class=\"title\">算法导论</span><span class=\"price\">128.50</span></li>\n<li><span class=\"title\">机器学习</span><span class=\"price\">75.00</span></li>\n<li><span class=\"title\">数据库原理</span><span class=\"price\">39.90</span></li>\n<li><span class=\"title\">计算机网络</span><span class=\"price\">49.50</span></li>\n<li><span class=\"title\">操作系统</span><span class=\"price\">55.50</span></li>\n</ul>\n</body>\n</html>\n"
    }
   ],
   "starter": "import re\n\nt = float(input())\nhtml = open('books.html', encoding='utf-8').read()\n# 1. 用 re.findall 提取 (书名, 价格) 列表\n# 2. 按文件顺序输出价格 >= t 的“书名 价格”\n# 3. 输出全部书的平均价格与最贵的书\n",
   "tests": [
    {
     "stdin": "50\n",
     "expected": "数据结构 52.00\n深度学习实战 89.00\n算法导论 128.50\n机器学习 75.00\n操作系统 55.50\n平均价格:66.90\n最贵:算法导论 128.50\n"
    },
    {
     "stdin": "128\n",
     "expected": "算法导论 128.50\n平均价格:66.90\n最贵:算法导论 128.50\n"
    },
    {
     "stdin": "999\n",
     "expected": "平均价格:66.90\n最贵:算法导论 128.50\n"
    }
   ],
   "ref": "import re\n\nt = float(input())\nhtml = open('books.html', encoding='utf-8').read()\npairs = re.findall(r'<span class=\"title\">([^<]+)</span><span class=\"price\">([\\d.]+)</span>', html)\nbooks = {}\nfor name, price in pairs:\n    books[name] = float(price)\ntotal = 0\nmaxname = ''\nmaxp = -1\nfor name, price in books.items():\n    total += price\n    if price >= t:\n        print('{} {:.2f}'.format(name, price))\n    if price > maxp:\n        maxp = price\n        maxname = name\nprint('平均价格:{:.2f}'.format(total / len(books)))\nprint('最贵:{} {:.2f}'.format(maxname, maxp))\n",
   "hint": "正则里 [^<]+ 匹配标签之间的书名、[\\d.]+ 匹配价格；字典 books[name]=float(price) 天然按插入顺序保存；最贵与阈值输出可在同一次遍历中完成。",
   "exp": "三级综合大题：正则分组提取 HTML 内容、字典组织数据、浮点格式化与求最值一次贯通。",
   "tags": [
    "re",
    "字典",
    "文件"
   ]
  },
  {
   "id": "code-l4-005",
   "level": 4,
   "title": "递归输出全排列",
   "desc": "输入一行 3 个互不相同的字符（无分隔符，如 bca）。用递归生成并输出这 3 个字符的全排列：先把字符按字典序（升序）排列，再按字典序每行输出一个排列，共 6 行。要求用递归函数实现（每层固定一个位置的字符，对剩余字符递归）。",
   "files": [],
   "starter": "def perm(chars, prefix):\n    # 递归生成并输出全排列\n    pass\n\ns = sorted(input())\nperm(s, '')\n",
   "tests": [
    {
     "stdin": "bca\n",
     "expected": "abc\nacb\nbac\nbca\ncab\ncba\n"
    },
    {
     "stdin": "312\n",
     "expected": "123\n132\n213\n231\n312\n321\n"
    },
    {
     "stdin": "zay\n",
     "expected": "ayz\nazy\nyaz\nyza\nzay\nzya\n"
    }
   ],
   "ref": "def perm(chars, prefix):\n    if len(chars) == 0:\n        print(prefix)\n        return\n    for i in range(len(chars)):\n        perm(chars[:i] + chars[i + 1:], prefix + chars[i])\n\ns = sorted(input())\nperm(s, '')\n",
   "hint": "递归出口是剩余字符为空时输出 prefix；每层依次把第 i 个字符接到 prefix，剩余字符 chars[:i]+chars[i+1:] 继续递归；因每层按升序尝试且初始已 sorted，输出天然是字典序。",
   "exp": "考查递归分解问题（固定前缀+缩小规模）、切片拼接与回溯式枚举，是三级递归难度的代表题。",
   "tags": [
    "递归",
    "全排列",
    "切片"
   ]
  },
  {
   "id": "code-l4-006",
   "level": 4,
   "title": "递归求各位和与逆序数",
   "desc": "定义两个递归函数：digit_sum(n) 返回非负整数 n 的各位数字之和（如 digit_sum(12345)=15）；rev(n, acc=0) 用累加器参数递归返回 n 的逆序数（如 rev(12345)=54321，rev(1200)=21，前导 0 自动消失）。两个函数都必须用递归实现（借助 % 10 与 // 10，不得用字符串切片）。输入一个非负整数 n：第一行输出各位数字之和，第二行输出逆序数。",
   "files": [],
   "starter": "def digit_sum(n):\n    # 递归返回 n 的各位数字之和\n    pass\n\ndef rev(n, acc=0):\n    # 递归返回 n 的逆序数\n    pass\n\nn = int(input())\nprint(digit_sum(n))\nprint(rev(n))\n",
   "tests": [
    {
     "stdin": "12345\n",
     "expected": "15\n54321\n"
    },
    {
     "stdin": "1200\n",
     "expected": "3\n21\n"
    },
    {
     "stdin": "90807\n",
     "expected": "24\n70809\n"
    }
   ],
   "ref": "def digit_sum(n):\n    if n == 0:\n        return 0\n    return n % 10 + digit_sum(n // 10)\n\ndef rev(n, acc=0):\n    if n == 0:\n        return acc\n    return rev(n // 10, acc * 10 + n % 10)\n\nn = int(input())\nprint(digit_sum(n))\nprint(rev(n))\n",
   "hint": "digit_sum 出口 n==0 返回 0，否则 末位 + 对 n//10 递归；rev 每层把 acc 扩大 10 倍再 加 末位，n==0 时返回 acc，1200 的两个 0 自然被丢掉。",
   "exp": "考查递归出口设计、整数分解 % 10 与 // 10、默认参数（累加器）技巧，覆盖三级递归两大高频考法。",
   "tags": [
    "递归",
    "整数分解",
    "默认参数"
   ]
  },
  {
   "id": "code-l5-010",
   "level": 5,
   "title": "学生成绩平均分统计",
   "desc": "站内已提供文件 students.csv（UTF-8 编码），首行为表头：姓名,语文,数学,英语，其后 8 行是学生数据（成绩均为整数）。要求：①定义函数 average(scores)，参数为成绩列表，返回平均分（浮点数）；②读入文件，按行输出每个学生的姓名和三科平均分（保留 2 位小数，姓名与平均分之间用一个空格分隔，如：王芳 88.33）；③最后输出一行全班三科总平均分（所有同学所有科目成绩的平均分，保留 2 位小数），格式如：全班三科总平均:81.58。",
   "files": [
    {
     "name": "students.csv",
     "content": "姓名,语文,数学,英语\n王芳,85,92,88\n李伟,78,88,90\n张敏,95,90,93\n刘洋,66,75,70\n陈静,88,79,84\n赵磊,73,81,77\n孙丽,92,85,89\n周涛,60,72,68\n"
    }
   ],
   "starter": "def average(scores):\n    # 返回成绩列表 scores 的平均分\n    pass\n",
   "tests": [
    {
     "stdin": "",
     "expected": "王芳 88.33\n李伟 85.33\n张敏 92.67\n刘洋 70.33\n陈静 83.67\n赵磊 77.00\n孙丽 88.67\n周涛 66.67\n全班三科总平均:81.58"
    },
    {
     "stdin": "",
     "expected": "王芳 88.33\n李伟 85.33\n张敏 92.67\n刘洋 70.33\n陈静 83.67\n赵磊 77.00\n孙丽 88.67\n周涛 66.67\n全班三科总平均:81.58"
    }
   ],
   "ref": "def average(scores):\n    return sum(scores) / len(scores)\n\nf = open('students.csv', 'r', encoding='utf-8')\nnext(f)\nall_scores = []\nfor line in f:\n    parts = line.strip().split(',')\n    scores = [int(x) for x in parts[1:]]\n    all_scores += scores\n    print(parts[0], '{:.2f}'.format(average(scores)))\nf.close()\nprint('全班三科总平均:{:.2f}'.format(average(all_scores)))",
   "hint": "用 next(f) 跳过表头行；每行先 strip() 去掉换行再 split(',')；第 1 列是姓名，后面 3 列转 int 后组成成绩列表；总平均就是把所有人的成绩放进一个列表再求 average。",
   "exp": "综合考查：文件读取（open + next 跳表头 + strip/split）、CSV 数据解析与类型转换、自定义函数 average 复用、'{:.2f}' 格式化。是“文件 + 函数 + 统计”的典型综合题。",
   "tags": [
    "文件",
    "函数",
    "CSV",
    "统计"
   ]
  },
  {
   "id": "code-l2-009",
   "level": 2,
   "title": "BMI 计算器",
   "desc": "输入体重（千克）与身高（米），各占一行。先输出 BMI 值（保留 1 位小数），格式如：BMI:22.9；再输出分级结果：BMI < 18.5 为偏瘦，18.5 ≤ BMI < 24 为正常，24 ≤ BMI < 28 为偏胖，28 及以上为肥胖。BMI = 体重 ÷ 身高 ÷ 身高。注意边界：恰好等于 18.5 属正常，恰好等于 24 属偏胖，恰好等于 28 属肥胖。",
   "starter": "",
   "tests": [
    {
     "stdin": "70\n1.75\n",
     "expected": "BMI:22.9\n正常"
    },
    {
     "stdin": "54\n1.5\n",
     "expected": "BMI:24.0\n偏胖"
    },
    {
     "stdin": "28\n1.0\n",
     "expected": "BMI:28.0\n肥胖"
    }
   ],
   "ref": "w = float(input())\nh = float(input())\nbmi = w / (h * h)\nprint('BMI:{:.1f}'.format(bmi))\nif bmi < 18.5:\n    print('偏瘦')\nelif bmi < 24:\n    print('正常')\nelif bmi < 28:\n    print('偏胖')\nelse:\n    print('肥胖')",
   "hint": "体重、身高都要 float() 转换；BMI 用 bmi = w / (h * h)；分级用 if-elif-else 从小到大依次判断，注意边界值归入右侧一档。",
   "exp": "综合考查：输入与 float 转换、算术表达式、'{:.1f}' 格式化、if-elif-else 多分支判断（含边界条件的开闭区间）。",
   "tags": [
    "分支",
    "浮点数",
    "格式化"
   ]
  },
  {
   "id": "code-l5-001",
   "level": 5,
   "title": "书籍评论数统计",
   "desc": "当前目录下有 data.csv，存放某网站出售的书籍数据（首行为标题行，UTF-8 编码），列依次为：书名,作者,出版年,价格,出版社,评论数。程序输入一个评论数阈值（整数），列出评论数不小于该阈值的书籍信息：每行输出\"书名 评论数\"（用空格分隔，按文件原顺序），最后输出一行\"共N本\"（N 为符合条件的书籍数量）。",
   "files": [
    {
     "name": "data.csv",
     "content": "书名,作者,出版年,价格,出版社,评论数\n人工智能基础,张三,2019,59,清华出版社,1200\nPython入门,李四,2020,49,电子出版社,800\n深度学习,王五,2018,89,机械出版社,2500\n数据挖掘,赵六,2021,69,人民邮电出版社,900\n"
    }
   ],
   "starter": "# 读入 data.csv，统计评论数达到阈值的书籍\n",
   "tests": [
    {
     "stdin": "1000\n",
     "expected": "人工智能基础 1200\n深度学习 2500\n共2本"
    },
    {
     "stdin": "800\n",
     "expected": "人工智能基础 1200\nPython入门 800\n深度学习 2500\n数据挖掘 900\n共4本"
    }
   ],
   "ref": "f = open('data.csv', 'r', encoding='utf-8')\nnext(f)\nn = int(input())\ntotal = 0\nfor line in f:\n    parts = line.strip().split(',')\n    comment = int(parts[5])\n    if comment >= n:\n        total += 1\n        print(parts[0], comment)\nf.close()\nprint('共{}本'.format(total))",
   "hint": "用 next(f) 跳过标题行；每行先 strip() 去掉换行再 split(',')；输出用 print(书名, 评论数) 自动加空格",
   "exp": "综合考查文件打开与遍历、字符串切分、类型转换、条件筛选与计数、格式化输出——正是考试编程大题的典型套路。",
   "tags": [
    "文件",
    "字符串",
    "循环"
   ]
  },
  {
   "id": "p27-c1",
   "level": 5,
   "title": "编程1：数据分析——农作物种植地区筛选（17分）",
   "desc": "平均气温.txt（UTF-8 编码，列分隔符“//”，有标题行）给出若干城市逐月平均气温。某种农作物要求月平均气温 20℃ 以上（含）至少 6 个月。读取文件，逐个判断每个城市是否满足生长要求：每行输出“城市名 满足条件”或“城市名 不满足条件”。",
   "files": [
    {
     "name": "平均气温.txt",
     "content": "城市//1月//2月//3月//4月//5月//6月//7月//8月//9月//10月//11月//12月\n北京//-4//-2//5//14//20//25//26//25//20//13//4//-3\n福州//12//11//13//18//22//26//29//28//26//22//18//14\n广州//15//15//18//20//25//28//30//30//28//25//20//15\n哈尔滨//-19//-15//-5//6//14//20//23//21//14//5//-7//-16\n上海//5//6//10//20//21//25//29//28//24//19//13//7\n海口//17//18//21//25//28//29//30//29//27//25//21//18\n昆明//9//11//14//17//19//20//20//19//18//15//11//8\n兰州//-5//-1//6//13//18//22//24//22//16//9//1//-4\n"
    }
   ],
   "starter": "# 读取 平均气温.txt，跳过标题行，逐行统计 ≥20℃ 的月数\n",
   "tests": [
    {
     "stdin": "",
     "expected": "北京 不满足条件\n福州 满足条件\n广州 满足条件\n哈尔滨 不满足条件\n上海 满足条件\n海口 满足条件\n昆明 不满足条件\n兰州 不满足条件"
    }
   ],
   "ref": "f = open('平均气温.txt', 'r', encoding='utf-8')\nnext(f)\nfor line in f:\n    parts = line.strip().split('//')\n    city = parts[0]\n    months = 0\n    for t in parts[1:]:\n        if float(t) >= 20:\n            months += 1\n    if months >= 6:\n        print(city, '满足条件')\n    else:\n        print(city, '不满足条件')\nf.close()",
   "hint": "next(f) 跳标题行；split('//') 切分；统计 >=20 的月数再与 6 比较",
   "exp": "综合考查文件读取、分隔符切分、类型转换、计数与分支——官方模拟卷数据分析题原型。",
   "tags": [
    "文件",
    "数据分析"
   ],
   "score": 17
  },
  {
   "id": "p27-c2",
   "level": 4,
   "title": "编程2：第三方包与多项式运算（18分）",
   "desc": "正式考试要求先安装考场提供的 LossRatio 第三方包（whl）并截图；本站以内置模块 LossRatio.py 等价模拟（files 中已提供，用法相同：import LossRatio 后调用 LossRatio.type_A(n)/type_B(n)）。编程：循环输入整数 n（0≤n≤9，输入其它数退出），计算多项式 s = Σ(i=0..n) −(x_i³−2x_i−5)/(3x_i²−2)，其中 x_i = i（i 为偶数）、x_i = 2i（i 为奇数）；取 LossRatio.type_A(n) 与 type_B(n) 的较小者与 s 相加，输出“n={}时运算结果为{:.3f}”。",
   "files": [
    {
     "name": "LossRatio.py",
     "content": "\"\"\"LossRatio —— 模型损失率计算（本站内置等价实现）。\n正式考试中该包由考场提供 whl 安装：import LossRatio 后\n调用 LossRatio.type_A(num) / LossRatio.type_B(num)，num 为 0~9 整数。\n\"\"\"\n\n\ndef type_A(num):\n    \"\"\"A 模型损失率。\"\"\"\n    return ((num * 37) % 100) / 100.0\n\n\ndef type_B(num):\n    \"\"\"B 模型损失率。\"\"\"\n    return ((num * 53) % 97) / 100.0\n"
    }
   ],
   "starter": "import LossRatio\n\ndef poly(n):\n    # 计算 s = Σ -(x^3-2x-5)/(3x^2-2)，x_i：偶数取 i，奇数取 2i\n    pass\n\n",
   "tests": [
    {
     "stdin": "2\n5\n8\n-1\n",
     "expected": "n=2时运算结果为-2.210\nn=5时运算结果为-7.848\nn=8时运算结果为-17.286"
    },
    {
     "stdin": "0\nq\n",
     "expected": "n=0时运算结果为-2.500"
    }
   ],
   "ref": "import LossRatio\n\ndef poly(n):\n    s = 0\n    for i in range(n + 1):\n        if i % 2 == 0:\n            x = i\n        else:\n            x = 2 * i\n        s += -(x ** 3 - 2 * x - 5) / (3 * x ** 2 - 2)\n    return s\n\nn = input()\nwhile n.isdigit() and int(n) <= 9:\n    n = int(n)\n    s = poly(n)\n    a = LossRatio.type_A(n)\n    b = LossRatio.type_B(n)\n    m = a if a < b else b\n    print('n={}时运算结果为{:.3f}'.format(n, m + s))\n    n = input()",
   "hint": "分段函数用 if i%2==0；s 累加浮点；较小者用条件表达式；格式化 {:.3f}",
   "exp": "考查第三方包导入使用、分段函数、循环累加与格式化输出；n=0 时 s=-2.5、min(LR)=0.625 → -1.875。",
   "tags": [
    "第三方库",
    "函数",
    "循环"
   ],
   "score": 18
  },
  {
   "id": "p27-c3",
   "level": 6,
   "title": "编程3：图形绘制——y=4cos(x)−cos(6x)（15分）",
   "desc": "创建 400×400 画布：以绿色实线绘制坐标轴；在 −π~π 范围内以步长 0.02 变化，绘制函数数据点向 y 轴的红色水平线（横、纵坐标均放大 30 倍），y = 4cos(x) − cos(6x)。正式考试可用 tkinter、matplotlib 或 turtle 任选；本站用内置 turtle 画布实现（已支持 goto/pendown/pencolor），判题要求：程序运行成功且画出画布，最后 print('drawn')。",
   "starter": "import turtle, math\n\nt = turtle.Turtle()\nt.speed(0)\n# 1. 绿色坐标轴（横轴 -190~190，纵轴 190~-190）\n# 2. 红色水平线：x 取 0.02 步长，t.goto(0, y) 再 t.goto(30*x, y)\n",
   "tests": [
    {
     "stdin": "",
     "expected": "drawn",
     "expectCanvas": true
    }
   ],
   "ref": "import turtle, math\n\nt = turtle.Turtle()\nt.speed(0)\nt.pencolor('green')\nt.penup()\nt.goto(-190, 0)\nt.pendown()\nt.goto(190, 0)\nt.penup()\nt.goto(0, 190)\nt.pendown()\nt.goto(0, -190)\nt.pencolor('red')\ni = -314\nwhile i <= 314:\n    x = i * 0.02\n    y = 30 * (4 * math.cos(x) - math.cos(6 * x))\n    t.penup()\n    t.goto(0, y)\n    t.pendown()\n    t.goto(30 * x, y)\n    i += 2\nprint('drawn')",
   "hint": "坐标轴两条绿线；每个数据点画一条从 y 轴 (0, 30y) 到 (30x, 30y) 的红色水平线；penup 移动、pendown 画线",
   "exp": "考查 turtle 画笔状态、goto 定位与数学函数可视化的结合（本站画布会真实渲染）。",
   "tags": [
    "turtle",
    "图形绘制"
   ],
   "score": 15,
   "expectCanvas": true
  },
  {
   "id": "p27-c4",
   "level": 7,
   "title": "编程4：数据库应用——教室管理（12分）",
   "desc": "classroom.db（SQLite，本站已提供）中有表 manage：number（教室号，TEXT 主键，如 '205'）、floor（楼层 TEXT，如 '2楼'）、capacity（容量 INTEGER）、in_use（在用状态 INTEGER，1 在用 0 空闲）。编程：循环输入三位教室号（输入 0 退出）：若存在，输出“{号}教室为在用状态”或“{号}教室为空闲状态”；若不存在，输出“{号}教室不存在，要新增吗？（Y/N）”，再输入一行，为 y/Y 则插入该教室（楼层取教室号首字符+'楼'，容量默认 30，空闲）并输出“新增成功！”。",
   "files": [
    {
     "name": "classroom.db",
     "content": "U1FMaXRlIGZvcm1hdCAzABAAAQEAQCAgAAAAAgAAAAMAAAAAAAAAAAAAAAEAAAAEAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAC6N+A0P+AACD1UAD1UPywAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHQBBxcZGQGBQ3RhYmxlbWFuYWdlbWFuYWdlAkNSRUFURSBUQUJMRSBtYW5hZ2UgKG51bWJlciBURVhUIFBSSU1BUlkgS0VZLCBmbG9vciBURVhULCBjYXBhY2l0eSBJTlRFR0VSLCBpbl91c2UgSU5URUdFUikrAgYXPxkBAGluZGV4c3FsaXRlX2F1dG9pbmRleF9tYW5hZ2VfMW1hbmFnZQMAAAAIAAAAAA0AAAAID4gAD/EP4g/TD8QPtQ+mD5cPiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANCAUTFQEJNTA4NealvDINBwUTFQEINDA1NOalvCMNBgUTFQEJMzAzM+alvC0NBQUTFQEJMzAyM+alvDwNBAUTFQEIMjA1MualvB4NAwUTFQEJMjAzMualvC0NAgUTFQEIMTA4MealvCgNAQUTFQEJMTA1MealvDIKAAAACA/BAA/5D/EP6Q/hD9kP0Q/JD8EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwMTATUwOAgHAxMBNDA1BwcDEwEzMDMGBwMTATMwMgUHAxMBMjA1BAcDEwEyMDMDBwMTATEwOAIGAxMJMTA1",
     "b64": true
    }
   ],
   "starter": "import sqlite3\n\nconn = sqlite3.connect('classroom.db')\ncur = conn.cursor()\nn = input()\nwhile n != '0':\n    pass\n    n = input()\nconn.close()\n",
   "tests": [
    {
     "stdin": "303\n208\ny\n208\n0\n",
     "expected": "303教室为在用状态\n208教室不存在，要新增吗？（Y/N）\n新增成功！\n208教室为空闲状态"
    },
    {
     "stdin": "105\n205\n405\n0\n",
     "expected": "105教室为在用状态\n205教室为空闲状态\n405教室为空闲状态"
    }
   ],
   "ref": "import sqlite3\n\nconn = sqlite3.connect('classroom.db')\ncur = conn.cursor()\nn = input()\nwhile n != '0':\n    cur.execute('SELECT * FROM manage WHERE number=?', (n,))\n    row = cur.fetchone()\n    if row is not None:\n        if row[3] == 1:\n            print(n + '教室为在用状态')\n        else:\n            print(n + '教室为空闲状态')\n    else:\n        print(n + '教室不存在，要新增吗？（Y/N）')\n        ans = input()\n        if ans.strip().lower() == 'y':\n            cur.execute('INSERT INTO manage VALUES (?, ?, ?, ?)', (n, n[0] + '楼', 30, 0))\n            conn.commit()\n            print('新增成功！')\n    n = input()\nconn.close()",
   "hint": "? 占位符传参防注入；fetchone() 判 None；INSERT 后记得 commit()；楼层 = 号码[0]+'楼'",
   "exp": "三级重点：sqlite3 连接、游标、execute 占位符、fetchone、INSERT 与 commit 的完整流程（官方模拟卷数据库题原型）。",
   "tags": [
    "SQLite",
    "数据库"
   ],
   "score": 12
  },
  {
   "id": "p27-c5",
   "level": 7,
   "title": "编程5：文本分析——正则提取产品与网址（13分）",
   "desc": "huaqiang.html（UTF-8）为某元器件网站首页静态文件，相关行形如：<li title=\" 产品 \">若干空白<a href=\" 网址 \" target=...>。用正则筛选其中产品与网址：网址需添加 https: 协议头（页面里是 // 开头），产品名去掉首尾空格。将结果写入 huaqiang.csv（GBK 编码，首行 产品,网址），并在屏幕逐行输出“产品 网址”。",
   "files": [
    {
     "name": "huaqiang.html",
     "content": "<!DOCTYPE html>\n<html>\n<head><meta charset=\"utf-8\"><title>华强元器件商城</title></head>\n<body>\n<h1>华强元器件商城 - 电阻类目</h1>\n<ul class=\"cate\">\n<li title=\" 通孔电阻 \">    <a href=\"//search.ickey.cn/cate-search?cate_id=010101\" target=\"_blank\">通孔电阻</a></li>\n<li title=\" 贴片电阻 \">    <a href=\"//search.ickey.cn/cate-search?cate_id=010102\" target=\"_blank\">贴片电阻</a></li>\n<li title=\" 网络阵列电阻 \">    <a href=\"//search.ickey.cn/cate-search?cate_id=010103\" target=\"_blank\">网络阵列电阻</a></li>\n<li title=\" 电阻套件 \">    <a href=\"//search.ickey.cn/cate-search?cate_id=010104\" target=\"_blank\">电阻套件</a></li>\n<li title=\" 其它固定电阻 \">    <a href=\"//search.ickey.cn/cate-search?cate_id=010199\" target=\"_blank\">其它固定电阻</a></li>\n<li title=\" NTC热敏电阻 \">    <a href=\"//search.ickey.cn/cate-search?cate_id=010201\" target=\"_blank\">NTC热敏电阻</a></li>\n<li title=\" 压敏电阻 \">    <a href=\"//search.ickey.cn/cate-search?cate_id=010202\" target=\"_blank\">压敏电阻</a></li>\n</ul>\n</body>\n</html>\n"
    }
   ],
   "starter": "import re\n\nhtml = open('huaqiang.html', encoding='utf-8').read()\n# 正则提取 title=\" ... \" 与其后 <a href=\" ... \"\n",
   "tests": [
    {
     "stdin": "",
     "expected": "通孔电阻 https://search.ickey.cn/cate-search?cate_id=010101\n贴片电阻 https://search.ickey.cn/cate-search?cate_id=010102\n网络阵列电阻 https://search.ickey.cn/cate-search?cate_id=010103\n电阻套件 https://search.ickey.cn/cate-search?cate_id=010104\n其它固定电阻 https://search.ickey.cn/cate-search?cate_id=010199\nNTC热敏电阻 https://search.ickey.cn/cate-search?cate_id=010201\n压敏电阻 https://search.ickey.cn/cate-search?cate_id=010202"
    }
   ],
   "ref": "import re\n\nhtml = open('huaqiang.html', encoding='utf-8').read()\npairs = re.findall(r'title=\" ?([^\" ]+?) ?\">\\s*<a href=\"([^\"]+)\"', html)\nf = open('huaqiang.csv', 'w', encoding='gbk')\nf.write('产品,网址\\n')\nfor name, url in pairs:\n    if url.startswith('//'):\n        url = 'https:' + url\n    f.write(name + ',' + url + '\\n')\n    print(name, url)\nf.close()",
   "hint": "re.findall 分组返回 (产品, 网址) 元组列表；正则中 [^\" ]+ 匹配不含空格引号的内容；\\s* 吃掉标签间空白",
   "exp": "三级重点：正则分组提取实战 + 文件写入与 GBK 编码（官方模拟卷文本分析题原型）。",
   "tags": [
    "正则",
    "文件",
    "数据分析"
   ],
   "score": 13
  }
 ],
 "parsons": [
  {
   "id": "par-l2-001",
   "level": 2,
   "title": "拼程序：九九乘法表（前3行）",
   "desc": "把右侧打乱的代码行拖拽/点选成正确顺序，组成一个打印九九乘法表前 3 行的程序。行数较多，注意内外层循环与 print 位置的配对。",
   "lines": [
    "for i in range(1, 4):",
    "    for j in range(1, i + 1):",
    "        print(f'{j}x{i}={i*j}', end='\\t')",
    "    print()"
   ],
   "distractors": [
    "for j in range(1, 4):",
    "        print(f'{j}x{i}={i*j}')",
    "print(i)"
   ],
   "tests": [
    {
     "stdin": "",
     "expected": "1x1=1\n1x2=2\t2x2=4\n1x3=3\t2x3=6\t3x3=9"
    }
   ],
   "exp": "外层控制行，内层控制列；end='\\t' 让同行不换行，每行结束后单独 print() 换行。",
   "ref": "for i in range(1, 4):\n    for j in range(1, i + 1):\n        print(f'{j}x{i}={i*j}', end='\\t')\n    print()"
  },
  {
   "id": "par-l3-001",
   "level": 3,
   "title": "拼程序：成绩统计",
   "desc": "scores 里存放 5 个成绩，拼出统计平均分与最高分的程序（平均分保留 1 位小数）。",
   "lines": [
    "scores = [78, 92, 85, 66, 94]",
    "total = 0",
    "for s in scores:",
    "    total += s",
    "avg = total / len(scores)",
    "print('平均分:{:.1f} 最高分:{}'.format(avg, max(scores)))"
   ],
   "distractors": [
    "avg = total // len(scores)",
    "for s in total:",
    "print(avg, max(scores))"
   ],
   "tests": [
    {
     "stdin": "",
     "expected": "平均分:83.0 最高分:94"
    }
   ],
   "exp": "累加器先归零，循环内累加；平均分 = 总分 / 个数，用 len() 取个数。",
   "ref": "scores = [78, 92, 85, 66, 94]\ntotal = 0\nfor s in scores:\n    total += s\navg = total / len(scores)\nprint('平均分:{:.1f} 最高分:{}'.format(avg, max(scores)))"
  },
  {
   "id": "par-l5-001",
   "level": 5,
   "title": "拼程序：读取文件逐行处理",
   "desc": "data.txt 有 3 行城市名（已提供）。拼出「打开文件→逐行打印（去掉换行）→关闭文件」的程序。行内缩进已含在行文本中。",
   "files": [
    {
     "name": "data.txt",
     "content": "上海\n北京\n广州\n"
    }
   ],
   "lines": [
    "f = open('data.txt', 'r', encoding='utf-8')",
    "for line in f:",
    "    print(line.strip())",
    "f.close()"
   ],
   "distractors": [
    "f = open('data.txt', 'w', encoding='utf-8')",
    "    print(line)",
    "f.read()"
   ],
   "tests": [
    {
     "stdin": "",
     "expected": "上海\n北京\n广州"
    }
   ],
   "exp": "读文件用 'r' 模式；for line in f 逐行迭代且行尾带 \\n，strip() 去掉后再打印；用完 close()。",
   "ref": "f = open('data.txt', 'r', encoding='utf-8')\nfor line in f:\n    print(line.strip())\nf.close()"
  },
  {
   "id": "par-l7-001",
   "level": 7,
   "title": "拼程序：正则提取手机号",
   "desc": "拼出「导入 re → 定义文本 → findall 提取全部手机号 → 逐个打印」的程序。",
   "lines": [
    "import re",
    "text = '联系:13812345678 备用:15987654321'",
    "phones = re.findall(r'1[35789]\\d{9}', text)",
    "for p in phones:",
    "    print(p)"
   ],
   "distractors": [
    "phones = re.match(r'1[35789]\\d{9}', text)",
    "import json",
    "    print(text)"
   ],
   "tests": [
    {
     "stdin": "",
     "expected": "13812345678\n15987654321"
    }
   ],
   "exp": "findall 返回所有匹配组成的列表；match 只从头匹配。手机号模式 1[35789]\\d{9}。",
   "ref": "import re\ntext = '联系:13812345678 备用:15987654321'\nphones = re.findall(r'1[35789]\\d{9}', text)\nfor p in phones:\n    print(p)"
  }
 ],
 "lessons": {
  "1": "本关是整张试卷的**地基**：选择题年年考标识符规则、类型转换细节、`/` 与 `//` 的区别、`-3**2` 的值、`and/or` 的返回值，编程大题的每一行也都建立在本关语法之上。概念多、坑多、分值稳，是性价比最高的抢分关。\n\n### 标识符、关键字与书写格式\n\n- 标识符（变量名）规则：由字母、数字、下划线（和中文）组成，**不能以数字开头**，不能与关键字重名，区分大小写（`Age` 与 `age` 是两个变量）。\n- 关键字是 Python 保留字：`if、for、while、def、return、import、and、or、not、in、is` 等。注意 **`True`、`False`、`None` 首字母必须大写**。\n- 书写格式：一句一行，行尾**不需要分号**；缩进（一般 4 个空格）表示代码层次，同一块必须对齐；`#` 后是注释。\n- 一行写不下可用 `\\` 续行，或写在 `()`、`[]`、`{}` 里自然换行。\n\n```python\nimport keyword\nprint(keyword.kwlist)      # 查看全部关键字\nlong_name = (1 + 2 +\n             3 * 4)        # 括号内可自然换行\n```\n\n| 判定 | 标识符 | 原因 |\n| --- | --- | --- |\n| 合法 | `_score`、`name2`、`姓名` | 下划线/中文合法，数字不在开头 |\n| 非法 | `2nd_name` | 不能以数字开头 |\n| 非法 | `for`、`if` | 与关键字重名 |\n| 非法 | `my-name` | 不能出现连字符 `-` |\n\n### 编程环境与程序运行方式\n\n- Python 是**解释型**语言，源程序是扩展名为 `.py` 的文本文件，由解释器逐行翻译执行。\n- 两种运行方式：**交互式**（IDLE 的 `>>>` 提示符下输入一行执行一行，适合试验）与**文件式**（代码保存为 `.py` 文件整体运行，IDLE 中按 F5）。\n- 区别：交互式中表达式的值会自动回显；文件式中**必须用 `print()`** 才能看到输出。\n- 常见环境：IDLE（考试自带）、PyCharm、Jupyter Notebook。\n\n```python\n# test.py —— 文件式程序，保存后按 F5 运行\nprint('Hello')             # 不写 print 就看不到输出\n3 + 4                      # 文件式中这行没有任何效果\n```\n\n### input()、print() 与 eval()\n\n- `input()`：读入一行，**返回值永远是字符串**；可以带提示语 `input('请输入：')`。\n- `print(值1, 值2, ..., sep=' ', end='\\n')`：`sep` 是多个值之间的**分隔符**（默认空格），`end` 是打印完的**结尾符**（默认换行）。\n- `eval(s)`：**去掉字符串外侧引号**，把内容当 Python 表达式求值，是常用的\"字符串转数值\"手段。\n\n```python\na = input()                # 输入 12，a 是字符串 '12'\nprint(a + '5')             # 125（字符串拼接，不是加法！）\nn = eval(input())          # 输入 12，n 是整数 12\nprint(n + 5)               # 17\nprint(1, 2, sep='*', end='!')\nprint('ok')                # 连成一行：1*2!ok\n```\n\n### 六大基本数据类型\n\n| 类型 | 写法示例 | 要点 |\n| --- | --- | --- |\n| 整型 int | `100`、`-5`、`0x1F`、`0b101`、`0o17` | 位数不限不会溢出；`0x`/`0b`/`0o` 分别是十六/二/八进制 |\n| 浮点型 float | `3.14`、`1e-3`、`2.5e8` | 科学计数法；有精度误差 `0.1+0.2 != 0.3` |\n| 复数 complex | `3+4j` | `.real` 实部、`.imag` 虚部、`abs()` 求模 |\n| 字符串 str | `'abc'`、`\"abc\"`、`'''可跨行'''` | 有序、**不可变**的序列 |\n| 布尔 bool | `True`、`False` | 是 int 的子类：`True + True` 得 `2` |\n| 空值 None | `None` | 表示\"什么都没有\"，不是 0 也不是空串 |\n\n```python\nprint(type(3.14))          # <class 'float'>\nprint((3 + 4j).imag)       # 4.0\nprint(abs(3 + 4j))         # 5.0（复数的模）\nprint(True + True)         # 2\nprint(0.1 + 0.2 == 0.3)    # False\n```\n\n### 变量与多重、链式赋值\n\n- 变量**无需声明类型**，赋什么值就是什么类型，同一变量可随时换成其他类型；用 `type()` 查看类型。\n- **链式赋值**：`a = b = c = 10`，三个名字指向同一个值。\n- **多重赋值（序列解包）**：`a, b = 1, 2`，右边元素个数必须与左边变量个数一致；`a, b = '12'` 合法（`a='1'`、`b='2'`），但 `a, b = '123'` 报错。\n- **交换两个变量**不需要临时变量：`a, b = b, a`。\n\n```python\na = b = c = 10             # 链式赋值\nx, y = 3, 5\nx, y = y, x                # 交换后 x=5，y=3\nm, n = '12'                # m='1'，n='2'\np, q = [1, 2, 3]           # 报错！个数不匹配\n```\n\n### 类型转换细节（最爱考）\n\n| 函数 | 作用 | 考点细节 |\n| --- | --- | --- |\n| `int(x)` | 转整数 | `int(3.9)` 得 `3`（**直接截断，不是四舍五入**）；`int('35')` 合法；**`int('3.5')` 报错 ValueError** |\n| `float(x)` | 转浮点 | `float('3.5')` 得 `3.5`；`float(3)` 得 `3.0` |\n| `str(x)` | 转字符串 | 任何类型都能转：`str(3.0)` 得 `'3.0'` |\n| `eval(s)` | 还原表达式 | `eval('3.5')` 得 `3.5`；`eval('1+2')` 得 `3` |\n| `round(x, n)` | 保留 n 位小数 | **五取偶**：`round(2.5)` 得 `2`，`round(3.5)` 得 `4` |\n| `bool(x)` | 转布尔 | `0`、`0.0`、`''`、`[]`、`None` 都是 `False`，其余为 `True` |\n\n```python\nprint(int(3.9))            # 3（丢掉小数部分）\nprint(int('35') + 1)       # 36\nprint(float('3.5') + 0.5)  # 4.0\nprint(str(3) + '5')        # '35'\nprint(round(3.14159, 2))   # 3.14\n```\n\n### 算术运算符与优先级\n\n| 运算符 | 含义 | 示例 | 注意 |\n| --- | --- | --- | --- |\n| `/` | 除 | `7/2` 得 `3.5`，`6/3` 得 **`2.0`** | 结果**永远是浮点数** |\n| `//` | 整除（向下取整） | `7//2` 得 `3`；`-7//2` 得 **`-4`** | 向数轴**负方向**取整 |\n| `%` | 取余 | `7%3` 得 `1`；`-7%3` 得 **`2`** | 余数符号**跟除数** |\n| `**` | 幂 | `2**3` 得 `8`；`2**0.5` 是平方根 | **右结合**：`2**3**2` 得 `512` |\n| `*`、`+` | 乘、加 | `'ab' * 3` 得 `'ababab'` | 字符串可重复、拼接 |\n\n- 优先级从高到低：`()` → `**` → 一元 `+/-` → `* / // %` → 二元 `+ -` → 比较运算 → `not` → `and` → `or`；记不清就加括号。\n- **`-3**2 = -(3**2) = -9`，`(-3)**2 = 9`**——幂的优先级高于负号，选择题高频。\n- 不同数值类型混合运算**自动向精度高的类型转换**：int 与 float 运算得 float，再与 complex 运算得 complex。\n\n```python\nprint(6 / 3)        # 2.0\nprint(-7 // 2)      # -4\nprint(-7 % 3)       # 2\nprint(-3 ** 2)      # -9\nprint((-3) ** 2)    # 9\nprint(3 + 2.0)      # 5.0（int 自动转 float）\n```\n\n### 比较与逻辑运算：and/or 的返回值\n\n- 比较运算的结果是布尔值，还可以**连写**：`1 < x <= 10` 等价于 `1 < x and x <= 10`。\n- 字符串比较按 Unicode 编码逐位进行：`'abc' < 'abd'` 为 True，`'9' > '100'` 也为 True（逐位比 `'9' > '1'`）。\n- 逻辑运算优先级：`not` > `and` > `or`。\n- **`and`/`or` 返回的是操作数本身，不一定是布尔值**：\n  - `a and b`：a 为假则返回 a（**短路**，b 不再计算）；a 为真则返回 b；\n  - `a or b`：a 为真则返回 a（**短路**）；a 为假则返回 b；\n  - `not` 一定返回 True/False。\n\n```python\nprint(3 and 5)      # 5（都真返回后一个）\nprint(0 and 5)      # 0（短路，直接返回假值）\nprint(3 or 5)       # 3（都真返回前一个）\nprint(0 or 5)       # 5\nprint(not 3)        # False\nprint(3 > 2 == 1)   # False（等价 3>2 and 2==1）\n```\n\n### 必背清单\n\n- 标识符规则：字母/数字/下划线/中文，**不以数字开头**、不与关键字重名、区分大小写。\n- `input()` 返回字符串；`print(sep=分隔符, end=结尾符)`；`eval()` 去引号求值。\n- 六大类型：int、float、complex、str、bool、None；`type()` 查类型；`True/False/None` 首字母大写。\n- `int('3.5')` 报错；`int(3.9)` 截断为 3；`round(2.5)` 得 2、`round(3.5)` 得 4。\n- `6/3` 得 `2.0`；`7//2=3`、`-7//2=-4`；`-7%3=2`；`-3**2=-9`、`(-3)**2=9`、幂右结合。\n- `and` 返回第一个假值或最后一个真值；`or` 返回第一个真值；两者都可能短路。\n- 优先级：`**` > `* / // %` > `+ -` > 比较 > `not` > `and` > `or`。\n- 链式赋值 `a = b = c = 1`；解包赋值 `a, b = 1, 2`；交换 `a, b = b, a`。\n\n### 易错点\n\n- `input()` 拿到的永远是字符串，参与算术运算前必须 `int()`/`float()`/`eval()` 转换。\n- `int('3.5')` 直接报错；含小数点的字符串要先 `float()` 再 `int()`。\n- `/` 的结果一定是浮点数，`6/3` 是 `2.0` 而不是 `2`。\n- `-7//2` 是 `-4` 不是 `-3`（整除向负无穷方向取整）。\n- `-7%3` 是 `2` 不是 `-1`（余数的符号跟除数一致）。\n- `-3**2` 等于 `-9`：幂运算优先级高于负号，想算负数的平方要写 `(-3)**2`。\n- `true`、`false`、`none` 全是错的，必须写 `True`、`False`、`None`。\n- `'a' and 'b'` 的结果是 `'b'` 而不是 True——`and/or` 返回操作数，只有 `not` 保证返回布尔值。\n- `0.1 + 0.2 == 0.3` 为 False，浮点数不能直接用 `==` 判等。\n- 同一缩进块混用 Tab 和空格会报 IndentationError，缩进错误也是语法错误。\n",
  "2": "控制流程是**程序填空题和改错题的主干**：几乎每道大题都是\"输入 → 分支判断 → 循环处理 → 按格式输出\"的骨架，本关的 `range()`、`break/continue`、双层循环缩进是最常见的设错点。本关末尾的经典算法小抄（素数、水仙花数、斐波那契、辗转相除等）务必练到能默写。\n\n### 三种基本结构\n\n- **顺序结构**：语句从上到下依次执行；**分支（选择）结构**：按条件走不同路线；**循环结构**：让某段代码重复执行。\n- 任何算法都由这三种结构组合而成，选择题常考结构识别与流程图对应。\n- Python 靠**缩进**表达\"谁属于谁\"，不用花括号。\n\n```python\nn = int(input())            # 顺序\nif n % 2 == 0:              # 分支\n    print('偶数')\nelse:\n    print('奇数')\n```\n\n### if / elif / else 与嵌套\n\n- 单分支 `if 条件:`；双分支 `if...else`；多分支 `if...elif...else`，**从上往下依次判断，命中一个分支后其余全部跳过**。\n- 条件后必须有冒号 `:`；`else` 与**同缩进的 if** 配对，嵌套分支靠缩进区分层次。\n- 条件表达式（三元运算）：`变量 = 值1 if 条件 else 值2`。\n- 条件可以是任何对象：**非零数值、非空字符串/列表都算 True**，`0`、`''`、`[]`、`None` 都算 False。\n\n```python\nscore = int(input())\nif score >= 90:\n    grade = '优秀'\nelif score >= 80:\n    grade = '良好'\nelif score >= 60:\n    grade = '及格'\nelse:\n    grade = '不及格'\nprint(grade)\nprint('及格' if score >= 60 else '不及格')   # 三元表达式\n```\n\n### while 循环\n\n- `while 条件:` 适合**循环次数不确定**的场合；循环体内必须有让条件趋向结束的语句，否则死循环。\n- 万能套路 `while True:` + `if 结束条件: break`——\"不断读输入直到空行\"的标准写法（填空题高频）。\n\n```python\ni, s = 1, 0\nwhile i <= 100:        # 1 加到 100\n    s += i\n    i += 1             # 忘了这行就是死循环\nprint(s)               # 5050\n\nwhile True:            # 持续读入，空行结束\n    line = input()\n    if line == '':\n        break\n    print('你输入了', line)\n```\n\n### for 与 range() 三参数\n\n- `for 变量 in 序列:` 依次取出序列中的每个元素；配 `range()` 实现指定次数循环。\n- **`range(start, stop, step)` 含头不含尾**，step 省略默认 1，可为负。\n\n| 写法 | 生成的序列 |\n| --- | --- |\n| `range(5)` | 0, 1, 2, 3, 4 |\n| `range(1, 6)` | 1, 2, 3, 4, 5 |\n| `range(1, 10, 2)` | 1, 3, 5, 7, 9 |\n| `range(10, 0, -1)` | 10, 9, 8, ..., 1 |\n| `range(10, 0)` | 空！步长为正却往小走，循环体一次都不执行 |\n\n- `range()` 本身不是列表，`list(range(5))` 才得到 `[0, 1, 2, 3, 4]`。\n- 直接遍历字符串：`for ch in 'Python':`。\n\n```python\ntotal = 0\nfor i in range(1, 101):    # i 取 1..100\n    total += i\nprint(total)               # 5050\nfor ch in 'Python':\n    print(ch, end=' ')     # P y t h o n\n```\n\n### break、continue 与 for-else\n\n- `break`：**立即跳出本层整个循环**；`continue`：**跳过本次剩余语句，直接进入下一次循环**。\n- 两者只对**所在那一层**循环生效，多层嵌套时外层不受影响。\n- `for...else` / `while...else`：循环**没有被 break 打断**、正常跑完时执行 `else` 块——查找、判素数的惯用法。\n\n```python\nfor i in range(5):\n    if i == 3:\n        break\n    print(i, end=' ')      # 0 1 2（3 及以后全没了）\nprint()\nfor i in range(5):\n    if i == 3:\n        continue\n    print(i, end=' ')      # 0 1 2 4（只跳过 3）\nprint()\nfor n in [2, 4, 6, 8]:\n    if n % 2 == 1:\n        break\nelse:\n    print('没有奇数')       # 循环没被 break，else 执行\n```\n\n### 循环嵌套：乘法表与图形打印\n\n- 外层控制**行**、内层控制**列**；外层执行 1 次，内层完整执行一遍。\n- 固定搭配：内层用 `print(x, end='')` 控制不换行，外层循环末尾用 `print()` 换行。\n\n```python\n# 九九乘法表（下三角）\nfor i in range(1, 10):\n    for j in range(1, i + 1):\n        print('{}*{}={}\\t'.format(i, j, i * j), end='')\n    print()\n\n# 星号金字塔：4 行\nn = 4\nfor i in range(1, n + 1):\n    print(' ' * (n - i) + '*' * (2 * i - 1))\n```\n\n### try-except 异常处理【知道】\n\n- 把可能出错的语句放进 `try`，一旦出错程序**不崩溃**，转去执行类型匹配的 `except`；可以写多个 except；`finally` 中的语句**无论是否出错都执行**。\n- 要认识常见异常名：`ZeroDivisionError` 除零、`ValueError` 类型转换失败、`IndexError` 下标越界、`NameError` 变量未定义、`TypeError` 类型错误。\n\n```python\ntry:\n    a = int(input())\n    print(10 / a)\nexcept ZeroDivisionError:\n    print('除数不能为0')\nexcept ValueError:\n    print('输入的不是整数')\nfinally:\n    print('程序结束')\n```\n\n### 经典算法小抄（必须练到默写）\n\n**素数判断**（试除 + for-else，只需试除到平方根）：\n\n```python\nn = int(input())\nfor i in range(2, int(n ** 0.5) + 1):\n    if n % i == 0:\n        print(n, '不是素数')\n        break\nelse:\n    print(n, '是素数')\n```\n\n**水仙花数**（三位数，各位数字立方和等于自身；取位套路通用）：\n\n```python\nfor n in range(100, 1000):\n    a = n // 100          # 百位\n    b = n // 10 % 10      # 十位\n    c = n % 10            # 个位\n    if a ** 3 + b ** 3 + c ** 3 == n:\n        print(n)          # 153 370 371 407\n```\n\n**斐波那契数列**（1 1 2 3 5 8...，双变量同时更新是核心）：\n\n```python\na, b = 1, 1\nfor i in range(20):\n    print(a, end=' ')\n    a, b = b, a + b\n```\n\n**辗转相除求最大公约数**（最小公倍数 = 两数之积 ÷ 最大公约数）：\n\n```python\nm, n = int(input()), int(input())\na, b = m, n\nwhile b != 0:\n    a, b = b, a % b       # 余数不为 0 就继续除\nprint('最大公约数', a, '最小公倍数', m * n // a)\n```\n\n**累加、累乘、计数与最值**（初始化是关键）：\n\n```python\nnums = [3, 7, 2, 9, 4]\ns, t, cnt = 0, 1, 0        # 累加器 0 / 累乘器 1 / 计数器 0\nmx = nums[0]               # 求最值用第一个元素初始化\nfor x in nums:\n    s += x                 # 累加\n    t *= x                 # 累乘\n    if x > mx:             # 打擂台求最大\n        mx = x\n    if x % 2 == 0:         # 满足条件才计数\n        cnt += 1\nprint(s, t, cnt, mx)       # 25 1512 2 9\n```\n\n### 必背清单\n\n- `range(start, stop, step)` 含头不含尾；`range(1,10,2)`、`range(10,0,-1)`、`range(10,0)` 的结果。\n- `while True:` + `if ...: break` 读输入到空行的模板。\n- 九九乘法表双层循环：内层 `end=''`，外层末尾 `print()`。\n- 素数判断：试除 2 到 `int(n**0.5)+1`，配 for-else 或标志变量。\n- 水仙花数取位：`n//100`、`n//10%10`、`n%10`。\n- 斐波那契：`a, b = 1, 1` 与 `a, b = b, a + b`。\n- 辗转相除：`while b != 0: a, b = b, a % b`，最小公倍数 `m*n//a`。\n- 初始化：累加器 `0`、累乘器 `1`、计数器 `0`、最值用首元素。\n\n### 易错点\n\n- `range(1, 10)` 不包含 10，只有 1 到 9。\n- 倒序必须写负步长 `range(10, 0, -1)`；`range(10, 0)` 是空序列，循环体一次都不执行。\n- `break` 只跳出**当前这一层**循环，嵌套时外层循环继续。\n- `continue` 只是跳过本次，循环变量照常更新，不会造成死循环。\n- `for-else` 的 `else` 在循环**未被 break 打断**时执行，与循环体里有没有 if 无关。\n- `while` 循环忘了更新循环变量（如 `i += 1`）就是死循环。\n- `else` 与哪个 `if` 配对完全由缩进决定，缩进错位逻辑全变。\n- 从 `input()` 读到的数字参与比较或计算前忘了 `int()` 转换。\n- 1 和 0 都不是素数，2 是最小的素数；上面的素数模板默认 `n >= 2`。\n- 计数器、累加器必须在循环外初始化，累乘器初值是 1 不是 0。\n",
  "3": "组合数据类型是**选择题与编程大题的双向高频区**：字符串切片与方法、列表增删改排序、字典分类计数、集合去重，几乎每年必考其一。数据分析大题（读文件后 `split`、字典计数、排序输出）全部以本关语法为工具，方法记不牢，大题写不动。\n\n### 字符串：索引与切片\n\n- 索引从 **0** 开始，负索引 `-1` 是最后一个字符；取单个字符下标越界**报 IndexError，但切片越界不报错**，取到哪算哪。\n- 切片 `s[start:stop:step]`：**含头不含尾**；step 为负则反向取；`s[::-1]` 是反转字符串的固定写法。\n- 字符串是**不可变**序列：`s[0] = 'X'` 报 TypeError，一切\"修改\"都是生成新串。\n\n以 `s = 'Python'` 为例：\n\n| 表达式 | 结果 | 说明 |\n| --- | --- | --- |\n| `s[0]` / `s[-1]` | `'P'` / `'n'` | 正/负索引 |\n| `s[1:4]` | `'yth'` | 含头不含尾 |\n| `s[:3]` / `s[3:]` | `'Pyt'` / `'hon'` | 前 3 个 / 从 3 到末尾 |\n| `s[::-1]` | `'nohtyP'` | 反转 |\n| `s[::2]` | `'Pto'` | 步长 2 |\n| `s * 2` | `'PythonPython'` | 重复 |\n\n```python\ns = 'Python'\nprint(s[-3:])          # hon\nprint(s[::-1])         # nohtyP\nprint(s[1:5:2])        # yh\n```\n\n### 字符串方法速查表（12 个必会）\n\n| 方法 | 作用与返回 | 考点细节 |\n| --- | --- | --- |\n| `len(s)` | 长度（内建函数） | 空格也占 1 个字符 |\n| `s.find(sub)` | 首次出现的下标 | **找不到返回 -1** |\n| `s.index(sub)` | 同 find | 找不到**报错**（与 find 的区别） |\n| `s.count(sub)` | 子串出现次数 | |\n| `s.replace(old, new)` | 替换，返回**新串** | 原串不变，要接回变量 |\n| `s.split(sep)` | 切分成**列表** | 不传参按连续空白切 |\n| `s.join(列表)` | 用 s 连接列表元素 | 元素必须都是字符串 |\n| `s.strip()` | 去两端空白（含 `\\n`） | 读文件逐行处理必配 |\n| `s.upper()` / `s.lower()` | 转大写/小写 | 返回新串，原串不变 |\n| `s.startswith(t)` / `s.endswith(t)` | 判断前/后缀 | 返回布尔值 |\n| `s.isdigit()` / `s.isalpha()` | 是否全数字/全字母 | 常用于输入校验 |\n| `s.center(n)` / `ljust` / `rjust` | 按宽度对齐填充 | `'ab'.center(5,'*')` 得 `**ab*` |\n\n```python\ns = '  Hello World  '\nprint(s.strip().lower())                    # hello world\nprint('a,b,c'.split(','))                   # ['a', 'b', 'c']\nprint('-'.join(['2024', '09']))             # 2024-09\nprint('Python'.find('th'), 'Python'.find('z'))   # 2 -1\n```\n\n### 三种格式化：%、format 与 f-string\n\n| 需求 | % 法 | format 法 | f-string 法 |\n| --- | --- | --- | --- |\n| 代入值 | `'%s 是 %d 岁' % (name, age)` | `'{} 是 {} 岁'.format(name, age)` | `f'{name} 是 {age} 岁'` |\n| 保留 2 位小数 | `'%.2f' % x` | `'{:.2f}'.format(x)` | `f'{x:.2f}'` |\n| 宽度 5 右对齐 | `'%5d' % x` | `'{:5d}'.format(x)` | `f'{x:5d}'` |\n| 左对齐 | `'%-5d' % x` | `'{:<5}'.format(x)` | `f'{x:<5}'` |\n| 按位置取参数 | — | `'{1}{0}'.format(a, b)` | 直接写变量名 |\n\n- `%s` 对应字符串、`%d` 整数、`%f` 浮点；`{:.2f}` 冒号后是格式说明，也可写宽度如 `{:8.2f}`。\n- f-string 最简洁（近年真题常见），format 最通用；`{}` 个数与参数个数要一致。\n\n```python\npi = 3.14159\nprint('%.2f' % pi)                 # 3.14\nprint('{:.2f}'.format(pi))         # 3.14\nprint(f'{pi:.2f}')                 # 3.14\nprint('{0}*{1}={2}'.format(3, 4, 12))   # 3*4=12\n```\n\n### 列表：增删改查、排序与反转\n\n- 创建 `lst = [1, 2, 3]`；下标、切片规则与字符串相同；列表**可变**，可直接 `lst[i] = x` 改值。\n- 增：`append(x)` 尾部加**一个**元素；`insert(i, x)` 在位置 i 插入；`extend(t)`（或 `+`）把另一个列表**逐个并入**。\n- 删：`pop(i)` 弹出并**返回**该元素（缺省弹末尾）；`remove(x)` 删**第一个值为 x** 的元素；`del lst[i]`；`clear()` 清空。\n- 查：`x in lst`、`lst.index(x)`、`lst.count(x)`。\n- 排序反转：`lst.sort()` **原地排序、返回 None**；`sorted(lst)` 返回**新列表**、原表不变；`lst.reverse()` 原地反转，`lst[::-1]` 得反转副本；都支持 `reverse=True` 降序。\n- `key` 参数指定排序依据：`sort(key=len)` 按长度，`sort(key=lambda x: x[1])` 按第 2 项。\n\n```python\nlst = [3, 1, 4]\nlst.append(5)              # [3, 1, 4, 5]\nlst.insert(0, 9)           # [9, 3, 1, 4, 5]\nlst.extend([6, 7])         # [9, 3, 1, 4, 5, 6, 7]\nprint(lst.pop())           # 7（弹出末尾并返回）\nlst.remove(3)              # 删除第一个 3\nlst.sort(reverse=True)     # [9, 6, 5, 4, 1]\nwords = ['pear', 'fig', 'apple']\nprint(sorted(words, key=len))   # ['fig', 'pear', 'apple']，原列表不变\nprint([3, 1, 2].sort())    # None！sort() 返回 None\n```\n\n### 列表解析式、split/join 与 enumerate\n\n- 列表解析式：`[表达式 for 变量 in 序列 if 条件]`，一行生成列表，比循环简洁。\n- `enumerate(序列)`：同时给出**下标和值**：`for i, v in enumerate(lst):`。\n- `split` 把字符串切成**列表**、`join` 把列表拼成**字符串**——数据处理大题的黄金搭档。\n\n```python\nsq = [x * x for x in range(1, 11) if x % 2 == 0]\nprint(sq)                 # [4, 16, 36, 64, 100]\nfor i, ch in enumerate('abc'):\n    print(i, ch)          # 0 a / 1 b / 2 c\ncsv = '张三,90,85'\nparts = csv.split(',')    # ['张三', '90', '85']\nprint(','.join(parts))    # 张三,90,85\n```\n\n### 深浅复制：b = a、b = a[:] 与 copy()\n\n- `b = a`：**不复制**，只是别名，两个名字指向同一个列表，改一个另一个跟着变。\n- `b = a[:]`、`b = list(a)`、`b = a.copy()`：**浅复制**，新建了外层列表，对 b 顶层增删改不影响 a。\n- 嵌套列表的内层仍被共享，要彻底独立用 `copy.deepcopy(a)`。\n\n```python\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)                  # [1, 2, 3, 4] 跟着变了！\nc = a[:]                  # 等价 a.copy()\nc.append(5)\nprint(a)                  # [1, 2, 3, 4] 不受影响\n```\n\n### 元组：不可变序列\n\n- 创建 `t = (1, 2, 3)`；**只有一个元素必须写 `(5,)`**，`(5)` 只是整数 5；括号甚至可省：`t = 1, 2, 3`。\n- 元组**不可变**：不能增删改元素；但 `t.index(x)`、`t.count(x)`、索引切片、`len()` 都可用。\n- **解包**：`a, b = (1, 2)`；函数 `return a, b` 返回的其实就是元组。\n- 与列表互转：`list(t)`、`tuple(lst)`；元组不可变，**能作字典的键和集合的元素**。\n\n```python\nt = (5,)                  # 单元素元组，逗号不能省\nprint(type((5)))          # <class 'int'>，(5) 就是整数\nx, y = (3, 7)             # 解包\nprint(tuple([1, 2]), list((1, 2)))   # (1, 2) [1, 2]\n```\n\n### 字典与集合\n\n#### 字典：键值对\n\n- 创建：`d = {'a': 1}`，空字典 `d = {}`；**键必须不可变**（字符串、数字、元组可以，列表不行）且唯一，值任意。\n- 访问：`d['a']`（键不存在**报 KeyError**）；`d.get(k, 默认值)`（不存在返回默认值，**不报错**）。\n- 增改：`d[k] = v`（键存在则改，不存在则加）；删：`del d[k]`、`d.pop(k)`（返回对应的值）、`clear()`。\n- 遍历三视图：`d.keys()` 键、`d.values()` 值、`d.items()` 键值对，配 `for k, v in d.items():`；`k in d` 只判断键。\n\n**分类计数模板**（大题必备，配合读文件使用）：\n\n```python\ncounts = {}\nfor word in ['apple', 'egg', 'apple', 'egg', 'beef']:\n    counts[word] = counts.get(word, 0) + 1\nprint(counts)             # {'apple': 2, 'egg': 2, 'beef': 1}\nfor k, v in counts.items():\n    print(k, v)\n```\n\n#### 集合：无序不重复\n\n- 创建：`s = {1, 2, 3}`、`set('abc')`；**空集合必须写 `set()`**（`{}` 是空字典！）。\n- 自动去重：`set([1, 2, 2, 3])` 得 `{1, 2, 3}`——最常考的用法。\n- 运算：`a & b` 交集、`a | b` 并集、`a - b` 差集、`a ^ b` 对称差。\n- 无序、不支持下标；元素必须不可变；`add(x)` 添加、`remove(x)` 删除。\n\n```python\na = {1, 2, 3, 4}\nb = {3, 4, 5}\nprint(a & b, a | b, a - b)    # {3, 4} {1, 2, 3, 4, 5} {1, 2}\nprint(len(set('aabbcc')))     # 3（去重后计数）\n```\n\n### 必背清单\n\n- 切片 `s[a:b:c]` 含头不含尾；`s[::-1]` 反转；负索引 `-1` 是末字符；切片越界不报错。\n- 12 个字符串方法；`find` 找不到返回 -1、`index` 报错；`replace/upper/lower/strip` 返回新串。\n- 三种格式化各写一遍：`'%.2f' % x`、`'{:.2f}'.format(x)`、`f'{x:.2f}'`。\n- 列表增删：`append/insert/extend/pop/remove/del`；`sort()` 返回 None、`sorted()` 返回新列表；`key=` 与 `reverse=True`。\n- 列表解析式 `[x*2 for x in lst if 条件]`；`enumerate(lst)` 同时取下标和值。\n- `b = a` 是别名，`b = a[:]`（或 `a.copy()`）才是复制。\n- 单元素元组 `(5,)`；`list()` 与 `tuple()` 互转。\n- 分类计数：`d[k] = d.get(k, 0) + 1`；遍历 `for k, v in d.items():`。\n- `set()` 去重；`& | - ^` 交并差对称差；空集合必须 `set()`。\n\n### 易错点\n\n- 切片含头不含尾：`s[0:3]` 取不到 `s[3]`；但切片越界不报错，单下标越界才报 IndexError。\n- 字符串、元组不可变：`s[0]='a'` 报错；`replace`、`upper`、`strip` 都返回新串，必须接回变量才生效。\n- `lst.append([5,6])` 把整个列表当作一个元素塞进去，想逐个并入要用 `extend`。\n- `lst.sort()` 和 `lst.append()` 等**原地修改并返回 None**，写 `x = lst.sort()` 后 x 是 None；要新列表用 `sorted(lst)`。\n- `b = a` 不是复制，改 b 就是改 a；只有 `a[:]`、`a.copy()` 才新建外层列表。\n- 单元素元组必须写 `(5,)`，`(5)` 是整数；元组不能增删改元素。\n- 字典的键必须是不可变类型，列表不能作键；`d['x']` 键不存在报 KeyError，`d.get('x')` 返回 None。\n- `{}` 是空字典，空集合必须写 `set()`。\n- `join` 的列表元素必须全是字符串，`','.join([1, 2])` 报 TypeError。\n- `split()` 不传参按连续空白切并丢弃空串，与 `split(' ')` 的结果可能不同。\n",
  "4": "函数是\"死记语法\"与\"读懂程序\"的分水岭：选择题爱考**参数传递、作用域、返回值类型**，程序填空常给函数框架让你补全，编程大题要求把功能封装成函数。递归【理解】是二、三级难度的分界点，抓住\"基例 + 递归链条\"两要素就能读懂绝大多数真题。\n\n### 函数定义与 return\n\n- `def 函数名(参数):` 定义函数；**必须先定义后调用**，定义时不执行函数体，调用才执行。\n- `return` 立即结束函数并把值交回调用处；**没有 return 或只写 `return`，返回 None**。\n- `return a, b` 返回的是**一个元组** `(a, b)`，可用两个变量解包接收。\n- `print` 只负责显示，`return` 才是把结果交给调用方继续使用——两者不能混为一谈。\n\n```python\ndef min_max(nums):\n    return min(nums), max(nums)     # 返回元组\n\nlo, hi = min_max([3, 1, 4])\nprint(lo, hi)                        # 1 4\n\ndef say():\n    print('hi')                      # 没有 return\nx = say()\nprint(x)                             # None\n```\n\n### 四种参数：位置、默认、关键字、可变\n\n| 种类 | 写法 | 规则 |\n| --- | --- | --- |\n| 位置参数 | `f(3, 5)` | 实参按顺序一一对应形参 |\n| 默认参数 | `def f(x, n=2):` | **必须写在位置参数后面**；不传实参就用默认值 |\n| 关键字实参 | `f(n=3, x=2)` | 按\"形参名=值\"传，与顺序无关 |\n| 可变参数 | `def f(*args):` | 多余的**位置**实参收进一个**元组** |\n| 可变关键字参数 | `def f(**kwargs):` | 多余的**关键字**实参收进一个**字典** |\n\n- 混合定义的顺序固定：位置 → 默认 → `*args` → `**kwargs`。\n\n```python\ndef power(x, n=2, *args, **kwargs):\n    print(x, n, args, kwargs)\npower(3)                      # 3 2 () {}\npower(3, 4)                   # 3 4 () {}\npower(3, 4, 5, mode='fast')   # 3 4 (5,) {'mode': 'fast'}\n```\n\n### 作用域：局部与全局（LEGB）\n\n- 变量查找顺序 **L**ocal（函数内）→ **E**nclosing（外层函数）→ **G**lobal（模块级）→ **B**uilt-in（内建）。\n- 函数内**只读**全局变量可以直接用；但只要在函数内给它**赋过值**，它就成了局部变量（除非先声明 `global`）。\n- 想在函数内**修改**全局变量，必须在赋值前写 `global 变量名`。\n- 局部变量在函数调用结束后销毁，函数外部访问不到。\n\n```python\ncount = 0\ndef inc():\n    global count        # 不加这行报 UnboundLocalError\n    count += 1\ninc()\ninc()\nprint(count)            # 2\n\ndef demo():\n    x = 10              # 局部变量，函数结束即销毁\ndemo()\n# print(x)              # 报 NameError\n```\n\n### lambda 与 map / filter / sorted 三件套\n\n- `lambda 参数: 表达式`：匿名函数，**只能写一个表达式**，表达式的值就是返回值。\n- `map(f, 序列)`：对每个元素调用 f，返回**迭代器**（要 `list()` 才能看全内容）。\n- `filter(f, 序列)`：保留 f 返回**真值**的元素，同样返回迭代器。\n- `sorted(序列, key=f, reverse=True)`：按 f 的返回值排序——与 lambda 搭配是必考组合。\n\n```python\nf = lambda x: x * x\nprint(list(map(f, [1, 2, 3])))          # [1, 4, 9]\nprint(list(map(lambda x: x + 1, [1, 2])))    # [2, 3]\nprint(list(filter(lambda x: x % 2, range(10))))   # [1, 3, 5, 7, 9]\npairs = [('a', 3), ('b', 1)]\nprint(sorted(pairs, key=lambda p: p[1]))   # [('b', 1), ('a', 3)]\n```\n\n### 递归【理解】\n\n- 函数直接或间接调用自己；两个必备要素：**基例**（递归出口，能直接给出答案）+ **链条**（每层把问题缩小一步并向基例推进）。\n- 执行过程：调用时逐层压栈展开，**到达基例后逐层返回回代**。`fact(4)` 的展开：`4*fact(3)` → `4*(3*fact(2))` → `4*(3*(2*fact(1)))` → `4*(3*(2*1))` = 24。\n- 递归没有基例、或没有向基例推进，就会无限递归报 RecursionError。\n\n```python\ndef fact(n):\n    if n == 1:                # 基例：出口\n        return 1\n    return n * fact(n - 1)    # 链条：缩小问题\nprint(fact(4))                # 24\n\ndef fib(n):\n    if n == 1 or n == 2:\n        return 1\n    return fib(n - 1) + fib(n - 2)\nprint(fib(10))                # 55\n```\n\n汉诺塔（移动次数为 `2^n - 1`）：\n\n```python\nsteps = 0\ndef hanoi(n, a, b, c):        # 把 n 个盘从 a 借助 b 移到 c\n    global steps\n    if n == 1:\n        steps += 1            # 只剩 1 个盘直接移\n        return\n    hanoi(n - 1, a, c, b)     # 上面 n-1 个借助 c 移到 b\n    steps += 1                # 最大盘 a → c\n    hanoi(n - 1, b, a, c)     # n-1 个从 b 借助 a 移到 c\nhanoi(3, 'A', 'B', 'C')\nprint(steps)                  # 7\n```\n\n### 生成器与装饰器【知道】\n\n- **生成器**：函数体里出现 `yield`，它就是生成器函数；调用它**不执行函数体**，得到生成器对象，每次 `next()` 执行到下一个 `yield` 处暂停并给出值——惰性求值、按需产生。\n\n```python\ndef gen():\n    yield 1\n    yield 2\ng = gen()\nprint(next(g))            # 1\nprint(next(g))            # 2\nprint(list(gen()))        # [1, 2]\n```\n\n- **装饰器**：接收函数并返回新函数的函数；`@装饰器名` 相当于 `f = 装饰器(f)`，常用于计时、写日志等\"统一加功能\"的场景。\n\n```python\nimport time\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        t0 = time.time()\n        result = func(*args, **kwargs)\n        print('耗时', time.time() - t0)\n        return result\n    return wrapper\n\n@timer                    # 等价于 slow = timer(slow)\ndef slow():\n    time.sleep(0.1)\nslow()\n```\n\n### 模块化：import、from...import 与 __name__\n\n- `import 模块`：使用时要加前缀，如 `math.sqrt(2)`；不会与当前文件里的名字冲突。\n- `from 模块 import 名字`：直接写 `sqrt(2)`，但可能与自己定义的同名变量/函数**冲突覆盖**。\n- 别名：`import 模块 as 别名`（如 `import numpy as np`）、`from 模块 import 名字 as 别名`；`from 模块 import *` 导入全部名字（不推荐）。\n- `__name__ == '__main__'`：**直接运行**本文件时 `__name__` 为 `'__main__'`，if 内代码执行；**被别的文件 import** 时 `__name__` 是模块名，if 内代码不执行——\"既能当脚本又能当库\"的标准写法。\n- 第三方库安装：联网时 `pip install 库名`；无网络或需指定版本时用 **whl 文件**：`pip install 路径/文件名.whl`，装好后同样 import 使用。\n\n```python\n# mymath.py\ndef add(a, b):\n    return a + b\nif __name__ == '__main__':   # 只有直接运行 mymath.py 才打印\n    print(add(1, 2))\n\n# 其他文件中：import mymath 后\n# mymath.add(3, 4)           # 不会触发上面的 print\n```\n\n### 必背清单\n\n- `def` 定义、`return` 语义；无 return 返回 None；`return a, b` 返回元组。\n- 四种参数写法与混合顺序：位置 → 默认 → `*args`（收成元组）→ `**kwargs`（收成字典）。\n- `global` 声明后才能在函数内修改全局变量；LEGB 查找顺序。\n- `lambda 参数: 表达式`；`map`/`filter` 的结果要 `list()`；`sorted(序列, key=lambda x: x[1], reverse=True)`。\n- 递归两要素（基例 + 链条）；阶乘、斐波那契、汉诺塔模板。\n- 函数体含 `yield` 即生成器；`next()` 逐个取值。\n- `import 模块` 用 `模块.名字`，`from 模块 import 名字` 直接用；`__name__ == '__main__'` 的含义；`pip install 库名` / `pip install xxx.whl`。\n\n### 易错点\n\n- 函数必须**先定义后调用**；只定义不调用，函数体一行都不会执行。\n- 忘写 `return` 时函数返回 None，拿返回值继续运算会报 TypeError。\n- `print` 不是 `return`：打印了不等于返回了；`return` 之后的语句永远不会执行。\n- 默认参数不能写在位置参数前面，`def f(n=2, x)` 直接语法错误。\n- `*args` 收到的是**元组**、`**kwargs` 收到的是**字典**，别记反。\n- 函数内给全局变量赋值却忘了 `global`，报 UnboundLocalError。\n- lambda 里只能写表达式，不能写赋值语句和多行逻辑；分支要用条件表达式 `a if 条件 else b`。\n- `map`/`filter` 返回的是迭代器不是列表，直接 `print` 看不到元素，要 `list()` 转换。\n- 递归缺基例或缺推进就会无限递归；`fib` 每项重算，n 稍大就很慢（了解即可）。\n- `from 模块 import sqrt` 或 `import *` 可能覆盖自己定义的同名函数，导入的顺序决定谁生效。\n- 被 import 时 `__name__` 不是 `'__main__'`，测试代码要放进 `if __name__ == '__main__':` 里。\n",
  "5": "本关是**编程大题（75分）的主战场**。历年真题的编程大题几乎都围绕\"读文件 → 逐行处理 → 统计/筛选 → 按格式输出\"展开，本关的套路必须练到能默写。\n\n### 基本概念\n\n- **文本文件 vs 二进制文件**：文本文件按字符编码（UTF-8、GBK 等）存储，read 出来是字符串；二进制文件（图片、exe）按字节存储，要用 `'rb'/'wb'` 模式，读出的是 `bytes`。\n- **编码**：`encoding='utf-8'` 最常用；考试给中文数据文件时常明确说\"编码类型为 GBK\"，照题目要求写即可。Windows 下不写 encoding 参数时默认编码可能不是 UTF-8，是常见丢分点。\n- **文件路径**：考试中数据文件常放在 `C:/素材/` 下，题目会给定路径与文件名，写程序时照抄。\n\n### 打开与关闭：open()\n\n```python\nf = open('data.csv', 'r', encoding='utf-8')   # 打开\n...                                           # 处理\nf.close()                                     # 必须关闭\n```\n\n| 模式 | 含义 | 文件不存在 | 注意 |\n| --- | --- | --- | --- |\n| `'r'` | 只读（默认） | 报错 FileNotFoundError | 最常用 |\n| `'w'` | 写入 | 自动创建 | **清空原内容**！ |\n| `'a'` | 追加 | 自动创建 | 保留原内容，在末尾写 |\n| `'rb'/'wb'` | 二进制读写 | 同上 | 处理图片等 |\n\n推荐用 **with 语句**自动关闭，不需要写 close()：\n\n```python\nwith open('data.txt', 'r', encoding='utf-8') as f:\n    for line in f:\n        print(line, end='')\n```\n\n### 读取的三种方法\n\n| 方法 | 返回 | 典型用法 |\n| --- | --- | --- |\n| `f.read()` | 整个文件为**一个字符串**（可带参数 read(n) 读 n 个字符） | 小文件一次性读入 |\n| `f.readline()` | 每次一行的字符串（**末尾带 \\n**） | while 循环逐行 |\n| `f.readlines()` | 所有行组成的**列表**（每行末尾带 \\n） | 按行号处理、跳过标题行 |\n\n**最推荐的遍历方式**：直接 `for line in f:`，逐行迭代、内存友好。\n\n跳过标题行（CSV 数据文件常有标题行）的两种写法：\n\n```python\nf = open('data.csv', 'r', encoding='utf-8')\nnext(f)                    # 方法一：消费掉一行\nlines = f.readlines()      # 方法二：del lines[0]\ndel lines[0]\n```\n\n### 写入文件\n\n```python\nf = open('out.txt', 'w', encoding='utf-8')\nf.write('第一行\\n')        # write 不自动换行，\\n 要自己加\nf.writelines(['a\\n', 'b\\n'])  # 把字符串列表依次写入\nf.close()\n```\n\n### 指针定位\n\n- `f.tell()`：返回当前指针位置（字节）；`f.seek(offset, whence)`：移动指针，`whence` 0=文件开头（默认）、1=当前、2=文件尾。`seek(0)` 回到开头后可重新读取。\n\n### 数据分析标准套路（必须默写）\n\n**逐行处理 CSV 风格数据**（真题模板）：\n\n```python\nf = open('data.csv', 'r', encoding='utf-8')\nnext(f)                        # 跳过标题行\nn = int(input())               # 读入题目要求的阈值\ntotal = 0\nfor line in f:\n    parts = line.strip().split(',')   # 去掉行尾换行 → 按逗号切开\n    score = int(parts[2])             # 需要数值的列要类型转换\n    if score >= n:                    # 按条件筛选\n        total += 1\n        print(parts[0], score)\nf.close()\nprint('共{}本'.format(total))\n```\n\n**词频统计**（词云题、文本分析题的前置套路）：\n\n```python\ncounts = {}\nfor word in text.split():\n    counts[word] = counts.get(word, 0) + 1\nitems = sorted(counts.items(), key=lambda x: x[1], reverse=True)\nfor word, cnt in items[:10]:\n    print(word, cnt)\n```\n\n### 必背清单\n\n- `open(路径, 模式, encoding='utf-8')`、`f.close()`、`with open(...) as f`\n- 模式：`r` 读 / `w` 写(**清空**) / `a` 追加 / `rb`、`wb` 二进制\n- `read()` / `readline()` / `readlines()` 三者区别\n- `for line in f:` 逐行遍历；`next(f)` 跳标题行\n- `line.strip().split(',')` —— 每道数据处理大题的第一行处理\n- `f.seek(0)` 回到文件开头；`f.tell()` 当前位置\n- 词频三件套：`dict.get(k,0)+1`、`items()`、`sorted(..., key=lambda x: x[1], reverse=True)`\n\n### 易错点\n\n- **`'w'` 模式一打开就清空原文件**——要追加必须用 `'a'`。\n- `for line in f` 的每行**末尾带 `\\n`**：比较、转换前必须 `line.strip()` 或 `line.rstrip('\\n')`，否则 `int('1200\\n')` 报 ValueError。\n- 打开文件不写 `encoding`，遇到中文可能乱码或报错；题目指定 GBK 就写 `encoding='gbk'`。\n- `f.readlines()` 返回的列表直接下标访问时同样带 `\\n`。\n- 写文件忘加 `\\n`，所有内容挤成一行。\n- 数字列做大小比较前忘了 `int()` 转换，字符串比较 `'99' > '100'` 结果为 True。\n- 读到文件尾后继续 `readline()` 返回空字符串 `''`（不是报错），用 `while line != ''` 判断结束。",
  "6": "本关是选择题的**工具箱**：库的安装方式、`import` 三种写法、random/math/time/calendar 每年必考 2-4 道选择题；turtle 绘图是编程大题的热门素材（正方形、圆、五角星）；jieba/wordcloud/openpyxl/tkinter 属于【理解】层级，认识套路代码、能读懂会填空即可。\n\n### 库的安装与管理：pip、whl、setup.py\n\n- **标准库**（random、math、time、turtle、json 等）随 Python 一起安装，直接 `import` 就能用；**第三方库**（jieba、wordcloud、openpyxl 等）必须**先安装再 import**——`pip` 是 Python 的**包管理工具**，命令在**命令行（终端）执行**，不是在 IDLE 里：\n\n```python\npip install jieba              # 联网安装最新版\npip install jieba==0.42.1      # 安装指定版本\npip list                       # 查看已安装的第三方库\n```\n\n| 安装方式 | 命令 | 适用场景 |\n| --- | --- | --- |\n| pip 联网安装 | `pip install 库名` | 有网络时首选，最常用 |\n| whl 文件安装 | `pip install 文件名.whl` | **无网络**或 pip 联网失败：先下载对应 whl 文件再安装 |\n| 源码安装 | 进入源码包目录执行 `python setup.py install` | 只有源码包（内含 `setup.py`）时 |\n\n- 真题爱考**安装方式选择**：网络通畅用 `pip install 库名`；无法联网用已下载的 whl 文件；只有含 `setup.py` 的源码压缩包才执行 `python setup.py install`。\n\n### import 的三种方式\n\n| 写法 | 调用时 | 示例 |\n| --- | --- | --- |\n| `import random` | 必须带模块名前缀 | `random.randint(1, 10)` |\n| `from random import randint` | 直接用函数名，**不带前缀** | `randint(1, 10)` |\n| `import random as r` | 用别名 | `r.randint(1, 10)` |\n\n```python\nimport math\nfrom math import sqrt, pi\nprint(math.sqrt(16), sqrt(16), pi)   # 4.0 4.0 3.14159... —— 前者带前缀，后者不带\n```\n\n- `from 模块 import *` 导入模块所有公开成员（turtle、tkinter 教材惯用），使用时不带前缀；缺点是**容易覆盖自己定义的同名变量/函数**。\n\n### random：随机数五件套\n\n| 函数 | 作用 | 考点细节 |\n| --- | --- | --- |\n| `random.seed(n)` | 固定随机种子 | **种子相同，之后生成的随机序列完全相同（可复现）** |\n| `randint(a, b)` | 随机整数 | **双闭区间 [a, b]，两端都取得到** |\n| `random()` | 随机小数 | **左闭右开 [0, 1)，取不到 1** |\n| `choice(seq)` | 从序列随机取**一个**元素 | 字符串/列表/元组均可 |\n| `shuffle(lst)` | 把列表**原地打乱** | **返回 None**！结果就在原列表里 |\n| `sample(seq, k)` | 随机取 k 个组成**新列表** | 不重复取样，**原序列不变** |\n\n```python\nimport random\nrandom.seed(42)\nprint(random.randint(1, 10), random.randint(1, 10))   # 2 1\nrandom.seed(42)\nprint(random.randint(1, 10), random.randint(1, 10))   # 2 1 —— 种子相同，结果可复现\nls = [1, 2, 3, 4, 5]\nprint(random.shuffle(ls), ls)   # None [4, 5, 1, 2, 3] —— 原地打乱，返回 None\nprint(random.sample(ls, 2))     # [4, 3] —— 原列表不变\n```\n\n### math 与 calendar\n\n| math 成员 | 含义 | 考点细节 |\n| --- | --- | --- |\n| `math.floor(x)` | **向下**取整 | `floor(3.7)` 得 3；**`floor(-3.7)` 得 -4**（向数轴负方向）；返回 int |\n| `math.ceil(x)` | **向上**取整 | `ceil(3.7)` 得 4；**`ceil(-3.7)` 得 -3**；返回 int |\n| `math.sqrt(x)` | 算术平方根 | 返回**浮点数**：`sqrt(16)` 得 `4.0` |\n| `math.pi` | 圆周率 π | 3.141592653589793 |\n| `math.fabs(x)` | 绝对值 | **返回 float**：`fabs(-5)` 得 `5.0`，不支持复数；`abs()` 是内置函数，`abs(-5)` 得 `5`（int），还能对复数求模 `abs(3+4j)` 得 `5.0` |\n\n```python\nimport math\nprint(math.floor(-3.7), math.ceil(-3.7))   # -4 -3\nprint(math.fabs(-5), abs(-5))              # 5.0 5\n```\n\n- `calendar.isleap(year)` 判断闰年：**能被 4 整除但不能被 100 整除，或能被 400 整除**（4 年一闰、百年不闰、400 年再闰）。\n\n```python\nimport calendar\nprint(calendar.isleap(2024))   # True\nprint(calendar.isleap(1900))   # False —— 百年不闰\nprint(calendar.isleap(2000))   # True —— 400 年再闰\n```\n\n### time：时间处理三步走\n\n| 函数 | 作用 | 返回 |\n| --- | --- | --- |\n| `time.time()` | 当前**时间戳** | 浮点数：1970-1-1 0:0:0 至今的**秒数** |\n| `time.localtime()` | 当前时间的结构化对象 struct_time | 用 `.tm_year` 等字段取值 |\n| `time.strftime(格式, t)` | 结构化时间 → 指定格式**字符串** | 字符串 |\n| `time.sleep(s)` | 程序**暂停 s 秒** | 无 |\n\n- **strftime 常用格式符（必背）**：`%Y` 年（4 位）、`%m` 月、`%d` 日、`%H` 时（24 小时制）、`%M` 分、`%S` 秒。\n\n```python\nimport time\nt = time.localtime()\nprint(t.tm_year, t.tm_mon, t.tm_mday)          # 2026 9 25\nprint(time.strftime('%Y-%m-%d %H:%M:%S', t))   # 2026-09-25 11:35:28\n```\n\n### turtle 绘图（大题热门）\n\n- 导入惯用 `from turtle import *`，所有函数**不带前缀**直接调用。\n\n| 分类 | 函数 | 说明 |\n| --- | --- | --- |\n| 画笔状态 | `penup()` / `pendown()` | 提笔（移动不留痕）/ 落笔 |\n| 前进后退 | `forward(d)`、`backward(d)` | 沿当前方向移动 d 像素 |\n| 转向 | `left(angle)`、`right(angle)` | **left 逆时针、right 顺时针**，单位度 |\n| 跳转 | `goto(x, y)` | 直接移动到坐标 (x, y) |\n| 画圆弧 | `circle(radius, extent)` | radius>0 时圆心在**前进方向左侧**；extent 是**弧角度**，省略画整圆 |\n| 颜色填充 | `color('red')` | 同时设画笔与填充色，只设画笔用 `pencolor()`；`begin_fill()` 与 `end_fill()` 之间的封闭图形被填充 |\n| 写字 | `write('文字', font=('Arial', 16))` | 在画笔当前位置写字 |\n| 收尾 | `done()` | **保持绘图窗口不关闭** |\n\n**三个必会模板**：\n\n```python\nfrom turtle import *\n\n# 模板一：正方形（边长 100）\nfor i in range(4):\n    forward(100)\n    left(90)              # 外角 = 360/4\n\n# 模板二：圆（半径 80）\ncircle(80)                # 圆心在前进方向左侧 80 像素处\n\n# 模板三：五角星\ncolor('red')\nfor i in range(5):\n    forward(200)\n    right(144)            # 画五角星固定转 144°\ndone()                    # 最后保持窗口\n```\n\n### 第三方库速览【理解即可】\n\n```python\n# —— jieba 分词 + 词频统计（常与 L5 词频套路连考）——\nimport jieba\nwords = jieba.lcut(text)          # 精确模式分词，返回列表\ncounts = {}\nfor w in words:\n    if len(w) > 1:                # 常见过滤：跳过单字\n        counts[w] = counts.get(w, 0) + 1\n```\n\n```python\n# —— wordcloud 词云三步：建对象 → generate(文本) → to_file(文件名) ——\n# 中文必须指定 font_path，否则显示方块；generate 参数是空格分隔的字符串\nfrom wordcloud import WordCloud\nwc = WordCloud(font_path='msyh.ttc', width=800, height=600, background_color='white')\nwc.generate(' '.join(words))\nwc.to_file('wordcloud.png')\n```\n\n```python\n# —— openpyxl 读写 Excel ——\nfrom openpyxl import load_workbook\nwb = load_workbook('成绩.xlsx')\nws = wb.active                      # 当前工作表（或 wb['Sheet1']）\nv = ws.cell(row=2, column=1).value  # 读：第 2 行第 1 列单元格的值\nws.cell(row=2, column=2, value=95)  # 写：直接给 value 参数赋值\nwb.save('成绩.xlsx')                # 改完必须 save，否则白改\n```\n\n```python\n# —— Pillow（PIL）图像 ——\nfrom PIL import Image\nim = Image.open('photo.jpg')\nprint(im.size)                      # (宽, 高) 元组\nim.save('photo.png')                # 换扩展名即转换格式\n```\n\n### tkinter 图形界面【理解】\n\n```python\nimport tkinter as tk\nroot = tk.Tk()                      # 主窗口\nroot.title('报名系统')               # 窗口标题；root.geometry('300x200') 可设宽x高（小写字母 x）\ntk.Label(root, text='姓名：').pack()               # 标签\nentry = tk.Entry(root)                            # 单行输入框\nentry.pack()\ntext = tk.Text(root)                              # 多行文本框\ntext.pack()\ntk.Radiobutton(root, text='男', value=1).pack()   # 单选按钮\ntk.Checkbutton(root, text='已阅').pack()          # 复选框\n\ndef on_click():\n    text.insert('end', entry.get())\n\ntk.Button(root, text='提交', command=on_click).pack()   # command=函数名，不加括号！\nroot.mainloop()                     # 消息循环，必须是最后一行；布局可用 pack() 或 grid(row=, column=)\n```\n\n### 必背清单\n\n- 安装三方式：`pip install 库名`（联网）、`pip install xxx.whl`（离线 whl）、`python setup.py install`（源码包）；`pip list` 查看已装库。\n- import 三写法：`import m` → `m.f()`；`from m import f` → `f()`；`import m as x` → `x.f()`；`from m import *` 不带前缀但易冲突。\n- random：`seed()` 固定后可复现；**`randint(a,b)` 双闭区间**；`random()` 是 [0,1)；`choice(seq)` 取一个；**`shuffle(lst)` 原地打乱返回 None**；`sample(seq,k)` 取 k 个不重复。\n- math：`floor` 向下、`ceil` 向上（**负数：`floor(-3.7)=-4`、`ceil(-3.7)=-3`**）；`sqrt` 返回 float；`pi`；`fabs` 返回 float，`abs` 是内置函数且支持复数。\n- time：`time()` 时间戳（秒，float）；`localtime()` 返回 struct_time（字段 `tm_year/tm_mon/tm_mday/tm_hour/tm_min/tm_sec`）；`strftime('%Y-%m-%d %H:%M:%S', t)`；`sleep(s)`。\n- `calendar.isleap(年)`：被 4 整除且不被 100 整除，或被 400 整除。\n- turtle：`penup/pendown`、`forward/backward`、`left/right`、`goto`、`circle(radius, extent)`、`color/pencolor`、`write`、`done()`；正方形 `forward(100)+left(90)` 循环 4 次；五角星 `forward+right(144)` 循环 5 次。\n- 第三方套路：`jieba.lcut(s)` 分词；`WordCloud(font_path=…).generate(文本).to_file(图片)`；`load_workbook` → `ws.cell(row,col).value` → `wb.save()`；`Image.open` → `im.size` → `im.save()`。\n- tkinter：`Tk()` 主窗口，控件 `Label/Button/Entry/Text/Radiobutton/Checkbutton`，布局 `pack()/grid(row=,column=)`，`command=函数名` 绑定回调，最后 `mainloop()`。\n\n### 易错点\n\n- `random.shuffle(ls)` **返回 None**：写 `ls = random.shuffle(ls)` 会把列表变成 None！正确做法是 shuffle 后直接用 `ls`。\n- `random.randint(a, b)` **两端都取得到**；`random.random()` **取不到 1**（区间 [0, 1)）。\n- `math.fabs(-5)` 是 `5.0`（float），`abs(-5)` 才是 `5`（int）；abs 是内置函数，不在 math 里。`floor` 向**负无穷**取整：`floor(-3.7)` 是 -4 不是 -3；`ceil(-3.7)` 是 -3 不是 -4。\n- `strftime` 里 **`%m` 是月份、`%M` 是分钟**，大小写别混；格式串中普通字符（`-`、`:`）原样输出。\n- `time.localtime()` 取字段用 `.tm_year`，不能写 `.year`；`time.time()` 返回浮点秒数，不是字符串。\n- turtle 的 `circle(80)` 是半径 80、圆心在画笔左侧的圆，**不是向前画 80 像素**；五角星转 **144°** 不是 72°（转 72° 画出的是正五边形）；画完记得 `done()`。\n- tkinter 的 `command=on_click` **不能加括号**——加括号是\"立刻调用一次\"；漏写 `mainloop()` 窗口一闪而过；`geometry('300x200')` 中间是小写 x。\n- wordcloud 处理中文不指定 `font_path` 会显示成方块；`generate()` 的参数是**字符串**（分词后要 `' '.join(words)`），传列表会报错。\n- openpyxl 修改后忘记 `wb.save()`，文件不会更新；行列从 **1** 开始数（不是 0）。\n",
  "7": "本关是**冲刺三级的最后一公里**。三级与二级**同卷考试、按总分划档**：试卷完全一样，你的总分达到三级合格线/优秀线就直接认定三级——不存在单独的\"三级卷\"，所以本关的定位是**在二级全部能力之上再拉开一档的增量域**。增量内容为：**正则表达式 re、SQLite 数据库、面向对象（类/继承/多态）、JSON 与 API（RESTful/Flask/FastAPI）、matplotlib 数据可视化**（递归在 L4 已学，本关不再重复）。其中正则与面向对象是编程大题热点（官方模拟卷的文本分析大题就是正则提取网页），SQLite、JSON、matplotlib 主要以选择题和填空题形式出现，属于【理解】层级。想稳过三级，本关必须按编程大题实战标准练熟正则与面向对象，其余考点会认、会补全。\n\n### 正则表达式：元字符与分组\n\n正则表达式用**一串符号描述文本模式**，`import re` 后使用。元字符速查表（选择题每年必考）：\n\n| 元字符 | 含义 | 记忆锚点 |\n| --- | --- | --- |\n| `.` | 任意一个字符（**`\\n` 除外**） | 点=占一个位 |\n| `\\d` / `\\D` | 一个数字 / 一个非数字 | digit |\n| `\\w` / `\\W` | 字母、数字、下划线（含中文）/ 非之 | word |\n| `\\s` / `\\S` | 一个空白（空格、`\\t`、`\\n`）/ 非空白 | space |\n| `[abc]` | a、b、c 中任意**一个** | 字符集 |\n| `[^abc]` | **除** a、b、c 以外的任意一个字符 | 集合内 `^` = 取反 |\n| `[a-z0-9]` | 小写字母或数字 | 范围写法 |\n| `*` | 前面内容重复 **0 次或多次** | 可以没有 |\n| `+` | 重复 **1 次或多次** | 至少一次 |\n| `?` | 重复 **0 次或 1 次**；跟在 `*`/`+` 后变**非贪婪** | 可有可无 |\n| `{m,n}` | 重复 m 到 n 次；`{9}` 恰好 9 次 | 精确次数 |\n| `^` / `$` | 字符串的开头 / 结尾 | 锚点 |\n| `\\|` | 或，匹配左边或右边 | 分支 |\n| `(...)` | **分组**，提取时单独返回 | 组 |\n\n**高频模式**（手机号、日期、邮箱——要求默写）：\n\n```python\nr'1[35789]\\d{9}'          # 手机号：1 开头 + 第二位限定 3/5/7/8/9 + 再 9 位数字，共 11 位\nr'\\d{4}-\\d{2}-\\d{2}'      # 日期，如 2026-09-25\nr'[\\w.]+@[\\w.]+\\.\\w+'     # 邮箱，如 zhang@163.com\n```\n\n**分组提取**：模式里写 `(...)`，匹配成功后用 `m.group(1)`、`m.group(2)` 依次取组；`m.group()` 或 `m.group(0)` 是**整体匹配**。\n\n```python\nimport re\nm = re.search(r'(\\d{4})-(\\d{2})-(\\d{2})', '发布于 2026-09-25')\nprint(m.group(0))   # 2026-09-25   整体\nprint(m.group(1))   # 2026         第 1 组\nprint(m.group(2))   # 09           第 2 组\n```\n\n**`findall` 的三种返回形态**（选择、填空高频坑）：\n\n- 模式**无分组**：返回所有匹配串组成的**字符串列表**，`re.findall(r'\\d+', 'a1b22')` → `['1', '22']`\n- 模式有 **1 个分组**：返回**各组内容**组成的列表（不是整个匹配！），`re.findall(r'(\\d+)分', '语文90分,数学85分')` → `['90', '85']`\n- 模式有 **2 个及以上分组**：返回**元组的列表**，每个元组是同一处的各个组，如 `re.findall(r'(\\w)(\\d+)', 'a1b22c333')` → `[('a', '1'), ('b', '22'), ('c', '333')]`\n\n### re 四大函数实战\n\n| 函数 | 作用 | 返回 | 关键差别 |\n| --- | --- | --- | --- |\n| `re.match(p, s)` | 从字符串**开头**匹配 | Match 对象或 **None** | 开头不符直接失败 |\n| `re.search(p, s)` | 扫描**全串**找第一处 | Match 对象或 **None** | 只返回第一处 |\n| `re.findall(p, s)` | 找出**所有**匹配 | **列表**（形态见上） | 提取数据最常用 |\n| `re.sub(p, repl, s)` | 把匹配处替换为 repl | 替换后的**新字符串** | 高级版 replace |\n\n配套：`m.group(n)` 取第 n 组；`re.split(r'[,;]', 'a,b;c')` → `['a', 'b', 'c']` 按模式切分；模式反复使用可先 `p = re.compile(r'...')`，再 `p.findall(s)`。\n\n**真题级例子 1：提取手机号**（findall，无分组）：\n\n```python\nimport re\ns = '联系人:张三 13812345678,李四 15987654321,备用 12345678901'\nprint(re.findall(r'1[35789]\\d{9}', s))\n# ['13812345678', '15987654321']  注意 12345678901 第二位是 2，不匹配\n```\n\n**真题级例子 2：验证输入格式**（match 从头匹配 + `$` 锚定结尾）：\n\n```python\ntel = input()\nif re.match(r'1[35789]\\d{9}$', tel):\n    print('手机号合法')\nelse:\n    print('格式错误')\n```\n\n**真题级例子 3：从日志提取时间与级别**（findall 双分组 → 元组列表）：\n\n```python\nlog = '''2026-09-25 10:21:33 ERROR 数据库连接超时\n2026-09-25 10:22:01 INFO 服务重启完成'''\npairs = re.findall(r'(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) (\\w+)', log)\nfor t, lv in pairs:\n    print(t, lv)    # 2026-09-25 10:21:33 ERROR\n```\n\n替换例子：`re.sub(r'\\d+', '*', '订单号12345,金额678')` → `'订单号*,金额*'`。\n\n### 贪婪与非贪婪 + 网页提取实战\n\n`*` 和 `+` 默认**贪婪**：尽量多吃字符；后面加 `?` 变**非贪婪**：尽量少吃。HTML 提取必须用非贪婪，否则一个标签会把多个标签吞进去。\n\n```python\nprint(re.findall(r'<(.*)>', '<a><b>'))    # ['a><b']  贪婪：从第一个 < 吃到最后一个 >\nprint(re.findall(r'<(.*?)>', '<a><b>'))   # ['a', 'b'] 非贪婪：碰到第一个 > 就停\n```\n\n**完整真题范例**（官方模拟卷文本分析题原型：从 huaqiang.html 提取产品与网址）。页面相关行形如 `<li title=\" 通孔电阻 \">    <a href=\"//search.ickey.cn/cate-search?cate_id=010101\" ...>`。要求：提取产品名与网址，**网址补上 `https:` 协议头**（页面里是 `//` 开头），**产品名去掉首尾空格**，写入 CSV（GBK 编码，首行 `产品,网址`）并逐行输出\"产品 网址\"。\n\n```python\nimport re\nhtml = open('huaqiang.html', encoding='utf-8').read()\n# 双分组：[^\" ]+ 匹配不含引号和空格的产品名；\\s* 吃掉标签之间的空白\npairs = re.findall(r'title=\" ?([^\" ]+?) ?\">\\s*<a href=\"([^\"]+)\"', html)\nf = open('huaqiang.csv', 'w', encoding='gbk')     # 题目要求 GBK 编码\nf.write('产品,网址\\n')\nfor name, url in pairs:\n    if url.startswith('//'):\n        url = 'https:' + url                      # 补协议头\n    f.write(name + ',' + url + '\\n')\n    print(name, url)      # 通孔电阻 https://search.ickey.cn/cate-search?cate_id=010101\nf.close()\n```\n\n**套路总结**：读入整个文件 → `findall` 双分组得元组列表 → 循环解包并清洗 → 写文件 + print。这条链在三级文本分析大题反复出现，建议整段默写。\n\n### 面向对象：类与实例\n\n面向对象三大特性：**封装（类与实例）、继承、多态**。大题常给一段文字描述或类图，让你编写类、补全方法或用类产生对象完成计算。\n\n**四个关键词**：\n\n- `class 类名:` —— 类名用**大驼峰**（Student、BankAccount）\n- `__init__(self, ...)` —— **构造方法**，创建实例时**自动调用**，负责初始化属性；第一个参数固定写 `self`\n- `self` —— 当前实例本身；**实例属性必须写成 `self.属性名`**，方法第一个参数必须写 `self`\n- 调用绑定：`对象.属性` 取值、`对象.方法(实参)` 调方法 —— 用点号调用时 **self 自动传入，不手动给**\n\n**模板 1：学生类**（最简结构，默写）：\n\n```python\nclass Student:\n    def __init__(self, name, score):\n        self.name = name              # 实例属性\n        self.score = score\n    def show(self):                   # 实例方法\n        print('{}的分数是{}'.format(self.name, self.score))\n    def is_pass(self):\n        return self.score >= 60\ns1 = Student('张三', 85)              # 创建实例，自动执行 __init__\ns1.show()                             # 张三的分数是85（调用时不传 self）\nprint(s1.name, s1.is_pass())          # 张三 True\n```\n\n**模板 2：银行账户类**（带默认参数与业务判断，大题常考）：\n\n```python\nclass Account:\n    def __init__(self, owner, balance=0):    # balance 带默认值\n        self.owner = owner\n        self.balance = balance\n    def deposit(self, money):                # 存款\n        self.balance += money\n        return self.balance\n    def withdraw(self, money):               # 取款：先判断余额\n        if money > self.balance:\n            print('余额不足')\n            return\n        self.balance -= money\n        return self.balance\nacc = Account('王五', 100)\nacc.deposit(50)                              # 余额变 150\nprint(acc.withdraw(200))                     # 余额不足（返回 None）\nprint(acc.withdraw(80))                      # 70\n```\n\n注意：`类名(实参)` 的实参传给 `__init__` 中 **除 self 以外**的形参；方法内只有写成 `self.balance` 才是在修改实例属性，写成 `balance` 只是局部变量。\n\n### 面向对象：继承与多态\n\n- **继承**：`class 子类(父类):` —— 子类自动拥有父类的属性与方法；子类没重写的方法直接拿来用\n- **方法重写**：子类定义与父类**同名**的方法，调用时执行子类版本（覆盖父类版本）\n- **`super().__init__(参数)`**：在子类 `__init__` 里调用父类构造方法，完成父类部分的初始化；**漏写则父类属性（如 self.name）根本没被创建**\n- **多态一句话**：不同子类的对象调用**同一个方法名**，各自执行**自己重写后的版本**\n\n**动物体系模板**（默写）：\n\n```python\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return self.name + '在叫'\nclass Dog(Animal):                    # Dog 继承 Animal\n    def __init__(self, name, breed):\n        super().__init__(name)        # 调父类构造初始化 name\n        self.breed = breed            # 子类新增属性\n    def speak(self):                  # 方法重写\n        return self.name + '汪汪叫'\nclass Cat(Animal):\n    def speak(self):                  # 只重写方法，不新增属性\n        return self.name + '喵喵叫'\n\nfor a in [Dog('旺财', '柴犬'), Cat('咪咪')]:   # 多态：同一句 a.speak()\n    print(a.speak())          # 依次输出：旺财汪汪叫 / 咪咪喵喵叫\n```\n\n配套考点：`isinstance(d, Animal)` 为 **True**（子类实例也算父类类型）；重写后的方法内可以放心使用父类 `__init__` 建好的 `self.name`。\n\n### SQLite 数据库实战\n\nsqlite3 是 Python **内置模块**，`import sqlite3` 即可用。**七步流程**（默写）：**connect → cursor() → execute(建表/插入) → commit → execute(查询) → fetchone()/fetchall() → close**。\n\n```python\nimport sqlite3\nconn = sqlite3.connect('test.db')    # ① 连接：文件不存在自动创建；':memory:' 为内存库\ncur = conn.cursor()                  # ② 游标\ncur.execute('CREATE TABLE student (id INTEGER PRIMARY KEY, name TEXT, score REAL)')  # ③ 执行 SQL\ncur.execute(\"INSERT INTO student VALUES (1, '张三', 85)\")\ncur.executemany('INSERT INTO student VALUES (?, ?, ?)', [(2, '李四', 92), (3, '王五', 58)])  # 批量插入\nconn.commit()                        # ④ 提交：增删改必须，否则不落盘\ncur.execute('SELECT * FROM student WHERE score >= ?', (60,))   # ⑤ 查询\nprint(cur.fetchone())                # ⑥ (1, '张三', 85.0)   一条，元组\nprint(cur.fetchall())                #    [(2, '李四', 92.0)] 剩余全部，列表套元组\nconn.close()                         # ⑦ 关闭\n```\n\n**SQL 五句速查**（考试只考这几句）：\n\n| SQL | 用途 | 注意 |\n| --- | --- | --- |\n| `CREATE TABLE 表 (列 类型, ...)` | 建表 | 常用类型 INTEGER / TEXT / REAL |\n| `INSERT INTO 表 VALUES (...)` | 插入 | 字符串值要加引号 |\n| `SELECT 列 FROM 表 WHERE 条件` | 查询 | `*` 表示全部列 |\n| `UPDATE 表 SET 列=值 WHERE 条件` | 更新 | **漏 WHERE 全表被改** |\n| `DELETE FROM 表 WHERE 条件` | 删除 | 同上 |\n\n**游标消费特性**（高频坑）：fetchone / fetchall 是**单向读取**，取过的行不会再来：\n\n```python\ncur.execute('SELECT * FROM student')\nprint(cur.fetchone())   # (1, '张三', 85.0)\nprint(cur.fetchall())   # [(2, '李四', 92.0), (3, '王五', 58.0)]  第 1 行已被消费\n```\n\n想重新取一遍必须**重新 execute**；也可以直接 `for row in cur:` 逐行遍历。\n\n**`?` 占位符**：SQL 中不确定的值先用 `?` 占位，参数以**元组**形式作为 execute 的第二个参数传入——这是考试标准写法，也防 SQL 注入：\n\n```python\ncur.execute('SELECT * FROM student WHERE name = ?', ('李四',))   # 单个参数也要写成元组\ncur.execute('UPDATE student SET score = ? WHERE name = ?', (65, '王五'))\nconn.commit()                        # 更新后同样要 commit\n```\n\n**`:memory:` 内存数据库**：`sqlite3.connect(':memory:')` 不产生文件、程序结束即消失，练习与判题环境首选。\n\n### JSON 与 API【理解】\n\n选择题层级：会区分四个函数、记住类型对应、知道 RESTful 是什么即可。\n\n**四个函数**（核心考点）：\n\n| 函数 | 方向 | 操作对象 |\n| --- | --- | --- |\n| `json.dumps(obj)` | Python 对象 → JSON **字符串** | 内存字符串 |\n| `json.loads(s)` | JSON **字符串** → Python 对象 | 内存字符串 |\n| `json.dump(obj, f)` | Python 对象 → **写入文件** | 文件对象 |\n| `json.load(f)` | 从**文件读取** → Python 对象 | 文件对象 |\n\n**带 s 的工作在字符串上，不带 s 的直接读写文件**（与 open 的文件对象配合）。\n\n**类型对应表**（loads 之后类型会变）：\n\n| Python | JSON |\n| --- | --- |\n| dict | object |\n| list、tuple | array |\n| str | string |\n| int、float | number |\n| True / False | true / false |\n| None | null |\n\n**两个常用参数**：\n\n```python\nimport json\nd = {'name': '张三', 'scores': [85, 92]}\ns = json.dumps(d, ensure_ascii=False)\nprint(s)                 # {\"name\": \"张三\", \"scores\": [85, 92]}\nd2 = json.loads(s)       # 还原成 dict\nprint(json.dumps(d, ensure_ascii=False, indent=2))   # indent 缩进美化\n```\n\n- **`ensure_ascii=False`：中文原样输出**（默认 True 会把中文转成 `\\u5f20\\u4e09` 转义）；`indent=2` 按层缩进美化\n\n**RESTful 一句话**：一种 API 设计风格——**用 URL 表示资源，用 HTTP 方法表达操作**（GET 查 / POST 增 / PUT 改 / DELETE 删），前后端之间以 JSON 交换数据。Flask 与 FastAPI 是两个常用 Python Web 框架，都用**路由装饰器**把 URL 映射到处理函数：\n\n```python\n# Flask：@app.route 路由，返回 dict 自动转 JSON\nfrom flask import Flask\napp = Flask(__name__)\n@app.route('/user/<int:uid>')            # URL 参数 <int:uid>\ndef get_user(uid):\n    return {'id': uid, 'name': '张三'}\n\n# FastAPI：@app.get 指明 HTTP 方法，类型注解自动做参数校验\nfrom fastapi import FastAPI\napp = FastAPI()\n@app.get('/user/{uid}')\ndef get_user(uid: int):\n    return {'id': uid, 'name': '张三'}\n```\n\n### matplotlib 数据可视化【理解】\n\n会认代码、会补全关键行即可。**本站判题环境已固定使用 Agg 后端**（无窗口），判题靠 `print` 数据不靠图；下面的示例均可在本地实跑。\n\n```python\nimport matplotlib\nmatplotlib.use('Agg')                  # 无界面环境必须先切后端，再 import pyplot\nimport matplotlib.pyplot as plt\nplt.rcParams['font.sans-serif'] = ['SimHei']   # 中文字体（macOS 用 'Arial Unicode MS'）\nplt.rcParams['axes.unicode_minus'] = False     # 让负号正常显示\nx = [1, 2, 3, 4]\ny = [15, 18, 14, 20]\nplt.plot(x, y, 'o-', label='销量')     # 折线图；'o-' 表示圆点连线\nplt.xlabel('月份')                     # x 轴标签\nplt.ylabel('销量(万件)')\nplt.legend()                           # 显示 label 图例\nplt.savefig('line.png')                # 无界面环境用它代替 show；要在 show 之前调用\n```\n\n| 函数 | 图形 | 常用参数 |\n| --- | --- | --- |\n| `plt.plot(x, y)` | 折线图 | `'o-'` 点线样式、`label` |\n| `plt.bar(x, height)` | 柱形图 | x 为类别列表 |\n| `plt.pie(sizes, labels=..., autopct='%.1f%%')` | 饼图 | autopct 显示百分比 |\n| `plt.title(s)` / `xlabel` / `ylabel` | 标题与轴标签 | 中文需先设字体 |\n| `plt.legend()` | 图例 | 配合 `label=` 使用 |\n| `plt.show()` | 弹窗显示 | 无界面环境会阻塞或无效 |\n| `plt.savefig('a.png')` | 保存图片 | 放在 show 之前，否则存到空白图 |\n\n**与 turtle 的场景差异**：turtle 是**指令式画笔**，一笔一笔走，适合正方形、五角星等几何图形（L6 编程大题）；matplotlib 是**数据可视化**，喂两个列表自动成图，适合折线、柱状、饼图（本关选择题为主）。\n\n### 必背清单\n\n- 正则元字符：`.` `\\d` `\\w` `\\s` `[abc]` `[^abc]` `*` `+` `?` `{m,n}` `^` `$` `|` `(...)`——尤其 **`1[35789]\\d{9}` 手机号模式**\n- re 四函数：`match`（只从开头）/ `search`（全串第一处）/ `findall`（全部，列表）/ `sub`（替换）；Match 对象用 `m.group(n)`\n- **findall 返回形态**：无分组→字符串列表；1 个分组→组内容列表；**2 个及以上分组→元组列表**\n- 网页提取三板斧：`.*?` 非贪婪 + `[^\" ]+` 排除型字符集 + `\\s*` 吃标签间空白\n- 类模板四行：`class 类名:` / `def __init__(self, ...):` / `self.属性 = 参数` / `def 方法(self):`；实例化 `类名(实参)`，调用 `对象.方法()`\n- 继承三件套：`class 子类(父类)`、`super().__init__(参数)`、重写同名方法；多态 = 同一方法名、不同子类不同表现\n- **sqlite3 七步**：`connect` → `cursor()` → `execute`（建表/插入）→ `commit` → `execute`（查询）→ `fetchone()/fetchall()` → `close`；占位符 `?` 的参数传**元组**\n- SQL 五句：CREATE TABLE / INSERT INTO ... VALUES / SELECT ... WHERE / UPDATE ... SET / DELETE FROM\n- json 四函数：`dumps`/`loads` 管字符串，`dump`/`load` 管文件；中文必须 `ensure_ascii=False`\n- matplotlib 六件：`plot`/`bar`/`pie`、`xlabel`/`ylabel`、`legend`、`savefig`；中文字体 `rcParams['font.sans-serif']`，无界面先 `matplotlib.use('Agg')`\n\n### 易错点\n\n- **`re.match` 只从字符串开头匹配**：开头不符返回 None，`re.match(r'\\d+', 'abc123')` 是 None；要扫描全串用 `re.search`。\n- **`findall` 带分组时不返回整个匹配**：1 个分组返回组内容列表，2 个及以上返回元组列表；想逐处拿整体匹配用 `finditer`。\n- **贪婪误伤**：HTML 提取写 `(.*)` 会从第一个标签吃到最后一个标签，必须写 `(.*?)`。\n- **游标消费**：`fetchone()` 之后 `fetchall()` 只返回**剩余**行，第 1 行不会重复出现；想重取必须重新 `execute`。\n- **增删改忘 `conn.commit()`**：执行\"成功\"，程序一结束数据全部丢失；SELECT 不需要 commit。\n- `execute` 的 `?` 参数**必须传元组**：`('李四',)` 单个值也要加逗号，直接传字符串会报错。\n- 类的方法**漏写 `self` 参数**：`def show():` 这种写法调用时报 TypeError；方法内忘写 `self.` 前缀，属性就变成了局部变量。\n- **子类 `__init__` 漏写 `super().__init__()`**：父类属性（如 self.name）未被创建，一访问就 AttributeError。\n- **`json.loads` 的参数必须是字符串**，传文件对象要用 `json.load`；四个函数两两成对，不能混用。\n- **matplotlib 中文乱码与 show 阻塞**：不设 `font.sans-serif` 中文显示为方框；无界面环境 `plt.show()` 会阻塞，应先 `matplotlib.use('Agg')` 再用 `savefig` 存图（且 savefig 要写在 show 之前，否则存出空白图）。\n"
 },
 "resources": [
  {
   "cat": "official",
   "title": "上信考官方网站（上海市教育考试院）",
   "url": "https://scite.shmeea.edu.cn/",
   "desc": "报名、下载最新考试大纲与官方模拟试卷的第一渠道，考前务必把官方模拟卷做一遍"
  },
  {
   "cat": "official",
   "title": "官方考纲解读（超星平台）",
   "url": "https://mooc1.chaoxing.com/course-ans/courseportal/portal/QYtE3phxYq1QN61Pgo_jnQ==",
   "desc": "考试院配套的考纲解读课程，了解命题思路"
  },
  {
   "cat": "official",
   "title": "Python 程序设计基础（第3版）教材配套",
   "url": "https://www.phei.com.cn/",
   "desc": "大纲指定参考教材：李东方主编，电子工业出版社 2023；配合本站查漏补缺"
  },
  {
   "cat": "github",
   "title": "Python-100-Days（约 187k★）",
   "url": "https://github.com/jackfrued/Python-100-Days",
   "desc": "最流行的中文 Python 系统教程，语言基础与生态部分与考纲高度重合，当字典用"
  },
  {
   "cat": "github",
   "title": "Python-Core-50-Courses（约 12.6k★）",
   "url": "https://github.com/jackfrued/Python-Core-50-Courses",
   "desc": "50 讲语言基础课，粒度适合按考点逐章补强"
  },
  {
   "cat": "github",
   "title": "TheAlgorithms/Python（约 225k★）",
   "url": "https://github.com/TheAlgorithms/Python",
   "desc": "经典算法参考实现（素数/排序/查找等），编程大题常用算法都能找到范本"
  },
  {
   "cat": "github",
   "title": "Python-programming-exercises（约 29.7k★）",
   "url": "https://github.com/zhiwehu/Python-programming-exercises",
   "desc": "100+ 道经典编程练习含题解，难度贴合二级编程题"
  },
  {
   "cat": "github",
   "title": "NCRE-Python 二级教程笔记",
   "url": "https://github.com/Xanxus-5/NCRE-Python",
   "desc": "全国计算机等级考试二级 Python 全书笔记；全国卷与上海卷考点相近，可交叉练习"
  },
  {
   "cat": "github",
   "title": "NCRE2-Python 分类练习题",
   "url": "https://github.com/sandianyiyuan/NCRE2-Python",
   "desc": "二级 Python 分类习题集，按知识点刷"
  },
  {
   "cat": "github",
   "title": "ncre-python-guide 备考笔记",
   "url": "https://github.com/BUZAI946/ncre-python-guide",
   "desc": "12 章 + 318 选择 + 30 编程 + 15 套卷的备考整理，题量结构可参考"
  },
  {
   "cat": "github",
   "title": "turtle 创意绘图合集",
   "url": "https://github.com/cmdragon/Python123",
   "desc": "turtle 绘图实例集，对应考点\"图形绘制\""
  },
  {
   "cat": "tutorial",
   "title": "廖雪峰 Python 教程",
   "url": "https://www.liaoxuefeng.com/wiki/1016959663602400",
   "desc": "中文最系统的免费入门教程，适合从零到一的通读"
  },
  {
   "cat": "tutorial",
   "title": "菜鸟教程 Python3",
   "url": "https://www.runoob.com/python3/python3-tutorial.html",
   "desc": "查询式语法手册带在线运行，做题时快速查函数用法"
  },
  {
   "cat": "tutorial",
   "title": "Python 官方中文文档",
   "url": "https://docs.python.org/zh-cn/3/tutorial/",
   "desc": "权威教程与标准库参考，标准库部分对应考点 random/math/time 等"
  },
  {
   "cat": "tool",
   "title": "Python123 练习平台",
   "url": "https://www.python123.io/",
   "desc": "全国等级考试官方指定上机练习平台，题库与考试同源"
  },
  {
   "cat": "tool",
   "title": "拼题A（PTA）",
   "url": "https://pintia.cn/",
   "desc": "高校程序设计题集平台，有 Python 程序设计题库可加练"
  },
  {
   "cat": "tool",
   "title": "Pyodide（本站判题引擎）",
   "url": "https://github.com/pyodide/pyodide",
   "desc": "本站浏览器内 Python 判题使用的技术，也可自己在浏览器玩 Python"
  },
  {
   "cat": "paper",
   "title": "CSDN：上信考 Python 二三级模拟题与真题回忆（站内搜索）",
   "url": "https://so.csdn.net/so/search?q=%E4%B8%8A%E6%B5%B7%E5%B8%82%E9%AB%98%E7%AD%89%E5%AD%A6%E6%A0%A1%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%E6%B0%B4%E5%B9%B3%E8%80%83%E8%AF%95%20python&t=all",
   "desc": "历年考生发布的真题回忆与模拟题解析，考前浏览一遍感受真题风格"
  },
  {
   "cat": "paper",
   "title": "知乎：上信考 vs 全国计算机等级考试对比",
   "url": "https://www.zhihu.com/search?type=content&q=%E4%B8%8A%E6%B5%B7%E9%AB%98%E6%A0%A1%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%E6%B0%B4%E5%B9%B3%E8%80%83%E8%AF%95%20Python",
   "desc": "过来人经验：上海卷编程题比重大，重在动手写代码（本站正是按此设计）"
  },
  {
   "cat": "video",
   "title": "B站：上海高校计算机水平考试 Python 备考视频（站内搜索）",
   "url": "https://search.bilibili.com/all?keyword=%E4%B8%8A%E6%B5%B7%E9%AB%98%E6%A0%A1%E8%AE%A1%E7%AE%97%E6%9C%BA%E6%B0%B4%E5%B9%B3%E8%80%83%E8%AF%95python",
   "desc": "模拟卷讲解、真题回忆视频，配合本站刷题食用"
  },
  {
   "cat": "official",
   "title": "2026 年上信考报名公告（上海招考热线）",
   "url": "https://www.shmeea.edu.cn/page/05800/20260903/20570.html",
   "desc": "官方时间线：二三级 11 月 28 日开考、成绩 12 月底公布、2025 年起发放电子证书（随申办亮证）"
  },
  {
   "cat": "official",
   "title": "准考证快速打印入口",
   "url": "https://scite.shmeea.edu.cn:8001/home/QuickPrintTestTicket",
   "desc": "SCITE 报名系统内准考证打印直链，考前开放"
  },
  {
   "cat": "tool",
   "title": "Python Tutor 在线可视化执行",
   "url": "https://pythontutor.com/",
   "desc": "逐帧展示变量、栈帧与递归调用树——递归（L4）和循环看不见过程的问题用它一目了然"
  },
  {
   "cat": "tutorial",
   "title": "正则表达式 30 分钟入门教程",
   "url": "https://deerchao.cn/tutorials/regex/regex.htm",
   "desc": "中文经典正则教程：元字符/分组/贪婪与懒惰 + 速查表，对应 L7 正则考点"
  },
  {
   "cat": "tool",
   "title": "Regex101 在线正则调试器",
   "url": "https://regex101.com/",
   "desc": "选 Python 方言，逐步匹配解释 + 调试器，写正则提取题（官方卷第 5 题）的利器"
  },
  {
   "cat": "tutorial",
   "title": "SQLZoo 中文版交互教程",
   "url": "https://sqlzoo.net/wiki/SQL_Tutorial/zh",
   "desc": "浏览器内交互练 SELECT/JOIN/聚合，补齐 L7 SQLite 考点的动手环节"
  },
  {
   "cat": "tutorial",
   "title": "Matplotlib 中文文档",
   "url": "https://www.matplotlib.org.cn/",
   "desc": "快速入门 + pyplot API + 图库，L7 数据可视化的中文权威参考"
  },
  {
   "cat": "video",
   "title": "B站：上信考二三级 Python 备考讲解（阿福课堂）",
   "url": "https://www.bilibili.com/video/BV1YNWMzsEQC/",
   "desc": "官方模拟卷按题型逐题视频讲解，与站内 27A 在线判题版配套食用（注意甄别付费引流）"
  },
  {
   "cat": "video",
   "title": "B站：上信考 SCITE 备考建议（2026）",
   "url": "https://www.bilibili.com/video/BV1McKr6LEwr/",
   "desc": "2026-07 新发布，第二选集 23 分钟专讲二三级 Python 备考策略"
  },
  {
   "cat": "tutorial",
   "title": "知乎：上信考与全国计算机等级考试的区别",
   "url": "https://www.zhihu.com/question/477190606/answer/3353196998",
   "desc": "二三级亲历长文：赋分制、题型递进、自带电脑上机等实操细节"
  },
  {
   "cat": "tool",
   "title": "VisuAlgo 中文版 · 算法可视化",
   "url": "https://visualgo.net/zh",
   "desc": "排序、递归树、哈希等动画演示 + 测验，理解常用算法背后的机制"
  }
 ],
 "official": {
  "title": "官方模拟卷 27A（2026 年 · A 场）",
  "source": "上海市教育考试院官网公开模拟卷",
  "url": "https://scite.shmeea.edu.cn/home/TestPaper",
  "note": "判分：单选 1.5 分/题；填空 2.5 分/空；改错 10 分/题；编程 17/18/15/12/13 分。原卷部分素材（数据文件、whl）由本站等价复刻，题干中已注明。",
  "mcq_ids": [
   "p27-m1",
   "p27-m2",
   "p27-m3",
   "p27-m4",
   "p27-m5",
   "p27-m6",
   "p27-m7",
   "p27-m8",
   "p27-m9",
   "p27-m10"
  ],
  "blank_ids": [
   "p27-b1",
   "p27-b2",
   "p27-b3"
  ],
  "fix_ids": [
   "p27-f1",
   "p27-f2",
   "p27-f3"
  ],
  "coding_ids": [
   "p27-c1",
   "p27-c2",
   "p27-c3",
   "p27-c4",
   "p27-c5"
  ]
 }
};
