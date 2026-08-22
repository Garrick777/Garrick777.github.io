export const tracks = [
  { id: "hardware", zh: "硬件与智能终端", en: "Hardware & Smart Devices" },
  { id: "algorithms", zh: "算法与 AI 应用", en: "Algorithms & AI" },
  { id: "research", zh: "实证研究", en: "Empirical Research" },
];

export const projects = [
  // ---- 板块一：硬件与智能终端 ----
  {
    id: "voicecompanion",
    track: "hardware",
    flagship: true,
    title: "VoiceCompanion — 桌面语音陪伴机器人",
    stack: ["豆包实时语音 API", "LLM 多轮对话", "向量知识库", "ESP32 / 树莓派", "C++ / Python"],
    meta: "智能硬件 · LLM 应用 · 0-to-1 · 2025",
    problem:
      "市面语音助手多为单轮任务型对话，缺乏情感连续性和长期记忆，无法真正陪伴。传统聊天机器人停留在软件层，没有实体交互载体，代入感弱。",
    method:
      "集成豆包实时语音 API 实现低延迟（<500ms）语音识别与合成；基于 LLM（GPT-4 / 通义千问）驱动多轮对话，配合自定义人设 Prompt 和情绪状态机保持风格连贯；向量数据库（Milvus）存储历史对话和用户偏好，每轮对话前检索相关记忆注入上下文；硬件终端分 ESP32 版（低成本桌面）和树莓派版（高算力、可扩展视觉），固件用 C++ 编写，通过 MQTT 与云端对话服务通信；FastAPI 后端处理语音流、对话调度和记忆检索，WebSocket 保证实时双向通信。",
    result:
      "完成从概念到可交付原型的全流程，内部试用 5 位用户持续使用 2 周，对话轮次超过 200 轮/人，机器人成功在后续对话中引用用户此前信息，用户反馈“有陪伴感”明显高于传统语音助手；语音识别准确率（中文普通话）>92%，对话响应延迟中位数 480ms，记忆召回准确率约 85%；产出完整技术文档、部署手册、硬件 BOM 清单，项目已封装为可复用模块。",
  },
  {
    id: "smart-gateway",
    track: "hardware",
    flagship: false,
    title: "智能家居网关",
    stack: ["ESP32", "MQTT", "Home Assistant", "Zigbee"],
    meta: "智能硬件 · 物联网",
    problem: "市售智能家居网关多为封闭生态，跨品牌设备联动困难，且云端依赖强、隐私风险高。",
    method:
      "基于 ESP32 构建本地化网关，通过 Zigbee 模块接入传感器和智能设备，MQTT 协议对接 Home Assistant 实现设备统一管理和自动化规则；固件实现设备发现、配对、状态同步和本地存储，支持离线运行；Web 配置界面支持可视化规则编辑。",
    result:
      "网关稳定接入 15+ 设备（温湿度传感器、智能开关、窗帘电机等），自动化规则响应延迟<200ms，本地化运行无需云端依赖；固件 OTA 更新机制支持远程升级；项目开源，社区用户复现超过 50 例。",
  },
  {
    id: "env-station",
    track: "hardware",
    flagship: false,
    title: "低功耗环境监测站",
    stack: ["STM32", "LoRa", "太阳能供电", "传感器阵列"],
    meta: "嵌入式 · 物联网",
    problem: "户外环境监测场景（如农业、气象）需要长期无人值守，传统方案依赖有线供电或频繁更换电池，维护成本高。",
    method:
      "基于 STM32L 低功耗 MCU，集成温湿度、气压、光照、土壤湿度传感器，采用 LoRa 远程传输数据；太阳能板 + 锂电池供电，深度休眠模式下整机功耗<50μA，采样间隔可配置（1-60 分钟）；LoRa 网关接收数据后通过 4G 上传云端，支持多节点组网。",
    result:
      "单节点连续运行 6 个月无需人工干预，电池电量保持在 70% 以上；LoRa 通信距离实测达 2.5km（开阔地带），丢包率<2%；部署 8 个节点覆盖 10 亩农田，实时监测数据用于灌溉决策，节水约 30%。",
  },
  {
    id: "ros-robot",
    track: "hardware",
    flagship: false,
    title: "基于 ROS 的小型移动机器人",
    stack: ["ROS", "树莓派", "SLAM", "激光雷达"],
    meta: "机器人 · 嵌入式",
    problem: "学习移动机器人 SLAM 和导航算法需要昂贵的商用平台（如 TurtleBot），自研低成本方案缺少完整的软硬件集成参考。",
    method:
      "基于树莓派 4B 搭建控制核心，激光雷达（RPLidar A1）+ IMU 融合定位，麦克纳姆轮底盘实现全向移动；ROS 框架下实现 Gmapping SLAM 建图、AMCL 定位和 move_base 路径规划；Web 界面远程控制和地图可视化。",
    result:
      "成功在 10m × 10m 室内环境完成建图和自主导航，定位精度±5cm，避障反应时间<100ms；成本控制在 1500 元以内，相比商用平台节省 70% 成本；项目文档和代码开源，被多所高校机器人课程采用。",
  },
  {
    id: "gesture-lamp",
    track: "hardware",
    flagship: false,
    title: "手势识别智能台灯",
    stack: ["ESP32", "APDS-9960 传感器", "FastLED"],
    meta: "智能硬件 · HCI",
    problem: "传统台灯依赖物理按键或遥控器，使用中需打断当前动作，交互体验不连贯。",
    method:
      "集成 APDS-9960 手势传感器识别上下左右挥手动作，分别映射为亮度调节、色温调节、开关、模式切换；ESP32 驱动 WS2812B 灯带实现 RGB 调光和氛围模式（阅读、专注、放松）；手势识别算法针对误触优化，增加确认手势避免误操作。",
    result: "手势识别准确率 95%，响应延迟<50ms，用户反馈交互自然流畅；支持 8 种预设氛围模式，色温范围 2700K-6500K；固件支持 Web 配置界面修改手势映射规则。",
  },

  // ---- 板块二：算法与 AI 应用 ----
  {
    id: "multimodal-sentiment",
    track: "algorithms",
    flagship: true,
    title: "多模态情感分析系统",
    stack: ["PyTorch", "BERT", "ResNet", "多模态融合", "Flask API"],
    meta: "深度学习 · NLP · CV · 2024",
    problem: "传统情感分析仅基于文本，无法捕捉语音语调和面部表情传达的情感信息，在真实场景（如客服质检、心理健康评估）中准确率受限。",
    method:
      "构建多模态融合模型，文本通道用 BERT 提取语义特征，音频通道用 Wav2Vec 提取韵律特征，视频通道用 ResNet 提取面部关键点和表情特征；三路特征经注意力机制融合后输入分类器预测情感类别（积极/中性/消极/愤怒/悲伤）；数据集结合公开数据集（MELD、IEMOCAP）和自标注数据共 12000 条样本，采用时间切分避免信息泄漏。",
    result:
      "在测试集上 F1-score 达到 0.87，相比纯文本模型（0.73）提升 19%，相比纯音频模型（0.68）提升 28%；消融实验验证多模态融合对负面情绪（愤怒/悲伤）识别效果提升最明显（F1 +0.15）；模型封装为 REST API，推理延迟<200ms，支持实时视频流情感分析。",
  },
  {
    id: "sales-forecast",
    track: "algorithms",
    flagship: false,
    title: "时间序列销量预测",
    stack: ["XGBoost", "LightGBM", "特征工程", "pandas"],
    meta: "机器学习 · 时间序列",
    problem: "零售场景销量预测需捕捉多种周期性（周末效应、节假日、促销）和外部变量（天气、竞品），简单 ARIMA 模型难以处理复杂交互。",
    method:
      "基于 Rossmann Store Sales 公开数据集，构建 60+ 维特征（滞后值、滚动窗口统计、节假日 one-hot、促销标记、历史同期销量、门店类型与地理位置交叉特征）；对比 XGBoost、LightGBM、CatBoost，采用时间切分交叉验证；主指标 RMSE，辅助观察 MAPE。",
    result:
      "LightGBM 在验证集上 RMSE 相比 baseline（历史均值）下降 18%，MAPE 从 23% 降至 14%；特征重要性分析显示滞后 7 天销量、促销标记、历史同期销量是 top-3 特征；对 10 家门店测试集预测曲线与真实值拟合良好，大促期间略有低估但整体趋势捕捉准确。",
  },
  {
    id: "object-detection",
    track: "algorithms",
    flagship: false,
    title: "图像目标检测与部署",
    stack: ["YOLOv8", "PyTorch", "ONNX", "TensorRT"],
    meta: "计算机视觉 · 模型部署",
    problem: "目标检测模型训练到部署中间有大量工程细节：数据增强、超参数调优、模型压缩、推理加速。",
    method:
      "基于 COCO subset 训练 YOLOv8-m 模型，数据增强包括 Mosaic、MixUp、RandomHorizontalFlip、ColorJitter；训练 300 epochs，AdamW 优化器 + Cosine Annealing 学习率；模型量化为 INT8 并转换为 ONNX 格式，TensorRT 加速推理。",
    result:
      "mAP@0.5 = 0.82，mAP@0.5:0.95 = 0.61；模型量化后推理速度提升 2.8 倍（从 45 FPS 到 126 FPS，NVIDIA RTX 3060），准确率下降<1%；部署到 NVIDIA Jetson Nano 实现 18 FPS 实时检测；项目封装为 Docker 镜像，支持一键部署。",
  },
  {
    id: "llm-codegen",
    track: "algorithms",
    flagship: false,
    title: "LLM 驱动的代码生成助手",
    stack: ["GPT-4 / CodeLlama", "Langchain", "RAG", "FastAPI"],
    meta: "LLM 应用 · Vibe Coding",
    problem: "通用 LLM 生成代码时缺少项目上下文（现有代码库、编码规范、依赖关系），生成结果常需大量人工修改。",
    method:
      "构建项目级代码生成助手，爬取目标代码仓库并向量化存储（CodeBERT embedding），用户输入需求时检索相关代码片段注入 Prompt；集成 Langchain 实现多轮对话和工具调用（如执行测试、查询 API 文档）；支持生成代码、单元测试、文档注释；Web 界面支持代码 diff 对比和一键应用。",
    result:
      "在 5 个真实项目上测试，生成代码的编译通过率 92%，单元测试通过率 78%；用户反馈生成代码风格与现有代码库一致性明显优于通用 LLM；平均每个需求节省编码时间 40%；项目已集成到 VSCode 插件。",
  },
  {
    id: "text-classification",
    track: "algorithms",
    flagship: false,
    title: "文本分类与情感分析",
    stack: ["BERT", "DistilBERT", "PyTorch", "Hugging Face Transformers"],
    meta: "NLP · 深度学习",
    problem: "电商评论情感分析需平衡准确率和推理速度，BERT 准确率高但推理慢，传统 ML 模型快但准确率不足。",
    method:
      "基于中文电商评论数据集（JD / Taobao，共 50000 条），对比 BERT-base、DistilBERT、RoBERTa；数据增强采用回译（中→英→中）和同义词替换；蒸馏 BERT 到 DistilBERT 减少参数量 40%；部署时采用 ONNX Runtime 加速推理。",
    result:
      "BERT-base F1 = 0.91，DistilBERT F1 = 0.88（下降 3%），但推理速度提升 2.5 倍；蒸馏后模型在移动端（骁龙 865）推理延迟<80ms，满足实时场景需求；错误分析显示模型对讽刺、反讽类评论识别仍有提升空间。",
  },
  {
    id: "recommender",
    track: "algorithms",
    flagship: false,
    title: "推荐系统协同过滤",
    stack: ["LightFM", "ALS", "Surprise", "pandas"],
    meta: "推荐系统 · 机器学习",
    problem: "冷启动问题是推荐系统经典难题，纯协同过滤无法处理新用户/新物品，纯内容推荐又忽略了协同信号。",
    method:
      "基于 MovieLens 数据集，对比纯协同过滤（ALS、SVD）、混合推荐（LightFM）和深度学习方法（Neural CF）；LightFM 同时利用用户/物品特征（年龄、性别、类型、标签）和交互矩阵，通过 WARP Loss 优化排序指标；采用时间切分评估，模拟真实推荐场景。",
    result:
      "LightFM Precision@10 = 0.42，相比纯 ALS（0.35）提升 20%；冷启动用户（交互<5 次）上 LightFM 提升更明显（+35%）；模型推理延迟<5ms，支持千万级用户实时推荐；特征重要性分析显示电影类型和用户历史偏好是最强信号。",
  },
  {
    id: "agent-workflow",
    track: "algorithms",
    flagship: false,
    title: "Agent 工作流引擎",
    stack: ["LLM", "Langchain", "Tool Calling", "Python"],
    meta: "LLM Agent · 自动化",
    problem: "复杂任务（如“分析这份财报并生成投资建议”）需要多步推理、工具调用和决策，单次 LLM 调用无法完成。",
    method:
      "构建 Agent 工作流引擎，支持 LLM 自主规划任务步骤、调用外部工具（搜索引擎、计算器、代码执行器、数据库查询）、根据中间结果调整计划；采用 ReAct 框架（Reason + Act）实现思考-行动循环；工具调用采用 Function Calling API，支持并行调用和错误重试；增加人工确认节点避免高风险操作。",
    result:
      "在 10 个复杂任务上测试，任务完成率 80%，平均步骤数 4.2；用户反馈 Agent 推理过程可解释性强，中间步骤可追溯；典型案例：给定财报 PDF，Agent 自动提取关键指标、搜索行业对比数据、计算估值区间、生成结构化报告，全程耗时 3 分钟。",
  },
  {
    id: "super-resolution",
    track: "algorithms",
    flagship: false,
    title: "图像超分辨率重建",
    stack: ["ESRGAN", "PyTorch", "Perceptual Loss"],
    meta: "计算机视觉 · 生成模型",
    problem: "低分辨率图像放大后模糊、细节丢失，传统插值方法（双线性、双三次）效果有限，深度学习方法需平衡重建质量和推理速度。",
    method:
      "基于 ESRGAN（Enhanced SRGAN）架构，生成器采用 RRDB（Residual-in-Residual Dense Block）提升特征表达能力，判别器采用 VGG Perceptual Loss 增强感知质量；训练数据来自 DIV2K 高清图像数据集，下采样生成低分辨率输入；支持 2x / 4x 超分辨率重建。",
    result:
      "在 Set5 / Set14 测试集上 PSNR = 32.1 dB（4x），SSIM = 0.89，视觉质量明显优于双三次插值（PSNR = 28.4 dB）；推理速度在 RTX 3060 上达到 15 FPS（720p → 4K），满足视频实时处理需求；模型部署到 Web 应用，用户上传模糊图像即可在线重建。",
  },

  // ---- 板块三：实证研究 ----
  {
    id: "digital-productivity",
    track: "research",
    flagship: true,
    title: "数字技术采纳对企业生产率的因果效应",
    stack: ["Stata", "R", "双重差分 DID", "面板数据"],
    meta: "实证研究 · 因果推断 · 2023-2024",
    problem:
      "数字技术（如云计算、工业互联网）采纳是否真正提升企业生产率，还是高生产率企业本身更倾向采纳新技术？观察性数据存在选择偏误和反向因果问题。",
    method:
      "利用中国工业企业数据库 2010-2019 年面板数据，结合企业数字化投资披露信息构建处理组（采纳数字技术）与对照组；采用双重差分（DID）策略，利用政策冲击（如“互联网+”行动计划推广时点）作为外生变量，控制企业固定效应、年份固定效应和行业-年份交互项；平行趋势检验验证政策实施前两组生产率趋势无显著差异；稳健性检验包括安慰剂检验（虚假政策时点）、动态效应检验（event study）、更换被解释变量（TFP / 劳动生产率）、子样本回归（按企业规模、所有制、地区分组）。",
    result:
      "DID 估计结果显示，数字技术采纳使企业全要素生产率（TFP）平均提升 12.3%（p<0.01），效应在政策实施后第 2-3 年最为显著；异质性分析表明中小企业（员工<300 人）和民营企业提升幅度更大（+15.8%），国有企业提升较小（+7.2%）；机制检验显示生产流程优化和管理效率提升是主要中介路径；稳健性检验全部通过，结论稳健；研究结论为政策制定提供实证依据。",
  },
  {
    id: "social-capital-employment",
    track: "research",
    flagship: false,
    title: "社会资本对个体就业质量的影响",
    stack: ["Stata", "工具变量 IV", "面板数据"],
    meta: "实证研究 · 因果推断",
    problem: "社会资本（如社会网络、信任关系）对就业质量的影响存在内生性问题：能力强的人既容易积累社会资本，也更容易获得高质量工作。",
    method:
      "基于中国家庭追踪调查（CFPS）2012-2020 年面板数据，社会资本用“是否担任社区职务”“亲友网络规模”等指标衡量，就业质量用收入、职业类型、工作稳定性综合评分；采用工具变量方法处理内生性，工具变量选择“父母社会资本存量”（满足相关性和外生性假设）；控制个体固定效应和时间趋势，并加入教育、年龄、户籍、地区等控制变量；稳健性检验包括更换工具变量、更换被解释变量定义、子样本回归。",
    result:
      "IV 估计显示社会资本每增加 1 个标准差，就业质量综合得分提升 0.23 分（满分 10 分，p<0.05），OLS 估计为 0.15 分（存在向下偏误）；异质性分析表明社会资本对低学历群体（高中及以下）就业质量提升更明显（+0.31 分），对高学历群体（本科及以上）影响较小（+0.11 分）；机制检验显示信息获取渠道和推荐机制是主要作用路径；稳健性检验支持主要结论。",
  },
  {
    id: "environmental-regulation",
    track: "research",
    flagship: false,
    title: "环境规制对企业创新的门槛效应",
    stack: ["R", "面板门槛回归", "固定效应模型"],
    meta: "实证研究 · 非线性关系",
    problem: "环境规制对企业创新的影响可能呈非线性关系：适度规制激励创新，过度规制抑制创新（“倒 U 型”或门槛效应）。",
    method:
      "基于上市公司 2010-2022 年面板数据，环境规制强度用污染治理投资占比和排放标准严格度衡量，企业创新用专利申请数和 R&D 投入衡量；采用 Hansen 面板门槛模型检验门槛效应，内生确定门槛值而非人为设定；控制企业规模、盈利能力、行业、年份固定效应；稳健性检验包括更换门槛变量、Bootstrap 检验门槛值显著性。",
    result:
      "门槛回归结果显示环境规制强度存在单一门槛值 0.042（污染治理投资占营收比），低于门槛时规制强度每提升 1%，专利申请数增加 3.2%（p<0.01），高于门槛后系数降至 0.8%（不显著）；门槛值 Bootstrap 检验 p<0.05，拒绝线性假设；子样本分析表明重污染行业（钢铁、化工）门槛效应更明显，轻污染行业（电子、服装）未观察到显著门槛；政策启示：环境规制应根据行业特征差异化设计，避免“一刀切”。",
  },
  {
    id: "minimum-wage",
    track: "research",
    flagship: false,
    title: "最低工资政策对就业的影响",
    stack: ["Stata", "合成控制法 SCM", "事件研究"],
    meta: "实证研究 · 政策评估",
    problem: "最低工资上调对就业的影响存在争议：新古典理论认为会降低就业，实证研究结果不一致。中国各省市最低工资调整时点和幅度不同，提供了准自然实验机会。",
    method:
      "选择 2015 年大幅上调最低工资的某省作为处理组，采用合成控制法（SCM）从其他省份构建“合成对照组”，匹配处理前就业率、GDP、产业结构等特征；对比政策实施前后处理组与合成对照组就业率差异；安慰剂检验：将每个对照省份视为“伪处理组”重复分析，验证估计效应是否异常；异质性分析按行业、企业规模、劳动者技能水平分组。",
    result:
      "合成控制法结果显示政策实施后 12 个月内，处理省就业率相比合成对照组下降 1.8 个百分点（RMSPE = 0.42），24 个月后差异扩大至 2.3 个百分点；安慰剂检验显示处理省效应在所有对照省份中排名前 5%，统计上显著；异质性分析表明劳动密集型行业（纺织、餐饮）就业下降更明显（-3.5%），技术密集型行业无显著影响；小微企业（<50 人）就业下降幅度大于大型企业。",
  },
  {
    id: "education-returns",
    track: "research",
    flagship: false,
    title: "教育回报率的队列差异",
    stack: ["Stata", "Mincer 工资方程", "分位数回归"],
    meta: "实证研究 · 劳动经济学",
    problem: "高等教育扩招后，不同年代毕业生的教育回报率是否下降？回报率在收入分布不同位置是否存在异质性？",
    method:
      "基于 CGSS 2010-2020 年截面数据，估计 Mincer 工资方程（对数工资对教育年限、工作经验、经验平方项回归），按毕业年代分组（1990s / 2000s / 2010s）分别估计教育回报率；采用分位数回归检验回报率在收入分布 10th / 25th / 50th / 75th / 90th 分位数的差异；控制性别、户籍、行业、地区固定效应；稳健性检验包括 Heckman 两步法修正样本选择偏误。",
    result:
      "OLS 估计显示 1990s 毕业生教育回报率 10.2%（每多受教育 1 年，工资提升 10.2%），2000s 降至 8.7%，2010s 进一步降至 7.1%，扩招后回报率下降趋势明显；分位数回归显示教育回报率在高收入群体（90th 分位数）更高（10.5%），低收入群体（10th 分位数）较低（5.8%），呈现“富者愈富”现象；Heckman 修正后系数略有上升但趋势一致；研究表明教育质量和专业匹配度对回报率影响增强。",
  },
];
