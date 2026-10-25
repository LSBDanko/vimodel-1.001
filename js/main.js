/* ============================================================
   OSMO ACTION 5 PRO — Interactive Teardown
   Three.js r128 / fully procedural geometry
   ============================================================ */
(function () {
  'use strict';

  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => Array.from((root || document).querySelectorAll(selector));

  /* ------------------------------------------------------------
     DATA
     ------------------------------------------------------------ */
  const PARTS = [
    {
      id: 'front-screen',
      index: '01',
      name: '前屏模组',
      en: 'FRONT OLED DISPLAY',
      accent: '#6ff2dd',
      icon: 'display',
      anchor: { x: -1.65, y: 1.72, z: 1.84 },
      explode: { x: -2.9, y: 1.7, z: 1.15 },
      explodeRot: { x: 0.02, y: -0.1, z: -0.03 },
      labelSpec: '1.46" OLED · 800 cd/m²',
      description: '1.46 英寸方形 OLED 高亮触摸屏，嵌于机身正面左侧。用于自拍取景、拍摄状态与电量回显，典型最高亮度达 800 cd/m²。',
      specs: [
        { k: '屏幕尺寸', v: '1.46', e: '英寸' },
        { k: '分辨率', v: '342 × 342' },
        { k: '像素密度', v: '331', e: 'ppi' },
        { k: '最大亮度', v: '800', e: 'cd/m²' }
      ],
      note: '前后双屏均可参与取景与参数控制，让自拍构图与运动记录更从容。',
      material: 'OLED 面板 / 钢化玻璃'
    },
    {
      id: 'lens',
      index: '02',
      name: '超广角镜头',
      en: 'ULTRA-WIDE LENS',
      accent: '#ff5b4a',
      icon: 'lens',
      anchor: { x: 1.55, y: 2.0, z: 1.9 },
      explode: { x: 2.95, y: 2.1, z: 1.05 },
      explodeRot: { x: -0.04, y: 0.07, z: 0.02 },
      labelSpec: '155° FOV · f/2.8',
      description: '155° 超广角定焦镜头，f/2.8 光圈与 0.35 米最近对焦距离。多层镜片与疏水镀膜从容应对雨水、雪雾与复杂光线。',
      specs: [
        { k: '视场角', v: '155', e: '°' },
        { k: '光圈', v: 'f/2.8' },
        { k: '最近对焦', v: '0.35', e: 'm' },
        { k: '防护', v: '可更换保护镜' }
      ],
      note: '镜头外圈红色饰环是 Osmo Action 系列的视觉识别符号，保护盖可独立拆卸更换。',
      material: '光学玻璃 / 阳极氧化铝'
    },
    {
      id: 'sensor',
      index: '03',
      name: '影像传感器',
      en: '1/1.3" CMOS SENSOR',
      accent: '#f3b469',
      icon: 'sensor',
      anchor: { x: 1.62, y: 1.6, z: 0.95 },
      explode: { x: 3.15, y: -1.15, z: 1.4 },
      explodeRot: { x: 0.15, y: -0.13, z: 0.04 },
      labelSpec: '1/1.3" CMOS · 40 MP',
      description: '新一代 1/1.3 英寸 CMOS 与 4nm 影像芯片协同工作，带来 13.5 档动态范围，并支持 4K/120fps 视频与约 4000 万像素照片。',
      specs: [
        { k: '传感器', v: '1/1.3" CMOS' },
        { k: '最大照片', v: '7296 × 5472' },
        { k: '动态范围', v: '13.5', e: '档' },
        { k: '最高帧率', v: '4K / 120fps' }
      ],
      note: '传感器位于镜头模组后方，采用高精度对位安装，与镜组共同构成整机的成像核心。',
      material: 'CMOS / 陶瓷基板'
    },
    {
      id: 'rear-screen',
      index: '04',
      name: '后屏总成',
      en: 'REAR OLED TOUCHSCREEN',
      accent: '#8cd8ff',
      icon: 'display',
      anchor: { x: 0.6, y: 1.68, z: -1.84 },
      explode: { x: -2.45, y: 0.35, z: -3.2 },
      explodeRot: { x: -0.02, y: 0.06, z: 0.01 },
      labelSpec: '2.5" OLED · 1000 nits',
      description: '2.5 英寸 OLED 触控屏覆盖机身背面，支持参数调整、监看与回放。1000 cd/m² 峰值亮度让户外取景依旧清晰。',
      specs: [
        { k: '屏幕尺寸', v: '2.5', e: '英寸' },
        { k: '分辨率', v: '400 × 712' },
        { k: '像素密度', v: '326', e: 'ppi' },
        { k: '峰值亮度', v: '1000', e: 'cd/m²' }
      ],
      note: '屏幕支持横竖屏拍摄界面切换，与前置 OLED 屏共同组成双屏取景系统。',
      material: 'OLED / 触控玻璃'
    },
    {
      id: 'mainboard',
      index: '05',
      name: '主板与芯片',
      en: '4NM MAINBOARD',
      accent: '#6ff2dd',
      icon: 'board',
      anchor: { x: 0.05, y: 1.55, z: -0.6 },
      explode: { x: 0.8, y: 3.55, z: -1.6 },
      explodeRot: { x: -0.14, y: 0.06, z: 0.01 },
      labelSpec: '4nm SOC · 64GB · Wi-Fi 6',
      description: '高度集成的主板承载 4nm 影像芯片、Wi-Fi 6 与 64GB 内置存储，负责实时防抖、AI 人物跟随与 10-bit 色彩处理。',
      specs: [
        { k: '制程', v: '4', e: 'nm' },
        { k: '内置存储', v: '64', e: 'GB' },
        { k: '无线协议', v: 'Wi-Fi 6.0' },
        { k: '增稳', v: 'RockSteady 3.0' }
      ],
      note: '多层 PCB 与屏蔽罩共同隔绝干扰，是整机的数据处理与无线连接中枢。',
      material: '多层 PCB / 屏蔽罩'
    },
    {
      id: 'battery',
      index: '06',
      name: '高密度电池',
      en: '1950mAh BATTERY',
      accent: '#b9ef78',
      icon: 'battery',
      anchor: { x: -0.6, y: -0.22, z: 0.55 },
      explode: { x: -3.05, y: -2.35, z: 0.8 },
      explodeRot: { x: 0.22, y: 0.19, z: 0.04 },
      labelSpec: '1950mAh · 7.5Wh · 240min',
      description: '1950mAh 高密度锂离子电池，可在 25°C 环境下录制 1080p/24fps 视频约 240 分钟，并支持低温环境持续工作。',
      specs: [
        { k: '容量', v: '1950', e: 'mAh' },
        { k: '能量', v: '7.5', e: 'Wh' },
        { k: '电压', v: '3.87', e: 'V' },
        { k: '最长续航', v: '240', e: 'min' }
      ],
      note: '续航数据来自 DJI 实验室：25°C、1080p/24fps、开启超强增稳、关闭 Wi-Fi 且熄屏。',
      material: '锂离子电芯 / 阻燃外壳'
    },
    {
      id: 'frame',
      index: '07',
      name: '防水机身',
      en: 'WATERPROOF CHASSIS',
      accent: '#d4dddd',
      icon: 'frame',
      anchor: { x: -2.65, y: -1.92, z: 1.18 },
      explode: { x: 0, y: 0, z: 0 },
      explodeRot: { x: 0, y: 0, z: 0 },
      labelSpec: 'IP68 · 20m · 146g',
      description: '一体化防水机身覆盖高强度复合材质与精密密封结构。裸机支持 20 米防水，并集成顶部按键、麦克风与侧盖接口。',
      specs: [
        { k: '尺寸', v: '70.5 × 44.2 × 32.8' },
        { k: '重量', v: '146', e: 'g' },
        { k: '防护', v: '20', e: 'm / IP68' },
        { k: '工作温度', v: '-20°C 至 45°C' }
      ],
      note: '水下使用前需闭紧电池仓盖与 USB-C 接口保护盖，并拧紧镜头保护盖。',
      material: '复合聚合物 / 金属结构件'
    },
    {
      id: 'mount',
      index: '08',
      name: '磁吸快拆底座',
      en: 'MAGNETIC QUICK-RELEASE',
      accent: '#f3b469',
      icon: 'mount',
      anchor: { x: 0.1, y: -2.35, z: 1.08 },
      explode: { x: 0.9, y: -2.05, z: -0.1 },
      explodeRot: { x: 0.05, y: -0.12, z: 0 },
      labelSpec: 'MAGNETIC · QUICK RELEASE',
      description: '底部磁吸快拆系统，与 DJI 快拆生态配件快速连接。内置磁吸定位与机械锁止结构，兼顾安装速度与稳定性。',
      specs: [
        { k: '接口', v: '磁吸快拆' },
        { k: '安装方式', v: '快速锁止' },
        { k: '兼容', v: 'DJI 快拆生态' },
        { k: '底盘', v: '金属材质' }
      ],
      note: '磁吸定位配合机械锁扣，无需工具即可完成更换，适合头盔、胸带与车把等运动机位。',
      material: '磁钢 / 铝合金'
    }
  ];

  const OVERVIEW = {
    name: 'OSMO ACTION 5 PRO',
    en: 'FULL ASSEMBLY / TEARDOWN READY',
    description: '超旗舰画质运动相机。新一代 1/1.3 英寸传感器、双 OLED 高亮触摸屏与 4 小时续航，将专业影像能力收进 146 克的机身。',
    specs: [
      { k: '影像传感器', v: '1/1.3" CMOS' },
      { k: '最高视频', v: '4K / 120fps' },
      { k: '最长续航', v: '240', e: 'min' },
      { k: '裸机防水', v: '20', e: 'm' }
    ],
    note: '点击模型或左侧清单中的任一模块，即可沿装配轴展开设备并查看该部件的工程参数。',
    material: '146 g · 70.5 × 44.2 × 32.8 mm'
  };

  const ICONS = {
    display: '<svg viewBox="0 0 24 24"><rect x="4" y="4.5" width="16" height="15" rx="2"/><path d="M7.5 8.2h3M7.5 11h2M14 15.8h2.5"/><circle cx="15.8" cy="8.6" r="1.7"/></svg>',
    lens: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.2"/><circle cx="12" cy="12" r="1.8"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2"/></svg>',
    sensor: '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1.2"/><rect x="9" y="9" width="6" height="6" rx=".6"/><path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3"/></svg>',
    board: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="1.2"/><rect x="8" y="8" width="5" height="5" rx=".5"/><path d="M16 8h1.5M16 11h1.5M16 14h1.5M7 14h2.5M12 16h4"/><path d="M4 8H2.5M4 12H2.5M4 16H2.5"/></svg>',
    battery: '<svg viewBox="0 0 24 24"><rect x="3.5" y="7" width="15" height="10" rx="1.6"/><path d="M21 10v4M6.5 10.2h3.2M12 10.1l-1.4 4.1M14.5 10h2"/></svg>',
    frame: '<svg viewBox="0 0 24 24"><rect x="4.2" y="5.5" width="15.6" height="13" rx="3"/><circle cx="14.8" cy="10.4" r="2.5"/><rect x="7" y="8.5" width="4.1" height="3.4" rx="1"/><path d="M8.5 18.5v1.5M15.5 18.5v1.5"/></svg>',
    mount: '<svg viewBox="0 0 24 24"><path d="M5 7.5h14v3.3H5zM7.5 10.8v4.4M16.5 10.8v4.4"/><circle cx="12" cy="12" r="2.7"/><path d="M4 18.8h16"/></svg>',
    camera: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="2.6"/><circle cx="15.5" cy="11.2" r="3.4"/><rect x="6.3" y="8.4" width="4.8" height="4.2" rx="1"/><path d="M7 18.5h10"/></svg>'
  };

  const viewPresets = {
    hero: { theta: 0.62, phi: 1.2, label: '3/4' },
    front: { theta: 0.02, phi: 1.46, label: '前视' },
    top: { theta: 0.22, phi: 0.38, label: '顶部' },
    rear: { theta: Math.PI - 0.08, phi: 1.34, label: '后视' }
  };

  const state = {
    exploded: false,
    selected: null,
    hovered: null,
    labels: true,
    autoRotate: true,
    tour: false,
    view: 'hero',
    mobilePartsOpen: false,
    mobileDetailOpen: false,
    dragging: false,
    pinching: false,
    pointerDown: false,
    moved: false,
    lastInteraction: 0,
    started: false,
    ready: false,
    focused: false,
    reducedMotion: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  if (state.reducedMotion) state.autoRotate = false;

  const dom = {
    app: $('#app'),
    canvas: $('#scene-canvas'),
    loader: $('#loader'),
    loaderBar: $('#loaderBar'),
    loaderPct: $('#loaderPct'),
    loaderStatus: $('#loaderStatus'),
    loaderFallback: $('#loaderFallback'),
    componentList: $('#componentList'),
    detailContent: $('#detailContent'),
    labelLayer: $('#labelLayer'),
    leaderSvg: $('#leaderSvg'),
    centerGuide: $('#centerGuide'),
    explodeBtn: $('#explodeBtn'),
    explodeLabel: $('#explodeLabel'),
    explodeSub: $('#explodeSub'),
    mobileExplodeLabel: $('#mobileExplodeLabel'),
    autoRotateBtn: $('#autoRotateBtn'),
    tourBtn: $('#tourBtn'),
    labelsBtn: $('#labelsBtn'),
    resetBtn: $('#resetBtn'),
    mobilePartsBtn: $('#mobilePartsBtn'),
    mobileDetailBtn: $('#mobileDetailBtn'),
    mobileExplodeBtn: $('#mobileExplodeBtn'),
    fullscreenBtn: $('#fullscreenBtn'),
    helpBtn: $('#helpBtn'),
    helpModal: $('#helpModal'),
    helpCloseBtn: $('#helpCloseBtn'),
    toast: $('#toast'),
    fpsInline: $('#fpsInline')
  };

  const labels = {};
  const leaders = {};
  const partGroups = {};
  const partMaterials = {};
  const pickMeshes = [];

  let scene, camera, renderer, composer, bloomPass, clock;
  let deviceGroup, floorGroup, particleGroup;
  let envTexture, raycaster, pointerNdc;
  let selectionGroup, selectionBox, selectionGlow, selectionLight, selectionLabel;
  let animationId = 0;
  let width = 0;
  let height = 0;
  let frameCount = 0;
  let fpsTime = 0;
  let elapsed = 0;
  let toastTimer = 0;
  let tourTimer = 0;
  let tourIndex = -1;
  let readyAt = 0;

  const orbit = {
    theta: 0.62,
    phi: 1.2,
    radius: 16.5,
    target: { x: 0, y: 0.36, z: 0 },
    goalTheta: 0.62,
    goalPhi: 1.2,
    goalRadius: 16.5,
    goalTarget: { x: 0, y: 0.36, z: 0 },
    minPhi: 0.24,
    maxPhi: 1.53,
    zoom: 1,
    aspectFit: 1,
    lastDrag: 0
  };

  /* ------------------------------------------------------------
     SMALL UTILITIES
     ------------------------------------------------------------ */
  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function damp(current, target, lambda, dt) {
    return lerp(current, target, 1 - Math.exp(-lambda * dt));
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function isMobileLayout() {
    return window.innerWidth <= 980;
  }

  function setLoader(percent, text) {
    if (dom.loaderBar) dom.loaderBar.style.width = percent + '%';
    if (dom.loaderPct) dom.loaderPct.textContent = String(Math.round(percent)).padStart(2, '0') + ' %';
    if (text && dom.loaderStatus) dom.loaderStatus.textContent = text;
  }

  function showToast(message, duration) {
    if (!dom.toast) return;
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => dom.toast.classList.remove('is-visible'), duration || 2400);
  }

  function makeCanvas(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    return canvas;
  }

  function canvasTexture(canvas, options) {
    const opts = options || {};
    const texture = new THREE.CanvasTexture(canvas);
    texture.encoding = opts.linear ? THREE.LinearEncoding : THREE.sRGBEncoding;
    texture.anisotropy = renderer ? Math.min(8, renderer.capabilities.getMaxAnisotropy()) : 1;
    if (opts.repeat) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(opts.repeat[0], opts.repeat[1]);
    }
    if (opts.needsUpdate !== false) texture.needsUpdate = true;
    return texture;
  }

  function svgIcon(name) {
    return ICONS[name] || ICONS.camera;
  }

  function hexToColor(hex) {
    return new THREE.Color(hex);
  }

  /* ------------------------------------------------------------
     UI BUILDING
     ------------------------------------------------------------ */
  function buildComponentList() {
    dom.componentList.innerHTML = PARTS.map((part) => (
      '<button class="component-item" type="button" role="listitem" data-part="' + part.id + '" style="--item-accent:' + part.accent + '" aria-label="查看' + part.name + '部件详情">' +
        '<span class="item-num">' + part.index + '</span>' +
        '<span class="item-dot"></span>' +
        '<span class="item-text"><b>' + part.name + '</b><small>' + part.en + '</small></span>' +
        '<span class="item-chevron" aria-hidden="true">↗</span>' +
      '</button>'
    )).join('');

    $$('.component-item', dom.componentList).forEach((item) => {
      item.addEventListener('click', () => {
        stopTour(false);
        selectPart(item.dataset.part, { user: true, openMobileDetail: true });
      });
      item.addEventListener('pointerenter', () => setHovered(item.dataset.part));
      item.addEventListener('pointerleave', () => setHovered(null));
    });
  }

  function buildLabels() {
    const svgNs = 'http://www.w3.org/2000/svg';
    dom.leaderSvg.innerHTML = '';
    dom.labelLayer.innerHTML = '';

    PARTS.forEach((part) => {
      const group = document.createElementNS(svgNs, 'g');
      group.setAttribute('class', 'leader-group');
      group.dataset.part = part.id;

      const line = document.createElementNS(svgNs, 'line');
      line.setAttribute('class', 'leader-line');
      const dot = document.createElementNS(svgNs, 'circle');
      dot.setAttribute('class', 'leader-dot');
      dot.setAttribute('r', '2.5');

      group.appendChild(line);
      group.appendChild(dot);
      dom.leaderSvg.appendChild(group);
      leaders[part.id] = { group: group, line: line, dot: dot };

      const label = document.createElement('button');
      label.type = 'button';
      label.className = 'part-label';
      label.dataset.part = part.id;
      label.style.setProperty('--label-accent', part.accent);
      label.innerHTML =
        '<span class="label-num">' + part.index + '</span>' +
        '<span class="label-copy"><b>' + part.name + '</b><small>' + part.labelSpec + '</small></span>';
      label.addEventListener('click', (event) => {
        event.stopPropagation();
        stopTour(false);
        selectPart(part.id, { user: true, openMobileDetail: true });
      });
      label.addEventListener('pointerenter', () => setHovered(part.id));
      label.addEventListener('pointerleave', () => setHovered(null));
      dom.labelLayer.appendChild(label);
      labels[part.id] = { el: label, w: 150, h: 38, shown: false };
    });
  }

  function renderOverview() {
    dom.detailContent.style.setProperty('--detail-accent', 'var(--cyan)');
    dom.detailContent.innerHTML =
      '<div class="detail-topline"><span class="micro">SYSTEM OVERVIEW</span><span class="detail-code">A5P / ALL</span><button class="detail-close" type="button" aria-label="关闭详情">×</button></div>' +
      '<div class="detail-identity">' +
        '<div class="detail-index">A5</div>' +
        '<div class="detail-glyph">' + svgIcon('camera') + '</div>' +
      '</div>' +
      '<div class="detail-heading"><h2>' + OVERVIEW.name + '</h2><p>' + OVERVIEW.en + '</p></div>' +
      '<p class="detail-description">' + OVERVIEW.description + '</p>' +
      '<div class="overview-tag"><span></span>CLICK A MODULE TO EXPLODE</div>' +
      '<div class="detail-rule"></div>' +
      '<div class="spec-grid">' + OVERVIEW.specs.map((spec) => (
        '<div class="spec-cell"><span class="spec-key">' + spec.k + '</span><span class="spec-value">' + spec.v + (spec.e ? '<em>' + spec.e + '</em>' : '') + '</span></div>'
      )).join('') + '</div>' +
      '<div class="detail-note"><span class="note-label">OPERATING NOTE</span><p>' + OVERVIEW.note + '</p></div>' +
      '<div class="detail-footer"><div class="detail-material"><small>NET WEIGHT / DIMENSIONS</small><span>' + OVERVIEW.material + '</span></div></div>';
    dom.detailContent.classList.remove('content-enter');
    void dom.detailContent.offsetWidth;
    dom.detailContent.classList.add('content-enter');
    wireDetailClose();
  }

  function renderPartDetail(part) {
    dom.detailContent.style.setProperty('--detail-accent', part.accent);
    dom.detailContent.innerHTML =
      '<div class="detail-topline"><span class="micro">COMPONENT DETAIL</span><span class="detail-code">' + part.index + ' / 08</span><button class="detail-close" type="button" aria-label="关闭详情">×</button></div>' +
      '<div class="detail-identity">' +
        '<div class="detail-index">' + part.index + '</div>' +
        '<div class="detail-glyph">' + svgIcon(part.icon) + '</div>' +
      '</div>' +
      '<div class="detail-heading"><h2>' + part.name + '</h2><p>' + part.en + '</p></div>' +
      '<p class="detail-description">' + part.description + '</p>' +
      '<div class="detail-rule"></div>' +
      '<div class="spec-grid">' + part.specs.map((spec) => (
        '<div class="spec-cell"><span class="spec-key">' + spec.k + '</span><span class="spec-value">' + spec.v + (spec.e ? '<em>' + spec.e + '</em>' : '') + '</span></div>'
      )).join('') + '</div>' +
      '<div class="detail-note"><span class="note-label">ENGINEERING NOTE</span><p>' + part.note + '</p></div>' +
      '<div class="detail-footer">' +
        '<div class="detail-material"><small>MATERIAL / ASSEMBLY</small><span>' + part.material + '</span></div>' +
        '<button class="locate-btn" type="button" id="locateBtn">定位部件 <svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="4.4"/></svg></button>' +
      '</div>';
    dom.detailContent.classList.remove('content-enter');
    void dom.detailContent.offsetWidth;
    dom.detailContent.classList.add('content-enter');
    wireDetailClose();
    const locate = $('#locateBtn', dom.detailContent);
    if (locate) {
      locate.addEventListener('click', () => {
        focusPart(part);
      });
    }
  }

  function wireDetailClose() {
    const close = $('.detail-close', dom.detailContent);
    if (!close) return;
    close.addEventListener('click', () => {
      appCloseMobileDetail();
    });
  }

  function updateComponentActive() {
    $$('.component-item', dom.componentList).forEach((item) => {
      item.classList.toggle('is-active', item.dataset.part === state.selected);
      item.setAttribute('aria-current', item.dataset.part === state.selected ? 'true' : 'false');
    });
  }

  function updateExplodeUI() {
    const exploded = state.exploded;
    if (dom.explodeLabel) dom.explodeLabel.textContent = exploded ? '复原视图' : '拆解视图';
    if (dom.explodeSub) dom.explodeSub.textContent = exploded ? 'RECOMPOSE' : 'EXPLODE';
    if (dom.mobileExplodeLabel) dom.mobileExplodeLabel.textContent = exploded ? '复原' : '拆解';
    if (dom.explodeBtn) {
      dom.explodeBtn.classList.toggle('is-active', exploded);
      dom.explodeBtn.setAttribute('aria-pressed', exploded ? 'true' : 'false');
    }
    if (dom.centerGuide) dom.centerGuide.classList.toggle('is-hidden', exploded || !!state.selected);
  }

  function updateViewButtons() {
    $$('.view-btn').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.view === state.view));
  }

  function setHovered(id) {
    if (state.hovered === id) return;
    state.hovered = id;
    updatePartHighlights();
    updateCursor();
    updateLabelsVisibilityClasses();
  }

  function updateCursor() {
    if (!dom.canvas) return;
    dom.canvas.classList.toggle('is-hovering', !!state.hovered && !state.dragging);
    dom.canvas.classList.toggle('is-dragging', state.dragging);
  }

  function updateAutoRotateUI() {
    if (!dom.autoRotateBtn) return;
    dom.autoRotateBtn.classList.toggle('is-active', state.autoRotate);
    dom.autoRotateBtn.setAttribute('aria-pressed', state.autoRotate ? 'true' : 'false');
  }

  /* ------------------------------------------------------------
     3D — SETUP
     ------------------------------------------------------------ */
  function createEnvironmentTexture() {
    const size = 256;
    const faces = [];
    const palettes = [
      ['#111a1c', '#8fe9dd', '#1c292b'], // px
      ['#101112', '#6c4b36', '#111819'], // nx
      ['#e7faf5', '#8ec5ba', '#141e20'], // py
      ['#050708', '#0b1112', '#020303'], // ny
      ['#0b1113', '#b9fff3', '#1f2526'], // pz
      ['#0a1112', '#466c69', '#150f0d']  // nz
    ];

    for (let i = 0; i < 6; i += 1) {
      const canvas = makeCanvas(size, size);
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, palettes[i][0]);
      gradient.addColorStop(0.47, palettes[i][1]);
      gradient.addColorStop(1, palettes[i][2]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      const glow = ctx.createRadialGradient(size * 0.28, size * 0.18, 0, size * 0.28, size * 0.18, size * 0.7);
      glow.addColorStop(0, 'rgba(255,255,255,0.72)');
      glow.addColorStop(0.25, 'rgba(240,255,250,0.18)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      const strip = ctx.createLinearGradient(0, size * 0.48, 0, size * 0.79);
      strip.addColorStop(0, 'rgba(255,255,255,0)');
      strip.addColorStop(0.5, 'rgba(211,255,247,0.22)');
      strip.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = strip;
      ctx.fillRect(0, size * 0.48, size, size * 0.31);

      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(0, size * 0.83, size, size * 0.17);
      faces.push(canvas);
    }

    const texture = new THREE.CubeTexture(faces);
    texture.encoding = THREE.sRGBEncoding;
    texture.needsUpdate = true;
    return texture;
  }

  function initScene() {
    renderer = new THREE.WebGLRenderer({
      canvas: dom.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    renderer.setClearColor(0x030506, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileLayout() ? 1.6 : 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.94;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030506);
    scene.fog = new THREE.FogExp2(0x030506, 0.015);

    camera = new THREE.PerspectiveCamera(32, 1, 0.1, 120);
    envTexture = createEnvironmentTexture();
    scene.environment = envTexture;

    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    orbit.aspectFit = getAspectFit();
    orbit.radius = 16.5 * orbit.aspectFit;
    orbit.goalRadius = orbit.radius;
    camera.updateProjectionMatrix();

    raycaster = new THREE.Raycaster();
    pointerNdc = new THREE.Vector2();
    clock = new THREE.Clock();

    addLights();
    createFloor();
    createParticles();
    createSelectionHelpers();
    setupComposer();
  }

  function getAspectFit() {
    const aspect = window.innerWidth / window.innerHeight;
    if (window.innerWidth > 980 && window.innerWidth <= 1120) return 1.16;
    if (aspect >= 1.25) return 1;
    if (aspect >= 1.0) return 1.08;
    if (aspect >= 0.78) return 1.26;
    if (aspect >= 0.58) return 1.54;
    return 1.92;
  }

  function addLights() {
    const hemi = new THREE.HemisphereLight(0xa8ebe0, 0x050708, 0.26);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xf0fbf7, 1.45);
    key.position.set(8, 12, 10);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 35;
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 12;
    key.shadow.camera.bottom = -10;
    key.shadow.bias = -0.00045;
    key.shadow.normalBias = 0.03;
    scene.add(key);
    scene.userData.keyLight = key;

    const fill = new THREE.DirectionalLight(0x7ce9df, 0.56);
    fill.position.set(-9, 2.5, 6);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffa56f, 0.72);
    rim.position.set(4, 3, -10);
    scene.add(rim);

    const cyanPoint = new THREE.PointLight(0x64f7e4, 0.72, 20, 2);
    cyanPoint.position.set(-6, 0.2, 7);
    scene.add(cyanPoint);

    const warmPoint = new THREE.PointLight(0xff8e59, 0.38, 16, 2);
    warmPoint.position.set(7, -3, -5);
    scene.add(warmPoint);

    const bottomGlow = new THREE.PointLight(0x1cead2, 0.8, 9, 2);
    bottomGlow.position.set(0, -3.6, 1);
    scene.add(bottomGlow);
  }

  function makeFloorTexture() {
    const size = 1400;
    const canvas = makeCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2;

    const radial = ctx.createRadialGradient(cx, cy, size * 0.04, cx, cy, size * 0.5);
    radial.addColorStop(0, 'rgba(89, 219, 198, 0)');
    radial.addColorStop(0.42, 'rgba(61, 165, 152, 0.02)');
    radial.addColorStop(0.72, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, size, size);

    // concentric technical rings
    ctx.strokeStyle = 'rgba(110, 242, 221, 0.24)';
    ctx.lineWidth = 1;
    [0.11, 0.155, 0.23, 0.25, 0.36, 0.38].forEach((r, i) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r * size, 0, Math.PI * 2);
      ctx.globalAlpha = i > 3 ? 0.42 : 0.7;
      ctx.setLineDash(i === 2 ? [2, 9] : i === 4 ? [1, 7] : []);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // radial ticks
    ctx.globalAlpha = 0.48;
    for (let i = 0; i < 120; i += 1) {
      const angle = (i / 120) * Math.PI * 2;
      const inner = size * 0.253;
      const outer = size * (i % 10 === 0 ? 0.278 : 0.262);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
      ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
      ctx.strokeStyle = i % 10 === 0 ? 'rgba(162, 255, 240, 0.4)' : 'rgba(91, 208, 191, 0.24)';
      ctx.stroke();
    }

    // sparse crosshair marks
    ctx.globalAlpha = 0.35;
    ctx.strokeStyle = 'rgba(138, 251, 233, 0.42)';
    [-0.34, 0.34].forEach((offset) => {
      ctx.beginPath();
      ctx.moveTo(cx + offset * size - 16, cy);
      ctx.lineTo(cx + offset * size + 16, cy);
      ctx.moveTo(cx + offset * size, cy - 16);
      ctx.lineTo(cx + offset * size, cy + 16);
      ctx.stroke();
    });

    ctx.globalAlpha = 0.2;
    ctx.font = '10px Consolas, monospace';
    ctx.fillStyle = 'rgba(175, 255, 243, 0.7)';
    const captions = [
      ['ORBIT // 00', cx + 80, cy - 172],
      ['A5P / MG-01', cx - 180, cy + 158],
      ['146 G', cx + 300, cy + 42]
    ];
    captions.forEach((cap) => ctx.fillText(cap[0], cap[1], cap[2]));

    const texture = canvasTexture(canvas);
    return texture;
  }

  function createFloor() {
    floorGroup = new THREE.Group();
    floorGroup.position.y = -5.35;
    scene.add(floorGroup);

    const floorGeo = new THREE.CircleGeometry(13, 96);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x060a0b,
      metalness: 0.72,
      roughness: 0.36,
      envMap: envTexture,
      envMapIntensity: 0.4,
      transparent: true,
      opacity: 0.94
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    floorGroup.add(floor);

    const ringPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshBasicMaterial({
        map: makeFloorTexture(),
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false
      })
    );
    ringPlane.rotation.x = -Math.PI / 2;
    ringPlane.position.y = 0.012;
    ringPlane.renderOrder = 2;
    floorGroup.add(ringPlane);

    const glowCanvas = makeCanvas(512, 512);
    const gctx = glowCanvas.getContext('2d');
    const grad = gctx.createRadialGradient(256, 256, 14, 256, 256, 252);
    grad.addColorStop(0, 'rgba(84, 255, 229, 0.22)');
    grad.addColorStop(0.3, 'rgba(33, 160, 145, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 512, 512);
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(10.5, 10.5),
      new THREE.MeshBasicMaterial({
        map: canvasTexture(glowCanvas),
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false
      })
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.02;
    floorGroup.add(glow);

    // floating thin rings for parallax / motion
    const arcMat = new THREE.MeshBasicMaterial({
      color: 0x63e9d5,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false
    });
    for (let i = 0; i < 2; i += 1) {
      const arc = new THREE.Mesh(new THREE.RingGeometry(4.1 + i * 1.45, 4.12 + i * 1.45, 128, 1, 0.3 + i * 1.7, Math.PI * 1.4), arcMat);
      arc.rotation.x = -Math.PI / 2;
      arc.position.y = 0.03 + i * 0.01;
      arc.userData.spin = 0.04 + i * 0.025;
      floorGroup.add(arc);
    }
  }

  function createParticles() {
    particleGroup = new THREE.Group();
    scene.add(particleGroup);

    const count = 260;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i += 1) {
      const radius = 3.2 + Math.random() * 13;
      const theta = Math.random() * Math.PI * 2;
      const y = -4.2 + Math.random() * 10.8;
      positions[i * 3] = Math.cos(theta) * radius * (0.45 + Math.random() * 0.75);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius * (0.45 + Math.random() * 0.75);
      sizes[i] = 0.018 + Math.random() * 0.045;
      color.set(Math.random() > 0.2 ? 0x86f5e6 : 0xe4c59c);
      color.toArray(colors, i * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      toneMapped: false
    });
    const points = new THREE.Points(geometry, material);
    particleGroup.add(points);

    const fineGeo = new THREE.BufferGeometry();
    const finePositions = new Float32Array(90 * 3);
    for (let i = 0; i < 90; i += 1) {
      finePositions[i * 3] = (Math.random() - 0.5) * 12;
      finePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      finePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    fineGeo.setAttribute('position', new THREE.BufferAttribute(finePositions, 3));
    const fine = new THREE.Points(fineGeo, new THREE.PointsMaterial({
      color: 0xc5fff7,
      size: 0.022,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false
    }));
    particleGroup.add(fine);
  }

  function makeGlowTexture() {
    const canvas = makeCanvas(256, 256);
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 50, 128, 128, 126);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.44, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.58, 'rgba(216,255,248,0.28)');
    gradient.addColorStop(0.67, 'rgba(149,255,238,0.42)');
    gradient.addColorStop(0.82, 'rgba(58,209,186,0.1)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return canvasTexture(canvas);
  }

  function createSelectionHelpers() {
    selectionGroup = new THREE.Group();
    const boxGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
    const boxMat = new THREE.LineBasicMaterial({
      color: 0x8effef,
      transparent: true,
      opacity: 0.36,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false
    });
    selectionBox = new THREE.LineSegments(boxGeo, boxMat);
    selectionGroup.add(selectionBox);
    selectionGroup.visible = false;
    selectionGroup.renderOrder = 5;
    scene.add(selectionGroup);

    selectionGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(),
      color: 0x7ffff0,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false
    }));
    selectionGlow.renderOrder = 20;
    selectionGlow.visible = false;
    scene.add(selectionGlow);

    selectionLight = new THREE.PointLight(0x75f7e2, 0, 6, 2);
    scene.add(selectionLight);
  }

  function setupComposer() {
    if (!THREE.EffectComposer || !THREE.RenderPass || !THREE.UnrealBloomPass) {
      composer = null;
      return;
    }
    composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);
    bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(width * 0.75, height * 0.75),
      isMobileLayout() ? 0.34 : 0.58,
      0.55,
      0.8
    );
    bloomPass.renderToScreen = true;
    composer.addPass(bloomPass);
    composer.setSize(width, height);
  }

  /* ------------------------------------------------------------
     GEOMETRY HELPERS
     ------------------------------------------------------------ */
  function roundedShape(w, h, radius) {
    const r = Math.min(radius, Math.min(w, h) / 2 - 0.001);
    const shape = new THREE.Shape();
    const x = -w / 2;
    const y = -h / 2;

    shape.moveTo(x + r, y);
    shape.lineTo(x + w - r, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + r);
    shape.lineTo(x + w, y + h - r);
    shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    shape.lineTo(x + r, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }

  function roundedBoxGeometry(w, h, d, radius, bevel) {
    const b = Math.min(bevel === undefined ? 0.025 : bevel, Math.min(w, h, d) * 0.16);
    const shape = roundedShape(w - b * 2, h - b * 2, radius - b);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(0.008, d - b * 2),
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: b,
      bevelThickness: b,
      curveSegments: 18
    });
    geometry.translate(0, 0, -d / 2 + b);
    geometry.computeVertexNormals();
    return geometry;
  }

  function roundedBox(w, h, d, radius, material, bevel) {
    const mesh = new THREE.Mesh(roundedBoxGeometry(w, h, d, radius, bevel), material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  function planeMesh(w, h, material, z) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    if (typeof z === 'number') mesh.position.z = z;
    return mesh;
  }

  function cylinderZ(radius, depth, material, segments) {
    const geometry = new THREE.CylinderGeometry(radius, radius, depth, segments || 64, 1, false);
    geometry.rotateX(Math.PI / 2);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  function torusZ(radius, tube, material, segments) {
    const geometry = new THREE.TorusGeometry(radius, tube, 12, segments || 96);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  function textTexture(lines, options) {
    const opts = options || {};
    const w = opts.width || 1024;
    const h = opts.height || 256;
    const canvas = makeCanvas(w, h);
    const ctx = canvas.getContext('2d');
    if (opts.background) {
      ctx.fillStyle = opts.background;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.textAlign = opts.align || 'center';
    ctx.textBaseline = 'middle';
    const centerX = opts.align === 'left' ? (opts.padding || 20) : w / 2;
    lines.forEach((line, i) => {
      ctx.font = (line.weight || 600) + ' ' + (line.size || 58) + 'px ' + (line.font || 'Bahnschrift, Arial Narrow, Arial');
      ctx.fillStyle = line.color || '#ffffff';
      if (line.letterSpacing && 'letterSpacing' in ctx) ctx.letterSpacing = line.letterSpacing;
      ctx.fillText(line.text, line.x === undefined ? centerX : line.x, line.y === undefined ? h / 2 : line.y);
    });
    return canvasTexture(canvas);
  }

  function drawCircularText(ctx, text, radius, startAngle, endAngle, options) {
    const opts = options || {};
    const chars = Array.from(text);
    const step = (endAngle - startAngle) / Math.max(1, chars.length - 1);
    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.fillStyle = opts.color || '#c5cfcd';
    ctx.font = (opts.weight || 500) + ' ' + (opts.size || 30) + 'px Bahnschrift, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.82)';
    ctx.shadowBlur = 5;
    chars.forEach((char, i) => {
      const angle = startAngle + step * i;
      ctx.save();
      ctx.translate(Math.cos(angle) * radius, Math.sin(angle) * radius);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
    ctx.restore();
  }

  function makeLensRingTexture() {
    const size = 1024;
    const canvas = makeCanvas(size, size);
    const ctx = canvas.getContext('2d');
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = 'rgba(196, 223, 218, 0.38)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 487, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 74, 56, 0.8)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, 462, 0, Math.PI * 2);
    ctx.stroke();

    drawCircularText(ctx, '1/1.3"    F 2.8    FOV 155°    DJI', 442, Math.PI * 1.01, Math.PI * 1.99, {
      color: 'rgba(255, 255, 255, 0.96)',
      size: 46,
      weight: 600
    });

    ctx.fillStyle = 'rgba(232, 246, 242, 0.74)';
    ctx.font = '500 23px Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('OSMO ACTION 5 PRO', cx, cy + 480);

    return canvasTexture(canvas);
  }

  function makeLogoTexture() {
    const canvas = makeCanvas(1024, 220);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1024, 220);
    ctx.textBaseline = 'middle';
    ctx.font = '600 88px Bahnschrift, Arial Narrow, Arial';
    ctx.fillStyle = '#dbe2e0';
    ctx.fillText('ACTION', 72, 118);
    ctx.fillStyle = '#ff4938';
    ctx.fillText('5', 455, 118);
    ctx.font = '500 34px Bahnschrift, Arial Narrow, Arial';
    ctx.fillStyle = '#cfd7d4';
    ctx.fillText('PRO', 525, 92);
    ctx.font = '500 15px Consolas, monospace';
    ctx.fillStyle = 'rgba(237, 246, 243, 0.4)';
    ctx.fillText('ULTRA-WIDE  /  155°', 535, 135);
    return canvasTexture(canvas);
  }

  function makeFrontScreenTexture() {
    const size = 640;
    const canvas = makeCanvas(size, size);
    const ctx = canvas.getContext('2d');
    const cx = size / 2;

    const sky = ctx.createLinearGradient(0, 0, 0, size);
    sky.addColorStop(0, '#0e3e78');
    sky.addColorStop(0.5, '#2c79b8');
    sky.addColorStop(1, '#76b6d8');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, size, size);

    const sun = ctx.createRadialGradient(size * 0.78, size * 0.22, 0, size * 0.78, size * 0.22, size * 0.33);
    sun.addColorStop(0, 'rgba(255,255,255,0.88)');
    sun.addColorStop(0.25, 'rgba(255,255,255,0.38)');
    sun.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sun;
    ctx.fillRect(0, 0, size, size);

    // distant mountain ridge
    ctx.fillStyle = '#7ab0c5';
    ctx.beginPath();
    ctx.moveTo(0, size * 0.58);
    ctx.lineTo(size * 0.16, size * 0.34);
    ctx.lineTo(size * 0.29, size * 0.5);
    ctx.lineTo(size * 0.43, size * 0.28);
    ctx.lineTo(size * 0.6, size * 0.54);
    ctx.lineTo(size * 0.78, size * 0.37);
    ctx.lineTo(size, size * 0.56);
    ctx.lineTo(size, size);
    ctx.lineTo(0, size);
    ctx.closePath();
    ctx.fill();

    // snowy foreground
    const snow = ctx.createLinearGradient(0, size * 0.48, 0, size);
    snow.addColorStop(0, '#eaf8fa');
    snow.addColorStop(0.55, '#b7dbe4');
    snow.addColorStop(1, '#7095ab');
    ctx.fillStyle = snow;
    ctx.beginPath();
    ctx.moveTo(0, size * 0.66);
    ctx.quadraticCurveTo(size * 0.18, size * 0.52, size * 0.33, size * 0.68);
    ctx.quadraticCurveTo(size * 0.52, size * 0.9, size * 0.72, size * 0.68);
    ctx.quadraticCurveTo(size * 0.88, size * 0.48, size, size * 0.66);
    ctx.lineTo(size, size);
    ctx.lineTo(0, size);
    ctx.closePath();
    ctx.fill();

    // a skier silhouette in motion
    ctx.save();
    ctx.translate(size * 0.43, size * 0.66);
    ctx.rotate(-0.34);
    ctx.fillStyle = '#0b1e2f';
    ctx.beginPath();
    ctx.ellipse(0, -60, 15, 19, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0b1e2f';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-2, -42);
    ctx.lineTo(-16, 20);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-2, -42);
    ctx.lineTo(36, 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-15, 20);
    ctx.lineTo(-58, 50);
    ctx.moveTo(-15, 20);
    ctx.lineTo(28, 60);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-46, 61);
    ctx.lineTo(70, 61);
    ctx.strokeWidth = 8;
    ctx.lineWidth = 7;
    ctx.stroke();
    // ski pole
    ctx.beginPath();
    ctx.moveTo(28, 4);
    ctx.lineTo(110, 66);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // snow spray
    ctx.fillStyle = 'rgba(255,255,255,0.78)';
    for (let i = 0; i < 18; i += 1) {
      const px = size * 0.38 + Math.random() * 110;
      const py = size * 0.74 + Math.random() * 60;
      ctx.beginPath();
      ctx.arc(px, py, 1.4 + Math.random() * 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // subtle UI grid and vignette
    ctx.strokeStyle = 'rgba(255,255,255,0.16)';
    ctx.lineWidth = 1;
    ctx.strokeRect(size * 0.07, size * 0.07, size * 0.86, size * 0.86);

    const vignette = ctx.createRadialGradient(cx, cx, size * 0.27, cx, cx, size * 0.7);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,6,12,0.42)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, size, size);

    // top status
    ctx.fillStyle = 'rgba(255,255,255,0.94)';
    ctx.font = '500 27px Bahnschrift, Arial';
    ctx.fillText('●', 36, 48);
    ctx.font = '500 25px Consolas, monospace';
    ctx.fillText('1h03m', 62, 48);
    // battery
    ctx.strokeStyle = 'rgba(255,255,255,0.82)';
    ctx.lineWidth = 3;
    ctx.strokeRect(size - 104, 27, 48, 24);
    ctx.fillRect(size - 50, 34, 6, 10);
    ctx.fillStyle = 'rgba(255,255,255,0.82)';
    ctx.fillRect(size - 98, 32, 34, 14);

    // bottom HUD
    const hud = ctx.createLinearGradient(0, size * 0.74, 0, size);
    hud.addColorStop(0, 'rgba(0,0,0,0)');
    hud.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = hud;
    ctx.fillRect(0, size * 0.68, size, size * 0.32);

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillRect(34, size - 84, 18, 28);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillRect(62, size - 84, 14, 28);
    ctx.font = '500 29px Consolas, monospace';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('4K30', 92, size - 61);
    ctx.font = '500 19px Bahnschrift, Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('/RS/UW', 178, size - 61);
    ctx.font = '500 26px Bahnschrift, Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.textAlign = 'right';
    ctx.fillText('1.0×', size - 40, size - 60);
    ctx.textAlign = 'left';

    // very faint scanline
    ctx.fillStyle = 'rgba(3, 16, 26, 0.07)';
    for (let y = 0; y < size; y += 4) ctx.fillRect(0, y, size, 1);

    return canvasTexture(canvas);
  }

  function makeRearScreenTexture() {
    const w = 1024;
    const h = 600;
    const canvas = makeCanvas(w, h);
    const ctx = canvas.getContext('2d');

    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#0a2440');
    sky.addColorStop(0.5, '#28658e');
    sky.addColorStop(1, '#94c4d2');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const sun = ctx.createRadialGradient(w * 0.66, h * 0.2, 0, w * 0.66, h * 0.2, w * 0.36);
    sun.addColorStop(0, 'rgba(255,255,255,0.95)');
    sun.addColorStop(0.2, 'rgba(255,227,182,0.5)');
    sun.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sun;
    ctx.fillRect(0, 0, w, h);

    // mountain silhouettes
    ctx.fillStyle = '#31566d';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.66);
    ctx.lineTo(w * 0.14, h * 0.39);
    ctx.lineTo(w * 0.25, h * 0.55);
    ctx.lineTo(w * 0.4, h * 0.3);
    ctx.lineTo(w * 0.56, h * 0.56);
    ctx.lineTo(w * 0.7, h * 0.37);
    ctx.lineTo(w * 0.86, h * 0.58);
    ctx.lineTo(w, h * 0.48);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    const snow = ctx.createLinearGradient(0, h * 0.55, 0, h);
    snow.addColorStop(0, '#eaf7f5');
    snow.addColorStop(0.52, '#bbd5d8');
    snow.addColorStop(1, '#648a99');
    ctx.fillStyle = snow;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.77);
    ctx.bezierCurveTo(w * 0.18, h * 0.62, w * 0.3, h * 0.8, w * 0.48, h * 0.68);
    ctx.bezierCurveTo(w * 0.67, h * 0.55, w * 0.79, h * 0.82, w, h * 0.66);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // small rider silhouette
    ctx.save();
    ctx.translate(w * 0.56, h * 0.61);
    ctx.fillStyle = '#0c1c25';
    ctx.beginPath();
    ctx.arc(0, -40, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0c1c25';
    ctx.beginPath();
    ctx.moveTo(-2, -27);
    ctx.lineTo(-31, 13);
    ctx.moveTo(-2, -27);
    ctx.lineTo(31, 9);
    ctx.moveTo(-31, 13);
    ctx.lineTo(-53, 34);
    ctx.moveTo(31, 9);
    ctx.lineTo(49, 35);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-65, 38);
    ctx.lineTo(52, 38);
    ctx.stroke();
    ctx.restore();

    const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, w * 0.62);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,5,10,0.4)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    // HUD grid
    ctx.strokeStyle = 'rgba(255,255,255,0.13)';
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 28, w - 64, h - 56);
    ctx.beginPath();
    ctx.moveTo(w / 3, 28);
    ctx.lineTo(w / 3, h - 28);
    ctx.moveTo((w / 3) * 2, 28);
    ctx.lineTo((w / 3) * 2, h - 28);
    ctx.moveTo(32, h / 3);
    ctx.lineTo(w - 32, h / 3);
    ctx.moveTo(32, (h / 3) * 2);
    ctx.lineTo(w - 32, (h / 3) * 2);
    ctx.globalAlpha = 0.25;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // center focus brackets
    ctx.strokeStyle = 'rgba(223, 255, 249, 0.9)';
    ctx.lineWidth = 3;
    const bx = w / 2;
    const by = h / 2;
    const b = 46;
    ctx.beginPath();
    ctx.moveTo(bx - b, by - b + 14);
    ctx.lineTo(bx - b, by - b);
    ctx.lineTo(bx - b + 14, by - b);
    ctx.moveTo(bx + b - 14, by - b);
    ctx.lineTo(bx + b, by - b);
    ctx.lineTo(bx + b, by - b + 14);
    ctx.moveTo(bx - b, by + b - 14);
    ctx.lineTo(bx - b, by + b);
    ctx.lineTo(bx - b + 14, by + b);
    ctx.moveTo(bx + b - 14, by + b);
    ctx.lineTo(bx + b, by + b);
    ctx.lineTo(bx + b, by + b - 14);
    ctx.stroke();

    // HUD text
    ctx.fillStyle = '#ff5746';
    ctx.beginPath();
    ctx.arc(49, 52, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '500 19px Consolas, monospace';
    ctx.fillText('REC', 66, 58);
    ctx.fillStyle = 'rgba(255,255,255,0.74)';
    ctx.fillText('00:12:48', 116, 58);

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.textAlign = 'right';
    ctx.font = '500 20px Bahnschrift, Arial';
    ctx.fillText('4K 120', w - 48, 57);
    ctx.font = '500 13px Consolas, monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.54)';
    ctx.fillText('10-BIT D-LOG M', w - 48, 79);
    ctx.textAlign = 'left';

    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.font = '500 15px Consolas, monospace';
    ctx.fillText('1/1200   ISO 100   2.8', 46, h - 46);
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('87%', w - 48, h - 46);
    // battery outline
    ctx.strokeStyle = 'rgba(255,255,255,0.72)';
    ctx.lineWidth = 2;
    ctx.strokeRect(w - 118, h - 59, 34, 16);
    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    ctx.fillRect(w - 114, h - 55, 24, 8);
    ctx.textAlign = 'left';

    // safety border and subtle scanline
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = 'rgba(4, 12, 16, 0.055)';
    for (let y = 0; y < h; y += 4) ctx.fillRect(0, y, w, 1);

    return canvasTexture(canvas);
  }

  function makePCBTexture() {
    const w = 1024;
    const h = 620;
    const canvas = makeCanvas(w, h);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#071a18';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#0a2420';
    ctx.fillRect(24, 24, w - 48, h - 48);

    // traces
    ctx.lineCap = 'round';
    for (let i = 0; i < 52; i += 1) {
      const startX = 40 + Math.random() * (w - 80);
      const startY = 40 + Math.random() * (h - 80);
      ctx.strokeStyle = 'rgba(176, 164, 94, 0.42)';
      ctx.lineWidth = Math.random() > 0.7 ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      let x = startX;
      let y = startY;
      for (let j = 0; j < 3; j += 1) {
        if (Math.random() > 0.5) x += (Math.random() - 0.5) * 180;
        else y += (Math.random() - 0.5) * 130;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = 'rgba(206, 185, 112, 0.55)';
      ctx.beginPath();
      ctx.arc(x, y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // pads
    for (let i = 0; i < 90; i += 1) {
      ctx.fillStyle = 'rgba(201, 184, 118, 0.5)';
      const x = 40 + Math.random() * (w - 80);
      const y = 40 + Math.random() * (h - 80);
      ctx.fillRect(x, y, 5 + Math.random() * 9, 5 + Math.random() * 4);
    }

    // silkscreen labels
    ctx.fillStyle = 'rgba(204, 241, 232, 0.36)';
    ctx.font = '16px Consolas, monospace';
    ctx.fillText('A5P-MB  REV.C', 48, 62);
    ctx.fillText('DJI 4NM AI SOC', 430, 100);
    ctx.fillText('WIFI 6 / BLE 5.1', 690, 548);
    ctx.fillText('64GB NAND', 70, 540);
    ctx.fillText('POWER DELIVERY', 580, 90);
    ctx.fillStyle = 'rgba(231, 244, 185, 0.38)';
    ctx.font = '11px Consolas, monospace';
    ctx.fillText('UART  /  MIPI  /  SPI', 320, 570);

    // mounting holes
    ctx.fillStyle = '#051312';
    [[56, 56], [w - 56, 56], [56, h - 56], [w - 56, h - 56]].forEach((p) => {
      ctx.beginPath();
      ctx.arc(p[0], p[1], 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(190, 167, 98, 0.6)';
      ctx.lineWidth = 3;
      ctx.stroke();
    });

    return canvasTexture(canvas);
  }

  function makeBatteryLabelTexture() {
    const w = 840;
    const h = 380;
    const canvas = makeCanvas(w, h);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#111715';
    ctx.fillRect(0, 0, w, h);
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, 'rgba(126, 219, 150, 0.12)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(255, 73, 56, 0.08)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(227, 243, 235, 0.24)';
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 30, w - 68, h - 60);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#eef7f1';
    ctx.font = '600 58px Bahnschrift, Arial Narrow, Arial';
    ctx.fillText('DJI  ACTION 5 PRO', 66, 112);
    ctx.fillStyle = 'rgba(205, 225, 214, 0.55)';
    ctx.font = '22px Consolas, monospace';
    ctx.fillText('INTELLIGENT FLIGHT BATTERY  /  Li-ion 1S', 68, 155);
    ctx.fillStyle = '#d9f58f';
    ctx.font = '600 72px Bahnschrift, Arial Narrow, Arial';
    ctx.fillText('1950', 68, 270);
    ctx.font = '500 28px Bahnschrift, Arial';
    ctx.fillStyle = 'rgba(217, 245, 143, 0.65)';
    ctx.fillText('mAh', 250, 268);
    ctx.fillStyle = 'rgba(225, 243, 233, 0.7)';
    ctx.font = '500 30px Consolas, monospace';
    ctx.fillText('7.5 Wh   3.87 V', 420, 266);
    ctx.font = '15px Consolas, monospace';
    ctx.fillStyle = 'rgba(198, 218, 205, 0.4)';
    ctx.fillText('25°C  MAX 240 MIN  /  1080P 24FPS', 68, 324);
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(220, 241, 226, 0.28)';
    ctx.font = '15px Consolas, monospace';
    ctx.fillText('MODEL OA5-B01', w - 66, 326);
    return canvasTexture(canvas);
  }

  function makeNoiseTexture() {
    const size = 256;
    const canvas = makeCanvas(size, size);
    const ctx = canvas.getContext('2d');
    const image = ctx.createImageData(size, size);
    for (let i = 0; i < image.data.length; i += 4) {
      const v = 95 + Math.random() * 70;
      image.data[i] = v;
      image.data[i + 1] = v;
      image.data[i + 2] = v;
      image.data[i + 3] = 255;
    }
    ctx.putImageData(image, 0, 0);
    return canvasTexture(canvas, { linear: true, repeat: [4, 4] });
  }

  function makeCarbonTexture() {
    const size = 512;
    const canvas = makeCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#181b1c';
    ctx.fillRect(0, 0, size, size);
    for (let y = -size; y < size * 2; y += 16) {
      for (let x = -size; x < size * 2; x += 16) {
        const dark = ((x / 16) + (y / 16)) % 2 === 0;
        ctx.fillStyle = dark ? 'rgba(55,60,61,0.16)' : 'rgba(0,0,0,0.08)';
        ctx.fillRect(x, y, 8, 8);
        ctx.fillRect(x + 8, y + 8, 8, 8);
        ctx.fillStyle = dark ? 'rgba(0,0,0,0.08)' : 'rgba(55,60,61,0.16)';
        ctx.fillRect(x + 8, y, 8, 8);
        ctx.fillRect(x, y + 8, 8, 8);
      }
    }
    return canvasTexture(canvas, { repeat: [2, 2] });
  }

  /* ------------------------------------------------------------
     MODEL BUILD
     ------------------------------------------------------------ */
  function registerPart(id, group, anchor) {
    group.name = 'part-' + id;
    group.userData.partId = id;
    group.position.set(0, 0, 0);
    deviceGroup.add(group);
    partGroups[id] = group;

    const anchorObj = new THREE.Object3D();
    anchorObj.position.set(anchor.x, anchor.y, anchor.z);
    group.add(anchorObj);
    group.userData.anchor = anchorObj;
    group.userData.baseMaterials = [];
    group.userData.explode = PARTS.find((p) => p.id === id).explode;
    group.userData.explodeRot = PARTS.find((p) => p.id === id).explodeRot;
    return group;
  }

  function addToPart(group, mesh) {
    group.add(mesh);
    mesh.userData.partId = group.userData.partId;
    if (mesh.geometry && mesh.isMesh) pickMeshes.push(mesh);
    mesh.traverse((child) => {
      if (child.isMesh) {
        child.userData.partId = group.userData.partId;
        child.castShadow = child.castShadow !== false;
        child.receiveShadow = true;
      }
    });
    return mesh;
  }

  function collectMaterials(group, id) {
    const materials = [];
    group.traverse((child) => {
      if (!child.isMesh || !child.material) return;
      const list = Array.isArray(child.material) ? child.material : [child.material];
      list.forEach((mat) => {
        if (mat && !materials.includes(mat)) {
          materials.push(mat);
          if (mat.emissive && !mat.userData.baseEmissive) {
            mat.userData.baseEmissive = mat.emissive.clone();
            mat.userData.baseEmissiveIntensity = mat.emissiveIntensity === undefined ? 1 : mat.emissiveIntensity;
          }
        }
      });
    });
    partMaterials[id] = materials;
  }

  function createMaterials() {
    const noise = makeNoiseTexture();
    const carbon = makeCarbonTexture();

    const shellMat = new THREE.MeshStandardMaterial({
      color: 0x111415,
      roughness: 0.7,
      metalness: 0.18,
      bumpMap: noise,
      bumpScale: 0.02,
      envMap: envTexture,
      envMapIntensity: 0.23
    });
    const frontPanelMat = new THREE.MeshStandardMaterial({
      color: 0x050708,
      roughness: 0.32,
      metalness: 0.38,
      envMap: envTexture,
      envMapIntensity: 0.42
    });

    return { shellMat, frontPanelMat, carbonMat: new THREE.MeshStandardMaterial({ color: 0x101314, roughness: 0.62, metalness: 0.24, map: carbon, bumpMap: noise, bumpScale: 0.012, envMap: envTexture, envMapIntensity: 0.2 }) };
  }

  function buildModel() {
    const mats = createMaterials();
    deviceGroup = new THREE.Group();
    deviceGroup.position.set(0, 0.4, 0);
    scene.add(deviceGroup);

    buildFrame(mats);
    buildFrontScreen();
    buildLens();
    buildSensor();
    buildRearScreen();
    buildMainboard();
    buildBattery();
    buildMount();

    Object.keys(partGroups).forEach((id) => collectMaterials(partGroups[id], id));
    updatePartHighlights();
  }

  function buildFrame(mats) {
    const group = registerPart('frame', new THREE.Group(), { x: -2.65, y: -1.92, z: 1.18 });

    const body = roundedBox(7.02, 4.38, 3.08, 0.62, mats.shellMat, 0.06);
    group.add(body);
    pickMeshes.push(body);
    body.userData.partId = 'frame';

    const frontPanel = roundedBox(6.91, 4.26, 0.16, 0.56, mats.frontPanelMat, 0.02);
    frontPanel.position.z = 1.52;
    group.add(frontPanel);
    pickMeshes.push(frontPanel);
    frontPanel.userData.partId = 'frame';

    const rearPanel = roundedBox(6.91, 4.26, 0.14, 0.56, mats.frontPanelMat, 0.02);
    rearPanel.position.z = -1.52;
    group.add(rearPanel);
    pickMeshes.push(rearPanel);
    rearPanel.userData.partId = 'frame';

    // top deck
    const topDeck = roundedBox(5.9, 0.25, 2.46, 0.5, new THREE.MeshStandardMaterial({
      color: 0x0d1011,
      roughness: 0.6,
      metalness: 0.28,
      bumpMap: mats.shellMat.bumpMap,
      bumpScale: 0.013,
      envMap: envTexture,
      envMapIntensity: 0.26
    }), 0.045);
    topDeck.position.set(0, 2.22, 0.06);
    group.add(topDeck);
    pickMeshes.push(topDeck);
    topDeck.userData.partId = 'frame';

    // front sockets
    const screenSocket = roundedBox(3.08, 2.78, 0.08, 0.3, new THREE.MeshStandardMaterial({
      color: 0x030405,
      roughness: 0.4,
      metalness: 0.35
    }), 0.015);
    screenSocket.position.set(-1.65, 0.4, 1.635);
    group.add(screenSocket);

    const lensSocket = torusZ(1.58, 0.035, new THREE.MeshStandardMaterial({
      color: 0x070809,
      roughness: 0.36,
      metalness: 0.6
    }), 96);
    lensSocket.position.set(1.55, 0.45, 1.615);
    group.add(lensSocket);

    const lensSocketInner = new THREE.Mesh(
      new THREE.CircleGeometry(1.55, 64),
      new THREE.MeshStandardMaterial({ color: 0x020303, roughness: 0.44, metalness: 0.3 })
    );
    lensSocketInner.position.set(1.55, 0.45, 1.629);
    group.add(lensSocketInner);

    // logo plate
    const logoMat = new THREE.MeshBasicMaterial({
      map: makeLogoTexture(),
      transparent: true,
      depthWrite: false,
      toneMapped: false
    });
    const logo = planeMesh(3.4, 0.72, logoMat, 0);
    logo.position.set(1.42, -1.48, 1.617);
    group.add(logo);

    // tiny product etching bottom
    const etch = textTexture([{ text: 'OSMO ACTION 5 PRO  ·  155° ULTRA-WIDE  ·  f/2.8', size: 26, color: 'rgba(225,235,233,0.32)', weight: 500 }], { width: 1200, height: 80 });
    const etchPlane = planeMesh(2.9, 0.19, new THREE.MeshBasicMaterial({ map: etch, transparent: true, depthWrite: false, toneMapped: false }), 0);
    etchPlane.position.set(-1.8, -1.92, 1.62);
    group.add(etchPlane);

    // four front screws
    const screwMat = new THREE.MeshStandardMaterial({ color: 0x777d7b, roughness: 0.3, metalness: 0.9, envMap: envTexture });
    [[-3.25, 1.93], [3.25, 1.93], [-3.25, -1.97], [3.25, -1.97]].forEach((pos) => {
      const screw = cylinderZ(0.065, 0.025, screwMat, 20);
      screw.position.set(pos[0], pos[1], 1.605);
      group.add(screw);
    });

    // side cover / interface bay
    const sideCoverMat = new THREE.MeshStandardMaterial({
      color: 0x111516,
      roughness: 0.58,
      metalness: 0.26,
      bumpMap: mats.shellMat.bumpMap,
      bumpScale: 0.009,
      envMap: envTexture,
      envMapIntensity: 0.26
    });
    const sideCover = roundedBox(2.58, 0.92, 0.17, 0.22, sideCoverMat, 0.025);
    sideCover.rotation.y = Math.PI / 2;
    sideCover.position.set(3.5, -0.25, 0.05);
    group.add(sideCover);
    pickMeshes.push(sideCover);
    sideCover.userData.partId = 'frame';

    const latch = roundedBox(0.36, 0.13, 0.21, 0.05, new THREE.MeshStandardMaterial({
      color: 0x111415,
      roughness: 0.42,
      metalness: 0.55
    }), 0.018);
    latch.rotation.y = Math.PI / 2;
    latch.position.set(3.53, -0.65, -0.93);
    group.add(latch);

    // side port details
    const usbMat = new THREE.MeshStandardMaterial({ color: 0x020303, roughness: 0.4, metalness: 0.35 });
    const usb = roundedBox(0.56, 0.18, 0.035, 0.07, usbMat, 0.01);
    usb.rotation.y = Math.PI / 2;
    usb.position.set(3.56, -0.49, 0.22);
    group.add(usb);
    const sd = roundedBox(0.38, 0.06, 0.03, 0.02, usbMat, 0.006);
    sd.rotation.y = Math.PI / 2;
    sd.position.set(3.56, -0.27, -0.75);
    group.add(sd);
    const portLabel = textTexture([
      { text: 'USB-C', size: 29, color: 'rgba(218,232,229,0.38)', weight: 500, y: 44 },
      { text: 'microSD', size: 23, color: 'rgba(218,232,229,0.25)', weight: 500, y: 82 }
    ], { width: 512, height: 120 });
    const portLabelPlane = planeMesh(0.95, 0.22, new THREE.MeshBasicMaterial({ map: portLabel, transparent: true, depthWrite: false, toneMapped: false }), 0);
    portLabelPlane.rotation.y = Math.PI / 2;
    portLabelPlane.position.set(3.572, -0.02, 0.2);
    group.add(portLabelPlane);

    // shutter & control buttons on top
    const buttonBaseMat = new THREE.MeshStandardMaterial({ color: 0x171a1b, roughness: 0.34, metalness: 0.6, envMap: envTexture });
    const recordBase = cylinderZ(0.38, 0.12, buttonBaseMat, 40);
    recordBase.rotation.x = -Math.PI / 2;
    recordBase.position.set(1.82, 2.3, 0.44);
    group.add(recordBase);
    const recordButton = cylinderZ(0.31, 0.1, new THREE.MeshStandardMaterial({
      color: 0x2a2321,
      roughness: 0.3,
      metalness: 0.5,
      envMap: envTexture
    }), 40);
    recordButton.rotation.x = -Math.PI / 2;
    recordButton.position.set(1.82, 2.39, 0.44);
    group.add(recordButton);
    const recordDot = new THREE.Mesh(
      new THREE.CircleGeometry(0.16, 32),
      new THREE.MeshBasicMaterial({ color: 0xff4938, toneMapped: false })
    );
    recordDot.rotation.x = -Math.PI / 2;
    recordDot.position.set(1.82, 2.445, 0.44);
    group.add(recordDot);

    const controlBase = cylinderZ(0.27, 0.09, buttonBaseMat, 32);
    controlBase.rotation.x = -Math.PI / 2;
    controlBase.position.set(-2.33, 2.3, 0.18);
    group.add(controlBase);
    const controlButton = cylinderZ(0.19, 0.08, new THREE.MeshStandardMaterial({
      color: 0x232829,
      roughness: 0.4,
      metalness: 0.45,
      envMap: envTexture
    }), 32);
    controlButton.rotation.x = -Math.PI / 2;
    controlButton.position.set(-2.33, 2.37, 0.18);
    group.add(controlButton);

    // mic holes
    const micMat = new THREE.MeshBasicMaterial({ color: 0x010202 });
    [[-0.72, 0.63], [-0.38, 0.63], [-0.04, 0.63], [0.3, 0.63]].forEach((p) => {
      const mic = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.022, 12), micMat);
      mic.position.set(p[0], 2.356, p[1]);
      group.add(mic);
    });
    // top speaker slots
    for (let i = 0; i < 5; i += 1) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.008, 0.035), micMat);
      slot.position.set(0.75 + i * 0.13, 2.35, 1.1);
      group.add(slot);
    }

    // top DJI mark
    const djiTop = textTexture([{ text: 'DJI', size: 64, color: 'rgba(228,238,235,0.38)', weight: 700 }], { width: 400, height: 180 });
    const djiTopPlane = planeMesh(0.6, 0.27, new THREE.MeshBasicMaterial({ map: djiTop, transparent: true, depthWrite: false, toneMapped: false }), 0);
    djiTopPlane.rotation.x = -Math.PI / 2;
    djiTopPlane.position.set(-2.55, 2.355, 0.2);
    group.add(djiTopPlane);

    // tiny orange status light
    const led = new THREE.Mesh(new THREE.CircleGeometry(0.045, 16), new THREE.MeshBasicMaterial({ color: 0xffa45c, toneMapped: false }));
    led.rotation.x = -Math.PI / 2;
    led.position.set(-0.95, 2.36, 1.08);
    group.add(led);

    // bottom seam / grip plate
    const bottomPlate = roundedBox(5.48, 0.14, 2.6, 0.35, new THREE.MeshStandardMaterial({
      color: 0x101313,
      roughness: 0.45,
      metalness: 0.5,
      envMap: envTexture
    }), 0.025);
    bottomPlate.position.y = -2.16;
    group.add(bottomPlate);

    // seam details on sides
    const sideSeamMat = new THREE.MeshBasicMaterial({ color: 0x060808, transparent: true, opacity: 0.55 });
    const sideSeam = new THREE.Mesh(new THREE.BoxGeometry(0.015, 2.4, 0.035), sideSeamMat);
    sideSeam.position.set(-3.515, 0, 0.42);
    group.add(sideSeam);

    collectMaterials(group, 'frame');
  }

  function buildFrontScreen() {
    const group = registerPart('front-screen', new THREE.Group(), { x: -1.65, y: 1.72, z: 1.84 });

    const bezel = roundedBox(2.96, 2.66, 0.15, 0.28, new THREE.MeshStandardMaterial({
      color: 0x080a0b,
      roughness: 0.24,
      metalness: 0.48,
      envMap: envTexture,
      envMapIntensity: 0.8
    }), 0.028);
    bezel.position.set(-1.65, 0.4, 1.7);
    group.add(bezel);
    pickMeshes.push(bezel);
    bezel.userData.partId = 'front-screen';

    const screenMat = new THREE.MeshBasicMaterial({
      map: makeFrontScreenTexture(),
      toneMapped: false
    });
    const screen = planeMesh(2.62, 2.32, screenMat, 1.783);
    screen.position.set(-1.65, 0.4, 1.783);
    group.add(screen);
    pickMeshes.push(screen);
    screen.userData.partId = 'front-screen';

    // glass reflection
    const reflectCanvas = makeCanvas(512, 512);
    const rctx = reflectCanvas.getContext('2d');
    const rgrad = rctx.createLinearGradient(0, 0, 512, 512);
    rgrad.addColorStop(0, 'rgba(255,255,255,0.14)');
    rgrad.addColorStop(0.2, 'rgba(255,255,255,0.02)');
    rgrad.addColorStop(0.52, 'rgba(255,255,255,0)');
    rgrad.addColorStop(1, 'rgba(140,237,226,0.11)');
    rctx.fillStyle = rgrad;
    rctx.fillRect(0, 0, 512, 512);
    rctx.strokeStyle = 'rgba(255,255,255,0.08)';
    rctx.lineWidth = 2;
    rctx.strokeRect(4, 4, 504, 504);
    const reflect = planeMesh(2.62, 2.32, new THREE.MeshBasicMaterial({
      map: canvasTexture(reflectCanvas),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false
    }), 1.79);
    reflect.position.set(-1.65, 0.4, 1.79);
    group.add(reflect);

    // bezel index and grip
    const bezelMark = textTexture([{ text: '1.46"', size: 55, color: 'rgba(223,235,232,0.32)', weight: 500 }], { width: 400, height: 100 });
    const mark = planeMesh(0.53, 0.14, new THREE.MeshBasicMaterial({ map: bezelMark, transparent: true, depthWrite: false, toneMapped: false }), 0);
    mark.position.set(-2.6, -0.93, 1.786);
    group.add(mark);

    // tiny status LED
    const led = new THREE.Mesh(new THREE.CircleGeometry(0.025, 16), new THREE.MeshBasicMaterial({ color: 0x78ffdf, toneMapped: false }));
    led.position.set(-0.33, 1.58, 1.787);
    group.add(led);

    collectMaterials(group, 'front-screen');
  }

  function buildLens() {
    const group = registerPart('lens', new THREE.Group(), { x: 1.55, y: 2.0, z: 1.9 });
    const cx = 1.55;
    const cy = 0.45;

    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0x131617,
      roughness: 0.4,
      metalness: 0.72,
      envMap: envTexture,
      envMapIntensity: 0.52
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x060708,
      roughness: 0.34,
      metalness: 0.5,
      envMap: envTexture,
      envMapIntensity: 0.38
    });
    const blackMat = new THREE.MeshStandardMaterial({
      color: 0x010202,
      roughness: 0.36,
      metalness: 0.25
    });
    const redMat = new THREE.MeshBasicMaterial({
      color: 0xff3a2a,
      toneMapped: false
    });

    // base collar
    const collar = cylinderZ(1.57, 0.19, barrelMat, 96);
    collar.position.set(cx, cy, 1.69);
    group.add(collar);
    pickMeshes.push(collar);
    collar.userData.partId = 'lens';

    const outerRidge = torusZ(1.56, 0.035, darkMat, 96);
    outerRidge.position.set(cx, cy, 1.8);
    group.add(outerRidge);
    pickMeshes.push(outerRidge);

    // knurled ring
    const knurlMat = new THREE.MeshStandardMaterial({
      color: 0x1b1f20,
      roughness: 0.48,
      metalness: 0.62,
      envMap: envTexture,
      envMapIntensity: 0.42
    });
    for (let i = 0; i < 64; i += 1) {
      const angle = (i / 64) * Math.PI * 2;
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.23), knurlMat);
      ridge.position.set(cx + Math.cos(angle) * 1.555, cy + Math.sin(angle) * 1.555, 1.91);
      ridge.rotation.z = angle;
      ridge.rotation.x = Math.PI / 8;
      ridge.castShadow = true;
      group.add(ridge);
    }

    const barrel = cylinderZ(1.48, 0.43, barrelMat, 96);
    barrel.position.set(cx, cy, 1.94);
    group.add(barrel);
    pickMeshes.push(barrel);
    barrel.userData.partId = 'lens';

    const frontBevel = torusZ(1.44, 0.065, darkMat, 96);
    frontBevel.position.set(cx, cy, 2.14);
    group.add(frontBevel);
    pickMeshes.push(frontBevel);

    const redRing = torusZ(1.285, 0.023, redMat, 96);
    redRing.position.set(cx, cy, 2.158);
    group.add(redRing);

    const ring1 = torusZ(1.17, 0.028, darkMat, 96);
    ring1.position.set(cx, cy, 2.157);
    group.add(ring1);
    pickMeshes.push(ring1);

    const innerCone = cylinderZ(1.08, 0.11, blackMat, 96);
    innerCone.position.set(cx, cy, 2.12);
    group.add(innerCone);
    pickMeshes.push(innerCone);

    const ring2 = torusZ(0.92, 0.035, darkMat, 96);
    ring2.position.set(cx, cy, 2.18);
    group.add(ring2);
    pickMeshes.push(ring2);

    const innerBarrel = cylinderZ(0.8, 0.1, blackMat, 96);
    innerBarrel.position.set(cx, cy, 2.16);
    group.add(innerBarrel);
    pickMeshes.push(innerBarrel);

    const glassMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        rimColor: { value: new THREE.Color(0x66ffe6) }
      },
      vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
        '  vUv = uv;',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec2 vUv;',
        'uniform float time;',
        'uniform vec3 rimColor;',
        'void main() {',
        '  vec2 p = vUv - 0.5;',
        '  float r = length(p) * 2.0;',
        '  float angle = atan(p.y, p.x);',
        '  vec3 base = mix(vec3(0.003, 0.006, 0.008), vec3(0.008, 0.028, 0.026), smoothstep(0.25, 1.0, r));',
        '  float iris = smoothstep(0.55, 0.0, r);',
        '  base += vec3(0.005, 0.014, 0.018) * iris;',
        '  float ring = exp(-pow((r - 0.58) * 13.0, 2.0));',
        '  base += vec3(0.06, 0.27, 0.23) * ring * 0.22;',
        '  float ring2 = exp(-pow((r - 0.72) * 18.0, 2.0));',
        '  base += vec3(0.12, 0.06, 0.22) * ring2 * 0.16;',
        '  float sweep = exp(-pow((p.x * 0.8 + p.y * 0.6 + 0.06) * 5.5, 2.0));',
        '  base += vec3(0.22, 0.58, 0.52) * sweep * (1.0 - smoothstep(0.2, 0.95, r)) * 0.22;',
        '  float highlight = exp(-pow((p.x + 0.16) * 16.0, 2.0) - pow((p.y - 0.2) * 10.0, 2.0));',
        '  base += vec3(0.62, 0.95, 0.86) * highlight * 0.34;',
        '  float highlight2 = exp(-pow((p.x - 0.22) * 20.0, 2.0) - pow((p.y + 0.23) * 22.0, 2.0));',
        '  base += vec3(0.2, 0.42, 0.37) * highlight2 * 0.12;',
        '  float sheen = exp(-pow((p.x - 0.24) * 7.0, 2.0) - pow((p.y + 0.03) * 4.5, 2.0));',
        '  base += vec3(0.12, 0.08, 0.24) * sheen * 0.2;',
        '  float edge = smoothstep(0.92, 1.0, r);',
        '  base += rimColor * edge * 0.12;',
        '  gl_FragColor = vec4(base, 1.0);',
        '}'
      ].join('\n'),
      toneMapped: false
    });
    const glass = new THREE.Mesh(new THREE.CircleGeometry(0.91, 96), glassMat);
    glass.position.set(cx, cy, 2.228);
    group.add(glass);
    pickMeshes.push(glass);
    glass.userData.partId = 'lens';

    // glass surface protection ring
    const glassRing = torusZ(0.925, 0.012, new THREE.MeshBasicMaterial({ color: 0x5f8d85, transparent: true, opacity: 0.3, toneMapped: false }), 96);
    glassRing.position.set(cx, cy, 2.23);
    group.add(glassRing);

    // ring text
    const ringText = new THREE.Mesh(
      new THREE.CircleGeometry(1.4, 96),
      new THREE.MeshBasicMaterial({
        map: makeLensRingTexture(),
        transparent: true,
        depthWrite: false,
        depthTest: false,
        toneMapped: false,
        side: THREE.FrontSide
      })
    );
    ringText.position.set(cx, cy, 2.236);
    ringText.renderOrder = 4;
    group.add(ringText);

    group.userData.glassMat = glassMat;
    collectMaterials(group, 'lens');
  }

  function buildSensor() {
    const group = registerPart('sensor', new THREE.Group(), { x: 1.62, y: 1.6, z: 0.95 });

    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x0b2d27,
      roughness: 0.52,
      metalness: 0.35,
      envMap: envTexture,
      envMapIntensity: 0.6
    });
    const pcb = roundedBox(2.48, 2.18, 0.09, 0.12, boardMat, 0.012);
    pcb.position.set(1.55, 0.45, 0.98);
    group.add(pcb);
    pickMeshes.push(pcb);
    pcb.userData.partId = 'sensor';

    const pcbFace = planeMesh(2.38, 2.08, new THREE.MeshBasicMaterial({
      map: makePCBTexture(),
      toneMapped: false
    }), 0);
    pcbFace.position.set(1.55, 0.45, 1.031);
    group.add(pcbFace);
    pickMeshes.push(pcbFace);
    pcbFace.userData.partId = 'sensor';

    // sensor die and gold frame
    const sensorFrame = roundedBox(1.62, 1.5, 0.08, 0.03, new THREE.MeshStandardMaterial({
      color: 0xc7a75c,
      roughness: 0.28,
      metalness: 0.9,
      envMap: envTexture
    }), 0.01);
    sensorFrame.position.set(1.55, 0.62, 1.06);
    group.add(sensorFrame);

    const sensorGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x181b2b,
      roughness: 0.06,
      metalness: 0.55,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMap: envTexture,
      envMapIntensity: 1.6
    });
    const sensorDie = roundedBox(1.18, 1.08, 0.075, 0.018, sensorGlassMat, 0.008);
    sensorDie.position.set(1.55, 0.62, 1.105);
    group.add(sensorDie);
    pickMeshes.push(sensorDie);
    sensorDie.userData.partId = 'sensor';

    const sensorShine = new THREE.Mesh(new THREE.CircleGeometry(0.36, 48), new THREE.MeshBasicMaterial({
      color: 0x76fff0,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    }));
    sensorShine.position.set(1.4, 0.85, 1.15);
    group.add(sensorShine);

    // connector flex and small components
    const flexMat = new THREE.MeshStandardMaterial({ color: 0x8b5f2a, roughness: 0.55, metalness: 0.2 });
    const flex = roundedBox(0.15, 0.7, 0.03, 0.02, flexMat, 0.005);
    flex.position.set(2.36, -0.45, 1.05);
    flex.rotation.z = -0.28;
    group.add(flex);

    const capMat = new THREE.MeshStandardMaterial({ color: 0x2f3436, roughness: 0.4, metalness: 0.65, envMap: envTexture });
    for (let i = 0; i < 5; i += 1) {
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.05, 0.045), capMat);
      cap.position.set(0.65 + i * 0.15, -0.1 + (i % 2) * 0.12, 1.075);
      group.add(cap);
    }

    collectMaterials(group, 'sensor');
  }

  function buildRearScreen() {
    const group = registerPart('rear-screen', new THREE.Group(), { x: 0.6, y: 1.68, z: -1.84 });

    const bezel = roundedBox(6.24, 3.72, 0.16, 0.36, new THREE.MeshStandardMaterial({
      color: 0x060809,
      roughness: 0.24,
      metalness: 0.45,
      envMap: envTexture,
      envMapIntensity: 0.6
    }), 0.025);
    bezel.position.set(0, 0.13, -1.7);
    group.add(bezel);
    pickMeshes.push(bezel);
    bezel.userData.partId = 'rear-screen';

    const screenMat = new THREE.MeshBasicMaterial({
      map: makeRearScreenTexture(),
      toneMapped: false
    });
    const screen = planeMesh(5.88, 3.34, screenMat, 0);
    screen.rotation.y = Math.PI;
    screen.position.set(0, 0.13, -1.786);
    group.add(screen);
    pickMeshes.push(screen);
    screen.userData.partId = 'rear-screen';

    const reflectCanvas = makeCanvas(512, 320);
    const rctx = reflectCanvas.getContext('2d');
    const rgrad = rctx.createLinearGradient(0, 0, 512, 320);
    rgrad.addColorStop(0, 'rgba(255,255,255,0.12)');
    rgrad.addColorStop(0.25, 'rgba(255,255,255,0)');
    rgrad.addColorStop(0.8, 'rgba(255,255,255,0)');
    rgrad.addColorStop(1, 'rgba(121,244,225,0.1)');
    rctx.fillStyle = rgrad;
    rctx.fillRect(0, 0, 512, 320);
    const reflect = planeMesh(5.88, 3.34, new THREE.MeshBasicMaterial({
      map: canvasTexture(reflectCanvas),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false
    }), 0);
    reflect.rotation.y = Math.PI;
    reflect.position.set(0, 0.13, -1.792);
    group.add(reflect);

    const led = new THREE.Mesh(new THREE.CircleGeometry(0.035, 16), new THREE.MeshBasicMaterial({ color: 0x78ffdf, toneMapped: false }));
    led.rotation.y = Math.PI;
    led.position.set(-2.7, 1.82, -1.79);
    group.add(led);

    const rearLogo = textTexture([{ text: 'DJI', size: 42, color: 'rgba(196,210,207,0.24)', weight: 700 }], { width: 260, height: 100 });
    const logoPlane = planeMesh(0.34, 0.13, new THREE.MeshBasicMaterial({ map: rearLogo, transparent: true, depthWrite: false, toneMapped: false }), 0);
    logoPlane.rotation.y = Math.PI;
    logoPlane.position.set(2.78, -1.74, -1.79);
    group.add(logoPlane);

    collectMaterials(group, 'rear-screen');
  }

  function buildMainboard() {
    const group = registerPart('mainboard', new THREE.Group(), { x: 0.05, y: 1.55, z: -0.6 });

    const pcb = roundedBox(5.0, 3.12, 0.11, 0.08, new THREE.MeshStandardMaterial({
      color: 0x071a18,
      roughness: 0.5,
      metalness: 0.32,
      envMap: envTexture,
      envMapIntensity: 0.55
    }), 0.014);
    pcb.position.set(0, 0, -0.52);
    group.add(pcb);
    pickMeshes.push(pcb);
    pcb.userData.partId = 'mainboard';

    const pcbTex = makePCBTexture();
    const face = planeMesh(4.9, 3.02, new THREE.MeshBasicMaterial({ map: pcbTex, toneMapped: false }), 0);
    face.position.set(0, 0, -0.462);
    group.add(face);
    pickMeshes.push(face);
    face.userData.partId = 'mainboard';

    // main SoC
    const socBase = roundedBox(1.55, 1.55, 0.1, 0.05, new THREE.MeshStandardMaterial({
      color: 0x111516,
      roughness: 0.38,
      metalness: 0.7,
      envMap: envTexture
    }), 0.012);
    socBase.position.set(0.55, 0.38, -0.39);
    group.add(socBase);
    pickMeshes.push(socBase);
    socBase.userData.partId = 'mainboard';

    const soc = roundedBox(1.22, 1.22, 0.1, 0.035, new THREE.MeshStandardMaterial({
      color: 0x2b3132,
      roughness: 0.4,
      metalness: 0.82,
      envMap: envTexture,
      envMapIntensity: 0.55
    }), 0.012);
    soc.position.set(0.55, 0.38, -0.33);
    group.add(soc);
    pickMeshes.push(soc);
    soc.userData.partId = 'mainboard';

    const socLabel = textTexture([
      { text: 'DJI', size: 46, color: '#aeb9b6', weight: 700, y: 46 },
      { text: '4nm', size: 28, color: 'rgba(200,224,219,0.56)', weight: 500, y: 84 }
    ], { width: 512, height: 128, background: '#343a3b' });
    const socTop = planeMesh(1.06, 0.32, new THREE.MeshBasicMaterial({ map: socLabel, toneMapped: false }), 0);
    socTop.position.set(0.55, 0.38, -0.276);
    group.add(socTop);
    pickMeshes.push(socTop);
    socTop.userData.partId = 'mainboard';

    // shield cans
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x3b4140,
      roughness: 0.45,
      metalness: 0.82,
      envMap: envTexture,
      envMapIntensity: 0.48
    });
    const shield1 = roundedBox(1.25, 0.9, 0.12, 0.035, shieldMat, 0.012);
    shield1.position.set(-1.6, 0.75, -0.42);
    group.add(shield1);
    pickMeshes.push(shield1);
    shield1.userData.partId = 'mainboard';
    const shield2 = roundedBox(1.4, 1.05, 0.1, 0.035, shieldMat, 0.012);
    shield2.position.set(1.9, -0.75, -0.43);
    group.add(shield2);
    pickMeshes.push(shield2);
    shield2.userData.partId = 'mainboard';

    // chips and passives
    const chipMat = new THREE.MeshStandardMaterial({ color: 0x1d2425, roughness: 0.42, metalness: 0.55, envMap: envTexture });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xb89453, roughness: 0.3, metalness: 0.9, envMap: envTexture });
    for (let i = 0; i < 22; i += 1) {
      const w = 0.08 + Math.random() * 0.18;
      const h = 0.05 + Math.random() * 0.1;
      const chip = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.035), i % 4 === 0 ? goldMat : chipMat);
      let x = -2.25 + Math.random() * 4.5;
      let y = -1.15 + Math.random() * 2.3;
      if (Math.abs(x - 0.55) < 0.8 && Math.abs(y - 0.38) < 0.9) {
        x = -2.1 + Math.random() * 0.8;
        y = 0.2 + Math.random() * 0.8;
      }
      chip.position.set(x, y, -0.44);
      group.add(chip);
    }

    // copper coil and connector
    const coil = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.09, 12, 36), goldMat);
    coil.position.set(-2.0, -0.82, -0.42);
    group.add(coil);
    const connector = roundedBox(0.55, 0.32, 0.1, 0.03, new THREE.MeshStandardMaterial({ color: 0xd2b16d, roughness: 0.35, metalness: 0.85 }), 0.01);
    connector.position.set(2.35, 1.05, -0.4);
    group.add(connector);

    // mounting holes
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x030606 });
    [[-2.4, -1.45], [2.4, -1.45], [-2.4, 1.45], [2.4, 1.45]].forEach((p) => {
      const hole = new THREE.Mesh(new THREE.CircleGeometry(0.08, 16), holeMat);
      hole.position.set(p[0], p[1], -0.455);
      group.add(hole);
    });

    collectMaterials(group, 'mainboard');
  }

  function buildBattery() {
    const group = registerPart('battery', new THREE.Group(), { x: -0.6, y: -0.22, z: 0.55 });

    const packMat = new THREE.MeshStandardMaterial({
      color: 0x1b201d,
      roughness: 0.54,
      metalness: 0.3,
      envMap: envTexture,
      envMapIntensity: 0.4
    });
    const pack = roundedBox(4.35, 1.92, 0.86, 0.17, packMat, 0.038);
    pack.position.set(-0.55, -0.8, 0.02);
    group.add(pack);
    pickMeshes.push(pack);
    pack.userData.partId = 'battery';

    const label = planeMesh(3.95, 1.65, new THREE.MeshBasicMaterial({
      map: makeBatteryLabelTexture(),
      toneMapped: false
    }), 0);
    label.position.set(-0.55, -0.8, 0.455);
    group.add(label);
    pickMeshes.push(label);
    label.userData.partId = 'battery';

    // contacts
    const contactMat = new THREE.MeshStandardMaterial({ color: 0xd0af62, roughness: 0.24, metalness: 0.95, envMap: envTexture });
    [-0.28, 0, 0.28].forEach((offset) => {
      const contact = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.035, 0.4), contactMat);
      contact.position.set(1.35 + offset, 0.2, 0.0);
      contact.rotation.x = 0.1;
      group.add(contact);
    });

    // battery latch and rails
    const latch = roundedBox(0.42, 0.24, 0.18, 0.035, new THREE.MeshStandardMaterial({
      color: 0x2c3330,
      roughness: 0.4,
      metalness: 0.55,
      envMap: envTexture
    }), 0.01);
    latch.position.set(-2.25, -0.42, 0.15);
    group.add(latch);

    const chargeLed = new THREE.Mesh(new THREE.CircleGeometry(0.04, 12), new THREE.MeshBasicMaterial({ color: 0xb6ff85, toneMapped: false }));
    chargeLed.position.set(-1.0, -0.06, 0.47);
    group.add(chargeLed);

    // small warning glyph
    const warn = textTexture([{ text: 'DO NOT PUNCTURE  /  KEEP DRY', size: 19, color: 'rgba(222,234,229,0.35)', weight: 500 }], { width: 700, height: 60 });
    const warnPlane = planeMesh(1.55, 0.12, new THREE.MeshBasicMaterial({ map: warn, transparent: true, depthWrite: false, toneMapped: false }), 0);
    warnPlane.position.set(-0.55, -1.55, 0.451);
    group.add(warnPlane);

    collectMaterials(group, 'battery');
  }

  function buildMount() {
    const group = registerPart('mount', new THREE.Group(), { x: 0.1, y: -2.35, z: 1.08 });

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x353b3a,
      roughness: 0.4,
      metalness: 0.82,
      envMap: envTexture,
      envMapIntensity: 0.6
    });
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x0c1010,
      roughness: 0.48,
      metalness: 0.65,
      envMap: envTexture,
      envMapIntensity: 0.32
    });
    const magnetMat = new THREE.MeshStandardMaterial({
      color: 0x0d1010,
      roughness: 0.46,
      metalness: 0.8,
      envMap: envTexture
    });

    const plate = roundedBox(4.9, 0.28, 2.45, 0.32, darkMetalMat, 0.045);
    plate.position.set(0, -2.28, 0);
    group.add(plate);
    pickMeshes.push(plate);
    plate.userData.partId = 'mount';

    const ring = torusZ(1.17, 0.12, metalMat, 64);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, -2.47, 0);
    group.add(ring);
    pickMeshes.push(ring);
    ring.userData.partId = 'mount';

    const magnet = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.12, 64), magnetMat);
    magnet.position.set(0, -2.5, 0);
    group.add(magnet);
    pickMeshes.push(magnet);
    magnet.userData.partId = 'mount';

    const centerScrew = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.11, 32), metalMat);
    centerScrew.position.set(0, -2.54, 0);
    group.add(centerScrew);

    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 1.2), new THREE.MeshBasicMaterial({ color: 0x030404 }));
    slot.position.set(0, -2.56, 0);
    group.add(slot);

    // side quick release tab
    const tab = roundedBox(0.7, 0.2, 0.74, 0.13, metalMat, 0.03);
    tab.position.set(2.6, -2.2, 0.36);
    group.add(tab);
    pickMeshes.push(tab);
    tab.userData.partId = 'mount';

    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.17, 0.12), metalMat);
    rail.position.set(-2.55, -2.2, -0.35);
    group.add(rail);

    // two alignment teeth
    const toothMat = new THREE.MeshStandardMaterial({ color: 0xb0b6b3, roughness: 0.28, metalness: 0.9, envMap: envTexture });
    [-0.55, 0.55].forEach((x) => {
      const tooth = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.16, 20), toothMat);
      tooth.position.set(x, -2.54, 0.88);
      group.add(tooth);
    });

    // engraving
    const engrave = textTexture([{ text: 'MAGNETIC QUICK-RELEASE  /  DJI', size: 25, color: 'rgba(218,232,228,0.44)', weight: 500 }], { width: 1000, height: 70 });
    const engravePlane = planeMesh(2.2, 0.15, new THREE.MeshBasicMaterial({ map: engrave, transparent: true, depthWrite: false, toneMapped: false }), 0);
    engravePlane.rotation.x = -Math.PI / 2;
    engravePlane.position.set(0, -2.415, -1.0);
    group.add(engravePlane);

    collectMaterials(group, 'mount');
  }

  /* ------------------------------------------------------------
     INTERACTION / STATE
     ------------------------------------------------------------ */
  function selectPart(id, options) {
    const opts = options || {};
    const part = PARTS.find((p) => p.id === id);
    if (!part) return;

    const wasSelected = state.selected === id;
    state.selected = id;
    state.hovered = null;
    updateComponentActive();
    renderPartDetail(part);
    updateExplodeUI();
    updateLabelsVisibilityClasses();
    updatePartHighlights();
    dom.app.classList.add('has-selection');
    if (opts.user) state.lastInteraction = performance.now();
    if (!state.exploded) {
      state.exploded = true;
      updateExplodeUI();
      setCameraForState(false);
      if (!opts.silent) showToast('已展开 ' + part.name + ' · 拖拽查看结构');
    } else if (!opts.silent) {
      showToast('已高亮 ' + part.name);
    }
    if (wasSelected && opts.locate) {
      focusPart(part);
    }
    if (isMobileLayout() && opts.openMobileDetail) {
      appOpenMobileDetail();
    }
    if (!wasSelected) {
      // subtly push the selection into frame without jumping
      if (state.focused) resetCameraTarget();
    }
    updateSelectionHelpers();
  }

  function clearSelection() {
    state.selected = null;
    updateComponentActive();
    renderOverview();
    dom.app.classList.remove('has-selection');
    updatePartHighlights();
    updateLabelsVisibilityClasses();
    selectionGroup.visible = false;
    selectionGlow.visible = false;
    selectionLight.intensity = 0;
    state.focused = false;
    resetCameraTarget();
  }

  function setExploded(exploded, options) {
    const opts = options || {};
    state.exploded = !!exploded;
    updateExplodeUI();
    setCameraForState();
    updateLabelsVisibilityClasses();
    if (!opts.silent) {
      showToast(state.exploded ? '拆解视图 · 点击部件查看工程参数' : '部件已沿装配轴归位');
    }
    if (!state.exploded) {
      state.focused = false;
      resetCameraTarget();
    }
    state.lastInteraction = performance.now();
  }

  function toggleExploded() {
    stopTour(false);
    setExploded(!state.exploded, { silent: false });
  }

  function setCameraForState(instant) {
    const fit = getAspectFit();
    const base = state.exploded ? 24.2 : 16.5;
    orbit.goalRadius = base * fit;
    orbit.radius = instant ? orbit.goalRadius : orbit.radius;
    orbit.goalTarget = { x: 0, y: state.exploded ? 0.45 : 0.36, z: 0 };
    if (!state.exploded) {
      orbit.zoom = 1;
    }
    if (!state.focused) orbit.goalTarget = { x: 0, y: state.exploded ? 0.45 : 0.36, z: 0 };
  }

  function resetCameraTarget() {
    state.focused = false;
    orbit.goalTarget = { x: 0, y: state.exploded ? 0.45 : 0.36, z: 0 };
    orbit.goalRadius = (state.exploded ? 24.2 : 16.5) * getAspectFit();
  }

  function resetAll() {
    stopTour(false);
    state.view = 'hero';
    state.autoRotate = true;
    state.labels = true;
    state.exploded = false;
    state.selected = null;
    state.hovered = null;
    state.focused = false;
    orbit.goalTheta = viewPresets.hero.theta;
    orbit.goalPhi = viewPresets.hero.phi;
    orbit.goalTarget = { x: 0, y: 0.36, z: 0 };
    orbit.goalRadius = 16.5 * getAspectFit();
    orbit.zoom = 1;
    state.lastInteraction = performance.now();
    updateAutoRotateUI();
    updateViewButtons();
    updateExplodeUI();
    updateComponentActive();
    renderOverview();
    updateLabelsVisibilityClasses();
    updatePartHighlights();
    dom.app.classList.remove('has-selection', 'mobile-detail-open', 'mobile-parts-open');
    dom.labelsBtn.classList.add('is-active');
    dom.labelsBtn.setAttribute('aria-pressed', 'true');
    selectionGroup.visible = false;
    selectionGlow.visible = false;
    selectionLight.intensity = 0;
    showToast('视角与装配状态已复位');
  }

  function focusPart(part) {
    const group = partGroups[part.id];
    if (!group) return;
    if (!state.exploded) setExploded(true, { silent: true });
    state.focused = true;
    showToast('正在定位 · ' + part.name);
    // Wait for the exploded layout to settle, then frame the selected module.
    const focusId = part.id;
    window.setTimeout(() => {
      if (state.selected !== focusId) return;
      const current = partGroups[focusId];
      if (!current) return;
      const box = new THREE.Box3().setFromObject(current);
      if (box.isEmpty()) return;
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const radius = Math.max(2.2, size.length() * 0.9);
      orbit.goalTarget = { x: center.x, y: center.y, z: center.z };
      orbit.goalRadius = clamp(radius * 2.9, 7.2, 18);
    }, 620);
  }

  function setView(name) {
    const preset = viewPresets[name];
    if (!preset) return;
    state.view = name;
    state.focused = false;
    orbit.goalTheta = preset.theta;
    orbit.goalPhi = preset.phi;
    orbit.goalTarget = { x: 0, y: state.exploded ? 0.45 : 0.36, z: 0 };
    orbit.goalRadius = (state.exploded ? 24.2 : 16.5) * getAspectFit();
    updateViewButtons();
    state.lastInteraction = performance.now();
    showToast('视角 / ' + viewPresets[name].label);
  }

  function setLabelsVisible(visible) {
    state.labels = !!visible;
    dom.labelsBtn.setAttribute('aria-pressed', state.labels ? 'true' : 'false');
    dom.labelsBtn.classList.toggle('is-active', state.labels);
    updateLabelsVisibilityClasses();
    showToast(state.labels ? '部件标注已开启' : '部件标注已关闭');
  }

  function updateLabelsVisibilityClasses() {
    PARTS.forEach((part) => {
      const label = labels[part.id];
      if (!label) return;
      const active = state.selected === part.id || state.hovered === part.id;
      label.el.classList.toggle('is-active', active);
      const leader = leaders[part.id];
      if (leader) leader.group.classList.toggle('is-active', active);
    });
    updateAnnotations();
  }

  function updatePartHighlights() {
    PARTS.forEach((part) => {
      const mats = partMaterials[part.id] || [];
      const selected = state.selected === part.id;
      const hovered = state.hovered === part.id;
      mats.forEach((mat) => {
        if (!mat || !mat.emissive) return;
        const base = mat.userData.baseEmissive || new THREE.Color(0x000000);
        const baseIntensity = mat.userData.baseEmissiveIntensity === undefined ? 1 : mat.userData.baseEmissiveIntensity;
        if (selected) {
          mat.emissive.copy(hexToColor(part.accent));
          mat.emissiveIntensity = 0.09;
        } else if (hovered) {
          mat.emissive.copy(hexToColor(part.accent));
          mat.emissiveIntensity = 0.035;
        } else {
          mat.emissive.copy(base);
          mat.emissiveIntensity = baseIntensity;
        }
      });
    });
  }

  function updateSelectionHelpers() {
    if (!state.selected) {
      selectionGroup.visible = false;
      selectionGlow.visible = false;
      selectionLight.intensity = 0;
      return;
    }
    const group = partGroups[state.selected];
    if (!group) return;
    const box = new THREE.Box3().setFromObject(group);
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const pad = 0.16;
    selectionGroup.visible = true;
    selectionBox.position.copy(center);
    selectionBox.scale.set(size.x + pad, size.y + pad, size.z + pad);
    selectionGlow.visible = true;
    selectionGlow.position.copy(center);
    const glowScale = Math.max(1.4, size.length() * 0.95);
    selectionGlow.scale.set(glowScale, glowScale, 1);
    selectionGlow.material.color.set(PARTS.find((p) => p.id === state.selected).accent);
    selectionLight.position.copy(center);
    selectionLight.color.set(0x6ff2dd);
    selectionLight.intensity = 0;
    if (state.hovered) updatePartHighlights();
  }

  /* ------------------------------------------------------------
     TOUR / MODALS / MOBILE
     ------------------------------------------------------------ */
  function appOpenMobileParts() {
    state.mobilePartsOpen = true;
    dom.app.classList.add('mobile-parts-open');
    dom.app.classList.remove('mobile-detail-open');
  }
  function appCloseMobileParts() {
    state.mobilePartsOpen = false;
    dom.app.classList.remove('mobile-parts-open');
  }
  function appOpenMobileDetail() {
    state.mobileDetailOpen = true;
    dom.app.classList.add('mobile-detail-open');
    dom.app.classList.remove('mobile-parts-open');
  }
  function appCloseMobileDetail() {
    state.mobileDetailOpen = false;
    dom.app.classList.remove('mobile-detail-open');
  }

  function stopTour(notify) {
    if (!state.tour) return;
    state.tour = false;
    window.clearTimeout(tourTimer);
    dom.tourBtn.classList.remove('is-active');
    dom.tourBtn.setAttribute('aria-pressed', 'false');
    if (notify) showToast('自动导览已停止');
  }

  function tourNext() {
    if (!state.tour) return;
    tourIndex = (tourIndex + 1) % PARTS.length;
    const part = PARTS[tourIndex];
    selectPart(part.id, { user: true, silent: true });
    setView('hero');
    if (state.autoRotate) {
      // wait for camera to settle; keep orbit mobile
    }
    window.clearTimeout(tourTimer);
    tourTimer = window.setTimeout(tourNext, 5600);
  }

  function toggleTour() {
    if (state.tour) {
      stopTour(true);
      return;
    }
    state.tour = true;
    dom.tourBtn.classList.add('is-active');
    dom.tourBtn.setAttribute('aria-pressed', 'true');
    if (!state.exploded) setExploded(true, { silent: true });
    state.autoRotate = true;
    updateAutoRotateUI();
    tourIndex = -1;
    showToast('自动导览已启动 · 每 5.6 秒切换一个部件');
    window.clearTimeout(tourTimer);
    tourTimer = window.setTimeout(tourNext, 900);
  }

  function toggleAutoRotate() {
    state.autoRotate = !state.autoRotate;
    updateAutoRotateUI();
    state.lastInteraction = performance.now();
    showToast(state.autoRotate ? '自动旋转已开启' : '自动旋转已暂停');
  }

  function openHelp() {
    dom.helpModal.classList.add('is-open');
    dom.helpModal.setAttribute('aria-hidden', 'false');
    dom.helpCloseBtn.focus({ preventScroll: true });
  }
  function closeHelp() {
    dom.helpModal.classList.remove('is-open');
    dom.helpModal.setAttribute('aria-hidden', 'true');
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      const request = document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : null;
      if (request && request.catch) request.catch(() => showToast('当前浏览器未允许全屏'));
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  /* ------------------------------------------------------------
     ANNOTATIONS
     ------------------------------------------------------------ */
  const projected = new THREE.Vector3();
  function updateAnnotations() {
    if (!labels || !dom.labelLayer) return;
    const mobile = isMobileLayout();
    const stageWidth = window.innerWidth;
    const stageHeight = window.innerHeight;
    const safeTop = mobile ? 82 : 104;
    const safeBottom = mobile ? stageHeight - 94 : stageHeight - 126;
    const partsPanel = $('.parts-panel');
    const detailPanel = $('.detail-panel');
    const leftPanelEdge = partsPanel && !mobile ? partsPanel.getBoundingClientRect().right : 8;
    const rightPanelEdge = detailPanel && !mobile ? detailPanel.getBoundingClientRect().left : stageWidth - 8;
    const leftLimit = mobile ? 12 : leftPanelEdge + 18;
    const rightLimit = mobile ? stageWidth - 12 : rightPanelEdge - 18;
    const groups = { '-1': [], '1': [] };

    PARTS.forEach((part) => {
      const label = labels[part.id];
      const leader = leaders[part.id];
      if (!label || !leader) return;
      const active = state.selected === part.id || state.hovered === part.id;
      const visible = state.labels && (mobile ? active : ((state.exploded && !state.focused) || active));
      if (!visible) {
        label.shown = false;
        label.el.classList.remove('is-visible');
        leader.group.classList.remove('is-visible');
        return;
      }
      const group = partGroups[part.id];
      if (!group) return;
      group.userData.anchor.getWorldPosition(projected);
      projected.project(camera);
      if (projected.z < -1 || projected.z > 1) {
        label.el.classList.remove('is-visible');
        leader.group.classList.remove('is-visible');
        return;
      }
      const sx = (projected.x * 0.5 + 0.5) * stageWidth;
      const sy = (-projected.y * 0.5 + 0.5) * stageHeight;
      if (sx < -100 || sx > stageWidth + 100 || sy < -80 || sy > stageHeight + 80) {
        label.el.classList.remove('is-visible');
        leader.group.classList.remove('is-visible');
        return;
      }
      const side = sx < stageWidth * 0.5 ? -1 : 1;
      groups[side].push({ part: part, sx: sx, sy: sy, label: label, leader: leader });
      label.el.classList.add('is-visible');
      leader.group.classList.add('is-visible');
    });

    [-1, 1].forEach((side) => {
      const list = groups[side].sort((a, b) => a.sy - b.sy);
      let lastBottom = -Infinity;
      list.forEach((item) => {
        const w = item.label.el.offsetWidth || 150;
        const h = item.label.el.offsetHeight || 38;
        item.label.w = w;
        item.label.h = h;
        let left;
        let top;
        if (mobile) {
          const preferRight = item.sx < stageWidth * 0.55;
          left = preferRight ? item.sx + 24 : item.sx - w - 24;
          top = item.sy - h / 2;
        } else {
          left = side === 1 ? item.sx + 32 : item.sx - w - 32;
          top = item.sy - h / 2;
        }
        left = clamp(left, leftLimit, rightLimit - w);
        top = clamp(top, safeTop, safeBottom - h);
        if (top < lastBottom + 7) top = lastBottom + 7;
        if (top + h > safeBottom) top = safeBottom - h;
        if (top < safeTop) top = safeTop;
        lastBottom = top + h;
        item.left = left;
        item.top = top;
        item.centerX = left + w / 2;
        item.centerY = top + h / 2;
      });
    });

    PARTS.forEach((part) => {
      const item = [...groups[-1], ...groups[1]].find((entry) => entry.part.id === part.id);
      const label = labels[part.id];
      const leader = leaders[part.id];
      if (!item) {
        label.el.style.transform = '';
        leader.line.setAttribute('x1', 0);
        leader.line.setAttribute('y1', 0);
        leader.line.setAttribute('x2', 0);
        leader.line.setAttribute('y2', 0);
        leader.dot.setAttribute('cx', -20);
        leader.dot.setAttribute('cy', -20);
        return;
      }
      const w = label.el.offsetWidth || item.label.w;
      const h = label.el.offsetHeight || item.label.h;
      label.el.style.transform = 'translate3d(' + item.left.toFixed(1) + 'px,' + item.top.toFixed(1) + 'px,0)';
      const anchorSideX = item.centerX > item.sx ? 1 : -1;
      const endX = anchorSideX === 1 ? item.left - 5 : item.left + w + 5;
      const endY = item.top + h / 2;
      leader.line.setAttribute('x1', item.sx.toFixed(1));
      leader.line.setAttribute('y1', item.sy.toFixed(1));
      leader.line.setAttribute('x2', endX.toFixed(1));
      leader.line.setAttribute('y2', endY.toFixed(1));
      leader.dot.setAttribute('cx', item.sx.toFixed(1));
      leader.dot.setAttribute('cy', item.sy.toFixed(1));
    });
  }

  /* ------------------------------------------------------------
     RENDER LOOP
     ------------------------------------------------------------ */
  function resize() {
    if (!renderer || !camera) return;
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobileLayout() ? 1.6 : 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const oldFit = orbit.aspectFit;
    orbit.aspectFit = getAspectFit();
    orbit.goalRadius *= orbit.aspectFit / oldFit;
    orbit.radius *= orbit.aspectFit / oldFit;
    if (composer) {
      composer.setSize(width, height);
    }
    if (bloomPass) {
      bloomPass.strength = isMobileLayout() ? 0.34 : 0.58;
    }
    updateAnnotations();
  }

  function updateCamera(dt) {
    if (!state.dragging && state.autoRotate && !state.pinching) {
      const idle = performance.now() - state.lastInteraction;
      if (idle > 1300) {
        orbit.goalTheta += dt * 0.055;
      }
    }
    orbit.radius = damp(orbit.radius, orbit.goalRadius, 4.6, dt);
    orbit.theta = damp(orbit.theta, orbit.goalTheta, 8.5, dt);
    orbit.phi = damp(orbit.phi, orbit.goalPhi, 8.5, dt);
    orbit.target.x = damp(orbit.target.x, orbit.goalTarget.x, 5, dt);
    orbit.target.y = damp(orbit.target.y, orbit.goalTarget.y, 5, dt);
    orbit.target.z = damp(orbit.target.z, orbit.goalTarget.z, 5, dt);

    const sinPhi = Math.sin(orbit.phi);
    camera.position.set(
      orbit.target.x + orbit.radius * sinPhi * Math.sin(orbit.theta),
      orbit.target.y + orbit.radius * Math.cos(orbit.phi),
      orbit.target.z + orbit.radius * sinPhi * Math.cos(orbit.theta)
    );
    camera.lookAt(orbit.target.x, orbit.target.y, orbit.target.z);
  }

  function updateParts(dt) {
    if (!deviceGroup) return;
    const t = performance.now() / 1000;
    deviceGroup.position.y = 0.4 + Math.sin(t * 0.58) * (state.reducedMotion ? 0 : 0.035);

    PARTS.forEach((part) => {
      const group = partGroups[part.id];
      if (!group) return;
      const explode = group.userData.explode;
      let targetX = state.exploded ? explode.x : 0;
      let targetY = state.exploded ? explode.y : 0;
      let targetZ = state.exploded ? explode.z : 0;
      let rotX = state.exploded ? group.userData.explodeRot.x : 0;
      let rotY = state.exploded ? group.userData.explodeRot.y : 0;
      let rotZ = state.exploded ? group.userData.explodeRot.z : 0;

      if (state.selected === part.id) {
        const len = Math.sqrt(explode.x * explode.x + explode.y * explode.y + explode.z * explode.z) || 1;
        targetX += (explode.x / len) * 0.48;
        targetY += (explode.y / len) * 0.48;
        targetZ += (explode.z / len) * 0.48;
        rotY += 0.04;
      }

      group.position.x = damp(group.position.x, targetX, 3.4, dt);
      group.position.y = damp(group.position.y, targetY, 3.4, dt);
      group.position.z = damp(group.position.z, targetZ, 3.4, dt);
      group.rotation.x = damp(group.rotation.x, rotX, 3.2, dt);
      group.rotation.y = damp(group.rotation.y, rotY, 3.2, dt);
      group.rotation.z = damp(group.rotation.z, rotZ, 3.2, dt);
    });

    // selection highlights gently pulse
    if (selectionGlow && selectionGlow.visible) {
      const pulse = 0.24 + Math.sin(t * 2.2) * 0.04;
      selectionGlow.material.opacity = damp(selectionGlow.material.opacity, pulse, 5, dt);
      selectionBox.material.opacity = 0.22 + Math.sin(t * 2.2) * 0.05;
      selectionLight.intensity = 0;
    }

    if (state.selected) updateSelectionHelpers();
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    elapsed += dt;

    updateCamera(dt);
    updateParts(dt);

    if (floorGroup) {
      floorGroup.rotation.y += dt * 0.009;
      floorGroup.children.forEach((child) => {
        if (child.userData.spin) child.rotation.z += dt * child.userData.spin;
      });
    }
    if (particleGroup) {
      particleGroup.rotation.y += dt * 0.006;
      particleGroup.children[0].rotation.y += dt * 0.012;
      particleGroup.children[1].rotation.y -= dt * 0.02;
    }
    if (partGroups.lens && partGroups.lens.userData.glassMat) {
      partGroups.lens.userData.glassMat.uniforms.time.value = elapsed;
    }

    updateAnnotations();

    frameCount += 1;
    fpsTime += dt;
    if (fpsTime >= 0.75) {
      const fps = Math.round(frameCount / fpsTime);
      if (dom.fpsInline) dom.fpsInline.textContent = String(Math.min(fps, 120));
      frameCount = 0;
      fpsTime = 0;
    }

    if (composer) composer.render();
    else renderer.render(scene, camera);
  }

  /* ------------------------------------------------------------
     INPUT
     ------------------------------------------------------------ */
  function setupInput() {
    const pointers = new Map();
    let startX = 0;
    let startY = 0;
    let startTheta = 0;
    let startPhi = 0;
    let pinchStartDistance = 0;
    let pinchStartRadius = 0;
    let movedDistance = 0;

    dom.canvas.addEventListener('pointerdown', (event) => {
      if (event.button !== undefined && event.button !== 0 && event.pointerType !== 'touch') return;
      dom.canvas.setPointerCapture(event.pointerId);
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      state.pointerDown = true;
      state.lastInteraction = performance.now();
      state.dragging = false;
      state.moved = false;
      movedDistance = 0;
      startX = event.clientX;
      startY = event.clientY;
      startTheta = orbit.goalTheta;
      startPhi = orbit.goalPhi;
      if (pointers.size === 1) {
        dom.canvas.classList.add('is-dragging');
      }
      if (pointers.size === 2) {
        const pts = Array.from(pointers.values());
        pinchStartDistance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        pinchStartRadius = orbit.goalRadius;
        state.pinching = true;
        state.dragging = false;
        state.moved = true;
      }
      stopTour(false);
    });

    dom.canvas.addEventListener('pointermove', (event) => {
      if (!pointers.has(event.pointerId)) {
        if (!isMobileLayout() && !state.pointerDown) {
          const hovered = pickPart(event.clientX, event.clientY);
          setHovered(hovered);
        }
        return;
      }
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

      if (pointers.size === 2) {
        const pts = Array.from(pointers.values());
        const distance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (pinchStartDistance > 0) {
          const factor = pinchStartDistance / Math.max(20, distance);
          orbit.goalRadius = clamp(pinchStartRadius * factor, 7.5, 38);
        }
        state.pinching = true;
        return;
      }

      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      movedDistance = Math.max(movedDistance, Math.hypot(dx, dy));
      if (!state.moved && movedDistance > 4) {
        state.moved = true;
        state.dragging = true;
        updateCursor();
      }
      if (state.moved) {
        orbit.goalTheta = startTheta - dx * 0.0054;
        orbit.goalPhi = clamp(startPhi - dy * 0.0048, orbit.minPhi, orbit.maxPhi);
      }
      state.lastInteraction = performance.now();
    });

    function endPointer(event) {
      if (!pointers.has(event.pointerId)) return;
      const wasPinching = state.pinching;
      pointers.delete(event.pointerId);
      if (pointers.size === 0) {
        if (!state.moved && !wasPinching && !state.pinching) {
          const partId = pickPart(event.clientX, event.clientY);
          if (partId) {
            selectPart(partId, { user: true, openMobileDetail: true });
          } else if (!state.exploded && !isMobileLayout()) {
            // clicking empty space is intentionally neutral
          }
        }
        state.pointerDown = false;
        state.dragging = false;
        state.pinching = false;
        updateCursor();
      } else if (pointers.size === 1) {
        const remaining = Array.from(pointers.values())[0];
        startX = remaining.x;
        startY = remaining.y;
        startTheta = orbit.goalTheta;
        startPhi = orbit.goalPhi;
        state.pinching = false;
      }
    }

    dom.canvas.addEventListener('pointerup', endPointer);
    dom.canvas.addEventListener('pointercancel', endPointer);
    dom.canvas.addEventListener('pointerleave', (event) => {
      if (event.pointerType !== 'touch' && !state.pointerDown) {
        setHovered(null);
      }
    });

    dom.canvas.addEventListener('wheel', (event) => {
      event.preventDefault();
      const factor = Math.exp(event.deltaY * 0.0011);
      orbit.goalRadius = clamp(orbit.goalRadius * factor, 7.5 * orbit.aspectFit, 38 * orbit.aspectFit);
      state.lastInteraction = performance.now();
    }, { passive: false });

    dom.canvas.addEventListener('dblclick', () => {
      resetAll();
    });

    dom.canvas.addEventListener('contextmenu', (event) => event.preventDefault());
  }

  function pickPart(x, y) {
    if (!camera || !raycaster) return null;
    const rect = dom.canvas.getBoundingClientRect();
    pointerNdc.x = ((x - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((y - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNdc, camera);
    const intersects = raycaster.intersectObjects(pickMeshes, false);
    if (!intersects.length) return null;
    for (let i = 0; i < intersects.length; i += 1) {
      const id = intersects[i].object.userData.partId;
      if (id) return id;
    }
    return null;
  }

  /* ------------------------------------------------------------
     UI EVENTS / KEYBOARD
     ------------------------------------------------------------ */
  function setupUI() {
    dom.explodeBtn.addEventListener('click', toggleExploded);
    dom.mobileExplodeBtn.addEventListener('click', toggleExploded);
    dom.autoRotateBtn.addEventListener('click', toggleAutoRotate);
    dom.tourBtn.addEventListener('click', toggleTour);
    dom.labelsBtn.addEventListener('click', () => setLabelsVisible(!state.labels));
    dom.helpBtn.addEventListener('click', openHelp);
    dom.helpCloseBtn.addEventListener('click', closeHelp);
    dom.fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (dom.resetBtn) dom.resetBtn.addEventListener('click', resetAll);
    dom.mobilePartsBtn.addEventListener('click', () => {
      if (state.mobilePartsOpen) appCloseMobileParts();
      else appOpenMobileParts();
    });
    dom.mobileDetailBtn.addEventListener('click', () => {
      if (state.mobileDetailOpen) appCloseMobileDetail();
      else appOpenMobileDetail();
    });

    $$('.view-btn').forEach((btn) => {
      btn.addEventListener('click', () => setView(btn.dataset.view));
    });
    $$('[data-close-modal]', dom.helpModal).forEach((el) => {
      el.addEventListener('click', closeHelp);
    });

    const mobileQuery = window.matchMedia('(max-width: 980px)');
    const handleLayoutChange = () => {
      appCloseMobileParts();
      if (!mobileQuery.matches) {
        dom.app.classList.remove('mobile-detail-open');
        state.mobileDetailOpen = false;
      }
      updateAnnotations();
    };
    if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', handleLayoutChange);
    else if (mobileQuery.addListener) mobileQuery.addListener(handleLayoutChange);

    window.addEventListener('resize', () => {
      resize();
      handleLayoutChange();
    });

    window.addEventListener('keydown', (event) => {
      const tag = (event.target && event.target.tagName) ? event.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || (event.target && event.target.isContentEditable)) return;
      if (event.key === ' ' || event.code === 'Space') {
        if (tag === 'button' || tag === 'a') return;
        event.preventDefault();
        toggleExploded();
      } else if (event.key === 'Escape') {
        if (dom.helpModal.classList.contains('is-open')) closeHelp();
        else if (isMobileLayout()) {
          appCloseMobileDetail();
          appCloseMobileParts();
        } else if (state.selected) {
          clearSelection();
          setExploded(false, { silent: true });
        }
      } else if (event.key === 'r' || event.key === 'R') {
        resetAll();
      } else if (event.key === 'l' || event.key === 'L') {
        setLabelsVisible(!state.labels);
      } else if (event.key === 'h' || event.key === 'H') {
        openHelp();
      } else if (event.key === 'f' || event.key === 'F') {
        toggleFullscreen();
      } else if (/^[1-8]$/.test(event.key)) {
        const part = PARTS[Number(event.key) - 1];
        if (part) {
          stopTour(false);
          selectPart(part.id, { user: true, openMobileDetail: true });
        }
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (dom.fullscreenBtn) dom.fullscreenBtn.setAttribute('aria-label', document.fullscreenElement ? '退出全屏' : '切换全屏');
    });
  }

  /* ------------------------------------------------------------
     BOOT
     ------------------------------------------------------------ */
  function handleQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('fast') === '1') {
      readyAt = 0;
    }
    if (params.get('bloom') === '0') {
      composer = null;
      bloomPass = null;
    }
    if (params.get('shadows') === '0') {
      renderer.shadowMap.enabled = false;
    }
    const partParam = params.get('part');
    if (params.get('view') && viewPresets[params.get('view')]) {
      const preset = viewPresets[params.get('view')];
      orbit.goalTheta = preset.theta;
      orbit.goalPhi = preset.phi;
      orbit.theta = preset.theta;
      orbit.phi = preset.phi;
      state.view = params.get('view');
      updateViewButtons();
    }
    if (params.get('explode') === '1' || partParam) {
      state.exploded = true;
      updateExplodeUI();
      setCameraForState(true);
      orbit.theta = orbit.goalTheta;
      orbit.phi = orbit.goalPhi;
      orbit.radius = orbit.goalRadius;
      PARTS.forEach((part) => {
        const group = partGroups[part.id];
        if (!group) return;
        group.position.set(part.explode.x, part.explode.y, part.explode.z);
        group.rotation.set(part.explodeRot.x, part.explodeRot.y, part.explodeRot.z);
      });
      updateLabelsVisibilityClasses();
    }
    if (partParam) {
      const part = PARTS.find((p) => p.id === partParam);
      if (part) {
        selectPart(part.id, { silent: true });
        // force settled exploded positions for deterministic screenshots
        PARTS.forEach((p) => {
          const group = partGroups[p.id];
          if (!group) return;
          let x = p.explode.x;
          let y = p.explode.y;
          let z = p.explode.z;
          if (p.id === part.id) {
            const len = Math.sqrt(p.explode.x * p.explode.x + p.explode.y * p.explode.y + p.explode.z * p.explode.z) || 1;
            x += (p.explode.x / len) * 0.48;
            y += (p.explode.y / len) * 0.48;
            z += (p.explode.z / len) * 0.48;
          }
          group.position.set(x, y, z);
          group.rotation.set(p.explodeRot.x, p.explodeRot.y, p.explodeRot.z);
        });
      }
    }
    if (params.get('auto') === '0') {
      state.autoRotate = false;
      updateAutoRotateUI();
    }
    if (params.get('labels') === '0') {
      state.labels = false;
      dom.labelsBtn.classList.remove('is-active');
      dom.labelsBtn.setAttribute('aria-pressed', 'false');
    }
    if (params.get('tour') === '1') {
      toggleTour();
    }
  }

  function showFatalError(error) {
    console.error(error);
    if (dom.loaderFallback) {
      dom.loaderFallback.hidden = false;
      dom.loaderFallback.innerHTML = '<p>无法初始化 3D 场景。请使用支持 WebGL 的现代浏览器打开本页面。<br><span style="opacity:.55">' + (error && error.message ? String(error.message).slice(0, 140) : 'WEBGL CONTEXT UNAVAILABLE') + '</span></p>';
    }
    if (dom.loaderStatus) dom.loaderStatus.textContent = 'INITIALIZATION FAILED';
    if (dom.loaderBar) dom.loaderBar.style.background = '#ff4938';
    if (dom.app) dom.app.classList.add('has-error');
  }

  async function boot() {
    buildComponentList();
    buildLabels();
    renderOverview();
    updateExplodeUI();
    updateAutoRotateUI();
    updateViewButtons();
    setupUI();
    setupInput();

    try {
      setLoader(8, 'BUILDING RENDERER');
      await delay(90);
      initScene();
      setLoader(32, 'ASSEMBLING CHASSIS');
      await delay(80);
      buildModel();
      setLoader(61, 'MAPPING COMPONENTS');
      await delay(70);
      setLoader(78, 'CALIBRATING OPTICS');
      await delay(60);
      handleQueryParams();
      updateSelectionHelpers();
      updateAnnotations();
      updateCamera(0.016);
      setupComposerIfNeeded();
      setLoader(92, 'SYNCING INTERFACE');
      await delay(160);
      animate();
      setLoader(100, 'SYSTEM READY');
      state.ready = true;
      state.started = true;
      await delay(420);
      dom.app.classList.remove('is-loading');
      dom.app.classList.add('is-ready');
      if (!labels) {
        // no-op (placeholder keeps older browsers happy)
      }
      setTimeout(() => {
        if (!state.exploded && dom.centerGuide) dom.centerGuide.classList.remove('is-hidden');
      }, 900);
    } catch (error) {
      showFatalError(error);
    }
  }

  function setupComposerIfNeeded() {
    // composer is already initialized; this hook makes the build order explicit
    if (bloomPass) bloomPass.enabled = true;
  }

  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
    window.clearTimeout(tourTimer);
    window.clearTimeout(toastTimer);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
